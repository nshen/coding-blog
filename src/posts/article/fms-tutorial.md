---
title: Flash Media Server 入门教程
date: 2007-08-29 14:56:31
tags: FMS,Flash
categories: article
---

我把我以前的那些FMS学习笔记整理了一下，做了下修改，成了一页的FMS教程，方便想学FMS的新手来看，如果还有错误或者看不懂的地方欢迎留言.

>Flash Media Server的最新版本已经到FMS 4.X了 ，由于本入门教程是在2006~2007年所写，年代久远所以使用FMS 2演示，但当你了解了原理后可以很容易的升到4，因为FMS 1 到 FMS 4 的更新几乎没有什么改动 ，还有本教程客户端使用AS1，如果你需要用AS3的话，语法会有些变化，这些都应该难不倒你。

<!-- more -->

## 什么是Flash Media Server ？

Flash大家庭里的一员，这个东东以前叫Flash Communication Server，传说中的FCS就是这个，现在改叫FMS了...
不见不知道哦，一见真可怕，adobe还有这么cool的东东，自从见了她，让我做些小东东的兴趣全没了，一心想研究这个

## 这东东能做什么？

视频录制啊，flash聊天室啊，在线视频会议啊啊， 网络游戏？

## 不管怎样先安个试试吧

先到这里下载免费的开发者版本吧

