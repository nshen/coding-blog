---
title: 读书《版本控制之道--使用Git》
date: 2011-08-03 13:30:20
tags: git,读书
categories: article
---

我认为每个学过Git的人都应该做过类似这种笔记，因为Git命令太多看着看着就把前边看过的忘了，之前我也看过Git，但是一直没用，现在一看几乎没有印象了，所以这次我要把我看到的命令记下来给我自己备忘。

Git已经是最流行的版本控制系统了，网上相关的免费学习资源很多，我见过的中文书籍就有：

* <a href="http://gitbook.liuhui998.com/index.html" target="_blank">Git Community Book 中文版</a>
* <a href="http://progit.org/book/zh/" target="_blank">Pro Git 中文版 </a>
* <a href="http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/" target="_blank">Git Magic 中文版 </a>

但我是买的一本纸质书叫做《版本控制之道--使用Git》，下边是我记录的几乎是整本书讲过的所有命令，后期又添加了点其他内容，方便以后查阅。

<!-- more -->

## 设置

```bash
git config --global --list # 查看所有设置
git config --global user.name "Nshen" # 必须
git config --global user.email "nshen121@gmail.com" # 必须
git config --global color.ui "always"
# 或者"auto", always不仅Base环境是彩色，Dos里也是彩色的。
git config --global core.autocrlf input
# autocrlf 设置为 true 时会让 windows 下 push 代码时自动将 CRLF 转换为 LF ，并在 pull 代码时再转换回 CRLF
# 但如果你的编辑器已经支持 LF 了就不需要 pull 时再转回 CRLF 了，只要保证 push 时都是 LF 即可，所以要把 autocrlf 设置为 input

git config --global core.editor notepad.exe # 修改commit工具为windows记事本，不常用
git config --global alias.ci "commit" # 别名缩写，不常用
git config --global merge.tool # 可以设置合并工具，不常用

# 设置代理，只能http和https协议，git和ssh设置比较麻烦。
git config --global https.proxy 127.0.0.1:1080
git config --global https.proxy 127.0.0.1:1080
git config --global --unset http.proxy # 取消代理
git config --global --unset https.proxy # 取消https代理

```

其实最后这些设置都保存在

```bash
C:\Documents and Settings\用户名\.gitconfig 文件下（xp）
C:\Users\用户名\.gitconfig （win7）
```

## 查看帮助：

```bash
git help command
```

## 初始化

```bash
git init
```

## 纳入版本控制

```bash
git add *.txt   # 添加所有txt文件
git add README  # 添加单个文件
git add .        # 添加所有文件包括子目录，但不包括空目录
```

add命令是个多功能命令，根据目标文件的状态不同，此命令的效果也不同：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等,注意每次修改后都要重新add,不然就会提交之前add时的版本。

下边这两个模式，不常见

```bash
git add -i  # 进入交互式add
git add -p # 直接进入补丁模式，可以暂存修改的一部分。
```

## 提交

```bash
git commit -m "initial project version"
git commit -m "something" someFile  # 提交指定文件
git commit -C HEAD -a --amend  # 复用HEAD留言，增补提交（修改小错误，而不增加提交记录，掩盖自己的小马虎）
```

### 参数的意思

>-m "提交的说明"
>-a 动把所有已经跟踪过的文件暂存,并提交.(工作目录中修改过的文件都提交到版本库，不需一个一个手动add了)
>--amend 增补提交
>-C 复用指定提交的提交留言
>-c 打开编辑器在已有的提交基础上编辑修改

e.g 修改最后一次提交:

```bash
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
```

如果没有修改就相当于更改提交说明,上边3个命令得到一个提交.

## 忽略提交的文件

所有人都需要忽略的文件要写在`.gitignore`文件里，而只有自己的个人偏好需要忽略的文件要写在`.git/info/exclude`文件中

### 语法

```bash
# 此为注释 – 将被 Git 忽略
*.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
*.[oa]    #忽略以.o或.a结尾的文件
*~        #忽略以~结尾的文件
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

## 查看文件改动：

```bash
git diff   #  比较工作目录与缓存区的区别
git diff --cached 或者 git diff --staged  # 缓存区与版本库里的区别
git diff HEAD # 三者的区别
```

请注意，单单 git diff 不过是显示还没有暂存起来的改动，而不是这次工作和上次提交之间的差异。
所以有时候你一下子暂存了所有更新过的文件后，运行 git diff 后却什么也没有，就是这个原因。

```bash
git diff 18f822e 	   # 18f822e这个版本与当前目录的区别
git diff aaaaa..bbbbb  # 比较aaaaa与bbbbb之间差别
git diff --stat        # 可以统计数据，比较特别的命令

