/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/ConstVars.ts":
/*!*********************************!*\
  !*** ./src/common/ConstVars.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConstVars = void 0;
var ConstVars = /** @class */ (function () {
    function ConstVars() {
    }
    // public static HOMEURL = "https://chengyoujie.github.io/GameInspect";
    // public static HOMEURL = "http://172.18.2.153:9898/myProgream/GameInspect";// /version/version.txt
    // public static ReleaseURL= "https://github.com/chengyoujie/GameInspect/releases/download/release"
    ConstVars.VERSIONURL = "https://github.com/chengyoujie/GameInspect/releases/download/release";
    ConstVars.VERSIONINFOURL = "https://chengyoujie.github.io/GameInspect/version/version.txt";
    //测试
    // public static VERSIONINFOURL = "http://172.18.2.153:9898/myProgream/GameInspect/version/version.txt";
    ConstVars.StageMaskName = "$GAME_INSPECT_MASK";
    ConstVars.BUGURL = "https://github.com/chengyoujie/GameInspect/issues";
    //
    ConstVars.GitHubURL = "https://github.com/chengyoujie/GameInspect";
    ConstVars.TongJiURL = "https://hm.baidu.com/hm.js?616b91f08c766f10bb08e53dab9823fe";
    ConstVars.QQ = "613279506";
    /**心跳 */
    ConstVars.HEARTBEAT = 5000;
    /** 游戏是否已经重新加载过了 */
    ConstVars.WINDOW_RELOAD_TAG = "$gameInspectHasReload";
    /** 游戏是否已经注入了reload的代码 */
    ConstVars.WINDOW_INJECT_RELOAD_CODE = "$gameInspectReloadCode";
    /** 游戏是否 已经找到引擎了 */
    ConstVars.WINDOW_HAS_FIND_ENGINE = "$gameInspectHasFindEngine";
    /**引擎Manager的属性名 */
    ConstVars.ENGINE_MANAGER_PROP_NAME = "$gameInspectEngineManager";
    /** */
    ConstVars.GAMEINSPECT_CLASS_KEY = "$_gameInspect_class_key_$";
    //正式
    ConstVars.DEBUG = false;
    ConstVars.DEV = false;
    //内网
    // public static DEBUG = false;
    // public static DEV = true;
    //测试
    // public static DEBUG = true;
    // public static DEV = false;
    ConstVars.$GAMEURL = "#GAMEURL#";
    ConstVars.$SITEURL = "#SITEURL#";
    ConstVars.$EngineName = "#ENGINENAME#";
    //$SiteURL 网站地址  $FrameURL 框架地址
    ConstVars.$VarGameURL = "$gameURL";
    ConstVars.$VarSiteURL = "$siteURL";
    ConstVars.$VarEngineName = "$engineName";
    ConstVars.$SCRITP_NAMES = "gameInsectScriptNames";
    ConstVars.SPECIAL_NAME_START = "{";
    ConstVars.SPECIAL_NAME_END = "}";
    return ConstVars;
}());
exports.ConstVars = ConstVars;


/***/ }),

/***/ "./src/common/EventBase.ts":
/*!*********************************!*\
  !*** ./src/common/EventBase.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventBase = void 0;
var EventBase = /** @class */ (function () {
    function EventBase() {
        this._eventDic = {};
    }
    EventBase.prototype.on = function (event, fun, thisObj) {
        var s = this;
        if (!s._eventDic[event])
            s._eventDic[event] = [];
        s._eventDic[event].push({ thisObj: thisObj, fun: fun });
    };
    EventBase.prototype.trigger = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var s = this;
        var list = s._eventDic[event];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                list[i].fun.apply(list[i].thisObj, params);
            }
        }
    };
    EventBase.prototype.clear = function () {
        this._eventDic = {};
    };
    return EventBase;
}());
exports.EventBase = EventBase;


/***/ }),

/***/ "./src/common/TreeNode.ts":
/*!********************************!*\
  !*** ./src/common/TreeNode.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TreeNode = void 0;
var EventBase_1 = __webpack_require__(/*! ./EventBase */ "./src/common/EventBase.ts");
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode(node) {
        var _this = _super.call(this) || this;
        _this.uid = "";
        _this.name = "";
        _this.memberName = "";
        _this.icon = "";
        _this.visible = true;
        _this.children = [];
        _this.hasChildren = false;
        _this.props = {};
        _this.show = false;
        _this._selected = false;
        var s = _this;
        if (node) {
            var obj = void 0;
            if (typeof node == "string") {
                obj = JSON.parse(node);
            }
            else {
                obj = node;
            }
            var props = Object.getOwnPropertyNames(obj);
            for (var pindex in props) {
                var key = props[pindex];
                if (key == "children") {
                    var children = obj[key];
                    s.updateChild(children, false);
                }
                else {
                    s[key] = obj[key];
                }
            }
        }
        return _this;
    }
    TreeNode.prototype.toggle = function () {
        var s = this;
        s.show = !s.show;
        s.showChildren();
        s.updateIcon();
        s.trigger("showChange" /* TreeNodeEvent.ShowChange */);
    };
    Object.defineProperty(TreeNode.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (value) {
            var s = this;
            s._selected = value;
            if (s._selected)
                s.trigger("onSelected" /* TreeNodeEvent.OnSelected */);
            else
                s.trigger("unselected" /* TreeNodeEvent.UnSelected */);
        },
        enumerable: false,
        configurable: true
    });
    TreeNode.prototype.parserProp = function () {
    };
    TreeNode.prototype.showChildren = function () {
        var s = this;
        if (s.show) {
        }
    };
    TreeNode.prototype.replaceChild = function (item) {
        var s = this;
        for (var i = 0; i < s.children.length; i++) {
            if (s.children[i].uid == item.uid) {
                s.children[i] = item;
                break;
            }
        }
    };
    TreeNode.prototype.updateChild = function (children, tigger) {
        if (tigger === void 0) { tigger = true; }
        var s = this;
        s.children.length = 0;
        for (var i = 0; i < children.length; i++) {
            var childNode = new TreeNode(children[i]);
            s.children.push(childNode);
        }
        s.hasChildren = s.children.length > 0;
        if (tigger)
            this.trigger("childrenChange" /* TreeNodeEvent.ChildrenChange */);
    };
    TreeNode.prototype.updateProps = function (props) {
        var s = this;
        s.props = {};
        if (!props)
            return;
        s.props = props;
    };
    TreeNode.prototype.changeProps = function (newValue, propPath) {
        var s = this;
        var obj = s.props;
        if (propPath) {
            var paths = propPath.split(".");
            for (var i = 0; i < paths.length; i++) {
                if (i == paths.length - 1) {
                    if (obj[paths[i]])
                        obj[paths[i]].value = newValue;
                }
                else {
                    obj = obj[paths[i]] ? obj[paths[i]].value : null;
                    if (!obj)
                        return;
                }
            }
        }
    };
    TreeNode.prototype.updateIcon = function () {
        this.icon = this.hasChildren ? this.show ? "-" : "+" : "&nbsp;";
    };
    TreeNode.prototype.on = function (event, fun, thisObj) {
        _super.prototype.on.call(this, event, fun, thisObj);
    };
    return TreeNode;
}(EventBase_1.EventBase));
exports.TreeNode = TreeNode;


/***/ }),

