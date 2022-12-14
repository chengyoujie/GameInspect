import { ConstVars } from "./ConstVars";
import { ContentURLS } from "./UserCodeInfo";

export class Utils{
    private static _uid:number = 0;

    public static getUID(){
        let s = this;
        s._uid ++;
        return s._uid;
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

    
    public static getClassName(obj:any){
        if(typeof obj == "number" || typeof obj == "string")return obj;
        if(obj["__class__"])return obj.__class__;//egret
        if(obj.constructor  && obj.constructor["__classid"] && obj.constructor["__classid"].indexOf && obj.constructor["__classid"].indexOf("CLS_")!=0)return obj.constructor.__classid;//my game
        if(obj["$owner"] && obj["$owner"].constructor) return obj["$owner"].constructor.name;//fgui
        if(obj.__classname__)return obj.__classname__;//Cocos create
        if(obj._className)return obj._className;//Cocos2d-JS
        if(obj.__className)return obj.__className;//其他
        if(obj.constructor && obj.constructor.name)return obj.constructor.name;//common
        return typeof obj;
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
        console.log.apply(console, logParams);
    }
    public static error(msg:string){
        console.log(`%c${msg}`,'background: #f5a2a2; padding: 4px; width:100%; border-radius: 3px 3px 3px 3px; color: #ff0000;font-size: 13px;');
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

    public static evalUserRuleCode(code:string, url:ContentURLS){
        let engineName = "";
        let sitURL:string="";
        let frameURL:string="";
        if(url.engine){
            engineName = url.engine;
            frameURL = url.url;
        }
        if(!url.frameId)sitURL = url.url;
        code = this.replaceAll(code, ConstVars.$VarEngineName, '"'+engineName+'"', ConstVars.$VarSiteURL, '"'+sitURL+'"',ConstVars.$VarGameURL, '"'+frameURL+'"')
        return code;
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

    private static _totastId = 0;
    public static totast(msg:string){
        this._totastId++;
        let id = "gameInspectTotast"+this._totastId;
        var msgTag = $('<div id="'+id+'" class="totast"><span></span></div>');
        $("body").append(msgTag);
        msgTag.fadeIn("slow").find("span").html(msg);
        setTimeout(function(){
            msgTag.fadeOut(800, ()=>{
                console.log("移除： "+id)
                msgTag.remove();
            });
        },1200)
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


}