---
title: AS2TS：ActionScript3在线转为TypeScript
date: 2014-11-21
tags: TypeScript,Flash
categories: project
---

做 Flash 很少用正则表达式，所以一直都不会写。。这几天恶补了一下，由于之前研究过[ActionScript 与 TypeScript 的区别](http://www.nshen.net/article/2013-05-18/as3-to-typescript/)，作为练习写了个 ActionScript 转 TypeScript 的小程序，純 html5 的。

## 试用:

https://github.nshen.net/as2ts/

## 源码(请 fork 我吧):

https://github.com/nshen/as2ts

## 转换列表：

- `Boolean` to `boolean`
- `uint` / `int` / `Number` to `number`
- `String` to `string`
- `:*` to `:any`
- `package` to `module`
- comment out `import` statements ?
- `public class` to `export class`
- `public function class_name(...):void` to `constructor(...)`
- `internal` to `public`
- `static (public|private|protected)` to `(public|private|protected) static`
- `(private|public|protected) var` to `(private|public|protected)`
- `(private|public|protected) const` to `(private|public|protected)`
- `(override) (private|public|protected) function` to `(private|public|protected)`
- `(private|public|protected) static var` to `(private|public|protected) static`
- `(private|public|protected) static const` to `(private|public|protected) static`
- `(private|public|protected) static function` to `(private|public|protected) static`
- local `const` to `var`
- `A as B` to `<B> A`
- `:Array` to `:any[]`
- `:Vector.<type> =` to `type[] =`
- `:Vector.<type>;` to `type[];`
- `: Vector.<type> {` to `type[] {`
- `new Vector.<type>(7,true)` to `[]`
- `new <type>[1,2,3]` to `[1,2,3]`
- `Vector.<type>([1, 2, 3])` to `[1, 2, 3]`
- `trace` to `console.log`

## 常见问题：

- 问：AS3 程序能转为 TS 程序了？
- 答：不能，这只是常见**语法**的转换，具体运行环境不同。

## 版本历史：

as2ts v0.1 : 2014-11-21 最初版本,实现基本功能
