import { IEngineInfo } from "./IEngineInfo";

/**
 * 用户自定义引擎
 */
export interface IUserCostomEngine {
    /**
     * 用户自定义引擎信息
     */
    engine?:IEngineInfo<any>|IEngineInfo<any>[];

    /**
     * 用户自定义输出变量
     * @param obj 
     */
    printVar?(obj:any):void;

    /**
     * 查找 显示节点 的构造函数
     * @param obj 
     */
    getClassFun?(obj):Function;
    /**
     * 查找 包含  显示节点  变量声明  的函数
     * @param obj 
     */
    getVarLocationFun?(obj:any):Function;

    /**
     * 输出节点的路径
     * @param obj 
     */
    printNodePath?(obj:any):void;

}

declare interface window{
    /**
     * 返回用户自定义引擎信息的函数
     */
    getGameInspectUserCostomEngine?():IUserCostomEngine;
} 