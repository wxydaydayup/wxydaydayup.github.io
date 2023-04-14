---
date: 2021-12-08 14:54:44
author: WangXinYi
img: /images/homePage/java.webp
top: false
summary: Java基础
categories:
  - Java
tags:
  - Java
typora-root-url: ..
---

# Java基础

## 语言基础

### 一、跨平台原理

Java要在不同的操作系统上运行，需要在操作系统上安装对应的Java虚拟机。

#### 1、JRE（Java Runtime Environment）:

Java**程序运行时的环境**，包含jvm和需要的核心类库，要运行一个**已有**的java程序，只需安装JRE即可。

#### 2、JDK（Java Development Kit)

Java程序开发工具包，**包含JRE和开发人员使用的工具**。

开发工具：编译工具javac.exe和运行工具java.exe。

想要开发一个java程序，必须安装jdk。

#### 3、包含关系

<img src="/images/Java%E5%9F%BA%E7%A1%80/image-20221117193413007.png" alt="包含关系" style="zoom:20%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

### 二、基础语法

#### 1、标识符
Java中 的标识符由字母（包括汉字在内的各个国家的文字），下划线，数字，美元符号（$）组成
规则：

（1）标识符首字母不能是数字。

（2）关键字不能作为标识符。

**规范：**

+ 类名和接口名：大驼峰、首字母大写，后面每个单词的首字母大写。
+ 变量名和方法名：小驼峰、首字母小写，后面每个单词的首字母大写。
+ 常量名：全部大写，并且单词和单词之间用下划线衔接。
+ 包名：全部小写，是域名的反拼。

#### 2、关键字
在Java中被赋予特殊含义的单词符号！
如new，abstract，switch，if，do 。

#### 3、注释

（1）单行注释：写在一行的开始    格式：//

（2）多行注释：多行注释可以写多行也能写一行     格式：  /*   ...* /

（3）文档注释：Java的文档生成器可以扫描Java的语言程序，提取文档注释，生成Java的帮助文档。     格式： /**......*/

#### 4、常量与变量
Java语言的变量在编译时确定其类型，变量分为两种：

+ 常用数据类型变量

+ 引用类型变量，引用类型变量实质上是一个对象，有其属性和方法！


根据声明变量的位置不同,又可以将变量分为**类属性变量**和**局部变量**，

**类属性变量在类中申明，而局部变量在程序块中声明！**
**各个易混变量的区分：**

（1）区分全局变量和局部变量

+ 全局变量：描述对象有什么（在类中定义），类中所有方法都可以使用。

+ 局部变量：临时保存数据（在类的方法中定义），只能在当前方法中使用。


（2）区分成员变量和局部变量


**成员变量写在类里面方法外面，局部变量写在方法里面，成员变量比局部变量的范围大，简记为成（橙）大局（橘）小！**

**在方法中如果局部变量和成员变量名字相同，则成员变量在这个方法中暂时失效，如果需要引用成员变量，则需要引用this关键字 。**

（3）区分实例变量和类变量

+ 类变量：使用修饰词static。
+ 实例变量：不使用修饰词static。


```
     成员变量（全局变量）   局部变量 
             |
类变量（静态变量）  实例变量  
```

#### 2、成员变量和局部变量

成员变量是在类中方法外定义的变量，局部变量是在方法内定义的变量，区别：

<img src="/images/Java%E5%9F%BA%E7%A1%80/image-20221116193647396.png" alt="成员变量和成员方法" style="zoom: 33%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

#### 5、运算符

同一优先级的运算符，运算次序由结合方向所决定。
总的来说：！ > 算术运算符 > 关系运算符 > && > || > 赋值运算符

| 运算符                            | 结合性   |
| --------------------------------- | -------- |
| [ ] . ( ) (方法调用)              | 从左向右 |
| ! ~ ++ -- +(一元运算) -(一元运算) | 从右向左 |
| * / %                             | 从左向右 |
| + -                               | 从左向右 |
| << >> >>>                         | 从左向右 |
| < <= > >= instanceof              | 从左向右 |
| == !=                             | 从左向右 |
| &                                 | 从左向右 |
| ^                                 | 从左向右 |
| &&                                | 从左向右 |
| ?:                                | 从右向左 |
| =                                 | 从右向左 |


#### 6、基本的控制结构
**分支结构**

（1）if-else条件语句：

单分支


```bash
if(条件){    
	//条件成立要执行的代码
}
```

 双分支


```bash
if(条件){  
	//条件成立要执行的代码
} else {   
	//条件不成立要执行的代码
}
```

多重分支

```bash
if(条件){    
	//条件成立要执行的代码 
} else if(条件2) { 
} else if(条件3) { 
} else {    
	//条件不成立要执行的代码
}
```

（2）switch条件语句：

```java
switch(变量或表达式){   
    case 常量1:
        语句1;
        break;   
    case 常量2:
        语句2;
        break;    
    ....    
  	default:
        语句n;
        break;
}
```

**switch语句中的注意点**

+ ​	在switch语句中的每个case分支的动作都是以break语句作为结束的，这里的break语句用来终止switch语句。

+ ​	如果没有break语句，程序就会继续下一个case分支中的动作，直到碰break语句为止！否则一直执行到switch 语句的末尾为止!

+ ​	switch的参数里：能自动转int的都可以，jdk5枚举可以，jdk7以后string也可以


**循环结构**

（1）while循环语句

```bash
while(布尔表达式) {//如果判断为真，则重复执行循环体语句，否则退出循环
 循环体	　
}
```

（2）do-while循环语句

```bash
do {　　
　　循环体
} while(布尔表达式); //如果为判断为真，则重复执行循环体语句，否则退出循环
```

（3）for循环语句

