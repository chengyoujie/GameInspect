import { IEngineInfo } from "../../common/IEngineInfo";

export class LayaMouseEvent{
    // public static EventPreName = "layaInspactEvent_";
    // public static MOUSE_MOVE:string;// = DevMouseEvent.EventPreName+Laya.Event.MOUSE_MOVE;
    // public static MOUSE_DOWN:string;// = DevMouseEvent.EventPreName+Laya.Event.MOUSE_DOWN;

    private static _point:Laya.Point;
    private static _target:Laya.Node;
    private static _rect: Laya.Rectangle;
    public static enableMouseEvent = true;

    private static _mouseMoveTime:number = 500;
    private static _curMouseMoveTime:number = 0;

    private static _engine:IEngineInfo<Laya.Node>;

    public static onMouseEvent:(event:string, target:Laya.Node)=>void;

    public static start(engine:IEngineInfo<Laya.Node>){
        let s = this;
        s._engine = engine;
        s._point = new Laya.Point();
        s._rect = new Laya.Rectangle();
        // s.MOUSE_MOVE = LayaMouseEvent.EventPreName+Laya.Event.MOUSE_MOVE;
        // s.MOUSE_DOWN = LayaMouseEvent.EventPreName+Laya.Event.MOUSE_DOWN;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, s, s.handleMouseDownEvent)
        Laya.stage.on(Laya.Event.MOUSE_UP, s, s.handleMouseUPEvent)
        Laya.stage.on(Laya.Event.MOUSE_DOWN, s, s.handleMouseEvent)
        if(Laya.TouchManager){
            let touchProto = Laya.TouchManager.prototype;
            let oldSendFun:Function = touchProto["sendEvents"]
            Object.defineProperties(touchProto, {
                sendEvents:{
                    value:function(eles: any[], type: string): void {
                        if(!s.enableMouseEvent && type == Laya.Event.CLICK){
                            return;
                        }
                        oldSendFun.call(this, eles, type)
                    },
                    enumerable:true,
                    
                }
            })
        }else if(Laya.InputManager){//3.0 的 鼠标事件
            let touchProto = Laya.InputManager.prototype;
            let oldSendFun:Function = touchProto["bubbleEvent"]
            Object.defineProperties(touchProto, {
                bubbleEvent:{
                    value:function(type: string, ev: Event, initiator: Node): void {
                        if(!s.enableMouseEvent && type == Laya.Event.CLICK){
                            return;
                        }
                        oldSendFun.call(this, type, ev, initiator)
                    },
                    enumerable:true,
                    
                }
            })
        }
    }

    private static handleMouseDownEvent(e:Laya.Event){
        let s = this;
        s._curMouseMoveTime = Date.now();
        Laya.stage.on(Laya.Event.MOUSE_MOVE, s, s.handleMouseMove)
    }
    private static handleMouseUPEvent(e:Laya.Event){
        let s = this;
        Laya.stage.off(Laya.Event.MOUSE_MOVE, s, s.handleMouseMove)
    }

    private static handleMouseMove(e:Laya.Event){
        let s = this;
        let now = Date.now();
        if(now - s._curMouseMoveTime<s._mouseMoveTime)return;
        s._curMouseMoveTime = now;
        s.handleMouseEvent(e);
    }

    private static handleMouseEvent(e:Laya.Event){
        let s = this;
        let mouseX = 0;
        let mouseY = 0;
        if(Laya.MouseManager){//<3.0版本的
            mouseX = Laya.MouseManager.instance.mouseX;
            mouseY = Laya.MouseManager.instance.mouseY;
        }else{//3.0版本
            mouseX = Laya.InputManager.mouseX;
            mouseY = Laya.InputManager.mouseY;
        }
        s.check(Laya.stage, mouseX, mouseY, mouseX, mouseY);
        // Laya.stage.event(LayaMouseEvent.EventPreName+e.type, s._target)//laya3.0会导致 _setBit(NodeFlags.CHECK_INPUT, true) 影响点击效果
        if(LayaMouseEvent.onMouseEvent){
            LayaMouseEvent.onMouseEvent.call(s, e.type, s._target)
        }
    }
    
