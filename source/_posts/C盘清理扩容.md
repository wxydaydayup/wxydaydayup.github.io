---
date: 2021-11-08 14:54:44
author: WangXinYi
img: /images/homePage/c盘清理扩容.webp
top: false
summary: C盘清理扩容
categories:
  - 生活
tags:
  - 生活
typora-root-url: ..
---

## C盘清理

#### 一、删除C盘Windows下的Temp、Prefetch、Backup、SoftwareDistribution

**Temp文件夹只是一个临时文件夹，位于C盘/windows/Tempwen**主要是电脑系统在运行时，经常会产生大量无用的临时文件。这些多余的文件，就会自动保存在文件夹下。但在删除的时候，只能把Temp文件夹下的文件删除，而不能删除文件夹本身。

**Prefetch是一个预读文件夹，一般位于C盘/windows/Prefetch文件夹下。**主要是用来存放系统已访问的文件预读信息，这个文件初始化系统时，是为了加快系统的启动过程。但时间越长预读信息越多，就严重占用电脑的存储空间，所以需要定时进行清理。

**Backup文件在Windows/WinSxS文件夹下，**有很软件及文件备份时，都把文件保存在 Backup文件夹下。保存备份文件之后，这些文件就没有多大的作用，所以把Backup文件下的多余文件删除，对电脑系统的运行也无太多的影响。

**Windows/SoftwareDistribution文件夹里，**基本上都是一些系统更新补丁和漏洞修补程序，还有一些“日志”信息。比如文件夹下的Download子文件里，全部都是一些系统漏洞和补丁的程序文件，占用了大量内存容量，删掉后可腾出大量存储空间。

## C盘扩容

### 一、分区助手 9.8.0

#### 1、选择D盘分配空闲空间

<img src="/images/C%E7%9B%98%E6%B8%85%E7%90%86%E6%89%A9%E5%AE%B9/image-20230220104100412.png" alt="image-20230220104100412" style="zoom: 50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />

#### 2、选择分配给C盘和分配空闲空间的大小

<img src="/images/C%E7%9B%98%E6%B8%85%E7%90%86%E6%89%A9%E5%AE%B9/image-20230220104147768.png" alt="image-20230220104147768" style="zoom:80%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />

#### 3、选择上方的提交

<img src="/images/C%E7%9B%98%E6%B8%85%E7%90%86%E6%89%A9%E5%AE%B9/image-20230220104256356.png" alt="image-20230220104256356" style="zoom: 50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />

#### 4、选择执行

<img src="/images/C%E7%9B%98%E6%B8%85%E7%90%86%E6%89%A9%E5%AE%B9/image-20230220104332743.png" alt="image-20230220104332743" style="zoom: 50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />

#### 5、选择ProOS模式，等待完成