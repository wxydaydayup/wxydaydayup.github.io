---
date: 2021-12-08 15:54:44
author: WangXinYi
img: /images/homePage/java进阶.webp
top: false
summary: Java进阶
categories:
  - Java
tags:
  - Java
typora-root-url: ..
---

# Java进阶

## 黑马 JVM 课程

### 一、JVM的内存结构

程序计数器、虚拟机栈、本地方法栈、堆和方法区

### 二、程序计数器

#### 1、作用

用于保存JVM中下一条所要执行的指令的地址

#### 2、特点

+ 线程私有
  + CPU会为每个线程分配时间片，当当前线程的时间片使用完以后，CPU就会去执行另一个线程中的代码
  + 程序计数器是**每个线程**所**私有**的，当另一个线程的时间片用完，又返回来执行当前线程的代码时，通过程序计数器可以知道应该执行哪一句指令
+ 不会存在内存溢出（唯一一个）

### 三、虚拟机栈

#### 1、定义

+ 每个**线程**运行需要的内存空间，称为**虚拟机栈**
+ 每个栈由多个**栈帧**组成，对应着每次调用方法时所占用的内存
+ 每个线程只能有**一个活动栈帧**，对应着**当前正在执行的方法**

#### 2、常见的问题

1. 垃圾回收是否涉及栈内存？

   **不需要**。因为虚拟机栈中是由一个个**栈帧**组成的，在方法执行完毕后，对应的栈帧就会被**弹出栈**。所以无需通过垃圾回收机制去回收内存。

2. 栈内存的分配越大越好吗？

   不是。因为**物理内存是一定的**，栈内存越大，可以支持更多的递归调用，但是**可执行的线程数就会越少**。

3. 方法内的局部变量是否是线程安全的？

+ 如果方法内**局部变量没有逃离方法的作用范围**，则是**线程安全**的
+ 如果**局部变量引用了对象，并逃离了方法的作用范围**，则需要考虑线程安全问题

#### 3、内存溢出

**1. 发生原因**

+ 虚拟机栈中，**栈帧过多**（无限递归）
+ 每个栈帧**所占用过大**

**2. 线程运行诊断**

+ Linux环境下运行某些程序的时候，可能导致CPU的占用过高，这时需要定位占用CPU过高的线程
  + `top`命令，查看是哪个进程占用CPU过高
  + `ps H -eo pid, tid（线程id）, %cpu | grep` 刚才通过top查到的进程号 通过ps命令进一步查看是哪个线程占用CPU过高
  + `jstack 进程id`  通过查看进程中的线程的nid，刚才通过ps命令看到的tid来**对比定位**，注意jstack查找出的线程id是**16进制的**，**需要转换**

### 四、本地方法栈

一些带有**native关键字**的方法就是需要JAVA去调用本地的C或者C++方法，因为JAVA有时候没法直接和操作系统底层交互，所以需要用到本地方法

### 五、堆

#### 1、定义

通过new关键字**创建的对象**都会被放在堆内存

#### 2、内存诊断

**jps** 查看当前系统中有哪些Java进程

**jmap** 查看堆内存占用情况

**jconsole** 图形界面，多功能的监测工具，可以连续监测

**jvisualvm** 图形界面，虚拟机监视和故障处理平台

### 六、方法区

<img src="https://nyimapicture.oss-cn-beijing.aliyuncs.com/img/20200608150547.png"  style="zoom: 80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

#### 1、内存溢出

+ 1.8以前会导致**永久代**内存溢出
+ 1.8以后会导致**元空间**内存溢出

#### 2、常量池

二进制字节码的组成：类的基本信息、常量池、类的方法定义（包含了虚拟机指令）

**通过反编译来查看类的信息**

+ 获得对应类的.class文件

  + 在JDK对应的bin目录下运行cmd，**也可以在IDEA控制台输入**

    <img src="https://nyimapicture.oss-cn-beijing.aliyuncs.com/img/20200608150602.png"  style="zoom:80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

  + 输入 **javac 对应类的绝对路径**

    ```
    F:\JAVA\JDK8.0\bin>javac F:\Thread_study\src\com\nyima\JVM\day01\Main.javaCopy
    ```

    输入完成后，对应的目录下就会出现类的.class文件

