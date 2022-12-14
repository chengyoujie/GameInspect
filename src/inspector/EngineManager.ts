import { PropNode, TreeNode } from "../common/TreeNode";
import { CocosEngineInfo } from "./engine/cocos/CocosEngineInfo";
import { Cocos2dxEngineInfo } from "./engine/cocos2dx/Cocos2dxEngineInfo";
import { EgretEngineInfo } from "./engine/egret/EgretEnginInfo";
import { IEngineInfo } from "./IEngineInfo";
import { LayaEngineInfo } from "./engine/laya/LayaEngineInfo";
import { Utils } from "../common/Utils";
import { PIXIEngineInfo } from "./engine/pixi/PIXIEngineInfo";

export class EngineManager{

    private static _engineDic:{[name:string]:IEngineInfo<any>} = {};

    public static init(){
        let s = this;
        let defaultEngines = [LayaEngineInfo,EgretEngineInfo,  CocosEngineInfo, Cocos2dxEngineInfo, PIXIEngineInfo];
        for(let i=0; i<defaultEngines.length; i++){
            let engine = new defaultEngines[i]();
            if(!s._engineDic[engine.name]){//已经注册过的不在注册
                s.register(engine)
            }
        }
    }

    public static register(engine:IEngineInfo<any>){
        let s = this;
        // if(!engine.getTreeNode){//如果没有设置 获取 treeNode 则使用默认的
        //     engine.getTreeNode = (obj:any)=>{
        //         return EngineManager.getTreeNode(engine, obj);
        //     }
        // }
        // if(!engine.getProps){//如果没有设置 获取 propNode 则使用默认的
        //     engine.getProps = (obj: Laya.Sprite, showPrivate?: boolean, showFunction?: boolean): {[name:string]:PropNode} => {
        //         return EngineManager.getPropNodes(engine, obj, showPrivate, showFunction);
        //     }
        // }
        if(!engine.getClassName){//如果没有设置 获取 propNode 则使用默认的
            engine.getClassName = (obj: Laya.Sprite): string => {
                return Utils.getClassName(obj);
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
        let addProps = engineInfo.getPropNames && engineInfo.getPropNames(obj);
        let filterProps = engineInfo.getNotShowPropNames && engineInfo.getNotShowPropNames(obj);
        let temp = obj;
        while(temp){
            let keys = Reflect.ownKeys(temp)
            for(let key in keys){
                let propName = keys[key];
                if(typeof propName !=  "string")continue;
                if(filterProps && filterProps.indexOf(propName) != -1)continue;
                let propNode:PropNode = s.getOnePropNode(obj, temp, propName);
                if(!showPrivate && propNode.isPrivate)continue;
                if(!showFunction && propNode.type == "function")continue;
                props[propNode.name] = propNode;
            }
            temp = temp.__proto__;
        }
        if(addProps && addProps.length>0){
            for(let i=0; i<addProps.length; i++){
                if(props[addProps[i]])continue;
                let propNode:PropNode = s.getOnePropNode(obj, temp, addProps[i]);
                if(!showPrivate && propNode.isPrivate)continue;
                if(!showFunction && propNode.type == "function")continue;
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