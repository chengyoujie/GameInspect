import {IMessage,Message,MessageDataByType,MessageDataType,MessageFromType,MessageType} from "../common/Message";
import {TreeNode} from "../common/TreeNode";
import {DevSettingInfo} from "../common/DevSettingInfo";
import {EngineManager} from "./EngineManager";
import {IEngineInfo} from "./IEngineInfo";
import {Utils} from "../common/Utils";
import { IUserCostomEngine } from "./IUserCostomEngine";
import { ConstVars } from "../common/ConstVars";
import { CodeData, CodeRunRules, ContentURLS } from "../common/UserCodeInfo";

/**
 * 注入到网页的代码
 */
export class Inspector {
    public msg: IMessage;
    private _uid2Obj: {[uid: string]: any} = {};
    private _lastMoveObj: any;
    private _gameInfo: GameInfo;
    private _treeSetting: DevSettingInfo = {
        hightLightClick: false,
        hightlightHover: false,
        preEventTouch: false,
        showPrivate: false,
        showFunction: false,
        showFPS:true,
    };
    private _engine: IEngineInfo < any > ;
    private _customEngine?:IUserCostomEngine;
    private _heartBeatCount = 0;
    private _devPanelHasOpen:boolean=false;
    private _heartBeatId:any = 0;
    private _engineRunUserCode:{[name:string]:CodeData};

    constructor() {
        this.init();
    }


    private init() {
        let s = this;
        s.msg = Message.getMessage(MessageFromType.Stage, s.handleRecvMessage, s);
        EngineManager.init();
        let t = setInterval(() => {
            s.checkCostomEngine();//检测用户是否自定义引擎了
            s._engine = EngineManager.check();
            if (!s._engine) return;
            clearInterval(t);
            s._engine.init();
            Object.defineProperties(s._engine.baseCls.prototype, {
                devUUID: {
                    get() {
                        let uid = this['$_DevUUID'];
                        if (!uid) {
                            uid = this['$_DevUUID'] = Utils.getUID();
                            s._uid2Obj[uid] = this;
                        }
                        return uid;
                    },
                    enumerable: false
                },
            });
            let onClickFun = (target: any) => {
                if(!target)return;
                s.showClickObj(target, s._treeSetting.hightLightClick)
            }
            let onMouseMoveFun = (target: any) => {
                if(!target)return;
                if (s._treeSetting.hightlightHover) {
                    if (s._lastMoveObj == target) return;
                    s._lastMoveObj = target;
                    s.showClickObj(target, s._treeSetting.hightlightHover)
                }
            }
            s._engine.start(onClickFun, onMouseMoveFun);
            s._gameInfo = {
                name: window.document.title,
                engin: s._engine.name,
                version: s._engine.version
            }
            s.initEngineUserCode(s._engine.name)
            s.msg.post(MessageType.TreeSettingReq)
            s.msg.post(MessageType.GameInfoResponse, s._gameInfo)
            s.handleInitStage();
        }, 1000)
    }


    private runHeartBeat(isRun:boolean){
        let s = this;
        if((isRun && s._heartBeatId)  || (!isRun && !s._heartBeatId))return;
        if(s._heartBeatId){
            clearInterval(s._heartBeatId);
            s._heartBeatId = 0;
            s._heartBeatCount = 0;
        }
        if(!isRun)return;
        s._heartBeatId = setInterval(()=>{
            s._heartBeatCount ++;
            if(ConstVars.DEBUG){
                if(s._heartBeatCount>10){
                    s._heartBeatCount = 0;
                    Utils.error("content  多次链接不上 deve")
                }
            }
            s.msg.post(MessageType.ContentHeartBeatReq)
        }, ConstVars.HEARTBEAT)
    }

    private checkCostomEngine(){
        let s = this;
        if(!s._customEngine && window["getGameInspectUserCostomEngine"]){
            s._customEngine = window["getGameInspectUserCostomEngine"]();
            if(s._customEngine && s._customEngine.engine){
                let costomEngine = s._customEngine.engine;
                if(Array.isArray(costomEngine)){
                    for(let i=0; i<costomEngine.length; i++){
                        EngineManager.register(costomEngine[i])
                    }
                }else{
                    EngineManager.register(costomEngine);
                }
            }
        }
    }

