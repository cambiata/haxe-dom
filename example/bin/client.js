(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Client = function() { };
$hxClasses["Client"] = Client;
Client.__name__ = true;
Client.main = function() {
	window.onload = function(_) {
		var app = hxdom_js_Boot.init();
	};
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var hxdom_VirtualNode = function(node) {
	this.node = node;
	node.__vdom = this;
	this.id = hxdom_VirtualNode.ID++;
	this.__inDom = node.nodeType == 1?(function($this) {
		var $r;
		var el = node;
		$r = $this.__inDomCached = el.tagName == "HTML";
		return $r;
	}(this)):this.__inDomCached = false;
};
$hxClasses["hxdom.VirtualNode"] = hxdom_VirtualNode;
hxdom_VirtualNode.__name__ = true;
hxdom_VirtualNode.buildElement = function(cls,tagName) {
	var el = window.document.createElement(tagName);
	return el;
};
hxdom_VirtualNode.buildText = function(txt) {
	return window.document.createTextNode(txt);
};
hxdom_VirtualNode.__super__ = EventTarget;
hxdom_VirtualNode.prototype = $extend(EventTarget.prototype,{
	__isInDom: function() {
		if(this.__inDomCached) return this.__inDom; else {
			var p = hxdom_DomTools.parent(this);
			if(p != null) {
				this.__inDom = p.__isInDom();
				this.__inDomCached = true;
				return this.__inDom;
			} else return false;
		}
	}
	,iterator: function() {
		return new hxdom__$Elements_VirtualNodeIterator(this);
	}
	,addEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		this.node.addEventListener(type,listener,useCapture);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		this.node.removeEventListener(type,listener,useCapture);
	}
	,dispatchEvent: function(event) {
		return this.node.dispatchEvent(event);
	}
	,onAdded: function() {
	}
	,onRemoved: function() {
	}
	,__onAdded: function() {
		this.onAdded();
		var _g1 = 0;
		var _g = this.node.childNodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var vn = Reflect.field(this.node.childNodes[i],"__vdom");
			if(vn != null) vn.__onAdded();
		}
	}
	,__onRemoved: function() {
		this.onRemoved();
		var _g1 = 0;
		var _g = this.node.childNodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var vn = Reflect.field(this.node.childNodes[i],"__vdom");
			if(vn != null) vn.__onRemoved();
		}
	}
	,__class__: hxdom_VirtualNode
});
var hxdom_VirtualElement = function(element) {
	hxdom_VirtualNode.call(this,element);
};
$hxClasses["hxdom.VirtualElement"] = hxdom_VirtualElement;
hxdom_VirtualElement.__name__ = true;
hxdom_VirtualElement.__super__ = hxdom_VirtualNode;
hxdom_VirtualElement.prototype = $extend(hxdom_VirtualNode.prototype,{
	__class__: hxdom_VirtualElement
});
var hxdom_EHtml = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLHtmlElement,"HTML"));
};
$hxClasses["hxdom.EHtml"] = hxdom_EHtml;
hxdom_EHtml.__name__ = true;
hxdom_EHtml.__super__ = hxdom_VirtualElement;
hxdom_EHtml.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHtml
});
var MyIndex = function(content) {
	hxdom_EHtml.call(this);
	var head = new hxdom_EHead();
	hxdom_DomTools.append(this,head);
	hxdom_DomTools.append(head,hxdom_DomTools.setAttr(new hxdom_EMeta(),"charset","utf-8"));
	hxdom_DomTools.append(head,hxdom_DomTools.setAttr(hxdom_DomTools.setAttr(new hxdom_EScript(),"src","/client.js"),"defer",true));
	var body = new hxdom_EBody();
	hxdom_DomTools.append(this,body);
	var header = new hxdom_EHeader();
	hxdom_DomTools.append(header,hxdom_DomTools.setText(new hxdom_EHeader2(),"Isomorphic code with HxDom"));
	hxdom_DomTools.append(body,header);
	hxdom_DomTools.append(body,content);
	var footer = new hxdom_EFooter();
	hxdom_DomTools.append(footer,hxdom_DomTools.setText(new hxdom_EParagraph(),"Footer"));
	hxdom_DomTools.append(body,footer);
};
$hxClasses["MyIndex"] = MyIndex;
MyIndex.__name__ = true;
MyIndex.__super__ = hxdom_EHtml;
MyIndex.prototype = $extend(hxdom_EHtml.prototype,{
	__class__: MyIndex
});
var hxdom_EDiv = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLDivElement,"DIV"));
};
$hxClasses["hxdom.EDiv"] = hxdom_EDiv;
hxdom_EDiv.__name__ = true;
hxdom_EDiv.__super__ = hxdom_VirtualElement;
hxdom_EDiv.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDiv
});
var hxdom_js_ClientOnly = function() { };
$hxClasses["hxdom.js.ClientOnly"] = hxdom_js_ClientOnly;
hxdom_js_ClientOnly.__name__ = true;
var MyCustomList = function(items) {
	hxdom_EDiv.call(this);
	this.items = items;
	hxdom_DomTools.append(this,hxdom_DomTools.setText(new hxdom_EParagraph(),"Please note that the client is aware of the server-populated data!"));
	this.list = new hxdom_EUnorderedList();
	hxdom_DomTools.append(this,this.list);
	this.displayItems();
	hxdom_DomTools.append(this,(function($this) {
		var $r;
		var result = hxdom_DomTools.setText(new hxdom_EButton(),"Add item");
		{
			var _g = 0;
			var _g1 = "click".split(" ");
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				result.addEventListener(i,$bind($this,$this.onBtnAddClick));
			}
		}
		$r = result;
		return $r;
	}(this)));
	this.init();
};
$hxClasses["MyCustomList"] = MyCustomList;
MyCustomList.__name__ = true;
MyCustomList.__interfaces__ = [hxdom_js_ClientOnly];
MyCustomList.__super__ = hxdom_EDiv;
MyCustomList.prototype = $extend(hxdom_EDiv.prototype,{
	displayItems: function() {
		hxdom_DomTools.setHtml(this.list,"");
		var _g = 0;
		var _g1 = this.items;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			hxdom_DomTools.append(this.list,new MyCustomListItem(item));
		}
	}
	,onBtnAddClick: function(e) {
		this.items.push({ text : "Add user item", color : 6985554});
		this.displayItems();
	}
	,init: function() {
		this.items.push({ text : "Added on client", color : 6046837});
		this.displayItems();
	}
	,__hxdomBoot: function() {
		this.init();
	}
	,__class__: MyCustomList
});
var hxdom_EListItem = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLLIElement,"LI"));
};
$hxClasses["hxdom.EListItem"] = hxdom_EListItem;
hxdom_EListItem.__name__ = true;
hxdom_EListItem.__super__ = hxdom_VirtualElement;
hxdom_EListItem.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EListItem
});
var MyCustomListItem = function(item) {
	hxdom_EListItem.call(this);
	var hex = "#" + StringTools.lpad(StringTools.hex(item.color),"0",6);
	hxdom_DomTools.setAttr(this,"style","background-color: " + hex + "; padding: 9px; margin: 4px; border-radius: 4px; color: white;");
	hxdom_DomTools.setText(this,item.text);
};
$hxClasses["MyCustomListItem"] = MyCustomListItem;
MyCustomListItem.__name__ = true;
MyCustomListItem.__super__ = hxdom_EListItem;
MyCustomListItem.prototype = $extend(hxdom_EListItem.prototype,{
	__class__: MyCustomListItem
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = true;
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var hxdom_DomTools = function() { };
$hxClasses["hxdom.DomTools"] = hxdom_DomTools;
hxdom_DomTools.__name__ = true;
hxdom_DomTools.prepend = function(parent,child) {
	parent.node.insertBefore(child.node,parent.node.firstChild);
	return parent;
};
hxdom_DomTools.append = function(parent,child) {
	parent.node.appendChild(child.node);
	return parent;
};
hxdom_DomTools.after = function(ref,e) {
	ref.node.parentNode.insertBefore(e.node,ref.node.nextSibling);
	return ref;
};
hxdom_DomTools.before = function(ref,e) {
	ref.node.parentNode.insertBefore(e.node,ref.node);
	return ref;
};
hxdom_DomTools.remove = function(e) {
	e.node.parentNode.removeChild(e.node);
	return e;
};
hxdom_DomTools.empty = function(e) {
	while(e.node.firstChild != null) e.node.removeChild(e.node.firstChild);
	return e;
};
hxdom_DomTools.replaceWith = function(e,newEl) {
	e.node.parentNode.replaceChild(e.node,newEl.node);
	return e;
};
hxdom_DomTools.addClass = function(e,cls) {
	if(e.node.className == null || e.node.className == "") e.node.className = cls; else e.node.className += " " + cls;
	return e;
};
hxdom_DomTools.hasClass = function(e,cls) {
	if(e.node.className != null && e.node.className != "") {
		var ecls = e.node.className.split(" ");
		var newCls = [];
		var _g = 0;
		while(_g < ecls.length) {
			var i = ecls[_g];
			++_g;
			if(cls == i) return true;
		}
	}
	return false;
};
hxdom_DomTools.removeClass = function(e,cls) {
	if(e.node.className != null && e.node.className != "") {
		var clsArr = cls.split(" ");
		var ecls = e.node.className.split(" ");
		var newCls = [];
		var _g = 0;
		while(_g < ecls.length) {
			var i = ecls[_g];
			++_g;
			if(!Lambda.has(clsArr,i)) newCls.push(i);
		}
		e.node.className = newCls.join(" ");
	}
	return e;
};
hxdom_DomTools.toggleClass = function(e,cls) {
	if(hxdom_DomTools.hasClass(e,cls)) hxdom_DomTools.removeClass(e,cls); else hxdom_DomTools.addClass(e,cls);
	return e;
};
hxdom_DomTools.setVal = function(e,val) {
	hxdom_DomTools.setProp(e,"value",val);
	return e;
};
hxdom_DomTools.getVal = function(e) {
	return hxdom_DomTools.getProp(e,"value");
};
hxdom_DomTools.addText = function(e,text) {
	hxdom_DomTools.append(e,new hxdom_Text(text));
	return e;
};
hxdom_DomTools.setText = function(e,text) {
	hxdom_DomTools.empty(e);
	hxdom_DomTools.addText(e,text);
	return e;
};
hxdom_DomTools.getText = function(e) {
	return e.node.textContent;
};
hxdom_DomTools.setHtml = function(e,html) {
	e.node.innerHTML = html;
	return e;
};
hxdom_DomTools.getHtml = function(e) {
	return e.node.innerHTML;
};
hxdom_DomTools.setAttr = function(e,key,val) {
	var _g = Type["typeof"](val);
	switch(_g[1]) {
	case 3:
		if(val) e.node.setAttribute(key,key); else e.node.removeAttribute(key);
		break;
	default:
		e.node.setAttribute(key,Std.string(val));
	}
	return e;
};
hxdom_DomTools.getAttr = function(e,key) {
	return e.node.getAttribute(key);
};
hxdom_DomTools.removeAttr = function(e,key) {
	e.node.removeAttribute(key);
	return e;
};
hxdom_DomTools.setProp = function(e,key,val) {
	e.node[key] = val;
	return e;
};
hxdom_DomTools.getProp = function(e,key) {
	return Reflect.field(e.node,key);
};
hxdom_DomTools.removeProp = function(e,key) {
	Reflect.deleteField(e.node,key);
	return e;
};
hxdom_DomTools.setCss = function(e,key,val) {
	Reflect.setField(e.node.style,key,hxdom_util_Util.dashToCamelCase(val));
	return e;
};
hxdom_DomTools.getCss = function(e,key) {
	return Reflect.field(e.node.style,key);
};
hxdom_DomTools.vnode = function(node) {
	return Reflect.field(node,"__vdom");
};
hxdom_DomTools.setData = function(e,key,value) {
	e.node.dataset[key] = value;
	return e;
};
hxdom_DomTools.getData = function(e,key,value) {
	e.node.dataset[key] = value;
	return e;
};
hxdom_DomTools.removeData = function(e,key) {
	Reflect.deleteField(e.node.dataset,key);
	return e;
};
hxdom_DomTools.__closest = function(e,type,stop) {
	var currNode = e;
	while(currNode != null) {
		var vnode = Reflect.field(currNode,"__vdom");
		if(vnode != null && js_Boot.__instanceof(vnode,type)) return vnode;
		if(currNode == stop) return null;
		currNode = currNode.parentNode;
	}
	return null;
};
hxdom_DomTools.closest = function(e,type) {
	return hxdom_DomTools.__closest(e.node,type);
};
hxdom_DomTools.next = function(e) {
	var next = e.node.nextSibling;
	if(next != null) return Reflect.field(next,"__vdom"); else return null;
};
hxdom_DomTools.prev = function(e) {
	var next = e.node.previousSibling;
	if(next != null) return Reflect.field(next,"__vdom"); else return null;
};
hxdom_DomTools.parent = function(e) {
	var p = e.node.parentNode;
	if(p != null) return Reflect.field(p,"__vdom"); else return null;
};
hxdom_DomTools.observe = function(e) {
	new MutationObserver(function(changes,obs) {
		var _g = 0;
		while(_g < changes.length) {
			var i = changes[_g];
			++_g;
			var _g1 = 0;
			var _g2 = i.removedNodes;
			while(_g1 < _g2.length) {
				var o = _g2[_g1];
				++_g1;
				var vnode = Reflect.field(o,"__vdom");
				if(vnode != null) vnode.__onRemoved();
			}
			var _g11 = 0;
			var _g21 = i.addedNodes;
			while(_g11 < _g21.length) {
				var o1 = _g21[_g11];
				++_g11;
				var vnode1 = Reflect.field(o1,"__vdom");
				if(vnode1 != null) vnode1.__onAdded();
			}
		}
	}).observe(e.node,{ childList : true, subtree : true});
	return e;
};
hxdom_DomTools.__delegateEvent = function(e) {
	var delegates = Reflect.field(Reflect.field(e.currentTarget,"__vdom"),"__delegates");
	if(delegates != null) {
		var _g_head = delegates.h;
		var _g_val = null;
		while(_g_head != null) {
			var i;
			i = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(i.event == e.type) {
				var child = hxdom_DomTools.__closest(e.target,i.filter,e.currentTarget);
				if(child != null) i.handler.call([e,child]);
			}
		}
	}
};
hxdom_DomTools.__delegate = function(e,filter,events,listener) {
	var delegates = Reflect.field(e,"__delegates");
	if(delegates == null) {
		delegates = new List();
		e.__delegates = delegates;
	}
	var _g = 0;
	var _g1 = events.split(" ");
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		delegates.add({ event : i, handler : listener, filter : filter});
		e.addEventListener(i,hxdom_DomTools.__delegateEvent);
	}
	return e;
};
hxdom_DomTools.__undelegate = function(e,filter,events,listener) {
	var delegates = Reflect.field(e,"__delegates");
	if(delegates == null) return e;
	var _g = 0;
	var _g1 = events.split(" ");
	while(_g < _g1.length) {
		var i = [_g1[_g]];
		++_g;
		var found = false;
		var _g2_head = delegates.h;
		var _g2_val = null;
		while(_g2_head != null) {
			var d;
			d = (function($this) {
				var $r;
				_g2_val = _g2_head[0];
				_g2_head = _g2_head[1];
				$r = _g2_val;
				return $r;
			}(this));
			if(d.event == i[0] && d.handler.isSame(listener) && d.filter == filter) {
				delegates.remove(d);
				found = true;
				break;
			}
		}
		if(found) {
			if(!Lambda.exists(delegates,(function(i) {
				return function(e1) {
					return e1.event == i[0];
				};
			})(i))) e.removeEventListener(i[0],hxdom_DomTools.__delegateEvent);
		}
	}
	if(delegates.length == 0) Reflect.deleteField(e,"__delegates");
	return e;
};
hxdom_DomTools.createEvent = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	var e = window.document.createEvent("Event");
	e.initEvent(type,bubbles,cancelable);
	return e;
};
var hxdom_InputType = $hxClasses["hxdom.InputType"] = { __ename__ : true, __constructs__ : ["Button","Checkbox","Color","IDate","DateTime","DateTimeLocal","Email","File","Hidden","Image","Month","Number","Password","Radio","Range","Reset","Search","Submit","Telephone","IText","Time","Url","Week"] };
hxdom_InputType.Button = ["Button",0];
hxdom_InputType.Button.toString = $estr;
hxdom_InputType.Button.__enum__ = hxdom_InputType;
hxdom_InputType.Checkbox = ["Checkbox",1];
hxdom_InputType.Checkbox.toString = $estr;
hxdom_InputType.Checkbox.__enum__ = hxdom_InputType;
hxdom_InputType.Color = ["Color",2];
hxdom_InputType.Color.toString = $estr;
hxdom_InputType.Color.__enum__ = hxdom_InputType;
hxdom_InputType.IDate = ["IDate",3];
hxdom_InputType.IDate.toString = $estr;
hxdom_InputType.IDate.__enum__ = hxdom_InputType;
hxdom_InputType.DateTime = ["DateTime",4];
hxdom_InputType.DateTime.toString = $estr;
hxdom_InputType.DateTime.__enum__ = hxdom_InputType;
hxdom_InputType.DateTimeLocal = ["DateTimeLocal",5];
hxdom_InputType.DateTimeLocal.toString = $estr;
hxdom_InputType.DateTimeLocal.__enum__ = hxdom_InputType;
hxdom_InputType.Email = ["Email",6];
hxdom_InputType.Email.toString = $estr;
hxdom_InputType.Email.__enum__ = hxdom_InputType;
hxdom_InputType.File = ["File",7];
hxdom_InputType.File.toString = $estr;
hxdom_InputType.File.__enum__ = hxdom_InputType;
hxdom_InputType.Hidden = ["Hidden",8];
hxdom_InputType.Hidden.toString = $estr;
hxdom_InputType.Hidden.__enum__ = hxdom_InputType;
hxdom_InputType.Image = ["Image",9];
hxdom_InputType.Image.toString = $estr;
hxdom_InputType.Image.__enum__ = hxdom_InputType;
hxdom_InputType.Month = ["Month",10];
hxdom_InputType.Month.toString = $estr;
hxdom_InputType.Month.__enum__ = hxdom_InputType;
hxdom_InputType.Number = ["Number",11];
hxdom_InputType.Number.toString = $estr;
hxdom_InputType.Number.__enum__ = hxdom_InputType;
hxdom_InputType.Password = ["Password",12];
hxdom_InputType.Password.toString = $estr;
hxdom_InputType.Password.__enum__ = hxdom_InputType;
hxdom_InputType.Radio = ["Radio",13];
hxdom_InputType.Radio.toString = $estr;
hxdom_InputType.Radio.__enum__ = hxdom_InputType;
hxdom_InputType.Range = ["Range",14];
hxdom_InputType.Range.toString = $estr;
hxdom_InputType.Range.__enum__ = hxdom_InputType;
hxdom_InputType.Reset = ["Reset",15];
hxdom_InputType.Reset.toString = $estr;
hxdom_InputType.Reset.__enum__ = hxdom_InputType;
hxdom_InputType.Search = ["Search",16];
hxdom_InputType.Search.toString = $estr;
hxdom_InputType.Search.__enum__ = hxdom_InputType;
hxdom_InputType.Submit = ["Submit",17];
hxdom_InputType.Submit.toString = $estr;
hxdom_InputType.Submit.__enum__ = hxdom_InputType;
hxdom_InputType.Telephone = ["Telephone",18];
hxdom_InputType.Telephone.toString = $estr;
hxdom_InputType.Telephone.__enum__ = hxdom_InputType;
hxdom_InputType.IText = ["IText",19];
hxdom_InputType.IText.toString = $estr;
hxdom_InputType.IText.__enum__ = hxdom_InputType;
hxdom_InputType.Time = ["Time",20];
hxdom_InputType.Time.toString = $estr;
hxdom_InputType.Time.__enum__ = hxdom_InputType;
hxdom_InputType.Url = ["Url",21];
hxdom_InputType.Url.toString = $estr;
hxdom_InputType.Url.__enum__ = hxdom_InputType;
hxdom_InputType.Week = ["Week",22];
hxdom_InputType.Week.toString = $estr;
hxdom_InputType.Week.__enum__ = hxdom_InputType;
var hxdom_ButtonType = $hxClasses["hxdom.ButtonType"] = { __ename__ : true, __constructs__ : ["Button","Submit","Reset"] };
hxdom_ButtonType.Button = ["Button",0];
hxdom_ButtonType.Button.toString = $estr;
hxdom_ButtonType.Button.__enum__ = hxdom_ButtonType;
hxdom_ButtonType.Submit = ["Submit",1];
hxdom_ButtonType.Submit.toString = $estr;
hxdom_ButtonType.Submit.__enum__ = hxdom_ButtonType;
hxdom_ButtonType.Reset = ["Reset",2];
hxdom_ButtonType.Reset.toString = $estr;
hxdom_ButtonType.Reset.__enum__ = hxdom_ButtonType;
var hxdom__$Elements_VirtualNodeIterator = function(node) {
	this.child = node.node.firstChild;
};
$hxClasses["hxdom._Elements.VirtualNodeIterator"] = hxdom__$Elements_VirtualNodeIterator;
hxdom__$Elements_VirtualNodeIterator.__name__ = true;
hxdom__$Elements_VirtualNodeIterator.prototype = {
	iterator: function() {
		return this;
	}
	,hasNext: function() {
		return this.child != null;
	}
	,next: function() {
		var c = this.child;
		this.child = this.child.nextSibling;
		return Reflect.field(c,"__vdom");
	}
	,__class__: hxdom__$Elements_VirtualNodeIterator
};
var hxdom_EAnchor = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLAnchorElement,"A"));
};
$hxClasses["hxdom.EAnchor"] = hxdom_EAnchor;
hxdom_EAnchor.__name__ = true;
hxdom_EAnchor.__super__ = hxdom_VirtualElement;
hxdom_EAnchor.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EAnchor
});
var hxdom_EAbbr = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"ABBR"));
};
$hxClasses["hxdom.EAbbr"] = hxdom_EAbbr;
hxdom_EAbbr.__name__ = true;
hxdom_EAbbr.__super__ = hxdom_VirtualElement;
hxdom_EAbbr.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EAbbr
});
var hxdom_EAddress = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"ADDRESS"));
};
$hxClasses["hxdom.EAddress"] = hxdom_EAddress;
hxdom_EAddress.__name__ = true;
hxdom_EAddress.__super__ = hxdom_VirtualElement;
hxdom_EAddress.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EAddress
});
var hxdom_EArea = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"AREA"));
};
$hxClasses["hxdom.EArea"] = hxdom_EArea;
hxdom_EArea.__name__ = true;
hxdom_EArea.__super__ = hxdom_VirtualElement;
hxdom_EArea.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EArea
});
var hxdom_EArticle = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"ARTICLE"));
};
$hxClasses["hxdom.EArticle"] = hxdom_EArticle;
hxdom_EArticle.__name__ = true;
hxdom_EArticle.__super__ = hxdom_VirtualElement;
hxdom_EArticle.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EArticle
});
var hxdom_EAside = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"ASIDE"));
};
$hxClasses["hxdom.EAside"] = hxdom_EAside;
hxdom_EAside.__name__ = true;
hxdom_EAside.__super__ = hxdom_VirtualElement;
hxdom_EAside.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EAside
});
var hxdom_EAudio = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLAudioElement,"AUDIO"));
};
$hxClasses["hxdom.EAudio"] = hxdom_EAudio;
hxdom_EAudio.__name__ = true;
hxdom_EAudio.__super__ = hxdom_VirtualElement;
hxdom_EAudio.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EAudio
});
var hxdom_EBold = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"B"));
};
$hxClasses["hxdom.EBold"] = hxdom_EBold;
hxdom_EBold.__name__ = true;
hxdom_EBold.__super__ = hxdom_VirtualElement;
hxdom_EBold.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EBold
});
var hxdom_EBase = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLBaseElement,"BASE"));
};
$hxClasses["hxdom.EBase"] = hxdom_EBase;
hxdom_EBase.__name__ = true;
hxdom_EBase.__super__ = hxdom_VirtualElement;
hxdom_EBase.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EBase
});
var hxdom_EBiIsolation = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"BDI"));
};
$hxClasses["hxdom.EBiIsolation"] = hxdom_EBiIsolation;
hxdom_EBiIsolation.__name__ = true;
hxdom_EBiIsolation.__super__ = hxdom_VirtualElement;
hxdom_EBiIsolation.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EBiIsolation
});
var hxdom_EBiOverride = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"BDO"));
};
$hxClasses["hxdom.EBiOverride"] = hxdom_EBiOverride;
hxdom_EBiOverride.__name__ = true;
hxdom_EBiOverride.__super__ = hxdom_VirtualElement;
hxdom_EBiOverride.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EBiOverride
});
var hxdom_EBlockQuote = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"BLOCKQUOTE"));
};
$hxClasses["hxdom.EBlockQuote"] = hxdom_EBlockQuote;
hxdom_EBlockQuote.__name__ = true;
hxdom_EBlockQuote.__super__ = hxdom_VirtualElement;
hxdom_EBlockQuote.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EBlockQuote
});
var hxdom_EBody = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLBodyElement,"BODY"));
};
$hxClasses["hxdom.EBody"] = hxdom_EBody;
hxdom_EBody.__name__ = true;
hxdom_EBody.__super__ = hxdom_VirtualElement;
hxdom_EBody.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EBody
});
var hxdom_EBreak = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLBRElement,"BR"));
};
$hxClasses["hxdom.EBreak"] = hxdom_EBreak;
hxdom_EBreak.__name__ = true;
hxdom_EBreak.__super__ = hxdom_VirtualElement;
hxdom_EBreak.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EBreak
});
var hxdom_EButton = function(type) {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLButtonElement,"BUTTON"));
	if(type == null) type = hxdom_ButtonType.Button;
	hxdom_DomTools.setAttr(this,"type",(function($this) {
		var $r;
		switch(type[1]) {
		case 0:
			$r = "button";
			break;
		case 1:
			$r = "submit";
			break;
		case 2:
			$r = "reset";
			break;
		}
		return $r;
	}(this)));
};
$hxClasses["hxdom.EButton"] = hxdom_EButton;
hxdom_EButton.__name__ = true;
hxdom_EButton.__super__ = hxdom_VirtualElement;
hxdom_EButton.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EButton
});
var hxdom_ECanvas = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLCanvasElement,"CANVAS"));
};
$hxClasses["hxdom.ECanvas"] = hxdom_ECanvas;
hxdom_ECanvas.__name__ = true;
hxdom_ECanvas.__super__ = hxdom_VirtualElement;
hxdom_ECanvas.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ECanvas
});
var hxdom_ECaption = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"CAPTION"));
};
$hxClasses["hxdom.ECaption"] = hxdom_ECaption;
hxdom_ECaption.__name__ = true;
hxdom_ECaption.__super__ = hxdom_VirtualElement;
hxdom_ECaption.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ECaption
});
var hxdom_ECite = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"CITE"));
};
$hxClasses["hxdom.ECite"] = hxdom_ECite;
hxdom_ECite.__name__ = true;
hxdom_ECite.__super__ = hxdom_VirtualElement;
hxdom_ECite.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ECite
});
var hxdom_ECode = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"CODE"));
};
$hxClasses["hxdom.ECode"] = hxdom_ECode;
hxdom_ECode.__name__ = true;
hxdom_ECode.__super__ = hxdom_VirtualElement;
hxdom_ECode.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ECode
});
var hxdom_EColumn = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"COL"));
};
$hxClasses["hxdom.EColumn"] = hxdom_EColumn;
hxdom_EColumn.__name__ = true;
hxdom_EColumn.__super__ = hxdom_VirtualElement;
hxdom_EColumn.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EColumn
});
var hxdom_EColumnGroup = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"COLGROUP"));
};
$hxClasses["hxdom.EColumnGroup"] = hxdom_EColumnGroup;
hxdom_EColumnGroup.__name__ = true;
hxdom_EColumnGroup.__super__ = hxdom_VirtualElement;
hxdom_EColumnGroup.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EColumnGroup
});
var hxdom_EData = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"DATA"));
};
$hxClasses["hxdom.EData"] = hxdom_EData;
hxdom_EData.__name__ = true;
hxdom_EData.__super__ = hxdom_VirtualElement;
hxdom_EData.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EData
});
var hxdom_EDataList = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLDataListElement,"DATALIST"));
};
$hxClasses["hxdom.EDataList"] = hxdom_EDataList;
hxdom_EDataList.__name__ = true;
hxdom_EDataList.__super__ = hxdom_VirtualElement;
hxdom_EDataList.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDataList
});
var hxdom_EDescription = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"DD"));
};
$hxClasses["hxdom.EDescription"] = hxdom_EDescription;
hxdom_EDescription.__name__ = true;
hxdom_EDescription.__super__ = hxdom_VirtualElement;
hxdom_EDescription.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDescription
});
var hxdom_EDeleted = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"DEL"));
};
$hxClasses["hxdom.EDeleted"] = hxdom_EDeleted;
hxdom_EDeleted.__name__ = true;
hxdom_EDeleted.__super__ = hxdom_VirtualElement;
hxdom_EDeleted.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDeleted
});
var hxdom_EDetails = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"DETAILS"));
};
$hxClasses["hxdom.EDetails"] = hxdom_EDetails;
hxdom_EDetails.__name__ = true;
hxdom_EDetails.__super__ = hxdom_VirtualElement;
hxdom_EDetails.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDetails
});
var hxdom_EDefinition = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"DEFINITION"));
};
$hxClasses["hxdom.EDefinition"] = hxdom_EDefinition;
hxdom_EDefinition.__name__ = true;
hxdom_EDefinition.__super__ = hxdom_VirtualElement;
hxdom_EDefinition.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDefinition
});
var hxdom_EDescriptionList = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLDListElement,"DL"));
};
$hxClasses["hxdom.EDescriptionList"] = hxdom_EDescriptionList;
hxdom_EDescriptionList.__name__ = true;
hxdom_EDescriptionList.__super__ = hxdom_VirtualElement;
hxdom_EDescriptionList.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDescriptionList
});
var hxdom_EDefinitionTerm = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"DT"));
};
$hxClasses["hxdom.EDefinitionTerm"] = hxdom_EDefinitionTerm;
hxdom_EDefinitionTerm.__name__ = true;
hxdom_EDefinitionTerm.__super__ = hxdom_VirtualElement;
hxdom_EDefinitionTerm.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EDefinitionTerm
});
var hxdom_EEmphasis = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"EM"));
};
$hxClasses["hxdom.EEmphasis"] = hxdom_EEmphasis;
hxdom_EEmphasis.__name__ = true;
hxdom_EEmphasis.__super__ = hxdom_VirtualElement;
hxdom_EEmphasis.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EEmphasis
});
var hxdom_EEmbed = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLEmbedElement,"EMBED"));
};
$hxClasses["hxdom.EEmbed"] = hxdom_EEmbed;
hxdom_EEmbed.__name__ = true;
hxdom_EEmbed.__super__ = hxdom_VirtualElement;
hxdom_EEmbed.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EEmbed
});
var hxdom_EFieldSet = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLFieldSetElement,"FIELDSET"));
};
$hxClasses["hxdom.EFieldSet"] = hxdom_EFieldSet;
hxdom_EFieldSet.__name__ = true;
hxdom_EFieldSet.__super__ = hxdom_VirtualElement;
hxdom_EFieldSet.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EFieldSet
});
var hxdom_EFigureCaption = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"FIGCAPTION"));
};
$hxClasses["hxdom.EFigureCaption"] = hxdom_EFigureCaption;
hxdom_EFigureCaption.__name__ = true;
hxdom_EFigureCaption.__super__ = hxdom_VirtualElement;
hxdom_EFigureCaption.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EFigureCaption
});
var hxdom_EFigure = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"FIGURE"));
};
$hxClasses["hxdom.EFigure"] = hxdom_EFigure;
hxdom_EFigure.__name__ = true;
hxdom_EFigure.__super__ = hxdom_VirtualElement;
hxdom_EFigure.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EFigure
});
var hxdom_EFooter = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"FOOTER"));
};
$hxClasses["hxdom.EFooter"] = hxdom_EFooter;
hxdom_EFooter.__name__ = true;
hxdom_EFooter.__super__ = hxdom_VirtualElement;
hxdom_EFooter.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EFooter
});
var hxdom_EForm = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLFormElement,"FORM"));
};
$hxClasses["hxdom.EForm"] = hxdom_EForm;
hxdom_EForm.__name__ = true;
hxdom_EForm.__super__ = hxdom_VirtualElement;
hxdom_EForm.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EForm
});
var hxdom_EHeader1 = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"H1"));
};
$hxClasses["hxdom.EHeader1"] = hxdom_EHeader1;
hxdom_EHeader1.__name__ = true;
hxdom_EHeader1.__super__ = hxdom_VirtualElement;
hxdom_EHeader1.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHeader1
});
var hxdom_EHeader2 = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"H2"));
};
$hxClasses["hxdom.EHeader2"] = hxdom_EHeader2;
hxdom_EHeader2.__name__ = true;
hxdom_EHeader2.__super__ = hxdom_VirtualElement;
hxdom_EHeader2.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHeader2
});
var hxdom_EHeader3 = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"H3"));
};
$hxClasses["hxdom.EHeader3"] = hxdom_EHeader3;
hxdom_EHeader3.__name__ = true;
hxdom_EHeader3.__super__ = hxdom_VirtualElement;
hxdom_EHeader3.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHeader3
});
var hxdom_EHeader4 = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"H4"));
};
$hxClasses["hxdom.EHeader4"] = hxdom_EHeader4;
hxdom_EHeader4.__name__ = true;
hxdom_EHeader4.__super__ = hxdom_VirtualElement;
hxdom_EHeader4.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHeader4
});
var hxdom_EHeader5 = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"H5"));
};
$hxClasses["hxdom.EHeader5"] = hxdom_EHeader5;
hxdom_EHeader5.__name__ = true;
hxdom_EHeader5.__super__ = hxdom_VirtualElement;
hxdom_EHeader5.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHeader5
});
var hxdom_EHeader6 = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"H6"));
};
$hxClasses["hxdom.EHeader6"] = hxdom_EHeader6;
hxdom_EHeader6.__name__ = true;
hxdom_EHeader6.__super__ = hxdom_VirtualElement;
hxdom_EHeader6.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHeader6
});
var hxdom_EHead = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLHeadElement,"HEAD"));
};
$hxClasses["hxdom.EHead"] = hxdom_EHead;
hxdom_EHead.__name__ = true;
hxdom_EHead.__super__ = hxdom_VirtualElement;
hxdom_EHead.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHead
});
var hxdom_EHeader = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"HEADER"));
};
$hxClasses["hxdom.EHeader"] = hxdom_EHeader;
hxdom_EHeader.__name__ = true;
hxdom_EHeader.__super__ = hxdom_VirtualElement;
hxdom_EHeader.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHeader
});
var hxdom_EHorizontalRule = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLHRElement,"HR"));
};
$hxClasses["hxdom.EHorizontalRule"] = hxdom_EHorizontalRule;
hxdom_EHorizontalRule.__name__ = true;
hxdom_EHorizontalRule.__super__ = hxdom_VirtualElement;
hxdom_EHorizontalRule.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EHorizontalRule
});
var hxdom_EItalics = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"I"));
};
$hxClasses["hxdom.EItalics"] = hxdom_EItalics;
hxdom_EItalics.__name__ = true;
hxdom_EItalics.__super__ = hxdom_VirtualElement;
hxdom_EItalics.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EItalics
});
var hxdom_EIFrame = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLIFrameElement,"IFRAME"));
};
$hxClasses["hxdom.EIFrame"] = hxdom_EIFrame;
hxdom_EIFrame.__name__ = true;
hxdom_EIFrame.__super__ = hxdom_VirtualElement;
hxdom_EIFrame.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EIFrame
});
var hxdom_EImage = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLImageElement,"IMG"));
};
$hxClasses["hxdom.EImage"] = hxdom_EImage;
hxdom_EImage.__name__ = true;
hxdom_EImage.__super__ = hxdom_VirtualElement;
hxdom_EImage.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EImage
});
var hxdom_EInput = function(type) {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLInputElement,"INPUT"));
	hxdom_DomTools.setAttr(this,"type",(function($this) {
		var $r;
		switch(type[1]) {
		case 0:
			$r = "button";
			break;
		case 1:
			$r = "checkbox";
			break;
		case 2:
			$r = "color";
			break;
		case 3:
			$r = "date";
			break;
		case 4:
			$r = "datetime";
			break;
		case 5:
			$r = "datetime-local";
			break;
		case 6:
			$r = "email";
			break;
		case 7:
			$r = "file";
			break;
		case 8:
			$r = "hidden";
			break;
		case 9:
			$r = "image";
			break;
		case 10:
			$r = "month";
			break;
		case 11:
			$r = "number";
			break;
		case 12:
			$r = "password";
			break;
		case 13:
			$r = "radio";
			break;
		case 14:
			$r = "range";
			break;
		case 15:
			$r = "reset";
			break;
		case 16:
			$r = "search";
			break;
		case 17:
			$r = "submit";
			break;
		case 18:
			$r = "tel";
			break;
		case 19:
			$r = "text";
			break;
		case 20:
			$r = "time";
			break;
		case 21:
			$r = "url";
			break;
		case 22:
			$r = "week";
			break;
		}
		return $r;
	}(this)));
};
$hxClasses["hxdom.EInput"] = hxdom_EInput;
hxdom_EInput.__name__ = true;
hxdom_EInput.__super__ = hxdom_VirtualElement;
hxdom_EInput.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EInput
});
var hxdom_EInserted = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"INS"));
};
$hxClasses["hxdom.EInserted"] = hxdom_EInserted;
hxdom_EInserted.__name__ = true;
hxdom_EInserted.__super__ = hxdom_VirtualElement;
hxdom_EInserted.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EInserted
});
var hxdom_EKeyboard = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"KBD"));
};
$hxClasses["hxdom.EKeyboard"] = hxdom_EKeyboard;
hxdom_EKeyboard.__name__ = true;
hxdom_EKeyboard.__super__ = hxdom_VirtualElement;
hxdom_EKeyboard.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EKeyboard
});
var hxdom_EKeygen = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"KEYGEN"));
};
$hxClasses["hxdom.EKeygen"] = hxdom_EKeygen;
hxdom_EKeygen.__name__ = true;
hxdom_EKeygen.__super__ = hxdom_VirtualElement;
hxdom_EKeygen.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EKeygen
});
var hxdom_ELabel = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLLabelElement,"LABEL"));
};
$hxClasses["hxdom.ELabel"] = hxdom_ELabel;
hxdom_ELabel.__name__ = true;
hxdom_ELabel.__super__ = hxdom_VirtualElement;
hxdom_ELabel.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ELabel
});
var hxdom_ELegend = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLLegendElement,"LEGEND"));
};
$hxClasses["hxdom.ELegend"] = hxdom_ELegend;
hxdom_ELegend.__name__ = true;
hxdom_ELegend.__super__ = hxdom_VirtualElement;
hxdom_ELegend.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ELegend
});
var hxdom_ELink = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLLinkElement,"LINK"));
};
$hxClasses["hxdom.ELink"] = hxdom_ELink;
hxdom_ELink.__name__ = true;
hxdom_ELink.__super__ = hxdom_VirtualElement;
hxdom_ELink.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ELink
});
var hxdom_EMain = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"MAIN"));
};
$hxClasses["hxdom.EMain"] = hxdom_EMain;
hxdom_EMain.__name__ = true;
hxdom_EMain.__super__ = hxdom_VirtualElement;
hxdom_EMain.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EMain
});
var hxdom_EMap = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLMapElement,"MAP"));
};
$hxClasses["hxdom.EMap"] = hxdom_EMap;
hxdom_EMap.__name__ = true;
hxdom_EMap.__super__ = hxdom_VirtualElement;
hxdom_EMap.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EMap
});
var hxdom_EMark = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"MARK"));
};
$hxClasses["hxdom.EMark"] = hxdom_EMark;
hxdom_EMark.__name__ = true;
hxdom_EMark.__super__ = hxdom_VirtualElement;
hxdom_EMark.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EMark
});
var hxdom_EMenu = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLMenuElement,"MENU"));
};
$hxClasses["hxdom.EMenu"] = hxdom_EMenu;
hxdom_EMenu.__name__ = true;
hxdom_EMenu.__super__ = hxdom_VirtualElement;
hxdom_EMenu.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EMenu
});
var hxdom_EMenuItem = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"MENUITEM"));
};
$hxClasses["hxdom.EMenuItem"] = hxdom_EMenuItem;
hxdom_EMenuItem.__name__ = true;
hxdom_EMenuItem.__super__ = hxdom_VirtualElement;
hxdom_EMenuItem.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EMenuItem
});
var hxdom_EMeta = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLMetaElement,"META"));
};
$hxClasses["hxdom.EMeta"] = hxdom_EMeta;
hxdom_EMeta.__name__ = true;
hxdom_EMeta.__super__ = hxdom_VirtualElement;
hxdom_EMeta.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EMeta
});
var hxdom_EMeter = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLMeterElement,"METER"));
};
$hxClasses["hxdom.EMeter"] = hxdom_EMeter;
hxdom_EMeter.__name__ = true;
hxdom_EMeter.__super__ = hxdom_VirtualElement;
hxdom_EMeter.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EMeter
});
var hxdom_ENav = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"NAV"));
};
$hxClasses["hxdom.ENav"] = hxdom_ENav;
hxdom_ENav.__name__ = true;
hxdom_ENav.__super__ = hxdom_VirtualElement;
hxdom_ENav.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ENav
});
var hxdom_ENoScript = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"NOSCRIPT"));
};
$hxClasses["hxdom.ENoScript"] = hxdom_ENoScript;
hxdom_ENoScript.__name__ = true;
hxdom_ENoScript.__super__ = hxdom_VirtualElement;
hxdom_ENoScript.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ENoScript
});
var hxdom_EObject = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLObjectElement,"OBJECT"));
};
$hxClasses["hxdom.EObject"] = hxdom_EObject;
hxdom_EObject.__name__ = true;
hxdom_EObject.__super__ = hxdom_VirtualElement;
hxdom_EObject.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EObject
});
var hxdom_EOrderedList = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLOListElement,"OL"));
};
$hxClasses["hxdom.EOrderedList"] = hxdom_EOrderedList;
hxdom_EOrderedList.__name__ = true;
hxdom_EOrderedList.__super__ = hxdom_VirtualElement;
hxdom_EOrderedList.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EOrderedList
});
var hxdom_EOptionGroup = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLOptGroupElement,"OPTGROUP"));
};
$hxClasses["hxdom.EOptionGroup"] = hxdom_EOptionGroup;
hxdom_EOptionGroup.__name__ = true;
hxdom_EOptionGroup.__super__ = hxdom_VirtualElement;
hxdom_EOptionGroup.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EOptionGroup
});
var hxdom_EOption = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLOptionElement,"OPTION"));
};
$hxClasses["hxdom.EOption"] = hxdom_EOption;
hxdom_EOption.__name__ = true;
hxdom_EOption.__super__ = hxdom_VirtualElement;
hxdom_EOption.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EOption
});
var hxdom_EOutput = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLOutputElement,"OUTPUT"));
};
$hxClasses["hxdom.EOutput"] = hxdom_EOutput;
hxdom_EOutput.__name__ = true;
hxdom_EOutput.__super__ = hxdom_VirtualElement;
hxdom_EOutput.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EOutput
});
var hxdom_EParagraph = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLParagraphElement,"P"));
};
$hxClasses["hxdom.EParagraph"] = hxdom_EParagraph;
hxdom_EParagraph.__name__ = true;
hxdom_EParagraph.__super__ = hxdom_VirtualElement;
hxdom_EParagraph.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EParagraph
});
var hxdom_EParam = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLParamElement,"PARAM"));
};
$hxClasses["hxdom.EParam"] = hxdom_EParam;
hxdom_EParam.__name__ = true;
hxdom_EParam.__super__ = hxdom_VirtualElement;
hxdom_EParam.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EParam
});
var hxdom_EPre = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLPreElement,"PRE"));
};
$hxClasses["hxdom.EPre"] = hxdom_EPre;
hxdom_EPre.__name__ = true;
hxdom_EPre.__super__ = hxdom_VirtualElement;
hxdom_EPre.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EPre
});
var hxdom_EProgress = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLProgressElement,"PROGRESS"));
};
$hxClasses["hxdom.EProgress"] = hxdom_EProgress;
hxdom_EProgress.__name__ = true;
hxdom_EProgress.__super__ = hxdom_VirtualElement;
hxdom_EProgress.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EProgress
});
var hxdom_EQuote = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLQuoteElement,"Q"));
};
$hxClasses["hxdom.EQuote"] = hxdom_EQuote;
hxdom_EQuote.__name__ = true;
hxdom_EQuote.__super__ = hxdom_VirtualElement;
hxdom_EQuote.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EQuote
});
var hxdom_ERubyParen = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"RP"));
};
$hxClasses["hxdom.ERubyParen"] = hxdom_ERubyParen;
hxdom_ERubyParen.__name__ = true;
hxdom_ERubyParen.__super__ = hxdom_VirtualElement;
hxdom_ERubyParen.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ERubyParen
});
var hxdom_ERubyPrononcuation = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"RT"));
};
$hxClasses["hxdom.ERubyPrononcuation"] = hxdom_ERubyPrononcuation;
hxdom_ERubyPrononcuation.__name__ = true;
hxdom_ERubyPrononcuation.__super__ = hxdom_VirtualElement;
hxdom_ERubyPrononcuation.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ERubyPrononcuation
});
var hxdom_ERuby = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"RUBY"));
};
$hxClasses["hxdom.ERuby"] = hxdom_ERuby;
hxdom_ERuby.__name__ = true;
hxdom_ERuby.__super__ = hxdom_VirtualElement;
hxdom_ERuby.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ERuby
});
var hxdom_EStrike = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"S"));
};
$hxClasses["hxdom.EStrike"] = hxdom_EStrike;
hxdom_EStrike.__name__ = true;
hxdom_EStrike.__super__ = hxdom_VirtualElement;
hxdom_EStrike.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EStrike
});
var hxdom_ESample = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"SAMP"));
};
$hxClasses["hxdom.ESample"] = hxdom_ESample;
hxdom_ESample.__name__ = true;
hxdom_ESample.__super__ = hxdom_VirtualElement;
hxdom_ESample.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESample
});
var hxdom_EScript = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLScriptElement,"SCRIPT"));
};
$hxClasses["hxdom.EScript"] = hxdom_EScript;
hxdom_EScript.__name__ = true;
hxdom_EScript.__super__ = hxdom_VirtualElement;
hxdom_EScript.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EScript
});
var hxdom_ESection = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"SECTION"));
};
$hxClasses["hxdom.ESection"] = hxdom_ESection;
hxdom_ESection.__name__ = true;
hxdom_ESection.__super__ = hxdom_VirtualElement;
hxdom_ESection.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESection
});
var hxdom_ESelect = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLSelectElement,"SELECT"));
};
$hxClasses["hxdom.ESelect"] = hxdom_ESelect;
hxdom_ESelect.__name__ = true;
hxdom_ESelect.__super__ = hxdom_VirtualElement;
hxdom_ESelect.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESelect
});
var hxdom_ESmall = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"SMALL"));
};
$hxClasses["hxdom.ESmall"] = hxdom_ESmall;
hxdom_ESmall.__name__ = true;
hxdom_ESmall.__super__ = hxdom_VirtualElement;
hxdom_ESmall.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESmall
});
var hxdom_ESource = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLSourceElement,"SOURCE"));
};
$hxClasses["hxdom.ESource"] = hxdom_ESource;
hxdom_ESource.__name__ = true;
hxdom_ESource.__super__ = hxdom_VirtualElement;
hxdom_ESource.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESource
});
var hxdom_ESpan = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLSpanElement,"SPAN"));
};
$hxClasses["hxdom.ESpan"] = hxdom_ESpan;
hxdom_ESpan.__name__ = true;
hxdom_ESpan.__super__ = hxdom_VirtualElement;
hxdom_ESpan.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESpan
});
var hxdom_EStrong = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"STRONG"));
};
$hxClasses["hxdom.EStrong"] = hxdom_EStrong;
hxdom_EStrong.__name__ = true;
hxdom_EStrong.__super__ = hxdom_VirtualElement;
hxdom_EStrong.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EStrong
});
var hxdom_EStyle = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLStyleElement,"STYLE"));
};
$hxClasses["hxdom.EStyle"] = hxdom_EStyle;
hxdom_EStyle.__name__ = true;
hxdom_EStyle.__super__ = hxdom_VirtualElement;
hxdom_EStyle.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EStyle
});
var hxdom_ESub = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"SUB"));
};
$hxClasses["hxdom.ESub"] = hxdom_ESub;
hxdom_ESub.__name__ = true;
hxdom_ESub.__super__ = hxdom_VirtualElement;
hxdom_ESub.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESub
});
var hxdom_ESummary = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"SUMMARY"));
};
$hxClasses["hxdom.ESummary"] = hxdom_ESummary;
hxdom_ESummary.__name__ = true;
hxdom_ESummary.__super__ = hxdom_VirtualElement;
hxdom_ESummary.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESummary
});
var hxdom_ESup = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"SUP"));
};
$hxClasses["hxdom.ESup"] = hxdom_ESup;
hxdom_ESup.__name__ = true;
hxdom_ESup.__super__ = hxdom_VirtualElement;
hxdom_ESup.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ESup
});
var hxdom_ETable = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTableElement,"TABLE"));
};
$hxClasses["hxdom.ETable"] = hxdom_ETable;
hxdom_ETable.__name__ = true;
hxdom_ETable.__super__ = hxdom_VirtualElement;
hxdom_ETable.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETable
});
var hxdom_ETableBody = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTableSectionElement,"TBODY"));
};
$hxClasses["hxdom.ETableBody"] = hxdom_ETableBody;
hxdom_ETableBody.__name__ = true;
hxdom_ETableBody.__super__ = hxdom_VirtualElement;
hxdom_ETableBody.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETableBody
});
var hxdom_ETableCell = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTableCellElement,"TD"));
};
$hxClasses["hxdom.ETableCell"] = hxdom_ETableCell;
hxdom_ETableCell.__name__ = true;
hxdom_ETableCell.__super__ = hxdom_VirtualElement;
hxdom_ETableCell.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETableCell
});
var hxdom_ETextArea = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTextAreaElement,"TEXTAREA"));
};
$hxClasses["hxdom.ETextArea"] = hxdom_ETextArea;
hxdom_ETextArea.__name__ = true;
hxdom_ETextArea.__super__ = hxdom_VirtualElement;
hxdom_ETextArea.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETextArea
});
var hxdom_ETableFooter = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTableSectionElement,"TFOOT"));
};
$hxClasses["hxdom.ETableFooter"] = hxdom_ETableFooter;
hxdom_ETableFooter.__name__ = true;
hxdom_ETableFooter.__super__ = hxdom_VirtualElement;
hxdom_ETableFooter.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETableFooter
});
var hxdom_ETableHeaderCell = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTableCellElement,"TH"));
};
$hxClasses["hxdom.ETableHeaderCell"] = hxdom_ETableHeaderCell;
hxdom_ETableHeaderCell.__name__ = true;
hxdom_ETableHeaderCell.__super__ = hxdom_VirtualElement;
hxdom_ETableHeaderCell.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETableHeaderCell
});
var hxdom_ETableHeader = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTableSectionElement,"THEAD"));
};
$hxClasses["hxdom.ETableHeader"] = hxdom_ETableHeader;
hxdom_ETableHeader.__name__ = true;
hxdom_ETableHeader.__super__ = hxdom_VirtualElement;
hxdom_ETableHeader.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETableHeader
});
var hxdom_ETime = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"TIME"));
};
$hxClasses["hxdom.ETime"] = hxdom_ETime;
hxdom_ETime.__name__ = true;
hxdom_ETime.__super__ = hxdom_VirtualElement;
hxdom_ETime.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETime
});
var hxdom_ETitle = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTitleElement,"TITLE"));
};
$hxClasses["hxdom.ETitle"] = hxdom_ETitle;
hxdom_ETitle.__name__ = true;
hxdom_ETitle.__super__ = hxdom_VirtualElement;
hxdom_ETitle.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETitle
});
var hxdom_ETableRow = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTableRowElement,"TR"));
};
$hxClasses["hxdom.ETableRow"] = hxdom_ETableRow;
hxdom_ETableRow.__name__ = true;
hxdom_ETableRow.__super__ = hxdom_VirtualElement;
hxdom_ETableRow.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETableRow
});
var hxdom_ETrack = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLTrackElement,"TRACK"));
};
$hxClasses["hxdom.ETrack"] = hxdom_ETrack;
hxdom_ETrack.__name__ = true;
hxdom_ETrack.__super__ = hxdom_VirtualElement;
hxdom_ETrack.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_ETrack
});
var hxdom_EUnderline = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"U"));
};
$hxClasses["hxdom.EUnderline"] = hxdom_EUnderline;
hxdom_EUnderline.__name__ = true;
hxdom_EUnderline.__super__ = hxdom_VirtualElement;
hxdom_EUnderline.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EUnderline
});
var hxdom_EUnorderedList = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLUListElement,"UL"));
};
$hxClasses["hxdom.EUnorderedList"] = hxdom_EUnorderedList;
hxdom_EUnorderedList.__name__ = true;
hxdom_EUnorderedList.__super__ = hxdom_VirtualElement;
hxdom_EUnorderedList.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EUnorderedList
});
var hxdom_EVar = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"VAR"));
};
$hxClasses["hxdom.EVar"] = hxdom_EVar;
hxdom_EVar.__name__ = true;
hxdom_EVar.__super__ = hxdom_VirtualElement;
hxdom_EVar.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EVar
});
var hxdom_EVideo = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLVideoElement,"VIDEO"));
};
$hxClasses["hxdom.EVideo"] = hxdom_EVideo;
hxdom_EVideo.__name__ = true;
hxdom_EVideo.__super__ = hxdom_VirtualElement;
hxdom_EVideo.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EVideo
});
var hxdom_EWordBreak = function() {
	hxdom_VirtualElement.call(this,hxdom_VirtualNode.buildElement(HTMLElement,"WBR"));
};
$hxClasses["hxdom.EWordBreak"] = hxdom_EWordBreak;
hxdom_EWordBreak.__name__ = true;
hxdom_EWordBreak.__super__ = hxdom_VirtualElement;
hxdom_EWordBreak.prototype = $extend(hxdom_VirtualElement.prototype,{
	__class__: hxdom_EWordBreak
});
var hxdom_Text = function(txt) {
	hxdom_VirtualNode.call(this,hxdom_VirtualNode.buildText(txt));
};
$hxClasses["hxdom.Text"] = hxdom_Text;
hxdom_Text.__name__ = true;
hxdom_Text.__super__ = hxdom_VirtualNode;
hxdom_Text.prototype = $extend(hxdom_VirtualNode.prototype,{
	__class__: hxdom_Text
});
var hxdom_IEventDispatcher = function() { };
$hxClasses["hxdom.IEventDispatcher"] = hxdom_IEventDispatcher;
hxdom_IEventDispatcher.__name__ = true;
hxdom_IEventDispatcher.prototype = {
	__class__: hxdom_IEventDispatcher
};
var hxdom_EventDispatcher = function() { };
$hxClasses["hxdom.EventDispatcher"] = hxdom_EventDispatcher;
hxdom_EventDispatcher.__name__ = true;
hxdom_EventDispatcher.__interfaces__ = [hxdom_IEventDispatcher];
hxdom_EventDispatcher.prototype = {
	__addEventListener: function(type,handler,useCapture) {
		if(useCapture == null) useCapture = false;
		if(this.__listeners == null) this.__listeners = new haxe_ds_StringMap();
		var list = this.__listeners.get(type);
		var obj = { handler : handler, cap : useCapture};
		if(list == null) {
			list = new List();
			list.add(obj);
			this.__listeners.set(type,list);
		} else {
			var _g_head = list.h;
			var _g_val = null;
			while(_g_head != null) {
				var i;
				i = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(i.handler.isSame(handler) && i.cap == useCapture) return;
			}
			list.add(obj);
		}
	}
	,__removeEventListener: function(type,handler,useCapture) {
		if(useCapture == null) useCapture = false;
		if(this.__listeners == null || !this.__listeners.exists(type)) return;
		var list = this.__listeners.get(type);
		var _g_head = list.h;
		var _g_val = null;
		while(_g_head != null) {
			var i;
			i = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(i.handler.isSame(handler) && i.cap == useCapture) {
				list.remove(i);
				break;
			}
		}
		if(list.length == 0) this.__listeners.remove(type);
	}
	,__callListeners: function(event,capture) {
		if(this.__listeners == null) return;
		if(event.target == this) event.eventPhase = 2; else if(capture) event.eventPhase = 1; else event.eventPhase = 3;
		var list = this.__listeners.get(event.type);
		if(list != null) {
			var _g_head = list.h;
			var _g_val = null;
			while(_g_head != null) {
				var i;
				i = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(i.cap == capture) {
					Reflect.callMethod(i.handler.inst,Reflect.field(i.handler.inst,i.handler.func),[event]);
					if(Reflect.field(event,"cancelImmediate") == true) break;
				}
			}
		}
	}
	,__capturePhase: function(event) {
		event.currentTarget = this;
		if(js_Boot.__instanceof(this,Node)) {
			var node = this;
			if(node.parentNode != null) {
				if(event.bubbles) {
					if(!node.parentNode.__capturePhase(event) && this != event.target) return false;
				}
			} else if(!js_Boot.__instanceof(this,HTMLHtmlElement)) return false;
		}
		if(!event.cancelable || !event.cancelBubble) this.__callListeners(event,true);
		return true;
	}
	,__bubblePhase: function(event,inDom) {
		if(inDom == null) inDom = true;
		event.currentTarget = this;
		if(!event.cancelable || !event.cancelBubble) this.__callListeners(event,false);
		if(inDom) {
			if(js_Boot.__instanceof(this,Node)) {
				var node = this;
				if(node.parentNode != null && event.bubbles) node.parentNode.__bubblePhase(event);
			}
		}
	}
	,dispatchEvent: function(event) {
		var evt = { };
		for (var f in event) {
		if (f != 'returnValue') evt[f] = event[f];
		}
		evt.__proto__ = event.__proto__;
		evt.target = this;
		var inDom = this.__capturePhase(evt);
		this.__bubblePhase(evt,inDom);
		return !event.defaultPrevented;
	}
	,__class__: hxdom_EventDispatcher
};
var hxdom_EventDispatcherMacro = function() { };
$hxClasses["hxdom.EventDispatcherMacro"] = hxdom_EventDispatcherMacro;
hxdom_EventDispatcherMacro.__name__ = true;
var hxdom_SFunc = function(inst,func,origFunc) {
	this.inst = inst;
	this.func = func;
};
$hxClasses["hxdom.SFunc"] = hxdom_SFunc;
hxdom_SFunc.__name__ = true;
hxdom_SFunc.prototype = {
	call: function(args) {
		if(args == null) args = [];
		return Reflect.callMethod(this.inst,Reflect.field(this.inst,this.func),args);
	}
	,isSame: function(other) {
		return this.inst == other.inst && this.func == other.func;
	}
	,__class__: hxdom_SFunc
};
var hxdom_js_Boot = function() {
	haxe_Unserializer.call(this,"");
	this.elementLookup = new haxe_ds_IntMap();
	this.initFuncs = new List();
};
$hxClasses["hxdom.js.Boot"] = hxdom_js_Boot;
hxdom_js_Boot.__name__ = true;
hxdom_js_Boot.init = function() {
	var html = window.document.childNodes[1];
	var boot = new hxdom_js_Boot();
	boot.buildElementLookup(html);
	boot.unserializeNode(html);
	var _g_head = boot.initFuncs.h;
	var _g_val = null;
	while(_g_head != null) {
		var i;
		i = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		i.call();
	}
	var body = Reflect.field(window.document.body,"__vdom");
	var observe = Reflect.field(body,"__observe");
	if(observe) hxdom_DomTools.observe(body);
	return Reflect.field(html,"__vdom");
};
hxdom_js_Boot.__super__ = haxe_Unserializer;
hxdom_js_Boot.prototype = $extend(haxe_Unserializer.prototype,{
	element: function(e) {
		var velem = Reflect.field(e,"__vdom");
		if(js_Boot.__instanceof(velem,hxdom_js_ClientOnly)) this.initFuncs.add(new hxdom_SFunc(velem,"__hxdomBoot",null));
		if(Object.prototype.hasOwnProperty.call(e.dataset,"hxevents")) {
			var listeners = this.doUnserialize(Reflect.field(e.dataset,"hxevents"));
			var $it0 = listeners.keys();
			while( $it0.hasNext() ) {
				var eventType = $it0.next();
				var _g = (__map_reserved[eventType] != null?listeners.getReserved(eventType):listeners.h[eventType]).iterator();
				while(_g.head != null) {
					var eh = [(function($this) {
						var $r;
						_g.val = _g.head[0];
						_g.head = _g.head[1];
						$r = _g.val;
						return $r;
					}(this))];
					e.addEventListener(eventType,(function(eh) {
						return function(e1) {
							eh[0].handler.call([e1]);
						};
					})(eh),eh[0].cap);
				}
			}
		}
		var sortedFields = Reflect.fields(e.dataset);
		sortedFields.sort(function(a,b) {
			if(a < b) return -1; else return 1;
		});
		var _g1 = 0;
		while(_g1 < sortedFields.length) {
			var i = sortedFields[_g1];
			++_g1;
			if(StringTools.startsWith(i,"hxd")) {
				var key = HxOverrides.substr(i,3,null);
				Reflect.setField(velem,key,this.doUnserialize(Reflect.field(e.dataset,i)));
			}
		}
	}
	,unserializeNode: function(node) {
		var _g = node.nodeType;
		switch(_g) {
		case 1:
			this.element(node);
			var _g2 = 0;
			var _g1 = node.childNodes.length;
			while(_g2 < _g1) {
				var i = _g2++;
				this.unserializeNode(node.childNodes[i]);
			}
			break;
		}
	}
	,buildElementLookup: function(node) {
		if(node.nodeType == 1) {
			var el = node;
			var cls = Type.resolveClass(Reflect.field(el.dataset,"hxclass"));
			if(cls != null) {
				var velem = Type.createEmptyInstance(cls);
				node.__vdom = velem;
				velem.node = node;
				var first = true;
				var remainingStr = null;
				var child = node.firstChild;
				var _g = 0;
				var _g1 = el.getAttribute("data-hxid").split(" ");
				while(_g < _g1.length) {
					var i = _g1[_g];
					++_g;
					if(first) {
						var id = Std.parseInt(i);
						velem.id = id;
						this.elementLookup.h[id] = node;
						first = false;
					} else {
						var dash = i.indexOf("-");
						var id1 = Std.parseInt(HxOverrides.substr(i,0,dash));
						var len = Std.parseInt(HxOverrides.substr(i,dash + 1,null));
						var nodeToAdd = null;
						if(len > 0) {
							while(child.nodeType != 3) child = child.nextSibling;
							var txt = child;
							nodeToAdd = child;
							if(remainingStr == null && txt.length == len) child = child.nextSibling; else if(remainingStr == null) {
								remainingStr = HxOverrides.substr(txt.data,len,null);
								txt.data = HxOverrides.substr(txt.data,0,len);
							} else {
								nodeToAdd = window.document.createTextNode(HxOverrides.substr(remainingStr,0,len));
								node.insertBefore(nodeToAdd,child.nextSibling);
								if(remainingStr.length == len) remainingStr = null; else remainingStr = HxOverrides.substr(remainingStr,len,null);
								child = child.nextSibling;
							}
						} else {
							nodeToAdd = window.document.createTextNode("");
							node.insertBefore(nodeToAdd,child);
						}
						var vdomText = Type.createEmptyInstance(hxdom_Text);
						vdomText.id = id1;
						vdomText.node = nodeToAdd;
						nodeToAdd.__vdom = vdomText;
						this.elementLookup.h[id1] = nodeToAdd;
					}
				}
				var _g11 = 0;
				var _g2 = node.childNodes.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					this.buildElementLookup(node.childNodes[i1]);
				}
			} else {
				var unused = Reflect.field(el.dataset,"hxunused");
				if(unused != null) {
					var _g12 = 0;
					var _g3 = node.childNodes.length;
					while(_g12 < _g3) {
						var i2 = _g12++;
						this.buildElementLookup(node.childNodes[i2]);
					}
					node.parentElement.removeChild(node);
				}
			}
		}
	}
	,checkClientInit: function(inst) {
		if(js_Boot.__instanceof(inst,hxdom_js_ClientOnly)) this.initFuncs.add(new hxdom_SFunc(inst,"__hxdomBoot",null));
	}
	,doUnserialize: function(str) {
		this.buf = str;
		this.pos = 0;
		this.length = str.length;
		return this.unserialize();
	}
	,unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos);
		switch(_g) {
		case 68:
			this.pos++;
			var e;
			var key = this.readDigits();
			e = this.elementLookup.h[key];
			if(e == null) throw new js__$Boot_HaxeError("Missing element reference!");
			return Reflect.field(e,"__vdom");
		case 79:
			this.pos++;
			var name = haxe_Unserializer.prototype.unserialize.call(this);
			return Type.resolveClass(name);
		case 99:
			var inst = haxe_Unserializer.prototype.unserialize.call(this);
			if(js_Boot.__instanceof(inst,hxdom_js_ClientOnly)) this.initFuncs.add(new hxdom_SFunc(inst,"__hxdomBoot",null));
			return inst;
		default:
			return haxe_Unserializer.prototype.unserialize.call(this);
		}
	}
	,__class__: hxdom_js_Boot
});
var hxdom_js_ClientOnlyMacros = function() { };
$hxClasses["hxdom.js.ClientOnlyMacros"] = hxdom_js_ClientOnlyMacros;
hxdom_js_ClientOnlyMacros.__name__ = true;
var hxdom_util_Util = function() { };
$hxClasses["hxdom.util.Util"] = hxdom_util_Util;
hxdom_util_Util.__name__ = true;
hxdom_util_Util.dashToCamelCase = function(str) {
	var outStr = "";
	var caps = false;
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		var chr = HxOverrides.cca(str,i);
		if(chr == 45) caps = true; else {
			if(caps) {
				if(chr >= 97 && chr <= 122) chr += -32;
				caps = false;
			}
			outStr += String.fromCharCode(chr);
		}
	}
	return outStr;
};
hxdom_util_Util.camelCaseToDash = function(str) {
	var outStr = "";
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		var chr = HxOverrides.cca(str,i);
		if(chr >= 65 && chr <= 90) outStr += "-" + String.fromCharCode(chr - 65 + 97); else outStr += String.fromCharCode(chr);
	}
	return outStr;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
hxdom_VirtualNode.ID = 0;
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
Client.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