/***/ "./src/common/Utils.ts":
/*!*****************************!*\
  !*** ./src/common/Utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = void 0;
var ConstVars_1 = __webpack_require__(/*! ./ConstVars */ "./src/common/ConstVars.ts");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getUID = function () {
        var s = this;
        s._uid++;
        return s._uid;
    };
    Utils.stringifyValue = function (value) {
        var type = typeof value;
        if (value == null)
            return "null";
        if (value == undefined)
            return "undefined";
        switch (type) {
            case "string":
                return value;
            case "bigint":
            case "number":
                return isNaN(value) ? "NaN" : value;
            case "object":
                if (Array.isArray(value)) {
                    return "array";
                }
                else {
                    return this.getClassName(value); //value.constructor["name"] || "object";
                }
            case "function":
                return String(value);
            default:
                return String(value);
        }
    };
    Utils.parseValue = function (value) {
        if (value == "NaN" || value == "undefined")
            return undefined;
        if (value == "null")
            return null;
        if (value == "true")
            return true;
        if (value == "false")
            return false;
        try {
            return JSON.parse(value); //s.modifyPropValueType(prop, changeValue);
        }
        catch (e) {
            return value;
        }
    };
    Utils.getClassName = function (obj) {
        if (typeof obj == "number" || typeof obj == "string")
            return obj;
        if (obj["__class__"])
            return obj.__class__; //egret
        if (obj.constructor && obj.constructor["__classid"] && obj.constructor["__classid"].indexOf && obj.constructor["__classid"].indexOf("CLS_") != 0)
            return obj.constructor.__classid; //my game
        if (obj["$owner"] && obj["$owner"].constructor)
            return obj["$owner"].constructor.name; //fgui
        if (obj.__classname__)
            return obj.__classname__; //Cocos create
        if (obj._className)
            return obj._className; //Cocos2d-JS
        if (obj.__className && obj.__className.substring(0, 4).toLocaleLowerCase() != "laya")
            return obj.__className; //其他
        if (obj[ConstVars_1.ConstVars.GAMEINSPECT_CLASS_KEY])
            return obj[ConstVars_1.ConstVars.GAMEINSPECT_CLASS_KEY];
        if (obj.constructor && obj.constructor.name)
            return obj.constructor.name; //common
        return typeof obj;
    };
    Utils.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!args || args.length == 0)
            return;
        var colors = ["#a6d2b5", "#cda6d2", "#d2a6b1", "#a6bfd2", "#d2b2a6", "#a6a8d2", "#d190df"];
        var logParams = [""];
        for (var i = 0; i < args.length; i++) {
            var color = colors[i % colors.length];
            logParams[0] += (i == 0 ? "" : " ") + "%c " + args[i];
            var cornerLeft = i == 0 ? 3 : 0;
            var cornerRight = i == args.length - 1 ? 3 : 0;
            logParams.push("background: ".concat(color, "; padding: 4px;font-size: 13px; border-radius: ").concat(cornerLeft, "px ").concat(cornerRight, "px ").concat(cornerRight, "px ").concat(cornerLeft, "px; color: #163808"));
        }
        this.ConsoleLogFun.apply(console, logParams);
    };
    Utils.error = function (msg) {
        this.ConsoleLogFun.call(console, "%c".concat(msg), 'background: #f5a2a2; padding: 4px; width:100%; border-radius: 3px 3px 3px 3px; color: #ff0000;font-size: 13px;');
    };
    Utils.transformUserRuleCode = function (code, urls) {
        var engineName = "";
        var frameURL = "";
        var sitURL = "";
        for (var i = 0; i < urls.length; i++) {
            if (urls[i].engine) {
                engineName = urls[i].engine;
                frameURL = urls[i].url;
            }
            if (!urls[i].frameId) {
                sitURL = urls[i].url;
            }
        }
        code = this.replaceAll(code, ConstVars_1.ConstVars.$EngineName, '"' + engineName + '"', ConstVars_1.ConstVars.$SITEURL, '"' + sitURL + '"', ConstVars_1.ConstVars.$GAMEURL, '"' + frameURL + '"');
        // code = code.replace(ConstVars.$EngineName, '"'+engineName+'"').replace(ConstVars.$SITEURL, '"'+sitURL+'"').replace(ConstVars.$GAMEURL, '"'+frameURL+'"')
        return code;
    };
    /**
     * 添加script 代码
     * @param code
     */
    Utils.addScript = function (code, name, override) {
        if (override === void 0) { override = true; }
        name = "$gameInspectInsertScript_" + name;
        var tag = document.getElementById(name);
        if (tag) {
            if (!override)
                return;
            document.head.removeChild(tag);
        }
        var script = document.createElement("script");
        script.innerHTML = code;
        script.id = name;
        try {
            document.head.appendChild(script);
        }
        catch (e) {
            if (ConstVars_1.ConstVars.DEBUG) {
                console.log("添加脚本失败 " + name);
            }
        }
    };
    /**
     * 添加script 代码
     * @param code
     */
    Utils.addSrcScript = function (src, name, callBack, override) {
        if (callBack === void 0) { callBack = null; }
        if (override === void 0) { override = true; }
        name = "$gameInspectInsertSrcScript_" + name;
        var tag = document.getElementById(name);
        if (tag) {
            if (!override)
                return;
            document.head.removeChild(tag);
        }
        var s = this;
        var script = document.createElement("script");
        script.src = src;
        script.id = name;
        script.onload = function () {
            //添加用户的代码
            if (callBack)
                callBack(true);
        };
        script.onerror = function () {
            if (callBack)
                callBack(false);
        };
        document.head.appendChild(script);
    };
    Utils.evalUserRuleCode = function (code, url, name) {
        var s = this;
        var engineName = "";
        var sitURL = "";
        var frameURL = "";
        if (url.engine) {
            engineName = url.engine;
            frameURL = url.url;
        }
        if (!url.frameId)
            sitURL = url.url;
        code = this.replaceAll(code, ConstVars_1.ConstVars.$VarEngineName, '"' + engineName + '"', ConstVars_1.ConstVars.$VarSiteURL, '"' + sitURL + '"', ConstVars_1.ConstVars.$VarGameURL, '"' + frameURL + '"');
        var funName = "$gameInspectMatchUserCode".concat(name);
        Utils.addScript("function ".concat(funName, "(){\n            ").concat(code, ";\n        }\n        "), "useMatchScprit" + name);
        return window[funName] ? window[funName]() : false;
    };
    Utils.replaceAll = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!str)
            return str;
        for (var i = 0; i < args.length; i += 2) {
            var oldValue = args[i];
            var replaceValue = args[i + 1];
            oldValue = oldValue.replace(/(\$|\||\.|\*|\?|\+|\{|\}|\[|\]|\%)/gi, "\\$1");
            var reg = new RegExp(oldValue, "gi");
            str = str.replace(reg, replaceValue);
        }
        return str;
    };
    Utils.totast = function (msg) {
        this._totastId++;
        var id = "gameInspectTotast" + this._totastId;
        var jquery = window["$"];
        if (!jquery)
            return;
        var msgTag = jquery('<div id="' + id + '" class="totast"><span></span></div>');
        jquery("body").append(msgTag);
        msgTag.fadeIn("slow").find("span").html(msg);
        setTimeout(function () {
            msgTag.fadeOut(800, function () {
                console.log("移除： " + id);
                msgTag.remove();
            });
        }, 1200);
    };
    Utils.copy = function (value) {
        var textarea = document.getElementById("oInput");
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
    };
    Utils.download = function (saveStr, fileName, type) {
        if (type === void 0) { type = "text"; }
        var element = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        var ev = document.createEvent("MouseEvents");
        var urlObject = window.URL || window.webkitURL || window;
        var export_blob = new Blob([saveStr], { type: type });
        element.href = urlObject.createObjectURL(export_blob);
        element.download = fileName;
        ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(ev);
        urlObject.revokeObjectURL(element.href);
        element.href = '';
    };
    /**
     * 获取时间信息
     * @param {*} format
     * @returns
     */
    Utils.getDateStr = function (format) {
        format = format ? format : "yyyy-MM-dd hh:mm:ss";
        var date = new Date();
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
    };
    /**
     * 拷贝一个对象到另一个对象（如果toObj为空则会新生成一个对象）上
     * @param originObj
     * @param toObj
     * @returns
     */
    Utils.copyObj = function (originObj, toObj, notCopyFun) {
        if (!originObj)
            return;
        toObj = toObj || {};
        for (var key in originObj) {
            if (notCopyFun) {
                if (typeof originObj[key] == "function")
                    continue;
            }
            toObj[key] = originObj[key];
        }
        return toObj;
    };
    Utils._uid = 0;
    /**防止cocos 把console.log 重写了 */
    Utils.ConsoleLogFun = console.log;
    Utils._totastId = 0;
    return Utils;
}());
exports.Utils = Utils;


/***/ }),

/***/ "./src/engine/cocos2dx/Cocos2dxEngineInfo.ts":
/*!***************************************************!*\
  !*** ./src/engine/cocos2dx/Cocos2dxEngineInfo.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cocos2dxEngineInfo = void 0;
var Cocos2dxStageMask_1 = __webpack_require__(/*! ./Cocos2dxStageMask */ "./src/engine/cocos2dx/Cocos2dxStageMask.ts");
var Cocos2dxEngineInfo = /** @class */ (function () {
    function Cocos2dxEngineInfo() {
        this.name = "Cocos2dx";
    }
    // private _stage: cc.BaseNode;
    Cocos2dxEngineInfo.prototype.haveEngine = function () {
        return !!(window["cc"] && window["CocosEngine"] && window["cc"]["director"] && this.stage);
    };
    Cocos2dxEngineInfo.prototype.init = function () {
        var s = this;
        s.version = window["CocosEngine"];
        s.baseCls = cc["BaseNode"] || cc["_BaseNode"] || cc["Node"]; //
        s._mask = new Cocos2dxStageMask_1.Cocos2dxStageMask(s);
    };
    Object.defineProperty(Cocos2dxEngineInfo.prototype, "stage", {
        get: function () {
            var scene;
            if (window["cc"] && window["cc"]["director"] && window["cc"]["director"]["_scenesStack"]) {
                scene = window["cc"]["director"]["_scenesStack"][0];
            }
            return scene;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Cocos2dxEngineInfo.prototype.start = function (onClickFun, onMouseMoveFun) {
    };
    Cocos2dxEngineInfo.prototype.getChildren = function (obj) {
        return obj.children;
    };
    Cocos2dxEngineInfo.prototype.getParent = function (obj) {
        return obj.parent;
    };
    Cocos2dxEngineInfo.prototype.drawMask = function (obj) {
        if (this._mask)
            this._mask.showRect(obj);
    };
    Cocos2dxEngineInfo.prototype.clearMask = function () {
        if (this._mask)
            this._mask.clear();
    };
    Cocos2dxEngineInfo.prototype.refushMask = function () {
        var s = this;
        if (s._mask)
            s._mask.refush();
    };
    // getPropNames(obj: cc.BaseNode): string[] {
    //    return [];
    // }
    // getTreeNode(obj: cc.BaseNode): TreeNode {
    //     return EngineManager.getTreeNode(this, obj);
    // }
    // getProps(obj: cc.BaseNode, showPrivate?: boolean, showFunction?: boolean): { [name: string]: PropNode; } {
    //     return EngineManager.getPropNodes(this, obj, showPrivate, showFunction)
    // }
    Cocos2dxEngineInfo.prototype.canUse = function (obj) {
        return obj && obj.isValid /*有可能为null**/ != false;
    };
    Cocos2dxEngineInfo.prototype.getObjName = function (obj) {
        return obj.name;
    };
    Cocos2dxEngineInfo.prototype.getVisible = function (obj) {
        return obj.active;
    };
    Cocos2dxEngineInfo.prototype.setMouseEnable = function (value) {
    };
    Cocos2dxEngineInfo.prototype.setVisible = function (obj, value) {
        obj.active = value;
    };
    Cocos2dxEngineInfo.prototype.showFPS = function (value) {
    };
    return Cocos2dxEngineInfo;
}());
exports.Cocos2dxEngineInfo = Cocos2dxEngineInfo;


/***/ }),

/***/ "./src/engine/cocos2dx/Cocos2dxStageMask.ts":
/*!**************************************************!*\
  !*** ./src/engine/cocos2dx/Cocos2dxStageMask.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cocos2dxStageMask = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
var Cocos2dxStageMask = /** @class */ (function () {
    function Cocos2dxStageMask(engine) {
        var s = this;
        s._engine = engine;
        if (!cc["DrawNode"])
            return;
        s._mask = new cc["DrawNode"]();
        s._mask.name = ConstVars_1.ConstVars.StageMaskName;
    }
    Cocos2dxStageMask.prototype.showRect = function (obj) {
        var s = this;
        s._bindObj = obj;
        var w = Math.max(obj.width, 20);
        var h = Math.max(obj.height, 20);
        var pos = obj.convertToWorldSpace();
        var stage = s._engine.stage;
        w = w * obj.scaleX;
        h = h * obj.scaleY;
        if (s._mask) {
            s._mask.clear();
            s._mask.removeFromParent();
        }
        s._mask.drawRect(cc["p"](pos.x - w * obj.anchorX, pos.y - h * obj.anchorY), cc["p"](w, h), new cc["Color"](0, 200, 0, 55), 1, new cc["Color"](0, 200, 0, 235));
        stage.addChild(s._mask);
    };
    Cocos2dxStageMask.prototype.refush = function () {
        var s = this;
        //todo refush
        // s._bindObj = obj;
        // let w:number = Math.max(obj.width, 20);
        // let h:number = Math.max(obj.height, 20);
        // let pos:{x:number, y:number} = obj.convertToWorldSpace();
        // let stage = s._engine.stage;
        // w = w*obj.scaleX;
        // h = h*obj.scaleY;
        // if(s._mask){
        //     s._mask.clear();
        //     s._mask.removeFromParent();
        // }
        // s._mask.drawRect(cc["p"](pos.x-w*obj.anchorX, pos.y-h*obj.anchorY), cc["p"](w, h), new cc["Color"](0, 200, 0, 55), 1, new cc["Color"](0, 200, 0, 235));
    };
    Cocos2dxStageMask.prototype.handleActiviteChange = function (e) {
        var s = this;
        if (!s._bindObj)
            return;
        if (!s._bindObj.activeInHierarchy) {
            s.clear();
        }
    };
    Cocos2dxStageMask.prototype.clear = function () {
        var s = this;
        if (s._bindObj) {
            s._bindObj = null;
        }
        if (s._mask && s._mask["getComponent"]) {
            var graphics = s._mask.getComponent(cc.Graphics);
            graphics.clear();
        }
        if (s._mask)
            s._mask.removeFromParent();
    };
    return Cocos2dxStageMask;
}());
exports.Cocos2dxStageMask = Cocos2dxStageMask;


/***/ }),

