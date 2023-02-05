import { ConstVars } from "../../../common/ConstVars";
import { Cocos2dxEngineInfo } from "./Cocos2dxEngineInfo";

export class Cocos2dxStageMask {

    private _mask:any;
    private _bindObj:cc.BaseNode;
    private _engine:Cocos2dxEngineInfo;

    constructor(engine:Cocos2dxEngineInfo){
        let s = this;
        s._engine = engine;
        if(!cc["DrawNode"])return;
        s._mask = new cc["DrawNode"]();
        s._mask.name = ConstVars.StageMaskName;
    }

    
    public showRect(obj:any){
        let s = this;
        s._bindObj = obj;
        let w:number = Math.max(obj.width, 20);
        let h:number = Math.max(obj.height, 20);
        let pos:{x:number, y:number} = obj.convertToWorldSpace();
        let stage = s._engine.stage;
        w = w*obj.scaleX;
        h = h*obj.scaleY;
        if(s._mask){
            s._mask.clear();
            s._mask.removeFromParent();
        }
        s._mask.drawRect(cc["p"](pos.x-w*obj.anchorX, pos.y-h*obj.anchorY), cc["p"](w, h), new cc["Color"](0, 200, 0, 55), 1, new cc["Color"](0, 200, 0, 235));
        stage.addChild(s._mask);
    }

    public refush(){
        let s = this;
        //todo refush
        // s._bindObj = obj;
        // let w:number = Math.max(obj.width, 20);
        // let h:number = Math.max(obj.height, 20);
        // let pos:{x:number, y:number} = obj.convertToWorldSpace();
        // let stage = s._engine.stage;
        // w = w*obj.scaleX;
        // h = h*obj.scaleY;
        // if(s._mask){
        //     s._mask.clear();
        //     s._mask.removeFromParent();
        // }
        // s._mask.drawRect(cc["p"](pos.x-w*obj.anchorX, pos.y-h*obj.anchorY), cc["p"](w, h), new cc["Color"](0, 200, 0, 55), 1, new cc["Color"](0, 200, 0, 235));
        
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
            s._bindObj =null;
        }
        if(s._mask && s._mask["getComponent"]){
            let graphics = s._mask.getComponent(cc.Graphics);
            graphics.clear();
        }
        if(s._mask)s._mask.removeFromParent();
    }


}