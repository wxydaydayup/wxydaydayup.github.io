---
title: Python量化
tags:
  - Python
  - 量化
author: WangXinYi
img: https://tc.phpx.cn/uploads/2022/11/03/U3HeVrxzOc.jpg
summary: Python量化
categories:
  - Python
  - 量化
typora-root-url: ..
date: 2022-10-24 12:06:57
---

## 基金定投

### 一、目标

1、采用月定投方式到现在(2022-11-11)基金净值，收益情况

每月几号，将每月几号最终收益可视化显示出来

2、采用周定投方式到现在(2022-11-11)基金净值，收益情况

每周几，将每周几最终收益可视化显示出来

2、采用天定投方式到现在(2022-11-11)基金净值，收益情况

将每天几最终收益可视化显示出来

### 二、对比

+ 开始注意基金日期为2020-03-08
+ 开始投资基金日期为2021-01-20
+ 到2022-11-11 持有金额 9529.21 
+ 亏损1343.87   亏损-12.36%
+ 当前持仓成本价为 1.1503   目前基金净值为 1.0081

### 三、编码

其中有用的就是净值日期和单位净值了，其中净值日期（FSRQ）和单位净值（DWJZ）

因此，我们要先把数据整理成我们需要的格式，以日期为 key，净值为 value 放入到 dict 中即可。

```python
import pandas as pd
import warnings
import lightgbm as lgb
import datetime
import calendar
from pyecharts.charts import Bar
from pyecharts.charts import Line
from pyecharts import options as opts
warnings.filterwarnings('ignore')

data = pd.read_csv('./data.csv')
print(data.describe())   # 查看基金状况
data['DWJZ'] = data['单位净值']
data['FSRQ'] = pd.to_datetime(data['净值日期'], format='%Y-%m-%d')
data['FSRQ'] = data['FSRQ'].apply(lambda x: str(x.strftime("%Y-%m-%d")))
data = data.iloc[:, 2:]
found_date_price = data.set_index('FSRQ').to_dict()
```

这里我们采用两种计算方式，周定投、月定投、天定投。对应的函数分别是

+ `calculate_found_profit_by_week(start_date, end_date, weekday)` 
+ `calculate_found_profit_by_month(start_date, end_date)`
+ `calculate_found_profit_by_month(start_date, end_date)`

其中两个函数共有的参数 start_date 和 end_date 分别表示起始日期，按周来计算收益的函数参数 weekday 则表示定投日，weekday 为 0 表示周一定投，1 表示周二定投两个函数的返回值是一样的，分别是定投次数，最终持有份额，买入总金额，实际收益。我们的定投规则如下，每逢 weekday 或者每月 1 号定投，如果当天不是交易日则顺延至后一个交易日，同时周定投每次买入 500 元，月定投每次买入 2000 元。

calculate_found_profit_by_week 函数：

```python
# 买入规则：从 start_date 日期开始，每逢 weekday 买入，如果 weekday 不是交易日，则顺延至最近的交易日
# 每次买入金额转化为相应的份额
def calculate_found_profit_by_week(start_date, end_date, weekday):
    total_stock = 0
    total_amount = 0
    nums = 0
    day = start_date + datetime.timedelta(days=-1)
    while day < end_date:
        day = day + datetime.timedelta(days=1)
        if day.weekday() != weekday:
            continue
        while found_date_price.get('DWJZ').get(day.strftime('%Y-%m-%d'), None) is None and day < end_date:
            day += datetime.timedelta(days=1)
        if day == end_date:
            break
        nums += 1
        total_stock += round(fixed_investment_amount_per_week / float(found_date_price.get('DWJZ')[day.strftime('%Y-%m-%d')]), 2)
        total_amount += fixed_investment_amount_per_week
    # 计算盈利
    while found_date_price.get('DWJZ').get(end_date.strftime('%Y-%m-%d'), None) is None:
        end_date +=datetime.timedelta(days=-1)
    total_profit = round(total_stock, 2) * float(found_date_price.get('DWJZ')[end_date.strftime('%Y-%m-%d')]) - total_amount
    return nums, round(total_stock, 2), total_amount, round(total_profit)
```

calculate_found_profit_by_month 函数：

