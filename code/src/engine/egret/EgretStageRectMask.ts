import { ConstVars } from "../../common/ConstVars";

/**
 * 绘制舞台上区域
 */
export class EgretStageRectMask  {
    private _rect:egret.Rectangle;
    private _tempPoint:egret.Point;
    private _mask:egret.Sprite;
    private _bindObj:egret.DisplayObject;

    constructor(){
        this._mask = new egret.Sprite();
        this._rect = new egret.Rectangle();
        this._tempPoint = new egret.Point();
        this._mask.name = ConstVars.StageMaskName;
    }

    public showRect(obj:egret.DisplayObject){
        let s = this;
        if(s._bindObj){
            s._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.clear, s)
        }
        s._bindObj = obj;
        s._bindObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.clear, s)
        if(!obj){
            if(s._mask.parent)s._mask.parent.removeChild(s._mask)
            return;
        }
        egret.sys.$TempStage.addChild(s._mask);
        s.refush();
    }

    public refush(){
        let s = this;
        let obj = s._bindObj;
        if(!obj)return;
        let scaleX = 1;
        let scaleY = 1;
        if(obj != egret.sys.$TempStage){
            scaleX = obj.scaleX;
            scaleY = obj.scaleY;
        }
        s._tempPoint.x = 0;
        s._tempPoint.y = 0;
        obj.localToGlobal(0, 0, s._tempPoint)
        let x = s._tempPoint.x;
        let y = s._tempPoint.y;
        let width = Math.max(20, obj.width)*scaleX;
        let height = Math.max(20, obj.height)*scaleY;
        
        if(s._rect.x == x && s._rect.y == y && s._rect.width == width && s._rect.height == height){
            return;
        }
        s._rect.x = x;
        s._rect.y = y;
        s._rect.width = width;
        s._rect.height = height;

        s._mask.graphics.clear();
        s._mask.graphics.lineStyle(1, 0x00C800, 0.9)
        s._mask.graphics.beginFill(0x00C800, 0.2);
        s._mask.graphics.drawRect(s._rect.x, s._rect.y, s._rect.width, s._rect.height);
        s._mask.graphics.endFill();
    }



    public clear(){
        let s = this;
        if(s._bindObj){
            s._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.clear, s)
        }
        s._bindObj = null;
        if(s._mask.parent)s._mask.parent.removeChild(s._mask)
        s._rect.setEmpty();
    }
}