import { IEngineInfo } from "../../common/IEngineInfo";
import { MessageType } from "../../common/Message";
import { PropNode } from "../../common/TreeNode";
import { Utils } from "../../common/Utils";
import { ThreeJSRectMask } from "./ThreeJSRectMask";
import * as Stats from "./ThreeJSStats"

export class ThreeJSEngineInfo implements IEngineInfo<THREE.Object3D>{

    private _hasWarnSetGloablVar = false;
    private _hasReWriteRender = false;
    private THREE_RENDER_NAME = "threejsRender";
    private _mask:ThreeJSRectMask;
    public stage:any =  {name:"所有场景", children:[], add:function (obj:THREE.Object3D){
        if(this.children.length==0)return; this.children[0].add(obj);
    }};//THREE.Object3D;
    public name ="THREE";
    private _scene2Camera:{[id:string]:THREE.Camera} = {};
    public version: string;
    private _stats:any;
    baseCls: new (...args: any) => THREE.Object3D;

    constructor(){
        
    }
    
    haveEngine(): boolean {
        let s = this;
        let hasThreejsVer =  !!window["__THREE__"];
        //重写render记录当前所有的scene
        if(window[s.THREE_RENDER_NAME]){
            if(!s._hasReWriteRender){
                s._hasReWriteRender = true;
                let renderTarget = window[s.THREE_RENDER_NAME];
                let oldRenderFun = renderTarget.render;
                renderTarget.render = function(scene: THREE.Scene, camera: THREE.Camera): void{
                    if(s.stage.children.indexOf(scene) == -1){
                        s.stage.children.push(scene);
                        s._scene2Camera[scene.id] = camera;
                        let data = {
                            from:"EngineExt",
                            name:"threejs",
                            type:MessageType.InitStageDataReq,
                            data:null
                        }
                        window.postMessage(data, "*")
                    }
                    if(s._stats)s._stats.begin();
                    oldRenderFun.call(this, scene, camera)
                    if(s._stats)s._stats.end();
                }
            }
        }else if(!!window["THREE"]){
            let renderClsTarget = window["THREE"].WebGLRenderer.prototype;
            let renderClsFun = renderClsTarget.render;
            if(renderClsFun){
                s._hasReWriteRender = true;
                Object.defineProperty(renderClsTarget, "render", {
                    value:function(scene: THREE.Scene, camera: THREE.Camera): void{
                        if(s.stage.children.indexOf(scene) == -1){
                            s.stage.children.push(scene);
                            s._scene2Camera[scene.id] = camera;
                            let data = {
                                from:"EngineExt",
                                name:"threejs",
                                type:MessageType.InitStageDataReq,
                                data:null
                            }
                            window.postMessage(data, "*")
                        }
                        if(s._stats)s._stats.begin();
                        renderClsFun.call(this, scene, camera)
                        if(s._stats)s._stats.end();
                    }
                })
            }

        }
        let hasThreeJsObj = !!window["THREE"] && !!window["THREE"]["Object3D"] && !!window[s.THREE_RENDER_NAME] && s.stage.children.length>0;
        if(hasThreeJsObj)return true;
        if(!s._hasWarnSetGloablVar && hasThreejsVer){
            let howSetInspectStr = "";
            if(!window[s.THREE_RENDER_NAME]&&!s._hasReWriteRender)howSetInspectStr += `window["${s.THREE_RENDER_NAME}"]=当前场景的渲染实例;//如：${s.THREE_RENDER_NAME}=new THREE.WebGLRenderer()\n`;
            if(!window["THREE"])howSetInspectStr = `import * as THREE from 'three';\nwindow["THREE"]=THREE;\n`+howSetInspectStr;
            if(howSetInspectStr)Utils.log("发现可能是 Threejs 项目， 如果是请设置如下变量\n"+howSetInspectStr)
            s._hasWarnSetGloablVar = true;
            // Utils.log("尝试import three 添加全局 THREE对象")
            // let scriptStr = `import * as THREE from 'three';window["THREE"] = THREE;console.log("RUN : ",THREE);`
            // let script = document.createElement("script");
            // script.innerText = scriptStr;
            // script.type = "module";
            // document.body.appendChild(script)
        }
        // if(!s._hasWarnSetGloablVar && !hasThreeJsObj){
        //     Utils.log("GameInspect 检测到当前可能是ThreeJs引擎, 请设置window[\"THREE\"]对象")
        //     s._hasWarnSetGloablVar = true;
        //     //还需要找到scene, 否则没有stage
        //     Utils.log("尝试import three 添加全局 THREE对象")
        //     let scriptStr = `import * as THREE from 'three';window["THREE"] = THREE;console.log("RUN : ",THREE);`
        //     let script = document.createElement("script");
        //     script.innerText = scriptStr;
        //     script.type = "module";
        //     document.body.appendChild(script)
        // }
        return false;
    }
    init(): void {
        let s  = this;
        s.version = window["__THREE__"] || "未发现";
        // s.stage =  {name:"所有场景", children:[]};
        // Utils.setObjectDevUUID(s.stage);
        s.baseCls = THREE.Object3D; 
        s._mask = new ThreeJSRectMask(s);
        s._stats = Stats();
        s._stats.showPanel( 0 ); // 0:
        document.body.appendChild( s._stats.dom );
        Utils.setObjPropClassName(window["THREE"])
        
    }
    start(onClickFun: (target: THREE.Object3D) => void, onMouseMoveFun: (target: THREE.Object3D) => void): void {
        let s = this;
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
    getChildren(obj: THREE.Object3D): THREE.Object3D[] {
        return obj.children;
    }
    getParent(obj: THREE.Object3D): THREE.Object3D {
        if(!obj.parent  && this.stage.children.indexOf(obj)!=-1)return this.stage;
        return obj.parent;
    }
    drawMask(obj: THREE.Object3D): void {
        let s = this;
        s._mask.showRect(obj)
    }
    refushMask?(): void {
        let s = this;
        s._mask.refush();
    }
    clearMask(): void {
        let s = this;
        s._mask.clear();
    }
    // getNotShowPropNames?(obj: THREE.Object3D): string[] {
    //     throw new Error("Method not implemented.");
    // }
    // getClassName?(obj: THREE.Object3D): string {
    //     throw new Error("Method not implemented.");
    // }
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
        obj.visible  = value;
    }
    showFPS(value: boolean): void {
        let s = this;
        if(!s._stats)return;
        if(value){
            document.body.appendChild( s._stats.dom );
        }else{
            document.body.removeChild( s._stats.dom );
        }
    }
}