```bash
for(1、循环变量初始化;2、循环条件;3、循环变量更新) {　　
	//4、循环操作
}
// 执行顺序 1243 243 243...
for (int i = 1; i < 10; i++){} //IDEA中可用10.fori快捷方式
```

**跳转语句**：**需要特别注意的是Java中不支持goto语句！**

（1）break：

+ 它可以和while循环和do-while循环或for循环一起使用，break语句可以强迫程序终止循环，当程序执行到break语句时，即终止循环，继续执行循环外的下一条语句.
+ 如果break语句出现在嵌套循环中的内层循环中，则break只会终止其所在当前层的循环。
+ 如果break语句位于一个循环内的switch语句中，那么break语句只会终止switch语句而不会终止循环。

（2）continue：

​	可以强迫程序跳到循环的起始处，当程序运行到continue语句时，即会停止运行剩下的循环主体，而是会回到循环的开始出继续运行。

**break和continue的区别在于，continue仅仅是结束本次循环，而break直接退出了这个循环体。**

#### 7、内存分配

栈内存：存局部变量，就是定义在main方法中的变量，如arr，用完立即消失

堆内存：存储new出来的内存（实体、对象），会有地址值，会把值给等号左边

数组初始化时：会对储存空间添加默认值

<img src="/images/Java%E5%9F%BA%E7%A1%80/image-20221117213722712.png" alt="image-20221117213722712" style="zoom: 50%;" />

### 三、异常

#### 1、异常的架构

```java
        Object  顶级父类
             |
       Throwable 异常父类
       |           |  
Exception 异常    Error错误
```

#### 2、try...catch方法

try代码块中出现异常时，会生成异常对象，该对象交给java运行时系统，系统收到异常时，会到catch中去找匹配的异常，找到后进行处理

```java
try {
	System.out.println(arr[3]);
}catch (ArrayIndexOutOfBoundsException e){ //必须加上异常类型
	e.printStackTrace();	//printStackTrace()方法继承自Throwable类
}
```

#### 3、throw和throws方法

`throw` 是用在某个方法的方法体内的，当我们认定某种情况不合理时，就可以创建异常对象，封装好异常信息，然后通过 `throw` 来抛出异常并终止该方法。

```java
public static void main(String[] args) { 
    String s = "abc"; 
    if(s.equals("abc")) { 
      throw new NumberFormatException(); 
    } else { 
      System.out.println(s); 
    } 
}
```

而 `throws` 是用在某个方法的方法声明上的，`throws`声明的异常不一定会出现，只是一种可能。当某个方法可能会抛出某种异常时用于声明可能抛出的异常，然后交给上层调用它的方法程序处理

```java
public class testThrows(){
    public static void function() throws NumberFormatException { 
        String s = "abc"; 
        System.out.println(Double.parseDouble(s)); 
    } 
    public static void main(String[] args) { 
        try { 
            testThrows.function(); 
        } catch (NumberFormatException e) { 
            System.err.println("非数据类型不能强制类型转换。"); 
        } 
	}
}
```

## 面向对象

### 一、方法

#### 1、参数的注意事项：

+ 定义形参时，必须带上类型

+ 调用时，实参的类型，数量必须与形参一致

```java
public static void getMax(int a, int b) {}
```

#### 2、带返回值的方式定义

public static 后面的类型要与返回值一致

```java
public static int getMax(int a, int b) {
	return a+b;
}
```

+ 方法不能嵌套

+ void表示无返回值，可省略return，但是写了return不能跟数据

#### 3、方法重载

同一个类中，具有以下特征

+ 相同的方法名；
+ 参数数量或类型不同；
+ 与返回值无关；

**方法参数类型问题**

（1）给方法传入基本类型，在方法中改变基本类型值，对原值无影响

（2）给方法传入引用类型，方法中修改引用类型值，原值受到影响，原因是引用类型实际上是一个地址

### 二、类

#### 1、类的概念

概念：类是对现实生活中一类具有共同属性和行为的抽象，用来确定对象将会有的属性和行为，类是对象的抽象，对象是类的实体

类的重要性：类是Java程序的基本组成单位

类的组成：类有属性和行为

+ 属性：在类中通过**成员变量**来体现（类中方法外的变量）

+ 行为：在类中通过成员方法来体现（去掉static的方法） 

下面是一个手机类

```java
public class Phone {    
    //成员变量    
    String Brand;    
    int price;    
    //成员方法    
    public void call(){        
        System.out.println("打电话");    
    }    
    public void sendMessage(){        
        System.out.println("发消息");    
    }
}
```

注意：一个java源文件中可以多个类，但只能有一个public修饰的类，不允许protected修饰类

### 三、封装

#### 1、private关键字

+ 是一个权限修饰符，修饰成员（成员变量和成员方法）

+ 作用是保护成员不被别的类直接使用，被private修饰的成员只能在本类中使用

```java
private String name;
```

+ 如果要在其他类中使用private修饰的变量，可提供set  get方法，这些方法不用static

```java
public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}
```

**其他权限修饰符**

<img src="/images/Java%E5%9F%BA%E7%A1%80/image-20221116195322184.png" alt="权限修饰符" style="zoom:33%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

注意：protected,只能是当前包外子类继承，直接访问继承来的protected属性，但是在包外直接new对象去访问proected属性，不管是不是子类都不行

#### 2、构造方法

概念：就是 类构造对象 时调用的方法，主要时完成对象数据的初始化

注意：

+ 构造方法的名字必须和类名相同
+ 构造方法不能写返回值

+ 如果没有定义构造方法，系统会定义一个默认的无参构造方法
+ 如果给出了构造方法（无论是有参还是无参），就没有默认的无参构造
+ 构造方法可重载，使用new调用

下列就是一个无参构造方法和有参构造

```java
public Student(){}
public Student(String name,int age){
    this.name=name;   //在此方法中对数据进行初始化
    this.age=age;
}
```

**this方法的两个作用**

