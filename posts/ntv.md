---
title: NTV：基于Flash Media Server的视频文件直播
date: 2009-01-13
tags: FMS,Flash
categories: project
---

之前的公司有需求做事先录制好的视频文件进行直播，由于 Flash Media Server 没有类似 Windows Media Server 的视频文件直播功能，所以我做了这个直播 flv 文件的傻瓜功能。

注意是**直播 Flv 视频文件**，不是直播摄像头，直播摄像头请找官方的 FME，或者<a href="http://nshen.net/article/2007-08-29/fms-tutorial/" target="_blank">这篇教程</a>有实现一个简单的。

---

下载地址：

<a href="http://115.com/file/dnh98whr#ntv.rar" target="_blank">NTV 0.2 下载（115 网盘）</a>

注意：此软件**个人网站**与**商业网站**均完全**免费**使用，但请发邮件通知我一下网址。 nshen121[at]gmail.com
好让我评估是否投入精力继续开发此软件。

---

安装方法：

1. 解压后将 ntv 文件夹放在 fms 安装目录下的 applications 目录下，例如：

`C:\Program Files\Adobe\Flash Media Server 3\applications\ntv`

2. 将 N2EventDispatcher.asc 保存到 FMS 安装目录下的 scriptlib\nfms2 文件夹下，例如：

`D:\Program Files\Adobe\Flash Media Server 3\scriptlib\nfms2`

3. 修改 player.html 中的 rtmp 地址为你 fms 的 ip。

4. 把 player 和 admin 文件夹分别传到 web 可以访问的地方 ，例如：

www.nshen.net/player
www.nshen.net/admin

### 使用方法很简单：

管理端：

打开 http://你的地址/admin/admin.html
输入 rtmp 地址和默认密码 admin （密码在服务器端 fms 安装目录\applications\ntv\password.txt 里边改）

![](/images/ntv01.jpg)

如果登录成功，左边会自动列出视频库中(ntv\streams_definst\_)所有的视频文件

![](/images/ntv02.jpg)

点击播放后，从 播放端 (http://你的地址/player/player.html) ,就能看到视频播放了。此时视频是直播的，也就是说所有人看到的是同步的播放。

![定时直播功能](/images/ntv03.jpg)

### 常见问题：

问:要放什么格式的视频？

答:目前只支持.flv 格式的视频。

问:为什么不能定时播放不好用？

答:可能是没有将 N2EventDispatcher.asc 保存到 FMS 安装目录下的 scriptlib\nfms2 文件夹下.

---

### 版本历史：

目前已完全停止开发

ntv 0.2 : 2009-01-03

- 预订时间播放
- 停止播放
- 服务器端使用 password.txt 来修改密码（密码修改后请 reload 应用程序，密码生效）

ntv 0.1 : 2008-12-24

- 最初版本,实现基本功能