/***/ "./src/engine/cocoscreator/CocosCreatorEngineInfo.ts":
/*!***********************************************************!*\
  !*** ./src/engine/cocoscreator/CocosCreatorEngineInfo.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CocosCreatorEngineInfo = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
var Utils_1 = __webpack_require__(/*! ../../common/Utils */ "./src/common/Utils.ts");
var CocosCreatorMouseEvent_1 = __webpack_require__(/*! ./CocosCreatorMouseEvent */ "./src/engine/cocoscreator/CocosCreatorMouseEvent.ts");
var CocosCreatorStageMask_1 = __webpack_require__(/*! ./CocosCreatorStageMask */ "./src/engine/cocoscreator/CocosCreatorStageMask.ts");
var CocosCreatorEngineInfo = /** @class */ (function () {
    function CocosCreatorEngineInfo() {
        this.name = "CocosCreator";
    }
    // private _stage: cc.BaseNode;
    CocosCreatorEngineInfo.prototype.haveEngine = function () {
        return !!(window["cc"] && window["CocosEngine"] && window["cc"]["director"] && this.stage);
    };
    CocosCreatorEngineInfo.prototype.init = function () {
        var s = this;
        s.version = window["CocosEngine"];
        s.baseCls = cc["BaseNode"] || cc["_BaseNode"] || cc["Node"]; //
        s._mask = new CocosCreatorStageMask_1.CocosCreatorStageMask(s);
        var obj = window["cc"];
        if (obj) {
            for (var key in obj) {
                if (obj[key] && obj[key]["prototype"])
                    obj[key]["prototype"][ConstVars_1.ConstVars.GAMEINSPECT_CLASS_KEY] = key;
            }
        }
    };
    Object.defineProperty(CocosCreatorEngineInfo.prototype, "stage", {
        get: function () {
            var scene;
            if (window["cc"] && window["cc"]["director"] && window["cc"]["director"].getScene) {
                scene = window["cc"]["director"].getScene();
            }
            return scene;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    CocosCreatorEngineInfo.prototype.start = function (onClickFun, onMouseMoveFun) {
        var s = this;
        CocosCreatorMouseEvent_1.CocosCreatorMouseEvent.start(s);
        cc.director.on(CocosCreatorMouseEvent_1.CocosCreatorMouseEvent.MOUSE_DOWN, function (target) {
            onClickFun.call(s, target);
        }, s);
        cc.director.on(CocosCreatorMouseEvent_1.CocosCreatorMouseEvent.MOUSE_MOVE, function (target) {
            onMouseMoveFun.call(s, target);
        }, s);
    };
    CocosCreatorEngineInfo.prototype.getChildren = function (obj) {
        return obj.children;
    };
    CocosCreatorEngineInfo.prototype.getParent = function (obj) {
        return obj.parent;
    };
    CocosCreatorEngineInfo.prototype.drawMask = function (obj) {
        if (this._mask)
            this._mask.showRect(obj);
    };
    CocosCreatorEngineInfo.prototype.clearMask = function () {
        if (this._mask)
            this._mask.clear();
    };
    CocosCreatorEngineInfo.prototype.refushMask = function () {
        var s = this;
        if (s._mask)
            s._mask.refush();
    };
    CocosCreatorEngineInfo.prototype.canUse = function (obj) {
        return obj && obj.isValid /*有可能为null**/ != false;
    };
    CocosCreatorEngineInfo.prototype.getObjName = function (obj) {
        return obj.name;
    };
    CocosCreatorEngineInfo.prototype.getVisible = function (obj) {
        return obj.activeInHierarchy;
    };
    CocosCreatorEngineInfo.prototype.setMouseEnable = function (value) {
        CocosCreatorMouseEvent_1.CocosCreatorMouseEvent.enableMouseEvent = value;
    };
    CocosCreatorEngineInfo.prototype.setVisible = function (obj, value) {
        obj.active = value;
    };
    CocosCreatorEngineInfo.prototype.showFPS = function (value) {
    };
    CocosCreatorEngineInfo.prototype.modifyPropNode = function (obj, propName, prop) {
        var propObj = obj[propName];
        if (propObj instanceof cc.Color) {
            prop.valueExtParam = { r: propObj.r, g: propObj.g, b: propObj.b, a: propObj.a };
        }
        return prop;
    };
    CocosCreatorEngineInfo.prototype.getAddPropNode = function (obj) {
        var result = [];
        var components = obj["_components"];
        if (components && components.length > 0) {
            for (var i = 0; i < components.length; i++) {
                var comp = components[i];
                var node = {
                    aliasName: "[Component]",
                    name: "_components." + i,
                    value: Utils_1.Utils.getClassName(comp),
                    type: "object",
                    expandable: true,
                    isGetter: true,
                    isSetter: false,
                    isPrivate: false,
                };
                result.push(node);
            }
        }
        return result;
    };
    CocosCreatorEngineInfo.prototype.getClassName = function (obj) {
        if (typeof obj == "number" || typeof obj == "string")
            return obj;
        var s = this;
        var name = Utils_1.Utils.getClassName(obj);
        var components = obj["_components"];
        if (components && components.length > 0) {
            var compNames = [];
            for (var i = 0; i < components.length; i++) {
                var comp = components[i];
                compNames.push(Utils_1.Utils.getClassName(comp));
            }
            name += ConstVars_1.ConstVars.SPECIAL_NAME_START + compNames.join(",") + ConstVars_1.ConstVars.SPECIAL_NAME_END;
        }
        return name;
    };
    return CocosCreatorEngineInfo;
}());
exports.CocosCreatorEngineInfo = CocosCreatorEngineInfo;


/***/ }),

/***/ "./src/engine/cocoscreator/CocosCreatorMouseEvent.ts":
/*!***********************************************************!*\
  !*** ./src/engine/cocoscreator/CocosCreatorMouseEvent.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CocosCreatorMouseEvent = void 0;
var CocosCreator2XMouseEvent_1 = __webpack_require__(/*! ./version2X/CocosCreator2XMouseEvent */ "./src/engine/cocoscreator/version2X/CocosCreator2XMouseEvent.ts");
var CocosCreator3XMouseEvent_1 = __webpack_require__(/*! ./version3X/CocosCreator3XMouseEvent */ "./src/engine/cocoscreator/version3X/CocosCreator3XMouseEvent.ts");
var CocosCreatorMouseEvent = /** @class */ (function () {
    function CocosCreatorMouseEvent() {
    }
    CocosCreatorMouseEvent.start = function (engine) {
        var s = this;
        s._engine = engine;
        s.MOUSE_MOVE = CocosCreatorMouseEvent.EventPreName + cc.Node.EventType.MOUSE_MOVE;
        s.MOUSE_DOWN = CocosCreatorMouseEvent.EventPreName + cc.Node.EventType.MOUSE_DOWN;
        if (s._engine.version.startsWith("2.") || s._engine.version.startsWith("1.")) {
            s._adapterMouseEvent = new CocosCreator2XMouseEvent_1.CocosCreator2XMouseEvent(s._engine);
        }
        else {
            s._adapterMouseEvent = new CocosCreator3XMouseEvent_1.CocosCreator3XMouseEvent(s._engine);
        }
        s._adapterMouseEvent.onMouseDown = function (pos) {
            s._mouseIsDown = true;
            s._curMouseMoveTime = Date.now();
            var target = s._adapterMouseEvent.findTarget(pos);
            cc.director.emit(s.MOUSE_DOWN, target);
        };
        s._adapterMouseEvent.onMouseMove = function (pos) {
            if (!s._mouseIsDown)
                return;
            var now = Date.now();
            if (now - s._curMouseMoveTime < s._mouseMoveTime)
                return;
            s._curMouseMoveTime = now;
            var target = s._adapterMouseEvent.findTarget(pos);
            cc.director.emit(s.MOUSE_MOVE, target);
        };
        s._adapterMouseEvent.onMouseUp = function () {
            s._mouseIsDown = false;
        };
    };
    Object.defineProperty(CocosCreatorMouseEvent, "enableMouseEvent", {
        get: function () {
            return this._enableMouseEvent;
        },
        set: function (value) {
            var s = this;
            s._adapterMouseEvent.setEnableEvent(value);
            s._enableMouseEvent = value;
        },
        enumerable: false,
        configurable: true
    });
    CocosCreatorMouseEvent.EventPreName = "cocosCreatorInspactEvent_";
    CocosCreatorMouseEvent._enableMouseEvent = true;
    CocosCreatorMouseEvent._mouseMoveTime = 500;
    CocosCreatorMouseEvent._curMouseMoveTime = 0;
    CocosCreatorMouseEvent._mouseIsDown = false;
    return CocosCreatorMouseEvent;
}());
exports.CocosCreatorMouseEvent = CocosCreatorMouseEvent;


/***/ }),

/***/ "./src/engine/cocoscreator/CocosCreatorStageMask.ts":
/*!**********************************************************!*\
  !*** ./src/engine/cocoscreator/CocosCreatorStageMask.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CocosCreatorStageMask = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
var CocosCreator2XDraw_1 = __webpack_require__(/*! ./version2X/CocosCreator2XDraw */ "./src/engine/cocoscreator/version2X/CocosCreator2XDraw.ts");
var CocosCreator3XDraw_1 = __webpack_require__(/*! ./version3X/CocosCreator3XDraw */ "./src/engine/cocoscreator/version3X/CocosCreator3XDraw.ts");
var CocosCreatorStageMask = /** @class */ (function () {
    function CocosCreatorStageMask(engine) {
        var s = this;
        s._engine = engine;
        s._mask = new cc.Node();
        s._mask.name = ConstVars_1.ConstVars.StageMaskName;
        if (s._engine.version.startsWith("2.") || s._engine.version.startsWith("1.")) {
            s._drawAdapter = new CocosCreator2XDraw_1.CocosCreator2XDraw(s._engine);
        }
        else {
            s._drawAdapter = new CocosCreator3XDraw_1.CocosCreator3XDraw(s._engine);
        }
        s._mask.addComponent(s._drawAdapter.getGraphicsComponentCls());
    }
    CocosCreatorStageMask.prototype.resetMask = function () {
        var s = this;
        s._mask = new cc.Node();
        s._mask.name = ConstVars_1.ConstVars.StageMaskName;
        s._mask.addComponent(s._drawAdapter.getGraphicsComponentCls());
    };
    CocosCreatorStageMask.prototype.showRect = function (obj) {
        var s = this;
        s._bindObj = obj;
        if (!s._bindObj) {
            s.clear();
            return;
        }
        if (s._bindObj) {
            s._bindObj.on('active-in-hierarchy-changed', s.handleActiviteChange, s);
        }
        // if(s._mask.parent){
        //     s._mask.parent.removeChild(s._mask)
        // }
        // s._mask.removeFromParent();
        var stage = s._drawAdapter.getMaskParent();
        try {
            stage.addChild(s._mask);
        }
        catch (e) {
            s._mask.parent = stage;
        }
        s.refush();
    };
    CocosCreatorStageMask.prototype.refush = function () {
        var s = this;
        var obj = s._bindObj;
        var drawCls = s._drawAdapter.getGraphicsComponentCls();
        if (!s._mask["_components"]) {
            s.resetMask();
        }
        var graphics = s._mask.getComponent(drawCls);
        if (!obj) {
            s.clear();
            return;
        }
        var rect = s._drawAdapter.getDrawPositionInfo(obj);
        if (rect.width <= 0 || rect.height <= 0) {
            s.clear();
            return;
        }
        graphics.clear();
        graphics.lineWidth = 1;
        graphics.strokeColor.fromHEX("#00C800ee");
        graphics.fillColor.fromHEX("#00C80022"); //
        graphics.fillRect(rect.x, rect.y, rect.width, rect.height);
        graphics.close();
        graphics.stroke();
        graphics.fill();
    };
    CocosCreatorStageMask.prototype.handleActiviteChange = function () {
        var s = this;
        if (!s._bindObj)
            return;
        if (!s._bindObj.activeInHierarchy) {
            s.clear();
        }
    };
    CocosCreatorStageMask.prototype.clear = function () {
        var s = this;
        if (s._bindObj) {
            s._bindObj.off('active-in-hierarchy-changed', s.handleActiviteChange, s);
            s._bindObj = null;
        }
        if (s._mask["_components"]) {
            var graphics = s._mask.getComponent(s._drawAdapter.getGraphicsComponentCls());
            graphics.clear();
        }
        s._mask.removeFromParent();
    };
    return CocosCreatorStageMask;
}());
exports.CocosCreatorStageMask = CocosCreatorStageMask;