+ 用来区分重名的成员变量和局部变量，加this表示调用成员变量
+ 构造方法的重用，代表调用本类中其他构造方法，本构造方法不能有其他任何逻辑

#### 4、状态修饰符

**（1）final**

可修饰**成员方法、成员变量、类、局部变量**

final修饰特点：

+ 修饰成员方法：表明该方法是最终方法，不能被子类重写**（不是重载）**
+ 修饰类：表明该类是最终类、不能被继承
+ 修饰成员变量：表明该变量是常量、不能被赋值
+ 修饰局部变量：
  + 变量是基本类型：基本类型的数据值不能发生改变
  + 变量是引用类型：引用地址不能改变，但内容可以发生改变

**（2）static**

可修饰**成员方法、成员变量**（正常类不可以，只有内部类可以修饰），**不能修饰局部变量**

**static修饰特点：**

+ 可以被类直接调用，被类的所有对象共享，修改变量所有的对象都受到影响
+ 访问权限：
  + 静态方法  只能访问静态方法、属性
  + 非静态方法  能访问静态和非静态方法、属性

**static的执行顺序（从左到右）：**

父类static代码块 --》子类static代码块 --》父类普通代码块 --》父类构造方法  --》子类普通代码块 --》子类构造方法

### 四、继承

#### 1、继承的概念

​	子类具有父类的属性和方法，使用extends关键词

#### 2、super

super，代表父类储存空间的标识,（父类对象的引用），可以通过super()调用父构造方法

<img src="/images/Java%E5%9F%BA%E7%A1%80/image-20221116194817195.png" alt="this 和 super方法比较" style="zoom:33%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />



#### 3、继承的特点

**构造方法的访问**

概述：因为子类会继承父类的数据，所以子类在初始化之前，一定要先完成父类的初始化。

+ 子类构造方法第一条默认语句都是 super()

**成员方法的访问**

+ 子类对象访问一个方法：先在子类成员中查找，再在父类成员中查找

+ 子类方法中也可调用super.父方法()

+ @Override：是一个注解，检查重写方法的正确性

**方法重写**

概念：**在继承关系当中，子类出现和父类相同“方法签名”的方法，方法签名指的是方法名相同，参数列表（类型 和 顺序）相同，返回值相同**，注意：

+ 私有方法不能被继承也不能重写
+ 不能重写finally修饰的方法
+ 子类方法访问权限不能更低 （public>默认>私有）

**继承注意事项**：不能同时继承多个类，但是能多层继承

### 五、多态

#### 1、多态的前提和体现

+ 有继承关系

+ 有重写方法

+ 有父引用指向子对象

#### 2、多态的特点

```java
Animal a = new Cat();
```

**二者不同是因为成员方法有方法重写，而成员变量没有**

+ 修饰成员变量：编译看左边、执行看左边（访问的是父类中的成员变量，子类没有则报错）

+ 修饰成员方法：编译看左边、执行看右边（访问的是父类中的成员方法，但是如果子类重写了方法，则访问子类的成员方法）

### 六、抽象类

+ 为什么要有抽象方法：在继承关系中，子类为了重写父类的方法实现多态，父类的方法有没有逻辑就不重要，为了不用写大括号，就出现了抽象方法。

+ 为什么要有抽象类：当一个类中有抽象方法时候，也要求类必须抽象。抽象类不能new对象，如果抽象方法不在抽象类中，那么这个抽象方法就可能会被子类调用，抽象方法又没有方法体没有意义
+ 为什么要求子类重写抽象类的方法：动物是一个抽象的概念，如果动物的子类-猫 直接多态使用父类 `Animal a = new Cat();` ，但是猫没有重写动物的方法，那将会直接使用动物的方法，动物的方法没有方法体也没有逻辑，没有意义，所以要求子类必须重写抽象类中的方法

#### 1、抽象类的概念

Java中没有方法体的方法就是抽象方法，有抽象方法的类就是抽象类

```java
public abstract class Animal{    
	public abstract void f(); //抽象方法
}
```

#### 2、注意点

+ 抽象类抽象方法必须使用abstract关键字修饰类和方法
+ 有抽象方法的类一定是抽象类；但抽象类里可以没有抽象方法
+ 抽象类不能实例化（不能用new创建对象），只能通过多态的方式使用
+ 抽象的子类，要么重写抽象方法，要么也是抽象类
+ 抽象类中成员：可以有成员变量、常量、构造方法、抽象方法、**非抽象方法**

### 七、接口

**接口的作用 ：可实现多继承，以及接口是对行为的抽象 ！！！**

#### 1、接口的语法

接口用关键字 interface修饰

```java
public interface Jump {...}
```

类实现接口用implements （类实现接口就像类继承类）

```java
public class cat implements Jump{...}  //JumpDemo 实现 cat
```

**接口不能直接实例化**，参照多态方式，接口实现类（相当于继承的子类），要么重写接口中所有方法，要么是抽象类

```java
 //Jump j = new Jump(); 错误！！！
Jump j = new cat();
j.jump() // 多态子类重写后的方法
```

#### 2、接口的特点

（1）在接口里面只能写

+ 成员变量：**只能是公共的静态常量**，默认修饰符 **public static final**（程序员可写可不写，即使不写，编译器也会在编译期加上）

+ 成员方法：**只能是公共的抽象方法**，默认修饰符 **public abstract**


（2）接口没有构造方法，因为接口主要对行为进行抽象，没有具体存在

（3）**JDK8之后可以写静态方法，以及default（必须写）修饰的方法**

#### 3、接口和类的关系

+ 接口和类：实现关系，类可以实现多个接口
+ 接口和接口：继承关系，可单继承也可多继承
+ 接口和抽象类的理念区别：
  + 抽象类对类抽象，包括属性、行为
  + 接口对行为抽象，主要是行为

