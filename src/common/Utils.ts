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
        let colors = ["#091528", "#fc0000", "#03783d", "#a6a902", "#011c7e", "#8f067e", "#027e6d"];
        let logParams = [""];
        for(let i=0; i<args.length; i++){
            let color = colors[i%colors.length];
            logParams[0] += (i==0?"":" ")+"%c "+args[i];
            let cornerLeft = i==0?3:0;
            let cornerRight = i==args.length-1?3:0;
            logParams.push(`background: ${color}; padding: 4px; border-radius: ${cornerLeft}px ${cornerRight}px ${cornerRight}px ${cornerLeft}px; color: #fff`)
        }
        console.log.apply(console, logParams);
    }
    public static error(msg:string){
        console.log(`%c${msg}`,'background: #fc0000; padding: 4px; border-radius: 3px 3px 3px 3px; color: #fff');
    }
}