    private showClickObj(obj: any, showMask: boolean) {
        let s = this;
        let tempObj = obj;
        let node: TreeNode;
        while (tempObj) {
            let parentNode = EngineManager.getTreeNode(s._engine, tempObj);
            let children = s._engine.getChildren(tempObj);
            let childrenNode: TreeNode[] = [];
            if(children){
                for (let i = 0; i < children.length; i++) {
                    if (node && node.uid == children[i].devUUID) {
                        childrenNode.push(node);
                    } else {
                        childrenNode.push(EngineManager.getTreeNode(s._engine, children[i]))
                    }
                }
            }
            parentNode.updateChild(childrenNode, false)
            node = parentNode;
            node.show = true;
            node.updateIcon();
            let parent = s._engine.getParent(tempObj);
            tempObj = parent;
        }
        s.msg.post(MessageType.InitStageDataResponse, node)
        if (s._engine) {
            if (showMask) s._engine.drawMask(obj)
            s.msg.post(MessageType.SelectNode, obj.devUUID);
        }
        s.msg.post(MessageType.PropDataResponse, {
            uid: obj.devUUID,
            props: EngineManager.getPropNodes(s._engine, obj, s._treeSetting.showPrivate, s._treeSetting.showFunction)
        })
    }

    private handleInitStage() {
        let s = this;
        let treeNode = EngineManager.getTreeNode(s._engine, s._engine.stage);
        s.msg.post(MessageType.InitStageDataResponse, treeNode)
        // if(s._mask)s._mask.clear();
    }

