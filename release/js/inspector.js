(()=>{var e,t,n,o,r={845:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseMessage=void 0;var n=function(){function e(e,t,n,o){this._from=e,this._name=o||this._from,this._thisObj=n,this._onMessage=t,this.init(),this.initListener()}return e.prototype.init=function(){},e.prototype.initListener=function(){},e}();t.BaseMessage=n},590:function(e,t,n){var o,r=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.ChromeConnectMessage=void 0;var a=n(845),i=n(303),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.init=function(){},t.prototype.initListener=function(){var e=this;chrome&&chrome.runtime&&(e._prot=chrome.runtime.connect({name:e._name}),e._prot.onMessage.addListener((function(t,n){i.ConstVars.DEBUG&&console.log("==== Chrome Message 收到消息",t),t.data&&t.data.from==e._from||e._onMessage.call(e._thisObj,t)})))},t.prototype.post=function(e,t){var n=this;if(n._prot){var o=!1;try{n._prot.postMessage({from:this._from,name:this._name,type:e,data:t})}catch(e){o=!0}o&&(n.initListener(),n._prot.postMessage({from:this._from,name:this._name,type:e,data:t}))}},t}(a.BaseMessage);t.ChromeConnectMessage=s},303:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ConstVars=void 0;var n=function(){function e(){}return e.HOMEURL="https://chengyoujie.github.io/GameInspect",e.VERSIONURL=e.HOMEURL+"/version",e.VERSIONINFOURL=e.VERSIONURL+"/version.txt",e.StageMaskName="$GAME_INSPECT_MASK",e.BUGURL="https://github.com/chengyoujie/GameInspect/issues",e.GitHubURL="https://github.com/chengyoujie/GameInspect",e.QQ="613279506",e.DEBUG=!1,e.DEV=!1,e}();t.ConstVars=n},905:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventBase=void 0;var n=function(){function e(){this._eventDic={}}return e.prototype.on=function(e,t,n){var o=this;o._eventDic[e]||(o._eventDic[e]=[]),o._eventDic[e].push({thisObj:n,fun:t})},e.prototype.trigger=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var o=this,r=o._eventDic[e];if(r)for(var a=0;a<r.length;a++)r[a].fun.apply(r[a].thisObj,t)},e.prototype.clear=function(){this._eventDic={}},e}();t.EventBase=n},222:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Message=void 0;var o=n(590),r=n(578),a=function(){function e(){}return e.getMessage=function(e,t,n,o){return new(this.getMessageClsByType(e))(e,t,n,o)},e.getMessageClsByType=function(e){switch(e){case"DevPanel":case"contentChrome":case"background":return o.ChromeConnectMessage;case"Stage":case"contentWindow":return r.WindowMessage}},e}();t.Message=a},462:function(e,t,n){var o,r=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;var a=function(e){function t(t){var n=e.call(this)||this;n.uid="",n.name="",n.memberName="",n.icon="",n.visible=!0,n.children=[],n.hasChildren=!1,n.props={},n.show=!1,n._selected=!1;var o=n;if(t){var r;r="string"==typeof t?JSON.parse(t):t;var a=Object.getOwnPropertyNames(r);for(var i in a){var s=a[i];if("children"==s){var c=r[s];o.updateChild(c,!1)}else o[s]=r[s]}}return n}return r(t,e),t.prototype.toggle=function(){var e=this;e.show=!e.show,e.showChildren(),e.updateIcon(),e.trigger("showChange")},Object.defineProperty(t.prototype,"selected",{get:function(){return this._selected},set:function(e){var t=this;t._selected=e,t._selected?t.trigger("onSelected"):t.trigger("unselected")},enumerable:!1,configurable:!0}),t.prototype.parserProp=function(){},t.prototype.showChildren=function(){this.show},t.prototype.replaceChild=function(e){for(var t=this,n=0;n<t.children.length;n++)if(t.children[n].uid==e.uid){t.children[n]=e;break}},t.prototype.updateChild=function(e,n){void 0===n&&(n=!0);var o=this;o.children.length=0;for(var r=0;r<e.length;r++){var a=new t(e[r]);o.children.push(a)}o.hasChildren=o.children.length>0,n&&this.trigger("childrenChange")},t.prototype.updateProps=function(e){this.props={},e&&(this.props=e)},t.prototype.changeProps=function(e,t){var n=this.props;if(t)for(var o=t.split("."),r=0;r<o.length;r++)if(r==o.length-1)n[o[r]]&&(n[o[r]].value=e);else if(!(n=n[o[r]].value))return},t.prototype.updateIcon=function(){this.icon=this.hasChildren?this.show?"-":"+":"&nbsp;"},t.prototype.on=function(t,n,o){e.prototype.on.call(this,t,n,o)},t}(n(905).EventBase);t.TreeNode=a},650:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Utils=void 0;var n=function(){function e(){}return e.getUID=function(){return this._uid++,this._uid},e.stringifyValue=function(e){if(null==e)return"null";if(null==e)return"undefined";switch(typeof e){case"string":return e;case"bigint":case"number":return isNaN(e)?"NaN":e;case"object":return Array.isArray(e)?"array":this.getClassName(e);default:return String(e)}},e.parseValue=function(e){if("NaN"!=e&&"undefined"!=e){if("null"==e)return null;if("true"==e)return!0;if("false"==e)return!1;try{return JSON.parse(e)}catch(t){return e}}},e.getClassName=function(e){return"number"==typeof e||"string"==typeof e?e:e.__class__?e.__class__:e.constructor&&e.constructor.__classid&&e.constructor.__classid.indexOf&&0!=e.constructor.__classid.indexOf("CLS_")?e.constructor.__classid:e.$owner&&e.$owner.constructor?e.$owner.constructor.name:e.__classname__?e.__classname__:e._className?e._className:e.__className?e.__className:e.constructor&&e.constructor.name?e.constructor.name:typeof e},e.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];if(e&&0!=e.length){for(var n=["#091528","#fc0000","#03783d","#a6a902","#011c7e","#8f067e","#027e6d"],o=[""],r=0;r<e.length;r++){var a=n[r%n.length];o[0]+=(0==r?"":" ")+"%c "+e[r];var i=0==r?3:0,s=r==e.length-1?3:0;o.push("background: ".concat(a,"; padding: 4px; border-radius: ").concat(i,"px ").concat(s,"px ").concat(s,"px ").concat(i,"px; color: #fff"))}console.log.apply(console,o)}},e.error=function(e){console.log("%c".concat(e),"background: #fc0000; padding: 4px; border-radius: 3px 3px 3px 3px; color: #fff")},e._uid=0,e}();t.Utils=n},578:function(e,t,n){var o,r=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.WindowMessage=void 0;var a=n(845),i=n(303),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.initListener=function(){var e=this;window.addEventListener("message",(function(t){t.data&&t.data.from==e._from||(i.ConstVars.DEBUG&&console.log(e._from+"收到消息",t),null!=e._onMessage&&e._onMessage.call(e._thisObj,t.data))}))},t.prototype.post=function(e,t){window.postMessage({from:this._from,name:this._name,type:e,data:t},"*")},t}(a.BaseMessage);t.WindowMessage=s},938:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EngineManager=void 0;var o=n(462),r=n(140),a=n(316),i=n(12),s=n(754),c=n(650),u=n(348),l=function(){function e(){}return e.init=function(){for(var e=[s.LayaEngineInfo,i.EgretEngineInfo,r.CocosEngineInfo,a.Cocos2dxEngineInfo,u.PIXIEngineInfo],t=0;t<e.length;t++){var n=new e[t];this._engineDic[n.name]||this.register(n)}},e.register=function(e){e.getClassName||(e.getClassName=function(e){return c.Utils.getClassName(e)}),this._engineDic[e.name]=e},e.check=function(){for(var e in this._engineDic){var t=this._engineDic[e];if(t.haveEngine())return t}return null},e.getTreeNode=function(e,t){var n=new o.TreeNode;n.name=e.getClassName(t),n.memberName=e.getObjName(t),n.visible=e.getVisible(t),n.uid=t.devUUID;var r=e.getChildren(t);return n.hasChildren=!!r&&r.length>0,n.updateIcon(),n},e.getPropNodes=function(e,t,n,o){var r={};r={};for(var a=e.getPropNames&&e.getPropNames(t),i=e.getNotShowPropNames&&e.getNotShowPropNames(t),s=t;s;){var c=Reflect.ownKeys(s);for(var u in c){var l=c[u];if("string"==typeof l&&(!i||-1==i.indexOf(l))){var p=this.getOnePropNode(t,s,l);!n&&p.isPrivate||(o||"function"!=p.type)&&(r[p.name]=p)}}s=s.__proto__}if(a&&a.length>0)for(var g=0;g<a.length;g++)r[a[g]]||(p=this.getOnePropNode(t,s,a[g]),!n&&p.isPrivate||(o||"function"!=p.type)&&(r[p.name]=p));return r},e.getOnePropNode=function(e,t,n){var o={name:n};o.isPrivate=0==n.indexOf("_")||0==n.indexOf("$");var r=Object.getOwnPropertyDescriptor(t,n);r&&(o.isGetter=null!=r.get,o.isSetter=o.isGetter&&null!=r.set);var a=null;try{a=e[n]}catch(e){a="faild to get value"}var i=typeof a;return o.type=i,"object"==i&&a&&(o.expandable=!0),o.value=c.Utils.stringifyValue(a),o},e._engineDic={},e}();t.EngineManager=l},316:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Cocos2dxEngineInfo=void 0;var o=n(511),r=function(){function e(){this.name="Cocos2dx"}return e.prototype.haveEngine=function(){return!!(window.cc&&window.CocosEngine&&window.cc.director&&this.stage)},e.prototype.init=function(){var e=this;e.version=window.CocosEngine,e.baseCls=cc.BaseNode||cc._BaseNode||cc.Node,e._mask=new o.Cocos2dxStageMask(e)},Object.defineProperty(e.prototype,"stage",{get:function(){var e;return window.cc&&window.cc.director&&window.cc.director._scenesStack&&(e=window.cc.director._scenesStack[0]),e},set:function(e){},enumerable:!1,configurable:!0}),e.prototype.start=function(e,t){},e.prototype.getChildren=function(e){return e.children},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.canUse=function(e){return e&&0!=e.isValid},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.active},e.prototype.setMouseEnable=function(e){},e.prototype.setVisible=function(e,t){e.active=t},e.prototype.showFPS=function(e){},e}();t.Cocos2dxEngineInfo=r},511:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Cocos2dxStageMask=void 0;var o=n(303),r=function(){function e(e){var t=this;t._engine=e,cc.DrawNode&&(t._mask=new cc.DrawNode,t._mask.name=o.ConstVars.StageMaskName)}return e.prototype.showRect=function(e){var t=this;t._bindObj=e;var n=Math.max(e.width,20),o=Math.max(e.height,20),r=e.convertToWorldSpace(),a=t._engine.stage;n*=e.scaleX,o*=e.scaleY,t._mask&&(t._mask.clear(),t._mask.removeFromParent()),t._mask.drawRect(cc.p(r.x-n*e.anchorX,r.y-o*e.anchorY),cc.p(n,o),new cc.Color(0,200,0,55),1,new cc.Color(0,200,0,235)),a.addChild(t._mask)},e.prototype.handleActiviteChange=function(e){var t=this;t._bindObj&&(t._bindObj.activeInHierarchy||t.clear())},e.prototype.clear=function(){var e=this;e._bindObj&&(e._bindObj=null),e._mask.getComponent(cc.Graphics).clear(),e._mask&&e._mask.removeFromParent()},e}();t.Cocos2dxStageMask=r},140:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CocosEngineInfo=void 0;var o=n(118),r=function(){function e(){this.name="Cocos"}return e.prototype.haveEngine=function(){return!!(window.cc&&window.CocosEngine&&window.cc.director&&this.stage)},e.prototype.init=function(){var e=this;e.version=window.CocosEngine,e.baseCls=cc.BaseNode||cc._BaseNode||cc.Node,e._mask=new o.CocosStageMask(e)},Object.defineProperty(e.prototype,"stage",{get:function(){var e;return window.cc&&window.cc.director&&window.cc.director.getScene&&(e=window.cc.director.getScene()),e},set:function(e){},enumerable:!1,configurable:!0}),e.prototype.start=function(e,t){},e.prototype.getChildren=function(e){return e.children},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask.clear()},e.prototype.canUse=function(e){return e&&0!=e.isValid},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.active},e.prototype.setMouseEnable=function(e){},e.prototype.setVisible=function(e,t){e.active=t},e.prototype.showFPS=function(e){},e}();t.CocosEngineInfo=r},118:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CocosStageMask=void 0;var o=n(303),r=function(){function e(e){var t=this;t._engine=e,t._mask=new cc.Node,t._mask.addComponent(cc.Graphics),t._mask.name=o.ConstVars.StageMaskName}return e.prototype.showRect=function(e){var t=this;t._bindObj=e;var n=e.worldPosition,o=e.worldScale;if(n&&o){var r=20,a=20;e.on(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED,t.handleActiviteChange,t);var i=e.components;if(i)for(var s=0;s<i.length;s++)if("cc.UITransform"==i[s].__classname__||"cc.UITransform"==i[s].__cid__){var c=i[s];r=c.width,a=c.height;break}var u=t._engine.stage;if(u){var l=u.getChildByName("Canvas");l&&(u=l)}var p=u.worldPosition,g=t._mask.getComponent(cc.Graphics);r*=o.x,a*=o.y,g.clear(),g.lineWidth=1,g.fillColor.fromHEX("#00C80022"),g.fillRect(n.x-p.x-r/2,n.y-p.y-a/2,r,a),g.close(),g.stroke(),g.fill(),u.addChild(t._mask)}},e.prototype.handleActiviteChange=function(e){var t=this;t._bindObj&&(t._bindObj.activeInHierarchy||t.clear())},e.prototype.clear=function(){var e=this;e._bindObj&&(e._bindObj.on(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED,e.handleActiviteChange,e),e._bindObj=null),e._mask.getComponent(cc.Graphics).clear(),e._mask.removeFromParent()},e}();t.CocosStageMask=r},12:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EgretEngineInfo=void 0;var o=n(650),r=n(455),a=n(588),i=function(){function e(){this.name="Egret",this._clssNameArray=[]}return e.prototype.haveEngine=function(){return!!(window.egret&&window.egret.sys&&window.egret.sys.$TempStage)},e.prototype.init=function(){var e=this;e.version=egret.Capabilities.engineVersion,e.baseCls=egret.DisplayObject,e.stage=egret.sys.$TempStage,e._mask=new a.EgretStageRectMask;var t=window.egret;for(var n in t)e._clssNameArray.push({name:n,class:t[n]})},e.prototype.start=function(e,t){r.EgretMouseEvent.start();var n=egret.sys.$TempStage;n.addEventListener(r.EgretMouseEvent.MOUSE_DOWN,(function(t){e(t.data)}),this),n.addEventListener(r.EgretMouseEvent.MOUSE_MOVE,(function(e){t(e.data)}),this)},e.prototype.setMouseEnable=function(e){r.EgretMouseEvent.enableMouseEvent=e},e.prototype.getChildren=function(e){return e.$children||[]},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.getNotShowPropNames=function(e){return e==this.stage?["x","y","alpha","visible","scaleX","scaleY","rotation","cacheAsBitmap","scrollRect","filters","blendMode","touchEnabled","matrix"]:null},e.prototype.canUse=function(e){return!!e},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e==this.stage||e.visible},e.prototype.setVisible=function(e,t){e.visible=t,t&&e.alpha<.1&&(e.alpha=1)},e.prototype.showFPS=function(e){var t=document.getElementById("egret-fps-panel");if(e)if(t)t.style.visibility="visible";else{var n=document.querySelectorAll(".egret-player")[0]["egret-player"];if(!egret.nativeRender){var o=n.playerOption;n.player.displayFPS(!0,!0,o.logFilter,o.fpsStyles)}}else t&&(t.style.visibility="hidden")},e.prototype.getClassName=function(e){if("number"==typeof e||"string"==typeof e)return e;for(var t=this,n=0;n<t._clssNameArray.length;n++)if(t._clssNameArray[n].class==e.constructor)return t._clssNameArray[n].name;return o.Utils.getClassName(e)},e}();t.EgretEngineInfo=i},455:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EgretMouseEvent=void 0;var n=function(){function e(){}return e.start=function(){var t=this;t._point=new egret.Point,t._rect=new egret.Rectangle,t._asDownEvent=egret.TouchEvent.TOUCH_BEGIN,t.MOUSE_MOVE=e.EventPreName+egret.TouchEvent.TOUCH_MOVE,t.MOUSE_DOWN=e.EventPreName+t._asDownEvent;var n=egret.sys.$TempStage;n.addEventListener(egret.TouchEvent.TOUCH_BEGIN,t.handleMouseDownEvent,t),n.addEventListener(egret.TouchEvent.TOUCH_END,t.handleMouseUPEvent,t),n.addEventListener(t._asDownEvent,t.handleMouseEvent,t);var o=egret.TouchEvent.dispatchTouchEvent;egret.TouchEvent.dispatchTouchEvent=function(e,n,r,a,i,s,c,u){if(void 0===u&&(u=!1),t.enableMouseEvent||n!=t._asDownEvent)return o.call(egret.TouchEvent,e,n,r,a,i,s,c,u);var l=egret.sys.$TempStage;t.check(l,i,s)}},e.handleMouseDownEvent=function(e){var t=this;t._curMouseMoveTime=Date.now(),egret.sys.$TempStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,t.handleMouseMove,t)},e.handleMouseUPEvent=function(e){egret.sys.$TempStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.handleMouseMove,this)},e.handleMouseMove=function(e){var t=this,n=Date.now();n-t._curMouseMoveTime<t._mouseMoveTime||(t._curMouseMoveTime=n,t.handleMouseEvent(e))},e.handleMouseEvent=function(t){var n=this,o=egret.sys.$TempStage;n.check(o,t.stageX,t.stageY),n._target&&o.dispatchEventWith(e.EventPreName+t.type,!0,n._target)},e.check=function(e,t,n){if(e!=egret.sys.$TempStage&&(!e.visible||0==e.scaleX||0==e.scaleY))return null;var o=this,r=e.$getInvertedConcatenatedMatrix();if(0==r.a&&0==r.b&&0==r.c&&0==r.d)return null;var a=r.a*t+r.c*n+r.tx,i=r.b*t+r.d*n+r.ty,s=e.$scrollRect?e.$scrollRect:e.$maskRect;if(s&&!s.contains(a,i))return null;if(e.$mask&&!e.$mask.$hitTest(t,n))return null;var c=e.$children;if(c)for(var u=null,l=c.length-1;l>=0;l--){var p=c[l];if(!p.$maskedObject&&(u=o.check(p,t,n)))return o._target=u,u}else if(e.$getContentBounds().contains(a,i))return o._target=e,e;return null},e.EventPreName="egretInspectEvent_",e.enableMouseEvent=!0,e._mouseMoveTime=500,e._curMouseMoveTime=0,e}();t.EgretMouseEvent=n},588:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EgretStageRectMask=void 0;var o=n(303),r=function(){function e(){this._mask=new egret.Sprite,this._rect=new egret.Rectangle,this._tempPoint=new egret.Point,this._mask.name=o.ConstVars.StageMaskName}return e.prototype.showRect=function(e){var t=this;if(t._bindObj&&t._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,t.clear,t),t._bindObj=e,t._bindObj.addEventListener(egret.Event.REMOVED_FROM_STAGE,t.clear,t),e){var n=1,o=1;egret.sys.$TempStage.addChild(t._mask),e!=egret.sys.$TempStage&&(n=e.scaleX,o=e.scaleY),t._tempPoint.x=0,t._tempPoint.y=0,e.localToGlobal(0,0,t._tempPoint),t._rect.x=t._tempPoint.x,t._rect.y=t._tempPoint.y,t._rect.width=Math.max(20,e.width)*n,t._rect.height=Math.max(20,e.height)*o,t._mask.graphics.clear(),t._mask.graphics.lineStyle(1,51200,.9),t._mask.graphics.beginFill(51200,.2),t._mask.graphics.drawRect(t._rect.x,t._rect.y,t._rect.width,t._rect.height),t._mask.graphics.endFill()}else t._mask.parent&&t._mask.parent.removeChild(t._mask)},e.prototype.clear=function(){var e=this;e._bindObj&&e._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,e.clear,e),e._bindObj=null,e._mask.parent&&e._mask.parent.removeChild(e._mask),e._rect.setEmpty()},e}();t.EgretStageRectMask=r},754:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LayaEngineInfo=void 0;var o=n(650),r=n(604),a=n(147),i=function(){function e(){this.name="Laya",this._clssNameArray=[]}return e.prototype.getParent=function(e){return e.parent},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.visible&&0!=e.alpha},e.prototype.setVisible=function(e,t){e.visible=t,t&&e.alpha<.1&&(e.alpha=1)},e.prototype.setMouseEnable=function(e){r.LayaMouseEvent.enableMouseEvent=e},e.prototype.canUse=function(e){return e&&!e.destroyed},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.haveEngine=function(){return window.Laya&&window.Laya.stage},e.prototype.init=function(){var e=this;e.baseCls=Laya.Sprite,e.stage=Laya.stage,e.version=Laya.version,e._mask=new a.LayaStageRectMask;var t=window.Laya;for(var n in t)e._clssNameArray.push({name:n,class:t[n]})},e.prototype.start=function(e,t){var n=this;r.LayaMouseEvent.start(this),Laya.stage.on(r.LayaMouseEvent.MOUSE_DOWN,this,(function(t){e.call(n,t)})),Laya.stage.on(r.LayaMouseEvent.MOUSE_MOVE,this,(function(e){t.call(n,e)}))},e.prototype.getChildren=function(e){return e._children||e._childs||[]},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.showFPS=function(e){window.Laya.Stat&&(e?window.Laya.Stat.show():window.Laya.Stat.hide())},e.prototype.getClassName=function(e){if("number"==typeof e||"string"==typeof e)return e;for(var t=this,n=0;n<t._clssNameArray.length;n++)if(t._clssNameArray[n].class==e.constructor)return t._clssNameArray[n].name;return o.Utils.getClassName(e)},e}();t.LayaEngineInfo=i},604:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LayaMouseEvent=void 0;var n=function(){function e(){}return e.start=function(t){var n=this;n._engine=t,n._point=new Laya.Point,n._rect=new Laya.Rectangle,n.MOUSE_MOVE=e.EventPreName+Laya.Event.MOUSE_MOVE,n.MOUSE_DOWN=e.EventPreName+Laya.Event.MOUSE_DOWN,Laya.stage.on(Laya.Event.MOUSE_DOWN,n,n.handleMouseDownEvent),Laya.stage.on(Laya.Event.MOUSE_UP,n,n.handleMouseUPEvent),Laya.stage.on(Laya.Event.MOUSE_DOWN,n,n.handleMouseEvent);var o=Laya.TouchManager.prototype,r=o.sendEvents;Object.defineProperties(o,{sendEvents:{value:function(e,t){(n.enableMouseEvent||t!=Laya.Event.CLICK)&&r.call(this,e,t)},enumerable:!0}})},e.handleMouseDownEvent=function(e){var t=this;t._curMouseMoveTime=Date.now(),Laya.stage.on(Laya.Event.MOUSE_MOVE,t,t.handleMouseMove)},e.handleMouseUPEvent=function(e){Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.handleMouseMove)},e.handleMouseMove=function(e){var t=this,n=Date.now();n-t._curMouseMoveTime<t._mouseMoveTime||(t._curMouseMoveTime=n,t.handleMouseEvent(e))},e.handleMouseEvent=function(t){this.check(Laya.stage,Laya.MouseManager.instance.mouseX,Laya.MouseManager.instance.mouseY),Laya.stage.event(e.EventPreName+t.type,this._target)},e.check=function(e,t,n){this._point.setTo(t,n),e.fromParentPoint(this._point),t=this._point.x,n=this._point.y;var o=e._style.scrollRect;if(o&&(this._rect.setTo(o.x,o.y,o.width,o.height),!this._rect.contains(t,n)))return!1;var r=!1;Laya.Label&&e instanceof Laya.Label&&(r=!0),Laya.Button&&e instanceof Laya.Button&&(r=!0),Laya.Image&&e instanceof Laya.Image&&(r=!0),Laya.Text&&e instanceof Laya.Text&&(r=!0);var a=this._engine.getChildren(e);if(!r&&a){for(var i=a.length-1;i>-1;i--){var s=a[i];if(!s.destroyed&&s.visible&&this.check(s,t,n))return!0}if(e._extUIChild)for(i=e._extUIChild.length-1;i>=0;i--){var c=e._extUIChild[i];if(!c.destroyed&&c.visible&&this.check(c,t,n))return!0}}var u=this.hitTest(e,t,n);return u&&(this._target=e),u},e.hitTest=function(e,t,n){var o=!1;e.scrollRect&&(t-=e._style.scrollRect.x,n-=e._style.scrollRect.y);var r=e._style.hitArea;return r&&r._hit?r.contains(t,n):((e.width>0&&e.height>0||e.mouseThrough||r)&&(o=e.mouseThrough?e.getGraphicBounds().contains(t,n):(r||this._rect.setTo(0,0,e.width,e.height)).contains(t,n)),o)},e.EventPreName="layaInspactEvent_",e.enableMouseEvent=!0,e._mouseMoveTime=500,e._curMouseMoveTime=0,e}();t.LayaMouseEvent=n},147:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LayaStageRectMask=void 0;var o=n(303),r=function(){function e(){this._mask=new Laya.Sprite,this._rect=new Laya.Rectangle,this._tempPoint=new Laya.Point,this._mask.name=o.ConstVars.StageMaskName,Laya.version.startsWith("1.")?this._mask.alpha=.3:this._mask.alpha=1}return e.prototype.showRect=function(e){var t=this;t._bindObj&&t._bindObj.off(Laya.Event.UNDISPLAY,t,t.clear),t._bindObj=e,t._bindObj.on(Laya.Event.UNDISPLAY,t,t.clear),e?(Laya.stage.addChild(t._mask),t._tempPoint.x=0,t._tempPoint.y=0,e.localToGlobal(t._tempPoint),t._rect.x=t._tempPoint.x,t._rect.y=t._tempPoint.y,t._rect.width=Math.max(20,e.width)*e.scaleX,t._rect.height=Math.max(20,e.height)*e.scaleY,t._mask.graphics.clear(),t._mask.graphics.drawRect(t._rect.x,t._rect.y,t._rect.width,t._rect.height,"#00C80022","#00C800ee",1)):t._mask.removeSelf()},e.prototype.clear=function(){var e=this;e._bindObj&&e._bindObj.off(Laya.Event.UNDISPLAY,e,e.clear),e._bindObj=null,e._mask.removeSelf()},e}();t.LayaStageRectMask=r},348:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PIXIEngineInfo=void 0;var o=n(650),r=n(786),a=function(){function e(){this.name="PIXI",this._haveInjectApplictionRender=!1,this._clssNameArray=[]}return e.prototype.haveEngine=function(){if(!window.PIXI||!window.PIXI.Application||!window.PIXI.Ticker)return!1;var e=this;if(!e._haveInjectApplictionRender){e._haveInjectApplictionRender=!0;var t=window.PIXI.Ticker.prototype,n=t.update;Object.defineProperty(t,"update",{value:function(){if(!e.stage)for(var t=this._head,o=0;t&&!(++o>=100);){if(t.context&&t.context instanceof window.PIXI.Application){e.stage=t.context.stage;break}t=t.next}n.call(this)},enumerable:!0})}return!!e.stage},e.prototype.init=function(){var e=this;e.version=PIXI.VERSION,e.baseCls=PIXI.DisplayObject,e._mask=new r.PIXIStageRectMask(e);var t=window.PIXI;for(var n in t)e._clssNameArray.push({name:n,class:t[n]})},e.prototype.start=function(e,t){},e.prototype.getClassName=function(e){if("number"==typeof e||"string"==typeof e)return e;for(var t=this,n=0;n<t._clssNameArray.length;n++)if(t._clssNameArray[n].class==e.constructor)return t._clssNameArray[n].name;return o.Utils.getClassName(e)},e.prototype.getChildren=function(e){return e.children?e.children:[]},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.canUse=function(e){return!!e},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.visible},e.prototype.setMouseEnable=function(e){},e.prototype.setVisible=function(e,t){e.visible=t,t&&0==e.alpha&&(e.alpha=1)},e.prototype.showFPS=function(e){},e}();t.PIXIEngineInfo=a},786:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PIXIStageRectMask=void 0;var o=n(303),r=function(){function e(e){this._engine=e,this._mask=new PIXI.Graphics,this._tempPoint=new PIXI.Point,this._mask.name=o.ConstVars.StageMaskName}return e.prototype.showRect=function(e){var t=this;if(t._bindObj,t._bindObj=e,e){t._engine.stage.addChild(t._mask),t._tempPoint.x=0,t._tempPoint.y=0;var n=e.toGlobal(t._tempPoint),o=e.getLocalBounds(),r=e.scale,a=Math.max(20,r.x*o.width),i=Math.max(20,r.y*o.width),s=0,c=0,u=e.anchor;u&&(s=u.x,c=u.y),t._mask.clear(),t._mask.beginFill(51200,.3),t._mask.lineStyle(1,51200,.5),t._mask.drawRect(n.x-a*s,n.y-a*c,a,i),t._mask.endFill()}else t._mask.parent&&t._mask.parent.removeChild(t._mask)},e.prototype.clear=function(){var e=this;e._bindObj=null,e._mask.parent&&e._mask.parent.removeChild(e._mask)},e}();t.PIXIStageRectMask=r}},a={};function i(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return r[e].call(n.exports,n,n.exports,i),n.exports}e=i(222),t=i(938),n=i(650),o=i(303),new(function(){function r(){this._uid2Obj={},this._treeSetting={hightLightClick:!1,hightlightHover:!1,preEventTouch:!1,showPrivate:!1,showFunction:!1,showFPS:!0},this.init()}return r.prototype.init=function(){var o=this;o.msg=e.Message.getMessage("Stage",o.handleRecvMessage,o),t.EngineManager.init();var r=setInterval((function(){o.checkCostomEngine(),o._engine=t.EngineManager.check(),o._engine&&(clearInterval(r),o._engine.init(),Object.defineProperties(o._engine.baseCls.prototype,{devUUID:{get:function(){var e=this.$_DevUUID;return e||(e=this.$_DevUUID=n.Utils.getUID(),o._uid2Obj[e]=this),e},enumerable:!1}}),o._engine.start((function(e){e&&o.showClickObj(e,o._treeSetting.hightLightClick)}),(function(e){if(e&&o._treeSetting.hightlightHover){if(o._lastMoveObj==e)return;o._lastMoveObj=e,o.showClickObj(e,o._treeSetting.hightlightHover)}})),o._gameInfo={name:window.document.title,engin:o._engine.name,version:o._engine.version},o.msg.post("treeSetingReq"),o.msg.post("gameInfoResponse",o._gameInfo),o.handleInitStage())}),1e3)},r.prototype.checkCostomEngine=function(){var e=this;if(!e._customEngine&&window.getGameInspectUserCostomEngine&&(e._customEngine=window.getGameInspectUserCostomEngine(),e._customEngine&&e._customEngine.engine)){var n=e._customEngine.engine;if(Array.isArray(n))for(var o=0;o<n.length;o++)t.EngineManager.register(n[o]);else t.EngineManager.register(n)}},r.prototype.showClickObj=function(e,n){for(var o,r=this,a=e;a;){var i=t.EngineManager.getTreeNode(r._engine,a),s=r._engine.getChildren(a),c=[];if(s)for(var u=0;u<s.length;u++)o&&o.uid==s[u].devUUID?c.push(o):c.push(t.EngineManager.getTreeNode(r._engine,s[u]));i.updateChild(c,!1),(o=i).show=!0,o.updateIcon(),a=r._engine.getParent(a)}r.msg.post("initStageDataResponse",o),r._engine&&(n&&r._engine.drawMask(e),r.msg.post("selectNode",e.devUUID)),r.msg.post("propDataResponse",{uid:e.devUUID,props:t.EngineManager.getPropNodes(r._engine,e,r._treeSetting.showPrivate,r._treeSetting.showFunction)})},r.prototype.handleInitStage=function(){var e=this,n=t.EngineManager.getTreeNode(e._engine,e._engine.stage);e.msg.post("initStageDataResponse",n)},r.prototype.handleRecvMessage=function(e){var r=this;if(r._engine){if("expandTreeReq"==e.type){var a=r._uid2Obj[e.data];if(r._engine.canUse(a)){var i=[],s=r._engine.getChildren(a);if(s)for(var c=0;c<s.length;c++)i.push(t.EngineManager.getTreeNode(r._engine,s[c]));r.msg.post("expandTreeResponse",{uid:a.devUUID,children:i})}}else if("initStageDataReq"==e.type)r.handleInitStage();else if("propChangeReq"==e.type){var u=e.data.data,l=(a=r._uid2Obj[e.data.uid],e.data.propPath);if(r._engine.canUse(a)){var p=a,g=void 0;if(l){var h=l.split(".");for(c=0;c<h.length;c++)if(c==h.length-1)p[h[c]]=u,g=p[h[c]],r.msg.post("propChangeResponse",{uid:a.devUUID,propPath:l,data:n.Utils.stringifyValue(g)});else if(!(p=p[h[c]]))return}}}else if("showRectInStageReq"==e.type)a=r._uid2Obj[e.data],r._engine.canUse(a)&&(r._engine.drawMask(a),r.msg.post("selectNode",a.devUUID));else if("propDataReq"==e.type)a=r._uid2Obj[e.data],r._engine.canUse(a)&&r.msg.post("propDataResponse",{uid:a.devUUID,props:t.EngineManager.getPropNodes(r._engine,a,r._treeSetting.showPrivate,r._treeSetting.showFunction)});else if("treeSettingInfo"==e.type){var d=e.data;for(var _ in d)r._treeSetting[_]=d[_];0!=d.hightLightClick&&0!=d.hightlightHover||r._engine&&r._engine.clearMask(),0==d.hightlightHover&&(r._lastMoveObj=null),null!=d.showFPS&&r._engine.showFPS(r._treeSetting.showFPS),r._engine.setMouseEnable(!d.preEventTouch)}else if("expandPropReq"==e.type){if(d=e.data,a=r._uid2Obj[d.uid],r._engine.canUse(a)){for(l=d.prop.split("."),p=a,c=0;c<l.length;c++)if(!(p=p[l[c]]))return;r.msg.post("expandPropResponse",{uid:a.devUUID,prop:d.prop,data:t.EngineManager.getPropNodes(r._engine,p,r._treeSetting.showPrivate,r._treeSetting.showFunction)})}}else if("visibleChangeReq"==e.type)d=e.data,a=r._uid2Obj[d.uid],r._engine.canUse(a)&&(r._engine.setVisible(a,d.data),r.msg.post("propDataResponse",{uid:a.devUUID,props:t.EngineManager.getPropNodes(r._engine,a,r._treeSetting.showPrivate,r._treeSetting.showFunction)}));else if("gameInfoReq"==e.type)r._gameInfo&&r.msg.post("gameInfoResponse",r._gameInfo);else if("showTreeNodeInConsoleReq"==e.type)if(a=r._uid2Obj[e.data],r._engine.canUse(a))if(r._customEngine&&r._customEngine.printVar)r._customEngine.printVar(a);else{var f="gameInspectNode"+e.data;n.Utils.log("临时变量名",f),console.log(a),window[f]=a}else o.ConstVars.DEBUG&&console.log("没有找到节点： "+e.data);else if("inspectClassDefinedReq"==e.type)if(a=r._uid2Obj[e.data],r._engine.canUse(a)){var v="gameInspectClassFun"+e.data,m=a.constructor;r._customEngine&&r._customEngine.getClassFun&&(m=r._customEngine.getClassFun(a)),m&&(window[v]=m,r.msg.post("inspectCodeResponse",{name:v,url:location.href}))}else o.ConstVars.DEBUG&&console.log("没有找到节点： "+e.data);else if("inspectVarDefinedReq"==e.type)a=r._uid2Obj[e.data],r._engine.canUse(a)?(v="gameInspectVarFun"+e.data,(m=r.getVarLocationFun(a))?(window[v]=m,r.msg.post("inspectCodeResponse",{name:v,url:location.href})):(n.Utils.error("没有找到对应的变量声明"),alert("未找到变量声明的地方"))):o.ConstVars.DEBUG&&console.log("没有找到节点： "+e.data);else if("showTreeNodePathReq"==e.type)a=r._uid2Obj[e.data],r._engine.canUse(a)&&r.printNodePath(a);else if("showPropFunDefineReq"==e.type){var y="gameInspectPropFun_"+(d=e.data).uid+"_"+d.propPath.replace(/\./gi,"_");if(a=r._uid2Obj[d.uid],r._engine.canUse(a)){for(l=d.propPath.split("."),p=a,m=void 0,c=0;c<l.length;c++){if(!(p=p[l[c]]))return;c==l.length-1&&(m=p)}m?(window[y]=m,r.msg.post("inspectCodeResponse",{name:y,url:location.href})):(n.Utils.error("没有找到属性的方法定义"),alert("没有找到属性的方法定义"))}}o.ConstVars.DEBUG&&console.log(" Inspection  接受到消息： ",e)}},r.prototype.getVarLocationFun=function(e){var t=this;if(e&&t._engine){var o;if(t._customEngine&&t._customEngine.getVarLocationFun)o=t._customEngine.getVarLocationFun(e);else for(var r=t._engine.getParent(e);r;){var a=Object.keys(r);for(var i in a){var s=a[i];if(r[s]==e){o=r.constructor,n.Utils.log("对应变量： ".concat(s));break}}r=t._engine.getParent(r)}return o}},r.prototype.printNodePath=function(e){var t=this;if(e&&t._engine)if(t._customEngine&&t._customEngine.printNodePath)t._customEngine.printNodePath(e);else{for(var o="",r=void 0,a=e;a;){r=t._engine.getParent(a);for(var i=void 0;r;){var s=Object.keys(r);for(var c in s){var u=s[c];if(r[u]==a){i=u,a=r;break}}if(i)break;r=t._engine.getParent(r)}if(i)o=i+(o?"."+o:"");else{i||(i=t._engine.getObjName(a));var l=t._engine.getParent(a);!i&&l&&-1!=(c=t._engine.getChildren(l).indexOf(a))&&(i=c+""),i&&(o=i+(o?"."+o:"")),l||(o=t._engine.getClassName(a)+(o?"."+o:"")),a=l}}n.Utils.log("对应变量： "+o)}},r}())})();