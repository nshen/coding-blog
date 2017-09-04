---
title: 从 ActionScript3 到 TypeScript
date: 2013-05-18 14:56:31
tags: TypeScript,Flash
categories: article
---

以下是我总结的笔记，只涉及语法部分，有错漏请指正。

PS.我曾经用正则表达式写过一个AS3转TypeScript的[在线转换器](http://nshen.net/project/2014-11-21/as2ts/)

## 基本类型

基础类型只有这么几种，与AS3对比

| TypeScript    | ActionScript3 |
| ------------- |:-------------:|
| number| Number        |
| string| String        |
| boolean(0.8以前为bool) | Boolean       |
| any | *             |
| undefined| undefined     |
| null | null          |

<!-- more -->

<!--
<table >
  <tr><td><B>TypeScript</B></td><td><B>ActionScript3</B></td></tr>
  <tr><td>number</td><td>Number</td></tr>
  <tr><td>string</td><td>String</td></tr>
  <tr><td>boolean(0.8以前为bool)</td><td>Boolean</td></tr>
  <tr><td>any</td><td>*</td></tr>
  <tr><td>undefined</td><td>undefined</td></tr>
  <tr><td>null</td><td>null</td></tr>
</table>
-->

## 任意类型

ActionScript3 ：

```actionscript
var anyType : * = ...;
```

TypeScript：

```typescript
var anyType : any = ...;
```

## 变量修饰符

TS类似AS3 但不用写"var" ， ~~没有protected (未来也许会添加)~~ **TypeScript 1.3 加入了protected关键字，与AS3用法一致**，默认为public。

ActionScript3 ：

```actionscript
private var str: String = "abc";
public  var num: Number = 123;
var num2 :Number = 456;
static var bo: Boolean = true;
public var createTime: String;
```

TypeScript:

```typescript
private str: string = "abc";    // private property
public  num: number = 123;      // public property
num2 :number = 456;             // 不写默认也为public
static bo: boolean = true;         // static
public createTime: string;      //createTime 类型为string，值为 undefined
```

## 变量类型转换

ActionScript3 ：

```actionscript
var str:String = "abc";
var strNum:Number = Number(str);
var strNum:Number = str as Number;
```

TypeScript ：

```typescript
var str : string = "abc";
var strNum: number = <number> str; //编译报错 Cannot convert 'string' to 'number'
```

发现使用any类型会编译通过：

```typescript
var str2 :any = "abc"; //any类型
var strNum2 :number = <number> str2; //通过
strNum2 += 5; // abc5
```

用 instanceof 判断类型

```typescript
// instanceof
function CalculateArea(shape : Shape) : number {
	if (shape instanceof Square) {
		return (<Square>shape).x * (<Square>shape).y;
	}
	if (shape instanceof Ellipse) {
		return (<Ellipse>shape).r1 * (<Ellipse>shape).r2 * Math.PI;
	}
	if (shape instanceof Triangle) {
		return 0.5 * (<Triangle>shape).x * (<Triangle>shape).y;
	}
	throw new TypeError("Unsupported type!");
}

```

## 数组

Typescript数组的写法比AS3漂亮很多

ActionScript3 ：

```actionscript

var arr:Array = [1,2,3,"a","b","c"]; // 任意类型数组
var strArray:Vector.<String> = Vector.<String>(["a", "b", "c"]); //固定类型数组

```

TypeScript ：

```typescript

var arr: any[] = new Array(); // 任意类型数组
var strArr: string[] = ["a", "b", "c" ]; //固定类型数组

```

二维数组

```typescript

var array2d: string[][] = [
    ["a", "b", "c"],
    ["x", "y", "z"]
];

// or

var array2d: string[][] = new Array();
array2d.push(["a", "b", "c"]);
array2d.push(["x", "y", "z"]);

```

### Object Types

当AS3调用这样一个函数时，会有下面一个问题。

ActionScript3 ：

```actionscript

function CalculateArea ( rect : Object ):Number
{
    return rect.width * rect.height;
}

```

此时编译器并不知道rect这个Object里到底有没有width和height，只能等到runtime时才会知道。


TypeScript 引入**Object Types**解决这一问题，可以指定Object参数的具体内容，相当于让Object参数实现了interface

```typescript

function CalculateArea(rect: {width: number; height: number;}): number
{
    return rect.width * rect.height;
}

```

此时如果调用**CalculateArea({w:123,h:456});**  编译器不会通过。

**Object Types** 还支持”?"表示可选参数

```typescript

function CalculateArea(rect: {width:number; height:number; depth?:number;}): number
{
    if(rect.depth)
    {
        return rect.width * rect.height * rect.depth;
	}
    return rect.width * rect.height;
	}

	CalculateArea({w:123,h:456}); //编译器报错
	CalculateArea({width:123,height:456}); // 通过
	CalculateArea({width:123,height:456,depth:789}); // 通过

```

可以这样声明一个Object

```typescript
	var example: {
		name: string;
		id: number;
		collection: string[]; 
	} = {
		name: 'Example',
		id: 5,
		collection: ['a', 'b', 'c']
	}

```

ActionScript3 ：

```actionscript

	var fun:Function;
	var fun2:Function = someFunction;

```

TypeScript 可以指定Function需要的参数和返回值类型，叫做函数签名，所以变成了这样

```typescript

	var fun : (str: string) => void;   // fun是输入为string，没有输出的函数
	var fun2 : (num: number) => number = someFnction;  //someFnction函数必须输入输出都为number类型

```

eg.指定callback函数为string输入，any输出。

```typescript

function vote(candidate: string, callback: (result: string) => any) {
// ...
}

vote("BigPig",
	function(result: string) {
		if (result === "BigPig") {
			// ...
		}
	});

```

TypeScript 这样的语法虽然使Function更清晰了，但也带来麻烦，比如一个简单的输入输出都是string的函数就要写好长不易阅读

```typescript

var sayHello: (input: string) => string = function (s: string) {
	return "Hello " + s;
}

//保存函数的数组也写很长
var strArray: { (s: string): string; }[] = [sayHello, function aa(str: string) { return str; }];    //两个输入输出都为string的函数

```

所以引入了 函数接口

## 函数接口

```typescript

//定义输入输出都是字符串的函数的接口
interface IStringFunction {
	(input: string) : string;
}
```

上边很长的都可以这么写了

```typescript

var sayHello: IStringFunction = function (s: string) {
	return "Hello " + s;
}
var strArray: IStringFunction[];
strArray.push(sayHello);

```

## 可选参数加"?"

```typescript

//带默认值
function func (a: number, b?: bool = false): number
	{
	if (b) { return a + b };
	return a;
}

//不带默认值，要自己判断了
function func (a: number,b?: bool): number 
{
	if ( b !== null && b !== undefined )
	{
	if ( b) { return a + b };
	}
	return a;
}

```

## rest参数 ...paramName[:paramType]

```typescript

function CountDwarvesTallerThan(minHeight: number, ...dwarves: Dwarf[]) : number 
{
	var count: number = 0;
	for (var i = 0; i < dwarves.length; i++) {
		if (dwarves[i].height > minHeight) {
			count++;
		}
	}
	return count;
}

```

## Arrow Function

关于this作用域的问题，AS1时代经常用到的一个技巧：

```actionscript

var _this = this

var messenger = {
	message: "Hello World",
	start: function() {
	var _this = this;
	setTimeout(function() { 
		alert(_this.message); 
		}, 3000);
	}
};
messenger.start();

```

TypeScript把这个技巧封装到语言里了，叫**Arrow Function**

语法格式为 `()=>{}`，例子：

TypeScript：

```typescript

var messenger = {
	message: "Hello World",
	start: function() {
		setTimeout(() => { alert(this.message); }, 3000);
	}
};
messenger.start();

```

编译后的JavaScript跟上边的一样

```javascript

var messenger = {
	message: "Hello World",
	start: function () {
		var _this = this;
		setTimeout(function () {
			alert(_this.message);
		}, 3000);
	}
};
messenger.start();

```
网上找到的一个例子，

```typescript

//declare var 为环境声明，用来告诉编译器已知的变量类型，例如浏览器定义的一些变量类型

declare var menu: HTMLElement;       
declare var sideBar: HTMLElement;

class UITester {
	menuTouches: number;
	sidebarTouches: number;

	beginMenuTest(): void {
		this.menuTouches = 0;   // Right!!
		menu.onmouseenter = function (e) {
			this.menuTouches++;  // Wrong!! 
		}
	}

	beginSidebarTest(): void {
		this.sidebarTouches = 0;  // Right!!
		sideBar.onmousemove = e => {  
			this.sidebarTouches++;  // Still right!!
		}
	}
}

```

语法中用了(e)=>{} ,将e传给后边的函数，并且省略了e的括号，会编译成这样：


```javascript

var UITester = (function () {
	function UITester() { }
	UITester.prototype.beginMenuTest = function () {
		this.menuTouches = 0;
		menu.onmouseenter = function (e) {
			this.menuTouches++;
		};
	};
	UITester.prototype.beginSidebarTest = function () {
		var _this = this;
		this.sidebarTouches = 0;
		sideBar.onmousemove = function (e) {
			_this.sidebarTouches++;
		};
	};
	return UITester;
})();

```

这里有篇教程详细解释了这个语法：

>http://www.codebelt.com/typescript/arrow-function-typescript-tutorial/

## 类相关的

TypeScript中的module相当于ActionScript3中的Package

TypeScript中构造函数的函数名用**constructor** ，而不用类名。

TypeScript:

```typescript

module net.nshen { 
	export class Test1
	{
		private str: string = "abc";    // private property
		public  num: number = 123;      //public property

		public createTime: string;      //createTime = undefined

		constructor() // constructor
		{
			this.createTime = new Date().toUTCString();
		}

		static traceDate(): void
		{
			var currentDate: Date = new Date(); 
			console.log(currentDate.toUTCString());
		}
	}
}
 
```

调用Static方法

```typescript

net.nshen.Test1.traceDate();

```

## module原理

module始终是要编译成JS代码的，写一个简单的module看一下原理：

```typescript

module M {
	var s = "hello";
	export function f() {
		return s;
		}
}

M.f();
M.s;  // Error, s is not exported

```
编译后的JS代码

```javascript

var M;
(function(M) {
	var s = "hello";
	function f() {
	return s;
	}
	M.f = f;
})(M||(M={}));

```

据说这是js界很流行的写法，叫做**JavaScript module pattern**

## 函数重载

AS3和JS都是不支持函数重载的，TypeScript以一种鸡肋的方式支持着。

先写一些同名的函数声明，最后在一个同名函数里写出实现（要自己判断参数类型）：

TypeScript:

```typescript

function attr(name: string): string;
function attr(name: string, value: string): Accessor;
function attr(map: any): Accessor;

function attr(nameOrMap: any, value?: string): any {
	if (nameOrMap && typeof nameOrMap === "object") {
		// handle map case
	}
	else {
		// handle string case
	}
}

```

最终会编译成一个JS方法：

JavaScript：

```javascript

function attr(nameOrMap, value) {
	if (nameOrMap && typeof nameOrMap === "object") {
	} else {
	}
}

```
> 2014/12/07 补充 : js判断类型也是个很大的坑,详见 http://tobyho.com/2011/01/28/checking-types-in-javascript/


TypeScript 允许多个类在同一个文件里，但如果类与类在不同的文件，需要这种写法，相当于AS3 的 import


```typescript

/// <reference path="SimpleWebSocket.ts"/>
class ComplexWebSocket extends SimpleWebSocket {
...
}

```

override方法子类不需要写关键字，直接同名方法即可 ，可调用super.xxx()

```typescript

class Base {
	
	public test():number
	{
		return 1;
	}
	
	public test2():number
	{
		return 2;
	}
}

class Derived extends Base {
	
	public test():number
	{
		return 3;
	}
	
	public test2():number
	{
		return super.test();
	}
	
}

var d:Derived = new Derived();
console.log(d.test()); // 3
console.log(d.test2());// 1

```

## Enum

TypeScript支持enum关键字

```typescript

enum Color { Red, Green, Blue }
console.log(Color.Red); // 0
var c:number = Color.Green;
console.log(Color[c])  //Green

```

生成对应的js

```javascript

var Color;
(function (Color) {
	Color[Color["Red"] = 0] = "Red";
	Color[Color["Green"] = 1] = "Green";
	Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
console.log(Color.Red);
var c = Color.Green;
console.log(Color[c]);//Green

```