
# Chrome 扩展   H5 游戏结构检查器  GameInspect  支持 Laya, egret, cocosCreate, cocos2d-js

## 1. 说明

仿照 `egret Inspect ` 制作的通用H5游戏列表查看器， 方便查看游戏结构， 修改属性，注入代码，查看shader,抓帧
[GitHub](https://github.com/chengyoujie/GameInspect)
![总览](https://img-blog.csdnimg.cn/c50ae0b6cb1d427db6eedf1ec3fb2a4c.png)




## 2.安装
`部分浏览器安装失败，可能是因为浏览器版本太低，升级浏览器版本`

2.1 下载到本地 `git clone https://github.com/chengyoujie/GameInspect.git`  或 [https://github.com/chengyoujie/GameInspect/releases/download/release/GameInspect_Alpha_v1.0.3.rar](https://github.com/chengyoujie/GameInspect/releases/download/release/GameInspect_Alpha_v1.0.3.rar)

2.2 打开 [chrome://extensions/](chrome://extensions/) 

2.3 打开**右上角**的**开发者模式**开关

![打开开发者模式](https://img-blog.csdnimg.cn/0ac7b0f0a1fb4b9e89d0ab056fb32234.png)

2.4 点击**左上角**的**加载已解压的扩展程序**

![在这里插入图片描述](https://img-blog.csdnimg.cn/d732650e2c4f4564a4c8cd4138bca198.png)

选择`dist`目录
![在这里插入图片描述](https://img-blog.csdnimg.cn/34129de5d0324bafb1621b05c6b3e5bf.png)


点击选择文件夹即可， 安装成功后如下图：

![安装成功后图片](https://img-blog.csdnimg.cn/3ae372ef2a864f3e8e1bba4b279f7ebc.png)

## 3. 使用说明

打开H5游戏, `F12`打开控制台面板， 选择控制台的`GameInspect`页签， 

顶部展示游戏信息， 控制FPS的显示， 

中间左侧展示游戏内的节点列表， 选择节点右键弹出节点的操作菜单， 点击节点的`+`号可以展开节点

中间右侧展示当前选中节点的属性信息， 双击属性后面的值可以修改属性



![GameInspect](https://img-blog.csdnimg.cn/7079e3d992e146c88e51129f77f5d19d.png)

## 4. 自定义扩展

本插件现已支持常用的 `Egret`, `Laya`, `CocosCreate`, `Cocos2dx-js`,`Pixi`   其中 `Cocos2dx-js`, `Pixi`支持不太全。也可以将其他引擎的实现或现有引擎的优化发送到`1137815160@qq.com`邮箱或者提交到`Github`中

如不能满足需求或者使用其他引擎，可以在游戏中实现 （具体参考 `src/inspector/IUserCostomEngine.ts` 和 `src/inspector/IEngineInfo.ts`）

```javascript
declare interface window{
    /**
     * 返回用户自定义引擎信息的函数
     */
    getGameInspectUserCostomEngine?():IUserCostomEngine;
}
```

## 5.注入代码
![注入代码](https://img-blog.csdnimg.cn/f457438f53fe4739b210061dbb1e20b1.png)



可以把自己的代码注入到指定网站

用户可以将自己的代码注入到指定的网站

最多可以注入`5M`左右

匹配规则说明：
```
执行一次：主要通过执行按钮执行， 不会匹配到任何网站
当前网址：下次进入与当前浏览器地址栏的地址相同时自动执行
游戏地址：引擎加载完毕后，找到含有引擎的iframe的地址，下次进入是如果匹配到对应的地址则执行代码
自 定 义：用户自己定义匹配规则，return true 表示匹配成功， return false 表示匹配失败
```
操作说明：
1. `新建`  新建一个脚本
2. `保存`  快捷键(`ctr+s`)将代码保存到chrome扩展的缓存中`注： 如果删除插件则保存的代码也会被删掉， 所以最好下载到本地`
3. `删除`	删除已保存的代码
4. `下载`	将保存的代码保存到本地
5. `导入`	将本地的代码导入到chrome扩展中


## 6. 修改记录查看
![修改记录查看](https://img-blog.csdnimg.cn/6c1f35d0289c49e2af038d64531e8e2d.png)

方便记录在属性面板修改的内容
1. 点击`记录修改`按钮开始记录要修改的内容,再次点击停止记录。
2. 在属性界面修改属性， 如果清除记录列表中某个节点的属性可以在`左侧节点`上`右键`选择`取消修改记录`。
3. 点击`查看修改`可以查看修改的内容。
4. 点击`清除记录`， 将之前的修改记录全部清除掉。
5. 如果要自定义记录格式，可以实现下面的方法
```javascript
export interface IUserCostomEngine {
	....
	/**
	 * 获取单条修改对应的内容
	 * @param findNode  节点obj对象
	 * @param propPath 属性路径 如 x   parent.x
	 * @param newValue 修改后的新值
	 */
	getRecoderStr?(findNode:any, propPath:string, newValue:any):string
}
```
## 7. 游戏控制(暂停，抓帧，查看修改Shader, 性能数据）
入口： 顶部右上角![游戏控制入口](https://img-blog.csdnimg.cn/becdf5c236db4e9faf4d1607e12e1d0e.png)
![GameControl界面](https://img-blog.csdnimg.cn/16b02554413c4883a4dcc946f391e8e5.png)
![性能数据](https://img-blog.csdnimg.cn/a90f3a8c85344b65aecc7876c532dc92.png)
游戏控制器

`【显示基准线】`：鼠标移动时 是否显示FPS, DrawCall, FrameLine鼠标所在x轴上的信息

`【显示帧抓取视图】`： 方便查看某一帧的渲染顺序 及 渲染时的顶点着色器和片元着色器代码

`【上一帧】`：跳转到当前帧的前一帧

`【下一帧】`：跳转到当前帧的前一帧

`【重新抓取】`：重新抓取当前帧的渲染顺序

`【显示大图】`：在游戏内显示高清的渲染图

`【暂停】`： 暂停游戏

`【下一帧】`： 暂停游戏，并播放下一帧

`【显示Shader】`： 显示/隐藏 当前页面的所有shader， 如果显示不全或者没有找到可以尝试点击【刷新游戏】按钮

`【执行Shader】`： 将当前编辑器内的shader编译后在游戏内运行

`【刷新游戏】`： 重新刷新游戏， 并优先注入重载的方法

`FPS`： 每秒多少帧

`DrawCall`： 每秒向GPU提交多少次绘制

`FrameTime`： 每帧执行的时间