+ 在控制台输入 javap -v 类的绝对路径

  ```
  javap -v F:\Thread_study\src\com\nyima\JVM\day01\Main.classCopy
  ```

+ 然后能在控制台看到反编译以后类的信息了

  + 类的基本信息

    <img src="https://nyimapicture.oss-cn-beijing.aliyuncs.com/img/20200608150618.png"  style="zoom: 67%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

  + 常量池

    <img src="https://nyimapicture.oss-cn-beijing.aliyuncs.com/img/20200608150630.png" style="zoom:80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

    <img src="https://nyimapicture.oss-cn-beijing.aliyuncs.com/img/20200608150641.png"  style="zoom:80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

  + 虚拟机中执行编译的方法（框内的是真正编译执行的内容，**#号的内容需要在常量池中查找**）

    <img src="https://nyimapicture.oss-cn-beijing.aliyuncs.com/img/20200608150653.png"  style="zoom:80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

#### 运行时常量池

+ 常量池
  + 就是一张表（如上图中的constant pool），虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量信息
+ 运行时常量池
  + 常量池是*.class文件中的，当该**类被加载以后**，它的常量池信息就会**放入运行时常量池**，并把里面的**符号地址变为真实地址**

#### 常量池与串池的关系



## 黑马 Netty课程

### 一、NIO基础

non-blocking IO 非阻塞IO 也可以理解为new IO

Java NIO系统的**核心**在于：**通道(Channel)和缓冲区(Buffer)**。通道表示打开到 IO 设备(例如：文件、套接字)的连接。若需要使用 NIO 系统，需要获取用于**连接 IO 设备的通道**以及用于**容纳数据的缓冲区**。然后操作缓冲区，对数据进行处理

简而言之，**通道负责传输，缓冲区负责存储**

**常见的Channel有以下四种**，其中FileChannel主要用于文件传输，其余三种用于网络通信

+ FileChannel **文件传输**
+ DatagramChannel **UDP传输**
+ SocketChannel **TCP传输**
+ ServerSocketChannel **TCP传输**

**Buffer有以下几种**，其中使用较多的是ByteBuffer

+ ByteBuffer
  + MappedByteBuffer
  + DirectByteBuffer
  + HeapByteBuffer
+ ShortBuffer
+ IntBuffer
+ LongBuffer
+ FloatBuffer
+ DoubleBuffer
+ CharBuffer

#### 1、Selector

在使用Selector之前，处理socket连接还有以下两种方法

**使用多线程技术** 

为每个连接分别开辟一个线程，分别去处理对应的socket连接

+ 内存占用高
+ 线程上下文切换成本高
+ 只适合连接数少的场景

**使用线程池技术**

使用线程池，让线程池中的线程去处理连接

## 牛客论坛

### 一、搭建开发环境

1、maven**改镜像仓库为阿里云**

conf-->settings.xml 修改为

```txt
<mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

2、maven相关

User settings file: 使用自己改的阿里云镜像仓库的setting.xml

Local repository: 本地仓库，把jar放在本地什么位置

<img src="/images/Java%E8%BF%9B%E9%98%B6/image-20230116162753130.png"  style="zoom: 50%;" />



可以点击右侧 Maven 重新编译

<img src="/images/Java%E8%BF%9B%E9%98%B6/image-20230116163217587.png"  style="zoom: 50%;" />

也可以上方点击上方Build -》Build Project 重新编译，也可以快捷键 Ctrl + F9



<img src="/images/Java%E8%BF%9B%E9%98%B6/image-20230116163335617.png"  style="zoom:67%;" />



可以在 [Maven Repository](https://mvnrepository.com/) 寻找需要的包

非常多的包可以使用 [Spring Initializr](https://start.spring.io/) 引导工具创建Spring Boot项目，会内嵌Tomcat

使用 2.1.5 正式的版本，常用的有 aop(Aspects), web, thymeleaf(模板引擎), DevTools

如果出现了端口冲突，可以改Tomcat的端口，在resource下的application.properties添加

```
server.port=8080 
server.servlet.context-path=/community
```

访问端口就改成了8080，访问路径就改为了 /community

点右键-》Maven-》ReLoad Project 重新加载Maven

<img src="/images/Java%E8%BF%9B%E9%98%B6/image-20230224184840817.png" alt="image-20230224184840817" style="zoom:67%;" />

### 二、Spring

1、@SpringBootApplication 在 CommunityApplication 中，来实现IOC

其他地方需要注解才能被@SpringBootApplication 扫描

@Controller，@Service，@Repository， @Component， 这四个都可以，都是用Component 实现的

2、在测试类中使用CommunityApplication ，需要加一行注解

```java
@ContextConfiguration(classes = CommunityApplication.class)
```

实现一个接口 `implement ApplicationContextAware`，这个接口有个方法需要实现`SetApplicationContext`

```java
private ApplicationContext applicationContext