### 八、内部类

内部类：就是在一个类中定义一个类

举例：CPU在笔记本内部，CPU类在笔记本的内部, 内部类就是模拟这层关系

#### 1、内部类的访问特点

+ 内部类可直接访问外部类的成员

+ 外部类访问内部类必须先创建对象

```java
Public class Demo {
	Public static void main(String[] args) {
		Outer outer = new Outer();
		Outer.Inner inner = outer.new Inner();
	}
}
```

#### 2、内部类分类

在类的成员位置：成员内部类

在类的局部位置：

+ 静态内部类

+ 局部内部类（方法内定义的类）
  + 匿名内部类(特殊的局部内部类)

#### 3、匿名内部类

匿名内部类本质是一个继承了该类或接口的匿名对象、格式：

```java
new Inter(){
    @Override
	public void show(){
        System.out.println("匿名内部类")
	}
}.show();//直接调用该方法


//多次调用
Inter i = new Inter(){
    @Override
	public void show(){
        System.out.println("匿名内部类")
	}
}
i.show();//直接调用该方法
```

匿名内部类的好处：每次多态都得新建一个类，在实例化一个对象，再传到要调用的该对象的方法中，匿名内部类可以代替新建一个类，直接传入一个对象。

### 九、包装类

#### 1、包装类的概念

包装类：将基本类型以及一些方法包装在一个类中

**装箱：自动基本类型转为包装类型**

**拆箱：自动将包装类型转基本类型**

```java
Integer i = 1;//自动装箱，本质就是Integer x = Integer.valueof(1);
Integer i = new Interger(1);
Integer x = Integer.valueof(1);
```

#### 2、包装类的好处

为什么使用包装类：使用包装类可以定义一些基本类型常用操作的方法，方便对进行其进行操作，包含基本类型的相关属性（包括最大值和最小值）以及相关的操作，比如toString等，以及泛型只能使用引用类型，需要对基础类型包装为引用类型。

#### 3、包装类和基本数据类型之间的区别

Integer和int的区别

+ Integer是int的包装类，int则是Java的一种基本数据类型
+ Integer变量必须实例化后才能使用，而int变量不需要
+ Integer实际是对象的引用，当new一个Integer时，实际上是生成一个指针指向此对象；而int则是直接存储数据值
+ Integer的默认值是null，int的默认值是0

#### 4、常用包装类

<img src="/images/Java%E5%9F%BA%E7%A1%80/image-20221117101937710.png" alt="常用包装类" style="zoom: 50%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />



### 十、枚举类

作用：表示有限集合，例如在游戏中的上下左右，前进后退的固定状态。

#### 1、JDK5之前的经典实现

（1）私有构造方法，不让其他地方乱new

（2）提高public static final 修饰的几个对象

（3）只提供属性的get

#### 2、JDK5之后出的枚举语法

​	enum关键字

（1）enum编译完就是一个类，也是静态final的常量

（2）enum编译完是个final修饰的类

（3）默认继承java.lang.Enum

（4）生成方法values()

### 十一、字符串

#### 1、String和StringBuilder

+ String概述：普通的String对象进行拼接，每次都会创建新的String对象，浪费内存空间；

+ StringBuilder概念：StringBuilder是一个可变的字符串类，内容是可变的

**Sting和StringBuilder相互转换**

+ String转StringBuilder：放入StringBuilder构造就行
+ StringBuilder转String：调用String的toString方法

#### 2、StringBuffer的使用

```java
StringBuffer sb=new StringBuffer("abcd");//用构造创建sb对象
StringBuffer sb2= sb.append("1243"); //append拼接数据，返回数据本身
System.out.println(sb2);//abcd1243
System.out.println(sb==sb2); //true
```

reverse方法

```java
sb2.reverse(); //反转
System.out.println(sb2);//3421dcba
```

#### 3、Sting、StringBuilder、StringBuffer的区别

（1）**String为固定长度的字符串，StringBuilder和StringBuffer为变长字符串；**

+ String类对象为不可变对象，一旦你修改了String对象的值，隐性重新创建了一个新的对象，释放原String对象
+ StringBuffer类对象为可修改对象，可以通过append()方法来修改值

（2）**StringBuffer是线程安全的，StringBuilder是非线程安全的，StringBuilder加了同步锁；**

（3）**StringBuffer和StringBuilder的默认初始容量是16**，可以提前预估好字符串的长度，进一步减少扩容带来的额外开销。

（4）String类对象的性能远不如StringBuffer类，StringBuffer类性能不能StringBuiler。

#### 4、String、StringBuffer、StringBuilder各自的使用场景

**（1）如果要操作少量的数据用 = String**

**（2）单线程操作字符串缓冲区 下操作大量数据 = StringBuilder**

**（3）多线程操作字符串缓冲区 下操作大量数据 = StringBuffer**

**执行效率：StringBuilder > StringBuffer > String**

## Java集合

### 一、集合概述



<img src="/images/Java%E5%9F%BA%E7%A1%80/%E5%9B%BE%E7%89%871.png" alt="Java集合" style="zoom: 40%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

### 二、Collection

概述：是单列集合的**顶层接口，**表示一组对象，这些对象是Collection集合的元素

Collection是一个接口，JDK不提供此接口的任何直接实现，它提供更具体的子类接口

**并发修改异常**：迭代器遍历过程中修改了集合的内容长度，会导致next()获取元素中预期值和实际值不一致，抛出异常

```java
Collection<Integer> c = new ArrayList<>();
c.add(123);
c.add(321);
c.add(333);
Iterator<Integer> i=c.iterator();//调用方法得到迭代器
while (i.hasNext()){    
    System.out.println(i.next());
}
```

### 三、List

概述：有序集合，用户可控制和集合中每个元素的插入位置，也可通过索引访问元素，可重复

