---
date: 2021-11-08 14:54:44
author: WangXinYi
img: /images/homePage/mysql.webp
top: false
summary: Mysql基础
categories:
  - Mysql
tags:
  - Mysql
typora-root-url: ..
---

# Mysql基础



<img src="/images/Mysql%E5%9F%BA%E7%A1%80/image-20221116111013145.png" alt="黑马程序员-Mysql路线" style="zoom: 40%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />



## Mysql 概述

```txt
net start mysql //启动命令
```

### 一、Mysql 数据类型

| 数据类型  |                             备注                             |
| :-------: | :----------------------------------------------------------: |
|  boolean  |                 在mysql中是以 tinyint 存储的                 |
|    int    |                     最大存储数据约为2亿                      |
|  bigint   |                   和Java中的 long意义相同                    |
|   float   |                        不精确小数运算                        |
|  double   | 不精确小数运算，<br />可以使用decimal(6,2)精确小数运算,最多6位，小数位2位 |
|   char    |        定长字符串，不够用空格补齐，**最大长度为255**         |
|  varchar  |              变长字符串，可以进行图片路径的存储              |
|   date    |          年月日的存储，“2022-8-5”或者20220805都可以          |
|   time    |                         时分秒的存储                         |
| datetime  |                      年月日时分秒的存储                      |
|   year    | 只进行年份的存储。<br />插入0，实际存储0000<br />插入“0”，实际存储2000<br />插入1-69，实际存储2001-2069<br />插入70-99，实际存储1970-1999 |
| timestamp |              输入9999年份会报错，数据范围比较小              |

### 二、Mysql运算符

#### 1、算术运算符

Mysql中有 `+ - * /` 运算符，注意点：

+ `+`  会把字符串中的数字提取出来 eg： `select 1 + "23abc"` , 结果为 24
  
+ 日期按指定位计算，eg：日期类型 - 1000 , 实际上会在 倒数第四位减去1，并不是减去1000毫秒

+ Mysql中没有 `+=  -=  *=  /=  ++  --` 等相关方法进行字符串拼接


#### 2、关系运算符

Mysql中有 `> < <= >= != <>`  等运算符，其中 数字，字符，时间等类型都可以进行比较

#### 3、逻辑运算符

| 逻辑运算符  | 功能                         |
| ----------- | ---------------------------- |
| and 或 &&   | 并且（多个条件同时成立）     |
| or 或 \| \| | 或者（多个条件任意一个成立） |
| not 或 !    | 非，不是                     |

### 三、Mysql 关键词

```sql
空的判断:
	is null 或者 is not null
连续范围查询:
	where age between <小的值> and <大的值>
	-- 下面语句不报错，但查不到任何信息
	select * from employee where age between 30 and 20;
离散范围查询:
	where age in (3,5,7);
模糊查询:
	select * from cat where name like 't%'(第一个字符是t) 或者 like '_t%'(第二个字符是t);
排序:
    select * from cat order by asc;  默认升序(是个子句，前面可以不加where)
    select * from cat order by desc;   降序
    select * from cat order by asc,dept desc;
显示指定的条数(修改、删除只能1个参数):
	select * from cat limit 3 (limit需要在后面)
	select * from cat where age >=18 limit 3 
	select * from cat where age >=18 order by desc limit 3 
	select * from cat where age >=18 order by desc limit 1,2(从索引1开始，取2条)
```

## Mysql 语法及分类

- DDL: 数据定义语言，用来定义数据库对象（数据库、表、字段）
- DML: 数据操作语言，用来对数据库表中的数据进行增删改
- DQL: 数据查询语言，用来查询数据库中表的记录
- DCL: 数据控制语言，用来创建数据库用户、控制数据库的控制权限

### 一、DDL

#### 1、创建数据库

> UTF8字符集长度为3字节，有些符号占4字节，所以推荐用utf8mb4字符集

```sql
create database t1;
create database t1 charset="utf8mb4";
```

#### 2、查看数据库	

```sql
-- 查询所有数据库
show databases; 
-- 查询当前数据库
select database();
```

#### 3、使用数据库	 

```sql
use t1;
```

#### 4、删除数据库

```sql
drop database [if exists] t1;
```

#### 5、查看表	 

