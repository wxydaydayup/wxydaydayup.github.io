---
tags:
  - Streamlit
  - Python
author: WangXinYi
img: /images/homePage/streamlit.webp
summary: Streamlit做高颜值网站
categories:
  - Streamlit
  - Python
typora-root-url: ..
date: 2023-3-17 12:06:57
---

# Streamlit

Streamlit是一个Python库，用于在Web应用程序中快速构建数据科学和机器学习应用程序。它提供了许多预制的交互式部件，使得构建数据驱动的应用程序变得非常容易。

## 简单安装和使用

安装Streamlit非常简单，只需在命令提示符中键入以下命令即可, `streamlit` 要求 `python` 版本大于等于3.6，可以直接使用 `pip` 进行安装：

```
pip install streamlit
```

安装成功后，使用其内置的 `hello app` 测试，执行命令

```
streamlit hello
```

服务启动后，它会自动帮我们打开页面，地址是 `http://localhost:8501`

<img src="https://image.xugaoxiang.com/imgs/2021/08/9f19eafb1e61e516.png" alt="streamlit" style="zoom: 25%;" />

可以看到，`streamlit` 默认使用端口8501，你可以在启动服务时，使用参数 `--server.port`更换端口

```
streamlit run main.py --server.port 80
```

也可以在终端中运行以下命令启动Streamlit应用程序：

```
streamlit run app.py
```

在这里，`app.py`是您的Streamlit应用程序的文件名。启动应用程序后，您可以访问应用程序的地址，它将在您的Web浏览器中打开。

## 构建入门应用程序

以下是一个简单的Streamlit应用程序示例，其中包含一个文本输入框和一个按钮。

在点击按钮后，应用程序将根据输入的文本显示一条消息。

```python
import streamlit as st

def main():
    name = st.text_input("请输入您的名字")
    message = f"欢迎来到Streamlit，{name}!"
    st.write(message)

if __name__ == "__main__":
    main()
```

在上面的代码示例中，我们导入了Streamlit库，并定义了一个名为`main`的函数。函数中，我们定义了一个文本输入框，并将输入的文本转换为一条欢迎消息。

## 相关的组件

