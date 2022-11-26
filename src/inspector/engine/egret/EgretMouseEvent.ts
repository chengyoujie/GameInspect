export class EgretMouseEvent{
    public static EventPreName = "egretInspectEvent_";
    public static MOUSE_MOVE:string;// = DevMouseEvent.EventPreName+egret.Event.MOUSE_MOVE;
    public static MOUSE_DOWN:string;// = DevMouseEvent.EventPreName+egret.Event.MOUSE_DOWN;

    private static _point:egret.Point;
    private static _rect: egret.Rectangle;
    private static _target:egret.DisplayObject;
    public static enableMouseEvent = true;
    private static _asDownEvent:string;
    private static _mouseMoveTime:number = 500;
    private static _curMouseMoveTime:number = 0;

    
    public static start(){
        let s = this;
        s._point = new egret.Point();
        s._rect = new egret.Rectangle();
        s._asDownEvent = egret.TouchEvent.TOUCH_BEGIN;
        s.MOUSE_MOVE = EgretMouseEvent.EventPreName+egret.TouchEvent.TOUCH_MOVE;
        s.MOUSE_DOWN = EgretMouseEvent.EventPreName+s._asDownEvent;
        let stage = egret.sys.$TempStage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.handleMouseDownEvent, s)
        stage.addEventListener(egret.TouchEvent.TOUCH_END,  s.handleMouseUPEvent, s)
        stage.addEventListener(s._asDownEvent, s.handleMouseEvent, s)
        
        let oldSendTouchEvent = egret.TouchEvent.dispatchTouchEvent;
        egret.TouchEvent.dispatchTouchEvent = (target: egret.IEventDispatcher, type: string, bubbles?: boolean, cancelable?: boolean,
            stageX?: number, stageY?: number, touchPointID?: number, touchDown: boolean = false): boolean  => {
                if(!s.enableMouseEvent){
                    if(type == s._asDownEvent)
                    {
                        let stage = egret.sys.$TempStage;
                        s.check(stage, stageX, stageY);
                        return;
                    }
                }
                return oldSendTouchEvent.call(egret.TouchEvent, target, type, bubbles, cancelable, stageX, stageY, touchPointID, touchDown)   
        }
    }

    
    private static handleMouseDownEvent(e:egret.TouchEvent){
        let s = this;
        s._curMouseMoveTime = Date.now();
        let stage = egret.sys.$TempStage;
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.handleMouseMove, s)
    }
    private static handleMouseUPEvent(e:egret.TouchEvent){
        let s = this;
        let stage = egret.sys.$TempStage;
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,  s.handleMouseMove, s)
    }

    private static handleMouseMove(e:egret.TouchEvent){
        let s = this;
        let now = Date.now();
        if(now - s._curMouseMoveTime<s._mouseMoveTime)return;
        s._curMouseMoveTime = now;
        s.handleMouseEvent(e);
    }

    private static handleMouseEvent(e:egret.TouchEvent){
        let s = this;
        let stage = egret.sys.$TempStage;
        s.check(stage, e.stageX, e.stageY);
        if(s._target)stage.dispatchEventWith(EgretMouseEvent.EventPreName+e.type, true, s._target)
    }
    
    private static check(sp: egret.DisplayObject, stageX: number, stageY: number): egret.DisplayObject {
        if (sp != egret.sys.$TempStage && (!sp.visible || sp.scaleX == 0 || sp.scaleY == 0)) {
            return null;
        }
        let s = this;
        let m = sp.$getInvertedConcatenatedMatrix();
        if (m.a == 0 && m.b == 0 && m.c == 0 && m.d == 0) {//防止父类影响子类
            return null;
        }
        let localX = m.a * stageX + m.c * stageY + m.tx;
        let localY = m.b * stageX + m.d * stageY + m.ty;
        let rect = sp.$scrollRect ? sp.$scrollRect : sp.$maskRect;
        if (rect && !rect.contains(localX, localY)) {
            return null;
        }
        if (sp.$mask && !sp.$mask.$hitTest(stageX, stageY)) {
            return null
        }
        const children = sp.$children;
        if(children){
            let target: egret.DisplayObject = null;
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i];
                if (child.$maskedObject) {
                    continue;
                }
                target = s.check(child, stageX, stageY);
                if (target) {
                    s._target = target;
                    return target;
                }
            }
            // if (target) {
            //     return target;
            // }
        }else{
            let bounds = sp.$getContentBounds();
            if (bounds.contains(localX, localY))
            {
                s._target = sp;
                return sp;
            }
        }
        
        return null;
    }

    // private static $hitTest(sp:egret.DisplayObject, stageX: number, stageY: number): egret.DisplayObject {
    //     let s = this;
    //     if (!sp.visible || sp.scaleX == 0 || sp.scaleY == 0) {
    //         return null;
    //     }
    //     let m = sp.$getInvertedConcatenatedMatrix();
    //     if (m.a == 0 && m.b == 0 && m.c == 0 && m.d == 0) {//防止父类影响子类
    //         return null;
    //     }
    //     let bounds = sp.$getContentBounds();
    //     let localX = m.a * stageX + m.c * stageY + m.tx;
    //     let localY = m.b * stageX + m.d * stageY + m.ty;
    //     if (bounds.contains(localX, localY)) {
    //         if (!sp.$children) {//容器已经检查过scrollRect和mask，避免重复对遮罩进行碰撞。

    //             let rect = sp.$scrollRect ? sp.$scrollRect : sp.$maskRect;
    //             if (rect && !rect.contains(localX, localY)) {
    //                 return null;
    //             }
    //             if (sp.$mask && !sp.$mask.$hitTest(stageX, stageY)) {
    //                 return null;
    //             }
    //         }
    //         return sp;
    //     }
    //     return null;
    // }

}