```sql
show tables;
```

#### 6、创建表

```mysql
create table cat(name varchar(20),age int,type varchar(20));
```

+ 最后一个字段后面没有逗号

#### 7、查询表结构

```sql
desc <表名>
```

### 二、DML

#### 1、插入数据 

```sql
insert into cat values(“tomcat”,3,”test”);
insert into cat(name,age,type) values(“tomcat”,3,”string”),(null,1,"int");
```

注意点：

+ 顺序保存一致
+ 类型保持一致
+ 个数保存一致
+ 字符串和日期类型数据应该包含在引号中
+ 插入的数据大小应该在字段的规定范围内

#### 2、修改数据    

```sql
update cat set age = 3 where name = "1";
```

#### 3、删除数据

```sql
delete from cat where name = “1”
delete from Dept where dptno='Z01' and update Pe set age = 3 where name = "1";
```







```
create trigger TRI_dp on Pe for update 
as if 
updata(wage) begin update set wage=4000 where exists
(select wage<4000 from Pe where job="经理”）
update set wage=3500 where exists(select wage<3500 from Pe where job="副经理”） 
end
```



### 三、DQL

```sql
select
	字段列表
from
	表名字段
where
	条件列表
group by
	分组字段列表
having
	分组后的条件列表
order by
	排序字段列表
limit
	分页参数
```

### 四、DCL

#### 管理用户

查询用户：

```mysql
use mysql;
select * from user;
```

创建用户:
`create user '用户名'@'主机名' identified by '密码';`

修改用户密码：
`alter user '用户名'@'主机名' identified with mysql_native_password by '新密码';`

删除用户：
`drop user '用户名'@'主机名';`

例子：

```mysql
-- 创建用户test，只能在当前主机localhost访问
create user 'test'@'localhost' identified by '123456';
-- 创建用户test，能在任意主机访问
create user 'test'@'%' identified by '123456';
create user 'test' identified by '123456';
-- 修改密码
alter user 'test'@'localhost' identified with mysql_native_password by '1234';
-- 删除用户
drop user 'test'@'localhost';
```

##### 注意事项

- 主机名可以使用 % 通配

#### 权限控制

常用权限：

| 权限               | 说明               |
| ------------------ | ------------------ |
| all,all privileges | 所有权限           |
| select             | 查询数据           |
| insert             | 插入数据           |
| update             | 修改数据           |
| delete             | 删除数据           |
| alter              | 修改表             |
| dpop               | 删除数据库/表/视图 |
| create             | 创建数据库/表      |

查询权限：
`show grants for'用户名'@'主机名';`

授予权限：
`grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';`

撤销权限：
`revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';`

##### 注意事项

- 多个权限用逗号分隔
- 授权时，数据库名和表名可以用 * 进行通配，代表所有

## Mysql 函数

### 一、Mysql 方法

#### 1、数值类型方法

+ pow()
+ pi()
+ floor()
+ ceil()
+ rand() 0-1之间

#### 2、字符串类型方法

```sql
-- 拼接,字符串拼接，将s1, s2, ..., sn拼接成一个字符串
select concat('Hello', 'World');
-- 小写,将字符串全部转为小写
select lower('Hello');
-- 大写,将字符串全部转为大写
select upper('Hello');
-- 左填充,用字符串pad对str的左边进行填充，达到n个字符串长度
select lpad('01', 5, '-');
-- 右填充，用字符串pad对str的右边进行填充，达到n个字符串长度
select rpad('01', 5, '-');
-- 去除空格,去掉字符串头部和尾部的空格
select trim(' Hello World ');
-- 切片（起始索引为1）,返回从字符串str从start位置起的len个长度的字符串
select substring('Hello World', 1, 5);
```

#### 3、日期类型方法

+ now()
+ curdate()
+ curtime()

### 二、Mysql聚合函数

+ min(<列名>)
+ max(<列名>)
+ sum(<列名>)
+ avg(<列名>)        空值不计入运算
+ count(<列名>)    空值不计入运算
+ if(10>2,1,2)		 如果true为1,false为2

### 三、Mysql分组查询

```sql
group by ... having ...
select type,avg(age) from cat group by type having avg(age)>=5
```

Mysql关键字的顺序如下