```

## 重命名，移动，删除文件：

```bash
git mv file_from file_to  # 改名或移动
```

```bash
$ git mv README.txt README
$ git status
# On branch master
# Your branch is ahead of 'origin/master' by 1 commit.
#
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       renamed:    README.txt -> README
```

其实，运行 git mv 就相当于运行了下面三条命令：

```bash
$ mv README.txt README
$ git rm README.txt
$ git add README
```

必须调用 `git rm 文件名`  ,从暂存区移除,并且文件也被删除

如果只是手工删除了文件,运行git status时会出现

```bash

# Changed but not updated:
#   (use "git add/rm <file>..." to update what will be committed)
#
#       deleted:    grit.gemspec
```

此时必须再运行 `git rm 文件名`，才会在提交时候不再纳入版本管理。

如果删除之前修改过并且已经add到缓存区了的话,则必须强制删除 -f

另外一种情况是，我们想把文件从Git仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。换句话说，仅是从跟踪清单中删除。比如一些大型日志文件或者一堆.a编译文件，不小心纳入仓库后，要移除跟踪但不删除文件，以便稍后在 .gitignore 文件中补上，用 --cached 选项即可。

## 查看状态：

### 查看当前状态 **git status**

```bash
$ git status
# On branch master
# Changes to be committed:  # 只要在这行后边的,说明放入暂存区了
#   (use "git reset HEAD <file>..." to unstage) # 想取消放入缓存 git reset HEAD README
#
#     new file:   README
# Changed but not updated:  # 跟踪文件内容改变,但还没有放到暂存区,需要git add 命令才会放到暂存区
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#    # 删除修改,恢复到之前版本,有危险 (如果想保留并且回退版本用stashing 和分支来处理)
#     modified:   benchmarks.rb
```

### 查看提交历史 **git log**

这时“j”向下浏览，“k”向上浏览，“q”退出

```bash
git log --pretty=oneline    # 一行显示
		--pretty="%h %s"   # 以各种格式输出

git log –p -2    # -p显示每次提交的内容差异  -2表示最近2次更改
git log --since "5 hours"
		--since "3 hours"
		--since "1 minute"
		--before ="2008-10.01"

git log 27j34j3j..03u43u23  # 最老版本..最新版本（不包括起点只包括终点）
git log 34j4j4..HEAD
git log fhfs8fh..           # 省略HEAD
git log "HEAD^^".."HEAD^"     # windows必须加引号表示回溯上一个提交
git log -1 HEAD~1  # 相当于git log -1 HEAD^
git log --graph # 图形化显示分支
git log --graph --pretty=oneline # 一行图形化显示分支
```

在windows下还可以`gitk`打开图形界面查看

### 问责：查明谁修改了代码

```bash
git blame hello.html # 你也可以用"-L"参数在命令(blame)中指定开始和结束行:
git blame -L 12,+10 hello.html  # 12到22行
blame还可以跟踪内容复制，文件复制，略，见版本控制之道 79页
```

## 撤销：

### 撤销缓存区的修改（没有commit的）

```bash
git checkout head 文件名 # 撤销暂存区的修改
git checkout head readme.txt todo.txt
git checkout head *.txt
git checkout head .  # 撤销所有
```

### 复位：还没有commit，让工作目录回到上次提交时的状态

```bash
git reset --hard HEAD   # 所有未提交的内容清空，这会让"git diff" 和"git diff --cached"命令的显示法都变为空
git reset --soft HEAD  # 复位版本库，暂存差异，便于提交中发现错误需要更改时有用（例如私人密码放到里边了）
```

### 反转提交：

```bash
git revert HEAD  # 创建一个反向的新提交抵消原来的提交改动
# 如果需要反转多个，必须从最后的开始反转, 加 -n可以不马上提交，之后一起提交。
git revert -n HEAD
git revert -n 54efhds
git commit -m "revert head and 54efhds"
```

## 分支：

### 在当前分支末梢建立分支：

```bash
git branch RB_1.0（建立分支不会自动切换过去）
```

### 切换分支：

```bash
git checkout RB_1.0（切换到RB_1.0分支）
```

### 创建并切换分支：

```bash
git checkout -b RB_1.0（简化上边2步操作）
```

### 删除分支：

```bash
git branch -d RB_1.0
```

#### 基于某次提交、分支或标签创建新分支:

```bash
git branch RB_1.0 master
git branch RB_1.0 6fe57de0
git branch Rb_1.01 1.0
```

### 查看分支：

```bash
git branch # 列出本地分支
	iss53
* master  # *号表示当前所在分支
	testing


git branch -r # 显示远程分支
git branch -a # 列出所有分支
```

### 分支重命名：

```bash
git branch -m master mymaster	
			-M 大写M会覆盖同名的分支