@override //方法重写的注解
public void SetApplicationContext(ApplicationContext applicationContext) throws BeanException {
	this.applicationContext = applicationContext;
}

@Test
public void testApplicationContext() {
	System.out.println(applicationContext); // 获取applicationContext，拿到了Bean
    A a = applicationContext.getBean(A.class);
    System.out.println(a.select());
}
```

用Spring去管理Bean有什么好处呢？

（1）@Primary注解 有多个相同的Bean时，那个写@Primary注解会优先装配

（2）在注解里，例如@Repository，@Repository(“aaa”),aaa就会成为这个类的名字，可以通过aaa去获取Bean

```
A a = applicationContext.getBean(name:"aaa", A.class);
```

（3）使用注解就能实现Bean的初始化和销毁

```java
public Service(){
	System.out.println("实例化Service");
}

@PostConstruct//构造器以后才会调用这个方法
public void init(){
	System.out.println("初始化Service");
}

@PreDestory//在销毁之前调用这个方法
public void destory(){
	System.out.println("销毁Service");
}
```

运行结果：

```
实例化Service
初始化Bean
销毁Bean
```

3、Spring创建Bean默认是单例的，只会实例化一次，要想每次调用类都实例化一次，需要在要掉用类上加`@Scpoe("prototype")`注解

4、使用直接使用`@Autowired`将Bean注入

多个相同的Bean可以使用`@Qualifier("a")`，指定要注入的Bean

```java
@Autowired
@Qualifier("aaa")
private AlphaDao AlphaDao
```

### 三、SpringMVC

<img src="/images/Java%E8%BF%9B%E9%98%B6/image-20230118204418755.png"  style="zoom: 80%;" />

MVC 中的 Model， View，Controller 都是用来解决表现层问题

> 开发前先对thymeleaf的缓存进行配置，开发的时候关闭thymeleaf缓存，等到项目上线，再开启缓存，降低服务器的压力在resource下的application.properties添加 `spring.thymeleaf.cache=false`

1、SpringMVC的请求对象和响应对象（最底层的方法）

请求对象：HttpServlectRequest 

响应对象：HttpServlectResponse

```java
@RequestMapping
public void http(HttpServlectRequest request, HttpServlectResponse response) {
	//获取请求数据
	...
	//对浏览器返回响应数据
	...
}
```

2、Get 请求 获取请求对象

```java
//请求的参数是这个情况 /students?current=1&limit=20
@RequestMapping(path = "/students", method = RequestMethod.GET)
@ResponseBody //不加这个注解，默认返回html
public String getStudents(int current, int limit){
    //@RequestParam(name = "current", required = false, defaultValue = "1")  更详细的说明
    //比如第一次访问页面时，没有current参数，可以不传这个参数，默认是1
    
    System.out.println(current);
    System.out.println(limit);
	return "I am a Student";
}

