import { IEngineInfo } from "./IEngineInfo";

type EngineInfo<T> = {[P in keyof T ]?:T[P]}


export interface IEngineExtend<T> extends EngineInfo<IEngineInfo<any>>{
    name:string;
    engine:IEngineInfo<any>;
    haveAttach():boolean;
    haveExtend():boolean;
    // init(engine:IEngineInfo<any>);
    
    /**
     * 获取扩展上对应的节点, 一般是拓展上
     * @param node 
     */
     getExtendNode?(node:any):T;

}