List的Iterator，List集合特有迭代器，可以任意方向遍历集合，调用List的Iterator的add不会并发修改异常

### 四、ArrayList 

概述：普通数组长度固定，不能适应变化要求，所以出现了集合，ArrayList 底层结构是数组，查询快，支持随机访问

+ < E >是一种特殊的数据类型，泛型
+ < E >是集合中储存数据的数据类型
+ 在出现< E >地方用引用类型替换即可
+ ArrayList 是可调整数组大小的实现，底层还是数组

常用方法：

```java
ArrayList<String> arr=new ArrayList<>();
arr.add("a");
arr.add("b");
arr.add(0,"我是第一个");
System.out.println(arr);//[我是第一个, a, b]
```

<img src="/images/Java%E5%9F%BA%E7%A1%80/image-20221117153411035.png" alt="ArrayList 常用方法" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

**Vector：和 ArrayList 类似，但它是线程安全的。**

### 五、LinkedList

LinkedList：查询慢，增删快，基于双向链表实现，只能顺序访问，但是可以快速地在链表中间插⼊和删除元素。不仅如此， LinkedList 还可以⽤作栈、队列和双向队列。

### 六、HashSet

概述：HashSet是Set的实现类，基本方法与Set一致，底层结构是哈希表,不支持有序性操作，并且失去了元素的插⼊顺序信息，也就是 说使⽤ Iterator 遍历 HashSet 得到的结果是不确定的。

HashSet保证唯一原理：添加元素的时候底层先比较Hash值是否相同，如果相同再调用equals比较内容是否相同，都相同则不会添加相同元素，有一个不同会直接添加该元素

### 七、TreeSet

概述：TreeSet 是一个有序的集合，提供有序的Set集合

TreeSet中的元素支持两种排序方式

+ 无参构造创建TreeSet时会使用自然排序Comparable，该接口对实现它的每个类的对象添加一个整体排序，就是自然排序，类的compareTo是自然排序方法

+ 创建TreeSet 时提供的 Comparator(比较器排序接口) 进行排序

查找效率不如 HashSet，HashSet 查找的时间复杂度为 O(1)，TreeSet 则为 O(logN)。

### 八、LinkedHashSet

具有 HashSet 的查找效率，且内部使⽤双向链表维护元素的插⼊顺序。

### 九、HashMap

键映射到值的对象，不能有重复的键，一个键映射一个值

3 种 遍历方式

```java
HashMap<String,String> map = new HashMap<>();
map.put("1","一")
//第 1 种遍历方式
for(String key : map.keySet()){
	System.out.println(key);
    System.out.println(map.get(key));
}
//第 2 种遍历方式,只能拿到 value
for(String value : map.values()){
	System.out.println(value);
}
//第 3 种遍历方式
for(Map.Entry<String,String> entry: map.entryKey()){
	System.out.println(entry.getKey());
    System.out.println(entry.getValue());
}
```

### 十、TreeMap

基于红⿊树实现。

### 十一、HashTable

HashTable：和 HashMap 类似，但它是线程安全的

这意味着同⼀时刻多个线程可以同时写⼊ HashTable 并且不会导致数据不⼀致。它是遗留类，不应该去使⽤它。现在可以使⽤ ConcurrentHashMap 来⽀持线程 安全，并且 ConcurrentHashMap 的效率会更⾼，因为 ConcurrentHashMap 引⼊了分段锁。

### 十一、Queue 

1. LinkedList：可以⽤它来实现双向队列。 
2. PriorityQueue：基于堆结构实现，可以⽤它来实现优先队列。

### 十一、泛型

#### 1、泛型类

泛型：提供了编译时类型安全检测机制

本质是参数化类型，操作的数据类型被指定为一个参数

参数化理解：

+ 就是将原来具体的类型参数化，在调用用的时候传入具体类型

格式

+ <类型>：指定一种类型，这个类型可以看作形参

+ <类型，类型1..>也可以多个类型

+ 将来具体调用的时候给定的类型可以看作是实参

格式：修饰符 class 类名<类型>{...}

```
public class Generic<T> {}  //这里T就是形参可以随意写，调用时候传入类型
```

#### 2、泛型方法

格式：修饰符 <类型> 返回值 函数名(类型 形参){...}

```java
public < T > void show(T abc){...} //调用这个函数时，传什么类型，T就是对应类型
```

#### 3、泛型接口

接口：

```java
public interface Fx<T> {}
```

实现类：

```java
public class Generic<T> implements Fx<T>{}
```

#### 4、类型通配符

为了表示各种泛型List的父类，可用通配符

+ 类型通配符：<?>

+ List<?>:表示元素类型未知的List

+ 这种带通配符的List仅代表它是各种泛型List的父类

+ 类型通配符上限 <?extends 类型>    表示的类型是该类型及其子类

+ 类型通配符下限<?super 类型>  表示的类型是该类型及其父类

## Java IO流

#### 1、数据输入 Scanner类

Scanner类：获取用户的输入

```java
Scanner sc = new Scanner(System.in);
```

接收数据（这一步就会让用户进行输入，输入完成后才对x赋值）

```java
int x = sc.nextInt();
```

#### 2、file常用方法

```java
File file = new File("");//""放入文件地址
System.out.println(file.getNmae()); //文件名
System.out.println(file.length()); //文件大小
System.out.println(file.exists()); //文件是否存在
System.out.println(file.canWrite()); //查看文件权限，是否可写
file.createNewFile(); //创建文件
file.isDirectory();//判断是否为文件夹
file.mkdirs(); //创建文件夹，多级目录
file.mkdir(); //创建文件夹，单级目录
```

#### 3、文件写出

```java
File file = new File("");//""写出文件地址
OutputStream os = null;
try{
	os = new FileOutputStream(file);
	os.write("写出的内容".getBytes());
}catch(FileNotFoundException e){
    e.printStackTrace();
}catch(IOException e){
    e.printStackTrace();
}finally{
    os.close();
}
```