/***/ }),

/***/ "./src/engine/cocoscreator/version2X/CocosCreator2XDraw.ts":
/*!*****************************************************************!*\
  !*** ./src/engine/cocoscreator/version2X/CocosCreator2XDraw.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CocosCreator2XDraw = void 0;
var CocosCreator2XDraw = /** @class */ (function () {
    function CocosCreator2XDraw(engine) {
        var s = this;
        s._tempV3 = new cc.Vec3();
        s._rect = new cc.Rect();
        s._engine = engine;
    }
    CocosCreator2XDraw.prototype.getGraphicsComponentCls = function () {
        return cc.Graphics;
    };
    CocosCreator2XDraw.prototype.getDrawPositionInfo = function (obj) {
        var s = this;
        if (!obj) {
            s._rect.x = s._rect.y = s._rect.width = s._rect.height = 0;
            return s._rect;
        }
        var position = obj["convertToWorldSpace"](s._tempV3);
        var scaleX = obj["scaleX"];
        var scaleY = obj["scaleY"];
        s._rect.x = position.x;
        s._rect.y = position.y;
        s._rect.width = obj["width"] || 0;
        s._rect.height = obj["height"] || 0;
        s._rect.width *= scaleX;
        s._rect.height *= scaleY;
        s._rect.width = Math.max(20, s._rect.width);
        s._rect.height = Math.max(20, s._rect.height);
        return s._rect;
    };
    CocosCreator2XDraw.prototype.getMaskParent = function () {
        return this._engine.stage;
    };
    return CocosCreator2XDraw;
}());
exports.CocosCreator2XDraw = CocosCreator2XDraw;


/***/ }),

/***/ "./src/engine/cocoscreator/version2X/CocosCreator2XMouseEvent.ts":
/*!***********************************************************************!*\
  !*** ./src/engine/cocoscreator/version2X/CocosCreator2XMouseEvent.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CocosCreator2XMouseEvent = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../../common/ConstVars */ "./src/common/ConstVars.ts");
var Utils_1 = __webpack_require__(/*! ../../../common/Utils */ "./src/common/Utils.ts");
var CocosCreator2XMouseEvent = /** @class */ (function () {
    function CocosCreator2XMouseEvent(engine) {
        this.enableMouseEvent = true;
        var s = this;
        s._engine = engine;
        if (cc["internal"] && cc["internal"]["inputManager"]) { /**适用于 v2.4.6 */
            var inputMgr_1 = cc["internal"]["inputManager"];
            var oldTouchBegin_1 = inputMgr_1.handleTouchesBegin;
            var oldTouchMove_1 = inputMgr_1.handleTouchesMove;
            var oldTouchEnd_1 = inputMgr_1.handleTouchesEnd;
            inputMgr_1.handleTouchesBegin = function () {
                var touch = arguments[0][0];
                if (touch) {
                    var pos = touch.getLocation();
                    var glView = this._glView;
                    var newPos = pos.clone();
                    newPos.x = (newPos.x - glView._viewportRect.x) / glView._scaleX;
                    newPos.y = (newPos.y - glView._viewportRect.y) / glView._scaleY;
                    s.onMouseDown(newPos);
                }
                if (!s.enableMouseEvent)
                    return;
                oldTouchBegin_1.apply(inputMgr_1, arguments);
            };
            inputMgr_1.handleTouchesMove = function () {
                var touch = arguments[0][0];
                if (touch) {
                    var pos = touch.getLocation();
                    var glView = this._glView;
                    var newPos = pos.clone();
                    newPos.x = (newPos.x - glView._viewportRect.x) / glView._scaleX;
                    newPos.y = (newPos.y - glView._viewportRect.y) / glView._scaleY;
                    s.onMouseMove(newPos);
                }
                if (!s.enableMouseEvent)
                    return;
                oldTouchMove_1.apply(inputMgr_1, arguments);
            };
            inputMgr_1.handleTouchesEnd = function () {
                s.onMouseUp();
                if (!s.enableMouseEvent)
                    return;
                oldTouchEnd_1.apply(inputMgr_1, arguments);
            };
        }
        else {
            Utils_1.Utils.log("该版本不支持鼠标事件, 如需添加支持请加群： " + ConstVars_1.ConstVars.QQ);
        }
    }
    CocosCreator2XMouseEvent.prototype.findTarget = function (pos) {
        var s = this;
        s._target = null;
        s.check(s._engine.stage, pos);
        return s._target;
    };
    CocosCreator2XMouseEvent.prototype.setEnableEvent = function (value) {
        this.enableMouseEvent = value;
    };
    CocosCreator2XMouseEvent.prototype.check = function (sp, pos) {
        var s = this;
        if (!sp)
            return false;
        if (s._target)
            return true;
        var children = s._engine.getChildren(sp);
        if (children && children.length > 0) {
            for (var i = children.length - 1; i > -1; i--) {
                if (s._target)
                    return true;
                var child = children[i];
                s.check(child, pos);
                if (s._target)
                    return true;
            }
        }
        else {
            if (s.checkHaveComponet(sp) && s._hitTest(sp, pos)) {
                s._target = sp;
                return true;
            }
        }
        return false;
    };
    CocosCreator2XMouseEvent.prototype.checkHaveComponet = function (obj) {
        var s = this;
        if (!obj)
            return false;
        var components = obj["_components"];
        if (!components || components.length == 0)
            return false;
        var hasRender = false;
        for (var i = 0; i < components.length; i++) {
            var comp = components[i];
            if (!comp)
                continue;
            if (comp instanceof cc.Camera || comp instanceof cc.Canvas)
                return false;
            if (comp instanceof cc.RenderComponent && !(comp instanceof cc.Mask))
                hasRender = true;
        }
        return hasRender;
    };
    CocosCreator2XMouseEvent.prototype._hitTest = function (node, pos) {
        var s = this;
        if (!node || !node.isValid || !s._engine.getVisible(node) || node.name == ConstVars_1.ConstVars.StageMaskName)
            return false;
        if (node["_hitTest"])
            return node["_hitTest"](pos, node); /***version 2.4.6 */
        return false;
    };
    return CocosCreator2XMouseEvent;
}());
exports.CocosCreator2XMouseEvent = CocosCreator2XMouseEvent;


/***/ }),

/***/ "./src/engine/cocoscreator/version3X/CocosCreator3XDraw.ts":
/*!*****************************************************************!*\
  !*** ./src/engine/cocoscreator/version3X/CocosCreator3XDraw.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CocosCreator3XDraw = void 0;
var CocosCreator3XDraw = /** @class */ (function () {
    function CocosCreator3XDraw(engine) {
        var s = this;
        s._rect = new cc.Rect();
        s._engine = engine;
    }
    CocosCreator3XDraw.prototype.getGraphicsComponentCls = function () {
        return cc.GraphicsComponent;
    };
    CocosCreator3XDraw.prototype.getDrawPositionInfo = function (obj) {
        var s = this;
        if (!obj) {
            s._rect.x = s._rect.y = s._rect.width = s._rect.height = 0;
            return s._rect;
        }
        var tran = obj.getComponent(cc.UITransformComponent);
        if (!tran) {
            s._rect.x = s._rect.y = s._rect.width = s._rect.height = 0;
            return s._rect;
        }
        var scaleX = 1;
        var scaleY = 1;
        var position = obj["worldPosition"];
        s._rect.x = position.x;
        s._rect.y = position.y;
        var scale = obj["worldScale"];
        if (scale) {
            scaleX = scale.x;
            scaleY = scale.y;
        }
        s._rect.width = tran["width"] || 0;
        s._rect.height = tran["height"] || 0;
        var winSize = cc["winSize"];
        if (winSize) {
            s._rect.x -= winSize.width / 2;
            s._rect.y -= winSize.height / 2;
        }
        s._rect.x -= s._rect.width * (tran["anchorX"] || 0);
        s._rect.y -= s._rect.height * (tran["anchorY"] || 0);
        return s._rect;
    };
    CocosCreator3XDraw.prototype.getMaskParent = function () {
        var s = this;
        var stage = s._engine.stage;
        var children = stage.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.getComponent(cc.Canvas)) {
                return child;
            }
        }
        return stage;
    };
    return CocosCreator3XDraw;
}());
exports.CocosCreator3XDraw = CocosCreator3XDraw;


/***/ }),

/***/ "./src/engine/cocoscreator/version3X/CocosCreator3XMouseEvent.ts":
/*!***********************************************************************!*\
  !*** ./src/engine/cocoscreator/version3X/CocosCreator3XMouseEvent.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CocosCreator3XMouseEvent = void 0;
var Utils_1 = __webpack_require__(/*! ../../../common/Utils */ "./src/common/Utils.ts");
var ConstVars_1 = __webpack_require__(/*! ../../../common/ConstVars */ "./src/common/ConstVars.ts");
var CocosCreator3XMouseEvent = /** @class */ (function () {
    function CocosCreator3XMouseEvent(engine) {
        this.enableMouseEvent = true;
        var s = this;
        s._engine = engine;
        var canvas = cc.game.canvas;
        if (!canvas) {
            Utils_1.Utils.log("Game Inpsce 对 Cocos Create 的鼠标处理 没有找到 对应的Canvas");
            return;
        }
        canvas.addEventListener('mousedown', function (e) {
            var pos = _getLocation(e);
            s.onMouseDown(pos);
            if (!s.enableMouseEvent)
                e.stopImmediatePropagation();
        });
        canvas.addEventListener('mousemove', function (e) {
            var pos = _getLocation(e);
            s.onMouseMove(pos);
            if (!s.enableMouseEvent)
                e.stopImmediatePropagation();
        });
        window.addEventListener('mouseup', function (e) {
            s.onMouseUp();
            if (!s.enableMouseEvent)
                e.stopImmediatePropagation();
        });
        function _getCanvasRect() {
            var box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
            if (box) {
                return new cc.Rect(box.x, box.y, box.width, box.height);
            }
            return new cc.Rect(0, 0, 0, 0);
        }
        function _getLocation(mouseEvent) {
            var canvasRect = _getCanvasRect();
            var dpr = window.devicePixelRatio;
            var x = mouseEvent.clientX - canvasRect.x;
            var y = canvasRect.y + canvasRect.height - mouseEvent.clientY;
            x *= dpr;
            y *= dpr;
            var mousePos = new cc.Vec2(x, y); //获取到点击的位置
            cc.view["_convertToUISpace"](mousePos); //模拟 event.getUILocation 获取UI界面内的坐标
            return mousePos;
        }
    }
    CocosCreator3XMouseEvent.prototype.findTarget = function (pos) {
        var s = this;
        s._target = null;
        s.check(s._engine.stage, pos);
        return s._target;
    };
    CocosCreator3XMouseEvent.prototype.setEnableEvent = function (value) {
        this.enableMouseEvent = value;
    };
    CocosCreator3XMouseEvent.prototype.check = function (sp, pos) {
        var s = this;
        if (s._target)
            return true;
        if (!sp)
            return false;
        var children = s._engine.getChildren(sp);
        if (children && children.length > 0) {
            for (var i = children.length - 1; i > -1; i--) {
                if (s._target)
                    return true;
                var child = children[i];
                s.check(child, pos);
                if (s._target)
                    return true;
            }
        }
        else {
            if (s.checkHaveComponet(sp) && s._hitTest(sp, pos)) {
                s._target = sp;
                return true;
            }
        }
        return false;
    };
    CocosCreator3XMouseEvent.prototype.checkHaveComponet = function (obj) {
        var s = this;
        if (!obj)
            return false;
        var components = obj["_components"];
        if (!components || components.length == 0)
            return false;
        var hasRender = false;
        for (var i = 0; i < components.length; i++) {
            var comp = components[i];
            if (!comp)
                continue;
            if (comp instanceof cc.Camera || comp instanceof cc.Canvas)
                return false;
            if (comp instanceof cc.RenderableComponent && !(comp instanceof cc.Mask))
                hasRender = true;
        }
        return hasRender;
    };
    CocosCreator3XMouseEvent.prototype._hitTest = function (node, pos) {
        var s = this;
        if (!node || !node.isValid || !s._engine.getVisible(node) || node.name == ConstVars_1.ConstVars.StageMaskName)
            return false;
        var tran = node.getComponent(cc.UITransformComponent);
        if (tran) {
            return tran.isHit(pos);
        }
        return false;
    };
    return CocosCreator3XMouseEvent;
}());
exports.CocosCreator3XMouseEvent = CocosCreator3XMouseEvent;


