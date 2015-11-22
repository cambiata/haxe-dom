import hxdom.js.Boot;
import Components;

class Client {
	static public function main() {
		js.Browser.window.onload = function (_) {
			var app:MyIndex = cast Boot.init();
		}
	}
}