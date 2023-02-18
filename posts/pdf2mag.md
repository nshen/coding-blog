---
title: PDF2MAG：一键pdf文档转flash电子杂志
date: 2011-01-12
tags: Flash
categories: project
---

PDF2MAG 是我基于 Adobe Air 编写的一款将 pdf 文档快速转为 flash 电子杂志的软件。
新版本又增加了支持转换为 FlexPaper 文档。

PDF2MAG 可以快速将 PDF 文档转换为适合在网页中浏览的 Flash 电子杂志.

#### 演示:

- [硬质封面演示](http://riabook.cn/files/pdf2mag/demo/)
- [软质封面演示](http://riabook.cn/files/pdf2mag/demo13/)
- [Flexpaper 文档演示](http://riabook.cn/files/pdf2mag/flexpaper/)

---

### 下载地址：

[PDF2MAG 1.3 下载（115 网盘）](http://u.115.com/file/c4zvhrqq#DownloadPDF2Mag_1_3.rar)

注意：此软件**个人网站**与**商业网站**均完全**免费**使用，但请发邮件通知我一下网址。 nshen121[at]gmail.com
好让我评估是否投入精力继续开发此软件。

---

### 使用方法：

1. 解压后点击 exe 文件进行安装,如安装失败请先 点此安装 Adobe Air 运行环境。
2. 安装成功后，会发现这个图标。

![](/images/pdf2mag_01.png)

3. 点击打开，选择生成杂志或是 FlexPaper 文档，并选取 pdf 文件和一个空文件夹作为输出目录。

![](/images/pdf2mag02.jpg)

4. 转换成功后，将输出目录中的文件通过 ftp 上传到服务器空间中即可。

---

个人精力能力有限,2011 年开始停止更新了，如仍有兴趣一起发展此软件的话联系我 nshen121[at]gmail.com

---

### 常见问题：

##### 问:转换后报错[RPC Fault faultString="Error #2148" faultCode="InvokeFailed" faultDetail="null"]

答:这是 FlashPlayer 的本地安全限制,使用 FTP 上传到服务器应该就好了:)

##### 问:生成的杂志目录不正确，可以修改吗？

答:所有的配置信息都在生成的目录下 config.xml 里,用记事本打开,依照下边格式可以编辑目录,然后保存就可以了.

```xml
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

##### 问:转换 FlexPaper 后没有显示内容,最后几行输出 Error This file is too complex to renderer.？

答:目前发现 pdf2swf 转换复杂的 pdf 会有这个问题,建议尝试优化一下 pdf 再试。暂时还无法解决。

---

### 版本历史：

- **1.30: 2011-01-12**
  增加生成 FlexPaper1.4.1 功能(FlexPaper 详见: http://flexpaper.devaldi.com/)

- **1.21: 2010-09-2**
  更新为 Adobe AIR 2 正式版

- **1.20: 2010-02-10**
  基于 Adobe Air 2 beta 2 loading 图缩小 页数显示去掉 cover backover,使生成后的页数与原 pdf 页数显示一致,方便添加目录 解决 pdf 总页数是奇数时翻到最后一页报错的 bug 使用位图优化,翻页速度大幅提升 右键菜单增加版本信息 增加生成杂志默认显示大小的设置 增加软硬质封面设置 放大缩小可用 目录功能可用 右上角植入个小图标打印链接

- **1.10: 2010-01-25**
  在 1.0 基础上添加了转换过程中的文字提示 基于 Adobe Air 2 beta 1

- **1.00: 2010-01-25**
  最初版本,实现基本功能 基于 Adobe Air 2 beta 1

---

代码：https://github.com/nshen/PDF2Mag
