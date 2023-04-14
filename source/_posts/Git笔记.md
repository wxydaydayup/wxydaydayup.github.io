---
date: 2022-10-22 11:16:56
summary: Git与Github操作
author: WangXinYi
img: /images/homePage/git操作.webp
categories: 
  - Git
  - Github
tags:
  - Git
  - Github
typora-root-url: ..
---

# Git

## GitHub加速

方法一：修改hosts文件，hosts文件地址  `C:\Windows\System32\drivers\etc`

方法二：使用FastGithub加速器  [FastGithub加速器](https://github.com/wxydaydayup/goodSoftware)

## Git操作

### Git上传到GitHub

#### 第一种方法

第一步：

​	查看SSH key 秘钥位置  `C:/Users/LENOVO/.ssh/id_rsa `  并且在Github中创建SSH key

第二步：

​	在要上传的文件夹里右键打开`Git Bash Here`

第三步：

​	把Github上面的仓库克隆到本地

​		`git clone https://github.com/wxydaydayup/Study_Notes.git`

​	这个步骤以后本地项目文件夹下面就会多出个文件夹，该文件夹名即为Github上面的项目名，多出了个Study_Notes文件夹，把本地项目文件夹下的所有文件（除了新多出的那个文件夹不用），其余都复制到那个新多出的文件夹下

​	继续输入命令 `cd Study_Notes`，进入Study_Notes文件夹接下来依次执行 

1. `git add *`    （注：别忘记后面的.，此操作是把Test文件夹下面的文件都添加进来）
2. `git commit  -m  "提交信息"`  （注：“提交信息”里面换成你需要，如“first commit”）
3. `git push -u origin main`   （注：此操作目的是把本地仓库push到Github上，此步骤需要你输入帐号和密码）

#### 第二种方法

从第一种方法 的第三步开始输入

1. `git init`

2. `git add *`

3. `git commit -m 1.zip`

   不加 -m 退出 ESC :wq 

4. `git remote add origin github.com/wxydaydayup/Study_Notes.git`（此时记得在github上创建一个仓库，并把仓库的ssh地址赋值下来，关联远程仓库）

5. `git push -u origin master`  (这时github上就会多出文件，空加-u，不空不用,`git push -f origin master` 在这里，如果报错，就强制性上传代码)

### Git大文件上传

#### Git lfs

#### 彻底删除lfs

`git lfs uninstall`

`git filter-branch --force --index-filter`

### Git 分支

1. 切换分支 `git checkout 分支名`
2. 创建并切换 `git checkout -b 分支名`
3. 合并分支  `git merge 分支名`
4. 删除分支时，需要做各种检查  `git branch -d 分支名`
5. 不做任何检查，强制删除分支 `git branch -D 分支名`（适用于dev分支没merge到主分支上）

### Git常用命令

1. 查看仓库状态 :  `git status`
2. 仓库初始化：`git init`
3. 添加文件到Git仓库：`git add demo.txt`
4. 提交文件到Git仓库：`git commit -m "1"`
5. 版本回退 `git reset --hard XXXX`
6. 查看版本信息 `git reflog`
7. 以精简的方式显示提交记录 `git-log` 

### Git错误

#### 错误1：

​	`error: git SSl certificate problem: unable to get local issuer certificate`

​	这个问题是由于没有配置信任的服务器HTTPS验证。默认，CURL被设为不信任任何CAS，就是说，它不信任任何服务器验证。只需要执行下面命令就可以解决：

​	`git config --global http.sslVerify false`

#### 错误2：

​	`error: RPC failed; curl 18 transfer closed with outstanding read data remaining`

​	`send-pack: unexpected disconnect while reading sideband packet`

​	`fatal: the remote end hung up unexpectedly`


解决方法：

1. 缓存过小导致，可以尝试增大缓存 单位为byte, 524288000就是500M

   ​	`git config --global http.postBuffer 524288000`  

   百度查到说是的postBuffer默认值太小的原因，我看有人说调整到500M就行，但我试了不可以，所以就调整到了2G，有人成功了，是根据以下命令调整的

   ​	`git config --global http.postBuffer 2024288000`

2. 网络波动导致，可以尝试取消相关的网络限制

   ​	`git config --global http.lowSpeedLimit 0`

   ​	`git config --global http.lowSpeedTime 999999`

3. 若传输文件实在太大，可以尝试增大压缩率(压缩率大小根据实际情况设置),compression 是压缩的意思，从 clone 的终端输出就知道，服务器会压缩目标文件，然后传输到客户端，客户端再解压。取值为 [-1, 9]，-1 以 zlib 为默认压缩库，0 表示不进行压缩，1…9 是压缩速度与最终获得文件大小的不同程度的权衡，数字越大，压缩越慢，当然得到的文件会越小

   ​	`git config --global core.compression 3`

4. 推送的文件大小太大了，超过了HTTP的限制，更换远程地址，改用git 协议来推送代码，这个最终成功了

   ​	`git remote set-url origin git@github.com:wxydaydayup/BookPdf.git`

   ​	`git push -u origin master`

## Idea连接Github/Gitee

1. 创建Tooken  https://github.com/settings/tokens/new 权限全部点上

2. VCS --> Import into version Control --> Create Git Repository 

3. VCS --> clone

4. 设置SDK 与 配置maven

   <img src="/images/Git%E7%AC%94%E8%AE%B0/image-20221013151533015.png" alt="image-20221013151533015" style="zoom: 67%;" />

   pom.xml 点击右键 -》Add as Maven Project

5. 连接数据库

   若出现错误：

   ​	`Server returns invalid timezone. Go to 'Advanced' tab and set 'serverTimezone' property manually.`

   在Advanced设置一下时区即可

   <img src="/images/Git%E7%AC%94%E8%AE%B0/image-20221013154539389.png" alt="image-20221013154539389" style="zoom:67%;" />

6. IDEA集成GitBash作为Terminal（建议）

   <img src="/images/Git%E7%AC%94%E8%AE%B0/image-20221014095006382.png" alt="image-20221014095006382" style="zoom: 67%;" />

   7、看看效果

   <img src="/images/Git%E7%AC%94%E8%AE%B0/image-20221014095334858.png" alt="image-20221014095334858" style="zoom: 50%;" />

## Git合并拉取代码规范

1. 先拉取自己开发分支远端代码（适用多人共用一个开发分支）
2. 测试完成后将自己开发代码提交到本地仓库，上传到自己的远端开发分支
3. 换到master分支，拉取master远端的最新代码
4. 确保本地master分支的代码为远端最新代码后，把开发分支合并到master分支
5. 本地master分支代码上传到远端master 

## Github搜索技巧

计算机图形学 in:name stars:>100 language:java

计算机图形学 in:readme

[Github删除自己的仓库](https://blog.csdn.net/zzzzlei123123123/article/details/105174595)
