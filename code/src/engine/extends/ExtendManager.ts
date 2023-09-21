import { IEngineInfo } from "../../common/IEngineInfo";
import { FGUIExtend } from "./fgui/FGUIExtend";
import { IEngineExtend } from "./IEngineExtend";

/**
 * 扩展
 * ExtendManager 界面类
 * made by cyj
 * create on 2023-09-20 14:26:18 
*/
export class ExtendManager{
    
    private static _extendsDic:{[name:string]:IEngineExtend<any>} = {};
    private static _attachdExtends:{[name:string]:ExtendState} = {};
    private static _haveUsedExtends:{[name:string]:boolean} = {};
    private static _bindEngine:IEngineInfo<any>;
    constructor(){
        let s = this;
        
    }

    public static init(){
        let s = this;
        let defaultExtends = [FGUIExtend];
        for(let i=0; i<defaultExtends.length; i++){
            let extend = new defaultExtends[i]();
            if(!s._extendsDic[extend.name]){//已经注册过的不在注册
                s.register(extend)
            }
        }
    }
    
    public static register(extend:IEngineExtend<any>){
        let s = this;
        s._extendsDic[extend.name] = extend;
        s._attachdExtends[extend.name] = ExtendState.None;
    }

    public static checkAttach(){
        let  s = this;
        for(let key in s._extendsDic){
            let extend = s._extendsDic[key];
            if(s._attachdExtends[extend.name] != ExtendState.None)continue;
            if(extend.haveAttach()||extend.haveExtend()){
                s._attachdExtends[extend.name] = ExtendState.Extending;
                s.execExtend(extend)
                return extend;
            }
        }
        return null;
    }

    public static checkHaveUsed(){
        let  s = this;
        for(let key in s._extendsDic){
            let extend = s._extendsDic[key];
            if(s._haveUsedExtends[extend.name])continue;
            if(extend.haveExtend()){
                s._haveUsedExtends[extend.name] = true;
                return extend;
            }
        }
        return null;
    }

    public static start(engine:IEngineInfo<any>){
        let s = this;
        s._bindEngine = engine;
        for(let key in s._attachdExtends){
            s.execExtend(s._extendsDic[key])
        }
    }

    public static getExtendNode(obj:any):any{
        let s = this;
        let extObj:any;
        for(let key in s._attachdExtends){
            let extend = s._extendsDic[key];
            if(!extend.getExtendNode)continue;
            let state = s._attachdExtends[key];
            if(state == ExtendState.Extended){
                extObj = extend.getExtendNode(obj)
                if(extObj)return extObj
            }
        }
        return obj;
    }

    //执行拓展
    private static execExtend(extend:IEngineExtend<any>){
        let s = this;
        if(!s._bindEngine || !extend)return;
        let name = extend.name;
        if(s._attachdExtends[name] != ExtendState.Extending)return;
        let copyEngine:IEngineInfo<any> = {} as any;
        for(let key in s._bindEngine){
            copyEngine[key] = s._bindEngine[key];
        }
        extend.engine = copyEngine;
        for(let key in extend){
            s.overrideEngineProp(key, extend, s._bindEngine)
        }
        s._attachdExtends[name] = ExtendState.Extended
    }

    private static overrideEngineProp(key:string, extend:IEngineExtend<any>, engine:IEngineInfo<any>){
        let s = this;
        // let oldType = typeof s._bindEngine[key];
        let newType = typeof extend[key];
        // let a:()=>void;
        // a.apply()
        if(key == "name")return;
        if(newType == "function"){
            Object.defineProperty(engine, key, {
                value:function(){
                    return extend[key].apply(extend, arguments)
                }
            })
        }else{
            Object.defineProperty(engine, key, {
                get:function(){
                    return extend[key]
                },
                enumerable:true,
            })
        }
    }
    

}

export const enum ExtendState{
    /**没有使用该拓展 */
    None = 0,
    /**附加到项目中， 可能项目中未使用该拓展 */
    Extending = 1,
    /**发现项目中使用了拓展 */
    // Used = 2,
    /**已经拓展 */
    Extended = 3,
}