/***/ }),

/***/ "./src/engine/egret/EgretEnginInfo.ts":
/*!********************************************!*\
  !*** ./src/engine/egret/EgretEnginInfo.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EgretEngineInfo = void 0;
var EgretMouseEvent_1 = __webpack_require__(/*! ./EgretMouseEvent */ "./src/engine/egret/EgretMouseEvent.ts");
var EgretStageRectMask_1 = __webpack_require__(/*! ./EgretStageRectMask */ "./src/engine/egret/EgretStageRectMask.ts");
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
var EgretEngineInfo = /** @class */ (function () {
    function EgretEngineInfo() {
        this.name = "Egret";
    }
    EgretEngineInfo.prototype.haveEngine = function () {
        return !!(window["egret"] && window["egret"]["sys"] && window["egret"]["sys"]["$TempStage"]);
    };
    EgretEngineInfo.prototype.init = function () {
        var s = this;
        s.version = egret.Capabilities.engineVersion;
        s.baseCls = egret.DisplayObject;
        s.stage = egret.sys.$TempStage;
        s._mask = new EgretStageRectMask_1.EgretStageRectMask();
        var obj = window["egret"];
        for (var key in obj) {
            if (obj[key] && obj[key]["prototype"])
                obj[key]["prototype"][ConstVars_1.ConstVars.GAMEINSPECT_CLASS_KEY] = key;
        }
    };
    EgretEngineInfo.prototype.start = function (onClickFun, onMouseMoveFun) {
        var s = this;
        EgretMouseEvent_1.EgretMouseEvent.start();
        var stage = egret.sys.$TempStage;
        stage.addEventListener(EgretMouseEvent_1.EgretMouseEvent.MOUSE_DOWN, function (e) {
            onClickFun(e.data);
        }, s);
        stage.addEventListener(EgretMouseEvent_1.EgretMouseEvent.MOUSE_MOVE, function (e) {
            onMouseMoveFun(e.data);
        }, s);
    };
    EgretEngineInfo.prototype.setMouseEnable = function (value) {
        var s = this;
        EgretMouseEvent_1.EgretMouseEvent.enableMouseEvent = value;
    };
    EgretEngineInfo.prototype.getChildren = function (obj) {
        return obj.$children || [];
    };
    EgretEngineInfo.prototype.getParent = function (obj) {
        return obj.parent;
    };
    EgretEngineInfo.prototype.drawMask = function (obj) {
        var s = this;
        if (s._mask)
            s._mask.showRect(obj);
    };
    EgretEngineInfo.prototype.refushMask = function () {
        var s = this;
        if (s._mask)
            s._mask.refush();
    };
    EgretEngineInfo.prototype.clearMask = function () {
        var s = this;
        if (s._mask)
            s._mask.clear();
    };
    // getPropNames(obj: egret.DisplayObject): string[] {
    //     return [];
    // }
    EgretEngineInfo.prototype.getNotShowPropNames = function (obj) {
        if (obj == this.stage) {
            return ["x", "y", "alpha", "visible", "scaleX", "scaleY", "rotation", "cacheAsBitmap", "scrollRect", "filters", "blendMode", "touchEnabled", "matrix",];
        }
        return null;
    };
    // getTreeNode(obj: egret.DisplayObject): TreeNode {
    //     return EngineManager.getTreeNode(this, obj);
    // }
    // getProps(obj: egret.DisplayObject, showPrivate?: boolean, showFunction?: boolean): { [name: string]: PropNode; } {
    //     return EngineManager.getPropNodes(this, obj, showPrivate, showFunction)
    // }
    EgretEngineInfo.prototype.canUse = function (obj) {
        return !!obj;
    };
    EgretEngineInfo.prototype.getObjName = function (obj) {
        return obj.name;
    };
    EgretEngineInfo.prototype.getVisible = function (obj) {
        if (obj == this.stage)
            return true;
        return obj.visible;
    };
    EgretEngineInfo.prototype.setVisible = function (obj, value) {
        obj.visible = value;
        if (value && obj.alpha < 0.1)
            obj.alpha = 1;
    };
    EgretEngineInfo.prototype.showFPS = function (value) {
        var s = this;
        var egret_fps_panel = document.getElementById('egret-fps-panel');
        // let toShow = !egret_fps_panel || egret_fps_panel.style.visibility == "hidden";
        if (value) {
            if (!egret_fps_panel) {
                var webPlayer = document.querySelectorAll(".egret-player")[0]['egret-player'];
                if (!egret.nativeRender) {
                    var option = webPlayer.playerOption;
                    webPlayer.player.displayFPS(true, true, option.logFilter, option.fpsStyles);
                }
            }
            else {
                egret_fps_panel.style.visibility = "visible";
            }
        }
        else if (egret_fps_panel) {
            egret_fps_panel.style.visibility = "hidden";
        }
    };
    return EgretEngineInfo;
}());
exports.EgretEngineInfo = EgretEngineInfo;


/***/ }),

/***/ "./src/engine/egret/EgretMouseEvent.ts":
/*!*********************************************!*\
  !*** ./src/engine/egret/EgretMouseEvent.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EgretMouseEvent = void 0;
var EgretMouseEvent = /** @class */ (function () {
    function EgretMouseEvent() {
    }
    EgretMouseEvent.start = function () {
        var s = this;
        s._point = new egret.Point();
        s._rect = new egret.Rectangle();
        s._asDownEvent = egret.TouchEvent.TOUCH_BEGIN;
        s.MOUSE_MOVE = EgretMouseEvent.EventPreName + egret.TouchEvent.TOUCH_MOVE;
        s.MOUSE_DOWN = EgretMouseEvent.EventPreName + s._asDownEvent;
        var stage = egret.sys.$TempStage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.handleMouseDownEvent, s);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, s.handleMouseUPEvent, s);
        stage.addEventListener(s._asDownEvent, s.handleMouseEvent, s);
        var oldSendTouchEvent = egret.TouchEvent.dispatchTouchEvent;
        egret.TouchEvent.dispatchTouchEvent = function (target, type, bubbles, cancelable, stageX, stageY, touchPointID, touchDown) {
            if (touchDown === void 0) { touchDown = false; }
            if (!s.enableMouseEvent) {
                if (type == s._asDownEvent) {
                    var stage_1 = egret.sys.$TempStage;
                    s.check(stage_1, stageX, stageY);
                    return;
                }
            }
            return oldSendTouchEvent.call(egret.TouchEvent, target, type, bubbles, cancelable, stageX, stageY, touchPointID, touchDown);
        };
    };
    EgretMouseEvent.handleMouseDownEvent = function (e) {
        var s = this;
        s._curMouseMoveTime = Date.now();
        var stage = egret.sys.$TempStage;
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.handleMouseMove, s);
    };
    EgretMouseEvent.handleMouseUPEvent = function (e) {
        var s = this;
        var stage = egret.sys.$TempStage;
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, s.handleMouseMove, s);
    };
    EgretMouseEvent.handleMouseMove = function (e) {
        var s = this;
        var now = Date.now();
        if (now - s._curMouseMoveTime < s._mouseMoveTime)
            return;
        s._curMouseMoveTime = now;
        s.handleMouseEvent(e);
    };
    EgretMouseEvent.handleMouseEvent = function (e) {
        var s = this;
        var stage = egret.sys.$TempStage;
        s.check(stage, e.stageX, e.stageY);
        if (s._target)
            stage.dispatchEventWith(EgretMouseEvent.EventPreName + e.type, true, s._target);
    };
    EgretMouseEvent.check = function (sp, stageX, stageY) {
        if (sp != egret.sys.$TempStage && (!sp.visible || sp.scaleX == 0 || sp.scaleY == 0)) {
            return null;
        }
        var s = this;
        var m = sp.$getInvertedConcatenatedMatrix();
        if (m.a == 0 && m.b == 0 && m.c == 0 && m.d == 0) { //防止父类影响子类
            return null;
        }
        var localX = m.a * stageX + m.c * stageY + m.tx;
        var localY = m.b * stageX + m.d * stageY + m.ty;
        var rect = sp.$scrollRect ? sp.$scrollRect : sp.$maskRect;
        if (rect && !rect.contains(localX, localY)) {
            return null;
        }
        if (sp.$mask && !sp.$mask.$hitTest(stageX, stageY)) {
            return null;
        }
        var children = sp.$children;
        if (children) {
            var target = null;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.$maskedObject) {
                    continue;
                }
                target = s.check(child, stageX, stageY);
                if (target) {
                    s._target = target;
                    return target;
                }
            }
            // if (target) {
            //     return target;
            // }
        }
        else {
            var bounds = sp.$getContentBounds();
            if (bounds.contains(localX, localY)) {
                s._target = sp;
                return sp;
            }
        }
        return null;
    };
    EgretMouseEvent.EventPreName = "egretInspectEvent_";
    EgretMouseEvent.enableMouseEvent = true;
    EgretMouseEvent._mouseMoveTime = 500;
    EgretMouseEvent._curMouseMoveTime = 0;
    return EgretMouseEvent;
}());
exports.EgretMouseEvent = EgretMouseEvent;


/***/ }),

/***/ "./src/engine/egret/EgretStageRectMask.ts":
/*!************************************************!*\
  !*** ./src/engine/egret/EgretStageRectMask.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EgretStageRectMask = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
/**
 * 绘制舞台上区域
 */
