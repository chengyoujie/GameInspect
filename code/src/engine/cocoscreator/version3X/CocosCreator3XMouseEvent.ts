import { IEngineInfo } from "../../../common/IEngineInfo";
import { ICocosCreatorMouseEventAdapter } from "../CocosCreatorAdapterInterface";
import { Utils } from "../../../common/Utils";
import { ConstVars } from "../../../common/ConstVars";
export class CocosCreator3XMouseEvent implements ICocosCreatorMouseEventAdapter{
    /**显示ICocosCreatorMouseEventAdapter 接口 */
    onMouseDown: (target?: cc.Vec2) => void;
    onMouseMove: (target?: cc.Vec2) => void;
    onMouseUp: () => void;
    findTarget(pos: cc.Vec2){
        let s = this;
        s._target = null;
        s.check(s._engine.stage, pos);
        return s._target;
    }
    
    setEnableEvent(value: boolean) {
        this.enableMouseEvent = value;
    }

    private _target:cc.BaseNode;
    private enableMouseEvent = true;

    private _engine:IEngineInfo<cc.BaseNode>;


    public constructor(engine:IEngineInfo<cc.BaseNode>){
        let s = this;
        s._engine = engine;
        let canvas = cc.game.canvas;
        if(!canvas){
            Utils.log("Game Inpsce 对 Cocos Create 的鼠标处理 没有找到 对应的Canvas")
            return;
        }
        canvas.addEventListener('mousedown', (e)=>{
            let pos = _getLocation(e)
            s.onMouseDown(pos)
            if(!s.enableMouseEvent)e.stopImmediatePropagation();
        });
        canvas.addEventListener('mousemove', (e)=>{
            let pos = _getLocation(e)
            s.onMouseMove(pos)
            if(!s.enableMouseEvent)e.stopImmediatePropagation();
        });
        window.addEventListener('mouseup', (e)=>{
            s.onMouseUp();
            if(!s.enableMouseEvent)e.stopImmediatePropagation();
        });
        function  _getCanvasRect (): cc.Rect {
            const box = canvas?.getBoundingClientRect();
            if (box) {
                return new cc.Rect(box.x, box.y, box.width, box.height);
            }
            return new cc.Rect(0, 0, 0, 0);
        }
        function _getLocation (mouseEvent: MouseEvent): cc.Vec2 {
            const canvasRect = _getCanvasRect();
            const dpr = window.devicePixelRatio;
            let x =mouseEvent.clientX - canvasRect.x;
            let y = canvasRect.y + canvasRect.height - mouseEvent.clientY;
            x *= dpr;
            y *= dpr;

            let mousePos = new cc.Vec2(x, y);//获取到点击的位置
            cc.view["_convertToUISpace"](mousePos)//模拟 event.getUILocation 获取UI界面内的坐标
            return mousePos;
        }
    }
    
    private check(sp: cc.BaseNode,pos:cc.Vec2): boolean {
        let s = this;
        if(s._target)return true;
        if(!sp)return false;
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
            if(comp instanceof cc.RenderableComponent && !(comp instanceof cc.Mask))hasRender = true;
        }
        return hasRender;
    }

    private _hitTest (node:cc.BaseNode, pos:cc.Vec2) {
        let s = this;
        if(!node || !node.isValid || !s._engine.getVisible(node) || node.name == ConstVars.StageMaskName)return false;
        let tran:cc.UITransformComponent = node.getComponent(cc.UITransformComponent);
        if(tran){
            return tran.isHit(pos)
        }
        return false;
    }
}