依次为`where,group by...having...,order by,limit`

## Mysql 约束

### 一、Mysql约束

| 约束                    | 描述                                                     | 关键字      |
| ----------------------- | -------------------------------------------------------- | ----------- |
| 非空约束                | 限制该字段的数据不能为null                               | not null    |
| 唯一约束                | 保证该字段的所有数据都是唯一、不重复的                   | unique      |
| 主键约束                | 主键是一行数据的唯一标识，要求非空且唯一                 | primary key |
| 默认约束                | 保存数据时，如果未指定该字段的值，则采用默认值           | default     |
| 外键约束                | 用来让两张图的数据之间建立连接，保证数据的一致性和完整性 | foreign key |
| 检查约束（8.0.1版本后） | 保证字段值满足某一个条件                                 | check       |

约束是作用于表中字段上的，可以再创建表/修改表的时候添加约束。

### 二、Mysql的三范式

#### 1、第一范式

数据库表中的所有字段值都是不可分解的原子值

#### 2、第二范式

一个表只具有相同特征和行为的一类事物的值，保证一张表只描述一件事情

#### 3、第三范式

表中的字段和主键直接对应不依靠其他中间字段，不存在依赖传递，决定某字段值的必须是主键

## Mysql 多表查询

### 一、Mysql表连接

#### 1、内连接

两个表中满足条件的数据进行展示，不满足条件的不进行展示，两种写法

```sql
1、select * from a,b where a.name = b.name
2、select * from a inner join b on a.name = b.name
```

#### 2、外连接

(1) 左外连接 主表 left 从表 

```sql
select * from a left outer join b on a.name = b.name
```

(2)右外连接 从表 right 主表

```sql
select * from b right outer join a on a.name = b.name
```

#### 3、自连接

当前表与自身的连接查询，自连接必须使用表别名

```sql
-- 查询员工及其所属领导的名字
select a.name, b.name from employee a, employee b where a.manager = b.id;
```

## Mysql 事务

### 一、Mysql事务

#### 1、事务语法

```
begin;
...
commit;
rollback;
```

#### 2、事务的特性ACID

- 原子性(Atomicity)：事务是不可分割的最小操作单元，要么全部成功，要么全部失败
- 一致性(Consistency)：事务完成时，必须使所有数据都保持一致状态
- 隔离性(Isolation)：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行
- 持久性(Durability)：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的

#### 3、事务的隔离级别

Mysql的默认的隔离级别为可重复读，InnoDB已经消除了幻读

| 问题       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 脏读       | 一个事务读到另一个事务还没提交的数据                         |
| 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同             |
| 幻读       | 一个事务按照条件查询数据时，没有对应的数据行，但是再插入数据时，又发现这行数据已经存在 |

> 这三个问题的详细演示：https://www.bilibili.com/video/BV1Kr4y1i7ru?p=55cd 

并发事务隔离级别：

|          | 隔离级别              | 脏读 | 不可重复读 | 幻读 |
| -------- | --------------------- | ---- | ---------- | ---- |
| 读未提交 | Read uncommitted      | √    | √          | √    |
| 读已提交 | Read committed        | ×    | √          | √    |
| 可重复读 | Repeatable Read(默认) | ×    | ×          | √    |
| 串行化   | Serializable          | ×    | ×          | ×    |

- √表示在当前隔离级别下该问题会出现
- Serializable 性能最低；Read uncommitted 性能最高，数据安全性最差

查看事务隔离级别：
`SELECT @@TRANSACTION_ISOLATION;`

设置事务隔离级别：
`SET [ SESSION | GLOBAL ] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE };`
SESSION 是会话级别，表示只针对当前会话有效，GLOBAL 表示对所有会话有效



## Mysql 视图

### 一、Mysql视图

1、不能在视图中删除、添加、修改

2、视图基于表存在，若表中数据被清理，则视图不能打开。若添加数据满足连接条件，则视图中也会进行展示。

```sql
create view <视图名> as (select...(查询的结果))
```

## Mysql 索引

### 一、索引创建

```sql
create index <索引名> on <表名>(<字段名>)
```

查看效率

```sql
explain select * from <表名> where id = 1
```

索引字段表格含义