var EgretStageRectMask = /** @class */ (function () {
    function EgretStageRectMask() {
        this._mask = new egret.Sprite();
        this._rect = new egret.Rectangle();
        this._tempPoint = new egret.Point();
        this._mask.name = ConstVars_1.ConstVars.StageMaskName;
    }
    EgretStageRectMask.prototype.showRect = function (obj) {
        var s = this;
        if (s._bindObj) {
            s._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.clear, s);
        }
        s._bindObj = obj;
        s._bindObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.clear, s);
        if (!obj) {
            if (s._mask.parent)
                s._mask.parent.removeChild(s._mask);
            return;
        }
        egret.sys.$TempStage.addChild(s._mask);
        s.refush();
    };
    EgretStageRectMask.prototype.refush = function () {
        var s = this;
        var obj = s._bindObj;
        if (!obj)
            return;
        var scaleX = 1;
        var scaleY = 1;
        if (obj != egret.sys.$TempStage) {
            scaleX = obj.scaleX;
            scaleY = obj.scaleY;
        }
        s._tempPoint.x = 0;
        s._tempPoint.y = 0;
        obj.localToGlobal(0, 0, s._tempPoint);
        var x = s._tempPoint.x;
        var y = s._tempPoint.y;
        var width = Math.max(20, obj.width) * scaleX;
        var height = Math.max(20, obj.height) * scaleY;
        if (s._rect.x == x && s._rect.y == y && s._rect.width == width && s._rect.height == height) {
            return;
        }
        s._rect.x = x;
        s._rect.y = y;
        s._rect.width = width;
        s._rect.height = height;
        s._mask.graphics.clear();
        s._mask.graphics.lineStyle(1, 0x00C800, 0.9);
        s._mask.graphics.beginFill(0x00C800, 0.2);
        s._mask.graphics.drawRect(s._rect.x, s._rect.y, s._rect.width, s._rect.height);
        s._mask.graphics.endFill();
    };
    EgretStageRectMask.prototype.clear = function () {
        var s = this;
        if (s._bindObj) {
            s._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.clear, s);
        }
        s._bindObj = null;
        if (s._mask.parent)
            s._mask.parent.removeChild(s._mask);
        s._rect.setEmpty();
    };
    return EgretStageRectMask;
}());
exports.EgretStageRectMask = EgretStageRectMask;


/***/ }),

/***/ "./src/engine/laya/LayaEngineInfo.ts":
/*!*******************************************!*\
  !*** ./src/engine/laya/LayaEngineInfo.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayaEngineInfo = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
var Utils_1 = __webpack_require__(/*! ../../common/Utils */ "./src/common/Utils.ts");
var LayaMouseEvent_1 = __webpack_require__(/*! ./LayaMouseEvent */ "./src/engine/laya/LayaMouseEvent.ts");
var LayaStageRectMask_1 = __webpack_require__(/*! ./LayaStageRectMask */ "./src/engine/laya/LayaStageRectMask.ts");
var LayaEngineInfo = /** @class */ (function () {
    function LayaEngineInfo() {
        this.name = "Laya";
    }
    // private _clssNameArray:{name:string, class:any}[] = [];
    LayaEngineInfo.prototype.getParent = function (obj) {
        return obj.parent;
    };
    // getTreeNode(obj: Laya.Node): TreeNode {
    //     return EngineManager.getTreeNode(this, obj)
    // }
    // getProps(obj: Laya.Node, showPrivate?: boolean, showFunction?: boolean): {[name:string]:PropNode} {
    //     return EngineManager.getPropNodes(this, obj, showPrivate, showFunction);
    // }
    LayaEngineInfo.prototype.getObjName = function (obj) {
        return obj.name;
    };
    LayaEngineInfo.prototype.getVisible = function (obj) {
        if (Laya.Sprite && obj instanceof Laya.Sprite) {
            return obj.visible && obj.alpha != 0;
        }
        else if (Laya.Sprite3D && obj instanceof Laya.Sprite3D) {
            return obj.active;
        }
        return true;
    };
    LayaEngineInfo.prototype.setVisible = function (obj, value) {
        if (Laya.Sprite && obj instanceof Laya.Sprite) {
            obj.visible = value;
            if (value && obj.alpha < 0.1)
                obj.alpha = 1;
        }
        else if (Laya.Sprite3D && obj instanceof Laya.Sprite3D) {
            obj.active = value;
        }
    };
    LayaEngineInfo.prototype.setMouseEnable = function (value) {
        LayaMouseEvent_1.LayaMouseEvent.enableMouseEvent = value;
    };
    LayaEngineInfo.prototype.canUse = function (obj) {
        return obj && !obj.destroyed;
    };
    // getPropNames(obj: Laya.Node): string[] {
    //    return []
    // } 
    LayaEngineInfo.prototype.clearMask = function () {
        var s = this;
        if (s._mask)
            s._mask.clear();
    };
    LayaEngineInfo.prototype.haveEngine = function () {
        return window["Laya"] && window["Laya"].stage;
    };
    LayaEngineInfo.prototype.init = function () {
        var s = this;
        s.baseCls = Laya.Node;
        s.stage = Laya.stage;
        s.version = Laya.version || Laya.LayaEnv.version;
        s._mask = new LayaStageRectMask_1.LayaStageRectMask(s);
        var obj = window["Laya"];
        for (var key in obj) {
            if (obj[key] && obj[key]["prototype"])
                obj[key]["prototype"][ConstVars_1.ConstVars.GAMEINSPECT_CLASS_KEY] = key;
        }
    };
    LayaEngineInfo.prototype.start = function (onClickFun, onMouseMoveFun) {
        var s = this;
        LayaMouseEvent_1.LayaMouseEvent.start(this);
        Laya.stage.on(LayaMouseEvent_1.LayaMouseEvent.MOUSE_DOWN, this, function (target) {
            onClickFun.call(s, target);
        });
        Laya.stage.on(LayaMouseEvent_1.LayaMouseEvent.MOUSE_MOVE, this, function (target) {
            onMouseMoveFun.call(s, target);
        });
    };
    LayaEngineInfo.prototype.getChildren = function (obj) {
        return obj["_children"] || obj["_childs"] || [];
    };
    LayaEngineInfo.prototype.drawMask = function (obj) {
        var s = this;
        if (s._mask)
            s._mask.showRect(obj);
    };
    LayaEngineInfo.prototype.refushMask = function () {
        var s = this;
        if (s._mask)
            s._mask.refush();
    };
    LayaEngineInfo.prototype.showFPS = function (value) {
        if (window["Laya"]["Stat"]) {
            if (value) {
                window["Laya"]["Stat"].show();
            }
            else {
                window["Laya"]["Stat"].hide();
            }
        }
    };
    LayaEngineInfo.prototype.getAddPropNode = function (obj) {
        var result = [];
        var components = obj["_components"];
        if (components && components.length > 0) {
            for (var i = 0; i < components.length; i++) {
                var comp = components[i];
                var node = {
                    aliasName: "[Component]",
                    name: "_components." + i,
                    value: Utils_1.Utils.getClassName(comp),
                    type: "object",
                    expandable: true,
                    isGetter: true,
                    isSetter: false,
                    isPrivate: false,
                };
                result.push(node);
            }
        }
        return result;
    };
    LayaEngineInfo.prototype.getClassName = function (obj) {
        if (typeof obj == "number" || typeof obj == "string")
            return obj;
        var s = this;
        var name = Utils_1.Utils.getClassName(obj);
        var components = obj["_components"];
        if (components && components.length > 0) {
            var compNames = [];
            for (var i = 0; i < components.length; i++) {
                var comp = components[i];
                compNames.push(Utils_1.Utils.getClassName(comp));
            }
            name += ConstVars_1.ConstVars.SPECIAL_NAME_START + compNames.join(",") + ConstVars_1.ConstVars.SPECIAL_NAME_END;
        }
        return name;
    };
    return LayaEngineInfo;
}());
exports.LayaEngineInfo = LayaEngineInfo;


/***/ }),

/***/ "./src/engine/laya/LayaMouseEvent.ts":
/*!*******************************************!*\
  !*** ./src/engine/laya/LayaMouseEvent.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayaMouseEvent = void 0;
var LayaMouseEvent = /** @class */ (function () {
    function LayaMouseEvent() {
    }
    LayaMouseEvent.start = function (engine) {
        var s = this;
        s._engine = engine;
        s._point = new Laya.Point();
        s._rect = new Laya.Rectangle();
        s.MOUSE_MOVE = LayaMouseEvent.EventPreName + Laya.Event.MOUSE_MOVE;
        s.MOUSE_DOWN = LayaMouseEvent.EventPreName + Laya.Event.MOUSE_DOWN;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, s, s.handleMouseDownEvent);
        Laya.stage.on(Laya.Event.MOUSE_UP, s, s.handleMouseUPEvent);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, s, s.handleMouseEvent);
        if (Laya.TouchManager) {
            var touchProto = Laya.TouchManager.prototype;
            var oldSendFun_1 = touchProto["sendEvents"];
            Object.defineProperties(touchProto, {
                sendEvents: {
                    value: function (eles, type) {
                        if (!s.enableMouseEvent && type == Laya.Event.CLICK) {
                            return;
                        }
                        oldSendFun_1.call(this, eles, type);
                    },
                    enumerable: true,
                }
            });
        }
        else if (Laya.InputManager) { //3.0 的 鼠标事件
            var touchProto = Laya.InputManager.prototype;
            var oldSendFun_2 = touchProto["bubbleEvent"];
            Object.defineProperties(touchProto, {
                bubbleEvent: {
                    value: function (type, ev, initiator) {
                        if (!s.enableMouseEvent && type == Laya.Event.CLICK) {
                            return;
                        }
                        oldSendFun_2.call(this, type, ev, initiator);
                    },
                    enumerable: true,
                }
            });
        }
    };
    LayaMouseEvent.handleMouseDownEvent = function (e) {
        var s = this;
        s._curMouseMoveTime = Date.now();
        Laya.stage.on(Laya.Event.MOUSE_MOVE, s, s.handleMouseMove);
    };
    LayaMouseEvent.handleMouseUPEvent = function (e) {
        var s = this;
        Laya.stage.off(Laya.Event.MOUSE_MOVE, s, s.handleMouseMove);
    };
    LayaMouseEvent.handleMouseMove = function (e) {
        var s = this;
        var now = Date.now();
        if (now - s._curMouseMoveTime < s._mouseMoveTime)
            return;
        s._curMouseMoveTime = now;
        s.handleMouseEvent(e);
    };
    LayaMouseEvent.handleMouseEvent = function (e) {
        var s = this;
        var mouseX = 0;
        var mouseY = 0;
        if (Laya.MouseManager) { //<3.0版本的
            mouseX = Laya.MouseManager.instance.mouseX;
            mouseY = Laya.MouseManager.instance.mouseY;
        }
        else { //3.0版本
            mouseX = Laya.InputManager.mouseX;
            mouseY = Laya.InputManager.mouseY;
        }
        s.check(Laya.stage, mouseX, mouseY, mouseX, mouseY);
        Laya.stage.event(LayaMouseEvent.EventPreName + e.type, s._target);
    };
    LayaMouseEvent.check = function (sp, mouseX, mouseY, stageX, stageY) {
        this._point.setTo(mouseX, mouseY);
        if (sp["fromParentPoint"]) {
            sp.fromParentPoint(this._point);
            mouseX = this._point.x;
            mouseY = this._point.y;
        }
        //如果有裁剪，则先判断是否在裁剪范围内
        var scrollRect = sp["_style"] ? sp["_style"].scrollRect : null;
        if (scrollRect) {
            this._rect.setTo(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
            if (!this._rect.contains(mouseX, mouseY))
                return false;
        }
        var notCheckChild = false; //不响应鼠标的对象
        if (Laya.Label && sp instanceof Laya.Label)
            notCheckChild = true;
        if (Laya.Button && sp instanceof Laya.Button)
            notCheckChild = true;
        if (Laya.Image && sp instanceof Laya.Image)
            notCheckChild = true;
        if (Laya.Text && sp instanceof Laya.Text)
            notCheckChild = true;
        var children = this._engine.getChildren(sp);
        if (!notCheckChild && children) {
            for (var i = children.length - 1; i > -1; i--) {
                var child = children[i];
                // if(!(child instanceof Laya.Sprite))continue;
                //只有接受交互事件的，才进行处理
                if (!child.destroyed && child.visible /**非Sprite的node中没有visible属性**/ != false) {
                    if (this.check(child, mouseX, mouseY, stageX, stageY))
                        return true;
                }
            }
            // 检查逻辑子对象
            if (sp["_extUIChild"]) {
                for (i = sp["_extUIChild"].length - 1; i >= 0; i--) {
                    var c = sp["_extUIChild"][i];
                    if (!(c instanceof Laya.Sprite))
                        continue;
                    if (!c.destroyed && c.visible) {
                        if (this.check(c, mouseX, mouseY, stageX, stageY))
                            return true;
                    }
                }
            }
        }
        var isHit = this.hitTest(sp, mouseX, mouseY, stageX, stageY);
        if (isHit) {
            this._target = sp;
        }
        return isHit;
    };
    LayaMouseEvent.hitTest = function (sp, mouseX, mouseY, stageX, stageY) {
        var s = this;
        if (Laya.Sprite3D && sp instanceof Laya.Sprite3D) {
            return s.hitTest3D(sp, stageX, stageY);
        }
        else {
            return s.hitTest2D(sp, mouseX, mouseY);
        }
    };
    LayaMouseEvent.hitTest2D = function (sp, mouseX, mouseY) {
        var isHit = false;
        var hitArea;
        if (sp["_style"]) {
            if (sp.scrollRect) {
                mouseX -= sp["_style"].scrollRect.x;
                mouseY -= sp["_style"].scrollRect.y;
            }
            hitArea = sp["_style"].hitArea;
            if (hitArea && hitArea._hit) {
                return hitArea.contains(mouseX, mouseY);
            }
        }
        if (sp.width > 0 && sp.height > 0 || sp.mouseThrough || hitArea) {
            //判断是否在矩形区域内
            if (!sp.mouseThrough) {
                //MOD by liuzihao: saved call of 'hitRect' and 'this._rect' when 'sp.hitArea' is not null.
                isHit = (hitArea ? hitArea : this._rect.setTo(0, 0, sp.width, sp.height)).contains(mouseX, mouseY);
            }
            else {
                //如果可穿透，则根据子对象实际大小进行碰撞
                isHit = sp.getGraphicBounds().contains(mouseX, mouseY);
            }
        }
        return isHit;
    };
    LayaMouseEvent.hitTest3D = function (sp, stageX, stageY) {
        if (!Laya.Sprite3D || !Laya.HitResult)
            return false;
        if (!sp.scene)
            return false;
        var sim = sp.scene.cannonPhysicsSimulation || sp.scene.physicsSimulation;
        if (!sim)
            return;
        var cameras = sp.scene._cameraPool;
        if (!cameras || !cameras.length)
            return false;
        var touchPos = new Laya.Vector2(stageX, stageY);
        var touchRay = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        var touchHitResult = new Laya.HitResult();
        touchHitResult.succeeded = false;
        for (var i = cameras.length - 1; i >= 0; i--) {
            var camera = cameras[i];
            camera.viewportPointToRay(touchPos, touchRay);
            sim.rayCast(touchRay, touchHitResult);
            if (touchHitResult.succeeded && touchHitResult.collider.owner == sp) {
                return true;
            }
        }
        return false;
    };
    LayaMouseEvent.EventPreName = "layaInspactEvent_";
    LayaMouseEvent.enableMouseEvent = true;
    LayaMouseEvent._mouseMoveTime = 500;
    LayaMouseEvent._curMouseMoveTime = 0;
    return LayaMouseEvent;
}());
exports.LayaMouseEvent = LayaMouseEvent;


