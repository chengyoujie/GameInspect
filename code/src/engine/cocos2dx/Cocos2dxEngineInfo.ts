import { IEngineInfo } from "../../common/IEngineInfo";
import { Cocos2dxStageMask } from "./Cocos2dxStageMask";



export class Cocos2dxEngineInfo implements IEngineInfo<cc.BaseNode>{
    name: string = "Cocos2dx";
    version: string;
    baseCls: new () => cc.BaseNode;
    private _mask:Cocos2dxStageMask;
    // private _stage: cc.BaseNode;

    haveEngine(): boolean {
        return !!(window["cc"] && window["CocosEngine"]  && window["cc"]["director"] && this.stage);
    }
    init(): void {
        let s = this;
        s.version = window["CocosEngine"];
        s.baseCls = cc["BaseNode"] || cc["_BaseNode"] || cc["Node"] as any;//
        s._mask = new Cocos2dxStageMask(s);
    }

    public set stage(value:cc.BaseNode){
        

    }

    public get stage():cc.BaseNode{
        let scene:cc.Scene;
        if(window["cc"] && window["cc"]["director"] && window["cc"]["director"]["_scenesStack"]){
            scene = window["cc"]["director"]["_scenesStack"][0];
        }
        return scene;
    }

    start(onClickFun: (target: cc.BaseNode) => void, onMouseMoveFun: (target: cc.BaseNode) => void): void {
        
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

    // getPropNames(obj: cc.BaseNode): string[] {
    //    return [];
    // }
    // getTreeNode(obj: cc.BaseNode): TreeNode {
    //     return EngineManager.getTreeNode(this, obj);
    // }
    // getProps(obj: cc.BaseNode, showPrivate?: boolean, showFunction?: boolean): { [name: string]: PropNode; } {
    //     return EngineManager.getPropNodes(this, obj, showPrivate, showFunction)
    // }
    canUse(obj: cc.BaseNode): boolean {
        return obj && obj.isValid/*有可能为null**/!=false;
    }
    getObjName(obj: cc.BaseNode): string {
       return obj.name;
    }
    getVisible(obj: cc.BaseNode): boolean {
        return obj.active;
    }
    setMouseEnable(value: boolean): void {
        
    }
    setVisible(obj: cc.BaseNode, value: boolean): void {
        obj.active = value;
    }

    showFPS(value: boolean): void {
        
    }

}