#### 4、IO流概述

**前提知识**

字节：计算机中一切皆字节（视频，图片和文本），本质就是二进制码。
字符：是指计算机中使用的文字和符号，比如1、2、A、B、~！*#￥%等等。

I 就是input的首字母：输入，把硬盘中的数据，读取到内存使用。

o就是output的首字母：输出，
把内存中的数据，写入到硬盘中保存。

内存的概念：临时储存数据
这里主要记住**内存是中心，进内存就是输入，出内存就是输出。**

**字节流与字符流**

| 字节流                  |        | 字符流            |
| ----------------------- | :----: | ----------------- |
| 字节输入流 InputStream  | 输入流 | 字符输入流 Reader |
| 字节输出流 OutputStream | 输出流 | 字符输出流 Writer |

**节点流与处理流**

| 节点流                       | 处理流                             |
| ---------------------------- | ---------------------------------- |
| 流的一端是程序，另一端是节点 | 以其他已经存在的流作为一个端点的流 |
| 构造方法的参数是节点         | 构造方法总有一个其他流对象作为参数 |

#### 5、字节流
 **(1) 字节输入流**
 先在D盘下创建一个hello.txt,里面内容写上hello baby

**步骤**

+ 定义一个文件流
+ 定义一个字节数组
+ 将输入流的数据读入到字节数组中
+ 通过UTF-8编码表将字节转换为字符

**代码实践：**

```java
public class InputStream  {	
	public static void main(String[] args) throws IOException{
		File file=new File("D://hello.txt");//显示具体路径
		FileInputStream fs =new FileInputStream(file);//定义一个文件流
		byte[] b=new byte[1024];//定义一个字节数组
	 	fs.read(b);//将输入流的数据读入到字节数组中
 		String str=new String(b,"UTF-8");//通过UTF-8编码表将字节转换为字符
 		System.out.println(str); //输出到控制台
   	}
 }

```

**注意：如果在那个txt文件里，输入的是中文：我好帅。控制台显示的是？？？
不是它质疑你的帅气，而是不支持中文，编码问题。**

 **(2) 字节输出流**

**步骤：**

+ 创建一个输出流
+ 将字符转换成字节
+ 字节写出文件
+ 保存文件

**代码实践：**

```java
public class OutputStream {
	public static void main(String[] args) throws IOException {
  		String file="D://test.txt";
  		FileOutputStream out=new FileOutputStream(file);//创建输出流
  		String str="hello baby";
  		byte[] b=str.getBytes();//字符转换为字节
  		out.write(b);//字节写出到文件
  		out.flush();//保存文件
```
这段代码执行后，你会发现D盘创建一个test.txt文件，里面写着hello baby

#### 6、字符流
字符流和字节流步骤相似，不再累述！

**(1) 字符输入流**
  先在D盘下创建一个hello.txt
 里面内容写上hello baby

 **代码实践：**

```java
public class Reader {	
	public static void main(String[] args)throws IOException	
		String file="D://hello.txt";//显示具体路径
	  	FileReader fr =new FileReader(file);//定义一个文件流
  	 	byte[] b=new byte[1024];//定义一个字节数组
  	 	fr.read(b);//将输入流中的数据读入到字节数组中
  	 	System.out.println("b")//输出到控制台
  	 	fr.close();//关闭输入流
```
当你执行完这段代码后发现，输出hello baby的同时，还有1014个空格

为了解决打印多余空格问题，查阅API帮助文档，reader方法是将字符流中的数据读入到字符数组中，如果读取到文件末尾则返回-1，否则返回读取到的长度，所以只要遇到-1就终止好了。

```java
	String file = "D://hello.txt";
	FileReader fr = new FileReader(file);//定义一个文件流
	char[] cbuf = new char[1024];//定义一个字节数组
	int len = 0; // 每次读取的长度
	StringBuilder builder = new StringBuilder();
 	while ((len = fr.read(cbuf)) != -1) { 
 	//将数据读入到cbuf中并返回读取到的数据长度，不等于-1就继续
 		builder.append(cbuf,0,len);}
 		//将cbuf 0 到len长度的数据添加到builder 
  	System.out.println(builder.toString());//输出到控制台
```

 **(2) 字符输出流**

**代码实践：**

```java
public class Writer {
	public static void main(String[] args)throws IOException
		File file=new File("D://hello.txt");
		FileWriter fw=new FileWriter(file);//定义一个文件流
		fw.write("hello baby");//写出到文件
		fw.close();//关闭流
```
这段代码执行后，你会发现D盘创建一个test.txt文件，里面写着hello baby

## Java 线程

### 线程

#### 1、进程和线程
**进程**：进程是程序的一次动态执行过程，它对应了从代码加载、执行到执行完毕的一个完整过程
**线程**：线程是比进程更小的执行单位
举列子：当你打开一个App可以看成一个实现进程，当打开一个App里的一个功能，比如播放音乐，病毒扫描就是实现一个线程。
**线程调度**：计算机操作系统为了提高程序的运行效率，当一个线程空闲时就会撤下这个线程，而会让其他线程执行！

#### 2、并行和并发
并行：针对进程的，同一个时刻发生多个事件，比如你用酷狗音乐播放音乐的同时，打开浏览器看这篇博客。
并发：针对线程的，在一段时间内发生多个事件

#### 3、Java多线程的实现
有两类方法

（1）继承Thread方法，重写run() 方法

（2）实现Runnable接口，重写run() 方法

**继承Thread，重写run()方法**

Thread是java.lang包下的一个类，当用户操作Thread类时，Thread类创建一个线程并交付给操作系统进行调度。

步骤：

（1）创建一个类继承（extend）Thread 类，定义线程的构造函数； 