/***/ }),

/***/ "./src/engine/laya/LayaStageRectMask.ts":
/*!**********************************************!*\
  !*** ./src/engine/laya/LayaStageRectMask.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayaStageRectMask = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
/**
 * 绘制舞台上区域
 */
var LayaStageRectMask = /** @class */ (function () {
    function LayaStageRectMask(engineInfo) {
        this._engineInfo = engineInfo;
        this._mask = new Laya.Sprite();
        this._rect = new Laya.Rectangle();
        this._tempPoint = new Laya.Point();
        this._mask.name = ConstVars_1.ConstVars.StageMaskName;
        var version = this._engineInfo.version;
        if (version.startsWith("1.")) {
            this._mask.alpha = 0.3;
        }
        else {
            this._mask.alpha = 1;
        }
    }
    LayaStageRectMask.prototype.showRect = function (obj) {
        var s = this;
        if (s._bindObj) {
            s.clear();
        }
        s._bindObj = obj;
        s._bindObj.on(Laya.Event.UNDISPLAY, s, s.clear);
        if (!obj) {
            s._mask.removeSelf();
            return;
        }
        Laya.stage.addChild(s._mask);
        s.refush();
        Laya.timer.loop(1000, s, s.refush);
    };
    LayaStageRectMask.prototype.refush = function () {
        var s = this;
        if (!s._bindObj)
            return;
        var x = 0;
        var y = 0;
        var w = 0;
        var h = 0;
        if (Laya.Sprite3D && s._bindObj instanceof Laya.Sprite3D) { //3d 对象
            var sp_1 = s._bindObj;
            if (!sp_1.scene || !sp_1.transform)
                return;
            var cameras = sp_1.scene._cameraPool;
            if (!cameras || !cameras.length)
                return false;
            var outPos = new Laya.Vector4();
            for (var i = cameras.length - 1; i >= 0; i--) {
                var camera = cameras[i];
                camera.viewport.project(sp_1.transform.position, camera.projectionViewMatrix, outPos);
            }
            x = outPos.x * Laya.stage.clientScaleX;
            y = outPos.y * Laya.stage.clientScaleY;
            w = 50;
            h = 50;
            s.draw3D(s._bindObj);
        }
        else if (Laya.Sprite && s._bindObj instanceof Laya.Sprite) { //2d 对象
            s._tempPoint.x = 0;
            s._tempPoint.y = 0;
            s._bindObj.localToGlobal(s._tempPoint);
            x = s._tempPoint.x;
            y = s._tempPoint.y;
            w = Math.max(20, s._bindObj["width"]) * s._bindObj["scaleX"];
            h = Math.max(20, s._bindObj["height"]) * s._bindObj["scaleY"];
        }
        if (s._rect.x == x && s._rect.y == y && s._rect.width == w && s._rect.height == h) {
            return;
        }
        s._rect.x = x;
        s._rect.y = y;
        s._rect.width = w;
        s._rect.height = h;
        s._mask.graphics.clear();
        s._mask.graphics.drawRect(s._rect.x, s._rect.y, s._rect.width, s._rect.height, "#00C80022", "#00C800ee", 1);
    };
    /**绘制3d对象 */
    LayaStageRectMask.prototype.draw3D = function (sp) {
        if (!Laya.Sprite3D || !sp)
            return;
        var meshRenderer = this.getSprite3DRender(sp);
        if (meshRenderer) {
            meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG] = true;
            if (this._engineInfo.version.startsWith("1.")) {
                meshRenderer.material = this.getSelectMaterial();
            }
            else {
                meshRenderer.sharedMaterial = this.getSelectMaterial();
            }
        }
    };
    /**获取3d的渲染render  */
    LayaStageRectMask.prototype.getSprite3DRender = function (sp) {
        if (Laya.RenderableSprite3D && sp instanceof Laya.RenderableSprite3D) { //2.0  可以渲染的3d对象
            if (sp["_render"])
                return sp["_render"];
        }
        if (Laya.Sprite3D && Laya.BaseRender && sp instanceof Laya.Sprite3D) { //通过Component 添加的render
            var comps = sp["_components"];
            if (comps) {
                for (var i = 0; i < comps.length; i++) {
                    if (comps[i] instanceof Laya.BaseRender) {
                        return comps[i];
                    }
                }
            }
        }
        return null;
    };
    /**获取选择的材质 */
    LayaStageRectMask.prototype.getSelectMaterial = function () {
        var s = this;
        if (!s._select3DMaterial) {
            this.register3DMaterial();
            if (Laya.UnlitMaterial) {
                var selectedMaterial = new Laya.UnlitMaterial();
                if (s._engineInfo.version.startsWith("3")) { //3.x版本
                    selectedMaterial.albedoColor = new Laya.Color(1, 1, 0);
                }
                else {
                    selectedMaterial.albedoColor = new Laya.Vector4(1, 1, 0, 1);
                }
                s._select3DMaterial = selectedMaterial;
            }
            else if (Laya["StandardMaterial"]) {
                s._select3DMaterial = new Laya["StandardMaterial"]();
                s._select3DMaterial["albedoColor"] = new Laya.Vector4(1, 1, 0, 1);
            }
        }
        return s._select3DMaterial;
    };
    /**注册3d 的render方法， 重写render 的设置 material */
    LayaStageRectMask.prototype.register3DMaterial = function () {
        var s = this;
        if (!Laya.BaseRender)
            return;
        var prototype = Laya.BaseRender.prototype;
        Object.defineProperty(prototype, "sharedMaterial", {
            set: function (value) {
                var lastValue = this._sharedMaterials ? this._sharedMaterials[0] : this._materials[0]; /***1.xx版本用的是 _materials  2.x以上用的是_sharedMaterials */
                if (this[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG]) {
                    var selectMaterial = s.getSelectMaterial();
                    if (!this[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] && selectMaterial != lastValue) {
                        this[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] = lastValue;
                    }
                    if (selectMaterial != value) {
                        this[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] = value;
                        value = selectMaterial;
                    }
                }
                if (lastValue !== value) {
                    if (this._sharedMaterials)
                        this._sharedMaterials[0] = value;
                    else
                        this._materials[0] = value;
                    this._materialsInstance[0] = false;
                    this._changeMaterialReference(lastValue, value);
                    var renderElement = this._renderElements[0];
                    (renderElement) && (renderElement["material"] = value);
                }
                if (this._isSupportReflection)
                    this._isSupportReflection();
            },
            get: function () {
                return this._sharedMaterials ? this._sharedMaterials[0] : this._materials[0];
            },
            enumerable: true,
            configurable: true
        });
    };
    /**清理当前绑定的obj */
    LayaStageRectMask.prototype.clear = function () {
        var s = this;
        if (s._bindObj) {
            // s._bindObj.offAllCaller(s);
            s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear);
        }
        if (Laya.Sprite3D && s._bindObj) {
            var meshRenderer = s.getSprite3DRender(s._bindObj);
            if (meshRenderer && meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG]) {
                var old = meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP];
                meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG] = false;
                meshRenderer[LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP] = null;
                if (old) {
                    meshRenderer.sharedMaterial = old;
                }
            }
        }
        Laya.timer.clearAll(s);
        if (s._rect) {
            s._rect.x = 0;
            s._rect.y = 0;
            s._rect.width = 0;
            s._rect.height = 0;
        }
        s._bindObj = null;
        s._mask.removeSelf();
    };
    LayaStageRectMask.GAMEINSPECT_SELECT_SHADER_TAG = "$GameInspectSelectShader";
    LayaStageRectMask.GAMEINSPECT_SELECT_OLD_MATERIAL_PROP = "$GameInspectOldMaterial";
    return LayaStageRectMask;
}());
exports.LayaStageRectMask = LayaStageRectMask;


/***/ }),

