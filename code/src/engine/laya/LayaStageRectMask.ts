import { ConstVars } from "../../common/ConstVars";
import { IEngineInfo } from "../../common/IEngineInfo";
import { LayaEngineInfo } from "./LayaEngineInfo";
/**
 * 绘制舞台上区域
 */
export class LayaStageRectMask  {
    private _rect:Laya.Rectangle;
    private _tempPoint:Laya.Point;
    private _mask:Laya.Sprite;
    private _bindObj:Laya.Node;
    private _engineInfo:LayaEngineInfo;
    private static GAMEINSPECT_SELECT_SHADER_TAG = "$GameInspectSelectShader"
    private static GAMEINSPECT_SELECT_OLD_MATERIAL_PROP = "$GameInspectOldMaterial"
    /**选中3d时的材质 */
    private _select3DMaterial:Laya.Material;

    constructor(engineInfo:LayaEngineInfo){
        this._engineInfo = engineInfo;
        this._mask = new Laya.Sprite();
        this._rect = new Laya.Rectangle();
        this._tempPoint = new Laya.Point();
        this._mask.name = ConstVars.StageMaskName;
        let version = this._engineInfo.version;
        if(version.startsWith("1.")){
            this._mask.alpha = 0.3;
        }else{
            this._mask.alpha = 1;
        }
    }

    public showRect(obj:Laya.Node){
        let s = this;
        if(s._bindObj){
            s.clear();
        }
        s._bindObj = obj;
        s._bindObj.on(Laya.Event.UNDISPLAY, s, s.clear);
        if(!obj){
            s._mask.removeSelf();
            return;
        }
        Laya.stage.addChild(s._mask);
        s.refush();
        Laya.timer.loop(1000, s, s.refush)
    }

    public refush(){
        let s = this;
        if(!s._bindObj)return;
        let x = 0;
        let y = 0;
        let w = 0;
        let h = 0;
        if(Laya.Sprite3D && s._bindObj instanceof Laya.Sprite3D){//3d 对象
            let sp = s._bindObj;
            if(!sp.scene || !sp.transform)return
            var cameras: Laya.BaseCamera[] = sp.scene._cameraPool;
            if(!cameras || !cameras.length)return false;
            let outPos = new Laya.Vector4();
            for (var i: number = cameras.length - 1; i >= 0; i--) {
                var camera: Laya.Camera = (<Laya.Camera>cameras[i]);
                camera.viewport.project(sp.transform.position, camera.projectionViewMatrix, outPos);
            }
            x = outPos.x * Laya.stage.clientScaleX;
            y = outPos.y * Laya.stage.clientScaleY;
            w = 50;
            h = 50;
            s.draw3D(s._bindObj)
        }else if(Laya.Sprite && s._bindObj instanceof Laya.Sprite){//2d 对象
            s._tempPoint.x = 0;
            s._tempPoint.y = 0;
            s._bindObj.localToGlobal(s._tempPoint)
            x = s._tempPoint.x;
            y = s._tempPoint.y;
            w = Math.max(20, s._bindObj["width"])*s._bindObj["scaleX"];
            h = Math.max(20, s._bindObj["height"])*s._bindObj["scaleY"];
        }
        
        if(s._rect.x == x && s._rect.y == y && s._rect.width == w && s._rect.height == h){
            return;
        }
        s._rect.x = x;
        s._rect.y = y;
        s._rect.width = w;
        s._rect.height = h;
        s._mask.graphics.clear();
        s._mask.graphics.drawRect(s._rect.x, s._rect.y, s._rect.width, s._rect.height, "#00C80022", "#00C800ee", 1);
    }

