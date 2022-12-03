import { IEngineInfo } from "../../IEngineInfo";

export class LayaMouseEvent{
    public static EventPreName = "layaInspactEvent_";
    public static MOUSE_MOVE:string;// = DevMouseEvent.EventPreName+Laya.Event.MOUSE_MOVE;
    public static MOUSE_DOWN:string;// = DevMouseEvent.EventPreName+Laya.Event.MOUSE_DOWN;

    private static _point:Laya.Point;
    private static _target:Laya.Sprite;
    private static _rect: Laya.Rectangle;
    public static enableMouseEvent = true;

    private static _mouseMoveTime:number = 500;
    private static _curMouseMoveTime:number = 0;

    private static _engine:IEngineInfo<Laya.Sprite>;

    public static start(engine:IEngineInfo<Laya.Sprite>){
        let s = this;
        s._engine = engine;
        s._point = new Laya.Point();
        s._rect = new Laya.Rectangle();
        s.MOUSE_MOVE = LayaMouseEvent.EventPreName+Laya.Event.MOUSE_MOVE;
        s.MOUSE_DOWN = LayaMouseEvent.EventPreName+Laya.Event.MOUSE_DOWN;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, s, s.handleMouseDownEvent)
        Laya.stage.on(Laya.Event.MOUSE_UP, s, s.handleMouseUPEvent)
        Laya.stage.on(Laya.Event.MOUSE_DOWN, s, s.handleMouseEvent)
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
        s.check(Laya.stage, Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY);
        Laya.stage.event(LayaMouseEvent.EventPreName+e.type, s._target)
    }
    
    private static check(sp: Laya.Sprite, mouseX: number, mouseY: number): boolean {
        this._point.setTo(mouseX, mouseY);
        sp.fromParentPoint(this._point);
        mouseX = this._point.x;
        mouseY = this._point.y;

        //如果有裁剪，则先判断是否在裁剪范围内
        var scrollRect: Laya.Rectangle = sp["_style"].scrollRect;
        if (scrollRect) {
            this._rect.setTo(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
            if (!this._rect.contains(mouseX, mouseY)) return false;
        }
        let notCheckChild = false;//不响应鼠标的对象
        if(Laya.Label && sp instanceof Laya.Label)notCheckChild = true;
        if(Laya.Button && sp instanceof Laya.Button)notCheckChild = true;
        if(Laya.Image && sp instanceof Laya.Image)notCheckChild = true;
        if(Laya.Text && sp instanceof Laya.Text)notCheckChild = true;
        let children = this._engine.getChildren(sp);
        if (!notCheckChild && children) {
            for (var i: number = children.length - 1; i > -1; i--) {
                var child: Laya.Sprite = children[i];
                //只有接受交互事件的，才进行处理
                if (!child.destroyed &&  child.visible) {
                    if (this.check(child, mouseX, mouseY)) 
                        return true;
                }
            }
            // 检查逻辑子对象
            if(sp["_extUIChild"]){
                for (i = sp["_extUIChild"].length - 1; i >= 0; i--) {
                    var c: Laya.Sprite = sp["_extUIChild"][i];
                    if (!c.destroyed &&  c.visible) {
                        if (this.check(c, mouseX, mouseY)) 
                            return true;
                    }
                }
            }
        }
        var isHit: boolean =  this.hitTest(sp, mouseX, mouseY);
        if (isHit) {
            this._target = sp;
        } 

        return isHit;
    }
    private static hitTest(sp: Laya.Sprite, mouseX: number, mouseY: number): boolean {
        var isHit: boolean = false;
        if (sp.scrollRect) {
            mouseX -= sp["_style"].scrollRect.x;
            mouseY -= sp["_style"].scrollRect.y;
        }
        var hitArea: any = sp["_style"].hitArea;
        if (hitArea && hitArea._hit) {
            return hitArea.contains(mouseX, mouseY);
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
}