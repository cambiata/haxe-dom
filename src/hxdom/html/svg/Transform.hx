/****
* Copyright (C) 2013 Sam MacPherson
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
****/

package hxdom.html.svg;

import hxdom.html.Element;
import hxdom.html.NodeList;

#if (js && !use_vdom)
typedef Transform = js.html.svg.Transform;
#else
class Transform {
	
	/** A <code>matrix(…)</code> transformation */
	public static inline var SVG_TRANSFORM_MATRIX:Int = 1;

	public static inline var SVG_TRANSFORM_ROTATE:Int = 4;

	/** A <code>scale(…)</code> transformation */
	public static inline var SVG_TRANSFORM_SCALE:Int = 3;

	public static inline var SVG_TRANSFORM_SKEWX:Int = 5;

	public static inline var SVG_TRANSFORM_SKEWY:Int = 6;

	/** A <code>translate(…)</code> transformation */
	public static inline var SVG_TRANSFORM_TRANSLATE:Int = 2;

	/** The unit type is not one of predefined unit types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type. */
	public static inline var SVG_TRANSFORM_UNKNOWN:Int = 0;

	/** A convenience attribute for <code>SVG_TRANSFORM_ROTATE</code>, <code>SVG_TRANSFORM_SKEWX</code> and <code>SVG_TRANSFORM_SKEWY</code>. It holds the angle that was specified.<br> <br> For <code>SVG_TRANSFORM_MATRIX</code>, <code>SVG_TRANSFORM_TRANSLATE</code> and <code>SVG_TRANSFORM_SCALE</code>, <code>angle</code> will be zero. */
	public var angle(default,null):Float;

	/** <p>The matrix that represents this transformation. The matrix object is live, meaning that any changes made to the <code>SVGTransform</code> object are immediately reflected in the matrix object and vice versa. In case the matrix object is changed directly (i.e., without using the methods on the <code>SVGTransform</code> interface itself) then the type of the <code>SVGTransform</code> changes to <code>SVG_TRANSFORM_MATRIX</code>.</p> <ul> <li>For <code>SVG_TRANSFORM_MATRIX</code>, the matrix contains the a, b, c, d, e, f values supplied by the user.</li> <li>For <code>SVG_TRANSFORM_TRANSLATE</code>, e and f represent the translation amounts (a=1, b=0, c=0 and d=1).</li> <li>For <code>SVG_TRANSFORM_SCALE</code>, a and d represent the scale amounts (b=0, c=0, e=0 and f=0).</li> <li>For <code>SVG_TRANSFORM_SKEWX</code> and <code>SVG_TRANSFORM_SKEWY</code>, a, b, c and d represent the matrix which will result in the given skew (e=0 and f=0).</li> <li>For <code>SVG_TRANSFORM_ROTATE</code>, a, b, c, d, e and f together represent the matrix which will result in the given rotation. When the rotation is around the center point (0, 0), e and f will be zero.</li> </ul> */
	public var matrix(default,null):Matrix;

	/** The type of the value as specified by one of the SVG_TRANSFORM_* constants defined on this interface. */
	public var type(default,null):Int;

	public function setMatrix (matrix:Matrix):Void {
		
	}

	public function setRotate (angle:Float, cx:Float, cy:Float):Void {
		
	}

	public function setScale (sx:Float, sy:Float):Void {
		
	}

	public function setSkewX (angle:Float):Void {
		
	}

	public function setSkewY (angle:Float):Void {
		
	}

	public function setTranslate (tx:Float, ty:Float):Void {
		
	}
	
}
#end