| select_type | type     | possible_keys | key      | key_len      | rows     | Extra |
| ----------- | -------- | ------------- | -------- | ------------ | -------- | ----- |
| 查询的类型  | 获取方式 | 可能索引      | 真正索引 | 索引所占空间 | 搜索条数 | 其他  |

详细索引字段表格含义

+ **id 执行编号** 标识select所属的行。如果在语句中没子查询或关联查询，只有唯一的select，每行都将显示1。否则，内层的select语句一般会顺序编号，对应于其在原始语句中的位置
+ **select_type**  显示本行是简单或复杂查询。
  + 如果查询有任何复杂的子查询，则最外层标记为PRIMARY(DERIVED、UNION、UNION RESUlT)
+ **table** 访问哪个表
+ **type** 数据访问/读取操作类型
  + (ALL、index、range、ref、eq_ref、const/system、NULL)
+ **possible_keys** 揭示哪一些索引可能有利于高效的查找
+ **key** 显示Mysql最终采用哪个索引来优化查询
+ **key_len** 显示mysql在索引里使用的字节数
+ **ref** 显示了之前的表在key列记录的索引中查找值所用的列或常量
+ **rows** 为了找到所需的行而需要读取的行数，估算值，不精确。通过把所有rows列值相乘，可粗略估算整个查询会检查的行数
+ **Extra** 额外信息，如using index、filesort等

### 二、使用规则

#### 1、最左前缀法则

如果索引关联了多列（联合索引），要遵守最左前缀法则，最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。
如果跳跃某一列，索引将部分失效（后面的字段索引失效）。

联合索引中，出现范围查询（<, >），范围查询右侧的列索引失效。可以用>=或者<=来规避索引失效问题。

#### 2、索引失效情况

1. 在索引列上进行运算操作，索引将失效。如：`explain select * from tb_user where substring(phone, 10, 2) = '15';`
2. 字符串类型字段使用时，不加引号，索引将失效。如：`explain select * from tb_user where phone = 17799990015;`，此处phone的值没有加引号
3. 模糊查询中，如果仅仅是尾部模糊匹配，索引不会是失效；如果是头部模糊匹配，索引失效。如：`explain select * from tb_user where profession like '%工程';`，前后都有 % 也会失效。
4. 用 or 分割开的条件，如果 or 其中一个条件的列没有索引，那么涉及的索引都不会被用到。
5. 如果 MySQL 评估使用索引比全表更慢，则不使用索引。

#### 3、SQL 提示

是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的。

例如，使用索引：
`explain select * from tb_user use index(idx_user_pro) where profession="软件工程";`
不使用哪个索引：
`explain select * from tb_user ignore index(idx_user_pro) where profession="软件工程";`
必须使用哪个索引：
`explain select * from tb_user force index(idx_user_pro) where profession="软件工程";`

use 是建议，实际使用哪个索引 MySQL 还会自己权衡运行速度去更改，force就是无论如何都强制使用该索引。

#### 4、覆盖索引&回表查询

尽量使用覆盖索引（查询使用了索引，并且需要返回的列，在该索引中已经全部能找到），减少 select *。

explain 中 extra 字段含义：
`using index condition`：查找使用了索引，但是需要回表查询数据
`using where; using index;`：查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询

如果在聚集索引中直接能找到对应的行，则直接返回行数据，只需要一次查询，哪怕是select \*；如果在辅助索引中找聚集索引，如`select id, name from xxx where name='xxx';`，也只需要通过辅助索引(name)查找到对应的id，返回name和name索引对应的id即可，只需要一次查询；如果是通过辅助索引查找其他字段，则需要回表查询，如`select id, name, gender from xxx where name='xxx';`

所以尽量不要用`select *`，容易出现回表查询，降低效率，除非有联合索引包含了所有字段

面试题：一张表，有四个字段（id, username, password, status），由于数据量大，需要对以下SQL语句进行优化，该如何进行才是最优方案：
`select id, username, password from tb_user where username='itcast';`

解：给username和password字段建立联合索引，则不需要回表查询，直接覆盖索引

#### 5、前缀索引

当字段类型为字符串（varchar, text等）时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘IO，影响查询效率，此时可以只降字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。

