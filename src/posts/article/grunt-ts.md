---
title: 使用grunt-ts编译typescript项目
date: 2014-12-05 12:55:20
tags: TypeScript
categories: article
description: Grunt笔记，教您如何使用 grunt-ts 编译 typescript
---

不是这世界变化快，是我一直没关注。这几年js发展这么快是我怎么也想不到的，今天研究的是js界高大上的Grunt构建工具，因为发现很多老外的开源项目都在用这个。研究一下，还挺方便的。

首先看一下我的目录结构

```markup
    ProjectA
        |-----build //编译后的all.js等文件放在这里
        |-----core  //typescript项目,里边若干.ts文件
        |-----test  //用编译后的all.js做测试,里边有若干js和html文件
```

我的需求是这样的，core文件夹里有多个.ts文件，需要按照我指定的顺序编译成一个all.js文件，为什么要指定顺序，是因为js是从上到下执行，没执行到的就是不存在的。如果顺序不对的话运行时会报各种找不到类的错误。除了这个还有以下需求：

* 编译的`all.js`放到`build/`目录
* 需要生成`build/all.js.map`
* 需要生成`build/all.d.ts`
* 需要生成`build/all.min.js`
* 基于ES5，Commonjs编译
* 编译后的文件删除注释
* 编译后将build目录下的所有文件复制到test文件夹里做测试

<!-- more -->

估计已经涵盖大部分typescript开源项目的需求了，我不知道其他人是怎么做这些的，我自己之前一直使用WebStorm来写TypeScript，WebStorm里有一个叫做File Watcher的功能，可以把它配置成每次发现文件改动自动调用编译器tsc来编译TypeScript，它有一个Arguments的文本框，可以添加tsc的编译参数。

我都是这么填的：

```bash
--sourcemap E:\ProjectA\core\reference.ts -d --out E:\ProjectA\test\all.js --target ES5 --removeComments
```

我在reference.ts里指定了ts文件的顺序，所以只编译这一个文件，就达到了按指定文件顺序全部编译的目的。
我写了绝对路径，这样就可以在任何目录里编译了。
因为不能复制文件，就只能把core项目直接编译到test文件夹里做测试了。

测试完后，我还要手动手动把all.js复制回build文件夹，想办法生成min.js等一堆麻烦事。。。直到发现了[Grunt](http://gruntjs.com/)。

# 用Grount实现需求

## 安装`cli`

```bash
npm install -g grunt-cli
```

## 来到项目路径

npm init 命令来创建一个 `package.json` 文件，回答问题会自动创建`package.json`，其实一路回车就行了，都有默认答案
好多属性，不知道有什么用的，删掉！看官网教程好像只需要一个name ，一个 version就行，其他删掉了。

```json
{
	"name": "gruntTest",
	"version": "1.0.0",
	"description": "just a test"
}
```


### 装第一个依赖项目，必然是`grunt`本身

```bash
npm install grunt --save-dev
```

安装完成，目录里多了一个`node_modules`目录，这是nodejs模块安装到的目录。

### 修改gitignore

`.gitignore`文件里加入这两个目录，不然被传到github上就不好了

```markup
/node_modules
.tscache
```
现在`package.json`变成这样了

```json
{
	"name": "gruntTest",
	"version": "1.0.0",
	"description": "just a test",
	"devDependencies": {
	"grunt": "^0.4.5"
	}
}
```

因为安装grunt时时加了`--save-dev`参数，所以会被自动加进依赖里

### 安装今天的主角，TypeScript的编译器插件grunt-ts

```bash
npm install grunt-ts --save-dev
```

再看`package.json`如下:

```json
{
	"name": "gruntTest",
	"version": "1.0.0",
	"description": "just a test",
	"devDependencies": {
	"grunt": "^0.4.5",
	"grunt-ts": "^1.12.1"
	}
}
```

### 安装生成all.min.js的插件

```bash
npm install grunt-contrib-uglify --save-dev
```

### 安装copy插件

```bash
npm install grunt-contrib-copy --save-dev
```

现在看一眼`package.json`应该变成这样了

```json
{
	"name": "gruntTest",
	"version": "1.0.0",
	"description": "just a test",
	"devDependencies": {
	"grunt": "^0.4.5",
	"grunt-contrib-copy": "^0.7.0",
	"grunt-contrib-uglify": "^0.6.0",
	"grunt-ts": "^1.12.1"
	}
}
```

ok ，全部安装完毕，现在可以看[grunt-ts官网](https://www.npmjs.org/package/grunt-ts)介绍各种参数怎么用吧

添加一个Gruntfile，基于[官网的例子](https://github.com/TypeStrong/grunt-ts/blob/master/sample/Gruntfile.js)直接修改的

```javascript
module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		ts:  //用来编译typescript的任务
		{
			options: 
			{
				comments: false,               // 删除注释
				target: 'es5',                 // es5,默认为es3
				module: 'commonjs',            // 居然默认是amd?
				declaration: true,             // 生成.d.ts
			},

			build: 
			{
				src: ["core/reference.ts"],  
				// reference: 'core/reference.ts',  //第一次生成reference.ts,之后手动修改顺序,之后注释掉
				out: './build/all.js', 
			}
		},

		uglify: //uglify插件用来代码压缩,生成min.js
		{
			min:
			{
				files: {'build/all.min.js': ['build/all.js']}
			}
		},

		//copy插件把build目录下的所有文件复制到test文件夹
		copy:
		{
			builds: {expand: true, cwd: 'build/', src: '*', dest: 'test/'}
		}

	});
	
	//加载之前命令行安装的3个插件
	grunt.loadNpmTasks("grunt-ts");     
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	//任务顺序: 编译typescript -> 生成min.js -> 复制build目录里的文件到ProjectA_Test
	grunt.registerTask("default", ["ts:build" , "uglify:min" , "copy:builds"]);
};
```

可以编译了，打开命令行，输入grunt ，应该是这样的

```bash
E:\ProjectA> grunt

	Running "ts:build" (ts) task
	Compiling...
	Cleared fast compile cache for target: build
	Fast compile will not work when --out is specified. Ignoring fast compilation
	Using tsc v1.0.1

	TypeScript compilation complete: 4.51s for 1 typescript files

	Running "uglify:min" (uglify) task
	>> 1 file created.

	Running "copy:builds" (copy) task
	Copied 4 files

	Done, without errors.

```

Done了，没有错误！