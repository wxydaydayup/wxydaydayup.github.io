---
date: 2022-11-07 11:59:41
author: WangXinYi
img: /images/homePage/Hexo可视化.webp
top: true
summary: Hexo可视化/Python脚本
categories: Python
tags:
  - Python
typora-root-url: ..
---

# Hexo

## Hexo 部署必看

截至 2023年4月 各部署方案的优缺点

| 序号 |  部署平台  |                    优点                    |                             缺点                             | 推荐指数           |
| ---- | :--------: | :----------------------------------------: | :----------------------------------------------------------: | ------------------ |
| 1    |   Github   |            最简单通用的部署方式            |           1、国内访问巨慢  <br />2、不支持百度收录           | :star::star:       |
| 2    |   Gitee    |                 国内访问快                 | 1、每次都需要手动点击部署(已找到[解决方法](https://blog.csdn.net/qq_35977139/article/details/113764322#:~:text=为了实现 Gitee Pages 的 自动部署 ，我开发了 ，只需要在 GitHub,%2Fworkflows%2F下创建一个工作流，添加一些配置参数即可。 欢迎体验，若有使用上的问题，也欢迎随时在反馈上。 注：首次需要手动登录 Gitee ，单击"启动"进行 Gitee Pages 服务)) <br />2、莫名其妙检测文章违规，之前可以部署<br />没有变化，再一次部署就出现违规？？？<br />3、自定义域名要收费，比较昂贵 | :star::star:       |
| 3    | Cloudflare |    国内访问比Github快，但比Gitee慢一点     | 1、不自定义域名网站有点长，而且搜索引擎收录为低质站点，需要自定义域名<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96/image-20230415093505034.png" alt="" style="zoom: 50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" /><br />2、免费版只有每月500次部署次数，但除了肝帝应该没有这样高产 | :star::star::star: |
| 4    |   Vercel   | 没有实践过，但据说在所有方案中最快且最稳定 | 知乎上发现好像有这样的问题，遂没有尝试该部署<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96/image-20230415104658256.png" alt="" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" /> | :star:             |
| 5    |   Coding   |                 国内访问快                 | 被腾讯云收购后，现在好像不直接支持静态部署了，找了半天发现好像还需要借助腾讯云部署，<br />又麻烦又要收费，遂放弃这种方式 | :star:             |



## Hexo主题

### 添加emoji表情支持

本主题新增了对`emoji`表情的支持，使用到了 [hexo-filter-github-emojis](https://npm.taobao.org/package/hexo-filter-github-emojis) 的 Hexo 插件来支持 `emoji`表情的生成，把对应的`markdown emoji`语法（`::`,例如：`:smile:`）转变成会跳跃的`emoji`表情，安装命令如下：

```bash
npm install hexo-filter-github-emojis --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```yaml
githubEmojis:
  enable: true
  className: github-emoji
  inject: true
  styles:
  customEmojis:
```
执行 `hexo clean && hexo g` 重新生成博客文件，然后就可以在文章中对应位置看到你用`emoji`语法写的表情了。



## Hexo提高体验

### 一、图片加载

图片加载太慢，首先考虑压缩图片大小，再转为webp图片格式，最后可以不使用图床，直接放到每篇博客对应图片的目录下

#### 1、压缩图片大小

可以使用这两个网站

+ [在线压缩JPG、PNG、WEBP、GIF、SVG](https://cdkm.com/cn/compress-image)
+ [TinyPNG – Compress WebP, PNG and JPEG images intelligently](https://tinypng.com/)

#### 2、极致性能之webp图片格式

将图片格式转换为`webp`，能降低至少1/3的大小。在线转换的工具很多，对于博客而言，图片的开销往往是一篇文章中最大的开销，如果一篇文章中图片比较多，或者有高清大图的时候，转为webp格式，那效果就明显了。

[JPG转WEBP - 免费在线将JPG文件转换成WEBP (cdkm.com)](https://cdkm.com/cn/jpg-to-webp)

#### 3、不使用图床

直接放到每篇博客对应图片的目录下，位置在 source\images\homePage\

## Hexo搜索引擎收录

百度、必应、谷歌可使用[hexo-submit-urls-to-search-engine ](https://cjh0613.com/20200603HexoSubmitUrlsToSearchEngine)插件主动推送，具体的收录步骤可以看插件的内容

但需要注意一点！！！**使用文件验证的方式**

如果使用 Hexo 搭建的，验证文件应该放在source文件夹里面。

<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96/image-20230415144707632.png" alt="选择文件验证的方式" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />

如果百度和必应出现验证失败：

2分钟前`https:// xx .gitee.io`使用文件验证
原因：验证的文件内容错误。

问题分析&解决办法： 验证文件的内容与我们提供的不符，请确定是原样上传搜索资源平台的问题，检查方式：访问验证文件——查看源代码检查，部分服务器会自动加上一些内容导致校验失败。

> 验证失败的原因：验证文件内容错误
> hexo在每个page加了一个layout，导致认证内容无法识别，这里设置成false即可。

解决办法是在验证文件前面加上如下代码

```
---
layout: false
---
1e656dd6423592f4033b1134369e1278
```

## Hexo可视化

由于每次都需要切换到Hexo目录，在CMD输入Hexo指令。

为了简化该操作，使用了Python自带的tkinter简单的实现了Windows的可视化界面。

Tkinter是Python GUI界面开发的库，并不需要额外引入相关库。

详细的步骤也已经给出，如果要直接使用，可以直接到GitHub下载代码，但需要改一配置，将rootDir改为自己Hexo的根目录。

```
rootDir = "F:/MyBlog" #这个需要改成自己Hexo的根目录
```

<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96%E8%84%9A%E6%9C%AC/image-20221107120308554.png" alt="Hexo可视化脚本效果图" style="zoom: 40%;" />



博客链接：[Hexo可视化脚本 | Wxy's blogs ](https://wxydaydayup.github.io/2022/11/07/Hexo可视化脚本/)

代码仓库：[Hexo可视化控制台(自制)](https://github.com/wxydaydayup/HexoPanel)

### 一、引入相关库，并构建主界面

```python
import tkinter as tk  # 导入Tkinter
if __name__ == '__main__':
    # 建立主窗口
    root = tk.Tk()
    mytitle = 'hexo控制台'
    root.title(mytitle)
    root.geometry('{}x{}+{}+{}'.format(700, 600, 400, 100))
    
    # 进入Tkinter消息循环
    root.mainloop()
```

效果如图所示：

<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96%E8%84%9A%E6%9C%AC/image-20221108094922069.png" alt="构建主页面" style="zoom:40%;" />

### 二、添加输入框、确定和草稿按钮

+ 实现Print重定向到Tkinter(StdoutRedirector是重定向位置，打印框下一步骤添加)
+ 添加新建文件输入框、确定按钮、草稿按钮

```python
import tkinter as tk  # 导入Tkinter
from tkinter.scrolledtext import ScrolledText  # 导入ScrolledText

rootDir = "F:/MyBlog" #这个需要改成自己Hexo的根目录

# Print重定向类
class StdoutRedirector(object):
    def __init__(self, ScrolledText):
        self.text_space = ScrolledText
        # 备份
        self.stdoutbak = sys.stdout
        self.stderrbak = sys.stderr
    def write(self, str):
        self.text_space.insert(tk.END, str)
        self.text_space.see(tk.END)
        self.text_space.update() # 刷新显示
    # 还原
    def restoreStd(self):
        sys.stdout = self.stdoutbak
        sys.stderr = self.stderrbak
    # 这个类必须得有，不然会报错
    def flush(self):
        pass

def sh(command):
    p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE) 
    #如需要将打印信息打印到tkinter，则取消下面注释。若出现乱码问题，换为GDK编码
    # lines = []
    # for line in iter(p.stdout.readline, b''):
    #     line = line.strip().decode("utf-8","ignore")
    #     print(">>>", line)
    #     lines.append(line)
    # return lines

def new():       # 新建
    last = NameEntry.get()                    # 获取输入框内容
    output = sys.stdout                       # 备份
    sys.stdout = StdoutRedirector(textMess)   # Print重定向类
    os.chdir(rootDir) 
    sh("hexo new "+last)
    print(last+" 新建成功")
    sys.stdout = output                       # 恢复到备份

def newDraft():  # 新建草稿
    last = NameEntry.get()                    # 获取输入框内容
    output = sys.stdout                       # 备份
    sys.stdout = StdoutRedirector(textMess)   # Print重定向类
    os.chdir(rootDir) 
    sh("hexo new draft"+last)
    print(last+" 新建草稿成功")
    sys.stdout = output                        # 恢复到备份

if __name__ == '__main__':
    # 建立主窗口
    root = tk.Tk()
    mytitle = 'hexo控制台'
    root.title(mytitle)
    root.geometry('{}x{}+{}+{}'.format(700, 600, 400, 100))
    # 新建文件输入框
    frame = tk.Frame(root)
    lb = tk.Label(frame, text='新建文件名:',font=('楷体',12), width=13, height=1)
    NameEntry = tk.Entry(frame, font=('楷体',12), width=23)
    # 确定按钮与草稿按钮
    updateButton = tk.Button(frame, text='确定', font=('楷体', 10), width=5, height=1)
    draftButton = tk.Button(frame, text='草稿', font=('楷体', 10), width=5, height=1)
    updateButton['command'] = lambda: new()
    draftButton['command'] = lambda: newDraft()
    # 新建文件输入框、确定按钮与草稿按钮的布局
    lb.pack(side=tk.LEFT)
    NameEntry.pack(side=tk.LEFT)
    updateButton.pack(side=tk.LEFT,padx=5)
    draftButton.pack(side=tk.LEFT)
    frame.pack(side=tk.TOP, fill=tk.BOTH)
    # 进入Tkinter消息循环
    root.mainloop()
```

效果如图所示：

<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96%E8%84%9A%E6%9C%AC/image-20221108095140843.png" alt="添加输入框" style="zoom:40%;" />

### 三、添加ScrolledText作为打印框

```python
import tkinter as tk  # 导入Tkinter
from tkinter.scrolledtext import ScrolledText  # 导入ScrolledText

rootDir = "F:/MyBlog" #这个需要改成自己Hexo的根目录

# Print重定向类
class StdoutRedirector(object):
    def __init__(self, ScrolledText):
        self.text_space = ScrolledText
        # 备份
        self.stdoutbak = sys.stdout
        self.stderrbak = sys.stderr
    def write(self, str):
        self.text_space.insert(tk.END, str)
        self.text_space.see(tk.END)
        self.text_space.update() # 刷新显示
    # 还原
    def restoreStd(self):
        sys.stdout = self.stdoutbak
        sys.stderr = self.stderrbak
    # 这个类必须得有，不然会报错
    def flush(self):
        pass

def sh(command):
    p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE) 
    #如需要将打印信息打印到tkinter，则取消下面注释。若出现乱码问题，换为GDK编码
    # lines = []
    # for line in iter(p.stdout.readline, b''):
    #     line = line.strip().decode("utf-8","ignore")
    #     print(">>>", line)
    #     lines.append(line)
    # return lines

def new():       # 新建
    last = NameEntry.get()                    # 获取输入框内容
    output = sys.stdout                       # 备份
    sys.stdout = StdoutRedirector(textMess)   # Print重定向类
    os.chdir(rootDir) 
    sh("hexo new "+last)
    print(last+" 新建成功")
    sys.stdout = output                       # 恢复到备份

def newDraft():  # 新建草稿
    last = NameEntry.get()                    # 获取输入框内容
    output = sys.stdout                       # 备份
    sys.stdout = StdoutRedirector(textMess)   # Print重定向类
    os.chdir(rootDir) 
    sh("hexo new draft"+last)
    print(last+" 新建草稿成功")
    sys.stdout = output                        # 恢复到备份


def clearMess():  # 清空打印
    global textMess
    textMess.delete(1.0, tk.END)

if __name__ == '__main__':
    # 建立主窗口
    root = tk.Tk()
    mytitle = 'hexo控制台'
    root.title(mytitle)
    root.geometry('{}x{}+{}+{}'.format(700, 600, 400, 100))
    
    # 新建文件输入框
    frame = tk.Frame(root)
    lb = tk.Label(frame, text='新建文件名:',font=('楷体',12), width=13, height=1)
    NameEntry = tk.Entry(frame, font=('楷体',12), width=23)
    # 确定按钮与草稿按钮
    updateButton = tk.Button(frame, text='确定', font=('楷体', 10), width=5, height=1)
    draftButton = tk.Button(frame, text='草稿', font=('楷体', 10), width=5, height=1)
    updateButton['command'] = lambda: new()
    draftButton['command'] = lambda: newDraft()
    # 新建文件输入框、确定按钮与草稿按钮的布局
    lb.pack(side=tk.LEFT)
    NameEntry.pack(side=tk.LEFT)
    updateButton.pack(side=tk.LEFT,padx=5)
    draftButton.pack(side=tk.LEFT)
    frame.pack(side=tk.TOP, fill=tk.BOTH)
    
    #为信息框设置一个容器作为信息输出窗口
    global textMess
    frame2 = tk.LabelFrame(root, text='打印信息', height=2)
    textMess = ScrolledText(frame2, bg='white', height=10)
    textMess.pack(fill=tk.BOTH, expand=1)
    clearMessbutton = tk.Button(frame2, text='清空信息', font=('楷体', 12), width=7, height=1)
    clearMessbutton.pack(anchor='se')
    clearMessbutton['command'] = lambda: clearMess()         #清空打印
    frame2.pack(fill=tk.BOTH, expand=1)

    # 进入Tkinter消息循环
    root.mainloop()
```

效果如图所示：

<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96%E8%84%9A%E6%9C%AC/image-20221108101447437.png" alt="添加打印框" style="zoom:40%;" />

### 四、添加刷新，网址、发布、位置按钮

```python
import tkinter as tk  # 导入Tkinter
from tkinter.scrolledtext import ScrolledText  # 导入ScrolledText
import webbrowser
import subprocess
import signal
import sys
import os

rootDir = "F:/MyBlog" #这个需要改成自己Hexo的根目录

class StdoutRedirector(object):  # Print重定向类
    def __init__(self, ScrolledText):
        self.text_space = ScrolledText
        # 备份
        self.stdoutbak = sys.stdout
        self.stderrbak = sys.stderr
    def write(self, str):
        self.text_space.insert(tk.END, str)
        self.text_space.see(tk.END)
        # 刷新显示
        self.text_space.update() 
    # 还原
    def restoreStd(self):
        sys.stdout = self.stdoutbak
        sys.stderr = self.stderrbak
    # 这个类必须得有，不然会报错
    def flush(self):
        pass

def sh(command):
    p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE) 
    #如需要将打印信息打印到tkinter，则取消下面注释。若出现乱码问题，换为GDK编码
    # lines = []
    # for line in iter(p.stdout.readline, b''):
    #     line = line.strip().decode("utf-8","ignore")
    #     print(">>>", line)
    #     lines.append(line)
    # return lines

def killPort(port): # 关闭进程
    r = os.popen("netstat -ano | findstr "+port)
    text = r.read()
    arr=text.split("\n")
    for text0 in arr:
        arr2=text0.split(" ")
        if len(arr2)>1:
            pid=arr2[len(arr2)-1]
            print('kill '+pid)
            if(pid == '0'):
                break
            os.system("taskkill /PID "+pid+" /T /F")
            break
    r.close()  
    
def btnfunc01():  # 刷新 
    output = sys.stdout
    sys.stdout = StdoutRedirector(textMess)
    killPort('4000')
    os.chdir(rootDir)
    sh("hexo clean")
    sh("hexo s")
    print("刷新成功")
    sys.stdout = output
    
def btnfunc02(): # 打开网址
    output = sys.stdout
    sys.stdout = StdoutRedirector(textMess)
    webbrowser.open("http://localhost:4000/")
    print("打开网址成功")
    sys.stdout = output
    
def btnfunc03():  # 发布
    output = sys.stdout
    sys.stdout = StdoutRedirector(textMess)
    os.chdir(rootDir)
    sh("hexo clean")
    sh("hexo d")
    print("已发布到Github")
    sys.stdout = output

def btnfunc04():  # 打开文件位置
    output = sys.stdout
    sys.stdout = StdoutRedirector(textMess)
    os.system("start " + rootDir)
    print("已打开文件所在位置")
    sys.stdout = output
    
def new():       # 新建
    last = NameEntry.get()                    # 获取输入框内容
    output = sys.stdout                       # 备份
    sys.stdout = StdoutRedirector(textMess)   # Print重定向类
    os.chdir(rootDir) 
    sh("hexo new "+last)
    print(last+" 新建成功")
    sys.stdout = output                       # 恢复到备份

def newDraft():  # 新建草稿
    last = NameEntry.get()                    # 获取输入框内容
    output = sys.stdout                       # 备份
    sys.stdout = StdoutRedirector(textMess)   # Print重定向类
    os.chdir(rootDir) 
    sh("hexo new draft"+last)
    print(last+" 新建草稿成功")
    sys.stdout = output                        # 恢复到备份

def clearMess():  # 清空打印
    global textMess
    textMess.delete(1.0, tk.END)

if __name__ == '__main__':
    # 建立主窗口
    root = tk.Tk()
    mytitle = 'hexo控制台'
    root.title(mytitle)
    root.geometry('{}x{}+{}+{}'.format(700, 600, 400, 100))
    
    # 新建文件输入框
    frame = tk.Frame(root)
    lb = tk.Label(frame, text='新建文件名:',font=('楷体',12), width=13, height=1)
    NameEntry = tk.Entry(frame, font=('楷体',12), width=23)
    # 确定按钮与草稿按钮
    updateButton = tk.Button(frame, text='确定', font=('楷体', 10), width=5, height=1)
    draftButton = tk.Button(frame, text='草稿', font=('楷体', 10), width=5, height=1)
    updateButton['command'] = lambda: new()
    draftButton['command'] = lambda: newDraft()
    # 新建文件输入框、确定按钮与草稿按钮的布局
    lb.pack(side=tk.LEFT)
    NameEntry.pack(side=tk.LEFT)
    updateButton.pack(side=tk.LEFT,padx=5)
    draftButton.pack(side=tk.LEFT)
    frame.pack(side=tk.TOP, fill=tk.BOTH)
    
    # 设置按钮的样式和位置
    frame1 = tk.Frame(root)
    global button1,button2,button3,button4
    button1 = tk.Button(frame1, text='刷新', bg='green', font=('楷体', 11), width=7, height=1)
    button2 = tk.Button(frame1, text='网址', bg='green', font=('楷体', 11), width=7, height=1)
    button3 = tk.Button(frame1, text='发布', bg='green', font=('楷体', 11), width=7, height=1)
    button4 = tk.Button(frame1, text='打开文件位置', font=('楷体', 12), width=12, height=1)
    # 设置按钮设置布局
    button1.pack(side=tk.LEFT,padx=5)
    button2.pack(side=tk.LEFT,padx=5)
    button3.pack(side=tk.LEFT,padx=5)
    button4.pack(side=tk.RIGHT)
    frame1.pack(side=tk.TOP, fill=tk.BOTH)
    # 为按钮设置功能
    button1['command'] = lambda: btnfunc01()            # 刷新
    button2['command'] = lambda: btnfunc02()            # 打开网址
    button3['command'] = lambda: btnfunc03()            # 新建
    button4['command'] = lambda: btnfunc04()            # 打开文件分配位置

    #为信息框设置一个容器作为信息输出窗口
    global textMess
    frame2 = tk.LabelFrame(root, text='打印信息', height=2)
    textMess = ScrolledText(frame2, bg='white', height=10)
    textMess.pack(fill=tk.BOTH, expand=1)
    clearMessbutton = tk.Button(frame2, text='清空信息', font=('楷体', 12), width=7, height=1)
    clearMessbutton.pack(anchor='se')
    clearMessbutton['command'] = lambda: clearMess()    #清空打印
    frame2.pack(fill=tk.BOTH, expand=1)

    # 进入Tkinter消息循环
    root.mainloop()
```

最终效果：

<img src="/images/Hexo%E5%8F%AF%E8%A7%86%E5%8C%96%E8%84%9A%E6%9C%AC/image-20221108102346610.png" alt="最终效果图" style="zoom:40%;" />

代码以全部放代码仓库：[Hexo可视化控制台(自制)](https://github.com/wxydaydayup/HexoPanel)



