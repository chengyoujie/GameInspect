import { ConstVars } from "./ConstVars";
import { ContentURLS } from "./UserCodeInfo";

export class Utils{
    private static _uid:number = 0;
    /**防止cocos 把console.log 重写了 */
    public static ConsoleLogFun = console.log;
    private static _uid2Obj: {[uid: string]: any} = {};

    public static getUID(){
        let s = this;
        s._uid ++;
        return s._uid;
    }

    
    public static setObjectDevUUID(obj:Object){
        let s = this;
        if(!obj)return;
        if(!obj.hasOwnProperty("devUUID")){
            Object.defineProperty(obj, "devUUID", {
                get() {
                    let uid:number = this['$_DevUUID'];
                    if (!uid) {
                        uid = this['$_DevUUID'] = s.getUID();
                        s._uid2Obj[uid] = this;
                    }
                    return uid;
                },
                enumerable: false
            })
        }
    }

    public static getObjectByDevUUID(uid:number){
        return this._uid2Obj[uid];
    }



    
    public static stringifyValue(value:any):string {
        let type = typeof value;
        if(value==null) return "null";
        if(value == undefined) return "undefined"
        switch(type){
            case "string":
                return value;
            case "bigint":
            case "number":
                return isNaN(value)?"NaN":value;
            case "object":
                if(Array.isArray(value)){
                    return "array";
                }else{
                    return this.getClassName(value);//value.constructor["name"] || "object";
                }
            case "function":
                return String(value);
            default:
                return String(value);
        }
    }

    public static parseValue(value:any){
        if(value=="NaN" || value=="undefined")return undefined;
        if(value=="null")return null;
        if(value=="true")return true;
        if(value=="false")return false;
        try{
            return JSON.parse(value)//s.modifyPropValueType(prop, changeValue);
        }catch(e){
            return value;
        }
    }

    public static setObjPropClassName(obj:any){
        if(!obj || typeof obj != "object")return;
       for(let key in obj){
            if(obj[key] && obj[key]["prototype"]){
                let propObj = obj[key]["prototype"]
                if(propObj[ConstVars.GAMEINSPECT_CLASS_KEY])continue;
                Object.defineProperty(propObj, ConstVars.GAMEINSPECT_CLASS_KEY, {
                    get:function(){
                        return key;
                    },
                    enumerable:false,
                })
            }
       }
    }

    
    public static getClassName(obj:any){
        if(typeof obj == "number" || typeof obj == "string")return obj;
        if(obj["__class__"])return obj.__class__;//egret
        if(obj.constructor  && obj.constructor["__classid"] && obj.constructor["__classid"].indexOf && obj.constructor["__classid"].indexOf("CLS_")!=0)return obj.constructor.__classid;//my game
        if(obj["$owner"]){//fgui
            let owner = obj["$owner"]
            if(owner["__class__"])return owner.__class__;//egret
            if(owner.__classname__)return owner.__classname__;//Cocos create
            if(owner._className)return owner._className;//Cocos2d-JS
            let clsName:string;
            // if(obj.constructor && obj.constructor.name)clsName = obj.constructor.name;//common
            // if(clsName.indexOf("fgui")!=-1)return clsName;
            if(owner.constructor && owner.constructor.name)clsName = owner.constructor.name;//common
            if(clsName && clsName.length>2)return clsName;//猜测类名长度小于等于2的可能是压缩后的代码
            if(owner[ConstVars.GAMEINSPECT_CLASS_KEY])return owner[ConstVars.GAMEINSPECT_CLASS_KEY];
            return clsName || typeof owner;
        }
        if(obj.__classname__)return obj.__classname__;//Cocos create
        if(obj._className)return obj._className;//Cocos2d-JS
        if(obj.__className && obj.__className.substring(0, 4).toLocaleLowerCase()!="laya")return obj.__className;//其他
        let clsName:string;
        if(obj.constructor && obj.constructor.name)clsName = obj.constructor.name;//common
        if(clsName && clsName.length>2)return clsName;//猜测类名长度小于等于2的可能是压缩后的代码
        if(obj[ConstVars.GAMEINSPECT_CLASS_KEY])return obj[ConstVars.GAMEINSPECT_CLASS_KEY];
        return clsName || typeof obj;
    }

    public static log(...args:string[]){
        if(!args || args.length==0)return;
        let colors = ["#a6d2b5", "#cda6d2", "#d2a6b1", "#a6bfd2", "#d2b2a6", "#a6a8d2", "#d190df"];
        let logParams = [""];
        for(let i=0; i<args.length; i++){
            let color = colors[i%colors.length];
            logParams[0] += (i==0?"":" ")+"%c "+args[i];
            let cornerLeft = i==0?3:0;
            let cornerRight = i==args.length-1?3:0;
            logParams.push(`background: ${color}; padding: 4px;font-size: 13px; border-radius: ${cornerLeft}px ${cornerRight}px ${cornerRight}px ${cornerLeft}px; color: #163808`)
        }
        this.ConsoleLogFun.apply(console, logParams);
    }
    public static error(msg:string){
        this.ConsoleLogFun.call(console, `%c${msg}`,'background: #f5a2a2; padding: 4px; width:100%; border-radius: 3px 3px 3px 3px; color: #ff0000;font-size: 13px;');
    }

