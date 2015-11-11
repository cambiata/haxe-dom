import MyIndex;

class Server {
	
	static public function main() {

		var customData:Array<TestItem> = [
			{label: 'Server item', nr: 111},
			{label: 'Server item', nr: 222},
		];

		var content = new MyCustomList(customData);

		var html = hxdom.HtmlSerializer.run(new MyIndex(content));
		Sys.println(html);

		sys.io.File.saveContent('server.html', html);

	} 

}