    private static check(sp: Laya.Sprite, mouseX: number, mouseY: number, stageX:number, stageY): boolean {
        this._point.setTo(mouseX, mouseY);
        if(sp["fromParentPoint"])
        {
            sp.fromParentPoint(this._point);
            mouseX = this._point.x;
            mouseY = this._point.y;
        }

        //如果有裁剪，则先判断是否在裁剪范围内
        var scrollRect: Laya.Rectangle = sp["_style"]?sp["_style"].scrollRect:null;
        if (scrollRect) {
            this._rect.setTo(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
            if (!this._rect.contains(mouseX, mouseY)) return false;
        }
        if(sp["$owner"] && this._engine.getClassName(sp["$owner"]) == "GGroup"){//laya + fgui时 高级组会遮挡字对象
            return;
        }
        let notCheckChild = false;//不响应鼠标的对象
        if(Laya.Label && sp instanceof Laya.Label)notCheckChild = true;
        if(Laya.Button && sp instanceof Laya.Button)notCheckChild = true;
        if(Laya.Image && sp instanceof Laya.Image)notCheckChild = true;
        if(Laya.Text && sp instanceof Laya.Text)notCheckChild = true;
        let children = this._engine.getChildren(sp);
        if (!notCheckChild && children) {
            for (var i: number = children.length - 1; i > -1; i--) {
                var child: Laya.Sprite = children[i] as Laya.Sprite;
                // if(!(child instanceof Laya.Sprite))continue;
                //只有接受交互事件的，才进行处理
                if (!child.destroyed &&  child.visible/**非Sprite的node中没有visible属性**/!=false) {
                    if (this.check(child, mouseX, mouseY, stageX, stageY)) 
                        return true;
                }
            }
            // 检查逻辑子对象
            if(sp["_extUIChild"]){
                for (i = sp["_extUIChild"].length - 1; i >= 0; i--) {
                    var c: Laya.Sprite = sp["_extUIChild"][i];
                    if(!(c instanceof Laya.Sprite))continue;
                    if (!c.destroyed &&  c.visible) {
                        if (this.check(c, mouseX, mouseY, stageX, stageY)) 
                            return true;
                    }
                }
            }
        }
        var isHit: boolean =  this.hitTest(sp, mouseX, mouseY, stageX, stageY);
        if (isHit) {
            this._target = sp;
        } 

        return isHit;
    }

    private static hitTest(sp: Laya.Sprite, mouseX: number, mouseY: number, stageX:number, stageY:number): boolean {
        let s = this;
        if(Laya.Sprite3D && sp instanceof Laya.Sprite3D){
            return s.hitTest3D(sp, stageX, stageY)
        }else{
            return s.hitTest2D(sp, mouseX, mouseY);
        }

    }


    private static hitTest2D(sp: Laya.Sprite, mouseX: number, mouseY: number): boolean {
        var isHit: boolean = false;
        var hitArea: any;
        if(sp["_style"]){
            if (sp.scrollRect) {
                mouseX -= sp["_style"].scrollRect.x;
                mouseY -= sp["_style"].scrollRect.y;
            }
            hitArea = sp["_style"].hitArea;
            if (hitArea && hitArea._hit) {
                return hitArea.contains(mouseX, mouseY);
            }
        }
        if (sp.width > 0 && sp.height > 0 || sp.mouseThrough || hitArea) {
            //判断是否在矩形区域内
            if (!sp.mouseThrough) {
                //MOD by liuzihao: saved call of 'hitRect' and 'this._rect' when 'sp.hitArea' is not null.
                isHit = (hitArea ? hitArea : this._rect.setTo(0, 0, sp.width, sp.height)).contains(mouseX, mouseY);
            } else {
                //如果可穿透，则根据子对象实际大小进行碰撞
                isHit = sp.getGraphicBounds().contains(mouseX, mouseY);
            }
        }
        return isHit;
    }

    private static hitTest3D(sp: Laya.Sprite3D, stageX: number, stageY: number): boolean {
        if(!Laya.Sprite3D || !Laya.HitResult)return false;
        if(!sp.scene )return false;
        let sim = sp.scene.cannonPhysicsSimulation || sp.scene.physicsSimulation;
        if(!sim)return;
        var cameras: Laya.BaseCamera[] = sp.scene._cameraPool;
        if(!cameras || !cameras.length)return false;
        var touchPos: Laya.Vector2 = new Laya.Vector2(stageX, stageY);
        var touchRay = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        var touchHitResult = new Laya.HitResult()
        touchHitResult.succeeded = false;
        for (var i: number = cameras.length - 1; i >= 0; i--) {
			var camera: Laya.Camera = (<Laya.Camera>cameras[i]);
			camera.viewportPointToRay(touchPos, touchRay);
            sim.rayCast(touchRay, touchHitResult);
            if(touchHitResult.succeeded && touchHitResult.collider.owner==sp){
                return true;
            }
		}
        return false;
    }
}