

export interface PropNode{
    aliasName?:string;
    name:string;
    value:any;
    isGetter:boolean;
    isSetter:boolean;
    isPrivate:boolean;
    expandable:boolean;
    type:"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
}