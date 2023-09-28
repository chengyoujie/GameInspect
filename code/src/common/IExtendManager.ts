import { IEngineExtend } from "./IEngineExtend";
import { IEngineInfo } from "./IEngineInfo";

/**
 * 
 * IExtendManager 界面类
 * made by cyj
 * create on 2023-09-28 10:23:01 
*/
export interface IExtendManager{
    init():void;
    register(extend:IEngineExtend<any>):void;

    checkAttach():any;

    checkHaveUsed():IEngineExtend<any>;

    start(engine:IEngineInfo<any>):void;

    getExtendNode(obj:any):any;


}