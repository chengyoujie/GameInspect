import { ConstVars } from "../../common/ConstVars";
import { ICocosCreatorDrawAdapter } from "./CocosCreatorAdapterInterface";
import { CocosCreatorEngineInfo } from "./CocosCreatorEngineInfo";
import { CocosCreator2XDraw } from "./version2X/CocosCreator2XDraw";
import { CocosCreator3XDraw } from "./version3X/CocosCreator3XDraw";

export class CocosCreatorStageMask {

    private _mask:cc.Node;
    private _bindObj:cc.BaseNode;
    private _engine:CocosCreatorEngineInfo;
    private _drawAdapter:ICocosCreatorDrawAdapter;

    constructor(engine:CocosCreatorEngineInfo){
        let s = this;
        s._engine = engine;
        s._mask = new cc.Node();
        s._mask.name = ConstVars.StageMaskName;
        if(s._engine.version.startsWith("2.")||s._engine.version.startsWith("1.")){
            s._drawAdapter = new CocosCreator2XDraw(s._engine)
        }else{
            s._drawAdapter = new CocosCreator3XDraw(s._engine)
        }
        s._mask.addComponent(s._drawAdapter.getGraphicsComponentCls());
    }

    private resetMask(){
        let s = this;
        s._mask = new cc.Node();
        s._mask.name = ConstVars.StageMaskName;
        s._mask.addComponent(s._drawAdapter.getGraphicsComponentCls());
    }

    
    public showRect(obj:cc.BaseNode){
        let s = this;
        s._bindObj = obj;
        if(!s._bindObj){
            s.clear();
            return;
        }
        if(s._bindObj){
            s._bindObj.on('active-in-hierarchy-changed', s.handleActiviteChange, s)
        }
        // if(s._mask.parent){
        //     s._mask.parent.removeChild(s._mask)
        // }
        // s._mask.removeFromParent();
        let stage = s._drawAdapter.getMaskParent();
        try{
            stage.addChild(s._mask);
        }catch(e){
            s._mask.parent = stage as any;
        }
        s.refush();
    }

    
    public refush(){
        let s = this;
        let obj = s._bindObj;
        let drawCls = s._drawAdapter.getGraphicsComponentCls();
        if(!s._mask["_components"]){
            s.resetMask();
        }
        let graphics = s._mask.getComponent(drawCls) as cc.Graphics;
        if(!obj)
        {
            s.clear();
            return;
        }
        let rect = s._drawAdapter.getDrawPositionInfo(obj);
        if(rect.width<=0 || rect.height<=0){
            s.clear();
            return;
        }
        graphics.clear();
        graphics.lineWidth = 1;
        graphics.strokeColor.fromHEX("#00C800ee")
        graphics.fillColor.fromHEX("#00C80022")//
        graphics.fillRect(rect.x, rect.y, rect.width, rect.height)
        graphics.close();
        graphics.stroke();
        graphics.fill()
    }

    private handleActiviteChange(){
        let s = this;
        if(!s._bindObj)return;
        if(!s._bindObj.activeInHierarchy){
            s.clear();
        }
    }

    public clear(){
        let s = this;
        if(s._bindObj){
            s._bindObj.off('active-in-hierarchy-changed', s.handleActiviteChange, s)
            s._bindObj = null;
        }
        if(s._mask["_components"]){
            let graphics = s._mask.getComponent(s._drawAdapter.getGraphicsComponentCls()) as cc.Graphics;
            graphics.clear();
        }
        s._mask.removeFromParent();
    }


}