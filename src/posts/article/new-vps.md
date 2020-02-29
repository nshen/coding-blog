---
title: 我注册一个新的VPS之后要做的事
date: 2020-03-01 03:01:00
tags: 服务器
categories: article
description: 新手vps流程攻略
---

>装 VPS 这件事我做过无数次了，今天需要重装时我都把该干啥，有啥命令又忘得一干二净了，折腾了好久。

> 信息大爆炸，大脑不堪负荷，学过的东西一段时间不用就一点印象都没有。我觉得人类大脑也应跟着时代进化，让大脑专注处理信息，把存储功能移到大脑外部，也就是多写文档，多画思维导图，记不住干脆不要记，需要用的时候再找到文档加载进大脑就好了。如果早像今天这样记录一下，几个月后重装时候就可以直接加载进我的大脑，快速完成任务了。

作为一个普通用户，我的流程：

### 安装

首先我选择的系统是 `ubuntu 18.04`

安装后，注册商一般会给 `root` 密码，用root账号连上去

```bash
ssh root@my-server-ip
```
输入密码回车

### 更新系统

```bash
apt update
apt upgrade
```

有些服务商只能装`ubuntu 16`，需要自己升到18，不然没法开`bbr`

```bash
apt-get dist-upgrade # ubuntu16升18需要这条
do-release-upgrade # 开始升级
```

#### 安装vim

vim是值得花时间一学的技术，我不是vim信徒，也不太会配置那些乱七八糟的插件，但近两年一直用 `vscodevim` 插件写代码，常拿鼠标的手腕都不疼了。

`apt install vim`

### ubuntu 18 开启 bbr

开启bbr后，网速会更快 ，具体是为什么不知道，网上查的

```bash
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
sysctl -p
```
运行

```bash
sysctl net.ipv4.tcp_available_congestion_control
```
显示以下即已开启：

`net.ipv4.tcp_available_congestion_control = bbr cubic reno`

查看BBR是否启动

`lsmod | grep bbr`

显示以下即启动成功：

`tcp_bbr                20480  14`


### 添加新用户

不能每次都用root登录，应添加新用户，最好跟本地计算机相同用户名，这样就可以省略每次输入用户名了

```bash
adduser nshen  # 自动创建对应的组，并设置密码
passwd nshen # 重设密码
usermod -aG sudo nshen # 添加到sudo用户组，就可以使用sudo命令了
exit # 退出登录
```
重新连接ssh，如果跟本机同名则可以直接 `ssh ip` 输入密码就行了

```bash
whoami #我是谁
```

#### copy public key

把本地`public key`上传到服务器后，每次ssh会匹配我本机的`private key`，这样就不用每次输入密码那么麻烦了

```bash
exit # 回到本地
ssh-copy-id -i /home/nshen/.ssh/id_rsa nshen@my-server-ip
```
之后一路yes，再次ssh连接就不需要输入密码了

### 改ssh设置

这步**可选**，可以禁止root登录，或更改ssh端口，让系统更安全

`vim /etc/ssh/sshd_config`

找到这两行

```bash
PermitRootLogin yes
Port 22
```

如遇到ssh连接总自己断开，可以

``` bash
# 添加
ClientAliveInterval 30
ClientAliveCountMax 6
```

### Docker CE

Docker的出现对我这种新手来说最大的好处就是可以不怕把系统搞坏，需要什么软件的时候直接查docker的版本安装就好了。

Docker 首页好像很难找到免费版本的链接了，要搜 `docker-ce`

https://docs.docker.com/install/linux/docker-ce/ubuntu/

最简单的安装方式是脚本安装

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

添加用户到docker组

```bash
sudo usermod -aG docker nshen
```

#### docker compose

官网: https://docs.docker.com/compose/install/

最简单脚本安装

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version #是否安装成功
docker-compose version 1.25.4, build 1110ad01
```

测试一下

```bash
mkdir -p ~/fig/shadowsocks/
cd ~/fig/shadowsocks/
curl -sSLO https://github.com/shadowsocks/shadowsocks-libev/raw/master/docker/alpine/docker-compose.yml
vim docker-compose.yml # 配置参数
sudo docker-compose up -d # 启动
sudo docker-compose ps # 查看状态
```
