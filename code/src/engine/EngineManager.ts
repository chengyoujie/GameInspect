import { PropNode, TreeNode } from "../common/TreeNode";
import { CocosCreatorEngineInfo } from "./cocoscreator/CocosCreatorEngineInfo";
import { Cocos2dxEngineInfo } from "./cocos2dx/Cocos2dxEngineInfo";
import { EgretEngineInfo } from "./egret/EgretEnginInfo";
import { IEngineInfo } from "../common/IEngineInfo";
import { LayaEngineInfo } from "./laya/LayaEngineInfo";
import { Utils } from "../common/Utils";
import { PIXIEngineInfo } from "./pixi/PIXIEngineInfo";
import { ConstVars } from "../common/ConstVars";
import { ThreeJSEngineInfo } from "./threejs/ThreeJSEngineInfo";
import { ExtendManager } from "./extends/ExtendManager";

export class EngineManager{

    private static _engineDic:{[name:string]:IEngineInfo<any>} = {};

    public static init(){
        let s = this;
        let defaultEngines = [LayaEngineInfo,EgretEngineInfo,  CocosCreatorEngineInfo, Cocos2dxEngineInfo, PIXIEngineInfo, ThreeJSEngineInfo];
        for(let i=0; i<defaultEngines.length; i++){
            let engine = new defaultEngines[i]();
            if(!s._engineDic[engine.name]){//已经注册过的不在注册
                s.register(engine)
            }
        }
    }

    public static register(engine:IEngineInfo<any>){
        let s = this;
        if(!engine.getClassName){//获取类名 如果没有设置 获取 propNode 则使用默认的
            engine.getClassName = (obj: any): string => {
                return Utils.getClassName(obj);
            }
        }
        if(!engine.getProps){//获取属性
            engine.getProps = (obj:any, showPrivate?:boolean, showFunction?:boolean): {[name:string]:PropNode} => {
                return s.getPropNodes(engine, obj, showPrivate, showFunction);
            }
        }
        if(!engine.setPropValue){//设置属性
            engine.setPropValue = (obj:any, key:string, value:any): void => {
                obj[key] = value;
            }
        }
        s._engineDic[engine.name] = engine;
    }

    public static check(){
        let s= this;
        for(let key in s._engineDic){
            let engine = s._engineDic[key];
            if(engine.haveEngine())return engine;
        }
        return null;
    }

    public static getTreeNode(engineInfo:IEngineInfo<any>, obj: any): TreeNode {
        let s = this;
        let treeNode = new TreeNode();
        treeNode.name = engineInfo.getClassName(obj);
        treeNode.memberName = engineInfo.getObjName(obj);
        treeNode.visible = engineInfo.getVisible(obj);
        treeNode.uid = obj.devUUID;
        let children = engineInfo.getChildren(obj)
        treeNode.hasChildren = children?children.length>0:false;
        treeNode.updateIcon();
        return treeNode;
    }


    public static getPropNodes(engineInfo:IEngineInfo<any>, obj:any, showPrivate:boolean, showFunction:boolean):{[name:string]:PropNode}{
        let s = this;
        let props:{[name:string]:PropNode}= {};
        props = {};
        let addProps = engineInfo.getAddPropNode && engineInfo.getAddPropNode(obj);
        let filterProps = engineInfo.getNotShowPropNames && engineInfo.getNotShowPropNames(obj);
        let temp = obj;
        while(temp){
            let keys = Reflect.ownKeys(temp)
            for(let key in keys){
                let propName = keys[key];
                if(propName == "devUUID"||propName == "$_DevUUID"||propName == ConstVars.GAMEINSPECT_CLASS_KEY)continue;
                if(typeof propName !=  "string")continue;
                if(filterProps && filterProps.indexOf(propName) != -1)continue;
                let propNode:PropNode = s.getOnePropNode(obj, temp, propName);
                if(engineInfo.modifyPropNode){//修改属性节点
                    propNode = engineInfo.modifyPropNode(obj,propName, propNode)
                }
                if(!showPrivate && propNode.isPrivate)continue;
                if(!showFunction && propNode.type == "function")continue;
                props[propNode.name] = propNode;
            }
            temp = temp.__proto__;
        }
        if(addProps && addProps.length>0){
            for(let i=0; i<addProps.length; i++){
                let propNode = addProps[i];
                props[propNode.name] = propNode;
            }
        }
        return props;
    }

    
    private static getOnePropNode(obj:any, owner:any, prop:string){
        let propNode:PropNode = {name:prop} as any;
        propNode.isPrivate = prop.indexOf("_")==0 || prop.indexOf("$") == 0;
        let propInfo = Object.getOwnPropertyDescriptor(owner, prop);
        // let findPropInfoObj = propInfo;
        // while(propInfo == null && findPropInfoObj){
        //     findPropInfoObj = Object.getPrototypeOf(findPropInfoObj);
        //     propInfo = Object.getOwnPropertyDescriptor(findPropInfoObj, prop);
        // }
        if(propInfo){
            propNode.isGetter = propInfo.get != undefined;
            propNode.isSetter = propNode.isGetter && propInfo.set != undefined;
        }
        let value = null;
        try{
            value = obj[prop];
        }catch(u){
            value = "faild to get value"
        }
        let type = typeof value;
        propNode.type = type;
        if(type == "object" && value){
            propNode.expandable = true;
        }
        propNode.value = Utils.stringifyValue(value);
        return propNode;
    }


}
//引擎管理
window[ConstVars.ENGINE_MANAGER_PROP_NAME] = EngineManager;
//扩展管理
window[ConstVars.ENGINE_EXTEND_PROP_NAME] = ExtendManager;