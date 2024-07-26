# CodingBlog 程序员的私房极简博客系统

极简静态博客系统[（简介和演示在此）](https://nshen.github.io/project/2017-09-04/new-blog/)


## 安装方法

1) 下载到本地

`git clone https://github.com/nshen/coding-blog.git myBlog`

2) 进入目录 

`cd myBlog`

3) 安装 node 依赖
    
`cnpm install` 或 `npm install`

4) 编译并打开本地预览

`npm start`

此时应该会自动打开 `http://127.0.0.1:8080` 预览，对应的目录为本地 `./build`。

5) 只要上传 `./build` 目录到服务器就可以浏览了，不需要上传其他目录。

## 目录结构

```
myBlog
  |
  |----- build/   生成的网站根目录
  |----- src/     # markdown文件目录
```

[还有问题可以直接来问我](http://nshen.net/about/)
