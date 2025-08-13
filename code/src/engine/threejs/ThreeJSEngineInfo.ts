import { event } from "jquery";
import { IEngineInfo } from "../../common/IEngineInfo";
import { MessageType } from "../../common/Message";
import { PropNode } from "../../common/TreeNode";
import { Utils } from "../../common/Utils";
import { ThreeJSRectMask } from "./ThreeJSRectMask";
import * as Stats from "./ThreeJSStats"
import { ConstVars } from "../../common/ConstVars";
/////////////////////__THREE_DEVTOOLS__ 初始化START/////////////////////
declare global {
    interface Window {
        __THREE_DEVTOOLS__: {
            _ready: boolean,
            _backlog: { type: string, detail: any }[],
            objects: Map<string, any>,
            removeEventListener(type:string, listener:(params:any)=>void, options?:any)
            addEventListener(type:string, listener:(params:any)=>void, options?:any),
            dispatchEvent(event:string),
        }
    }
}
var backlog: { type: string, detail: any }[] = [];
var ThreeJsBridge = require("./threejsBridge");
ThreeJsBridge//引入threejs 工具的bridge, 兼容官方的工具
let devTools = window["__THREE_DEVTOOLS__"];
backlog = devTools._backlog?devTools._backlog.concat():[];//先将事件缓存到backlog内，如果之前有则复制一份到backlog内
devTools.addEventListener('register', devToolsEventRegister)
devTools.addEventListener('observe', devToolsEventObserve)
devTools.addEventListener('devtools-ready', devToolsEventReady)
function devToolsEventObserve(e){
    backlog.push(e)
}
function devToolsEventRegister(e){
    backlog.push(e)
}
function devToolsEventReady(e){
    // backlog.push(e)
}
/////////////////////__THREE_DEVTOOLS__ 初始化END/////////////////////

export class ThreeJSEngineInfo implements IEngineInfo<THREE.Object3D> {
    private _mask: ThreeJSRectMask;
    public stage: any = {
        name: "所有场景", children: [], add: function (obj: THREE.Object3D) {
            if (this.children.length == 0) return; this.children[0].add(obj);
        }
    };//THREE.Object3D;
    public name = "THREE";
    public version: string;
    private _stats: any;
    private _hasFindEngine = false;
    private _scene2Camera:{[id:string]:THREE.Camera} = {};
    baseCls: new (...args: any) => THREE.Object3D;

    constructor() {
        let s = this;
        s.haveEngine();//先检测下，把事件注册下
    }

    haveEngine(): boolean {
        let s = this;
        let devTools = window["__THREE_DEVTOOLS__"];
        if (devTools) {
            let logs = backlog;
            for (let i = 0; i < logs.length; i++) {
                let log = logs[i];
                s.checkThreeJsToolsEvent(log)
            }
            let data = {
                from: "EngineExt",
                name: "threejs",
                type: MessageType.InitStageDataReq,
                data: null
            }
            window.postMessage(data, "*")
            if(s._hasFindEngine){
                devTools.removeEventListener('register', devToolsEventRegister)
                devTools.removeEventListener('observe', devToolsEventObserve)
                devTools.removeEventListener('devtools-ready', devToolsEventReady)
                devTools.addEventListener('observe', (e)=>{
                    s.checkThreeJsToolsEvent(e)
                })
                devTools.addEventListener('register', (e)=>{
                    s.checkThreeJsToolsEvent(e)
                })
            }
            return s._hasFindEngine;
        }
        return false;
    }

    private checkThreeJsToolsEvent(event:any){
        let s = this;
        if (event.type == "register" && event.detail.revision) {
            s.version = event.detail.revision;
        } else if (event.type == "observe") {
            let obj = event.detail;
            if (obj.isWebGLRenderer || obj.isWebGPURenderer) {
                let renderClsFun = obj.render;
                if (renderClsFun) {
                    obj.render = function (scene: THREE.Scene, camera: THREE.Camera): void {
                        if (s._stats) s._stats.begin();
                        s._scene2Camera[scene.id] = camera;
                        renderClsFun.call(this, scene, camera)
                        if (s._stats) s._stats.end();
                    }

                }
            } else if (obj.isScene) {
                s._hasFindEngine = true;
                if(!s.baseCls)s.baseCls = obj.constructor.prototype.__proto__.constructor
                let idx = s.stage.children.indexOf(obj)
                if(idx==-1)s.stage.children.push(obj);
            }
        }
    }