[http://www.macromedia.com/software/flashmediaserver/](http://www.macromedia.com/software/flashmediaserver/)

然后安装，安装时记得用户名和密码不要瞎填自己要记住，如果你已经瞎填了那就到 安装目录下\conf\fms.ini 里找吧

偶装到了c盘，找到目录 **C:\Program Files\Macromedia\Flash Media Server 2** 

![](/image/fmsTutorial/1.jpg)

## 先要打开服务器哦

你在本机装的fms，本机就是服务器了哦！记得现在你的机器既是客户端又是服务端哦
开始===程序===Macromedia===Flash Media Server 2
有两个start****,都要打开，关时候两个都要关，如果你怕麻烦直接找tool文件夹里的批处理文件StartServerService.bat吧，双击他，他会帮你搞定地,想关就找StopServerService.bat。~ 

如果想设置默认开机时候fms自动打开还是需要手动打开，可以在 开始菜单里--运行--输入services.msc ，就会打开服务，找到Flash Media Server项，设置为手动或者自动，这里也可以随时关闭服务或打开服务

## applications文件夹

你可以在里边建一个文件夹例如叫 FirstApp，这就建了一个Application，以后所有此项目服务器端的flv文件啊，共享文件啊都会在这里边，有时服务器端需要写程序的时候里边会有个main.asc 文件，这个就是服务器端程序，服务器端程序目前只支持as1写，是在服务器上执行的，你也可以用trace调试，怎么trace管理服务器时候你会看到，你可能会建若干个app，在一台服务器上同时运行，比如录象的app，聊天室的app。。。这些所有的app都通过fms自带的fms2_console.swf管理，现在就去看看如何管理服务器吧！

## 管理服务器~

服务器打开后就要管理了哦，点开fms2_console.swf，别看他只是个swf，后台管理就靠他了，输入你安装时候的密码和用户，服务器地址写 localhost 就好看到了吧，熟悉熟悉他吧

![](/image/fmsTutorial/2.jpg)

以后我们写程序最常用的就是这个 **View Applications** ，每当有客户端连接服务器时，左边就会列出连接的是哪个app，有多少连接 下图为连接applications文件夹下的bs文件夹(bs文件夹，因为每个文件夹对应一个app，就是bs app)，连接数为1，458是实例名（实例名默认为 _definst_ ，每个文件夹可以有若干实例，互相不影响，这个特性可以用来做聊天是的房间，以后再说） 

![](/image/fmsTutorial/3.jpg)

选中某个app后，或者客户端有连接，会看到当前打开的app的状态，这个

![](/image/fmsTutorial/4.jpg)

Live Log 服务器端的trace就这里看了 ，右边依次是客户端情况 ， 共享对象，流，执行的情况（占内存，cpu等），后边两个小按钮，调试时候常用哦，reload和unload! 
每当服务器端main.asc修改后一定记得reload或者unload一下，否则不会生效，unload会把窗口关闭，有客户端连的时候还会自动打开
总有人告诉我，他的fms经常会出现诡异现象，比如连接不上，代码已经删了还会执行，一生气连文件夹都删了，还会执行，怀疑是自己的rp有问题。。
那不是rp问题，记住出现问题就reload ！实在不行就去tools文件夹点StopServerService.bat

## conf文件夹

还有重要的是conf文件夹了，里边是一些服务器端的配置文件，以后可能会用，先不用动。。。。

自此，安装部分结束，go on...

## 有一种协议叫rtmp

客户端和服务器端通信是使用协议rtmp的

现在在服务器端applications文件夹（当然偶的客户端和服务器端是一台机器了）里建个test1文件夹，你的地址就为

rtmp:/test1 或者 rtmp://localhost/test1

注意两个地址中的 "/ "符号

打开flash

与服务器通信首先要建个**NetConnection**

	nc = new NetConnection();

连接

	nc.connect("rtmp://localhost/test1");

怎么知道连没连上呢？顺利连接服务器后会触发一个onStatus事件,自己trace一下info.code 

```actionscript

nc.onStatus = function(info) 
{
	//trace(info)
	//trace(info.code)
	for (i in info) {
	trace(i+": "+info[i]);
	}
};

```

完整代码：

	nc = new NetConnection();
	nc.onStatus = function(info)
	{
		 trace(info.code);
		 if (info.code == "NetConnection.Connect.Success") {
			 trace("接通");
		 }
	};
	nc.connect("rtmp://localhost/test1");

### 注意

默认情况下服务器是允许你连接的，但只是默认，如果服务器拒绝你连接的话，上述代码就不好用了。怎么回事？我们看看连接的过程吧

## 连接过程

每当客户端试图连接服务器，一个NetConnection.connect()，服务器将会调用application.onConnect 来鉴定是不是允许客户端连接，onConnect()方法返回null 或不返回则将进入未决状态,直到onConnect方法中返回true或执行acceptConnection(client)则允许，返回false或执行rejectConnection(client)则拒绝，如图(从左往右看)

![](/image/fmsTutorial/5.jpg)

服务器文件是以**.asc**文件形式存在的，可以在test1文件夹里建一个**main.asc**。

```actionscript

	application.onConnect=function(client)
	{
		this.rejectConnection(client);
		//this.acceptConnection(client)
	}
```

这样就拒绝连接了，动手试试，别忘了，服务器端改动的话，别忘了到fms2_console.swf去reload ！不知道按哪个的到上边找，每当有客户端连接，那个reload按钮的界面就会出来哦。

### 检查是否uri错误

如果你的rtmp地址是从其他什么地方传过来的，可以顺便检查一下rtmp是否错误，下边代码如果地址是错误的就会trace出来。

```actionscript

mync = new NetConnection();
mync.onStatus = function(info) 
{
	if (info.code == "NetConnection.Connect.Success") 
	{
			trace("连接成功");
	}
};
//正确的uri
//uri = "rtmp://localhost/connect";
//错误的uri
uri = "rtmpppppp://localhost/connect";

if (mync.connect(uri, "N神")) {
	trace("尝试连接服务器中。。");
} else {
	trace("没有尝试连接服务器~是uri错误？？？");
}

```

ok 了，现在我们深入一点点。。看看连接上的一些细节问题

### info.code：

连接后info.code会告诉你连接的状态，上边看的都是**NetConnection.Connect.Success**， 还有一些其他值，和这些值是什么意思，自己看看。

值得注意的是。**NetConnection.Connect.Rejected**，收到这条消息的时候说明服务器端拒绝了你，接着马上你会收到另一条，**NetConnection.Connect.Closed**，连接就关闭了。

```actionscript

mync = new NetConnection();
mync.onStatus = function(info) 
{
	switch (info.code) 
{
		case "NetConnection.Connect.Success" :
			trace("连接成功");
		break;
		case "NetConnection.Connect.Failed" :
			//关掉服务器的情况
			trace("尝试连接失败，服务器有可能挂掉了 -_-b");
		break;
		case "NetConnection.Connect.Rejected" :
			//注意这里，服务器拒绝你的情况，如果遭到拒绝，将会调用两次mync.onStatus，
			//第一次"NetConnection.Connect.Rejected"第2次"NetConnection.Connect.Closed"
			trace("遭到服务器拒绝");
			trace("服务器返回信息："+info.application.msg);
		break;
			case "NetConnection.Connect.Closed" :
			trace("连接关闭");
		break;
	}
};
mync.connect("rtmp://localhost/connect", "N神");
//mync.connect("rtmp://localhost/connect","小新")

```

服务器端拒绝连接？好象见过。。。回头找找。。。。。。。。哦在这里

```actionscript

application.onConnect = function(client)
{
	this.rejectConnection(client);
}

```

我不能所有人都拒绝了。。我要把讨厌的人拒绝了。。。
传给服务器一个人名~~

```actionscript

mync.connect("rtmp://localhost/connect", "N神");

```

服务器看看是不是讨厌的人。。

```actionscript

application.onConnect = function(client, name) {
	trace(name);
	if (name == "N神") {
		//拒绝连接，并返回个错误对象{msg:"服务器不想"+name+"进去，哈哈~"}，包含错误消息
		application.rejectConnection(client, {msg:"服务器不想"+name+"进去，哈哈~"});
	} else {
		application.acceptConnection(client);
		//成功不能返回客户端信息
	}
};

```

看客户端的代码。。

```actionscript

case "NetConnection.Connect.Rejected" :
//注意这里，服务器拒绝你的情况，如果遭到拒绝，将会调用两次mync.onStatus，
//第一次"NetConnection.Connect.Rejected"第2次"NetConnection.Connect.Closed"
trace("遭到服务器拒绝");
trace("服务器返回信息："+info.application.msg);
break;

```

遭到服务器拒绝后会trace出服务器返回的错误消息，这是一个最基础的与服务器交互的例子，以后还会有很多滴

下边进入新一层次。。。

## 视频，流

这个比较重要，但超简单，网上播放电影，在线录制，在线播放，视频会议，视频电话，全靠他了 ，下边我们先做一个最简单 录制和播放

### 录制flv视频

打开flash，新建一个fla，`Ctrl + L` 打开library，右键新建视频，确定。

拉到舞台上起个名叫my_video

第一帧开始加代码

```actionscript

//从麦和设像头显示视频显示在my_video上
my_video.attachVideo(Camera.get());
my_video.attachAudio(Microphone.get());

//像以前一样连接 
nc = new NetConnection();
nc.connect("rtmp://localhost/aaaa"); //注意这里，Applications文件夹里要有aaaa文件夹哦！ 


//可以理解为在nc连接上绑一个流
nsOut = new NetStream(nc);

//在流上加麦克风和视频头
nsOut.attachVideo(Camera.get());
nsOut.attachAudio(Microphone.get());

//发布 2.flv
nsOut.publish("2", "record");

```

第一个参数是文件名，后一个参数要"record"才是录制。

把fla发布一下， 录一会儿，把视频关掉，打开你的

>叉盘:\Program Files\Macromedia\Flash Media Server 2\applications\aaaa\

是不是多了个**streams\_definst_**

打开
>C:\Program Files\Macromedia\Flash Media Server 2\applications\aaaa\streams\_definst_

看见2.flv了吧。

[这里下载原文件 fla1.fla](/image/fmsTutorial/fla1.fla "下载源文件 fla1.fla")

### 播放flv视频

用fms播放的flv目前是无法下载的，这可以保护你的版权 ：）

打开flash，新建一个fla ，Ctrl + L 打开library，右键新建视频，确定。

拉到舞台上，这回起个名叫view ，我们来播放你刚才录的那个视频

```actionscript

nc = new NetConnection();
nc.connect("rtmp://localhost/aaaa");
res = new NetStream(nc);

//view元件要加载res流
view.attachVideo(res);
view.attachAudio(res);

//播放
res.play("2");

```

[下在源文件fla2.fla](/image/fmsTutorial/fla2.fla) 

### 现场流

上边做的都是先录制好了视频，然后才播放，网上的实时视频会议，视频电话是怎么做的呢？总不能先录好再播放吧？ 
这要用到现场流，现场流是指你连接到服务器后，你在发布的同时，其他人就可以实时的看到你，
很难吗？看看吧，把上边录制视频的例子拿下来

```actionscript

nsOut.publish("2", "record"); 

```

这句改成

```actionscript

nsOut.publish("2", "live");

```

把"record" 改成"live"后，就不会生成flv了，取而代之的是一个看不到的实时的视频流
ok 了，发布，这就是直播端了，同时再发布上边那个播放端，两个同时打开，已经可以实时看见你了吧。现在你是用本机测试，等你有了服务器。其他人也能同时看见你了哦。

到这里你已经可以自己做一个网页上的直播了，发布端不要让别人看到，让别人看你的播放端就好了 ：） 至于为什么要用两个swf，因为目前为止你还不知道怎么样跟服务器之间传递消息，这样做可以避免这些东西，等你把后边的东西全都学完就可以在一个swf里，写个视频会议之类的东东了。

## 远程共享

远程共享？

共享的概念就是让每个连接到服务器的swf都能实时的得到服务器端共享的数据。
一个人更改了这些数据，其他人都会看得到通知。可以想象聊天室里的发言，一个人发了以后其他人都可以看到。

![](/image/fmsTutorial/6.jpg)

### 共享对象

共享对象，说英文大概你比较熟ha~ SharedObject， 恩flash中有两种sharedObject，local sharedobject （LSO） 和 remote sharedobject (RSO)，也就是本地共享和远程共享,偶们讨论远程的，不过之前你最好先去了解了解本地的，对你有好处...

RSO在服务器端是以文件形式存储的，扩展名是.fso，为什么不是.rso?....我也想问呢- -b

### 代码

初始化RSO需要先与服务器建立一个连接，续上节 ，我们先与服务器建立一个连接 

```actionscript

//初始化远程共享要利用nc通道
var myNC = new NetConnection();
myNC.onStatus = function(info) {
	if (info.code == "NetConnection.Connect.Success") {
		//成功则利用此nc初始化rso
		initRSO(this);
	}
};

```

跟以前的代码一样，只是连接成功后多了一个initRSO()函数，看不懂的回去重头再看一下。。。

下边是initRSO了，跟连接结构差不多 

```actionscript

function initRSO(NC) 
{
	//在服务器上建立myRSO.fso文件，第2个参数指定nc通道，第3个指定文件在服务器上持久保留，即使服务器重启了，还是有
	my_rso = SharedObject.getRemote("myRSO", NC.uri, true);
	my_rso.onSync = function(list) {
		//list 是一个对象数组 ，类似这种[{name:"x",code:"success"},{name:"y",code:"success"}] ，下边会详细讲
		//初始成功
	};
	my_rso.connect(NC); //连接
}

```

了解了吧，看一个完整的例子

画一个mc起名叫mc，在第一帧上写代码

```actionscript

//初始化远程共享要利用nc通道
var myNC = new NetConnection();
myNC.onStatus = function(info) {
	if (info.code == "NetConnection.Connect.Success") {
		//成功则利用此nc初始化rso
		initRSO(this);
	}
};
myNC.connect("rtmp://localhost/test1"); //不会不知道要建test1文件夹吧 

function initRSO(NC) {
	my_rso = SharedObject.getRemote("myRSO", NC.uri, true);
	//onSync是回调函数，每次服务器端so数据有改变，这里都会有反映！这里的意思每当有人按鼠标，这里都会有反映，我们读取so的data下的值就可以了
	my_rso.onSync = function() {
		mc._x=this.data.x
		mc._y=this.data.y
	};
	my_rso.connect(NC);
}

onMouseDown = function () {
	//改变so的数据
	my_rso.data.x = _root._xmouse
	my_rso.data.y = _root._ymouse
};

```

然后发布设置中设置**只允许网络**，发布看看

现在你可以开多个播放器窗口，点其中一个，看看其他的窗口变不变?

[这里下载原文件 fla3.fla](/image/fmsTutorial/fla3.fla "下载源文件 fla3.fla")

## 连接流程

![](/image/fmsTutorial/7.jpg)

再写一个，看起来很像在做网游~

```actionscript

mync = new NetConnection();
mync.onStatus = function(info) {
	if (info.code == "NetConnection.Connect.Success") {
		initRSO();
	}
	if (info.code == "NetConnection.Connect.Closed") {
		trace("关闭");
	}
};

function initRSO() {
	my_RSO = SharedObject.getRemote("myRSO", mync.uri, true);
	trace(my_RSO);
	my_RSO.onSync = function() {
		mc._x = this.data.hero.x;
	};
	my_RSO.connect(mync);
}
mync.connect("rtmp:/my_app/test1");

mc.onEnterFrame = function() {
	my_RSO.data.hero.x = this._x;
	if (Key.isDown(Key.LEFT)) {
		this._x -= 5;
	}
	if (Key.isDown(Key.RIGHT)) {
		this._x += 5;
	}
};

```

## 写个简单的聊天室

很简单的东西，基本上就是共享对象的运用，没有用到服务器端，大型聊天室可能不会这么做，这个只适用于初学者 ：/

注释很详细，不说多了，可以直接下载原文件

[这里下载原文件 fla4.fla](/image/fmsTutorial/fla4.fla "下载源文件 fla4.fla")

代码：

```actionscript

//用户名
myname="游客"
//建立连接
var myNC = new NetConnection();
myNC.connect("rtmp://localhost/smallchat");

//搞到rso
Talk_SO = SharedObject.getRemote("Talk", myNC.uri, false);
Talk_SO.onSync = function() {
	//先把聊天文本框清空
	remoteText.text = "";
	//把聊天列表显示出来，talklist的格式就是[谁谁说:啊啊啊,谁谁谁说:2222]
	var t = this.data.talklist;
	for (var i = 0; i<t.length; i++) {
		writeln(t[i]);
	}
};
Talk_SO.connect(myNC);

//发消息函数
function post() {
	//如果不存在talklist就建一个，这里没用server端，是个技巧
	if (Talk_SO.data.talklist[0] == undefined) {
		Talk_SO.data.talklist = [];
	}
	//限制数组长度，是个队列。保证里边有5条消息，当然也可以更多，但如果没有限制，flash会垮的
	if (Talk_SO.data.talklist.length>=5) {
		Talk_SO.data.talklist.shift();
	}
	//把消息装到so里
	Talk_SO.data.talklist.push(myname+"说："+meText.text);
	meText.text = "";
}
//文字显示，换行
function writeln(msg) {
	remoteText.text += msg+"\n";
	remoteText.vPosition =remoteText.maxVPosition
}
//-----------------------------------------------
Btn.onRelease = function() {
	post();
};
this.onKeyDown = function() {
	if (Key.isDown(Key.ENTER)) {
		post();
	}
};
Key.addListener(this);

```

## 深入onSync

onSync有个list参数，这个开始有些难度了。不想动脑的可以跳过没影响，只是以后写出的程序效率会低点 ：（

看代码：

```actionscript

my_rso = SharedObject.getRemote("myRSO", NC.uri, true);
my_rso.onSync = function(list) {//.......};
my_rso.connect(NC); //连接
	
```

在onSync回调中我们可以知道我们的my_rso被改变了，但my_rso里具体什么改变了呢？ 我们就要分析这个 list 参数 了

list参数其实是一个对象数组 ，首先它是一个数组，里边装了很多对象(Object)，每一个对象都包括了SharedObject中一个插槽(slot)的改动信息。我暂时给他起名叫插槽信息对象。。。这名字太猥亵了。。但我就这么叫了。。

插槽信息对象包含两个属性，name 和 code，偶尔还会有个oldValue?我不太常用，不说它

name 描述被改变的属性名
code 描述该属性的改变方式 ，有可能为以下几种值："success" ， "change" ， "delete" ， "reject" ， "clear" ，具体含义后边说
说白了这个插槽信息对象大概就是这么个样子： `{name:"x",code:"success"}`
表示x属性被修改成功
要得到这些插槽信息对象就要for in 这个list参数

```actionscript

	for (var i in list) {
		//list[i] 就是插槽信息对象
	}

```

要分析具体so哪改变了，就是分析list[i]，比如

```actionscript

if(list[i].code=="change") trace("list[i].name"+被+"change了")
if(list[i].code=="delete") trace("list[i].name"+被+"delete")

```

“change”是啥？“delete”是啥？

"success" ， "change" ， "delete" ， "reject" ， "clear" 具体含义：

success : 表示当前影片修改so的插槽获得了成功
change : 表示so的插槽被别人修改，或填加也就是说，你修改so的某个属性成功了会收到 "success" ,与此同时其他影片会收到 "change"
reject : 拒绝修改

例如发生在两个或多个客户端同时要修改一个so的插槽，这时候fms会只让一个client修改，并返回"success" 其他的会收到"reject"

delete , clear : 这个好理解，一个是删除，一个是清空，看例子：

比如服务器端删除某个so

```actionscript

so = SharedObject.get("某个so");
so.lock( );
var names = so.getPropertyNames( );
for (i in names) {
	so.setProperty(names[i], null);
}
so.unlock( );

```

这样client端会收到 若干个插槽信息对象，所有的code都为"delete"，表示若干个item被删除

然而这样：

```actionscript

so = SharedObject.get("某个so");
so.clear( );

```

client端就只会收到一个插槽信息对象，code属性为“clear”。

## client端与server端直接交互

看完了SO，看一下client与server端如何直接进行交互的

[这里下载原文件 1.rar](/image/fmsTutorial/1.rar "下载源文件 1.rar")

### 1. 客户端呼叫服务器

fla：

```actionscript

//客户端呼叫server端msgfromclient函数,并将返回值trace出来
mync = new NetConnection();
mync.connect("rtmp://localhost/connect");
//返回值接收对象
var resObj = new Object();
resObj.onResult = function(val):Void {
	trace("val"+val);
};
/*
	我们用mync去call服务器端的msgfromclient函数，resObj是返回接收对象，当服务器有返回值后，会自动直接调用这个对象的onResult处理函数，后边可以传递给server无数个参数，这里只传一个字符串
*/
mync.call("msgfromclient", resObj, "第一个call");

```

服务器端代码是放在main.asc里的，你可以到你的application下的connect目录下建一个main.asc，写代码

main.asc:

```actionscript

//要把函数定义到Client上！！
application.onConnect = function(client) {
	/* 在这里定义也可以，在Client.prototype里定义也是可以的 
	client.msgfromclient=function(what){
			trace(what+"进来了")			
			var aa="呼叫成功并返回结果"
			return aa
	}
	*/
	application.acceptConnection(client);
};

Client.prototype.msgfromclient=function(what){
		trace(what+"进来了")
		var aa="呼叫成功并返回结果"
		return aa
}

```

现在去试一下吧。。。成功了的话，再继续....... 

### 2. 服务器端呼叫指定的客户端

fla：

```actionscript

//server呼叫client端
//要把函数定义到nc上！！
//
mync = new NetConnection();
mync.onStatus = function(info) {
	if (info.code == "NetConnection.Connect.Success") {
		trace("连接成功");
	}
};
mync.connect("rtmp://localhost/connect");
mync.msgfromserver = function(msg) {
	trace(msg);
};

```

main.asc：

```actionscript

application.onConnect = function(client) {
	application.acceptConnection(client);
	//这里呼叫刚连线成功的客户
	//跟client呼叫server基本一样，服务器一般很少让client端返回值所以第2个参数设为null
	client.call("msgfromserver",null,"服务器叫你啊")
};

```

### 3. 服务器端呼叫所有的客户端(广播)

有些时候需要服务器广播数据给所有连接上的客户端，这里就用到了广播的概念 

广播其实SharedObject的时候已经讲过了一种实现，就是把数据放到remote SharedObject中，当数据改变了，自然所有客户端都会onSync 
这里再讲一种用call来实现的：

下边是很常见的一个情况，当某人下线了的时候要通知所有客户端，某某已经下线了 

server端:

```actionscript

application.onDisconnect=function(newClient){ 
	//遍历客户端列表，分别call他们
	for(var i=0;i<application.clients.length;i++) {
		application.clients[i].call("client_fun"，null，sendvar);
	}
}

```

Client端:

```actionscript

nc.client_fun=function(myvar){....... } 

```

这个自己完善一下吧，这里就不贴fla了 

还有：

关于广播，不只有服务器端广播给所有客户，还有可能某一个客户端对所有客户端直接进行广播，当然上边的例子你如果都看懂了的话，你已经可以自己做某一个客户端对所有客户端的广播了。怎么做？ 

* 第1步 某一个客户端呼叫服务器
* 第2步 服务器广播给所有客户端

这样就形成了，某客户端对所有客户端的广播，当然如果你能细心的耐心的看看帮助的话，你会发现Shared Object 和 NetStream都有send方法就是做这件事的，而且更为简洁，服务端不用写代码 ：） 

好了，看到这里，fms常用的大部分概念都说到了，这个教程也就基本结束了，但请注意,现在你只是入门阶段.想学更多的，你可能需要多翻翻手册，多找找教程，英文有不少很好的教程进阶. 

## 其他需要注意的问题：

### 中文编码：

有些时候我们用flash去读取外部的php，asp.....文件里的中文显示在flash里会出现乱码的情况，为了解决在flash里显示中文很多教程里通常都直接加了一句System.useCodepage=true 
问题就在这，显示不了外部中文是因为flash内默认用Unicode编码，外部的文件大多都是gb2312,加上这句System.useCodepage=true代表强制flash使用系统默认的gb2312，这样flash就显示正确了，但fms服务器端默认也是用unicode的，这样客户端跟服务器端不同编码有时就会出错了，搜了一下server字典好象没有System.useCodepage=true了。。。所以解决办法就是去掉System.useCodepage=true，在外部php或asp中把编码转成utf-8，至于怎么转，不知道，问你的asp或php程序员吧 ，另外不要用记事本编辑你的asc文件。。即使编辑最后要一定另存为utf-8格式。

### 判断影片播放结束

```actionscript

ns.onStatus=function(info){
	if(info.code=="NetStream.Play.Stop")trace("结束")
}

```

乍看好象没错，但是如果设置了缓冲以后（setBufferTime）就不好用了，仔细研究了一下原因4这样的

监视onStatus(info) ，info.code:

开始播放**NetStream.Play.Start** （其实还没播放）

然后缓冲（根据setBufferTime设置的秒数缓。。）

**NetStream.Buffer.Full** （缓冲装满了，这才开始播放）

然后播放完了**NetStream.Play.Stop** （其实还没播放完）

注意了，然后还要播放缓冲 - -b
**NetStream.Buffer.Empty** （缓冲空了，这才播放完了。。）

群里的kinglong兄比较聪明~，先Stop的时候做个记号，然后再满足Empty才算播放完，也就是两个条件，因为网速慢也会Empty。。。好办法。

我后来又看了一下帮助，好象有一个专门的事件通知播放结束

```actionscript

ns.onPlayStatus=function(info){
	if(info.code=="NetStream.Play.Complete")
		trace("感谢观看帮助")
}

```

### 防火墙，端口

默认安装的话默认端口是1935，管理是1111端口，记得防火墙要把1935和1111端口打开。

本文原地址：http://www.nshen.net/article/2007/08/29/fms-tutorial/ ,转载请保留链接 。