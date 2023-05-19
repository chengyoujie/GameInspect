
# Chrome 扩展 引擎部分的代码 

如需要修改或新增引擎的支持，可以执行以下操作

## 1. 安装

需要安装node环境

在code/目录下执行   `npm install` 命令安装所需的依赖项



## 2. 使用

1. 修改引擎代码后，在code/目录下执行  `webpack` 指令， 生成到 `dist/engine.js` 文件。
2. 将`dist/engine.js`文件覆盖 插件的`dist/js/engine.js`文件， 刷新浏览器后即可使用。

## 3. 接口说明

 	1. 如自定义引擎，需要实现 `code/src/common/IEngineInfo.ts`中的`IEngineInfo<T>`接口(其中T为引擎的所有显示对象的基类)。  实现后可以在`EngineManager`的`init()`方法中添加到`defaultEngines`变量中，或者调用`register`方法注册进去。
 	1. 如需要自定义插件的一些操作可以在window对象上新增`getGameInspectUserCostomEngine()`方法，返回实现`code/scr/common/IUserCostomEngine.ts`中的`IUserCostomEngine`接口。