语法：`create index idx_xxxx on table_name(columnn(n));`
前缀长度：可以根据索引的选择性来决定，而选择性是指不重复的索引值（基数）和数据表的记录总数的比值，索引选择性越高则查询效率越高，唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。
求选择性公式：

```mysql
select count(distinct email) / count(*) from tb_user;
select count(distinct substring(email, 1, 5)) / count(*) from tb_user;
```

show index 里面的sub_part可以看到接取的长度

#### 6、单列索引&联合索引

单列索引：即一个索引只包含单个列
联合索引：即一个索引包含了多个列
在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。

单列索引情况：
`explain select id, phone, name from tb_user where phone = '17799990010' and name = '韩信';`
这句只会用到phone索引字段

##### 注意事项

- 多条件联合查询时，MySQL优化器会评估哪个字段的索引效率更高，会选择该索引完成本次查询

### 三、设计原则

1. 针对于数据量较大，且查询比较频繁的表建立索引
2. 针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引
3. 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高
4. 如果是字符串类型的字段，字段长度较长，可以针对于字段的特点，建立前缀索引
5. 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率
6. 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价就越大，会影响增删改的效率
7. 如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询

### 四、索引结构

| 索引结构            | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| B+Tree              | 最常见的索引类型，大部分引擎都支持B+树索引                   |
| Hash                | 底层数据结构是用哈希表实现，只有精确匹配索引列的查询才有效，不支持范围查询 |
| R-Tree(空间索引)    | 空间索引是 MyISAM 引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少 |
| Full-Text(全文索引) | 是一种通过建立倒排索引，快速匹配文档的方式，类似于 Lucene, Solr, ES |

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

| 索引       | InnoDB        | MyISAM | Memory |
| ---------- | ------------- | ------ | ------ |
| B+Tree索引 | 支持          | 支持   | 支持   |
| Hash索引   | 不支持        | 不支持 | 支持   |
| R-Tree索引 | 不支持        | 支持   | 不支持 |
| Full-text  | 5.6版本后支持 | 支持   | 不支持 |

#### 1、B-Tree



<img src="https://dhc.pythonanywhere.com/media/editor/二叉树_20220316153214227108.png" alt="二叉树" title="二叉树" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

二叉树的缺点可以用红黑树来解决：

<img src="https://dhc.pythonanywhere.com/media/editor/红黑树_20220316163142686602.png" alt="红黑树" title="红黑树" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

红黑树也存在大数据量情况下，层级较深，检索速度慢的问题。

为了解决上述问题，可以使用 B-Tree 结构。
B-Tree (多路平衡查找树) 以一棵最大度数（max-degree，指一个节点的子节点个数）为5（5阶）的 b-tree 为例（每个节点最多存储4个key，5个指针）

<img src="https://dhc.pythonanywhere.com/media/editor/B-Tree结构_20220316163813441163.png" alt="B-Tree结构" style="zoom:67%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

> B-Tree 的数据插入过程动画参照：https://www.bilibili.com/video/BV1Kr4y1i7ru?p=68
> 演示地址：https://www.cs.usfca.edu/~galles/visualization/BTree.html

#### 2、B+Tree

结构图：

<img src="https://dhc.pythonanywhere.com/media/editor/B+Tree结构图_20220316170700591277.png" alt="B+Tree结构图" style="zoom:67%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

> 演示地址：https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html

与 B-Tree 的区别：

- 所有的数据都会出现在叶子节点
- 叶子节点形成一个单向链表

MySQL 索引数据结构对经典的 B+Tree 进行了优化。在原 B+Tree 的基础上，增加一个指向相邻叶子节点的链表指针，就形成了带有顺序指针的 B+Tree，提高区间访问的性能。

<img src="https://dhc.pythonanywhere.com/media/editor/结构图_20220316171730865611.png" alt="MySQL B+Tree 结构图" style="zoom:67%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />

#### 3、Hash

哈希索引就是采用一定的hash算法，将键值换算成新的hash值，映射到对应的槽位上，然后存储在hash表中。
如果两个（或多个）键值，映射到一个相同的槽位上，他们就产生了hash冲突（也称为hash碰撞），可以通过链表来解决。

<img src="https://dhc.pythonanywhere.com/media/editor/Hash索引原理图_20220317143226150679.png" alt="Hash索引原理图" style="zoom: 50%; box-shadow: rgba(0, 0, 0, 0) 0px 1px 5px 0px;" />

