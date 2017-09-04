---
title: npm包管理器学习笔记
date: 2016-02-13 15:15:00
tags: Node,JavaScript
categories: article
toc: true
description: npm是js界的包管理器，这里记录一下它基本的使用方法。
---

npm是js界的包管理器，这里记录一下它基本的使用方法。

<!--more--> 

## 安装npm

1. https://nodejs.org/ 下载安装nodejs
`node -v`查看安装版本

2. node自带npm, `npm -v`查看npm版本

3. 更新到最新版本 
`npm install npm -g`

4. 如果遇到permission错误到这里看看
`https://docs.npmjs.com/getting-started/fixing-npm-permissions`

---

## 安装包

分为本地安装和全局安装,本地安装后你可以在的程序中用`require('package')`访问,全局安装通常是用于命令行工具,例如构建工具grunt CLI.

### 本地安装

`npm install <package_name>`
如果有`package.json`指明依赖,则不需要输入package_name直接`npm install` 即可全部安装完成。
运行后会当前目录生成一个`node_modules`目录,package会安装在里边
如果当前目录有一个`package.json` 则会安装里边指定的版本,否则安装最新版.
安装完成即可在代码中使用了
`require('lodash');` //如果没有安装loadash则会报错

### 全局安装

`npm install -g <package_name>`

全局包安装路径:

`npm root -g` 显示全局包安装路径

在我的电脑上显示 `C:\Users\Administrator\AppData\Roaming\npm\node_modules`


---

## package.json

package.json最低要求需要name与version
```
{
  "name": "my-awesome-package",
  "version": "1.0.0"
}
```

自动创建package.json

`npm init`

然后一路填表就可以了,author部分可以填多一些

`Your Name <email@example.com> (http://example.com)`

指明包依赖列表

* `"dependencies"`: these packages are required by your application in production
* `"devDependencies"`: these packages are only needed for development and testing

安装package时自动加入依赖列表

`npm install <package_name> --save` 加入到dependencies
`npm install <package_name> --save-dev` 加入到devDependencies

---

## 更新包

### 本地包更新

`npm ls` 查看已经安装的package
`npm outdated` 查看是否有新版本 ，分为 current wanted latest
`npm update` 更新到wanted版本，加--save，保存到package.json

如需更新到latest，建议安装 [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) 插件

### 全局包更新

`npm ls -g --depth=0` 查看都安装了哪些全局包
`npm outdated -g --depth=0` 查看哪个包需要更新
`npm install -g <package_name>` 更新
`npm update -g` 更新所有的全局包

---

## 删除包

### 本地删除

`npm uninstall <package_name>`

删除包,但不会清理package.json中的依赖项,下次`npm ls`时会报错缺少包

`npm uninstall --save <package_name>` 这样连依赖一起删掉

如果只删除了依赖,没有删除包,下次`npm ls`时会报多了包

这时应该用`npm prune`把包也删除掉

### 全局删除

`npm uninstall -g <package_name>`


---

## 发布包

### 创建用户

`npm adduser`

填入用户名密码邮箱, `https://www.npmjs.com/~用户名`查看是否创建成功

### 发布

确保package.json填写正确

`npm publish`

如果报错考虑是否package.json中的name有重复了,修改后再次发布试试.

---

## 更新发布的包

修改后再次`npm publish` 后会报错,是因为没有修改version.
手动修改package.json或者用下边三条命令来修改版本后,再publish

`npm version patch` //末位
`npm version minor` //中间
`npm version major` //首位

### 关于版本号

对于 **发布者** 来说当项目准备公开时,版本号应该为`1.0.0`

* **Patch release**:  Bug fixes 或其他 minor changes: , 增加最后一位版本号, e.g. `1.0.1` 对应命令`npm version patch`
* **Minor release**: New features 不会破坏现有的 features, 增加中间位, e.g. `1.1.0` 对应命令`npm version minor`
* **Major release**: 不能向后兼容,增加首位, e.g. `2.0.0`对应命令 `npm version major`

对于 **使用者** 来说,可以安装指定的版本

`npm install package_name@1.x`

版本更多内容:
https://docs.npmjs.com/misc/semver

----

##  更新package.json

开发过程中更新包后，需要更新package.json里依赖的版本号到最新。

最简单的办法是使用 `npm-check-updates`

**安装：**

```bash
npm install -g npm-check-updates
```

**显示当前项目所有依赖：**

```bash
$ ncu

 express           4.12.x  →   4.13.x
 multer            ^0.1.8  →   ^1.0.1
 react-bootstrap  ^0.22.6  →  ^0.24.0
 react-a11y        ^0.1.1  →   ^0.2.6
 webpack          ~1.9.10  →  ~1.10.5

Run with -u to upgrade your package.json
```

**更新：**

```bash
$ ncu -u

 express           4.12.x  →   4.13.x

package.json upgraded
```

更新完毕。


----

## cnpm 镜像加速

**安装太慢可以使用淘宝镜像**

http://npm.taobao.org/

**安装 `cnpm` **

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

安装后就可以用`cnpm`代替`npm`了


---

还有暂时用不到的有待研究：

私有包
https://docs.npmjs.com/getting-started/scoped-packages
tag
https://docs.npmjs.com/getting-started/using-tags





