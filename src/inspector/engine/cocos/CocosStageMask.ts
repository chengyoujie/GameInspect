import { ConstVars } from "../../../common/ConstVars";
import { CocosEngineInfo } from "./CocosEngineInfo";

export class CocosStageMask {

    private _mask:cc.Node;
    private _bindObj:cc.BaseNode;
    private _engine:CocosEngineInfo;

    constructor(engine:CocosEngineInfo){
        let s = this;
        s._engine = engine;
        s._mask = new cc.Node();
        s._mask.addComponent(cc.Graphics);
        s._mask.name = ConstVars.StageMaskName;
    }

    
    public showRect(obj:cc.BaseNode){
        let s = this;
        s._bindObj = obj;
        let position = obj["worldPosition"]
        let scale = obj["worldScale"];
        if(!position || !scale)return;
        let w:number = 20;
        let h:number = 20;
        obj.on(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, s.handleActiviteChange, s)
        let components = obj.components;
        if(components){
            for(let i=0; i<components.length; i++){
                if(components[i]["__classname__"] == "cc.UITransform" || components[i]["__cid__"] == "cc.UITransform"){
                    let comp = components[i] as cc.UITransform;
                    w = comp.width;
                    h = comp.height;
                    break;
                }
            }
        }
        let stage = s._engine.stage;
        if(stage){
            let canvas = stage.getChildByName("Canvas");
            if(canvas)stage = canvas;
        }
        let stagePosition = stage["worldPosition"]
        let graphics = s._mask.getComponent(cc.Graphics);
        w = w*scale.x;
        h = h*scale.y;
        graphics.clear();
        graphics.lineWidth = 1;
        graphics.fillColor.fromHEX("#00C80022")
        graphics.fillRect(position.x-stagePosition.x-w/2, position.y-stagePosition.y-h/2, w, h)
        graphics.close();
        graphics.stroke();
        graphics.fill()
        stage.addChild(s._mask);
    }

    private handleActiviteChange(e:cc.BaseNode){
        let s = this;
        if(!s._bindObj)return;
        if(!s._bindObj.activeInHierarchy){
            s.clear();
        }
    }

    public clear(){
        let s = this;
        if(s._bindObj){
            s._bindObj.on(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, s.handleActiviteChange, s)
            s._bindObj =null;
        }
        let graphics = s._mask.getComponent(cc.Graphics);
        graphics.clear();
        s._mask.removeFromParent();
    }


}