---
date: 2022-1-08 14:54:44
author: WangXinYi
img: /images/homePage/剑指offer.webp
top: false
summary: 剑指offer二刷总结
categories:
  - 算法
  - C++
tags:
  - 算法
  - C++
typora-root-url: ..

---

`bits/stdc++.h`是一个包含很多头文件的万能头文件，使用`bits/stdc++.h`可以避免代码头文件过长，可以说非常方便。

但是目前devcpp没有包含这个头文件，需要手工添，

目录如下：`\Dev-Cpp\MinGW64\lib\gcc\x86_64-w64-mingw32\4.9.2\include\c++\bits`

添加 bits/stdc++.h

<img src="/images/%E5%89%91%E6%8C%87offer/image-20230406103122438.png" alt="image-20230406103122438" style="zoom:50%;" />

内容如下：

```cpp
// 17.4.1.2 Headers
// C
#ifndef _GLIBCXX_NO_ASSERT
#include <cassert>
#endif
#include <cctype>
#include <cerrno>
#include <cfloat>
#include <ciso646>
#include <climits>
#include <clocale>
#include <cmath>
#include <csetjmp>
#include <csignal>
#include <cstdarg>
#include <cstddef>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#if __cplusplus >= 201103L
#include <ccomplex>
#include <cfenv>
#include <cinttypes>
#include <cstdalign>
#include <cstdbool>
#include <cstdint>
#include <ctgmath>
#include <cwchar>
#include <cwctype>
#endif
// C++
#include <algorithm>
#include <bitset>
#include <complex>
#include <deque>
#include <exception>
#include <fstream>
#include <functional>
#include <iomanip>
#include <ios>
#include <iosfwd>
#include <iostream>
#include <istream>
#include <iterator>
#include <limits>
#include <list>
#include <locale>
#include <map>
#include <memory>
#include <new>
#include <numeric>
#include <ostream>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <stdexcept>
#include <streambuf>
#include <string>
#include <typeinfo>
#include <utility>
#include <valarray>
#include <vector>
#if __cplusplus >= 201103L
#include <array>
#include <atomic>
#include <chrono>
#include <condition_variable>
#include <forward_list>
#include <future>
#include <initializer_list>
#include <mutex>
#include <random>
#include <ratio>
#include <regex>
#include <scoped_allocator>
#include <system_error>
#include <thread>
#include <tuple>
#include <typeindex>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#endif

```

可以更改代码自动不全的快捷键ctrl+space 变为 ctrl+Enter

## 剑指Offer_链表中环的入口节点

### 相关链接

[剑指 Offer II 022. 链表中环的入口节点](https://leetcode.cn/problems/c32eOV/description/)

### 相关题目

给定一个链表，返回链表开始入环的第一个节点。 从链表的头节点开始沿着 `next` 指针进入环的第一个节点为环的入口节点。如果链表无环，则返回 `null`。

为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 `pos` 是 `-1`，则在该链表中没有环。**注意，`pos` 仅仅是用于标识环的情况，并不会作为参数传递到函数中。**

**说明：**不允许修改给定的链表。

**示例 1：**

<img src="/images/%E5%89%91%E6%8C%87offer/image-20221211113515090.png" alt="示例1" style="zoom:50%;box-shadow:rgba(0,0,0,0) 0 0px 0px 0px;" />

```
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
```
### 解题思路

此题使用快慢指针，如果存在环，快慢指针一定会相遇，而此时`快慢指针相遇的位置` = `从相遇点到入环点的距离加上 n-1 圈的环长`。之后可以使慢指针与表头同时出发，相遇的位置就是环的入口。

```c
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        auto fast = head, slow = head;
        while(fast){
            if(fast->next == NULL) return NULL;
            fast = fast->next->next;
            slow = slow->next;
            if(fast == slow) {
                auto p = head;
                while(p != slow){
                    p = p->next;
                    slow = slow->next;     
                }
                return slow;
            }
        }
        return NULL;
    }
};
```

**证明如下：**

<img src="/images/%E7%AE%97%E6%B3%95-%E9%93%BE%E8%A1%A8%E4%B8%93%E9%A2%98/image-20221211113330346.png" alt="证明图" style="zoom: 80%;box-shadow:rgba(0,0,0,0) 0 1px 5px 0px;" />



> 设链表中 **环外** 部分的长度为 a。slow 指针进入环后，又走了 b 的距离与fast 相遇。
>
> 所以慢指针走过的距离为`a + b`
>
> 此时，fast 指针已经走完了环的 n 圈，因此它走过的总距离为 `a + n(b+c) + b `
>
> fast 指针走过的路程又等于慢指针的2倍，所以  `a + n(b+c) + b  `=`2 * (a + b)`
>
> 可化简为 ` a = c + (n−1)(b+c)`,根据公式结合图像可以看出 `快慢指针相遇的位置` = `从相遇点到入环点的距离加上 n-1 圈的环长`

## 剑指Offer_两个链表的第一个重合节点

### 相关链接

+ [剑指 Offer II 023. 两个链表的第一个重合节点 ](https://leetcode.cn/problems/3u1WK4/description/)

### 相关题目

给定两个单链表的头节点 `headA` 和 `headB` ，请找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 `null` 。

图示两个链表在节点 `c1` 开始相交**：**



<img src="/images/%E7%AE%97%E6%B3%95-%E9%93%BE%E8%A1%A8%E4%B8%93%E9%A2%98/image-20221211113011498.png" alt="示例1" style="zoom: 33%; box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;" />

题目数据 **保证** 整个链式结构中不存在环。

**注意**，函数返回结果后，链表必须 **保持其原始结构** 。

**示例 1：**

<img src="/images/%E7%AE%97%E6%B3%95-%E9%93%BE%E8%A1%A8%E4%B8%93%E9%A2%98/image-20221211113102248.png" alt="示例1" style="zoom: 33%; box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;" />

```C
输入：listA = [4,1,8,4,5], listB = [5,0,1,8,4,5]
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

### 解题思路

经典环的入口类问题，从A出发再走B的路程，和从B出发再走A的路程是距离是一样。可以根据这个特性求出链表重合的节点。

```c
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if(headA == nullptr || headB == nullptr) return nullptr;
        auto p1 = headA, p2 = headB;
        while(p1 != p2){
            p1 = p1 == nullptr ? headB : p1->next; 
            p2 = p2 == nullptr ? headA : p2->next;
        }
        return p1;
    }
};
```