特点：

- Hash索引只能用于对等比较（=、in），不支持范围查询（betwwn、>、<、...）
- 无法利用索引完成排序操作
- 查询效率高，通常只需要一次检索就可以了，效率通常要高于 B+Tree 索引

存储引擎支持：

- Memory
- InnoDB: 具有自适应hash功能，hash索引是存储引擎根据 B+Tree 索引在指定条件下自动构建的

#### 4、面试题

1. 为什么 InnoDB 存储引擎选择使用 B+Tree 索引结构？

- 相对于二叉树，层级更少，搜索效率高
- 对于 B-Tree，无论是叶子节点还是非叶子节点，都会保存数据，这样导致一页中存储的键值减少，指针也跟着减少，要同样保存大量数据，只能增加树的高度，导致性能降低
- 相对于 Hash 索引，B+Tree 支持范围匹配及排序操作

### 五、索引分类

| 分类     | 含义                                                 | 特点                     | 关键字   |
| -------- | ---------------------------------------------------- | ------------------------ | -------- |
| 主键索引 | 针对于表中主键创建的索引                             | 默认自动创建，只能有一个 | PRIMARY  |
| 唯一索引 | 避免同一个表中某数据列中的值重复                     | 可以有多个               | UNIQUE   |
| 常规索引 | 快速定位特定数据                                     | 可以有多个               |          |
| 全文索引 | 全文索引查找的是文本中的关键词，而不是比较索引中的值 | 可以有多个               | FULLTEXT |

在 InnoDB 存储引擎中，根据索引的存储形式，又可以分为以下两种：

| 分类                      | 含义                                                       | 特点                 |
| ------------------------- | ---------------------------------------------------------- | -------------------- |
| 聚集索引(Clustered Index) | 将数据存储与索引放一块，索引结构的叶子节点保存了行数据     | 必须有，而且只有一个 |
| 二级索引(Secondary Index) | 将数据与索引分开存储，索引结构的叶子节点关联的是对应的主键 | 可以存在多个         |

演示图：

<img src="https://dhc.pythonanywhere.com/media/editor/原理图_20220318194454880073.png" alt="大致原理" style="zoom: 50%; box-shadow: rgba(0, 0, 0, 0) 0px 1px 5px 0px;" />
<img src="https://dhc.pythonanywhere.com/media/editor/演示图_20220319215403721066.png" alt="演示图" title="演示图" style="zoom: 50%; box-shadow: rgba(0, 0, 0, 0) 0px 1px 5px 0px;" />

聚集索引选取规则：

- 如果存在主键，主键索引就是聚集索引
- 如果不存在主键，将使用第一个唯一(UNIQUE)索引作为聚集索引
- 如果表没有主键或没有合适的唯一索引，则 InnoDB 会自动生成一个 rowid 作为隐藏的聚集索引

**思考题**

1\. 以下 SQL 语句，哪个执行效率高？为什么？

```mysql
select * from user where id = 10;
select * from user where name = 'Arm';
-- 备注：id为主键，name字段创建的有索引
```

答：第一条语句，因为第二条需要回表查询，相当于两个步骤。

2\. InnoDB 主键索引的 B+Tree 高度为多少？

答：假设一行数据大小为1k，一页中可以存储16行这样的数据。InnoDB 的指针占用6个字节的空间，主键假设为bigint，占用字节数为8.
可得公式：`n * 8 + (n + 1) * 6 = 16 * 1024`，其中 8 表示 bigint 占用的字节数，n 表示当前节点存储的key的数量，(n + 1) 表示指针数量（比key多一个）。算出n约为1170。

如果树的高度为2，那么他能存储的数据量大概为：`1171 * 16 = 18736`；
如果树的高度为3，那么他能存储的数据量大概为：`1171 * 1171 * 16 = 21939856`。

## SQL 优化

### 一、插入数据

普通插入：

1. 采用批量插入（一次插入的数据不建议超过1000条）
2. 手动提交事务
3. 主键顺序插入

大批量插入：
如果一次性需要插入大批量数据，使用insert语句插入性能较低，此时可以使用MySQL数据库提供的load指令插入。

