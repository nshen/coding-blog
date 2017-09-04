---
title: ObjectSocket-让Flash与Nodejs更方便的交互
date: 2013-06-03 14:56:31
tags: Node,Flash
categories: project
toc: true
---

flash与nodejs通过socket直接互相发送json object，解决粘包分包等问题。

### 项目地址 

[https://github.com/nshen/ObjectSocket](https://github.com/nshen/ObjectSocket)

<!-- more -->

## 测试代码

### Flash端

```actionscript

/**
	* @author nshen.net
	* @date 2013/5/31 15:47
	*/

package  
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.ProgressEvent;
	import flash.net.Socket;
	import flash.utils.ByteArray;
	import flash.utils.Endian;
	import flash.utils.setInterval;
	
	public class Main extends Sprite
	{
		private var _socket:ObjectSocket ;
		public function Main() 
		{
				_socket = new ObjectSocket(onData); //ObjectSocket是Socket的子类
				_socket.addEventListener(Event.CONNECT,onConnect);//侦听连接事件 
				_socket.addEventListener(Event.CLOSE, onClose);
				_socket.connect('127.0.0.1',2345);//连接服务端 
		}
			
		//收到服务器传来的object会回调到这里
		private function onData(obj:Object):void 
		{
				trace("receive object: ",obj.num, obj.name, obj.b , obj.arr);
		}
		
		private function onClose(e:Event):void 
		{
			trace("onClose")
		}
		
		private static var sendnum:uint = 0;
		private function onConnect(e:Event):void 
		{
			trace('连接成功'); 
			
			//开始以每隔5毫秒的速度疯狂向服务器发送Object
			setInterval(function():void { 
				var obj:Object = {
					num: sendnum++,
					name: ("client" + Math.random().toString()),
					b: Math.random() > 0.5,
					arr: [ 1, 2, 3, "d", "e", "f"]
					}
					
				_socket.sendObject(obj); //向服务器发送obj
				
			} , 3);
		
		}
		
	}

}

```

### nodejs端(Typescript)

```actionscript

/// <reference path="./d/node/node.d.ts" />

import net = module("net");
import n = module("./ObjectSocket");

var objSocket: n.ObjectSocket;

var server: net.Server = net.createServer(function (socket: net.NodeSocket): void {
	console.log("connect");
	objSocket = new n.ObjectSocket(socket);	
	
	objSocket.on("data", function (obj:any) { //客户端传来了Object
		console.log("receive object: ",obj.num, obj.name, obj.b , obj.arr);
	})
	
	objSocket.on("end", function () {
		console.log("on end")
	})

	//开始以每隔5毫秒的速度疯狂向客户端发送Object
	sendPackages(objSocket);
})

var sendnum:number = 0;
function sendPackages(socket:n.ObjectSocket): void
{
	setInterval(function () {
		var obj: any = {
			num: sendnum++,
			name: ("server" + Math.random().toString()),
			b: Math.random() > 0.5,
			arr: [<any> 1, 2, 3, "d", "e", "f"]
		}
		socket.sendObject(obj); //向客户端发送obj
	}, 5);
}

server.listen(2345, "localhost");

```