//请求的参数是这个情况，直接拼接到路径中了 /students/123
@RequestMapping(path = "/student/{id}", method = RequestMethod.GEt)
@ResponseBody 
public String getStudents(@PathVarible("id") int id){
    System.out.println(id);
	return "I am a Student";
}
```

3、Post 请求 获取请求对象

```java
@RequestMapping(path = "/students", method = RequestMethod.POST)
@ResponseBody 
public String getStudents(string name, int age){//参数名称一致，就会自动传过来
    System.out.println(name);
    System.out.println(age);
	return "I am a Student";
}
```

### 四、Mybatis

1、在resource下的application.properties添加数据库连接池和Mybatis的配置

```properties
# DataSourceProperties
#数据库驱动
spring.datasource.driver-class-name = com.mysql.jdbc.Driver 
# mysql的路径
spring.datasource.url = jdbc:mysql://localhost:3306/community?characterEncoding=utf-8&useSSL=false&serverTimezone=shanghai
# mysql的账号
spring.datasource.username=root
# mysql的密码
spring.datasource.password=123456
# 数据库连接池
spring.datasource.type=com.zaxxer.hikar.HikariDataSource
# 数据库连接池最大连接数
spring.datasource.hikari.maximum-pool-size=15
# 数据库连接池回收个数
spring.datasource.hikari.minimum-idle=5
# 数据库连接池回收时间
spring.datasource.hikari.idle-timeout=30000

