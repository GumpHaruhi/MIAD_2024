# CatalogPage

```
@Component
struct CatalogPage {
  @Link user: Account;
  @Link currentClock: SandClock;
  ...
```

在 CatalogPage 类里，@Link 修饰的 user 变量即为当前登录的用户信息。可以这样调用

```
user.accountName: string
user.accountPassword: string
```

currentClock 是当前应该展示的沙漏，这个变量关联到沙漏展示页面 ClockShowPage

> 注意！初次注册的用户和正常登录的
>
> 用户在这里没有做区分，因为要先做好数据存储才能做到区分

这页的工作大概有以下几点

### 1.初始化函数

要给 CatalogPage 类编写一个初始化函数，每当用户切换到当前页时都调用一次。可能的逻辑：

- 检查 user 的信息：
  - 如果 user 信息为空 `user.accountName === ''`：则什么都不做，在页面中显示一行文本，如“您尚未登录”
  - 如果 user 信息不为空则继续
- 到本地存储中匹配：可以使用 http 通信+本地 html 文件，或者干脆输出到本地文件（比如 .txt, .cmm 文件）
- 初始化函数期望输出：当前用户所拥有的所有沙漏的信息，可以是一个数组：

```
let sandClockList: SandClock[]
// 当初始化函数调用完成时，要么报告“用户未登录”，要么有一个已经填充好的数组
```



### 2.本地数据存储

可以了解一下 `JSON.parse()` 函数，可以直接将 struct 类的实例转化成规范的 json 字符串

 本地的存储数据可能是这样的：

```
accountName: "LiHua",
accountPassword: "114514"

clockId: "1",
setDate: "2025.12.25",
clockDuration: "66666666",
clockCommit: "Merry Christmas"
clockId: "2",
setDate: "2025.1.1",
clockDuration: "88888888",
clockCommit: "fuck"
clockId: "3",
setDate: "2025.1.12",
clockDuration: "3000",
clockCommit: "this is a sand clock"

accountName: "HUAWEI",
accountPassword: "666"

clockId: "4"
setDate: "2025.1.15",
clockDuration: "787878787878",
clockCommit: "遥遥领先"
```

- ==**注意**==：我不确定 JSON.parse() 的输出格式是不是这样，上面只是个示例：必须要有一个账户信息对应若干沙漏信息

- ==**注意**==：我还没仔细研究 arkts 怎么获得当前的日期与时间。在 sandClock 的构建函数中是这样写的：

```
export default class SandClock {
  // 日期（年月日）和倒计时用的时间戳应该区分开
  // 沙漏的备注信息
  clockCommit: string = Constant.DEFAULT_CLOCK_COMMIT
  clockId: number = Constant.DEFAULT_CLOCK_ID;
  setDate: number;          // 起始时间
  clockDuration: number = 0;    // 持续时间

  constructor() {
    let currentDate = new Date();
    this.setDate = currentDate.getDate();
  }
}
```

调用了 Date 类的 getDate() 接口，但是我实际上并不知道这个接口会返回什么东西，能不能用来计时。所以这部分需要重新验证

- user.accountName 账户名可能没有出现在存储中，此时就认为这是一个新用户，为其新建一列
- ==必须提供两个接口：==
  - `read(user: Account) => sandClockList: SandClock[]`：根据 user 的两个字符串参数匹配到的所有沙漏，返回由沙漏类组成的数组，允许为空数组
  - `write(user: Account, clock: SandClock) => void`：将 clock 的内容写到 user 下
- ==可能需要的接口：==
  - `check(user: Account) => bool `：检查是否存在账户，返回布尔值
  - `clear() => void`：清空所有信息
  - `removeAccount(user) => void` ：移除某一用户及其沙漏
  - `removeClock(user, clock) => void`：移除某一用户的某一沙漏



### 3.沙漏目录界面（多线程）

这部分将在 build() 方法中布局：

- 如果用户未登录，只显示 “用户未登录”
- sandClockList 已经在初始化函数中完成填充。如果 sandClockList 为空，则显示文本“尚未创建任何沙漏”
- 如果 sandClockList 不为空，则罗列多个 Row()，每行展示一个沙漏：
  - 沙漏的名字
  - 沙漏的创建时间
  - **沙漏的剩余时间**
  - 沙漏的备注信息 clockCommit 
- 注意，给每一个沙漏创建一个线程，因此沙漏的剩余时间是一直在更新的
- 维护链接变量 `currentClock`，默认指向最新的（数组最后的）一个沙漏，（但其实这不是一个指针，所以应该采用复制的策略来赋值） 。每一个沙漏都可以被选为展示沙漏（**所以可能每一行还要设置一个按钮？**）
- **一个“新建”按钮**：点击之后可以出现一个弹窗（或者干脆把输入框放在页面里），用户将在弹窗中填入基本信息，新建一个沙漏
  - 关于输入框与“确认”“取消”按钮，在 LogPage 中我已经做出了代码示范
  - 新建的按钮应该立即调用存储模块的  `write()` 接口写入存储
  - 新建按钮之后，应该刷新一次 CatalogPage，保证能在页面中看到新按钮、
- 沙漏的删除，可以暂时不考虑



# ClockShowPage

```
@Component
struct ShowPage {
  @Link clock: SandClock;
```

其中 clock 变量就是这个页面应该展示的沙漏（这个变量与 CatalogPage 关联）

你将调用：

```
clock.clockState: number   // 查询沙漏状态
```

约定状态：

- 0：没有意义，这不是一个实际存在的沙漏，这个页面应该显示：“尚未选择任何沙漏”
- 1：有意义，且沙漏在运行，显示倒计时效果
- 2：有意义，且沙漏已经运行完毕，展示一个静态的沙漏，以及说明文本：~~主人，你的沙漏流完了~~



# 项目管理

我们是不是该开一个 github 或 gitlab ？

以及上面的提到的**多线程**、**存储**最好写成独立的模块，只提供接口，而不是直接在 CatalogPage.ets 里直接写。

模块放在 Module 文件夹下，存储文件放在 resource 文件夹下

==总结==：

- 存储模块：提供接口 read, write
- 多线程模块：我还没学，但应该是：接受一个 SandClock 对象并为之发起一个线程，假设先叫 interface 接口
- 沙漏目录界面：通过调用 read, write, interface ，维护 currentClock 变量、sandClockList 变量，完成初始化函数和新建沙漏的逻辑

