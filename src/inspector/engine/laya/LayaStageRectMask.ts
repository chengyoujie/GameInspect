import { ConstVars } from "../../../common/ConstVars";
import { IEngineInfo } from "../../IEngineInfo";
import { LayaEngineInfo } from "./LayaEngineInfo";

/**
 * 绘制舞台上区域
 */
export class LayaStageRectMask  {
    private _rect:Laya.Rectangle;
    private _tempPoint:Laya.Point;
    private _mask:Laya.Sprite;
    private _bindObj:Laya.Node;
    private _engineInfo:LayaEngineInfo;

    constructor(engineInfo:LayaEngineInfo){
        this._engineInfo = engineInfo;
        this._mask = new Laya.Sprite();
        this._rect = new Laya.Rectangle();
        this._tempPoint = new Laya.Point();
        this._mask.name = ConstVars.StageMaskName;
        let version = this._engineInfo.version;
        if(version.startsWith("1.")){
            this._mask.alpha = 0.3;
        }else{
            this._mask.alpha = 1;
        }
    }

    public showRect(obj:Laya.Node){
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
        s.refush();
        Laya.timer.loop(1000, s, s.refush)
        // s._tempPoint.x = 0;
        // s._tempPoint.y = 0;
        // obj.localToGlobal(s._tempPoint)
        // s._rect.x = s._tempPoint.x;
        // s._rect.y = s._tempPoint.y;
        // s._rect.width = Math.max(20, obj.width)*obj.scaleX;
        // s._rect.height = Math.max(20, obj.height)*obj.scaleY;
        // s._mask.graphics.clear();
        // s._mask.graphics.drawRect(s._rect.x, s._rect.y, s._rect.width, s._rect.height, "#00C80022", "#00C800ee", 1);
        
    }

    public refush(){
        let s = this;
        if(!s._bindObj || !s._bindObj["localToGlobal"])return;
        s._tempPoint.x = 0;
        s._tempPoint.y = 0;
        s._bindObj["localToGlobal"](s._tempPoint)
        let x = s._tempPoint.x;
        let y = s._tempPoint.y;
        let width = Math.max(20, s._bindObj["width"])*s._bindObj["scaleX"];
        let height = Math.max(20, s._bindObj["height"])*s._bindObj["scaleY"];
        if(s._rect.x == x && s._rect.y == y && s._rect.width == width && s._rect.height == height){
            return;
        }
        s._rect.x = x;
        s._rect.y = y;
        s._rect.width = width;
        s._rect.height = height;
        s._mask.graphics.clear();
        s._mask.graphics.drawRect(s._rect.x, s._rect.y, s._rect.width, s._rect.height, "#00C80022", "#00C800ee", 1);
    }



    public clear(){
        let s = this;
        if(s._bindObj){
            // s._bindObj.offAllCaller(s);
            s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear)
        }
        Laya.timer.clearAll(s)
        if(s._rect){
            s._rect.x = 0;
            s._rect.y = 0;
            s._rect.width = 0;
            s._rect.height = 0;
        }
        s._bindObj = null;
        s._mask.removeSelf();
    }
}