
export interface CodeData{
    name:string;
    type:CodeRunRules;
    code:string;
    match?:string;
}

export const enum CodeRunRules {
    /**执行一次 */
    Once = "once",
    /**当前网站 */
    Site = "site",
    /**当前所在的frame */
    Game = "frame",
    /**用户自定义规则 */
    Custom = "custom",
}

export interface ContentURLS {
    url:string;
    engine?:string;
    frameId?:number;
}