```

### 合并分支：

#### 直接合并：

```bash
git merge --no-ff somebranch # 最推荐的合并分支方式，会生成一个新的commit，不会丢掉分支信息
git merge 想合并到当前分支的源分支名
git merge --no-commit 分支 # 合并但不提交
```

#### 压合合并

将分支压合成一条commit记录，并合并过来

```bash
git merge --squash 某bug分支
git commit -m "修复某bug"
```

#### 拣选合并

只合并一个提交

```bash
git cherry-pick 321d76f
```

如果需要连续拣选，就需要加`-n`参数
然后再git commit ，但不要加`-m`参数，编辑器就会使用刚拣选的提交留言作为现在的留言。

## 标签Tag

### 查看标签

```bash
git tag
```

### 创建标签：

```bash
git tag 1.0  # 在当前分支最后一次提交创建标签
git tag 1.0 RB_1.0 # 基于RB_1.0分支的最新踢脚创建标签
git tag 1.0 ae468d8kt # 为某次提交创建标签
```

### 检出标签：

```bash
git checkout 1.0 
# 检出标签与检出分支一样操作，但检出标签后用git branch查看本地分支会发现你现在不再任何分支上 
# 这时你不应该修改，而应该立即基于此标签创建一个分支
git checkout -b from-1.0
```

### 变基：

1. git rebase RB_1.01 # 也许修改过一个bug，希望新版本变基到RB_1.01分支上
2. 手动解决冲突         # 如果解决不了直接git rebase --skip或--abort来跳过特定提交或完全放弃变基
3. git add xxx.html # 冲突解决
4. git rebase --continue

```bash
git rebase --onto HEAD^^ HEAD^ HEAD
```

--onto参数可以改写历史抹掉中间的参数，将倒数第一个参数变基到倒数第3个参数，为防止出错建议在试验性分支上先试验。

rebase -i 可以排序历史记录，多个提交合并为1个，一个提交分解成多个提交 ，
详见版本控制之道p86 ，需要编辑器支持，windows记事本不行

## 远程相关

```bash
git clone git://github.com/schacon/grit.git   # 从现有仓库克隆
git clone git://github.com/schacon/grit.git mygrit # 换名,唯一区别就是新建的目录成了mygrit,其他都一样
```

### 添加远程仓库

```bash
git remote add pb git://github.com/paulboone/ticgit.git
# clone会默认添加origin仓库，如果原本用git init创建的版本库，后来又想提交到远程版本库，就可以用下边的办法
git remote add origin git@example.com:/xxxxxx
```

### 查看远程分支：

```bash
git remote  -v # 查看远程仓库,默认clone后,应该有一个origin仓库,-v显示对应的clone地址
git remote show origin # 查看远程仓库信息
```

### 远程仓库重命名和删除:

```bash
git remote rename pb paul
git remote rm paul
```

### 远程仓库重命名

```bash
git remote set-url origin 新地址
```

### 获取数据：

```bash
git fetch [remote-name] 拉取远程仓库到本地远程仓库,不自动合并    # $ git fetch origin
$ git fetch pb
remote: Counting objects: 58, done.
remote: Compressing objects: 100% (41/41), done.
remote: Total 44 (delta 24), reused 1 (delta 0)
Unpacking objects: 100% (44/44), done.
From git://github.com/paulboone/ticgit
* [new branch]      master     -> pb/master
* [new branch]      ticgit     -> pb/ticgit
```

现在pb/master可以在本地访问了,你可以合并到自己的某个分支,或者切换到这个分支看看有什么有趣的更新

git pull 抓取数据合并到工作目录中当前分支

如果提示tracking information什么不对,可以这样指定本地examples分支跟随远端examples分支

	git branch --set-upstream-to=origin/examples examples

### 推送数据：

```bash
git push [remote-name] [branch-name]  # 默认为 git push origin master
git push origin serverfix   # 推送分支，其实是下边一句的简化,提取我的 serverfix 并更新到远程仓库的 serverfix
git push origin serverfix:serferfix
git push origin :serverfix # 这个语法用于删除,只要把分号前留空
```

## 其他：

```bash
git gc  # 垃圾回收，每隔一段时间例如一个月运行一次可以减少磁盘占用空间。
git reflog # 最后的保障,列出误删的东东
git bisect # 二分查找，版本控制之道p124页，略
```

## 归档版本库，导出压缩包:

```bash
git archive --format=格式 --prefix=目录/ 版本>压缩包.zip
git archive --format=zip head>test.zip
git archive --format=tar --prefix=mysite-1.0/ 1.0 | gzip>mysite-1.0.tar.gz
git archive --format=zip --prefix=mysite-1.0/ 1.0 >mysie-1.0.zip
```