    private handleRecvMessage(data: MessageDataType<any> ) {
        let s = this;
        if(data.type == MessageType.ContentHeartBeatResponse){
            s._heartBeatCount --;
            return;
        }
        if(data.type == MessageType.DevPanelStateChange){
            s._devPanelHasOpen = data.data.isShow;
            s.runHeartBeat(s._devPanelHasOpen);
            return;
        }
        if(data.type == MessageType.GetContentURLReq){
            s.msg.post(MessageType.GetContentURLResponse, {url:window.location.href, engine:s._engine?s._engine.name:undefined, frameId:data.frameId})
            return;
        }
        if(data.type == MessageType.InitUserCode){
            s.checkRunUserCode(data.data)
            return;
        }
        if(data.type == MessageType.RunUserCodeReq){
            let code:CodeData = data.data;
            if(code.type == CodeRunRules.Once){
                s.addScript(code.code, code.name)
                Utils.log("执行成功 url: "+location.href)
            }else{
                s.checkRunUserCode({[code.name]:code}, true)
            }
            return;
        }
        if (!s._engine) return;
        //引擎初始化之后执行的方法
        if (data.type == MessageType.ExpandTreeReq) {
            let findNode = s._uid2Obj[data.data];
            if (s._engine.canUse(findNode)) {
                let nodeChildren = [];
                let children = s._engine.getChildren(findNode);
                if(children){
                    for (let i = 0; i < children.length; i++) {
                        nodeChildren.push(EngineManager.getTreeNode(s._engine, children[i]))
                    }
                }
                s.msg.post(MessageType.ExpandTreeResponse, {
                    uid: findNode.devUUID,
                    children: nodeChildren
                })
            }
        } else if (data.type == MessageType.InitStageDataReq) {
            s.handleInitStage();
        } else if (data.type == MessageType.PropChangeReq) {
            let changeValue = data.data.data;
            let findNode = s._uid2Obj[data.data.uid];
            let propPath = data.data.propPath;
            let isRecodChange = data.data.isRecodChange;
            if (s._engine.canUse(findNode)) {
                let obj = findNode;
                let newValue: any;
                if (propPath) {
                    let propPaths = propPath.split(".");
                    for (let i = 0; i < propPaths.length; i++) {
                        if (i == propPaths.length - 1) {
                            obj[propPaths[i]] = changeValue;
                            newValue = obj[propPaths[i]];
                            s.msg.post(MessageType.PropChangeResponse, {
                                uid: findNode.devUUID,
                                propPath: propPath,
                                data: Utils.stringifyValue(newValue),
                                recodChangeStr:isRecodChange?s.getRecoderStr(findNode, propPath, newValue):null,
                            })
                        } else {
                            obj = obj[propPaths[i]];
                            if (!obj) return;
                        }
                    }
                }
            }
        } else if (data.type == MessageType.ShowRectInStageReq) {
            let findNode = s._uid2Obj[data.data];
            if (s._engine.canUse(findNode)) {
                s._engine.drawMask(findNode)
                s.msg.post(MessageType.SelectNode, findNode.devUUID);
            }
        } else if (data.type == MessageType.PropDataReq) {
            let findNode = s._uid2Obj[data.data];
            if (s._engine.canUse(findNode)) {
                s.msg.post(MessageType.PropDataResponse, {
                    uid: findNode.devUUID,
                    props: EngineManager.getPropNodes(s._engine, findNode, s._treeSetting.showPrivate, s._treeSetting.showFunction)
                })
            }
        } else if (data.type == MessageType.TreeSettingInfoResponse) {
            let recvData:DevSettingInfo = data.data;
            for (let key in recvData) {
                s._treeSetting[key] = recvData[key];
            }
            if (recvData.hightLightClick == false || recvData.hightlightHover == false)
                if (s._engine) s._engine.clearMask();
            if (recvData.hightlightHover == false) s._lastMoveObj = null;
            if(recvData.showFPS != undefined){
                s._engine.showFPS(s._treeSetting.showFPS)
            }
            s._engine.setMouseEnable(!recvData.preEventTouch);
        } else if (data.type == MessageType.ExpandPropReq) {
            let recvData = data.data;
            let findNode = s._uid2Obj[recvData.uid];
            if (s._engine.canUse(findNode)) {
                let propPath = recvData.prop.split(".");
                let obj = findNode;
                for (let i = 0; i < propPath.length; i++) {
                    obj = obj[propPath[i]];
                    if (!obj) return;
                }
                s.msg.post(MessageType.ExpandPropResponse, {
                    uid: findNode.devUUID,
                    prop: recvData.prop,
                    data: EngineManager.getPropNodes(s._engine, obj, s._treeSetting.showPrivate, s._treeSetting.showFunction)
                })
            }
        } else if (data.type == MessageType.VisibleChangeReq) {
            let recvData = data.data;
            let findNode = s._uid2Obj[recvData.uid];
            if (s._engine.canUse(findNode)) {
                s._engine.setVisible(findNode, recvData.data)
                s.msg.post(MessageType.PropDataResponse, {
                    uid: findNode.devUUID,
                    props: EngineManager.getPropNodes(s._engine, findNode, s._treeSetting.showPrivate, s._treeSetting.showFunction)
                })
            }
        } else if (data.type == MessageType.GameInfoReq) {
            if (s._gameInfo) {
                s.msg.post(MessageType.GameInfoResponse, s._gameInfo)
            }
        } else if (data.type == MessageType.ShowTreeNodeInConsoleReq) {
            let findNode = s._uid2Obj[data.data];
            if (s._engine.canUse(findNode)) {
                if(s._customEngine && s._customEngine.printVar){
                    s._customEngine.printVar(findNode);
                }else{
                    let nodeVarName = "gameInspectNode" + data.data
                    Utils.log("临时变量名", nodeVarName);
                    console.log(findNode)
                    window[nodeVarName] = findNode;
                }
            } else {
                if(ConstVars.DEBUG){
                    console.log("没有找到节点： " + data.data)
                }
            }
        } else if (data.type == MessageType.InspectClassDefinedReq) {
            let findNode = s._uid2Obj[data.data];
            if (s._engine.canUse(findNode)) {
                let clsFunName = "gameInspectClassFun" + data.data;
                let fun = findNode.constructor;
                if(s._customEngine && s._customEngine.getClassFun){
                    fun = s._customEngine.getClassFun(findNode);
                }
                if(fun){
                    window[clsFunName] = fun;
                    s.msg.post(MessageType.InspectCodeResponse, {name:clsFunName, url:location.href})
                }
            } else {
                if(ConstVars.DEBUG){
                    console.log("没有找到节点： " + data.data)
                }
            }
        } else if (data.type == MessageType.InspectVarDefinedReq) {
            let findNode = s._uid2Obj[data.data];
            if (s._engine.canUse(findNode)) {
                let clsFunName = "gameInspectVarFun" + data.data;
                let fun = s.getVarLocationFun(findNode)
                if(fun){
                    window[clsFunName] = fun;
                    s.msg.post(MessageType.InspectCodeResponse, {name:clsFunName, url:location.href})
                }else{
                    Utils.error(`没有找到对应的变量声明`);
                    alert("未找到变量声明的地方")
                }
            } else {
                if(ConstVars.DEBUG){
                    console.log("没有找到节点： " + data.data)
                }
            }
        } else if(data.type == MessageType.ShowTreeNodePathReq){
            let findNode = s._uid2Obj[data.data];
            if (s._engine.canUse(findNode)) {
                s.printNodePath(findNode)
            }
        }else if(data.type == MessageType.ShowPropFunDefineReq){
            let recvData = data.data;
            let propFunName = "gameInspectPropFun_" + recvData.uid+"_"+recvData.propPath.replace(/\./gi, "_");
            let findNode = s._uid2Obj[recvData.uid];
            if (s._engine.canUse(findNode)) {
                let propPath = recvData.propPath.split(".");
                let obj = findNode;
                let fun:Function;
                for (let i = 0; i < propPath.length; i++) {
                    obj = obj[propPath[i]];
                    if (!obj) return;
                    if(i==propPath.length-1){
                        fun = obj;
                    }
                }
                if(fun){
                    window[propFunName] = fun;
                    s.msg.post(MessageType.InspectCodeResponse, {name:propFunName, url:location.href})
                }else{
                    Utils.error(`没有找到属性的方法定义`);
                    alert("没有找到属性的方法定义")
                }
            }
        }else if(data.type == MessageType.DevHeartBeatReq){
            s.msg.post(MessageType.DevHeartBeatResponse)
        }
        if(ConstVars.DEBUG){
            console.log(" Inspection  接受到消息： ", data)
        }
    }

    
    private checkRunUserCode(scripts:{[name:string]:CodeData}, showMsg?:boolean){
        let s = this;
        let url:ContentURLS = {url:window.location.href, frameId:window.location==top.location?0:1, engine:s._engine?s._engine.name:""}
        for(let key in scripts){
            let code = scripts[key];
            let matchCode = code.match;
            if(matchCode){
                matchCode = matchCode.replace(/^\s*\/\/.*?([\n\r]|$)/gi, "")//去掉行注释
                matchCode = matchCode.replace(/\/\*(.|[\n\r])*?\*\//gi, "")//去掉块注释
                if(!url.engine && (matchCode.indexOf(ConstVars.$VarEngineName) != -1 || matchCode.indexOf(ConstVars.$VarGameURL) != -1)){
                    if(!s._engineRunUserCode)s._engineRunUserCode = {};
                    s._engineRunUserCode[code.name] = code;
                    if(showMsg)Utils.error("执行失败，引擎未初始化 url: "+location.href)
                }else if(eval(Utils.evalUserRuleCode(matchCode, url)))
                {
                    s.addScript(code.code, code.name)
                    if(showMsg)Utils.log("执行成功 url: "+location.href)
                }else{
                    if(showMsg)Utils.error("当前网站不匹配  url: "+location.href)
                }
            }else{
                if(showMsg)Utils.error("没有匹配规则 url: "+location.href);
            }
        }
    }
    
    private initEngineUserCode(name:string){
        let s = this;
        if(!s._engineRunUserCode)return;
        let urls:ContentURLS = {url:window.location.href, frameId:window.location==top.location?0:1, engine:name}
        for(let key in s._engineRunUserCode){
            let code = s._engineRunUserCode[key];
            if(code.match && eval(Utils.evalUserRuleCode(code.match, urls))){
                s.addScript(code.code, code.name)
            }
        }
    }

    
    /**
     * 添加script 代码
     * @param code 
     */
     public addScript(code:string, name:string){
        let tag = document.getElementById(name);
        if(tag){
            document.head.removeChild(tag);
        }
        var script = document.createElement("script")
        script.innerHTML = code;
        script.id = name;
        document.head.appendChild(script)
    }


    private getRecoderStr(findNode:any, propPath:string, newValue:any):string{
        let s = this;
        if(!findNode || !s._engine)return;
        if(s._customEngine && s._customEngine.getRecoderStr){
            return s._customEngine.getRecoderStr(findNode, propPath, newValue);
        }
        let propPathArr = propPath.split(".");
        let obj = findNode;
        let path:string="";
        for (let i = 0; i < propPathArr.length; i++) {
            let propItem = propPathArr[i];
            if(Array.isArray(obj)){
                path = path+"["+propItem+"]";
            }else{
                path = path+"."+propItem
            }
            obj = obj[propItem];
        }
        let nodePath = s.getNodePath(findNode);
        let valueStr = Utils.stringifyValue(newValue);
        if(typeof newValue == "string"){
            valueStr = `"`+valueStr+`"`
        }
        return nodePath+path+" = "+valueStr;
    }

    /**
     * 获取变量的声明的地方
     * @param findNode 
     * @returns 
     */
    private getVarLocationFun(findNode:any){
        let s = this;
        if(!findNode || !s._engine)return;
        let fun:Function;
        if(s._customEngine && s._customEngine.getVarLocationFun){
            fun = s._customEngine.getVarLocationFun(findNode);
        }else{
            let temp = s._engine.getParent(findNode);
            while (temp) {
                let keys = Object.keys(temp)
                for (let idx in keys) {
                    let key = keys[idx];
                    if(temp[key] == findNode){
                        fun = temp.constructor;
                        Utils.log(`对应变量： ${key}`);
                        break;
                    }
                }
                temp = s._engine.getParent(temp);
            }
        }
        return fun;
    }

    /**
     * 打印findNode 所在的节点路径
     * @param findNode 
     */
    private printNodePath(findNode:any){
        let s = this;
        if(!findNode || !s._engine)return ;
        Utils.log("对应变量： "+s.getNodePath(findNode));
    }

    private getNodePath(findNode:any){
        let s = this;
        if(!findNode || !s._engine)return ;
        let nodePathStr = "";
        if(s._customEngine && s._customEngine.getNodePath){
            nodePathStr = s._customEngine.getNodePath(findNode);
            return nodePathStr
        }else{
            let temp:any;
            let curFindTemp = findNode;
            while(curFindTemp){
                temp = s._engine.getParent(curFindTemp);
                let findName:string;
                while (temp) {
                    let keys = Object.keys(temp)
                    for (let idx in keys) {
                        let key = keys[idx];
                        if(temp[key] == curFindTemp){
                            findName =  key;
                            curFindTemp = temp;
                            break;
                        }
                    }
                    if(findName)break;
                    temp = s._engine.getParent(temp);
                }
                if(findName)
                {
                    nodePathStr = findName+(nodePathStr?"."+nodePathStr:"")
                    continue;
                }
                if(!findName)findName = s._engine.getObjName(curFindTemp);
                let findTempParent = s._engine.getParent(curFindTemp);
                if(!findName && findTempParent){
                    let children = s._engine.getChildren(findTempParent)
                    let idx = children.indexOf(curFindTemp);
                    if(idx!=-1){
                        findName = idx+"";
                    }
                }
                if(findName){
                    nodePathStr = findName+(nodePathStr?"."+nodePathStr:"")
                }
                if(!findTempParent){
                    nodePathStr =s._engine.getClassName(curFindTemp)+(nodePathStr?"."+nodePathStr:"")
                }
                curFindTemp = findTempParent;
            }
           return nodePathStr;
        }
    }


}

new Inspector();