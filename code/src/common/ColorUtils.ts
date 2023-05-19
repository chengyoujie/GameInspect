
export const enum ColorFormat{
    /**#FFFFFFFF十六进制格式*/
    HEX = "hex",
    /**rgba(255, 255, 255, 0.5)格式 */
    RGB = "rgb",
    /**hsla(255, 255, 255, 0.5)格式 */
    HSL = "hsl",
    /**数字 */
    Num = "num",
    /**rgb 对象 {r:0, g:255, b:255, a:0.5} */
    RGBObj = "rgbObj",
}
/**
 * 
 * ColorUtils 界面类
 * made by cyj
 * create on 2023-02-16 19:10:16 
*/
export class ColorUtils{
    private static HexReg = /^#\s*([0-9A-Fa-f]{1,8})$/
    private static RGBReg = /^(rgb|rgba)\s*\(\s*(\d+)\s*(,\s*[0-9\.]+)?\s*(,\s*[0-9\.]+)?\s*(,\s*[0-9\.]+\s*)?\)$/;
    private static HLSReg = /^(hsl|hsla)\s*\(\s*(\d+\%?)\s*(,\s*[0-9\.]+\%?)?\s*(,\s*[0-9\.]+\%?)?\s*(,\s*[0-9\.]+\%?\s*)?\)$/;
    private static NumReg = /^(\d+)$/;
    private static ALLReg = [this.HexReg, this.RGBReg, this.NumReg, this.HLSReg]

    public static toString(color:number, type:ColorFormat=ColorFormat.HEX){
        if (color < 0 || isNaN(color)) return "";
        let r = color>>16&0xFF;
        let g = color>>8&0xFF;
        let b = color&0xFF;
        if(type == ColorFormat.HEX){//#ffcc00格式
            let rStr = (r< 16 ? '0' : '') + (r).toString(16);
            let gStr = (g < 16 ? '0' : '') + (g).toString(16);
            let bStr = (b < 16 ? '0' : '') + (b).toString(16);
            return "#" + rStr+gStr+bStr;
        }else if(type == ColorFormat.Num){//121212格式
            return color;
        }else if(type == ColorFormat.RGB){
            return `rgb(${r},${g},${b})`;
        }else if(type == ColorFormat.HSL){
            return `hsl(${r},${g},${b})`;
        }
    }

    public static toNumber(color:string|Object):number{
        let s = this;
        let number = 0;
        if(typeof color == "object"){
            if(color["r"]!=undefined || color["g"]!=undefined || color["b"]!=undefined || color["a"]!=undefined){
                let r = color["r"]||0;
                let g = color["g"]||0;
                let b = color["b"]||0;
                let a = color["a"]||0;
                return (r<<16)+(g<<8)+b;
            }
        }else{
            let colorStr = color+"".trim();
            for(let i=0; i<s.ALLReg.length; i++){
                let reg = s.ALLReg[i];
                reg.lastIndex = -1;
                let arr = reg.exec(colorStr);
                if(!arr)continue;
                if(reg == this.HexReg){
                    if(arr[1].length==3){
                        let r = arr[1].charAt(0)
                        let g = arr[1].charAt(1)
                        let b= arr[1].charAt(2)
                        return parseInt(r+r+g+g+b+b, 16)
                    }else{
                        arr[1] = arr[1].substring(0, 6)
                        return parseInt(arr[1], 16)
                    }
                }else if(reg == this.RGBReg){
                    let r = +arr[2];
                    let g = arr[3]?+arr[3].replace(",", ""):0;
                    let b = arr[4]?+arr[4].replace(",",""):0;
                    // let a = arr[5]?+arr[5].replace(",",""):1;
                    return (r<<16)+(g<<8)+b;
                }else if(reg == this.HLSReg){
                    let r = +arr[2].replace("%", "");
                    let g = arr[3]?+arr[3].replace(",", "").replace("%", ""):0;
                    let b = arr[4]?+arr[4].replace(",","").replace("%", ""):0;
                    r = Math.floor(r/100*255)
                    g = Math.floor(g/100*255)
                    b = Math.floor(b/100*255)
                    // let a = arr[5]?+arr[5].replace(",","").replace("%", ""):1;
                    return (r<<16)+(g<<8)+b;
                }else if(reg == this.NumReg){
                    return +arr[1]
                }
            }
        }
        

        return number;
    }

    public static getFormat(color:string|Object):ColorFormat|null{
        if(!color)return null;
        if(typeof color == "object"){
            if(color["r"]!=undefined || color["g"]!=undefined || color["b"]!=undefined || color["a"]!=undefined){
                return ColorFormat.RGBObj;
            }
        }else{
            let colorStr = color+"".trim();
            if(this.HexReg.test(colorStr))return ColorFormat.HEX;
            if(this.RGBReg.test(colorStr))return ColorFormat.RGB;
            if(this.NumReg.test(colorStr))return ColorFormat.Num;
            if(this.HLSReg.test(colorStr))return ColorFormat.HSL;
        }
        return null;
    }
}