除了基本的应用程序构建，Streamlit还提供了许多高级用法，例如可视化、交互式图表和数据可视化等。您可以通过查看[官方文档](https://docs.streamlit.io/)来了解更多信息和示例。

Streamlit的一个强大特性是它允许您在应用程序中实时更新数据和图表。这意味着您可以构建一个动态的应用程序，用户可以实时查看和分析数据。另一个有用的功能是您可以使用Streamlit的Markdown支持在应用程序中创建漂亮的文本和图像。

Streamlit还提供了各种数据可视化工具，包括散点图、折线图、柱状图、面积图和热力图等。您可以使用这些工具来探索数据并生成可视化报告。此外，Streamlit还提供了一个交互式表格组件，可以方便地展示和编辑数据。

### 一、文本组件

我使用的是 Python 3.8 环境，执行 pip install streamlit 安装。安装后执行 streamlit hello 检查是否安装成功。

先来了解下 Streamlit 最基础的文本组件。

文本组件是用来在网页展示各种类型的文本内容。Streamlit 可以展示纯文本、Markdown、标题、代码和LaTeX公式。

```python
import streamlit as st

# markdown
st.markdown('Streamlit is **_really_ cool**.')

# 设置网页标题
st.title('This is a title')

# 展示一级标题
st.header('This is a header')

# 展示二级标题
st.subheader('This is a subheader')

# 展示代码，有高亮效果
code = '''def hello():
  print("Hello, Streamlit!")'''
st.code(code, language='python')

# 纯文本
st.text('This is some text.')

# LaTeX 公式
st.latex(r'''
  a + ar + a r^2 + a r^3 + \cdots + a r^{n-1} =
  \sum_{k=0}^{n-1} ar^k =
  a \left(\frac{1-r^{n}}{1-r}\right)
''')
```

上述是 Streamlit 支持的文本展示组件，代码存放 my_code.py 文件中。编码完成后，执行 streamlit run my_code.py ，streamlit 会启动 web 服务，加载指定的源文件。

启动后，可以看到命令行打印以下信息

```shell
streamlit run garbage_classifier.py

  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8501
  Network URL: http://192.168.10.141:8501
```

在浏览器访问 http://localhost:8501/ 即可。

当源代码被修改，无需重启服务，在页面上点击刷新按钮就可加载最新的代码，运行和调试都非常方便。

### 二、数据组件

dataframe 和 table 组件可以展示表格。

```python
import streamlit as st
import pandas as pd
import numpy as np
df = pd.DataFrame(
        np.random.randn(50, 5),
        columns=('col %d' % i for i in range(5)))

# 交互式表格
st.dataframe(df)
# 静态表格
st.table(df)
```



<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b99016e5e4143efa86256f2a26597ae~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:33%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

dateframe 和 table 的区别是，前者可以在表格上做交互（如：排序），后者只是静态的展示。‘’

它们支持展示的数据类型包括 pandas.DataFrame、pandas.Styler、pyarrow.Table、numpy.ndarray、Iterable、dict。

metric 组件用来展示指标的变化，数据分析中经常会用到。

```python
st.metric(label="Temperature", value="70 °F", delta="1.2 °F")
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7510bbbe0f774820a7659449f45014e6~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom: 50%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

value 参数表示当前指标值，delta 参数表示与前值的差值，向上的绿色箭头代表相比于前值，是涨的，反之向下的红箭头代表相比于前值是跌的。当然涨跌颜色可以通过 delta_color 参数来控制。

json 组件用来展示 json 类型数据

```python
st.json({
    'foo': 'bar',
    'stuff': [
        'stuff 1',
        'stuff 2',
    ],
})
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc1f3d52c98a49a8b3b45a31c17f7168~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:50%;" />

Streamlit 会将 json 数据格式化，展示地更美观，并且提供交互，可以展开、收起 json 的子节点。

### 三、图表组件

Streamlit 的图表组件包含两部分，一部分是原生组件，另一部分是渲染第三方库。

原生组件只包含 4 个图表，line_chart、area_chart 、bar_chart 和 map，分别展示折线图、面积图、柱状图和地图。

```python
chart_data = pd.DataFrame(
    np.random.randn(20, 3),
    columns=['a', 'b', 'c'])

st.line_chart(chart_data)
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5990347dbf5c49cfb81f0442db8680bf~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:50%;" />

上述是 line_chart 的示例，其他图表的使用方法与之类似。

Streamlit 图表可设置的参数很少，除了数据源外，剩下只能设置图表的宽度和高度。

虽然 Streamlit 原生图表少，但它可以将其他 Python 可视化库的图表展示在 Streamlit 页面上。支持的可视化库包括：matplotlib.pyplot、Altair、vega-lite、Plotly、Bokeh、PyDeck、Graphviz。

以 matplotlib.pyplot 为例，使用方式如下：

```python
import matplotlib.pyplot as plt

arr = np.random.normal(1, 1, size=100)
fig, ax = plt.subplots()
ax.hist(arr, bins=20)

st.pyplot(fig)
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd97f228349d4abea1ab14013daba12f~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:33%;" />

跟直接写 matplotlib.pyplot 一样，只不过最终展示的时候调用 st.pyplot 便可以将图表展示 Streamlit 页面上。其他 Python 库的使用方法与之类似。

### 四、输入组件

前面我们介绍的三类组件都是输出类、展示类的。对于交互式的页面来说，接受用户的输入是必不可少的。

Streamlit 提供的输入组件都是基本的，都是我们在网站、移动APP上经常看到的。包括：

+ button：按钮
+ download_button：文件下载
+ file_uploader：文件上传
+ checkbox：复选框
+ radio：单选框
+ selectbox：下拉单选框
+ multiselect：下拉多选框
+ slider：滑动条
+ select_slider：选择条
+ text_input：文本输入框
+ text_area：文本展示框
+ number_input：数字输入框，支持加减按钮
+ date_input：日期选择框
+ time_input：时间选择框
+ color_picker：颜色选择器

它们包含一些公共的参数：

+ label：组件上展示的内容（如：按钮名称）
+ key：当前页面唯一标识一个组件
+ help：鼠标放在组件上展示说明信息
+ on_click / on_change：组件发生交互（如：输入、点击）后的回调函数
+ args：回调函数的参数
+ kwargs：回调函数的参数

下面以 selectbox 来演示输入组件的用法

```python
option = st.selectbox(
    '下拉框',
    ('选项一', '选项二', '选项三'))

st.write('选择了：', option)
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12917ea8af4d46fc8a0ff92873db0b39~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:33%;" />

selectbox 展示三个选项，并输出当前选中的项（默认选中第一个）。当我们在页面下拉选择其他选项后，整个页面代码会重新执行，但组件的选择状态 会保留在 option 中，因此，调用 st.write 后会输出选择后的选项。

st.write 也是一个输出组件，可以输出字符串、DataFrame、普通对象等各种类型数据。

其他组件的使用与之类似，组件效果图如下：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/430eafabd5714406853e641548dff1ed~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:50%;" />

### 五、多媒体组件

Streamlit 定义了 image、audio 和 video 用于展示图片、音频和视频。

可以展示本地多媒体，也通过 url 展示网络多媒体。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed0d833dde424dbebcec9b8f429635bf~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:50%;" />

用法跟前面的组件是一样的，后面的垃圾分类 APP 我们会用到 image 组件。

### 六、状态组件

状态组件用来向用户展示当前程序的运行状态，包括：

+ progress：进度条，如游戏加载进度
+ spinner：等待提示
+ balloons：页面底部飘气球，表示祝贺
+ error：显示错误信息
+ warning：显示报警信息
+ info：显示常规信息
+ success：显示成功信息
+ exception：显示异常信息（代码错误栈）

效果如下：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/203caef5bf0b42b3a6eb5cb4f6669815~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom:33%;" />

### 七、其他内容

到这里，Streamlit 的组件基本上就全介绍完了，组件也是 Streamlit 的主要内容。

这小节介绍一下其他比较重要的内容，包括页面布局、控制流和缓存。

**页面布局**。之前我们写的 Streamlit 都是按照代码执行顺序从上至下展示组件，Streamlit 提供了 5 种布局：

+ sidebar：侧边栏，如：文章开头那张图，页面左侧模型参数选择
+ columns：列容器，处在同一个 columns 内组件，按照从左至右顺序展示
+ expander：隐藏信息，点击后可展开展示详细内容，如：展示更多
+ container：包含多组件的容器
+ empty：包含单组件的容器

**控制流。**控制 Streamlit 应用的执行，包括

+ stop：可以让 Streamlit 应用停止而不向下执行，如：验证码通过后，再向下运行展示后续内容。
+ form：表单，Streamlit 在某个组件有交互后就会重新执行页面程序，而有时候需要等一组组件都完成交互后再刷新（如：登录填用户名和密码），这时候就需要将这些组件添加到 form 中
+ form_submit_button：在 form 中使用，提交表单。

**缓存。**这个比较关键，尤其是做机器学习的同学。刚刚说了， Streamlit 组件交互后页面代码会重新执行，如果程序中包含一些复杂的数据处理逻辑（如：读取外部数据、训练模型），就会导致每次交互都要重复执行相同数据处理逻辑，进而导致页面加载时间过长，影响体验。

加入缓存便可以将第一次处理的结果存到内存，当程序重新执行会从内存读，而不需要重新处理。

使用方法也简单，在需要缓存的函数加上 @st.cache 装饰器即可。

```python
DATE_COLUMN = 'date/time'
DATA_URL = ('https://s3-us-west-2.amazonaws.com/'
            'streamlit-demo-data/uber-raw-data-sep14.csv.gz')

@st.cache
def load_data(nrows):
    data = pd.read_csv(DATA_URL, nrows=nrows)
    lowercase = lambda x: str(x).lower()
    data.rename(lowercase, axis='columns', inplace=True)
    data[DATE_COLUMN] = pd.to_datetime(data[DATE_COLUMN])
    return data
```

### 八、组件扩展（非常重要）

|                           相关地址                           |                             效果                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| 爱心选择框：[streamlit-custom-toggle · PyPI](https://pypi.org/project/streamlit-custom-toggle/) | <img src="/images/Streamlit/image-20230325142250609.png" alt="image-20230325142250609" style="zoom: 25%;" /><img src="/images/Streamlit/image-20230325142638431.png" alt="image-20230325142638431" style="zoom:50%;" /> |
| 点赞：[streamlit-text-rating · PyPI](https://pypi.org/project/streamlit-text-rating/) | <img src="/images/Streamlit/image-20230325142837021.png" alt="image-20230325142837021" style="zoom: 50%;" /> |
| 图片选择：[streamlit-image-select · PyPI](https://pypi.org/project/streamlit-image-select/) | <img src="/images/Streamlit/image-20230325143950337.png" alt="image-20230325143950337" style="zoom: 50%;" /> |
| 自定义通知栏 ：[streamlit-pretty-notification-box · PyPI](https://pypi.org/project/streamlit-pretty-notification-box/) | <img src="/images/Streamlit/image-20230325143123663.png" alt="image-20230325143123663" style="zoom:50%;" /> |
| 卡片 ：[streamlit-cardselectable · PyPI](https://pypi.org/project/streamlit-cardselectable/) | <img src="/images/Streamlit/image-20230325143258444.png" alt="image-20230325143258444" style="zoom: 25%;" /> |
| 图片放大：[streamlit-image-crop · PyPI](https://pypi.org/project/streamlit-image-crop/) | <img src="/images/Streamlit/image-20230325143646031.png" alt="image-20230325143646031" style="zoom: 25%;" /> |
| 图片裁切：[streamlit-cropper · PyPI](https://pypi.org/project/streamlit-cropper/) | <img src="/images/Streamlit/image-20230325144045224.png" alt="image-20230325144045224" style="zoom:67%;" /> |
| 词云：[streamlit-wordcloud · PyPI](https://pypi.org/project/streamlit-wordcloud/#description) | <img src="/images/Streamlit/image-20230325144221627.png" alt="image-20230325144221627" style="zoom:33%;" /> |
| 图片标注：[New Component: streamlit-img-label, an easy app for image annotation - 🧩 Streamlit Components - Streamlit](https://discuss.streamlit.io/t/new-component-streamlit-img-label-an-easy-app-for-image-annotation/20672) | <img src="/images/Streamlit/image-20230325144402984.png" alt="image-20230325144402984" style="zoom: 25%;" /> |
| 显示批注高亮文本：[st-annotated-text · PyPI](https://pypi.org/project/st-annotated-text/) | <img src="/images/Streamlit/image-20230325145556636.png" alt="image-20230325145556636" style="zoom:50%;" /> |
| 接入聊天机器人： [Streamlit Chat - Demo · Streamlit](https://ai-yash-st-chat-exampleschatbot-fkuecs.streamlit.app/) | <img src="/images/Streamlit/image-20230325145852298.png" alt="image-20230325145852298" style="zoom: 25%;" /> |
| streamlit扩展：[arnaudmiribel/streamlit-extras: Discover, try, install and share Streamlit re-usable bits we call "extras"! (github.com)](https://github.com/arnaudmiribel/streamlit-extras) | 徽章，卡片，分割线颜色，扩展器中省略代码，日期范围选择器指标以卡片的形式，按钮的页面切换，自定义颜色开关 |
| 折线图等图像：[tvst/plost: A deceptively simple plotting library for Streamlit (github.com)](https://github.com/tvst/plost) |                                                              |
|                          评论编辑等                          | <img src="/images/Streamlit/image-20230325154209254.png" alt="image-20230325154209254" style="zoom:67%;" /> |

### 九、多页面侧边栏

使用 [`st.sidebar`](https://docs.streamlit.io/en/stable/api.html#add-widgets-to-sidebar)可以轻易的将部件组织在左侧侧边栏。每个传到 [`st.sidebar`](https://docs.streamlit.io/en/stable/api.html#add-widgets-to-sidebar) 的元素将被固定到左边侧边栏, 这样可以让用户在使用UI进行控制的时候专注于关注app内容。

例如，若你想添加一个多选框或者滑块到侧边栏，使用`st.sidebar.slider` 和`st.siderbar.selectbox` 替换 `st.slider` 和 `st.selectbox`即可。

```python
import streamlit as st

# Add a selectbox to the sidebar:
add_selectbox = st.sidebar.selectbox(
    'How would you like to be contacted?',
    ('Email', 'Home phone', 'Mobile phone')
)

# Add a slider to the sidebar:
add_slider = st.sidebar.slider(
    'Select a range of values',
    0.0, 100.0, (25.0, 75.0)
)
```

**注意**：
边栏当前不支持以下Streamlit命令：`st.write`（应使用`st.sidebar.markdown()`代替），`st.echo`和`st.spinner`。

## 使用HTML语法

### 一、st.markdown

使用 **st.markdown** 撰写前端语言，需要启用它的可选参数 unsafe_allow_html=True 。

markdown是一种轻量级标记语言，它很容易转换为HTML。而HTML就是构成网页骨架的语言，所以我们启用st.markdown的 unsafe_allow_html 后，便可以在st.markdown内撰写HTML或CSS。

**上图2演示了用st.markdown撰写CSS来修改st组件的样式（直接复制粘贴应当无效）。**

下图3演示了用st.markdown**撰写HTML**为st添加一个极简的自定义组件：

```python
st.button('禁用', disabled=True)
st.button('正常')
st.markdown('''<span>
我位于st.markdown中
</span>''', unsafe_allow_html=True)
st.button('正常2')
```

<img src="https://pic2.zhimg.com/80/v2-08090b8a5a54f4518118389c4c13fb59_720w.webp" alt="img" style="zoom:50%;" />

图3 演示被其他st组件包围的st.markdown效果

所以，用**st.markdown**撰写前端代码的特点如下：

+ **优点**：不用重复导入；如果撰写HTML代码，代码和其他组件都在主页面内；便于添加和修改主页面的CSS样式
+ **缺点**：不能用于撰写JavaScript；撰写HTML则不方便自由调整宽高；有被Streamlit官方弃用的风险

### 二、html()

为了便于使用**streamlit.compoents.v1.html**，一般需要单独导入。

html()接受四个参数：html（html代码，str）、width（页面宽度，int）、height（页面高度，int）、scrolling（是否允许滚动，bool）。

示例如下：

```python
from streamlit.compoents.v1 import html

# 演示被其他st组件包围的html()效果，高度已设置
st.button('禁用', disabled=True)
st.button('正常')
html('''
<span>
我位于html()中
</span>
''', height=30)
st.button('正常2')
```

<img src="https://pic3.zhimg.com/80/v2-20385bb933aa3ca7f25c656570b592f2_720w.webp" alt="img" style="zoom:33%;" />

图4 演示被其他st组件包围的html()效果，高度已设置

并且，我们可以通过用html()撰写**JavaScript**来修改、添加、删除原本的st组件内容或是为他们增加一些事件，比如点击事件（需要较好的JavaScript语言基础），如下图，我用JavaScript删除了Streamlit右上角的汉堡菜单按钮：

```python
js_code = '''
$(document).ready(function(){
    $("button[kind=icon]", window.parent.document).remove()
});
'''
# 因为JS不需要展示，所以html宽高均设为0，避免占用空间，且放置在所有组件最后
# 引用了JQuery v2.2.4
html(f'''<script src="https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script>{js_code}</script>''',
     width=0,
     height=0)
```

<img src="https://pic1.zhimg.com/80/v2-622f11b3abc4a5a74ff7d9c6198db4a4_720w.webp" alt="img" style="zoom:33%;" />

图5 演示JS删除st汉堡菜单按钮

所以，用**html()**撰写前端代码的特点如下：

+ **优点**：可自由编辑宽高，便于布局；可撰写JavaScript；
+ **缺点**：代码位于iframe内，JavaScript想影响主页面需先跳出iframe；

**小结**

了解了以上两种方法后，不难看出：

+ 对于**HTML，一般来说使用st.markdown撰写更加保险，也方便页面内相互调用。但也需要用st.markdown写css对样式进行支持。**如果只需要撰写简单的HTML元素，**也可以直接使用html()（记得要设置宽高）**
+ 对于**CSS，**如果想简单直接地修改页面内st组件的样式，**一般需要选择st.markdown。而用html()调用JS也可以做到**
+ 对于**JavaScript，**由于st.markdown的位置本身就在<body>标签内，所以无法像常规的JavaScript一样写在<head>标签内。**所以只能使用html()**

------

### **三、结合Chrome开发者工具，使用st.markdown添加、修改CSS**

一般来说，撰写前端语言有一定的门槛，至少需要对html有一定的了解。但善用**Chrome开发者工具（F12）**，则可以**大大降低**撰写CSS的难度（复制粘贴能有什么难度）。下面来示范如何使用：

### 四、开发者工具详解

首先需要有一个Chrome浏览器（或至少是Chrome内核的浏览器）。打开自己的Streamlit页面后，按下F12（Mac用户可能需要按住Fn再按F12），即可打开**开发者工具**，如下图：

<img src="https://pic1.zhimg.com/80/v2-fa671936482e21b676f612198404ee8c_720w.webp" alt="img" style="zoom:50%;" />

图6 开发者工具中要用到的内容

接下来按顺序演示我们需要了解的开发者工具中的内容：

### **五、页面的HTML代码**

左侧页面中的st组件，本质上是由HTML代码+CSS样式组成。HTML代码决定它「是什么」，CSS样式决定它「长什么样」。那么1. 中的内容，就是开发者工具中用于显示当前页面HTML代码的**元素（英文版本是Elements）**窗口。例如，当前元素窗口中，被选中的HTML内容就是：

```html
<button kind="primary" class="css-1cpxqw2 edgvbvh1">正常</button>
```

HTML代码由一个个标签嵌套、排列组成。如上述代码就是选中的button标签。一个最简单的button标签就是以<button>开头，以</button>结尾。

### **六、使用辅助检查功能快速定位标签**

那么，如何在茫茫多的折叠标签中找到我们想要修改的st组件的标签呢？这就要用到2.中的按钮，点击一下，就可以使光标进入辅助检查模式。

例如此处想要选择第二个按钮，那么就按下**辅助检查按钮（快捷键：Ctrl+Shift+C）**将鼠标悬停到左侧页面中的组件上，可以看到蓝色绿色等颜色。将色彩范围缩小到这个按钮范围内，就代表已经锁定了这个按钮，再按下左键即可在元素窗口中看到对应的标签已经被选中：

<img src="https://pic2.zhimg.com/80/v2-d1d9b1b04409b71f4575e869b887b791_720w.webp" alt="img" style="zoom:50%;" />

图7 使用辅助检查功能选中一个标签

### **七、在开发者工具中尝试修改CSS样式**

既然已经选中了想要修改的st组件，接下来就是要写代码去修改它的样式。但是在写代码之前，可以在开发者工具中先模拟一下，尝试修改，确保选中的HTML标签就是自己想要修改的那一个。在图6的3. 中就是当前选中的元素的CSS样式代码，它由一段段CSS代码组成。一个CSS代码的构成如下：

```css
.css-1cpxqw2:focus:not(:active) {
    border-color: rgb(255, 75, 75);
    color: rgb(255, 75, 75);
}
```

它的结构类似于Python字典的键值对，只不过不同的**CSS属性**之间以";"分隔。在{}之前的是**CSS选择器路径**，这个路径决定了{}中的属性应用于HTML中的哪个标签。

在开发者工具里，任何一个CSS中，没有变为灰色，且没有被划线删除的CSS属性都会被应用。而如果两个CSS中出现相同的属性，排布更靠上的将会覆盖排布靠下的，这就是划线删除的来源。判断哪个CSS被使用比较复杂，所以可以点击「样式」后的第二栏「计算样式」来查看当前标签应用的CSS属性都有哪些：

<img src="https://pic1.zhimg.com/80/v2-baacbcafc63c48404fb2f6a0561e9de4_720w.webp" alt="img" style="zoom:50%;" />

图7 计算样式

如果对这些CSS属性不了解，或者是英文阅读比较吃力，可以在[CSS 参考手册](https://link.zhihu.com/?target=https%3A//www.w3school.com.cn/cssref/index.asp)中对照理解。

现在来进行一个最直观的测试演示，修改button的背景色。图7中已经给出，background-color（背景色）的属性值为白色，RGBA为rgb(255, 255, 255)。点击background-color后的箭头（鼠标悬停后显示），就会定位到样式中的对应CSS去：

<img src="https://pic1.zhimg.com/80/v2-905803ee01960bdc605933e868811384_720w.webp" alt="img" style="zoom: 50%;" />

图9 计算样式定位到样式中

此时点击rgb前的白色色块，在取色器中随意修改一个颜色（按回车确认），可以看到按钮的背景色已经发生了变化。证明找到的标签没有错（**如果有错，则可以在当前标签的上下继续找，并且尝试修改**）。但是也会发现，不止一个button的背景色发生了变化，所有button都变了：

<img src="https://pic3.zhimg.com/80/v2-e4a59c696b5b75f13c011ad8e7f30092_720w.webp" alt="img" style="zoom: 67%;" />

图9 修改CSS，所有应用该CSS的标签都会受影响

这是因为不止一个button使用了该CSS，所有的st.button应用的CSS都应用了这一个CSS（**这是因为CSS选择器的选择方式是选择HTML中class="css-1cpxqw2"的所有标签，而目前button都应用了这个标签**）。

如果想只修改单个标签，则不能继续在这个CSS中进行修改了。需要在更高级的CSS中写background-color来覆盖掉它。而样式中最上层正好是element.style {}，指该元素的样式，只针对该元素。那么就在它中间新写一条background-color属性，来覆盖下面的属性，且仅应用于当前标签，如图：

<img src="https://pic3.zhimg.com/80/v2-33109985dffb2491cbfe0f6bb1cf3332_720w.webp" alt="img" style="zoom: 67%;" />

图9 在element.style里新增一条css属性

可以看到成功了，但是如何把它应用到后端的Python代码中呢？

### 八、复制CSS选择器路径，构造st.markdown代码

前面提到，CSS代码由CSS选择器和CSS属性组成。CSS选择器决定了这些属性将应用于哪些元素。如果没有使用CSS选择器的能力（并且由于Streamlit组件的高度近似性，很难通过自己写CSS选择器来精准定位到一个元素），**不如直接从开发者工具中复制**：只需要右键点击选中的HTML元素，选择复制-复制selector（英文版本可能不同，但是位置相同），就获得了CSS选择器路径，如图：

<img src="https://pic2.zhimg.com/80/v2-085ef18c73888c1ae71bfd2722458cb5_720w.webp" alt="img" style="zoom:33%;" />

图10 复制CSS选择器路径

会得到一行选择器的代码。现在就可以在后端构造st.markdown中的CSS代码了：

```python
# 1. 代码需要为多行 
# 2. 需以<style>开头，以</style结尾> 
# 3. 每个人的项目中需要复制的CSS选择器路径不同，直接复制我的代码大概率无效
st.markdown('''<style>
#root > div:nth-child(1) > div > div > div > div > section > div > div:nth-child(1) > div > div:nth-child(2) > div > button {
    background-color: rgb(255 75 75 / 50%);
} 
</style>''', unsafe_allow_html=True)
```

将这段代码放置在所有组件最后（**因为st.markdown虽然不显示，但会占用一定空间，放在最后可以避免影响布局**），就可以在前端页面发现已经成功应用了。至此大功告成，别的CSS属性也可以以这种方法修改了。

如果需要修改多个组件，只需要将多个CSS放在同一个st.markdown的<style>标签内即可

**需要注意两点：**

1. **如果使用了streamlit_option_menu 等第三方库，则不能确保以上方法能够奏效**
2. **复制的CSS选择器路径不是固定的，如果在已经复制路径的组件前再添加/删除了其他组件导致页面布局发生变化，选择器路径自然也会发生变化，需要重新复制**

### **九、关于使用html()方法撰写JavaScript的一点提示**

由于js学习成本比较高，所以不在本文赘述。这里只给和我一样粗通js，想在st中应用的朋友们一点提示：

html()会生成一个iframe，所有的js代码都写在iframe的head标签中，并在iframe中运行。alert之类的不受document影响的功能能正常运行，但是如果不跳出iframe，所有想通过js操作st页面DOM的想法都不能实现。

JS的选择器跳出iframe获取到主页面元素的方法如下：

原生：document.getElementByXXX前加上window.parent.

```js
window.parent.document.getElementsByClassName("test")
```

JQuery：$("")中添加, window.parent.document

```js
$("div", window.parent.document)
```

------

最后附上封面源码作为一个小示例：

```python
import streamlit as st
from streamlit.components.v1 import html

st.button('button背景色？换一个吧')
st.text_area('del', placeholder='Label多余？删了就好')
st.radio('想放大label字号, 修改字体吗？', ['想', '很想'])

st.markdown('''<style>
/* radio label字号、字体 */
#root > div:nth-child(1) > div > div > div > div > section > div > div:nth-child(1) > div > div:nth-child(3) > div > label {
     font-size: 50px;
     font-family: "Times New Roman", serif;
}

/* button背景色 */ 
#root > div:nth-child(1) > div > div > div > div > section > div > div:nth-child(1) > div > div:nth-child(1) > div > button {
    background-color: black;
    color: white;
}

/* radio选中项颜色 */
#root > div:nth-child(1) > div > div > div > div > section > div > div:nth-child(1) > div > div:nth-child(3) > div > div > label:nth-child(1) > div.st-co.st-cs.st-ct.st-cu.st-cv.st-cw.st-az.st-b4.st-cx.st-cy.st-cz.st-d0.st-d1.st-d2.st-c4.st-d3.st-d4.st-d5.st-b2.st-bl {
     background-color: black;
}
</style>''', unsafe_allow_html=True)

js_delete = '''window.parent.document.querySelector("#root > div:nth-child(1) > div > div > div > div > section > div > div:nth-child(1) > div > div:nth-child(2) > div > label").remove()'''
html(f'''<script>{js_delete}</script>''',
     width=0,
     height=0)
```

## 其他补充

除此之外，`streamlit` 官方还提供了一个稍复杂的应用，它结合了 `yolov3` 的目标检测算法，仓库地址：https://github.com/streamlit/demo-self-driving，感兴趣的可以去研究研究，代码简短，但功能完整

<img src="https://image.xugaoxiang.com/imgs/2021/08/complex_app_example.gif" alt="streamlit" style="zoom: 25%;" />

那么，针对我们自己的写的源码文件，该怎么运行呢？其实也非常简单，比如源码文件是 `app.py`，那么可以执行

```
streamlit run app.py
```

这里再说2个常用的命令

+ `streamlit docs` 查看文档
+ `streamlit cache clear` 清缓存



## 结论

Streamlit是一个强大的工具，可用于快速构建数据驱动的Web应用程序。它易于使用且具有许多有用的功能，使其成为数据科学家和机器学习工程师的首选工具之一。使用Streamlit，您可以快速构建交互式应用程序，展示数据和分析结果，以及与团队或客户共享您的发现。