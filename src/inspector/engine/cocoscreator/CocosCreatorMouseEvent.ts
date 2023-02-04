import { Utils } from "../../../common/Utils";
import { IEngineInfo } from "../../IEngineInfo";
import { ICocosCreatorMouseEventAdapter } from "./CocosCreatorAdapterInterface";
import { CocosCreator2XMouseEvent } from "./version2X/CocosCreator2XMouseEvent";
import { CocosCreator3XMouseEvent } from "./version3X/CocosCreator3XMouseEvent";

export class CocosCreatorMouseEvent{
    public static EventPreName = "cocosCreatorInspactEvent_";
    public static MOUSE_MOVE:string;
    public static MOUSE_DOWN:string;

    private static _enableMouseEvent = true;

    private static _mouseMoveTime:number = 500;
    private static _curMouseMoveTime:number = 0;

    private static _engine:IEngineInfo<any>;

    private static _mouseIsDown = false;

    private static _adapterMouseEvent:ICocosCreatorMouseEventAdapter;

    public static start(engine:IEngineInfo<cc.BaseNode>){
        let s = this;
        s._engine = engine;

        s.MOUSE_MOVE = CocosCreatorMouseEvent.EventPreName+cc.Node.EventType.MOUSE_MOVE;
        s.MOUSE_DOWN = CocosCreatorMouseEvent.EventPreName+cc.Node.EventType.MOUSE_DOWN;
        if(s._engine.version.startsWith("2.")||s._engine.version.startsWith("1.")){
            s._adapterMouseEvent = new CocosCreator2XMouseEvent(s._engine)
        }else{
            s._adapterMouseEvent = new CocosCreator3XMouseEvent(s._engine)
        }
        s._adapterMouseEvent.onMouseDown = (pos:cc.Vec2)=>{
            s._mouseIsDown = true;
            s._curMouseMoveTime = Date.now();
            let target = s._adapterMouseEvent.findTarget(pos)
            cc.director.emit(s.MOUSE_DOWN, target)
        }
        s._adapterMouseEvent.onMouseMove = (pos:cc.Vec2)=>{
            if(!s._mouseIsDown)return;
            let now = Date.now();
            if(now - s._curMouseMoveTime<s._mouseMoveTime)return;
            s._curMouseMoveTime = now;
            let target = s._adapterMouseEvent.findTarget(pos)
            cc.director.emit(s.MOUSE_MOVE, target)
        }
        s._adapterMouseEvent.onMouseUp = ()=>{
            s._mouseIsDown = false;
        }
    }

    public static set enableMouseEvent(value:boolean){
        let s = this;
        s._adapterMouseEvent.setEnableEvent(value);
        s._enableMouseEvent = value;
    }
    public static get enableMouseEvent(){
        return this._enableMouseEvent;
    }
    
}