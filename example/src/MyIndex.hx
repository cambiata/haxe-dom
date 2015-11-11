import hxdom.Elements;
import hxdom.js.ClientOnly;
using hxdom.DomTools;

class MyIndex extends EHtml {
	
	public function new(content:EDiv) {
		super();

		var head = new EHead();
		this.append(head);
		head.append(new EMeta().setAttr('charset', 'utf-8'));
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
			this.list.append(new EListItem().setText(item.label + ' ' + item.nr));
		}
	}

	function onBtnAddClick(e:hxdom.html.Event) {
		this.items.push({label:'User item', nr: Math.round(Math.random()*1000)});
		this.displayItems();
	}

	@:client
	function init() {
		js.Browser.window.setTimeout(function(e) {
			this.items.push({label: 'Client item', nr: 999});
			this.displayItems();
		}, 1500);
	}

} 

typedef TestItem = {
	label:String,
	nr: Int,
}
