---
tags:
  - Go
author: WangXinYi
img: /images/homePage/golang.webp
summary: Go基础与Go Modules
categories:
  - Go
typora-root-url: ..
date: 2022-10-24 12:06:57
---

# Go

https://pan.baidu.com/s/1glckD7XGInHDFQQKCRE66g 提取码: gyj3

**Go**（又称 **Golang**）是一种静态强类型、编译型语言。

Go 语言语法与 C 相近，但功能上有：内存安全，GC（垃圾回收），结构形态及 CSP-style 并发计算。

## 怎么运行

+ 编译命令 go build 
+ 编译+运行命令 go run


## 基础语法

### 一、标识符的组成

1. 标识符由数字、字母和下划线(`_`)组成。
2. 只能以字母和下划线(`_`)开头。
3. 标识符区分大小写。

```go
package main

import "fmt"

func main(){
	var name string
	var age int
	var ok bool
    fmt.Println("hello world")
}
```

**注意：这里面go语言的语法，定义函数的时候，‘{’ 必须和函数名在同一行，不能另起一行。**

+ 第一行代码**package main**定义了包名。你必须在源文件中非注释的第一行指明这个文件属于哪个包，如：package main。package main表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包。
+ 下一行**import "fmt"**告诉 Go 编译器这个程序需要使用 fmt 包（的函数，或其他元素），fmt 包实现了格式化 IO（输入/输出）的函数。
+ 下一行func main()是程序开始执行的函数。main 函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数（如果有 init() 函数则会先执行该函数）。

### 二、声明变量

Go语言中的变量需要声明后才能使用，同一作用域内不支持重复声明。 并且Go语言的变量声明后**必须使用**。

**声明变量的语法**

```go
var identifier type
```

`var`：声明变量关键字

`identifier`：变量名称

`type`：变量类型

```go
package main

import "fmt"

func main() {
    //第一种 使用默认值
    var a int
    fmt.Printf("a = %d\n", a)
    
    //第二种
    var b int = 10
    fmt.Printf("b = %d\n", b)
    
    //第三种 省略后面的数据类型,自动匹配类型
    var c = 20
    fmt.Printf("c = %d\n", c)

    //第四种 省略var关键字
    //这种方法只能在函数体内使用，不能用在全局变量上
    d := 3.14
    fmt.Printf("d = %f\n", d)
}
```

**多变量声明**

```go
package main

import "fmt"

var x, y int
var ( //这种分解的写法,一般用于声明全局变量
    a int
    b bool
)
func main() {
    var c, d int = 1, 2
    var e, f = 123, "liudanbing"
}
```

### 三、声明常量

常量是一个简单值的标识符，在程序运行时，不会被修改的量。

常量的定义格式：

```go
const identifier [type] = value
```

你可以省略类型说明符 [type]，因为编译器可以根据变量的值来推断其类型。

+ 显式类型定义：

```go
const b string = "abc"
```

+ 隐式类型定义：

```go
const b = "abc"
```

常量还可以用作枚举：

```go
const (
    Unknown = 0
    Female = 1
    Male = 2
)
```

自增长–在 golang 中，一个方便的习惯就是使用iota标示符，它简化了常量用于增长数字的定义，给以上相同的值以准确的分类。

```go
const (
    //iota关键字逐行累加
    CategoryBooks = iota // 0
    CategoryHealth       // 1
    CategoryClothing     // 2
)
```

### 四、声明函数

Go 函数可以返回多个值，例如：

```go
package main

import "fmt"

func swap(x, y string) (string, string) {
   return y, x
}

func main() {
   a, b := swap("Mahesh", "Kumar")
   fmt.Println(a, b)
}
```

以上实例执行结果为：`Kumar Mahesh`

可以给返回值写名字

```go
package main

import "fmt"

func swap(x, y string) (a string, b string) {
   return y, x
}

func main() {
   a, b := swap("Mahesh", "Kumar")
   fmt.Println(a, b)
}
```

#### 1、值传递

值传递是指在调用函数时将实际参数复制一份传递到函数中，这样在函数中如果对参数进行修改，将不会影响到实际参数。

默认情况下，Go 语言使用的是值传递，即在调用过程中不会影响到实际参数。

#### 2、引用传递

Go 语言中指针是很容易学习的，Go 语言中使用指针可以更简单的执行一些任务。

我们都知道，变量是一种使用方便的占位符，用于引用计算机内存地址。

Go 语言的取地址符是 &，放到一个变量前使用就会返回相应变量的内存地址。

以下实例演示了变量在内存中地址：

```go
package main

import "fmt"

func main() {

   var a int = 10   

   fmt.Printf("变量的地址: %x\n", &a  )

}
```

执行以上代码输出结果为：

变量的地址: 20818a220

**指针的使用**

```go
package main

import "fmt"

func swap(x *int, y *int) {
   var temp int
   temp = *x    /* 保存 x 地址上的值 */
   *x = *y      /* 将 y 值赋给 x */
   *y = temp    /* 将 temp 值赋给 y */
}

func main() {
   /* 定义局部变量 */
   var a int = 100
   var b int = 200

   fmt.Printf("交换前，a 的值 : %d\n", a )
   fmt.Printf("交换前，b 的值 : %d\n", b )

   /* 调用 swap() 函数
   * &a 指向 a 指针，a 变量的地址
   * &b 指向 b 指针，b 变量的地址
   */
   swap(&a, &b)
    
   fmt.Printf("交换后，a 的值 : %d\n", a )
   fmt.Printf("交换后，b 的值 : %d\n", b )
}
```

#### 3、init函数与import

init 函数可在package main中，可在其他package中，可在同一个package中出现多次。

**main函数**

main 函数只能在package main中。程序的初始化和执行都起始于main包。
如果main包还导入了其它的包，那么就会在编译时将它们依次导入。有时一个包会被多个包同时导入，那么它只会被导入一次（例如很多包可能都会用到fmt包，但它只会被导入一次，因为没有必要导入多次）。

**执行顺序**

golang里面有两个保留的函数：

+ init函数（能够应用于所有的package）和main函数（只能应用于package main）。这两个函数在定义时不能有任何的参数和返回值。

虽然一个package里面可以写任意多个init函数，但这无论是对于可读性还是以后的可维护性来说，我们都强烈建议用户在一个package中每个文件只写一个init函数。

go程序会自动调用init()和main()，所以你不需要在任何地方调用这两个函数。每个package中的init函数都是可选的，但package main就必须包含一个main函数。

#### 4、导包

<img src="/images/Golang/image-20230316191222234.png" alt="image-20230316191222234" style="zoom:50%;" />

### 五、defer

defer语句被用于预定对一个函数的调用。可以把这类被defer语句调用的函数称为延迟函数。

defer作用：

+ 释放占用的资源
+ 捕捉处理异常
+ 输出日志

如果一个函数中有多个defer语句，它们会以LIFO（后进先出）的顺序执行。

```go
func Demo(){
    defer fmt.Println("1")
    defer fmt.Println("2")
    defer fmt.Println("3")
    defer fmt.Println("4")
}
func main() {
	Demo()
}
```

**注意：return比defer之前调用**

### 六、slice和map

#### 1、slice

Go 语言切片是对数组的抽象。

Go 数组的长度不可改变，在特定场景中这样的集合就不太适用，Go中提供了一种灵活，功能强悍的内置类型切片`("动态数组")`,与数组相比切片的长度是不固定的，可以追加元素，在追加时可能使切片的容量增大。

**定义切片**

你可以声明一个未指定大小的数组来定义切片：

```go
var identifier []type
var array []int
var array [10]int
var array [3]int{1, 2, 3}
```

切片不需要说明长度。

或使用make()函数来创建切片:

```go
var slice1 []type = make([]type, len)
//也可以简写为
slice1 := make([]type, len)
```

也可以指定容量，其中capacity为可选参数。

```go
make([]T, length, capacity)
```

这里 len 是数组的长度并且也是切片的初始长度。

**切片初始化**

直接初始化切片，[]表示是切片类型，{1,2,3}初始化值依次是1,2,3.其cap=len=3

```
s :=[] int {1,2,3 }
```

-----------

通过切片s初始化切片s1

```
s1 := s[startIndex:endIndex]
```

## Go Modules

Go modules 是 Go 语言的依赖解决方案，发布于 Go1.11，成长于 Go1.12，丰富于 Go1.13，正式于 Go1.14 推荐在生产上使用。

Go moudles 目前集成在 Go 的工具链中，只要安装了 Go，自然而然也就可以使用 Go moudles 了，而 Go modules 的出现也解决了在 Go1.11 前的几个常见争议问题：

1. Go 语言长久以来的依赖管理问题。
2. “淘汰”现有的 GOPATH 的使用模式。
3. 统一社区中的其它的依赖管理工具（提供迁移功能）。

我们接下来用Go Modules的方式创建一个项目, 建议为了与GOPATH分开,不要将项目创建在`GOPATH/src`下.

### 一、go mod命令

| 命令            | 作用                             |
| --------------- | -------------------------------- |
| 🔥go mod init    | 生成 go.mod 文件                 |
| go mod download | 下载 go.mod 文件中指明的所有依赖 |
| go mod tidy     | 整理现有的依赖                   |
| go mod graph    | 查看现有的依赖结构               |
| go mod edit     | 编辑 go.mod 文件                 |
| 🔥go mod vendor  | 导出项目所有的依赖到vendor目录   |
| go mod verify   | 校验一个模块是否被篡改过         |
| go mod why      | 查看为什么需要依赖某模块         |

### 二、go mod环境变量

可以通过 `go env` 命令来进行查看

```bash
$ go env
GO111MODULE="auto"
GOPROXY="https://proxy.golang.org,direct"
GONOPROXY=""
GOSUMDB="sum.golang.org"
GONOSUMDB=""
GOPRIVATE=""
...
```

#### 1、GO111MODULE

Go语言提供了 `GO111MODULE`这个环境变量来作为 Go modules 的开关，其允许设置以下参数：

+ auto：只要项目包含了 go.mod 文件的话启用 Go modules，目前在 Go1.11 至 Go1.14 中仍然是默认值。
+ on：启用 Go modules，推荐设置，将会是未来版本中的默认值。
+ off：禁用 Go modules，不推荐设置。

可以通过来设置

```bash
$ go env -w GO111MODULE=on
```

#### 2、GOPROXY

这个环境变量主要是用于设置 Go 模块代理（Go module proxy）,其作用是用于使 Go 在后续拉取模块版本时直接通过镜像站点来快速拉取。

GOPROXY 的默认值是：`https://proxy.golang.org,direct`

`proxy.golang.org`国内访问不了,需要设置国内的代理.

+  阿里云
  https://mirrors.aliyun.com/goproxy/ 
+  七牛云
  https://goproxy.cn,direct 

如:

```bash
$ go env -w GOPROXY=https://goproxy.cn,direct
```

GOPROXY 的值是一个以英文逗号 “,” 分割的 Go 模块代理列表，允许设置多个模块代理，假设你不想使用，也可以将其设置为 “off” ，这将会禁止 Go 在后续操作中使用任何 Go 模块代理。

如:

```bash
$ go env -w GOPROXY=https://goproxy.cn,https://mirrors.aliyun.com/goproxy/,direct
```

**direct** 

而在刚刚设置的值中，我们可以发现值列表中有 “direct” 标识，它又有什么作用呢？

实际上 “direct” 是一个特殊指示符，用于指示 Go 回源到模块版本的源地址去抓取（比如 GitHub 等），场景如下：当值列表中上一个 Go 模块代理返回 404 或 410 错误时，Go 自动尝试列表中的下一个，遇见 “direct” 时回源，也就是回到源地址去抓取，而遇见 EOF 时终止并抛出类似 “invalid version: unknown revision...” 的错误。

#### 3、GOSUMDB

它的值是一个 Go checksum database，用于在拉取模块版本时（无论是从源站拉取还是通过 Go module proxy 拉取）保证拉取到的模块版本数据未经过篡改，若发现不一致，也就是可能存在篡改，将会立即中止。

GOSUMDB 的默认值为：`sum.golang.org`，在国内也是无法访问的，但是 GOSUMDB 可以被 Go 模块代理所代理（详见：Proxying a Checksum Database）。

因此我们可以通过设置 GOPROXY 来解决，而先前我们所设置的模块代理 `goproxy.cn` 就能支持代理 `sum.golang.org`，所以这一个问题在设置 GOPROXY 后，你可以不需要过度关心。

另外若对 GOSUMDB 的值有自定义需求，其支持如下格式：

+ 格式 1：`<SUMDB_NAME>+<PUBLIC_KEY>`。
+ 格式 2：`<SUMDB_NAME>+<PUBLIC_KEY> <SUMDB_URL>`。

也可以将其设置为“off”，也就是禁止 Go 在后续操作中校验模块版本。

#### 4、GOPRIVATE

GONOPROXY/GONOSUMDB/GOPRIVATE

这三个环境变量都是用在当前项目依赖了私有模块，例如像是你公司的私有 git 仓库，又或是 github 中的私有库，都是属于私有模块，都是要进行设置的，否则会拉取失败。

更细致来讲，就是依赖了由 GOPROXY 指定的 Go 模块代理或由 GOSUMDB 指定 Go checksum database 都无法访问到的模块时的场景。

而一般**建议直接设置 GOPRIVATE，它的值将作为 GONOPROXY 和 GONOSUMDB 的默认值，所以建议的最佳姿势是直接使用 GOPRIVATE**。

并且它们的值都是一个以英文逗号 “,” 分割的模块路径前缀，也就是可以设置多个，例如：

```bash
$ go env -w GOPRIVATE="git.example.com,github.com/eddycjy/mquote"
```

设置后，前缀为 git.xxx.com 和 github.com/eddycjy/mquote 的模块都会被认为是私有模块。

如果不想每次都重新设置，我们也可以利用通配符，例如：

```bash
$ go env -w GOPRIVATE="*.example.com"
```

这样子设置的话，所有模块路径为 example.com 的子域名（例如：git.example.com）都将不经过 Go module proxy 和 Go checksum database，**需要注意的是不包括 example.com 本身**。