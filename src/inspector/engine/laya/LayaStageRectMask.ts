import { ConstVars } from "../../../common/ConstVars";

/**
 * 绘制舞台上区域
 */
export class LayaStageRectMask  {
    private _rect:Laya.Rectangle;
    private _tempPoint:Laya.Point;
    private _mask:Laya.Sprite;
    private _bindObj:Laya.Sprite;

    constructor(){
        this._mask = new Laya.Sprite();
        this._rect = new Laya.Rectangle();
        this._tempPoint = new Laya.Point();
        this._mask.name = ConstVars.StageMaskName;
        if(Laya.version.startsWith("1.")){
            this._mask.alpha = 0.3;
        }else{
            this._mask.alpha = 1;
        }
    }

    public showRect(obj:Laya.Sprite){
        let s = this;
        if(s._bindObj){
            // s._bindObj.offAllCaller(s);// engin: Laya version: 1.7.17 没有此方法
            s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear)
        }
        s._bindObj = obj;
        s._bindObj.on(Laya.Event.UNDISPLAY, s, s.clear);
        if(!obj){
            s._mask.removeSelf();
            return;
        }
        Laya.stage.addChild(s._mask);
        s._tempPoint.x = 0;
        s._tempPoint.y = 0;
        obj.localToGlobal(s._tempPoint)
        s._rect.x = s._tempPoint.x;
        s._rect.y = s._tempPoint.y;
        s._rect.width = Math.max(20, obj.width)*obj.scaleX;
        s._rect.height = Math.max(20, obj.height)*obj.scaleY;
        s._mask.graphics.clear();
        s._mask.graphics.drawRect(s._rect.x, s._rect.y, s._rect.width, s._rect.height, "#00C80022", "#00C800ee", 1);
        
    }



    public clear(){
        let s = this;
        if(s._bindObj){
            // s._bindObj.offAllCaller(s);
            s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear)
        }
        s._bindObj = null;
        s._mask.removeSelf();
    }
}