```mysql
# 客户端连接服务端时，加上参数 --local-infile（这一行在bash/cmd界面输入）
mysql --local-infile -u root -p
# 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关
set global local_infile = 1;
select @@local_infile;
# 执行load指令将准备好的数据，加载到表结构中
load data local infile '/root/sql1.log' into table 'tb_user' fields terminated by ',' lines terminated by '\n';
```

### 二、主键优化

数据组织方式：在InnoDB存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为索引组织表（Index organized table, IOT）

页分裂：页可以为空，也可以填充一般，也可以填充100%，每个页包含了2-N行数据（如果一行数据过大，会行溢出），根据主键排列。
页合并：当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记（flaged）为删除并且它的空间变得允许被其他记录声明使用。当页中删除的记录到达 MERGE_THRESHOLD（默认为页的50%），InnoDB会开始寻找最靠近的页（前后）看看是否可以将这两个页合并以优化空间使用。

MERGE_THRESHOLD：合并页的阈值，可以自己设置，在创建表或创建索引时指定

> 文字说明不够清晰明了，具体可以看视频里的PPT演示过程：https://www.bilibili.com/video/BV1Kr4y1i7ru?p=90

主键设计原则：

- 满足业务需求的情况下，尽量降低主键的长度
- 插入数据时，尽量选择顺序插入，选择使用 AUTO_INCREMENT 自增主键
- 尽量不要使用 UUID 做主键或者是其他的自然主键，如身份证号
- 业务操作时，避免对主键的修改

### 三、order by优化

1. Using filesort：通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区 sort buffer 中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序
2. Using index：通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高

如果order by字段全部使用升序排序或者降序排序，则都会走索引，但是如果一个字段升序排序，另一个字段降序排序，则不会走索引，explain的extra信息显示的是`Using index, Using filesort`，如果要优化掉Using filesort，则需要另外再创建一个索引，如：`create index idx_user_age_phone_ad on tb_user(age asc, phone desc);`，此时使用`select id, age, phone from tb_user order by age asc, phone desc;`会全部走索引

总结：

- 根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则
- 尽量使用覆盖索引
- 多字段排序，一个升序一个降序，此时需要注意联合索引在创建时的规则（ASC/DESC）
- 如果不可避免出现filesort，大数据量排序时，可以适当增大排序缓冲区大小 sort_buffer_size（默认256k）

### 四、group by优化

- 在分组操作时，可以通过索引来提高效率
- 分组操作时，索引的使用也是满足最左前缀法则的

如索引为`idx_user_pro_age_stat`，则句式可以是`select ... where profession order by age`，这样也符合最左前缀法则

### 五、limit优化

常见的问题如`limit 2000000, 10`，此时需要 MySQL 排序前2000000条记录，但仅仅返回2000000 - 2000010的记录，其他记录丢弃，查询排序的代价非常大。
优化方案：一般分页查询时，通过创建覆盖索引能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化

例如：

```mysql
-- 此语句耗时很长
select * from tb_sku limit 9000000, 10;
-- 通过覆盖索引加快速度，直接通过主键索引进行排序及查询
select id from tb_sku order by id limit 9000000, 10;
-- 下面的语句是错误的，因为 MySQL 不支持 in 里面使用 limit
-- select * from tb_sku where id in (select id from tb_sku order by id limit 9000000, 10);
-- 通过连表查询即可实现第一句的效果，并且能达到第二句的速度
select * from tb_sku as s, (select id from tb_sku order by id limit 9000000, 10) as a where s.id = a.id;
```

### 六、count优化

MyISAM 引擎把一个表的总行数存在了磁盘上，因此执行 count(\*) 的时候会直接返回这个数，效率很高（前提是不适用where）；
InnoDB 在执行 count(\*) 时，需要把数据一行一行地从引擎里面读出来，然后累计计数。
优化方案：自己计数，如创建key-value表存储在内存或硬盘，或者是用redis

count的几种用法：

- 如果count函数的参数（count里面写的那个字段）不是NULL（字段值不为NULL），累计值就加一，最后返回累计值
- 用法：count(\*)、count(主键)、count(字段)、count(1)
- count(主键)跟count(\*)一样，因为主键不能为空；count(字段)只计算字段值不为NULL的行；count(1)引擎会为每行添加一个1，然后就count这个1，返回结果也跟count(\*)一样；count(null)返回0