/***/ "./src/engine/pixi/PIXIEngineInfo.ts":
/*!*******************************************!*\
  !*** ./src/engine/pixi/PIXIEngineInfo.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PIXIEngineInfo = void 0;
var PIXIStageRectMask_1 = __webpack_require__(/*! ./PIXIStageRectMask */ "./src/engine/pixi/PIXIStageRectMask.ts");
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
var PIXIEngineInfo = /** @class */ (function () {
    function PIXIEngineInfo() {
        this.name = "PIXI";
        this._haveInjectApplictionRender = false;
    }
    PIXIEngineInfo.prototype.haveEngine = function () {
        if (!window["PIXI"] || !window["PIXI"]["Application"] || !window["PIXI"]["Ticker"])
            return false;
        var s = this;
        if (!s._haveInjectApplictionRender) {
            s._haveInjectApplictionRender = true;
            var tickerPrototype = window["PIXI"]["Ticker"].prototype;
            var oldTickUpdateRender_1 = tickerPrototype["update"];
            Object.defineProperty(tickerPrototype, "update", {
                value: function () {
                    if (!s.stage) {
                        var head = this._head;
                        var maxLoopNum = 100;
                        var curLoopNum = 0;
                        while (head) {
                            curLoopNum++;
                            if (curLoopNum >= maxLoopNum)
                                break;
                            if (head.context && head.context instanceof window["PIXI"]["Application"]) {
                                s.stage = head.context.stage;
                                break;
                            }
                            head = head.next;
                        }
                    }
                    oldTickUpdateRender_1.call(this);
                },
                enumerable: true,
            });
        }
        return !!s.stage;
    };
    PIXIEngineInfo.prototype.init = function () {
        var s = this;
        s.version = PIXI.VERSION;
        s.baseCls = PIXI.DisplayObject;
        s._mask = new PIXIStageRectMask_1.PIXIStageRectMask(s);
        var obj = window["PIXI"];
        for (var key in obj) {
            if (obj[key] && obj[key]["prototype"])
                obj[key]["prototype"][ConstVars_1.ConstVars.GAMEINSPECT_CLASS_KEY] = key;
        }
    };
    PIXIEngineInfo.prototype.start = function (onClickFun, onMouseMoveFun) {
    };
    PIXIEngineInfo.prototype.getChildren = function (obj) {
        if (obj["children"])
            return obj["children"];
        return [];
    };
    PIXIEngineInfo.prototype.getParent = function (obj) {
        return obj.parent;
    };
    PIXIEngineInfo.prototype.drawMask = function (obj) {
        if (this._mask)
            this._mask.showRect(obj);
    };
    PIXIEngineInfo.prototype.clearMask = function () {
        if (this._mask)
            this._mask.clear();
    };
    PIXIEngineInfo.prototype.canUse = function (obj) {
        return !!obj;
    };
    PIXIEngineInfo.prototype.getObjName = function (obj) {
        return obj["name"];
    };
    PIXIEngineInfo.prototype.getVisible = function (obj) {
        return obj.visible;
    };
    PIXIEngineInfo.prototype.setMouseEnable = function (value) {
    };
    PIXIEngineInfo.prototype.setVisible = function (obj, value) {
        obj.visible = value;
        if (value && obj.alpha == 0)
            obj.alpha = 1;
    };
    PIXIEngineInfo.prototype.showFPS = function (value) {
    };
    return PIXIEngineInfo;
}());
exports.PIXIEngineInfo = PIXIEngineInfo;


/***/ }),

/***/ "./src/engine/pixi/PIXIStageRectMask.ts":
/*!**********************************************!*\
  !*** ./src/engine/pixi/PIXIStageRectMask.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PIXIStageRectMask = void 0;
var ConstVars_1 = __webpack_require__(/*! ../../common/ConstVars */ "./src/common/ConstVars.ts");
/**
 * 绘制舞台上区域
 */
var PIXIStageRectMask = /** @class */ (function () {
    function PIXIStageRectMask(engine) {
        this._engine = engine;
        this._mask = new PIXI.Graphics();
        this._tempPoint = new PIXI.Point();
        this._mask["name"] = ConstVars_1.ConstVars.StageMaskName;
    }
    PIXIStageRectMask.prototype.showRect = function (obj) {
        var s = this;
        if (s._bindObj) {
            // s._bindObj.offAllCaller(s);// engin: Laya version: 1.7.17 没有此方法
            // s._bindObj.(Laya.Event.UNDISPLAY, s, s.clear)
        }
        s._bindObj = obj;
        // s._bindObj.on(Laya.Event.UNDISPLAY, s, s.clear);
        if (!obj) {
            if (s._mask.parent)
                s._mask.parent.removeChild(s._mask);
            return;
        }
        s._engine.stage["addChild"](s._mask);
        s._tempPoint.x = 0;
        s._tempPoint.y = 0;
        var point = obj.toGlobal(s._tempPoint);
        var bounds = obj.getLocalBounds();
        var scale = obj.scale;
        var w = Math.max(20, scale.x * bounds.width);
        var h = Math.max(20, scale.y * bounds.width);
        var anchorX = 0;
        var anchorY = 0;
        var anchor = obj["anchor"];
        if (anchor) {
            anchorX = anchor.x;
            anchorY = anchor.y;
        }
        s._mask.clear();
        s._mask.beginFill(0x00C800, 0.3);
        s._mask.lineStyle(1, 0x00C800, 0.5);
        s._mask.drawRect(point.x - w * anchorX, point.y - w * anchorY, w, h);
        s._mask.endFill();
    };
    PIXIStageRectMask.prototype.clear = function () {
        var s = this;
        // if(s._bindObj){
        //     // s._bindObj.offAllCaller(s);
        //     s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear)
        // }
        s._bindObj = null;
        if (s._mask.parent)
            s._mask.parent.removeChild(s._mask);
    };
    return PIXIStageRectMask;
}());
exports.PIXIStageRectMask = PIXIStageRectMask;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************************!*\
  !*** ./src/engine/EngineManager.ts ***!
  \*************************************/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EngineManager = void 0;
var TreeNode_1 = __webpack_require__(/*! ../common/TreeNode */ "./src/common/TreeNode.ts");
var CocosCreatorEngineInfo_1 = __webpack_require__(/*! ./cocoscreator/CocosCreatorEngineInfo */ "./src/engine/cocoscreator/CocosCreatorEngineInfo.ts");
var Cocos2dxEngineInfo_1 = __webpack_require__(/*! ./cocos2dx/Cocos2dxEngineInfo */ "./src/engine/cocos2dx/Cocos2dxEngineInfo.ts");
var EgretEnginInfo_1 = __webpack_require__(/*! ./egret/EgretEnginInfo */ "./src/engine/egret/EgretEnginInfo.ts");
var LayaEngineInfo_1 = __webpack_require__(/*! ./laya/LayaEngineInfo */ "./src/engine/laya/LayaEngineInfo.ts");
var Utils_1 = __webpack_require__(/*! ../common/Utils */ "./src/common/Utils.ts");
var PIXIEngineInfo_1 = __webpack_require__(/*! ./pixi/PIXIEngineInfo */ "./src/engine/pixi/PIXIEngineInfo.ts");
var ConstVars_1 = __webpack_require__(/*! ../common/ConstVars */ "./src/common/ConstVars.ts");
var EngineManager = /** @class */ (function () {
    function EngineManager() {
    }
    EngineManager.init = function () {
        var s = this;
        var defaultEngines = [LayaEngineInfo_1.LayaEngineInfo, EgretEnginInfo_1.EgretEngineInfo, CocosCreatorEngineInfo_1.CocosCreatorEngineInfo, Cocos2dxEngineInfo_1.Cocos2dxEngineInfo, PIXIEngineInfo_1.PIXIEngineInfo];
        for (var i = 0; i < defaultEngines.length; i++) {
            var engine = new defaultEngines[i]();
            if (!s._engineDic[engine.name]) { //已经注册过的不在注册
                s.register(engine);
            }
        }
    };
    EngineManager.register = function (engine) {
        var s = this;
        if (!engine.getClassName) { //如果没有设置 获取 propNode 则使用默认的
            engine.getClassName = function (obj) {
                return Utils_1.Utils.getClassName(obj);
            };
        }
        s._engineDic[engine.name] = engine;
    };
    EngineManager.check = function () {
        var s = this;
        for (var key in s._engineDic) {
            var engine = s._engineDic[key];
            if (engine.haveEngine())
                return engine;
        }
        return null;
    };
    EngineManager.getTreeNode = function (engineInfo, obj) {
        var s = this;
        var treeNode = new TreeNode_1.TreeNode();
        treeNode.name = engineInfo.getClassName(obj);
        treeNode.memberName = engineInfo.getObjName(obj);
        treeNode.visible = engineInfo.getVisible(obj);
        treeNode.uid = obj.devUUID;
        var children = engineInfo.getChildren(obj);
        treeNode.hasChildren = children ? children.length > 0 : false;
        treeNode.updateIcon();
        return treeNode;
    };
    EngineManager.getPropNodes = function (engineInfo, obj, showPrivate, showFunction) {
        var s = this;
        var props = {};
        props = {};
        var addProps = engineInfo.getAddPropNode && engineInfo.getAddPropNode(obj);
        var filterProps = engineInfo.getNotShowPropNames && engineInfo.getNotShowPropNames(obj);
        var temp = obj;
        while (temp) {
            var keys = Reflect.ownKeys(temp);
            for (var key in keys) {
                var propName = keys[key];
                if (propName == "devUUID")
                    continue;
                if (typeof propName != "string")
                    continue;
                if (filterProps && filterProps.indexOf(propName) != -1)
                    continue;
                var propNode = s.getOnePropNode(obj, temp, propName);
                if (engineInfo.modifyPropNode) { //修改属性节点
                    propNode = engineInfo.modifyPropNode(obj, propName, propNode);
                }
                if (!showPrivate && propNode.isPrivate)
                    continue;
                if (!showFunction && propNode.type == "function")
                    continue;
                props[propNode.name] = propNode;
            }
            temp = temp.__proto__;
        }
        if (addProps && addProps.length > 0) {
            for (var i = 0; i < addProps.length; i++) {
                var propNode = addProps[i];
                props[propNode.name] = propNode;
            }
        }
        return props;
    };
    EngineManager.getOnePropNode = function (obj, owner, prop) {
        var propNode = { name: prop };
        propNode.isPrivate = prop.indexOf("_") == 0 || prop.indexOf("$") == 0;
        var propInfo = Object.getOwnPropertyDescriptor(owner, prop);
        // let findPropInfoObj = propInfo;
        // while(propInfo == null && findPropInfoObj){
        //     findPropInfoObj = Object.getPrototypeOf(findPropInfoObj);
        //     propInfo = Object.getOwnPropertyDescriptor(findPropInfoObj, prop);
        // }
        if (propInfo) {
            propNode.isGetter = propInfo.get != undefined;
            propNode.isSetter = propNode.isGetter && propInfo.set != undefined;
        }
        var value = null;
        try {
            value = obj[prop];
        }
        catch (u) {
            value = "faild to get value";
        }
        var type = typeof value;
        propNode.type = type;
        if (type == "object" && value) {
            propNode.expandable = true;
        }
        propNode.value = Utils_1.Utils.stringifyValue(value);
        return propNode;
    };
    EngineManager._engineDic = {};
    return EngineManager;
}());
exports.EngineManager = EngineManager;
window[ConstVars_1.ConstVars.ENGINE_MANAGER_PROP_NAME] = EngineManager;

})();

/******/ })()
;
//# sourceMappingURL=engine.js.map