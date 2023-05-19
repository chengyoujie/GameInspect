export class EventBase{
    private _eventDic:{[event:string]:{thisObj:any, fun:(...any:any)=>void}[]} = {}
    public on(event:string, fun:(...any:any)=>void, thisObj:any){
        let s = this;
        if(!s._eventDic[event])s._eventDic[event] = [];
        s._eventDic[event].push({thisObj:thisObj, fun:fun})
    }

    public trigger(event:string, ...params:any[]){
        let s = this;
        let list = s._eventDic[event];
        if(list){
            for(let i=0; i<list.length; i++){
                list[i].fun.apply(list[i].thisObj, params)
            }
        }
    }

    public clear(){
        this._eventDic = {};
    }
}