    init(): void {
        let s = this;
        s.version = window["__THREE__"] || "未发现";
        Utils.setObjectDevUUID(s.stage);
        // s._mask = new ThreeJSRectMask(s);
        s._stats = Stats();
        s._stats.showPanel(0); // 0:
        document.body.appendChild(s._stats.dom);
        Utils.setObjPropClassName(window["THREE"])

    }
    start(onClickFun: (target: THREE.Object3D) => void, onMouseMoveFun: (target: THREE.Object3D) => void): void {
        let s = this;
        if(window["THREE"]){
            let mouse = new THREE.Vector2()
            let raycaster = new THREE.Raycaster();
            let mouseClickTarget:THREE.Object3D;
            let mouseMoveTarget:THREE.Object3D;
            document.addEventListener("mousedown", (event:MouseEvent)=>{
                if(s.stage.children.length==0)return;
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                for(let i=0; i<s.stage.children.length; i++){
                    let scene:THREE.Scene = s.stage.children[i];
                    let camera = s._scene2Camera[scene.id];
                    if(!camera)continue;
                    raycaster.setFromCamera(mouse, camera);
                    var intersects = raycaster.intersectObjects(scene.children);
                    // 如果有相交的物体
                    if (intersects.length > 0) {
                        mouseClickTarget = intersects[0].object;
                    } else {
                        // 清空选中物体
                        mouseClickTarget = null;
                    }
                    onClickFun.call(s, mouseClickTarget)
                }
            })
    
            document.addEventListener("mousemove", (event:MouseEvent)=>{
                if(s.stage.children.length==0)return;
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                for(let i=0; i<s.stage.children.length; i++){
                    let scene:THREE.Scene = s.stage.children[i];
                    let camera = s._scene2Camera[scene.id];
                    if(!camera)continue;
                    raycaster.setFromCamera(mouse, camera);
                    var intersects = raycaster.intersectObjects(scene.children);
                    if (intersects.length > 0) {
                        mouseMoveTarget = intersects[0].object;
                    } else {
                        mouseMoveTarget = null;
                    }
                    onMouseMoveFun.call(s, mouseMoveTarget)
                }
            })
        }
    }
    getChildren(obj: THREE.Object3D): THREE.Object3D[] {
        return obj.children;
    }
    getParent(obj: THREE.Object3D): THREE.Object3D {
        if (!obj.parent && this.stage.children.indexOf(obj) != -1) return this.stage;
        return obj.parent;
    }
    drawMask(obj: THREE.Object3D): void {
        let s = this;
        if (s._mask) s._mask.showRect(obj)
    }
    refushMask?(): void {
        let s = this;
        if (s._mask) s._mask.refush();
    }
    clearMask(): void {
        let s = this;
        if (s._mask) s._mask.clear();
    }
    // getNotShowPropNames?(obj: THREE.Object3D): string[] {
    //     throw new Error("Method not implemented.");
    // }
    getClassName?(obj: THREE.Object3D): string {
        if(typeof obj == "number" || typeof obj == "string")return obj;
        let s = this;
        let name = obj.type;
        if(!name)name = Utils.getClassName(obj);
        let nameAdds = [];
        if(obj["geometry"] && obj["geometry"]["type"]){
            nameAdds.push(obj["geometry"]["type"])
        }
        if(obj["material"] && obj["material"]["type"]){
            nameAdds.push(`<font color='#ACAA31'>${obj["material"]["type"]}</font>`)
        }
        if(nameAdds.length>0){
            name += ConstVars.SPECIAL_NAME_START+nameAdds.join(",")+ConstVars.SPECIAL_NAME_END;
        }
        return name;
    }

    // getAddPropNode?(obj: THREE.Object3D): PropNode[] {
    //     throw new Error("Method not implemented.");
    // }
    // modifyPropNode?(obj: THREE.Object3D, propName: string, prop: PropNode): PropNode {
    //     throw new Error("Method not implemented.");
    // }
    canUse(obj: THREE.Object3D): boolean {
        return obj != null;
    }
    getObjName(obj: THREE.Object3D): string {
        return obj.name;
    }
    getVisible(obj: THREE.Object3D): boolean {
        return obj.visible;
    }
    setMouseEnable(value: boolean): void {
        // Utils.error("暂不支持鼠标禁用")
    }
    setVisible(obj: THREE.Object3D, value: boolean): void {
        obj.visible = value;
    }
    showFPS(value: boolean): void {
        let s = this;
        if (!s._stats) return;
        if (value) {
            document.body.appendChild(s._stats.dom);
        } else {
            document.body.removeChild(s._stats.dom);
        }
    }
}