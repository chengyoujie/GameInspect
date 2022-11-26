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
    }

    start(onClickFun:(target:Laya.Sprite)=>void, onMouseMoveFun:(target:Laya.Sprite)=>void): void {
        let s = this;
        LayaMouseEvent.start();
        
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

    showFPS(value: boolean): void {
        if(window["Laya"]["Stat"]){
            if(value){
                window["Laya"]["Stat"].show();
            }else{
                window["Laya"]["Stat"].hide();
            }
        }
    }

}