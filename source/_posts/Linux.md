---
date: 2021-11-08 14:54:44
author: WangXinYi
img: /images/homePage/wsl和linux.webp
top: true
summary: WSL配置和Linux命令
categories:
  - Linux
tags:
  - Linux
typora-root-url: ..
---

# Linux

## WSL

### 一、前言

**WSL比虚拟机的优点是进行深度学习训练的时候可以调用显卡**

但是WSL的坑还是很多的

+ wsl1不能使用显卡驱动，**建议直接装wsl2**
+ Ubuntu会默认下载到系统盘，需要移动，切记！！！

### 二、WSL的开启或升级

直接搜索启用或关闭Windows功能

+ [总结Windows下安装WSL](https://blog.csdn.net/qq_35333978/article/details/113177819#:~:text=3)

+ [总结Windows下安装WSL与升级WSL2的方法](https://blog.csdn.net/qq_35333978/article/details/113177819#:~:text=3，升级WSL1到WSL2的方法)

### 三、非系统盘安装Ubuntu

**注意：**

1. 如果想使用WSL1，使用管理员权限运行终端，输入wsl --set-default-version 1回车，再打开这个应用;

2. 如果想使用WSL2，打开Windows功能里面所有关于Hyper-V和虚拟机的相关项目，重新启动之后再打开这个应用。

#### 步骤

参考链接：[Windows10子系统WSL修改默认安装目录到其他盘](https://blog.csdn.net/weixin_40837318/article/details/108233688?ops_request_misc=%7B%22request%5Fid%22%3A%22165634014116780357254716%22%2C%22scm%22%3A%2220140713.130102334.pc%5Fall.%22%7D&request_id=165634014116780357254716&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-3-108233688-null-null.142^v24^huaweicloudv2,157^v15^new_3&utm_term=wsl修改默认安装目录到其他&spm=1018.2226.3001.4187)

#### 1.查看WSL分发版本

在`Windows PowerShell`中输入如下命令:

```
wsl -l --all  -v
```

结果如下:

```
 NAME STATE VERSION
 * Ubuntu-20.04 Running 2
```

#### 2.导出分发版为tar文件到d盘

```
wsl --export Ubuntu-20.04 d:\wsl-ubuntu20.04.tar
```

#### 3.注销当前分发版

```
wsl --unregister Ubuntu-20.04
```

#### 4.重新导入并安装WSL在d:\wsl-ubuntu20.04

```
wsl --import Ubuntu-20.04 d:\wsl-ubuntu20.04 d:\wsl-ubuntu20.04.tar 
```

#### 5.设置默认登陆用户为安装时用户名

```
ubuntu2004 config --default-user wangxinyi
```

### 四、设置Ubuntu图形化界面

**WSL1版本做这个步骤**

[WSL1: 在Windows10子系统里安装运行桌面](https://www.cnblogs.com/lee-li/p/11220533.html) 下载地址：[VcXsrv Windows X Server download](https://sourceforge.net/projects/vcxsrv/)

+ 如果报错无法启动，可能是因为没有提前设定DISPLAY

```
export DISPLAY=localhost:0
```

+ 启动xfce4

```
xfce4-session
```

**WSL2版本做这个步骤**

[WSL2: Linux搭建xfce4桌面和使用xrdp远程连接](https://blog.csdn.net/weixin_45579994/article/details/112381567)

每次启动都需要此命令

```
sudo service xrdp start
```

### 五、深度学习环境的配置

#### **1、配置cuda**

先安装nvidia-cuda驱动 ，再安装cuda

[WSL搭建CUDA环境](https://blog.csdn.net/Rayone_/article/details/124084988)

[Windows10/11 WSL2 安装nvidia-cuda驱动 ](https://www.bilibili.com/read/cv14608547/)

[Ubuntu下安装cuda，cudnn和pytorch_](https://blog.csdn.net/weixin_45204104/article/details/108241452?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-108241452-blog-122800423.pc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-108241452-blog-122800423.pc_relevant_recovery_v2&utm_relevant_index=2)

#### **2、Anaconda3的安装**

[Ubuntu20.04安装anaconda3与Pycharm]([https://blog.csdn.net/qq_44928822/article/details/128710982?ops_request_misc=%7B%22request%5Fid%22%3A%22167662936616782427453897%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=167662936616782427453897&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-128710982-null-null.142^v73^wechat,201^v4^add_ask,239^v2^insert_chatgpt&utm_term=Ubuntu20.04](https://blog.csdn.net/qq_44928822/article/details/128710982?ops_request_misc={"request_id":"167662936616782427453897","scm":"20140713.130102334.."}&request_id=167662936616782427453897&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-128710982-null-null.142^v73^wechat,201^v4^add_ask,239^v2^insert_chatgpt&utm_term=Ubuntu20.04)

#### 3、Pycharm的安装

[在Ubuntu中安装并配置Pycharm教程](https://blog.csdn.net/m0_37758063/article/details/111573552)

### 其他注意点

#### 1、windows 的盘符在哪？

window 磁盘放在`mnt`目录下，比如，进入 win10 的 C 盘：

```
cd /mnt/c
```

>  两个系统原本是使用不同的文件系统，但是微软为了让两种系统文件可以相互访问，使用WSL解决方案。一般情况下，可以在两种系统间随意复制文件，但是也有一些问题： 最常见的一个问题就是，Linux系统是大小写严格的，Window则对大小写不敏感。这就导致在一些Linux软件在window系统的盘符安装时，会出报错，后面会提到。 

#### 2、系统间复制文本

在一个系统复制文本后，在另一个系统右键即可粘贴文本

#### 3、安装 anaconda 报错

Exception: dst exists: ‘/mnt/f/Ubuntu/anaconda3/share/terminfo/e/eterm’

`/mnt`是不区分大小写的文件系统（WSL下的都不区分文件系统），所以必须将程序安装到区分大小写的文件系统上。两种解决方案：

#### 4、Ubuntu 系统文件在 Windows 的哪个地方？

两种方式去找：

+  `\\wsl$` 

<img src="/images/Linux/image-20230414195739477.png" alt="" style="zoom: 80%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />





可以在以下路径找

C:\Users\baimo\AppData\Local\Packages\

CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc\LocalState\rootfs

<img src="/images/Linux/image-20230414195755827.png" alt="" style="zoom: 80%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />

#### 5、查看Ubuntu的版本

```cmd
lsb_release -a
```

#### **6、查看防护墙**

在Ubuntu中 我们使用`sudo ufw status`命令查看当前防火墙状态

+ inactive状态是防火墙关闭状态 
+ active是开启状态。

#### 7、wsl2设置静态IP

[WSL2固定ip地址_manbucy的博客-CSDN博客](https://blog.csdn.net/manbu_cy/article/details/108476859?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2-108476859-blog-126024621.pc_relevant_landingrelevant&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2-108476859-blog-126024621.pc_relevant_landingrelevant&utm_relevant_index=4)

由于每次重新启动 WSL2（指完全重新启动，即重新启动了 Windows 或者通过 `wsl --shutdown` 彻底停止 WSL2 后的首次启动，如果只是切出去的话那不需要）都需要执行一次，不如保存成脚本文件方便使用：

保存成 `.cmd` 或者 `.bat` 文件，使用管理员身份运行即可。

```cmd
@echo off
setlocal enabledelayedexpansion

wsl -u root service docker start | findstr "Starting Docker" > nul
if !errorlevel! equ 0 (
    echo docker start success
    :: set wsl2 ip
    wsl -u root ip addr | findstr "192.168.56.100" > nul
    if !errorlevel! equ 0 (
        echo wsl ip has set
    ) else (
        wsl -u root ip addr add 192.168.56.100/28 broadcast 192.168.56.115 dev eth0 label eth0:1
        echo set wsl ip success: 192.168.56.100
    )


    :: set windows ip
    ipconfig | findstr "192.168.56.101" > nul
    if !errorlevel! equ 0 (
        echo windows ip has set
    ) else (
        netsh interface ip add address "vEthernet (WSL)" 192.168.56.101 255.255.255.240
        echo set windows ip success: 192.168.56.101
    )
)
pause
```

至此，你可以通过 `192.168.56.100` 从 Windows 下访问 WSL2（由于 Windows 会为 WSL2 自动配置端口转发，因此也可以直接访问 localhost 访问里面的应用），通过 `192.168.56.101` 从 WSL2 访问 Windows 了。

[给 WSL2 设置静态 IP 地址 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/380779630)





## Linux命令

**移动一个文件夹到另一个文件夹下**

```
sudo mv 文件名 目标文件夹路径
```

## Docker的安装与使用

在 Ubuntu 上安装 Docker 非常直接。我们将会启用 Docker 软件源，导入 GPG key，并且安装软件包。

### 一、更新软件包索引

首先，更新软件包索引，并且安装必要的依赖软件，来添加一个新的 HTTPS 软件源：

```text
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

使用下面的 `curl` 导入源仓库的 GPG key：

```text
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

将 Docker APT 软件源添加到你的系统：

```text
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

### 二、安装Docker 软件源

Docker 软件源被启用了，你可以安装软件源中任何可用的 Docker 版本。

#### 1、想要安装 Docker 最新版本

运行下面的命令。如果你想安装指定版本，跳过这个步骤，并且跳到下一步。

```text
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

#### 2、想要安装指定版本

首先列出 Docker 软件源中所有可用的版本：

```text
sudo apt update
apt list -a docker-ce
```

可用的 Docker 版本将会在第二列显示, 例如：

```text
docker-ce/focal 5:19.03.9~3-0~ubuntu-focal amd64
```

通过在软件包名后面添加版本`=<VERSION>`来安装指定版本：

```text
sudo apt install docker-ce=<VERSION> docker-ce-cli=<VERSION> containerd.io
```

3. 验证是否安装成功（Unbunt版本）

一旦安装完成，Docker 服务将会自动启动。你可以输入下面的命令，验证它：

```text
sudo service docker start
```

当一个新的 Docker 发布时，你可以使用标准的`sudo apt update && sudo apt upgrade`流程来升级 Docker 软件包。

如果你想阻止 Docker 自动更新，锁住它的版本：

```text
sudo apt-mark hold docker-ce
```

#### 3、docker命令

+ 重启docker（CentOS版本）


```
systemctl restart docker
```

+ 重启容器

```
docker restart 4b1361a68543
```

+ 列出所有容器ID


```
docker ps -aq
```

+ 列出运行的容器ID


```
docker ps
```

+ 停止所有的容器，这样才能够删除其中的镜像


```
docker stop $(docker ps -a -q) 或者 docker stop $(docker ps -aq) 
```

+ 删除所有容器指令


```
docker rm $(docker ps -a -q) 或者 docker rm $(docker ps -aq) 
```

+ 查看当前镜像


```
docker images
```

+ 删除镜像，通过镜像的id来指定删除


```
docker rmi <image id>
```

+ 强制删除全部镜像


```
docker rmi -f $(docker images -q)
```

+ 显示日志

```
sudo docker-compose logs --tail 30 -f
```

+ 按ctrl+P+Q正常退出容器

+ 进入mysql

  （1）docker ps  ——命令用来展示所有运行中的容器（docker ps -a 是命令是用来展示所有所有的容器，包括未运行的容器）

  （2）docker exec -it    ***（ID，可以写上全部，也可以写前三个） bash  ——进入容器终端并且的保留为容器终端的输入形式

  （3）mysql -u root -p

  （4）输入mysql的密码

<img src="/images/Linux/image-20230320091309428.png" alt="" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />



<img src="/images/Linux/image-20230320091446358.png" alt="" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />






