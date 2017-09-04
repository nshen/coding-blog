---
title: Stage3D.js：用TypeScript与WebGL实现Stage3D API
date: 2015-02-04 17:12:00
tags: Flash,TypeScript,Webgl
categories: project
---

在入门WebGL的过程中经常与Stage3D的API对比，后干脆把Stage3D的API实现出来了，也包括了AS3的数学库。

## 一些演示：

[bunnymark](http://github.nshen.net/Stage3D.js/examples/bunnyMark/BunnyMark.html)
[a shooter game](http://github.nshen.net/Stage3D.js/examples/shooter/index.html)
[blend test](http://github.nshen.net/Stage3D.js/examples/blend.html)
[gouraudShading](http://github.nshen.net/Stage3D.js/examples/gouraudShading.html)
[load Obj model](http://github.nshen.net/Stage3D.js/examples/loadObj.html)
[textureTriangle](http://github.nshen.net/Stage3D.js/examples/textureTriangle.html)
[renderingModes](http://github.nshen.net/Stage3D.js/examples/renderingModes.html)
[drawSquare](http://github.nshen.net/Stage3D.js/examples/drawSquare.html)
[drawTriangle](http://github.nshen.net/Stage3D.js/examples/drawTriangle.html)

## 项目地址： 

https://github.com/nshen/Stage3D.js

<!-- more -->
### 最简单的画三角形的代码如下 [(效果演示)](http://github.nshen.net/Stage3D.js/examples/drawTriangle.html) :

```typescript

var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("my-canvas");

stage3d = new stageJS.Stage3D(canvas);
stage3d.addEventListener(stageJS.events.Event.CONTEXT3D_CREATE, onCreated);
stage3d.requestContext3D();

function onCreated(e: stagl.events.Event): void
{
    context3d = stage3d.context3D;
    context3d.configureBackBuffer(stage3d.stageWidth, stage3d.stageHeight, 2, true);

    var program: stagl.Program3D = context3d.createProgram();
    program.upload("shader-vs", "shader-fs"); // shaders are in html file
    context3d.setProgram(program);


    var vertexBuffer: stagl.VertexBuffer3D = context3d.createVertexBuffer(3, 7);
    vertexBuffer.uploadFromVector([
        -1, -1, 0, 1, 0, 0, 1,   //xyz rgba
        1, -1, 0, 0, 1, 0, 1,
        0, 1, 0, 0, 0, 1, 1]
        , 0, 3);

    context3d.setVertexBufferAt("va0", vertexBuffer, 0, stagl.Context3DVertexBufferFormat.FLOAT_3); // pos
    context3d.setVertexBufferAt("va1", vertexBuffer, 3, stagl.Context3DVertexBufferFormat.FLOAT_4); // color
    
    var indexBuffer: stagl.IndexBuffer3D = context3d.createIndexBuffer(3);
    indexBuffer.uploadFromVector([0, 1, 2], 0, 3);

    context3d.clear(0.0, 0.0, 0.0, 1.0);
    context3d.drawTriangles(indexBuffer);
    context3d.present();

}

```

然后我直接拿第二个例子<a href="http://github.nshen.net/Stage3D.js/examples/shooter/index.html">(a shooter game)</a> 参加了coding.net的HTML5大赛，得了个优秀作品奖：）

## 战利品：

定制 Filco 机械键盘一个

![](/image/coding.jpg)