```python
# 买入规则：从 start_date 日期开始，每月 1 号买入，如果 1 号不是交易日，则顺延至最近的交易日
# 每次买入金额转化为相应的份额
def calculate_found_profit_by_month(start_date, end_date):
    total_stock = 0
    total_amount = 0
    nums = 0
    first_day = datetime.datetime(start_date.year, start_date.month, 1)
    day = first_day + datetime.timedelta(days=-1)  # 将日期设置为 start_date 上个月最后一天
    while day < end_date:
        day = get_first_day_of_next_month(day)
        if day > end_date:
            break
        while found_date_price.get('DWJZ').get(day.strftime('%Y-%m-%d'), None) is None and day < end_date:
            day = day + datetime.timedelta(days=1)
        if day == end_date:
            break
        nums += 1
        total_stock += round(fixed_investment_amount_per_month / float(found_date_price.get('DWJZ')[day.strftime('%Y-%m-%d')]), 2)
        total_amount += fixed_investment_amount_per_month
    # 计算盈利
    while found_date_price.get('DWJZ').get(end_date.strftime('%Y-%m-%d'), None) is None:
        end_date += datetime.timedelta(days=-1)
    total_profit = round(total_stock, 2) * float(found_date_price.get('DWJZ')[end_date.strftime('%Y-%m-%d')]) - total_amount
    return nums, round(total_stock, 2), total_amount, round(total_profit)

# 获取一个月有第一天
def get_first_day_of_next_month(date):
    first_day = datetime.datetime(date.year, date.month, 1)
    days_num = calendar.monthrange(first_day.year, first_day.month)[1]  # 获取一个月有多少天
    return first_day + datetime.timedelta(days=days_num)
```

有了净值数据，也有了定投规则和收益计算的具体实现，我们来看看我们的收益如何。

首先我们来看看该基金自成立以来的走势如何。

```python
# 基金整体走势图
line = (
    Line()
    .add_xaxis(list(found_date_price.get('DWJZ').keys()))
    .add_yaxis(
        '基金净值',
        y_axis=list(found_date_price.get('DWJZ').values()),
        label_opts=opts.LabelOpts(is_show=False),
    )
    .set_global_opts(
        title_opts=opts.TitleOpts(title='基金走势图'),
    )
)
line.render_notebook()
```

首先我们来分析下，定投频率对投资结果的影响。我们分别统计下：周一、周二、周三、周四、周五以及月定投和天定投的收益。

计算收益函数如下，并显示出来。

```python
fixed_investment_amount_per_day = 25 # 每天定投金额
fixed_investment_amount_per_week = 115 # 每周定投金额
fixed_investment_amount_per_month = 470 # 每月定投金额
start_date = datetime.datetime.fromisoformat('2021-01-20') # 开始定投的日期
end_date = datetime.datetime.fromisoformat('2022-11-11') # 结束定投的日期
total_amount, total_profit,total_num,total_ratio,total_stock= calculate_found_profit_week_month()
x = ['每天定投','周一定投', '周二定投', '周三定投', '周四定投', '周五定投', '月定投']
res = {'投资金额': total_amount,'投资收益': total_profit,'投资收益比': total_ratio,'投资次数': total_num,'投资份额': total_stock}
resShow = pd.DataFrame(res, index=x, columns=['投资收益比','投资金额', '投资收益','投资份额','投资次数'])
resShow.T
```

得出投资金额和收益之后，我们生成柱状图来综合对比

```python
# 投资收益柱状图
bar = (
    Bar()
    .add_xaxis(x)
    .add_yaxis('投资金额', total_amount)
    .add_yaxis('投资收益', total_profit)
    .add_yaxis('投资收益比', total_ratio)
    .set_global_opts(
        title_opts=opts.TitleOpts(title="投资收益柱状图"),
        xaxis_opts=opts.AxisOpts(splitline_opts=opts.SplitLineOpts(is_show=True)),
        yaxis_opts=opts.AxisOpts(splitline_opts=opts.SplitLineOpts(is_show=True)),
    )
)
bar.render_notebook()
```

### 四、结果

最后的结果：

```
          单位净值
count  1818.000000
mean      1.098198
std       0.195896
min       0.684000
25%       0.966700
50%       1.075000
75%       1.235575
max       1.646600
```

Out[181]:

|            | 每天定投 | 周一定投 | 周二定投 | 周三定投 | 周四定投 | 周五定投 |   月定投 |
| ---------: | -------: | -------: | -------: | -------: | -------: | -------: | -------: |
| 投资收益比 |    -18.0 |   -17.90 |   -17.90 |   -18.10 |   -17.90 |   -18.20 |   -18.80 |
|   投资金额 |  10925.0 | 10580.00 | 10810.00 | 10925.00 | 10810.00 | 10695.00 | 10810.00 |
|   投资收益 |  -1966.0 | -1898.00 | -1938.00 | -1975.00 | -1934.00 | -1945.00 | -2028.00 |
|   投资份额 |   8887.3 |  8612.18 |  8800.34 |  8878.15 |  8804.42 |  8679.46 |  8711.85 |
|   投资次数 |    437.0 |    92.00 |    94.00 |    95.00 |    94.00 |    93.00 |    23.00 |



<img src="/images/Python%E9%87%8F%E5%8C%96/image-20221112182148093.png" alt="投资收益柱状图" style="zoom:70%;" />



<img src="/images/Python%E9%87%8F%E5%8C%96/image-20221112182251158.png" alt="基金成立以来走势图" style="zoom:50%;" />

定投绝对不是稳赚不赔的

+ 选合适的基金
+ 卖出的时机一定要合适
+ 定投赚的钱也不多



## 股票量化

### 一、选股



### 二、配股



### 三、交易策略

MACD