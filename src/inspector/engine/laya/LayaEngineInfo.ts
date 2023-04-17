import { ConstVars } from "../../../common/ConstVars";
import { PropNode } from "../../../common/TreeNode";
import { Utils } from "../../../common/Utils";
import { IEngineInfo } from "../../IEngineInfo";
import { LayaMouseEvent } from "./LayaMouseEvent";
import { LayaStageRectMask } from "./LayaStageRectMask";

export class LayaEngineInfo   implements IEngineInfo<Laya.Node>{
    
    enableMouseEvent: boolean;
    stage: Laya.Node;
    name: string = "Laya";
    version: string;
    baseCls: typeof Laya.Node;
    private _mask:LayaStageRectMask;
    private _clssNameArray:{name:string, class:any}[] = [];

    getParent(obj: Laya.Node): Laya.Node {
        return obj.parent as Laya.Node;
    }
    // getTreeNode(obj: Laya.Node): TreeNode {
    //     return EngineManager.getTreeNode(this, obj)
    // }
    // getProps(obj: Laya.Node, showPrivate?: boolean, showFunction?: boolean): {[name:string]:PropNode} {
    //     return EngineManager.getPropNodes(this, obj, showPrivate, showFunction);
    // }
    getObjName(obj: Laya.Node): string {
        return obj.name;
    }
    getVisible(obj: Laya.Node): boolean {
        return obj["visible"] && obj["alpha"] != 0;
    }
    setVisible(obj: Laya.Node, value: boolean): void {
        obj["visible"] = value;
        if(value && obj["alpha"] < 0.1)obj["alpha"] = 1;
    }
    setMouseEnable(value: boolean): void {
        LayaMouseEvent.enableMouseEvent = value;
    }   

    canUse(obj: Laya.Node): boolean {
        return obj && !obj.destroyed;
    }
    // getPropNames(obj: Laya.Node): string[] {
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
        s.baseCls = Laya.Node;
        s.stage = Laya.stage;
        s.version = Laya.version || Laya.LayaEnv.version;
        s._mask = new LayaStageRectMask(s);
        
        let obj = window["Laya"];
        for(let key in obj){
            s._clssNameArray.push({name:key, class:obj[key]})
        }
    }

    start(onClickFun:(target:Laya.Node)=>void, onMouseMoveFun:(target:Laya.Node)=>void): void {
        let s = this;
        LayaMouseEvent.start(this);
        
        Laya.stage.on(LayaMouseEvent.MOUSE_DOWN, this, (target:Laya.Node)=>{
            onClickFun.call(s, target)
        })
        Laya.stage.on(LayaMouseEvent.MOUSE_MOVE, this, (target:Laya.Node)=>{
            onMouseMoveFun.call(s, target)
        })
    }
    getChildren(obj: Laya.Node): Laya.Node[] {
        return obj["_children"] || obj["_childs"] || []
    }
    drawMask(obj: Laya.Node): void {
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

    getAddPropNode(obj: Laya.Node): PropNode[] {
        let result:PropNode[] = [];
        let components = obj["_components"];
        if(components && components.length>0){
            for(let i=0; i<components.length; i++){
                let comp = components[i];
                let node:PropNode = {
                    aliasName:"[Component]",
                    name:"_components."+i,
                    value:Utils.getClassName(comp),
                    type:"object",
                    expandable:true,
                    isGetter:true,
                    isSetter:false,
                    isPrivate:false,
                }
                result.push(node)
            }
        }
        return result;
    }
    
    getClassName(obj: Laya.Node): string {
        if(typeof obj == "number" || typeof obj == "string")return obj;
        let s = this;
        let name = Utils.getClassName(obj);
        for(let i=0; i<s._clssNameArray.length; i++){
            if(s._clssNameArray[i].class == obj.constructor){
                name = s._clssNameArray[i].name;
                break;
            }
        }
        let components = obj["_components"]
        if(components && components.length>0){
            let compNames = [];
            for(let i=0; i<components.length; i++){
                let comp = components[i];
                compNames.push(Utils.getClassName(comp))
            }
            name += ConstVars.SPECIAL_NAME_START+compNames.join(",")+ConstVars.SPECIAL_NAME_END;
        }
        return name;
    }

}