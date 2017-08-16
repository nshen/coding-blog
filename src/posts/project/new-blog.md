---
title: CodingBlog：给程序员的私房极简博客系统
date: 2017-09-01
tags: Markdown,文档
description: 这是一篇介绍CodingBlog博客是如何实现的文章
---

我之前在使用 `Hexo` 博客，觉得还不错，但是换过几个皮肤都有不满意的地方，有些皮肤在半墙的状态加载缓慢，有些有我无法接受的css炫酷动画，还有些中文排版很差，有些排版不错，但首页大图就占了半屏，我实在不能理解。喜欢简洁的我本想基于默认皮肤自定义一个，发现默认皮肤只是外表简洁，内部有几十个 ejs 模板文件，和20多个 css 文件，需要预编译。作为一个前端新手实在有点不知道怎么下手。

在我看来这个级别的个人博客，一个 `header` 一个 `footer` 就足够个性化自定义了，中间应该全部程序生成。

之后我就在网上搜索有什么其他更简洁的博客系统满足我的喜好，然后就发现了 Metalsmith。

![metalsmith](/image/codinglog/metalsmith.png)

## Metalsmith

[Metalsmith](http://www.metalsmith.io/) 是一个基于插件的文档生成器，本身基本不做任何事，只遍历文件夹中的文件，并把他们交给插件来处理，处理完再存成新文件。一般建站常见的任务，已有无数的第三方插件可以帮你做，比如需要`markdown`就有`metalsmith-markdown`插件，需要`sitemap`就有对应的`metalsmith-sitemap`插件，也可以自定义插件加入构建流。

正好我想练习一下`div + css`，所以我决定试试手，基于MetalSmith打造一个程序员专用的极简博客系统。

## 极简的博客

我的目标：

极简干净，默认无图无动画，加载快，方便个性化修改，作为个人学习实践的发布平台。

简而不漏，作为程序员专用的博客，这里有一些我想到的**需求**需要实现：

## 纯静态无服务器依赖

无服务器依赖肯定要摆在需求第一位的，不能像10多年前一样用`asp博客`就要去租`asp虚拟主机` 过几天大家都用`wordpress`了，又要去租`php主机`。

现在的标准是 **随便扔在什么免费的地方都能运行，绑定个域名就能用了。** 今天放`Github`上，明天放`Coding`上，后天放`oschina`上，实在不行放自己路由器上也能访问。

## Markdown标准

当年我写博客时，仅流行的ASP博客就有 `L-Blog` ，`LBS`，`Z-Blog`，`PJBlog`。。。等等。有些作者停更了，有些出bug了，或者某天又出更漂亮更强大的博客系统了，每次要换博客时各种博客系统，各种版本之间导数据别提多烦了。好在近几年出现了`Markdown`标准。

现在几乎所有的文档生成器都支持Markdown了，也就是说，如果你的博客是用Markdown写的，不再需要数据库，而且换博客程序时基本上再也不用各种转数据了。

### Markdown书写环境

既然是程序员专用，我是推荐在 [VSCode](https://code.visualstudio.com) 里直接写博客的

像插入链接图片什么的都是有语法提示的，忘了语法也没关系

![alt](/image/codinglog/snippets.png)

[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) 这个lint插件可以实时告诉你哪些markdown格式有错误，让你更专注书写，而不用时时去检查错误。

[Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles) 插件，让你用`Github`的风格实时预览

![github preview](/image/codinglog/github_preview.png)

最好写完博客 `Ctrl + Shift + B` (run build task) 直接就把博客 build 出来。

## 代码高亮

硬需求，必须得支持，比较流行的高亮库有

- [highlight.js](https://highlightjs.org/)
- [Prism.js](http://prismjs.com/)

据说后者好看一点，JavaScript 的创始人也在用

```javascript
function Greeter(greeting) {
    this.greeting = greeting;
}

Greeter.prototype.greet = function() {
    return "Hello, " + this.greeting;
}

// Oops, we're passing an object when we want a string. This will print
// "Hello, [object Object]" instead of "Hello, world" without error.
let greeter = new Greeter({message: "world"});
```

## 中文排版干净舒服

不要求过分漂亮，但起码看起来要干净舒服，文字要清晰。有些程序员的博客还在用楷体，其审美真是受不了，主观问题不多说，直接向`Github`看齐就好，毕竟大家普遍觉得他的还不错。

我先使用了国际通用的`css reset`库叫做 [normalize.css](https://necolas.github.io/normalize.css/)

又找到一个css库就叫做 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) 太棒了直接用起来就好了！

## 搜索引擎友好

如果你不是个明星程序员，那么注定流量大部分来自于搜索引擎，所以千万不要忽略SEO的重要性

下边是一篇 `Markdown` 博客开头加入的 `YAML`

```markdown
---
title: CodingBlog：给程序员的私房极简博客系统
date: 2017-09-01
tags: Markdown,文档
description: 这是一篇介绍CodingBlog博客是如何实现的文章
---
```

我希望生成对应的HTML是这样的，博客的 `tag` ，正好对应搜索引擎需要的 `keywords`

```html
<title> CodingBlog：给程序员的私房极简博客系统 | CodingBlog</title>
<meta name="description" content="这是一篇介绍CodingBlog博客是如何实现的文章">
<meta name="keywords" content="Markdown,文档">
<meta name="author" content="Nshen <nshen121@gmail.com>">
```


然后 Sitemap 和 feed 也是少不了的。

## 响应式，1080p优先

根据我的后台统计，作为一个独立博客，不会是mobile优先，大部分流量还是来自大屏，所以优先给他们最好的显示效果

![1080p优先](/image/codinglog/1920.png)

`header`在小屏幕下应该是响应式的，有 mobile 和 pad 两种尺寸。

## 社交分享

找到一个叫做 [share.js](https://github.com/overtrue/share.js) 的库，如下图看起来不错，用起来

![share.js](/image/codinglog/share.png)

## 与git配合替代云笔记或wiki

我在看文档或pdf的时候，习惯记一些笔记，或用wiki的形式整理一些链接。

`evernote` ， `网易云笔记` ， `为知笔记` 云笔记换了又换，总有这样那样的不足。

为什么不在博客里加个云笔记**私密目录**呢，可以把**私密目录**绑定到一个私有git库(`coding`或`oschina`免费)，在**私密目录**里边的文件不会 build 到最终网站上。但会随着我们的私有库进行版本管理，就跟云笔记一样了。如果草稿完成，可以手动移到src目录里，则会根据需求参与 build ，生成一篇日志或者一个独立网页了。

详细博客目录是这样设计的：

    myblog
      |
      |----- build/  // 生成的网站目录
      |----- src/    // markdown文章目录
      |----- note/   // 私密目录

`myblog` 是整个博客程序的目录，可以整个把这个目录git同步到一个免费的私有库中，但会`.gitignore`过滤掉`build`目录。

`build`目录就是生成的整个网站，我使用chrome的插件 [web-server-chrome](https://github.com/kzahel/web-server-chrome) 绑定在这个目录，就可以直接在本地chrome中预览生成的网站了

![web-server-chrome](/image/codinglog/server.png)

同时，这个`build`目录也是一个`git`目录，同步在 public 的`Github Pages` 或 `Coding Pages` 上，进入该目录，`push` 一下，就直接传到外网了，别人就可以访问了，超级方便。

`src` 目录则是所有博客`.md`文件放的地方，如果我要写博客，直接用`VSCode`打开这个目录，这个目录里的子目录就是博客的分类，在相应的子目录里新建一个`.md`文件就可以写了，而且用`VSCode`打开`src`目录，会非常干净，不会误操作目录外的其他文件。

`note` 目录是草稿或者是代替云笔记或wiki的**私密目录**的目录，在里边的文件不会 build 到最终网站上。但会随着我们的私有库进行版本管理，就跟云笔记一样了。如果草稿完成，可以手动移到`src`目录里，生成一篇日志或生成一篇独立类似wiki的网页。

## 分类与 tags

我根据个人的需求，默认将内容分为两类，**article** 和 **project** （其实就是两个文件夹），article 分类下可以放一些学习或读书笔记，project 分类下可以放一些我做的小项目。

其他详细的类别，全部通过加 `tag` 的方式实现，比如 `JavaScript` 相关的文章可以加 `JavaScript` 的 `tag`

之后访问下边的链接，会列出所有带`JavaScript`标签的内容

> http://nshen.net/tags/#JavaScript

## 总结

我尝试实现了上边提到的功能，好像有些简陋，但暂时个人觉得已经够用了。
代码已经上传到github上了，如果你想跟我使用同款的博客，请到戳下边的链接进去看看，会有使用说明。

[CodingBlog](https://github.com/nshen/coding-blog)

如果你觉得哪里不爽，或是功能太少，欢迎帮我完善，代码很简单而且有注释。

如果可以的话，请进去加个star，谢谢。