（2）用需在此线程中执行的代码覆盖 Thread 类的 run()方法； 

（3）用关键字 new 创建所定义的线程类的一个实例化对象； 

（4）调用该对象的 start()方法启动线程。 

**实现Runnable接口，重写run（）方法**

很多情况下，一个类已经继承了其他类，由于java单继承的限制，该类无法继承Thread类，java语言便提供了Runnable接口，从而使得不继承Thread的情况下也能创建新的线程！
**这个方式常用！因为可以避免java中单继承的限制，可以将并行 运行任务和运行机制   解耦**
步骤：

（1）创建一个类实现（implements）Runnable 接口； 

（2）用需在此线程中执行的代码覆盖 Thread 类的 run()方法； 

（3）在类中定义一个 Thread 类对象；

（4）利用public Thread(Runnable target) 实例化定义对象

【public Thread(Runnable target)】 -----利用一个实现了 Runnable 接口参数对象 Target中所定义的 run（）方法，来初始化或覆盖新创建的线程对象的 run（）方法。

（5）调用该对象的 start()方法启动线程。

**敲黑板画细节：**
关于run()方法和start()的正确理解
run（）:仅仅是封装被线程执行的代码
start（）：首先启动了线程，然后再用jvm去调用该线程的run（）方法

#### 4、线程的状态和生命周期
五种状态
新建状态-->就绪状态-->运行状态-->阻塞状态-->死亡状态

下面这段话来自java语言程序设计，写的非常清楚！

（1）新建状态（Newborn） 
当一个 Thread 类或其子类对象被声明并用 new 关键字来实例化时，新生的线程对象处于新建状态。此时它已经被初始化，并拥有了相应的内存空间和其它资源，但还未开始执行。

（2）就绪状态（Runnable） 
处于新建状态的线程被启动后（即执行了 start()方法后），进入了就绪状态。此时它已具备运行条件，被放入线程队列排队等待执行，一旦轮到它来使用处理器资源时，就可以脱离创建它的主线程独立开始自己的生命周期了。至于何时真正执行，取决于线程的优先级和在线程队列中的位置。另外，原来处于阻塞状态的线程被解除阻塞后也将进入就绪状态。

（3）运行状态（Running） 
当就绪状态的线程被调度并获得处理器资源时，便进入运行状态。当线程对象被调度执行时，它将自动调用本对象的 run()方法，从第一句开始顺序执行。 
（4）阻塞状态（Blocked） 
一个正在执行的线程在某些特殊情况下（如被人为挂起或需要执行费时的输入输出操作时），将让出 CPU 并暂时中止自己的执行，进入阻塞状态。阻塞时它不能进入排队队列，只有引起阻塞的原因被消除，线程才可以转入就绪状态，重新进到线程队列中排队等待 CPU资源，以便从原来终止处开始继续执行。
引起阻塞的方法有 Wait()、Sleep()、Yield()等。

等待阻塞：运行的线程执行 wait()方法，JVM会把该线程放入等待池中。( wait会释放持有的锁)；

同步阻塞：运行的线程在获取对象的同步锁时，若该同步锁被别的线程占用，则JVM会把该线程放入锁池中；

其他阻塞：运行的线程执行 sleep()或 join()方法，或者发出了I/O请求时，JVM会把该线程置为阻塞状态。当 sleep()状态超时、 join()等待线程终止或者超时、或者I/O处理完毕时，线程重新转入就绪状态。（注意, sleep是不会释放持有的锁）；

（5）死亡状态（Dead） 
处于死亡或终止状态的线程不具有继续运行的能力。其原因有两个：
一个是正常运行的线程完成了它的全部工作，即执行完了 run()方法的最后一个语句并退出；
另一个是线程被提前强制性的终止，如通过执行 stop()方法强行终止当前线程（该方法目前已不建议使用）。

#### 5、线程的控制
**线程调度**

计算机操作系统为了提高程序的运行效率，当一个线程空闲时就会撤下这个线程，而会让其他线程执行！
Java中提供一个线程调度管理器来监控启动后进入就绪状态的所有线程，并通过优先级来确定运行的顺序。
线程的优先级预定义为10，1和5，分别对应三个优先级，默认为5即NORM_PRIORITY,可以用getPriority()和返回线程的优先级，也可以用setPriority()改变线程的优先级。

**挂起线程**

（1）wait：使得线程进入等待状态，直到被另一个线程唤醒

（2）sleep：线程睡眠，sleep()可用于让线程沉睡若干毫秒，sleep（1000）为沉睡一秒钟，而1秒后，线程会自动苏醒，并继续执行后续的代码，sleep（）方法并非一定能运行成功，当线程在挂起状态，由于某种原因打断了，它会抛出一个类型InterruptException的异常。

（3）yield：功能是暂停当前正在执行的线程方法，让其他线程先执行，**需要注意的是，yield（）方法只会给相同优先级线程一个执行机会**

（4）join：功能：是将几个并行的线程合并成单线程执行。

（5）interrupt：一个线程运行时，另一个线程可以调用对应的 Thread对象的interrupt()方法中断它。（但它仅仅是通知，什么时候终端还是要我们自己控制的）

**结束线程**

stop（）方法：程序中需要强制终止某线程的生命周期时可以使用stop（）方法。
stop方法可以由线程在自己的run（）方法中调用，也可以其他线程在执行方法中调用。
stop()方法将会使线程由其他状态进入死亡状态。
但不推荐 使用stop（）方法来强制终止线程，因为它将会导致错误发生。例如，如果一个线程正在操作共享数据段，操作过程没有完成即被执行stop（）方法，将会导致数据的不完整！

destroy（）方法：程序可以使用destroy（）方法来强制结束线程，但是这个方法在结束线程后，将不会释放锁，因此也不推荐使用！

