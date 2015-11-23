import hxdom.Elements;
import hxdom.js.ClientOnly;
using hxdom.DomTools;

class Components {}


// The Dom Html element wrapping Head and Body 
class MyIndex extends EHtml {
	
	public function new(content:VirtualElement<Dynamic>) {
		super();

		var head = new EHead();
		this.append(head);
		head.append(new EMeta().setAttr('charset', 'utf-8'));
		// Here's where the compiled js is loaded:
		head.append(new EScript().setAttr("src", "/client.js").setAttr("defer", true));

		var body = new EBody();
		this.append(body);

		var header = new EHeader();
		header.append(new EHeader2().setText('Isomorphic code with HxDom'));
		body.append(header);

		body.append(content);
		
		var footer = new EFooter();
		footer.append(new EParagraph().setText('Footer'));
		body.append(footer);
	}

}

// Component created by a Div containing an Unordered list
class MyCustomList extends EDiv implements ClientOnly{
	var items:Array<TestItem>;
	var list:EUnorderedList;
	public function new(items:Array<TestItem>) {
		super();
		this.items = items;
		this.append(new EParagraph().setText('Please note that the client is aware of the server-populated data!'));
		this.list = new EUnorderedList();
		this.append(this.list);
		this.displayItems();
		this.append(new EButton().setText('Add item').on('click', onBtnAddClick));
	}

	function displayItems() {
		this.list.setHtml('');
		for (item in this.items) {
			this.list.append(new MyCustomListItem(item));
		}
	}

	function onBtnAddClick(e:hxdom.html.Event) {
		this.items.push({text:'Add user item', color: 0x6A9752});
		this.displayItems();
	}

	// This method is run only clientside!
	@:client
	function init() {
		//js.Browser.window.setTimeout(function(e) {
			this.items.push({text: 'Added on client', color: 0x5C4475});
			this.displayItems();
		//}, 1500);
	}

} 

// Custom list element
class MyCustomListItem extends EListItem {
	public function new(item:TestItem) {
		super();
		var hex = '#' + StringTools.lpad(StringTools.hex(item.color), '0', 6);
		this.setAttr('style', 'background-color: $hex; padding: 9px; margin: 4px; border-radius: 4px; color: white;');
		this.setText(item.text);
	}

}


