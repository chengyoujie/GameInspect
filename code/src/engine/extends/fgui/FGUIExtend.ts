import { IEngineInfo } from "../../../common/IEngineInfo";
import { PropNode } from "../../../common/TreeNode";
import { Utils } from "../../../common/Utils";
import { IEngineExtend } from "../../../common/IEngineExtend";
import { ConstVars } from "../../../common/ConstVars";

/**
 * 
 * FGUIExtend 界面类
 * made by cyj
 * create on 2023-09-20 17:31:20 
*/
export class FGUIExtend implements IEngineExtend<fgui.GObject>{

    name: string = "fgui";
    private _haveExtend = false;
    engine: IEngineInfo<any>;

    constructor(){
        let s = this;
        
    }
    haveExtend(): boolean {
        if(window["fgui"] || window["fairygui"]){
            Utils.setObjPropClassName(window["fgui"])
            Utils.setObjPropClassName(window["fairygui"])
            return true;
        }
        return this._haveExtend;
    }
    haveAttach(): boolean {
        let s = this;
        return true;
    }


    // getNotShowPropNames?(obj: any): string[] {
    //     throw new Error("Method not implemented.");
    // }
    getClassName?(obj: any): string {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            return s.getFguiClassName(fguiObj);
        }
        return s.engine.getClassName(obj);
    }


    private getFguiClassName(owner:any){
        let clsName:string;
        // if(obj.constructor && obj.constructor.name)clsName = obj.constructor.name;//common
        // if(clsName.indexOf("fgui")!=-1)return clsName;
        if(owner.constructor && owner.constructor.name)clsName = owner.constructor.name;//common
        if(clsName && clsName.length>2)return clsName;//猜测类名长度小于等于2的可能是压缩后的代码
        if(owner[ConstVars.GAMEINSPECT_CLASS_KEY])return owner[ConstVars.GAMEINSPECT_CLASS_KEY];
        if(owner["__class__"])return owner.__class__;//egret
        if(owner.__classname__)return owner.__classname__;//Cocos create
        if(owner._className)return owner._className;//Cocos2d-JS
        return clsName || typeof owner;
    }

    getNotShowPropNames(obj: egret.DisplayObject): string[] {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if((fguiObj && !fguiObj.packageItem) || (obj && obj["_relations"]/**先通过这个判断是不是fgui的吧 */ && !obj["packageItem"])){
            return ["baseUserData"];
        }
        if(s.engine.getNotShowPropNames){
            return s.engine.getNotShowPropNames(obj);
        }else{
            return null;
        }
    }
    // getAddPropNode?(obj: any): PropNode[] {
    //     throw new Error("Method not implemented.");
    // }
    modifyPropNode?(obj: any, propName: string, prop: PropNode): PropNode {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            return prop;
        }
        if(s.engine.modifyPropNode){
            return s.engine.modifyPropNode(obj, propName, prop)
        }else{
            return prop;
        }
    }
    canUse?(obj: any): boolean {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            return !fguiObj.isDisposed;
        }
        return s.engine.canUse(obj)
    }
    getObjName(obj: any): string {
        let s = this;
        let objName = "";
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            objName = fguiObj.name || "";
            if(objName)return objName;
        }
        return s.engine.getObjName(obj)
    }

    setPropValue(obj: any, key: string, value: any): void {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            fguiObj[key] = value;
            return;
        }
        s.engine.setPropValue(obj,key, value)
    }
    getProps(obj: any, showPrivate?: boolean, showFunction?: boolean): { [name: string]: PropNode; } {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            obj = fguiObj;
        }
        return s.engine.getProps(obj, showPrivate, showFunction)
    }
    getVisible?(obj: any): boolean {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            return fguiObj.visible;
        }
        return s.engine.getVisible(obj)
    }
    // setMouseEnable?(value: boolean): void {
    //     throw new Error("Method not implemented.");
    // }
    setVisible?(obj: any, value: boolean): void {
        let s = this;
        let fguiObj = s.getExtendNode(obj);
        if(fguiObj){
            fguiObj.visible = value;
            return;
        }
        s.engine.setVisible(obj, value)
    }

    getExtendNode(obj: any): fgui.GObject {
        let s = this;
        if(!obj)return null;
        let fguiObj = obj["$owner"] || obj["$gobj"]/**cocos */;
        if(fguiObj){
            if(!s._haveExtend){
                s._haveExtend = true;
            }
            Utils.setObjectDevUUID(fguiObj);
            return fguiObj;
        }
        return null;
    }
    // showFPS?(value: boolean): void {
    //     throw new Error("Method not implemented.");
    // }
    
    // init(engine: IEngineInfo<fairygui.GObject>) {
    //     throw new Error("Method not implemented.");
    // }
    

}