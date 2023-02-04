/**
 * Cocos Creator 2.x 和 3.x 适配鼠标点击事件接口
 */
export interface ICocosCreatorMouseEventAdapter{
    onMouseDown:(target?:cc.Vec2)=>void;
    onMouseMove:(target?:cc.Vec2)=>void;
    onMouseUp:()=>void;
    findTarget:(pos:cc.Vec2)=>void;
    setEnableEvent(value:boolean);
}

/**
 * Cocos Creator 2.x 和 3.x 适配绘制选中接点接口
 */
export interface ICocosCreatorDrawAdapter{
    getGraphicsComponentCls():typeof cc.Component;
    getDrawPositionInfo(obj:cc.BaseNode):cc.Rect;
    getMaskParent():cc.BaseNode;
}