#MybatisProperties
mybatis.mapper-location=classpath:mapper/*.xml # 映射文件的存放位置
mybatis.type-aliases-package=com.nowcoder.community.entity #实体类的包名
mybatis.configuration.useGeneratedKeys=true #insert的id自增长
mybatis.configuration.mapUnderscoreToCamelCase=true # 驼峰命名和下划线命名自动转换
```

@Mapper和@Repository同理

2、mapper的写法

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.cms.dao.LdComNewDao">
	# resultType写实体类的全路径，如果配置了那个实体类的包名，可以不写那个com.cms.pojo.Com4Pojo中的com.cms.pojo
    <select id="getCom4" parameterType="com.cms.pojo.Com4Pojo" resultType="com.cms.pojo.Com4Pojo">
        select com_code as code, yl_name as name from ld_com_new
        where ld_com_new.com_code regexp '[0-9]{8}';
    </select>
    # 这个是别的包名里的，看看格式
    <select id="getList" parameterType="com.cms.pojo.TestPojo" resultType="com.cms.pojo.TestPojo">
        select user_name from yl_user_info ${ew.customSqlSegment}
	</select>
    # sql里的代码可以复用
    <sql id="selectFields">id,username...</sql>
    <insert id="insertUser" parameterType="User" keyProperty="id">
    	insert into user(<include refid "insertFields"></include>)
        values(#(username),#...)
    </insert>
</mapper>
```

3、可以更改dao的日志权限，能在控制层看到dao

mybatis.xml 配置，可以看mybatis的日志

```xml
<settings>
	<settings name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```

### 五、SpringBoot核心作用

SpringBoot核心作用	

​	起步依赖、自动配置、端点监控

## 东软课程

### 一、Mybatis 

由于JDBC的缺点：大量的重复的样板式代码，出现了Mybatis、hibernate等框架

Mybatis 比 hibernate开发效率要低，但是性能要好，国内大部分都是用Mybatis

#### 1、Mybatis 结果映射

在阿里巴巴规范里面强制规定

> 【强制】 不要用resultClass 当返回参数，即使所有类属性名与数据库字段一一对应，也需要定义；反过来，每一个表也必然有一个与之对于。 说明：配置映射关系，使字段与DO类解耦，方便维护
>
> 即不要使用resultType，要使用 resultMap

将名字不一样的数据库列名和类的属性名对应起来，因为Java规范是驼峰命名，数据库小写加下划线

column 是数据库的列，property 是类的属性名

```xml
<resultMap id="Base" type="com.neutech.entity.Student">
    <id column="id" property="id"/>
    <result column="my_name" property="myName"/>
    <collection property="productList" ofType="com.neutech.entity.Product">
        <id column="id" property="id"/>
        <result column="product_id" property="productId"/>
        <result column="product_name" property="productName"/>
    </collection>
</resultMap>
<select id="listAll" resultMap="Base">
    select * from student
</select>
```

#### 2、MyBatis的开发方式

1. 编写xml，使用SqlSession执行对应的操作

2. 接口映射模式（常用）

   a. 创建接口

   b. xml文件的namespace 是接口的全名

   c. 每一个标签的id要对应接口里面的方法名

#### 3、MyBatis的传参

在阿里巴巴规范里面强制规定

> 【强制】sql.xml配置参数使用: #{},#param# 不要使用${} 此种方式容易出现SQL注入
>
> 即使用#{} 不要使用${}

传参的方法：

1. 传单个或者简单（数字和字符串）类型参数，直接传，直接取，#{ } 里面随便写

2. 直接传多个参数，`arg0-argn` 或者 `param1-paramn`，**这种方式可读性太差，不建议使用**

3. 使用注解标注名字

   ```java
   void save(@Param("name") String name,@Param("age") Integer age);
   ```

   在xml里面

   ```xml
   <insert id="save">
   	insert into student (name,age) values(#{name},#{age})
   </insert>
   ```

4. 使用map集合，key作为名字，value存值，#{ }里写map的key

   ```java
   Map<String, Object> map = new HashMap<>();
   map.put("name", "王五");
   map.put("age", 12);
   ```

5. **常用**，使用对象，#{ }里面写对象的属性名

   ```java
   Student student = new Student();
   student.setName("王五");
   student.setAge(12);
   studentMapper.save(student);
   ```

6. 使用注解标识名字能实现面向对象的效果

   ```
   void save(@Param("student") Student student);
   ```

   在xml里面

   ```xml
   <insert id="save">
   	insert into student (name,age) values(#{student.name},#{student.age})
   </insert>
   ```

总结：

1. 三个以下的可以使用`arg0 - argn` 或者 `param1 - paramn`
2. 三个以上的使用对象

#### 4、Mybatis执行的流程

1. 参数配置 
2. SQL解析 
3. SQL执行 
4. 结果映射

#### 5、动态SQL

**where** 的功能 合理的出现where，处理前面多余的and或者or

```xml
<select id="getByDynamic">
	select * from s_product
    <where>
        <if test="price != null">
        	and price = #{price}
    	</if>
    </where>
</select>
```

**foreach** 动态 SQL 的另一个常见使用场景是对集合进行遍历（尤其是在构建 IN 条件语句的时候）。比如：

```xml
<select id="selectPostIn" resultType="domain.blog.Post">
  SELECT *
  FROM POST P
  WHERE ID in
  <foreach item="item" index="index" collection="list"
      open="(" separator="," close=")">
        #{item}
  </foreach>
</select>
```

*foreach* 元素的功能非常强大，它允许你指定一个集合，声明可以在元素体内使用的集合项（item）和索引（index）变量。它也允许你指定开头与结尾的字符串以及集合项迭代之间的分隔符。

**提示** 你可以将任何可迭代对象（如 List、Set 等）、Map 对象或者数组对象作为集合参数传递给 *foreach*。当使用可迭代对象或者数组时，index 是当前迭代的序号，item 的值是本次迭代获取到的元素。当使用 Map 对象（或者 Map.Entry 对象的集合）时，index 是键，item 是值。

## Java易犯错误

### 一、六类典型空指针问题





### 二、日期YYYY格式的问题

<img src="/images/Java%E8%BF%9B%E9%98%B6/image-20230107171414575.png" alt="日期YYYY格式的问题" style="zoom:80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

<img src="/images/Java%E8%BF%9B%E9%98%B6/image-20230107171529382.png"  style="zoom:80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

大写的YYYY是通过当天所在周属于的年份，跨年会出现问题，正确的做法是使用小写的yyyy

### 三、金额数值计算精度的问题

```java
public class DoubleTest{
	public static void main(String[] args){
		System.out.println(0.1 + 0.3);
		System.out.println(1.0 - 0.8); 
		System.out.println(4.015 * 100);
		System.out.println(123.3 / 100);
	}
}
```

运行结果

```
0.300000000000000004
0.199999999999999996
401.4999999999999994
1.23299999999999999
```

由于计算机都是用二进制存储数值的，对于计算机来说0.1 无法精确表达，所以浮点数会有精度缺失，金额计算一般都是用Bidecimal类，主要注意的是必须使用字符串的构造方法来初始化Bidecimal

```java
public class DoubleTest{
	public static void main(String[] args){
		System.out.println(new BigDecimal("0.1").add(new BigDecimal("0.2")));
		System.out.println(new BigDecimal("1.0").subtract(new BigDecimal("0.8")));
		System.out.println(new BigDecimal("4.015").multiply(new BigDecimal("100")));
		System.out.println(new BigDecimal("1.3").divide(new BigDecimal("10")));
	}
}
```

### 四、FileReader默认编码导致的乱码问题



### 五、Interger缓存的问题



### 六、Static静态变量依赖Spring实例化变量的问题



### 七、使用ThreadLocal,线程重用导致信息错乱的问题



### 八、疏忽switch的return和break

+ switch的参数里：能自动转int的都可以，jdk5枚举可以，jdk7以后string也可以

+ break是直接退出switch语句, break用于结束一个循环，即跳出循环体，执行循环体之后的代码。不写break会向下泄露，直到遇到break为止

+ return是退出该函数，也就是switch语句块后面的语句也不执行了。


### 九、Aarrys.asList的问题

1、基本类型不能作为Arrays.asList
方法的参数，否则会被当成一个参数

```java
public class ArrayAsListTest{
	public static void main(String[] args){
		int[] array = {1, 2, 3};
		List list = Arrays.asList(array);
		System.out.println(list.size());
	}
}
```

运行结果：

```
1
```

2、Aarrys.asList返回的List不支持增删操作

```
public class ArrayAsListTest{
	public static void main(String[] args){
		String[] array = {"1", "2", "3"};
		List list = Arrays.asList(array);
		list.add("5");
		System.out.println(list.size());
	}
}
```

会报异常

```

```

3、

### 十、Aarry.toArray()强转的问题



### 十一、异常使用的问题



### 十二、Json序列化Long类型被转为Integer类型



### 十三、newFixedThreadPool的OOM的问题



### 十四、直接读大文件到内存的坑

如果一次性把大文件或者数据库太多数据到达内存，是会导致OOM

所以，为什么查询DB数据库，一般都建议分批

只有文件不大时，才会使用Files.readAllLines()，因为它是直接把文件读到内存中

如果文件打，可以使用Files.line(), 按需读取，使用后需及时关闭**资源流**

### 十五、并发一致性的问题



### 十六、数据库使用UTF-8存储，插入表情的问题

低版本的Mysql 支持 UTF-8 编码，最大字符长度为 3 字节， 但是存储标签需要 4 个字节，如果使用UTF-8 编码存储表情，会报

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX错误，所以一般使用utf8mb4编码存储表情

### 十七、事务未生效的问题



### 十八、反射遇到方法重载的问题



### 十九、Mysql时间 Timestamp 的问题



### 二十、Mysql8数据库的时区问题

mysql8默认为美国那边的时间，会把北京时间晚 8 小数 ，需要指定时区

```java
jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
```

## 小技巧

1、IDEA使用ctrl+alt+v自动生成返回类型和对象。但是当你发现该快捷键时，原因就是我们启动的其他应用占用了该快捷键。其中最有代表的就是**有道词典和qq音乐**。此时我们关闭有道词典或者qq音乐就可以在IDEA上使用，要么就是修改**有道词典和qq音乐**的热键。

2、Settings 里面搜Plugins里的MybatisX，可以在xml里面提示

3、JDK7之后可以在数字之间加_ 例如123_456_789

4、boolean不可以和其他类型进行转换，char类型能和int类型进行转换

5、`10.fori` IDEA快速的生成for 循环命令 `for(int i = 0; i < 10; i++)`

6、鼠标右键（Alt+Insert）-》generate生成get，set方法，shift+上下键可以上下全选择

7、lombok注解 @Data 可以自动生成get，set方法

8、导入jar包， idea右键-》Add as Libraris

9、maven项目源文件java用包名.包名.包名的方式，resource用包名/包名/包名