各种用法的性能：

- count(主键)：InnoDB引擎会遍历整张表，把每行的主键id值都取出来，返回给服务层，服务层拿到主键后，直接按行进行累加（主键不可能为空）
- count(字段)：没有not null约束的话，InnoDB引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，服务层判断是否为null，不为null，计数累加；有not null约束的话，InnoDB引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，直接按行进行累加
- count(1)：InnoDB 引擎遍历整张表，但不取值。服务层对于返回的每一层，放一个数字 1 进去，直接按行进行累加
- count(\*)：InnoDB 引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加

按效率排序：count(字段) < count(主键) < count(1) < count(\*)，所以尽量使用 count(\*)

### 七、update优化（避免行锁升级为表锁）

InnoDB 的行锁是针对索引加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁升级为表锁。

如以下两条语句：
`update student set no = '123' where id = 1;`，这句由于id有主键索引，所以只会锁这一行；
`update student set no = '123' where name = 'test';`，这句由于name没有索引，所以会把整张表都锁住进行数据更新，解决方法是给name字段添加索引



1、MySQL 数据库什么情况下索引无效

1.1、什么情况下有索引，但用不上？
如果条件中有 or，即使其中有部分条件带索引也不会使用。
注意：要想使用 or，又想让索引生效，只能将 or 条件中的每个列都加上索引。
Like 查询以%开头，不使用索引
存在索引列的数据类型隐形转换，则用不上索引，比如列类型是字符串，那一定要在条件中将数据
使用引号引用起来, 否则不使用索引
Where 子句里对索引列上有数学运算，用不上索引
Where 子句中对索引列使用函数，用不上索引
Mysql 预测使用全表扫描要比用索引快，不使用索引
1.2、什么情况下不推荐使用索引？
数据唯一性差的字段不要使用索引
频繁更新的字段不要使用索引
字段不在 where 语句中出现时不要添加索引，如果 where 后含 IS NULL/IS NOT NULL/LIKE ‘%输
入符%’等条件，不要使用索引
Where 子句里对索引使用不等于（<>），不建议使用索引

2、MySQL优化会不会、mycat 分库，垂直分库，水平分库?

(1) 查询慢查询日志
(2) 基于explain 查询 是否走索引
(3) 只需要一行数据时使用 limit 1
(4) 为搜索字段添加索引
(5) 千万不要 ORDER BY RAND()
(6) 尽量避免大事务操作，提⾼系统并发能力。
(7) 永远为每张表设置一个 ID
(8) 使用 ENUM 而不是 VARCHAR
(9) 尽可能的让字段 NOT NULL
(10) 垂直分库：“垂直分割”是一种把数据库中的表按列变成几张表的方法，这样可以降低表的复杂
度和字段的数目，从而达到优化的目的。
(11) 水平分库：“水平分割”是一种把数据库中的表按行变成几张表的方法，这样可以降低表的复杂
度和字段的数目，从而达到优化的目的。
(12) 选择正确的存储引擎
(13) Update 语句，如果只更改1、2个字段，不要Update全部字段，否则频繁调用会引起明显的性
能消耗，同时带来大量日志。
(14) 对于多张大数据量（这里几百条就算大了）的表JOIN，要先分页再JOIN，否则逻辑读会很高，
性能很差。

3、SQL语句优化

(1) 避免在列上做运算，可能会导致索引失败
(2) 使用 join 时应该小结果集驱动大结果集，同时把复杂的 join 查询拆分成多个 query， 不然
join(连接) 越多的表，会导致越多的锁定和堵塞。
(3) 注意 like 模糊查询的使用，避免使用 '%A%'
(4) 不要使用 select * 节省内存
(5) 使用批量插入语句，节省交互
(6) Limit 基数比较大时，使用 between and
(7) 不要使用 rand 函数随机获取记录
(8) 避免使用 null，建表时，尽量设置 not null，提高查询性能
(9) 不要使用 count（id），应该使用 count（*）
(10) From 语句中一定不要使用子查询
(11) 使用更多的 where 加以限制，缩小查找范围
(12) 使用 explain 查看 sql 性能