参数控制法：由于stop（）和的 destroy（）方法在java新版本中已不建议使用，可以使用一个指示run（）方法必须退出的标志来停止一个线程。

具体步骤如下：

（1）编写一个类继承Thread类

（2）在这个类中增加一个布尔变量，并将其值初始化为false。

（3）覆盖start（）方法，首先将布尔变量的值置为true，然后调用super（）方法，start（）方法。

（4）提供一个public方法 halt（），它将变量置为false。

（5）在run（）方法中使用类似下面的while循环：

```java
public void run ( ){
    while(布尔参数){
    线程要执行的代码
	}
}
```

如果这个线程的halt（）方法被调用，则会将布尔参数的值置为假，从而引起run（）方法终止执行，从而结束该线程！

#### 6、线程的同步

锁机制

**Synchronized（同步）锁**：
synchronized就是一个关键字，它能将代码块锁起来
synchronized是一种互斥锁，一次只能允许一个线程进入被锁住的代码块（方法）

**Lock显式锁**
lock显式锁就是一个接口
lock显式锁比synchronized锁的优点就是灵活性高，缺点是需要手动释放锁。

**公平锁**：线程按照它们发出的请求顺序来获取锁
非公平锁：synchronizated锁和lock显式锁都是非公平锁，线程发出请求时可以插队来获取锁。

**死锁**：

（1）当前线程拥有其他线程需要的资源

（2）当前线程等待其他线程已拥有的资源

（3）都不放弃拥有的资源

**原因及解决的办法**

（1）线程间交错执行   解决方法：以固定的顺序加锁

（2）执行某方法时就需要持有锁且不释放
解决：缩减同步代码块的范围，最好仅操作共享变量时才加锁

（3）永久等待   解决：使用定时锁

#### 7、常用的线程方法

不需要特别记忆，需要用的时候查询即可
| 方法          | 含义                                                         |
| ------------- | ------------------------------------------------------------ |
| start()       | 使该线程开始执行；Java 虚拟机调用该线程的 run 方法。         |
| run()         | 如果该线程是使用独立的 Runnable 运行对象构造的，则调用该 Runnable 对象的 run 方法；否则，该方法不执行任何操作并返回。 |
| setName()     | 改变线程名称，使之与参数 name 相同。                         |
| setPriority() | 更改线程的优先级。                                           |
| setDaemon()   | 将该线程标记为守护线程或用户线程。                           |
| join()        | 等待该线程终止的时间最长为 millis 毫秒                       |
| interrupt()   | 中断线程。                                                   |
| isAlive()     | 测试线程是否处于活动状态。                                   |
| yield()       | 暂停当前正在执行的线程对象，并执行其他线程。                 |
| sleep（)      | 在指定的毫秒数内让当前正在执行的线程休眠（暂停执行），此操作受到系统计时器和调度程序精度和准确性的影响。 |

## Java反射

框架在新建类的时候类还没有创建，就需要一种让类还没有存在就可以编译通过的方法

Java反射新建对象的好处是：**新建的的类可以不存在（编译时这个类可以不存在，但是运行时需要存在）**

### 一、反射步骤

1. 必须获取一个类的Class对象

第一种写法：

```java
Class c = Student.class
```

第二种写法：

```java
Student student = new Student();
student.getClass();
```

第三种写法，这种写法最常见，编译时这个类可以不存在，但是运行时需要存在

```java
Class c = Class.forName("com.neutech.entity.Student");
```

2. 获取类的相关信息

```java
// 获取单个属性
Field field = c.getDeclaredField("id");
// 获取所有属性
Field[] fields = c.getDeclaredFields();
for (Field field : fields) {
    System.out.println(field);
}
//通过反射去新建对象（有参的构造方法），获取构造函数，通过构造器调用newInstance方法创建对象
Constructor constructor = c.getDeclaredConstructor(Integer.class, String.class, Integer.class);
Student student = (Student)constructor.newInstance(1, "1", 1);
System.out.println(student);
//无参构造方法可以直接创建
c.newInstance();
```

## Lambda表达式

从Java8（Java 1.8）开始的新特性，接口中只有一个抽象方法

## JDBC

1、加载驱动

```java
static{
    try{
        new Driver();
    }catch(SQLException e){
        e.printStackTrace();
    }
}
```

2、创建连接

```java
Connection conn = DriverManager.getConnection(
	url:""
	user:""
	password:""
)
```

3、创建传输

```java
Statement st = conn.createStatement();
```

4、运行SQL语句

```java
String sql = "insert into user(username,password) values('admin','12345')";
int i = statement.executeUpdate(sql);
```

5、处理运行结果

```java
ResultSetMetaData rsmd= resultSet.getMetaData();//只有查询需要
```

6、释放资源

```java
statement.close();
conn.close();
```

全部代码

```java
public class DbUtil {
    public static final String URL = "jdbc:mysql://localhost:3306/test";
    public static final String USER = "root";
    public static final String PASSWORD = "123456";
    
    public static void main(String[] args) throws Exception {
        //1.加载驱动程序
        Class.forName("com.mysql.jdbc.Driver");
        //2. 获得数据库连接
        Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
        //3.操作数据库，实现增删改查
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT user_name, age FROM test");
        //如果有数据，rs.next()返回true
        while(rs.next()){
            System.out.println(rs.getString("user_name")+" 年龄："+rs.getInt("age"));
        }
        //释放资源
        stmt.colse();
        conn.close();
    }
}
```

## 数组排序

#### 1、冒泡排序 

```java
int[] arr = {4,3,2,1};
for(int i = 0; i < arr.length; i++){
    for(int j = 0; j < arr.length - 1; j++){
        if(arr[j] > arr[j + 1]){
            int t = arr[j];
            arr[j + 1] = arr[j];
            arr[j] = arr[j + 1];
        }
    }
}
//输出结果为 1 2 3 4
```

