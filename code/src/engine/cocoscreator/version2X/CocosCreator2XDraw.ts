import { IEngineInfo } from "../../../common/IEngineInfo";
import { ICocosCreatorDrawAdapter } from "../CocosCreatorAdapterInterface";

export class CocosCreator2XDraw implements ICocosCreatorDrawAdapter{

    private _tempV3:cc.Vec3;
    private _rect:cc.Rect;
    private _engine:IEngineInfo<any>

    constructor(engine:IEngineInfo<cc.BaseNode>){
        let s = this;
        s._tempV3 = new cc.Vec3();
        s._rect = new cc.Rect();
        s._engine = engine;
    }
    getGraphicsComponentCls(): typeof cc.Component {
        return cc.Graphics;
    }
    getDrawPositionInfo(obj: cc.BaseNode): cc.math.Rect {
        let s = this;
        if(!obj){
            s._rect.x = s._rect.y = s._rect.width = s._rect.height = 0;
            return s._rect;
        }
        let position = obj["convertToWorldSpace"](s._tempV3);
        let scaleX = obj["scaleX"]
        let scaleY = obj["scaleY"]
        s._rect.x = position.x;
        s._rect.y = position.y;
        s._rect.width = obj["width"]||0;
        s._rect.height = obj["height"]||0;
        s._rect.width *= scaleX;
        s._rect.height *= scaleY;
        s._rect.width = Math.max(20, s._rect.width)
        s._rect.height = Math.max(20, s._rect.height)
        return s._rect;
    }
    getMaskParent(): cc.BaseNode {
        return this._engine.stage;
    }

}