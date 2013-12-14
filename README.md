haxe-dom provides target independant DOM manipulation. The goal of this project is to reduce duplicate code between the server and client without having to resort to single page apps. View state can be manipulated on the server, serialized into idiomatic HTML5 and reconstructed on the client. Usage is straightforward.

Contruct the page (Neko/PHP/Java/etc):

	import hxdom.Elements;
	
	var page = new EHtml();
	var head = new EHead();
	var body = new EBody();
	
	page.appendChild(head);
	page.appendChild(body);

Serialize to HTML:

	writeToHttpSocket(hxdom.HtmlSerializer.run(page));

The following is sent across the wire:

	<!DOCTYPE html><html data-class='hxdom.EHtml' data-id='0'><head data-class='hxdom.EHead' data-id='1'/><body data-class='hxdom.EBody' data-id='2'/></html>

Init on client (JavaScript):

	var page = hxdom.js.Boot();

Custom Classes
==============

The above example is cool and all, but it's not really practical for a full scale app. We need to be able to extend and encapsulate DOM components. Doing this is also very straightforward:

	class MyCustomApp extends EHtml {
		
		public var head(default, null):EHead;
		public var body(default, null):EBody;
		
		public function new (numTexts:Int) {
			super();
			
			head = new EHead();
			body = new EBody();
			
			appendChild(head);
			appendChild(body);
			
			for (i in 0 ... numTexts) {
				addSomeTextToBody();
			}
		}
		
		public function addSomeTextToBody ():Void {
			body.appendChild(new Text("Some Text"));
		}
		
	}

Build the HTML and send it to the client:
	
	writeToHttpSocket(hxdom.HtmlSerializer.run(new MyCustomApp(5)));

Sends this to the client:

	<!DOCTYPE html><html data-class='MyCustomApp' data-id='0' data-k0='body' data-v0='D2' data-k1='head' data-v1='D1'><head data-class='hxdom.EHead' data-id='1'/><body data-class='hxdom.EBody' data-id='2'>Some TextSome TextSome TextSome TextSome Text</body></html>

Load the custom app and add 2 more lines of text (JavaScript):

	var myCustomApp:MyCustomApp = cast hxdom.js.Boot();
	myCustomApp.addSomeTextToBody();
	myCustomApp.addSomeTextToBody();

Event Listeners
===============

You can also attach event listeners on the server:

	class MyCustomApp extends EHtml {
		
		public function new () {
			super();
			
			var body = new EBody();
			
			appendChild(new EHead());
			appendChild(body);
			
			body.addEventListener("click", onClick);
		}
		
		public function onClick (_):Void {
			trace("Click!");
		}
		
	}

Sends the following:

	<!DOCTYPE html><html data-class='MyCustomApp' data-id='0'><head data-class='hxdom.EHead' data-id='2'/><body data-class='hxdom.EBody' data-id='1' data-k0='listeners' data-v0='by5:clickloy4:funcy7:onClicky4:instD0y3:capfghh'/></html>

Load on client (JavaScript):

	hxdom.js.Boot();

And that's it! Clicking on the webpage will trigger a "Click!" to be traced to the console.

One unavoidable restriction on events is that you cannot listen to anonymous functions. The serializer needs to be able to reference the function and this is impossible with lambdas. For example this will result in a compilation error:

	myElem.addEventListener("click", function (_) { trace("Click!"); });

Tools
=====

Using the DOM directly can be kind of annoying, so I've included a DomTools class that you should usually include as a "using". DomTools is built for chaining. Here is a quick example:

	using hxdom.DomTools;
	
	var div = new EDiv().classes("myCssClass anotherClass").attr(Id, "someId").addText("Some text in the Div!");

Custom Event Systems
====================

If you are interested in rolling your own event systems, but want to take advantage of the serializability of haxe-dom then you can use the hxdom.EventHandler class. What it does is split any fully referenceable function into its instance (or class for static functions) and function name components. For example:

	class MyClass {
		
		var eventHandler:hxdom.EventHandler;
		
		public function new () {
			//Could call this on either the server or the client
			//MyClass instances are fully serializable
			
			//Internally eventHandler stores [inst => this, func => "myEventListener"]
			eventHandler = hxdom.EventHandler.make(myEventListener);
		}
		
		public function fireEvent ():Void {
			//Can call this on either the server or the client as well
			eventHandler.call();
		}
		
		function myEventListener ():Void {
			trace("Event!");
		}
		
	}

Don't want to pass around EventHandler references? Use the hxdom.EventHandler.doMake() macro to roll your own seamless event system. This allows you to make completely transparent code like this:

	someObj.bind("someEventType", myEventHandler);
	
	...
	
	macro public function bind (ethis:Expr, type:ExprOf<String>, listener:ExprOf<Void -> Void>):ExprOf<Void> {
		return macro $ethis.actualBind($type, ${hxdom.EventHandler.doMake(listener)});
	}

FAQ
===

Can I use this with NodeJS?

Although I have not tested this yet you can use NodeJS by adding the -D use_vdom compiler flag. This flag makes the library use the virtual DOM instead of the actual one (which doesn't exist in NodeJS).

A Full Example
==============

Use this command:

	haxe -cp test -neko server.n -main Main --next -cp test -js client.js -main Main

To compile the example in the test directory.

Run the neko binary which will produce an index.html file to which you can load into your browser. You may need to shiv missing elements depending on your browser.