    /**绘制3d对象 */
    private draw3D(sp:Laya.Sprite3D){
        if(!Laya.Sprite3D || !sp)return;
        var meshRenderer:Laya.BaseRender = this.getSprite3DRender(sp);
        if (meshRenderer) {
            meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG] = true;
            if(this._engineInfo.version.startsWith("1.")){
                meshRenderer.material = this.getSelectMaterial();
            }else{
                meshRenderer.sharedMaterial = this.getSelectMaterial();
            }
        }
    }

    /**获取3d的渲染render  */
    private getSprite3DRender(sp:Laya.Node){
        if(Laya.RenderableSprite3D && sp instanceof Laya.RenderableSprite3D){//2.0  可以渲染的3d对象
            if(sp["_render"])return sp["_render"];
        }
        if(Laya.Sprite3D && Laya.BaseRender && sp instanceof Laya.Sprite3D){//通过Component 添加的render
            let comps = sp["_components"];
            if(comps){
                for(let i=0; i<comps.length; i++){
                    if(comps[i] instanceof Laya.BaseRender){
                        return comps[i];
                    }
                }
            }
        }
        return null;
    }

    /**获取选择的材质 */
    private getSelectMaterial(){
        let s = this;
        if(!s._select3DMaterial){
            this.register3DMaterial();
            if(Laya.UnlitMaterial){
                var selectedMaterial = new Laya.UnlitMaterial();
                if(s._engineInfo.version.startsWith("3")){//3.x版本
                    selectedMaterial.albedoColor = new Laya.Color(1,1, 0) as any;
                }else{
                    selectedMaterial.albedoColor = new Laya.Vector4(1, 1, 0, 1) as any;
                }
                s._select3DMaterial = selectedMaterial;
            }else if(Laya["StandardMaterial"]){
                s._select3DMaterial = new Laya["StandardMaterial"]()
                s._select3DMaterial["albedoColor"] = new Laya.Vector4(1, 1, 0, 1) as any;
            }
        }
        return s._select3DMaterial
    }

    /**注册3d 的render方法， 重写render 的设置 material */
    private register3DMaterial(){
        let s = this;
        if(!Laya.BaseRender)return;
        let prototype = Laya.BaseRender.prototype;
        Object.defineProperty(prototype, "sharedMaterial", {
            set:function(value:Laya.Material){
                var lastValue: Laya.Material = this._sharedMaterials?this._sharedMaterials[0]:this._materials[0];/***1.xx版本用的是 _materials  2.x以上用的是_sharedMaterials */
                if(this[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG]){
                    let selectMaterial = s.getSelectMaterial();
                    if(!this[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] && selectMaterial != lastValue){
                        this[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] = lastValue;
                    }
                    if(selectMaterial != value){
                        this[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] = value;
                        value = selectMaterial;
                    }
                }
                if (lastValue !== value) {
                    if(this._sharedMaterials)
                        this._sharedMaterials[0] = value;
                    else
                        this._materials[0] = value;
                    this._materialsInstance[0] = false;
                    this._changeMaterialReference(lastValue, value);
                    var renderElement: Laya.RenderElement = this._renderElements[0];
                    (renderElement) && (renderElement["material"] = value);
                }
		        if(this._isSupportReflection)this._isSupportReflection();
            },
            get:function(){
                return this._sharedMaterials?this._sharedMaterials[0]:this._materials[0];
            },
            enumerable: true,
            configurable: true
        })
    }

    /**清理当前绑定的obj */
    public clear(){
        let s = this;
        if(s._bindObj){
            // s._bindObj.offAllCaller(s);
            s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear)
        }
        if(Laya.Sprite3D && s._bindObj){
            var meshRenderer:Laya.BaseRender = s.getSprite3DRender(s._bindObj);
            if(meshRenderer && meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG]){
                let old = meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP];
                meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG] = false;
                meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] = null;
                if(old){
                    meshRenderer.sharedMaterial = old;
                }
            }
        }
        Laya.timer.clearAll(s)
        if(s._rect){
            s._rect.x = 0;
            s._rect.y = 0;
            s._rect.width = 0;
            s._rect.height = 0;
        }
        s._bindObj = null;
        s._mask.removeSelf();
    }
}