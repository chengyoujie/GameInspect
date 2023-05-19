import { ConstVars } from "../../common/ConstVars";
import { IEngineInfo } from "../../common/IEngineInfo";

/**
 * 绘制舞台上区域
 */
export class PIXIStageRectMask  {
    
    private _tempPoint:PIXI.Point;
    private _mask:PIXI.Graphics;
    private _bindObj:PIXI.DisplayObject;
    private _engine:IEngineInfo<PIXI.DisplayObject>;

    constructor(engine:IEngineInfo<PIXI.DisplayObject>){
        this._engine = engine;
        this._mask = new PIXI.Graphics();
        this._tempPoint = new PIXI.Point();
        this._mask["name"] = ConstVars.StageMaskName;
    }

    public showRect(obj:PIXI.DisplayObject){
        let s = this;
        if(s._bindObj){
            // s._bindObj.offAllCaller(s);// engin: Laya version: 1.7.17 没有此方法
            // s._bindObj.(Laya.Event.UNDISPLAY, s, s.clear)
        }
        s._bindObj = obj;
        // s._bindObj.on(Laya.Event.UNDISPLAY, s, s.clear);
        if(!obj){
            if(s._mask.parent)s._mask.parent.removeChild(s._mask);
            return;
        }
        s._engine.stage["addChild"](s._mask);
        s._tempPoint.x = 0;
        s._tempPoint.y = 0;
        let point = obj.toGlobal(s._tempPoint)
        let bounds = obj.getLocalBounds();
        let scale = obj.scale;
        let w = Math.max(20, scale.x * bounds.width);
        let h = Math.max(20, scale.y * bounds.width);
        let anchorX = 0;
        let anchorY = 0;
        let anchor = obj["anchor"];
        if(anchor){
            anchorX = anchor.x;
            anchorY = anchor.y;
        }
        s._mask.clear();
        s._mask.beginFill(0x00C800, 0.3);
        s._mask.lineStyle(1, 0x00C800, 0.5);
        s._mask.drawRect(point.x-w*anchorX, point.y-w*anchorY, w, h);
        s._mask.endFill();
        
    }



    public clear(){
        let s = this;
        // if(s._bindObj){
        //     // s._bindObj.offAllCaller(s);
        //     s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear)
        // }
        s._bindObj = null;
        if(s._mask.parent)s._mask.parent.removeChild(s._mask);
    }
}