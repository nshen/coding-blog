---
title: PDF2MAG：一键pdf文档转flash电子杂志
date: 2011-01-12 14:56:31
tags: Flash
categories: project
---

PDF2MAG 是我基于Adobe Air编写的一款将pdf文档快速转为flash电子杂志的软件。
新版本又增加了支持转换为FlexPaper文档。

<!--more -->

PDF2MAG 可以快速将PDF文档转换为适合在网页中浏览的Flash电子杂志.

#### 演示:

* [硬质封面演示](http://riabook.cn/files/pdf2mag/demo/)
* [软质封面演示](http://riabook.cn/files/pdf2mag/demo13/)
* [Flexpaper文档演示](http://riabook.cn/files/pdf2mag/flexpaper/)

---

### 下载地址：

[PDF2MAG 1.3下载（115网盘）](http://u.115.com/file/c4zvhrqq#DownloadPDF2Mag_1_3.rar)

注意：此软件**个人网站**与**商业网站**均完全**免费**使用，但请发邮件通知我一下网址。 nshen121[at]gmail.com
好让我评估是否投入精力继续开发此软件。

-----

### 使用方法：

1. 解压后点击exe文件进行安装,如安装失败请先 点此安装Adobe Air运行环境。 
2. 安装成功后，会发现这个图标。 

![](/image/pdf2mag_01.png)

3. 点击打开，选择生成杂志或是FlexPaper文档，并选取pdf文件和一个空文件夹作为输出目录。 

![](/image/pdf2mag02.jpg)

4. 转换成功后，将输出目录中的文件通过ftp上传到服务器空间中即可。

----


个人精力能力有限,2011年开始停止更新了，如仍有兴趣一起发展此软件的话联系我 nshen121[at]gmail.com

---

### 常见问题：

##### 问:转换后报错[RPC Fault faultString="Error #2148" faultCode="InvokeFailed" faultDetail="null"]

答:这是FlashPlayer的本地安全限制,使用FTP上传到服务器应该就好了:)

##### 问:生成的杂志目录不正确，可以修改吗？

答:所有的配置信息都在生成的目录下config.xml里,用记事本打开,依照下边格式可以编辑目录,然后保存就可以了.

``` xml
<contents> 
 <node label="章：" page="1"> 
   <node label="节1" page="1"/> 
   <node label="节2" page="2"/> 
   <node label="节3" page="3"/> 
 </node> <node label="章2：" page="1">
   <node label="节1" page="1"/> 
 </node> 
</contents>
```

##### 问:转换FlexPaper后没有显示内容,最后几行输出 Error This file is too complex to renderer.？

答:目前发现pdf2swf转换复杂的pdf会有这个问题,建议尝试优化一下pdf再试。暂时还无法解决。

---

### 版本历史：

* **1.30: 2011-01-12**
增加生成FlexPaper1.4.1功能(FlexPaper详见: http://flexpaper.devaldi.com/)

* **1.21: 2010-09-2**
更新为Adobe AIR 2正式版

* **1.20: 2010-02-10**
基于Adobe Air 2 beta 2 loading图缩小 页数显示去掉cover backover,使生成后的页数与原pdf页数显示一致,方便添加目录 解决pdf总页数是奇数时翻到最后一页报错的bug 使用位图优化,翻页速度大幅提升 右键菜单增加版本信息 增加生成杂志默认显示大小的设置 增加软硬质封面设置 放大缩小可用 目录功能可用 右上角植入个小图标打印链接

* **1.10: 2010-01-25**
在1.0基础上添加了转换过程中的文字提示 基于Adobe Air 2 beta 1

* **1.00: 2010-01-25**
最初版本,实现基本功能 基于Adobe Air 2 beta 1


---
代码：https://github.com/nshen/PDF2Mag