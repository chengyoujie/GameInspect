import { ConstVars } from "../../../../common/ConstVars";
import { ICocosCreatorDrawAdapter } from "../CocosCreatorAdapterInterface";
import { CocosCreatorEngineInfo } from "./../CocosCreatorEngineInfo";

export class CocosCreator3XDraw implements ICocosCreatorDrawAdapter{

    private _engine:CocosCreatorEngineInfo;
    private _rect:cc.Rect;

    constructor(engine:CocosCreatorEngineInfo){
        let s = this;
        s._rect = new cc.Rect();
        s._engine = engine;
    }
    getGraphicsComponentCls(): typeof cc.Component {
        return cc.GraphicsComponent;
    }
    getDrawPositionInfo(obj: cc.BaseNode): cc.math.Rect {
        let s = this;
        if(!obj){
            s._rect.x = s._rect.y = s._rect.width = s._rect.height = 0;
            return s._rect;
        }
        let tran = obj.getComponent(cc.UITransformComponent);
        if(!tran){
            s._rect.x = s._rect.y = s._rect.width = s._rect.height = 0;
            return s._rect;
        }
        let scaleX = 1;
        let scaleY = 1;
        let position = obj["worldPosition"]
        s._rect.x = position.x;
        s._rect.y = position.y;
        let scale = obj["worldScale"];
        if(scale){
            scaleX = scale.x;
            scaleY = scale.y;
        }
        s._rect.width = tran["width"]||0;
        s._rect.height = tran["height"]||0;
        let winSize = cc["winSize"];
        if(winSize){
            s._rect.x -= winSize.width/2;
            s._rect.y -= winSize.height/2;
        }
        s._rect.x -= s._rect.width*(tran["anchorX"] ||0);
        s._rect.y -= s._rect.height*(tran["anchorY"]|| 0);
        return s._rect;
    }
    getMaskParent(): cc.BaseNode {
        let s = this;
        let stage = s._engine.stage;
        let children = stage.children;
        for(let i=0; i<children.length; i++){
            let child = children[i];
            if(child.getComponent(cc.Canvas)){
                return child;
            }
        }
        return stage;
    }

}