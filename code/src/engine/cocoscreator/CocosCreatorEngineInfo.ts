import { ConstVars } from "../../common/ConstVars";
import { PropNode } from "../../common/TreeNode";
import { Utils } from "../../common/Utils";
import { IEngineInfo } from "../../common/IEngineInfo";
import { CocosCreatorMouseEvent } from "./CocosCreatorMouseEvent";
import { CocosCreatorStageMask } from "./CocosCreatorStageMask";



export class CocosCreatorEngineInfo implements IEngineInfo<cc.BaseNode>{
    name: string = "CocosCreator";
    version: string;
    baseCls: new () => cc.BaseNode;
    private _mask:CocosCreatorStageMask;
    // private _stage: cc.BaseNode;

    haveEngine(): boolean {
        return !!(window["cc"] && window["CocosEngine"]  && window["cc"]["director"] && this.stage);
    }
    init(): void {
        let s = this;
        s.version = window["CocosEngine"];
        s.baseCls = cc["BaseNode"] || cc["_BaseNode"] || cc["Node"] as any;//
        s._mask = new CocosCreatorStageMask(s);
        
       Utils.setObjPropClassName(window["cc"])
    }

    public set stage(value:cc.BaseNode){


    }

    getNotShowPropNames(obj: cc.BaseNode): string[] {
        if(!obj)return null;
        if(!obj["_uiProps"] || !obj["_uiProps"]["uiTransformComp"]){
            return ["width", "height", "anchorX", "anchorY", "getAnchorPoint", "setAnchorPoint", "getContentSize", "setContentSize"]
        }
        return null;
    }

    public get stage():cc.BaseNode{
        let scene:cc.Scene;
        if(window["cc"] && window["cc"]["director"] && window["cc"]["director"].getScene){
            scene = window["cc"]["director"].getScene()
        }
        return scene;
    }
    start(onClickFun: (target: cc.BaseNode) => void, onMouseMoveFun: (target: cc.BaseNode) => void): void {
        let s = this;
        CocosCreatorMouseEvent.start(s);
        
        cc.director.on(CocosCreatorMouseEvent.MOUSE_DOWN, (target:Laya.Sprite)=>{
            onClickFun.call(s, target)
        }, s)
        cc.director.on(CocosCreatorMouseEvent.MOUSE_MOVE, (target:Laya.Sprite)=>{
            onMouseMoveFun.call(s, target)
        }, s)
    }
    getChildren(obj: cc.BaseNode): cc.BaseNode[] {
        return obj.children;
    }
    getParent(obj: cc.BaseNode): cc.BaseNode {
        return obj.parent;
    }
    drawMask(obj: cc.BaseNode): void {
        if(this._mask)this._mask.showRect(obj);
    }
    clearMask(): void {
        if(this._mask)this._mask.clear();
    }
    refushMask(): void {
        let s = this;
        if(s._mask)s._mask.refush();
    }

    canUse(obj: cc.BaseNode): boolean {
        return obj && obj.isValid/*有可能为null**/!=false;
    }
    getObjName(obj: cc.BaseNode): string {
       return obj.name;
    }
    getVisible(obj: cc.BaseNode): boolean {
        return obj.activeInHierarchy;
    }
    setMouseEnable(value: boolean): void {
        CocosCreatorMouseEvent.enableMouseEvent = value;
    }
    setVisible(obj: cc.BaseNode, value: boolean): void {
        obj.active = value;
    }

    showFPS(value: boolean): void {
        
    }

    modifyPropNode(obj: cc.BaseNode, propName: string, prop: PropNode): PropNode {
        let propObj = obj[propName];
        if(propObj instanceof cc.Color){
            prop.valueExtParam = {r:propObj.r, g:propObj.g, b:propObj.b, a:propObj.a}
        }
        return prop;
    }

    getAddPropNode(obj: cc.BaseNode): PropNode[] {
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

    
    getClassName(obj: cc.BaseNode): string {
        if(typeof obj == "number" || typeof obj == "string")return obj;
        let s = this;
        let name = Utils.getClassName(obj);
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