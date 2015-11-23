import Components;

class Server {
	
	static public function main() {

		// This could be your NodeJS express app, UFront solution or whatever...
		
		// Here we just crate some random serverside testdata
		var customData:Array<TestItem> = [
			{text: 'Added on server', color: 0x3F5D6E},
			{text: 'Added on server', color: 0x3F5D6E},
		];

		// Create a list component  (actulally a DOM div wrapping an Unordered List) 
		// and populate it with the testdata
		var content = new MyCustomList(customData);
		
		// Create the Index page (actually a dom Html element wrapping Head and Body elements)
		// and feed it with the content we created above
		var myIndexPage = new MyIndex(content);
		
		// Make html out of it
		var html = hxdom.HtmlSerializer.run(myIndexPage);
		
		// Spit it out!
		Sys.println(html);
		
	} 

}