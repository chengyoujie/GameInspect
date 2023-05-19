import { IEngineInfo } from "./IEngineInfo";
import { PropNode, TreeNode } from "./TreeNode";

/**
 * 引擎管理的实现类
 * IEngineManager 界面类
 * made by cyj
 * create on 2023-05-19 10:21:30 
*/
export interface IEngineManager{
    /**初始化引擎管理器 */
    init();
    
    /**注册 引擎 */
    register(engine:IEngineInfo<any>);

    /**检测当前网页是否包含已注册的引擎， 每隔1s检测一次， 直到检测到网页中使用的引擎 */
    check();

    /**获取显示对象的节点信息 */
    getTreeNode(engineInfo:IEngineInfo<any>, obj: any): TreeNode;

    /**获取显示对象的属性信息 */
    getPropNodes(engineInfo:IEngineInfo<any>, obj:any, showPrivate:boolean, showFunction:boolean):{[name:string]:PropNode}

}