import { Utils } from "../../common/Utils";
import { IEngineInfo } from "../../common/IEngineInfo";
import { PIXIStageRectMask } from "./PIXIStageRectMask";
import { ConstVars } from "../../common/ConstVars";

export class PIXIEngineInfo implements IEngineInfo<PIXI.DisplayObject>{
    name: string = "PIXI";
    version: string;
    baseCls: new (...args: any) => PIXI.DisplayObject;
    stage: PIXI.DisplayObject;
    private _mask:PIXIStageRectMask;

    private _haveInjectApplictionRender = false;


    haveEngine(): boolean {
        if(!window["PIXI"] || !window["PIXI"]["Application"]|| !window["PIXI"]["Ticker"])return false;
        let s = this;
        if(!s._haveInjectApplictionRender){
            s._haveInjectApplictionRender = true;
            let tickerPrototype = window["PIXI"]["Ticker"].prototype;
            let oldTickUpdateRender:Function = tickerPrototype["update"]
            Object.defineProperty(tickerPrototype, "update", {
                value:function(){
                    if(!s.stage){
                        let head = this._head;
                        let maxLoopNum = 100;
                        let curLoopNum = 0;
                        while(head){
                            curLoopNum ++;
                            if(curLoopNum>=maxLoopNum)break;
                            if(head.context && head.context instanceof window["PIXI"]["Application"]){
                                s.stage = head.context.stage;
                                break;
                            }
                            head = head.next;
                        }
                    }
                    oldTickUpdateRender.call(this);
                },
                enumerable:true,
            })
        }
        return !!s.stage;
    }
    init(): void {
        let s = this;
        s.version = PIXI.VERSION;
        s.baseCls = PIXI.DisplayObject;
        s._mask = new PIXIStageRectMask(s);
        
       Utils.setObjPropClassName(window["PIXI"])
    }
    start(onClickFun: (target: PIXI.DisplayObject) => void, onMouseMoveFun: (target: PIXI.DisplayObject) => void): void {
       
    }

    getChildren(obj: PIXI.DisplayObject): PIXI.DisplayObject[] {
        if(obj["children"])return obj["children"];
        return [];
    }
    getParent(obj: PIXI.DisplayObject): PIXI.DisplayObject {
        return obj.parent;
    }
    drawMask(obj: PIXI.DisplayObject): void {
        if(this._mask)this._mask.showRect(obj);
    }
    clearMask(): void {
        if(this._mask)this._mask.clear();
    }
    canUse(obj: PIXI.DisplayObject): boolean {
        return !!obj;
    }
    getObjName(obj: PIXI.DisplayObject): string {
        return obj["name"]
    }
    getVisible(obj: PIXI.DisplayObject): boolean {
        return obj.visible;
    }
    setMouseEnable(value: boolean): void {
        
    }
    setVisible(obj: PIXI.DisplayObject, value: boolean): void {
        obj.visible = value;
        if(value && obj.alpha == 0)obj.alpha = 1;

    }
    showFPS(value: boolean): void {
        
    }
    
}