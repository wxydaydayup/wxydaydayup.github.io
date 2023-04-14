---
tags:
  - Netty
  - Java
author: WangXinYi
img: /images/homePage/Netty和RPC框架.webp
summary: Netty底层与RPC框架
categories:
  - Netty
  - Java
typora-root-url: ..
date: 2023-3-30 12:06:57
---

## Netty

### 一、Socket实现网络通信

在Java中我们会采用Socket套接字来实现网络通信，下面这段代码演示了Socket通信的案例。

```java
public class ServerSocketExample {

    public static void main(String[] args) throws IOException {
        final int DEFAULT_PORT = 8080;
        ServerSocket serverSocket = null;
        serverSocket = new ServerSocket(DEFAULT_PORT);
        System.out.println("启动服务，监听端口：" + DEFAULT_PORT);
        while (true) {
            Socket socket = serverSocket.accept();
            System.out.println("客户端：" + socket.getPort() + "已连接");
            new Thread(new Runnable() {
                Socket socket;
                public Runnable setSocket(Socket s){
                    this.socket=s;
                    return this;
                }
                @Override
                public void run() {
                    try {
                        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                        String clientStr = null; //读取一行信息
                        clientStr = bufferedReader.readLine();
                        System.out.println("客户端发了一段消息：" + clientStr);
                        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
                        bufferedWriter.write("我已经收到你的消息了");
                        bufferedWriter.flush(); //清空缓冲区触发消息发送
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }.setSocket(socket)).start();

        }
    }
}
```

+ accept，阻塞等待客户端连接
+ io阻塞，阻塞等待客户端的数据传输。

### 二、Netty的核心组件

Netty的I/O模型是基于非阻塞IO实现的，底层依赖的是JDK NIO框架的多路复用器Selector来实现

> 一个多路复用器Selector可以同时轮询多个Channel，采用epoll模式后，只需要一个线程负责Selector的轮询，就可以接入成千上万个客户端连接。

启动器Bootstrap和ServerBootstrap作为Netty构建客户端和服务端的路口，是编写Netty网络程序的第一步。它可以让我们把Netty的核心组件像搭积木一样组装在一起。在Netty Server端构建的过程中，我们需要关注三个重要的步骤

+ 配置线程池
+ Channel初始化
+ Handler处理器构建

### 三、自定义协议

自定义协议，那这个协议必须要有组成的元素，

+ 魔数：用来判断数据包的有效性
+ 版本号：可以支持协议升级
+ 序列化算法：消息正文采用什么样的序列化和反序列化方式，比如json、protobuf、hessian等
+ 指令类型：也就是当前发送的是一个什么类型的消息，像zookeeper中，它传递了一个Type
+ 请求序号：基于双工协议，提供异步能力，也就是收到的异步消息需要找到前面的通信请求进行响应处理
+ 消息长度
+ 消息正文



## RPC

