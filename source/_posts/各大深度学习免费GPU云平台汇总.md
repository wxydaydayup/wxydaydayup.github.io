---
date: 2023-04-23 09:23:13
img: /images/homePage/免费gpu.webp
tags:
  - 生活
categories:
  - 生活
summary: 各大深度学习免费GPU云平台汇总
---



# 各大深度学习免费GPU云平台汇总

每台计算机都有一个cpu作为中央处理器,cpu可以胜任多种不同任务。

显卡中包含的GPU也就是图形处理器（graphics processing unit）与CPU不同的是GPU作为图像处理单元，可以高效并行地做矩阵运算。

### 一、阿里云天池TCC V100 16G显存 8c32g 单次最长运行24小时

+ 阿里云天池提供的 GPU，也不错，并且国内的服务，不需要梯子，就是文件上传速度慢了点。
+ 显卡：V100、P100、T4 等训练主流显卡，显存 16 G。
+ 磁盘存储：5 G。
+ 时间限制：每次 8 个小时。

推荐指数：⭐️⭐️⭐️⭐️⭐️

直达链接：[零基础入门Docker-cuda练习场【免费GPU】赛题与数据-天池大赛-阿里云天池](https://link.zhihu.com/?target=https%3A//tianchi.aliyun.com/competition/entrance/531863/information)

或 [零基础入门强化学习-经典游戏挑战赛赛题与数据-天池大赛-阿里云天池](https://link.zhihu.com/?target=https%3A//tianchi.aliyun.com/competition/entrance/531854/information)

<img src="https://pic3.zhimg.com/80/v2-fe4202b97f558de32b25d6b3617a4882_720w.webp"  style="zoom: 80%;" />

以docker形式提交代码 然后查看运行结果和日志

<img src="https://pic3.zhimg.com/80/v2-8a0dc3bb52910c9b24d0152d36673d26_720w.webp"  style="zoom: 80%;" />

### 二、Googlecolab T4 16G显存 单次最长运行12小时 (GPU/TPU)

+ **无需配置开发环境**，直接运行体验算法效果。
+ 但是它也有明显的问题，**需要梯子**，毕竟 Google 的产品。
+ 只需要在 Google Drive 上，安装 colab 即可使用。如果需要上传数据，可以上传到 Google Drive 上，并在 colab 中挂载，就可以直接访问。
+ 显卡：V100、P100、T4 等训练主流显卡，显存 16 G。
+ 磁盘存储：15 G，可使用 Google Drive 扩容。
+ 时间限制：每次 12 个小时。

+ （前提需先确认你的网络是否能够打开，测试链接[colab.research.google.com](https://link.zhihu.com/?target=http%3A//colab.research.google.com)）


推荐指数：⭐️⭐️⭐️⭐️⭐️

直达链接：[colab.research.google.com](https://link.zhihu.com/?target=http%3A//colab.research.google.com)

<img src="https://pic2.zhimg.com/80/v2-cc29ece816f9fa9d3e9d510a0057bd69_720w.webp" style="zoom: 80%;" />

GPU 配置

<img src="https://pic1.zhimg.com/80/v2-8dec623d68a51feead60842606776a58_720w.webp" style="zoom:80%;" />

默认colab是不配置GPU的 设置开启GPU方法如下：

<img src="https://pic3.zhimg.com/80/v2-4688b6c3663fbebda7bec8efddb3b806_720w.webp" style="zoom: 80%;" />

<img src="https://pic3.zhimg.com/80/v2-626d0c7e9f519b3c8fe7c4fd7dcb8b26_720w.webp" alt="img" style="zoom:33%;" />

### 三、Kaggle Notebook (GPU/TPU) P100 16G显卡 43H每周使用时长

+ Kaggle 和 Colab 都是 Google 提供的服务，登陆**不需要梯子**，但不用梯子，加载页面速度有些慢。
+ 显卡：V100、P100、T4 等训练主流显卡，显存 16 G。
+ 磁盘存储：5 G。
+ 时间限制：每次 12 个小时。

推荐指数 ⭐️⭐️⭐️⭐️

直达链接[Run Data Science & Machine Learning Code Online | Kaggle](https://link.zhihu.com/?target=https%3A//www.kaggle.com/code)

<img src="https://pic3.zhimg.com/80/v2-7581b1e245d5a7c350d87f1feb626c5a_720w.webp"  style="zoom: 80%;" />

<img src="https://pic1.zhimg.com/80/v2-f0789502fa060cda00d464b2e8e736d0_720w.webp"  style="zoom: 80%;" />

<img src="https://pic2.zhimg.com/80/v2-30ffa07f4c0fad9ea59a118bac6bc079_720w.webp"  style="zoom: 80%;" />

### 四、百度的AI Studio V100 32G显卡

+ 百度 AI studio 提供的 GPU 有点豪，显存和磁盘存储都很大，有详细的文档和视频，但只能使用 Paddle 框架。
+ 显卡：V100、P100、T4 等训练主流显卡，显存 32 G。
+ 磁盘存储：100 G。
+ 时间限制：每次 10 个小时。

（限制只能跑paddlepaddle框架 无法使用pytorch tensorflow等）

推荐指数 ⭐️⭐️⭐️⭐️

直达链接 [开源项目 - Baidu AI Studio - 人工智能学习与实训社区](https://link.zhihu.com/?target=https%3A//aistudio.baidu.com/aistudio/projectoverview/public)

<img src="https://pic1.zhimg.com/80/v2-12c00bf11a64fe6e5c42b78d11530510_720w.webp"  style="zoom: 67%;" />

<img src="https://pic3.zhimg.com/80/v2-6a74ab79e24d442751cd227cb963501a_720w.webp"  style="zoom:67%;" />



----------------------------------------分割线--------------------------------------------

如果以上都不好用，你想找一款性价比最高的GPU云服务器，那么推荐矿机给你

收费平台-锯齿云 （矿机所以便宜，同时性能也可能打折）

推荐指数 ⭐️⭐️⭐️

直达链接：[矩池云(matpool.com) - 国内领先的GPU云共享平台](https://link.zhihu.com/?target=https%3A//www.matpool.com/host-market)

优势就是真的便宜，与以上免费平台不同的是，它就是卖服务，所以不管你是直接ssh还是pycharm远程链接都可，没有免费平台的限制。但是最好不要在上面做商业项目，就玩玩就好了，正式项目还是选阿里云腾讯云服务器吧，像rtx桌面卡是不允许做云服务器的，可能随时有风险。

<img src="https://pic4.zhimg.com/80/v2-df4fc9860da8b053b3389c3edabab6bf_720w.webp" style="zoom: 80%;" />



## 总结

从我个人的使用体验来看：

首先我个人偏向于使用docker做模型训练等耗时操作，即便是在学校服务器也轻松运行不与其他同学的环境冲突影响，docker其实已经是媲美git的常用工具了。所以也建议你尝试下天池计算平台TCC。

其次呢百度的框架限制我会排除掉

然后colab确实好用但是网络局限 有时会打不开

剩下的kaggle传数据太麻烦了 

总结：所以我还是喜欢docker 直接把需要用的数据等打包进镜像提交。