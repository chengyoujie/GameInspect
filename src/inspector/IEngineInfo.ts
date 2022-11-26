export interface IEngineInfo<T>{
    /**
     * 引擎名字 多个引擎的时候不能重复
     * 如需替换默认的 可以选择下列名字：Laya  Egret  Cocos2dx  Cocos
     */
    name:string;

    /**引擎版本 */
    version:string;

    /**引擎的基础类 */
    baseCls:{new(...args:any):T};
    
    /**当前环境是否有该引擎 */
    haveEngine():boolean;

    /**
     * haveEngine() 返回true时  初始化 
     */
    init():void;
    
    /**
     * haveEngine() 返回true时 开始执行引擎逻辑 
     * @param onClickFun        当玩家点击游戏内对象时调用  target为点击对象  / 如未调用 则玩家点击游戏后 GameInspect 界面不会跳转到对应的节点
     * @param onMouseMoveFun    当玩家鼠标按下并移动时调用  target为移动到什么对象上  / 如未调用 则玩家按下并移动到游戏内物体上时 GameInspect 界面不会跳转到对应的节点
     */
    start(onClickFun:(target:T)=>void, onMouseMoveFun:(target:T)=>void):void;

    /**
     * 获取node节点的子节点
     * @param obj 
     */
    getChildren(obj:T):T[]

    /**
     * 获取obj的父对象
     * @param obj 
     */
    getParent(obj:T):T;

    /**
     * 游戏的根节点
     */
    stage:T;

    /**
     * 在舞台上绘制对象所在位置
     * 绘制对象的  getObjName(obj)获取的name属性 最好为  `$GAME_INSPECT_MASK` 方便 GameInspect 界面的列表中过滤掉
     * @param obj 
     */
    drawMask(obj:T):void;
    
    /**
     * 清理在舞台上绘制的对象位置
     */
    clearMask():void;

    /**
     * 根据obj 返回要返回什么属性
     * @param obj 
     */
    getPropNames?(obj:T):string[]

    /**
     * 根据 obj 返回要过滤掉什么属性不显示
     * @param obj 
     */
    getNotShowPropNames?(obj:T):string[]

    /**
     * 返回obj 显示节点 对应的类的名字  显示在节点列表
     * 【如果没有注册的时候会设置为默认方法】
     * @param obj 
     */
    getClassName?(obj:T):string;

    /**
     * 根据obj 返回对应TreeNode 对象， 一般无需实现
     * 【如果没有注册的时候会设置为默认方法】
     * @param obj 
     */
    // getTreeNode?(obj:T):TreeNode;

    /**
     * 根据 obj 返回要显示的属性详细信息  
     * 【如果没有注册的时候会设置为默认方法】
     * @param obj 
     * @param showPrivate  是否显示私有变量
     * @param showFunction  是否显示方法
     */
    // getProps?(obj:T, showPrivate?:boolean, showFunction?:boolean):{[name:string]:PropNode};

    /**
     * 节点是否可用  如obj==null 或者 已经释放掉了 需要返回false
     * @param obj 
     */
    canUse(obj:T):boolean;

    /**
     * 获取 obj 的名字 显示在节点类型的前面 如果为空则不显示，
     * @param obj 
     */
    getObjName(obj:T):string;
    

    /**
     * 获取当前节点是否显示
     * @param obj 
     */
    getVisible(obj:T):boolean;

    /**
     * 设置 游戏是否禁用掉鼠标事件
     * @param value 
     */
    setMouseEnable(value:boolean):void;

    /**
     * 设置obj是否可见
     * @param obj 
     * @param value 
     */
    setVisible(obj:T, value:boolean):void;

    /**
     * 是否显示FPS
     * @param value 
     */
    showFPS(value:boolean):void;
}