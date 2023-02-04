import { ConstVars } from "../../../../common/ConstVars";
import { Utils } from "../../../../common/Utils";
import { IEngineInfo } from "../../../IEngineInfo";
import { ICocosCreatorMouseEventAdapter } from "../CocosCreatorAdapterInterface";
import { CocosCreatorMouseEvent } from "../CocosCreatorMouseEvent";


export class CocosCreator2XMouseEvent implements ICocosCreatorMouseEventAdapter{

    /**显示ICocosCreatorMouseEventAdapter 接口 */
    onMouseDown: (target?: cc.math.Vec2) => void;
    onMouseMove: (target?: cc.math.Vec2) => void;
    onMouseUp: () => void;
    findTarget(pos: cc.math.Vec2){
        let s = this;
        s._target = null;
        s.check(s._engine.stage, pos);
        return s._target;
    }
    
    setEnableEvent(value: boolean) {
        this.enableMouseEvent = value;
    }

    


    private _target:cc.BaseNode;
    public enableMouseEvent = true;
    
    private _engine:IEngineInfo<cc.BaseNode>;


    public constructor(engine:IEngineInfo<cc.BaseNode>){
        let s = this;
        s._engine = engine;
        if(cc["internal"] && cc["internal"]["inputManager"]){/**适用于 v2.4.6 */
            let inputMgr = cc["internal"]["inputManager"];
            let oldTouchBegin = inputMgr.handleTouchesBegin;
            let oldTouchMove = inputMgr.handleTouchesMove;
            let oldTouchEnd = inputMgr.handleTouchesEnd;
            inputMgr.handleTouchesBegin = function(){
                let touch:cc.Touch = arguments[0][0];
                if(touch){
                    let pos = touch.getLocation();
                    let glView = this._glView;
                    let newPos = pos.clone()
                     newPos.x = (newPos.x - glView._viewportRect.x) / glView._scaleX;
                     newPos.y = (newPos.y - glView._viewportRect.y) / glView._scaleY;
                    s.onMouseDown(newPos)
                }
                if(!s.enableMouseEvent)return;
                oldTouchBegin.apply(inputMgr, arguments)
            }
            inputMgr.handleTouchesMove = function(){
                    let touch:cc.Touch = arguments[0][0];
                    if(touch){
                        let pos = touch.getLocation();
                        let glView = this._glView;
                        let newPos = pos.clone()
                        newPos.x = (newPos.x - glView._viewportRect.x) / glView._scaleX;
                        newPos.y = (newPos.y - glView._viewportRect.y) / glView._scaleY;
                        s.onMouseMove(newPos);
                    }
                if(!s.enableMouseEvent)return;
                oldTouchMove.apply(inputMgr, arguments)
            }
            inputMgr.handleTouchesEnd = function(){
                s.onMouseUp();
                if(!s.enableMouseEvent)return;
                oldTouchEnd.apply(inputMgr, arguments)
            }
        }else{
            Utils.log("该版本不支持鼠标事件, 如需添加支持请加群： "+ConstVars.QQ)
        }
    }
    
    private check(sp: cc.BaseNode,pos:cc.Vec2): boolean {
        let s = this;
        if(!sp)return false;
        if(s._target)return true;
        let children = s._engine.getChildren(sp);
        if (children && children.length>0) {
            for (var i: number = children.length - 1; i > -1; i--) {
                if(s._target)return true;
                var child: cc.BaseNode = children[i];
                s.check(child, pos);
                if(s._target)return true;
            }
        }else{
            if(s.checkHaveComponet(sp) && s._hitTest(sp, pos)){
                s._target = sp;
                return true;
            }

        }
        return false;
    }

    private checkHaveComponet(obj:cc.BaseNode){
        let s = this;
        if(!obj)return false;
        let components = obj["_components"]
        if(!components || components.length==0)return false;
        let hasRender = false;
        for(let i=0; i<components.length; i++){
            let comp = components[i];
            if(!comp)continue;
            if(comp instanceof cc.Camera || comp instanceof cc.Canvas)return false;
            if(comp instanceof cc.RenderComponent && !(comp instanceof cc.Mask))hasRender = true;
        }
        return hasRender;
    }

    private _hitTest (node:cc.BaseNode, pos:cc.Vec2) {
        let s = this;
        if(!node || !node.isValid || !s._engine.getVisible(node) || node.name == ConstVars.StageMaskName)return false;
        if(node["_hitTest"])return node["_hitTest"](pos, node);/***version 2.4.6 */
        return false;
    }
}