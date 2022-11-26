import { IEngineInfo } from "../../IEngineInfo";
import { EgretMouseEvent } from "./EgretMouseEvent";
import { EgretStageRectMask } from "./EgretStageRectMask";

export class EgretEngineInfo implements IEngineInfo<egret.DisplayObject> {
    
    
    
    name: string  = "Egret";
    version: string;
    baseCls: new () => egret.DisplayObject;
    enableMouseEvent: boolean;
    stage: egret.DisplayObject;
    private _mask:EgretStageRectMask;

    haveEngine(): boolean {
        return !!(window["egret"] && window["egret"]["sys"] && window["egret"]["sys"]["$TempStage"]);
    }
    init(): void {
       let s = this;
       s.version = egret.Capabilities.engineVersion;
       s.baseCls = egret.DisplayObject;
       s.stage = egret.sys.$TempStage;
       s._mask = new EgretStageRectMask();
    }
    start(onClickFun: (target: egret.DisplayObject) => void, onMouseMoveFun: (target: egret.DisplayObject) => void): void {
        let s = this;
        EgretMouseEvent.start();
        let stage = egret.sys.$TempStage;
        stage.addEventListener(EgretMouseEvent.MOUSE_DOWN, (e)=>{
            onClickFun(e.data);
        }, s)
        stage.addEventListener(EgretMouseEvent.MOUSE_MOVE, (e)=>{
            onMouseMoveFun(e.data);
        }, s)
    }
    setMouseEnable(value: boolean): void {
        let s = this;
        EgretMouseEvent.enableMouseEvent = value;
    }
    getChildren(obj: egret.DisplayObject): egret.DisplayObject[] {
        return obj.$children || [];
    }
    getParent(obj: egret.DisplayObject): egret.DisplayObject {
        return obj.parent;
    }
    drawMask(obj: egret.DisplayObject): void {
        let s = this;
        if(s._mask)s._mask.showRect(obj);
    }
    clearMask(): void {
        let s = this;
        if(s._mask)s._mask.clear();
    }
    // getPropNames(obj: egret.DisplayObject): string[] {
    //     return [];
    // }
    getNotShowPropNames(obj: egret.DisplayObject): string[] {
        if(obj == this.stage){
            return ["x", "y", "alpha", "visible", "scaleX", "scaleY", "rotation", "cacheAsBitmap", "scrollRect", "filters", "blendMode", "touchEnabled", "matrix",]
        }
        return null;
    }
    // getTreeNode(obj: egret.DisplayObject): TreeNode {
    //     return EngineManager.getTreeNode(this, obj);
    // }
    // getProps(obj: egret.DisplayObject, showPrivate?: boolean, showFunction?: boolean): { [name: string]: PropNode; } {
    //     return EngineManager.getPropNodes(this, obj, showPrivate, showFunction)
    // }
    canUse(obj: egret.DisplayObject): boolean {
        return !!obj;
    }
    getObjName(obj: egret.DisplayObject): string {
        return obj.name;
    }
    getVisible(obj: egret.DisplayObject): boolean {
        if(obj == this.stage)return true;
        return obj.visible;
    }
    setVisible(obj: egret.DisplayObject, value: boolean): void {
        obj.visible = value;
        if(value && obj.alpha < 0.1)obj.alpha = 1;
    }

    showFPS(value: boolean): void {
        let s = this;
        let egret_fps_panel = document.getElementById('egret-fps-panel');
        // let toShow = !egret_fps_panel || egret_fps_panel.style.visibility == "hidden";
        if (value) {
            if (!egret_fps_panel) {
                let webPlayer: any = document.querySelectorAll(".egret-player")[0]['egret-player'];
                if (!egret.nativeRender) {
                    let option = webPlayer.playerOption;
                    webPlayer.player.displayFPS(true, true, option.logFilter, option.fpsStyles);
                }
            }
            else {
                egret_fps_panel.style.visibility = "visible";
            }

        }
        else if (egret_fps_panel) {
            egret_fps_panel.style.visibility = "hidden";
        }
    }
    
}