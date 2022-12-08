# Chrome 扩展   H5 游戏结构检查器  GameInspect  支持 Laya, egret, cocosCreate, cocos2d-js, PIXI

## 1. 说明

仿照 `egret Inspect ` 制作的通用H5游戏列表查看器， 方便查看游戏结构， 修改属性，

![预览](https://img-blog.csdnimg.cn/9d2663f7116f492d8015b80b3ed11842.png)

## 2.安装

2.1 下载到本地 `git clone https://github.com/chengyoujie/GameInspect.git` 或者直接下载  [https://chengyoujie.github.io/GameInspect/version/GameInspect_Alpha_v1.0.1.rar](https://chengyoujie.github.io/GameInspect/version/GameInspect_Alpha_v1.0.2.rar) 

2.2 chrome浏览器内打开链接  [chrome://extensions/](chrome://extensions/) 

2.3 打开**右上角**的**开发者模式**开关

![打开开发者模式](https://img-blog.csdnimg.cn/0ac7b0f0a1fb4b9e89d0ab056fb32234.png)

2.4 点击**左上角**的**加载已解压的扩展程序**

![在这里插入图片描述](https://img-blog.csdnimg.cn/d732650e2c4f4564a4c8cd4138bca198.png)

选择`dist`目录

![选择文件夹](https://img-blog.csdnimg.cn/34129de5d0324bafb1621b05c6b3e5bf.png)

点击选择文件夹即可， 安装成功后如下图：

![安装成功后图片](https://img-blog.csdnimg.cn/3ae372ef2a864f3e8e1bba4b279f7ebc.png)

## 3. 使用说明

打开H5游戏, `F12`打开控制台面板， 选择控制台的`GameInspect`页签， 

顶部展示游戏信息， 控制FPS的显示， 

中间左侧展示游戏内的节点列表， 选择节点右键弹出节点的操作菜单， 点击节点的`+`号可以展开节点

中间右侧展示当前选中节点的属性信息， 双击属性后面的值可以修改属性



![GameInspect](https://img-blog.csdnimg.cn/7079e3d992e146c88e51129f77f5d19d.png)

## 4. 自定义扩展

本插件现已支持常用的 `Egret`, `Laya`, `CocosCreate`, `Cocos2dx-js`, `PIXI`   其中 `CocosCreate`, `Cocos2dx-js`, `PIXI` 支持不太全。也可以将其他引擎的实现或现有引擎的优化发送到`1137815160@qq.com`邮箱或者提交到`Github`中

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
ctr+s 保存代码
![注入代码](https://img-blog.csdnimg.cn/67c882a55773494a98d4e6dd6987ce9d.png)