    public static transformUserRuleCode(code:string, urls:ContentURLS[]){
        let engineName:string="";
        let frameURL:string="";
        let sitURL:string="";
        for(let i=0; i<urls.length; i++){
            if(urls[i].engine){
                engineName = urls[i].engine;
                frameURL = urls[i].url;
            }
            if(!urls[i].frameId){
                sitURL = urls[i].url;
            }
        }
        code = this.replaceAll(code, ConstVars.$EngineName, '"'+engineName+'"', ConstVars.$SITEURL, '"'+sitURL+'"',ConstVars.$GAMEURL, '"'+frameURL+'"')
        // code = code.replace(ConstVars.$EngineName, '"'+engineName+'"').replace(ConstVars.$SITEURL, '"'+sitURL+'"').replace(ConstVars.$GAMEURL, '"'+frameURL+'"')
        return code;
    }
    /**
     * 添加script 代码
     * @param code 
     */
     public static addScript(code:string, name:string, override:boolean =true){
        name = "$gameInspectInsertScript_"+name
        let tag = document.getElementById(name);
        if(tag){
            if(!override)return;
            document.head.removeChild(tag);
        }
        var script = document.createElement("script")
        script.innerHTML = code;
        script.id = name;
        try{
            document.head.appendChild(script)
        }catch(e){
            if(ConstVars.DEBUG){
                console.log("添加脚本失败 "+name)
            }
        }
    }

    /**
     * 添加script 代码
     * @param code 
     */
     public static addSrcScript(src:string, name:string, callBack:(result:boolean)=>void=null, override:boolean =true){
        name = "$gameInspectInsertSrcScript_"+name
        let tag = document.getElementById(name);
        if(tag){
            if(!override)return;
            document.head.removeChild(tag);
        }
        let s = this;
        var script = document.createElement("script")
        script.src = src;
        script.id = name;
        script.onload = ()=>{
            //添加用户的代码
            if(callBack)callBack(true)
        }
        script.onerror = ()=>{
            if(callBack)callBack(false);
        }
        document.head.appendChild(script)
    }

    public static evalUserRuleCode(code:string, url:ContentURLS, name:string){
        let s = this;
        let engineName = "";
        let sitURL:string="";
        let frameURL:string="";
        if(url.engine){
            engineName = url.engine;
            frameURL = url.url;
        }
        if(!url.frameId)sitURL = url.url;
        code = this.replaceAll(code, ConstVars.$VarEngineName, '"'+engineName+'"', ConstVars.$VarSiteURL, '"'+sitURL+'"',ConstVars.$VarGameURL, '"'+frameURL+'"')
        let funName = `$gameInspectMatchUserCode${name}`
        Utils.addScript(`function ${funName}(){
            ${code};
        }
        `, "useMatchScprit"+name);
        return window[funName]?window[funName]():false;
    }

    private static replaceAll(str:string, ...args){
        if(!str)return str;
        for(let i=0; i<args.length; i+=2){
            let oldValue = args[i];
            let replaceValue = args[i+1];
            oldValue = oldValue.replace(/(\$|\||\.|\*|\?|\+|\{|\}|\[|\]|\%)/gi, "\\$1")
            let reg = new RegExp(oldValue, "gi");
            str = str.replace(reg, replaceValue)
        }
        return str;
    }


    
    public static copy(value:string):void
    {
        let textarea: any = document.getElementById("oInput");
        if (!textarea) {
            textarea = document.createElement("textarea");
            document.body.appendChild(textarea);
            textarea.id = 'oInput';
            textarea.readOnly = 'readonly';
            textarea.position = "absolute";
        }
        textarea.value = value + "";
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }

    public static download(saveStr:string, fileName:string, type:string="text"){
        const element:any = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        let ev = document.createEvent("MouseEvents");
        let urlObject:any = window.URL || window.webkitURL || window;
        let export_blob = new Blob([saveStr], {type: type});
        element.href = urlObject.createObjectURL(export_blob);
        element.download = fileName;
        ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(ev);
        urlObject.revokeObjectURL(element.href);
        element.href = '';
    }

    /**
     * 获取时间信息
     * @param {*} format 
     * @returns 
     */
    public static getDateStr(format?:string)
    {
        format = format?format:"yyyy-MM-dd hh:mm:ss";
        let date = new Date();
        var dateReg = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in dateReg) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? dateReg[k] : ("00" + dateReg[k]).substr(("" + dateReg[k]).length));
                }
        }
        return format;
    }

    /**
     * 拷贝一个对象到另一个对象（如果toObj为空则会新生成一个对象）上
     * @param originObj 
     * @param toObj 
     * @returns 
     */
    public static copyObj(originObj:any, toObj?:any, notCopyFun?:boolean){
        if(!originObj)return;
        toObj = toObj || {};
        for(let key in originObj){
            if(notCopyFun){
                if(typeof originObj[key] == "function")continue;
            }
            toObj[key] = originObj[key];
        }
        return toObj;
    }


}