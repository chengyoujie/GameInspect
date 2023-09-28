export class ConstVars{

    // public static HOMEURL = "https://chengyoujie.github.io/GameInspect";

    // public static HOMEURL = "http://172.18.2.153:9898/myProgream/GameInspect";// /version/version.txt


    // public static ReleaseURL= "https://github.com/chengyoujie/GameInspect/releases/download/release"
    
    public static VERSIONURL = "https://github.com/chengyoujie/GameInspect/releases/download/release";

    public static VERSIONINFOURL = "https://chengyoujie.github.io/GameInspect/version/version.txt"
    //测试
    // public static VERSIONINFOURL = "http://172.18.2.153:9898/myProgream/GameInspect/version/version.txt";

    public static StageMaskName = "$GAME_INSPECT_MASK";

    public static BUGURL = "https://github.com/chengyoujie/GameInspect/issues";
    //
    public static GitHubURL = "https://github.com/chengyoujie/GameInspect";

    public static TongJiURL = "https://hm.baidu.com/hm.js?616b91f08c766f10bb08e53dab9823fe";

    public static QQ = "613279506";
    /**心跳 */
    public static HEARTBEAT = 5000;

    /** 游戏是否已经重新加载过了 */
    public static WINDOW_RELOAD_TAG = "$gameInspectHasReload"
    /** 游戏是否已经注入了reload的代码 */
    public static WINDOW_INJECT_RELOAD_CODE = "$gameInspectReloadCode"
    /** 游戏是否 已经找到引擎了 */
    public static WINDOW_HAS_FIND_ENGINE = "$gameInspectHasFindEngine"
    /**引擎Manager的属性名 */
    public static ENGINE_MANAGER_PROP_NAME = "$gameInspectEngineManager"
    /**拓展引擎Manager的属性名 */
    public static ENGINE_EXTEND_PROP_NAME = "$gameInspectExtendManager"
    /** */
    public static GAMEINSPECT_CLASS_KEY = "$_gameInspect_class_key_$";

    public static GAMEINSPECT_INIT = "$gameInspectInit";


    //正式
    public static DEBUG = false;
    public static DEV = false;
    //内网
    // public static DEBUG = false;
    // public static DEV = true;
    //测试
    // public static DEBUG = true;
    // public static DEV = false;


    public static $GAMEURL = "#GAMEURL#"
    public static $SITEURL = "#SITEURL#"
    public static $EngineName = "#ENGINENAME#"
    //$SiteURL 网站地址  $FrameURL 框架地址
    public static $VarGameURL = "$gameURL"
    public static $VarSiteURL = "$siteURL"
    public static $VarEngineName = "$engineName"
    public static $SCRITP_NAMES = "gameInsectScriptNames"

    public static SPECIAL_NAME_START = "{"
    public static SPECIAL_NAME_END = "}"
}