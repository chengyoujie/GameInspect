import { EventBase } from "./EventBase";

export class TreeNode extends EventBase{
    public uid:string="";
    public name:string="";
    public memberName:string="";
    public icon:string="";
    public visible:boolean = true;
    public children:TreeNode[] = [];
    public hasChildren:boolean = false;
    public props:{[name:string]:PropNode} = {};
    public show:boolean = false;
    private _selected:boolean = false;

    constructor(node?:string|object){
        super();
        let s = this;
        if(node){
            let obj:any;
            if(typeof node == "string"){
                obj = JSON.parse(node);
            }else{
                obj = node;
            } 
            let props = Object.getOwnPropertyNames(obj);
            for(let pindex in props){
                let key = props[pindex]
                if(key == "children"){
                    let children = obj[key];
                    s.updateChild(children, false)
                }else{
                    s[key] = obj[key]
                }
            }
        }
        
    }

    public toggle(){
        let s = this;
        s.show = !s.show;
        s.showChildren();
        s.updateIcon();
        s.trigger(TreeNodeEvent.ShowChange);
    }

    public set selected(value:boolean){
        let s = this;
        s._selected = value;
        if(s._selected)
            s.trigger(TreeNodeEvent.OnSelected)
        else
            s.trigger(TreeNodeEvent.UnSelected);
    }

    public get selected(){return this._selected;}

    public parserProp(){

    }


    private showChildren(){
        let s = this;
        if(s.show){

        }
    }

    public replaceChild(item:TreeNode){
        let s = this;
        for(let i=0; i<s.children.length; i++){
            if(s.children[i].uid == item.uid){
                s.children[i] = item;
                break;
            }
        }
    }

    public updateChild(children:any[], tigger=true){
        let s = this;
        s.children.length = 0;
        for(let i=0; i<children.length; i++){
            let childNode = new TreeNode(children[i])
            s.children.push(childNode)
        }
        s.hasChildren = s.children.length>0;
        if(tigger)this.trigger(TreeNodeEvent.ChildrenChange)
    }

    public updateProps(props:{[name:string]:PropNode}){
        let s = this;
        s.props = {};
        if(!props)return;
        s.props = props;
    }

    public changeProps(newValue:string, propPath:string){
        let s = this;
        let obj = s.props;
        if(propPath){
            let paths = propPath.split(".");
            for(let i=0; i<paths.length; i++){
                if(i==paths.length-1){
                    if(obj[paths[i]]) obj[paths[i]].value = newValue;
                }else{
                    obj = obj[paths[i]]?obj[paths[i]].value:null;
                    if(!obj)return;
                }
            }
        }
    }

    public updateIcon(){
        this.icon = this.hasChildren?this.show? "-":"+" : "&nbsp;";
    }

    on(event:TreeNodeEvent, fun:(...any:any)=>void, thisObj:any)
    {
        super.on(event, fun, thisObj)
    }

}

export interface PropNode{
    /***别名， 如果有值则属性面板优先显示这个名字 */
    aliasName?:string;
    name:string;
    value:any;
    /**值的其他附加类型 */
    valueExtParam?:any;
    isGetter:boolean;
    isSetter:boolean;
    isPrivate:boolean;
    expandable:boolean;
    type:"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
}

export const enum TreeNodeEvent{
    ShowChange = "showChange",
    /**显示子对象 */
    ChildrenChange = "childrenChange",

    OnSelected = "onSelected",

    UnSelected = "unselected",

}

