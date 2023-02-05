import { Utils } from "../../../common/Utils";
import { IEngineInfo } from "../../IEngineInfo";
import { LayaMouseEvent } from "./LayaMouseEvent";
import { LayaStageRectMask } from "./LayaStageRectMask";

export class LayaEngineInfo   implements IEngineInfo<Laya.Sprite>{
    
    enableMouseEvent: boolean;
    stage: Laya.Sprite;
    name: string = "Laya";
    version: string;
    baseCls: typeof Laya.Sprite;
    private _mask:LayaStageRectMask;
    private _clssNameArray:{name:string, class:any}[] = [];

    getParent(obj: Laya.Sprite): Laya.Sprite {
        return obj.parent as Laya.Sprite;
    }
    // getTreeNode(obj: Laya.Sprite): TreeNode {
    //     return EngineManager.getTreeNode(this, obj)
    // }
    // getProps(obj: Laya.Sprite, showPrivate?: boolean, showFunction?: boolean): {[name:string]:PropNode} {
    //     return EngineManager.getPropNodes(this, obj, showPrivate, showFunction);
    // }
    getObjName(obj: Laya.Sprite): string {
        return obj.name;
    }
    getVisible(obj: Laya.Sprite): boolean {
        return obj.visible && obj.alpha != 0;
    }
    setVisible(obj: Laya.Sprite, value: boolean): void {
        obj.visible = value;
        if(value && obj.alpha < 0.1)obj.alpha = 1;
    }
    setMouseEnable(value: boolean): void {
        LayaMouseEvent.enableMouseEvent = value;
    }   

    canUse(obj: Laya.Sprite): boolean {
        return obj && !obj.destroyed;
    }
    // getPropNames(obj: Laya.Sprite): string[] {
    //    return []
    // } 


    clearMask(): void {
         let s = this;
         if(s._mask)s._mask.clear();
    }
    
    haveEngine(): boolean {
        return window["Laya"] && window["Laya"].stage;
    }

    init(){
        let s = this;
        s.baseCls = Laya.Sprite;
        s.stage = Laya.stage;
        s.version = Laya.version;
        s._mask = new LayaStageRectMask();
        
        let obj = window["Laya"];
        for(let key in obj){
            s._clssNameArray.push({name:key, class:obj[key]})
        }
    }

    start(onClickFun:(target:Laya.Sprite)=>void, onMouseMoveFun:(target:Laya.Sprite)=>void): void {
        let s = this;
        LayaMouseEvent.start(this);
        
        Laya.stage.on(LayaMouseEvent.MOUSE_DOWN, this, (target:Laya.Sprite)=>{
            onClickFun.call(s, target)
        })
        Laya.stage.on(LayaMouseEvent.MOUSE_MOVE, this, (target:Laya.Sprite)=>{
            onMouseMoveFun.call(s, target)
        })
    }
    getChildren(obj: Laya.Sprite): Laya.Sprite[] {
        return obj["_children"] || obj["_childs"] || []
    }
    drawMask(obj: Laya.Sprite): void {
        let s = this;
        if(s._mask) s._mask.showRect(obj)
    }

    refushMask(): void {
        let s = this;
        if(s._mask)s._mask.refush();
    }

    showFPS(value: boolean): void {
        if(window["Laya"]["Stat"]){
            if(value){
                window["Laya"]["Stat"].show();
            }else{
                window["Laya"]["Stat"].hide();
            }
        }
    }

    
    getClassName(obj: Laya.Sprite): string {
        if(typeof obj == "number" || typeof obj == "string")return obj;
        let s = this;
        for(let i=0; i<s._clssNameArray.length; i++){
            if(s._clssNameArray[i].class == obj.constructor)return s._clssNameArray[i].name;
        }
        return Utils.getClassName(obj);
    }
}