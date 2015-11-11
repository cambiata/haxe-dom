import hxdom.js.Boot;

class Client {
	static public function main() {
		js.Browser.window.onload = function (_) {
			var app:MyIndex = cast Boot.init();
		}
	}
}