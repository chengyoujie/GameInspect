(()=>{var e,t,n,o,a={845:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseMessage=void 0;var n=function(){function e(e,t,n,o){this._from=e,this._name=o||this._from,this._thisObj=n,this._onMessage=t,this.init(),this.initListener()}return e.prototype.init=function(){},e.prototype.initListener=function(){},e}();t.BaseMessage=n},590:function(e,t,n){var o,a=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.ChromeConnectMessage=void 0;var r=n(845),i=n(303),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.init=function(){var e=this;chrome.runtime.onMessage.addListener((function(t,n){"onDisconnnect"==t.type&&e._name==t.data&&(e.initListener(),e._onMessage.call(e._thisObj,t))}))},t.prototype.initListener=function(){var e=this;chrome&&chrome.runtime&&(e._prot=chrome.runtime.connect({name:e._name}),e._prot.onMessage.addListener((function(t,n){i.ConstVars.DEBUG&&console.log("==== Chrome Message 收到消息",t),t.data&&t.data.from==e._from||e._onMessage.call(e._thisObj,t)})))},t.prototype.post=function(e,t){var n=this;if(n._prot){var o=!1;try{n._prot.postMessage({from:this._from,name:this._name,type:e,data:t})}catch(e){o=!0}o&&(n.initListener(),n._prot.postMessage({from:this._from,name:this._name,type:e,data:t}))}},t}(r.BaseMessage);t.ChromeConnectMessage=s},303:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ConstVars=void 0;var n=function(){function e(){}return e.StageMaskName="$GAME_INSPECT_MASK",e.BUGURL="https://github.com/chengyoujie/GameInspect/issues",e.GitHubURL="https://github.com/chengyoujie/GameInspect",e.QQ="613279506",e.DEBUG=!1,e.DEV=!1,e}();t.ConstVars=n},905:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventBase=void 0;var n=function(){function e(){this._eventDic={}}return e.prototype.on=function(e,t,n){var o=this;o._eventDic[e]||(o._eventDic[e]=[]),o._eventDic[e].push({thisObj:n,fun:t})},e.prototype.trigger=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var o=this,a=o._eventDic[e];if(a)for(var r=0;r<a.length;r++)a[r].fun.apply(a[r].thisObj,t)},e.prototype.clear=function(){this._eventDic={}},e}();t.EventBase=n},222:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Message=void 0;var o=n(590),a=n(578),r=function(){function e(){}return e.getMessage=function(e,t,n,o){return new(this.getMessageClsByType(e))(e,t,n,o)},e.getMessageClsByType=function(e){switch(e){case"DevPanel":case"contentChrome":case"background":return o.ChromeConnectMessage;case"Stage":case"contentWindow":return a.WindowMessage}},e}();t.Message=r},462:function(e,t,n){var o,a=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;var r=function(e){function t(t){var n=e.call(this)||this;n.uid="",n.name="",n.memberName="",n.icon="",n.visible=!0,n.children=[],n.hasChildren=!1,n.props={},n.show=!1,n._selected=!1;var o=n;if(t){var a;a="string"==typeof t?JSON.parse(t):t;var r=Object.getOwnPropertyNames(a);for(var i in r){var s=r[i];if("children"==s){var c=a[s];o.updateChild(c,!1)}else o[s]=a[s]}}return n}return a(t,e),t.prototype.toggle=function(){var e=this;e.show=!e.show,e.showChildren(),e.updateIcon(),e.trigger("showChange")},Object.defineProperty(t.prototype,"selected",{get:function(){return this._selected},set:function(e){var t=this;t._selected=e,t._selected?t.trigger("onSelected"):t.trigger("unselected")},enumerable:!1,configurable:!0}),t.prototype.parserProp=function(){},t.prototype.showChildren=function(){this.show},t.prototype.replaceChild=function(e){for(var t=this,n=0;n<t.children.length;n++)if(t.children[n].uid==e.uid){t.children[n]=e;break}},t.prototype.updateChild=function(e,n){void 0===n&&(n=!0);var o=this;o.children.length=0;for(var a=0;a<e.length;a++){var r=new t(e[a]);o.children.push(r)}o.hasChildren=o.children.length>0,n&&this.trigger("childrenChange")},t.prototype.updateProps=function(e){this.props={},e&&(this.props=e)},t.prototype.changeProps=function(e,t){var n=this.props;if(t)for(var o=t.split("."),a=0;a<o.length;a++)if(a==o.length-1)n[o[a]]&&(n[o[a]].value=e);else if(!(n=n[o[a]].value))return},t.prototype.updateIcon=function(){this.icon=this.hasChildren?this.show?"-":"+":"&nbsp;"},t.prototype.on=function(t,n,o){e.prototype.on.call(this,t,n,o)},t}(n(905).EventBase);t.TreeNode=r},650:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Utils=void 0;var n=function(){function e(){}return e.getUID=function(){return this._uid++,this._uid},e.stringifyValue=function(e){if(null==e)return"null";if(null==e)return"undefined";switch(typeof e){case"string":return e;case"bigint":case"number":return isNaN(e)?"NaN":e;case"object":return Array.isArray(e)?"array":this.getClassName(e);default:return String(e)}},e.parseValue=function(e){if("NaN"!=e&&"undefined"!=e){if("null"==e)return null;if("true"==e)return!0;if("false"==e)return!1;try{return JSON.parse(e)}catch(t){return e}}},e.getClassName=function(e){return"number"==typeof e||"string"==typeof e?e:e.__class__?e.__class__:e.constructor&&e.constructor.__classid&&e.constructor.__classid.indexOf&&0!=e.constructor.__classid.indexOf("CLS_")?e.constructor.__classid:e.$owner&&e.$owner.constructor?e.$owner.constructor.name:e.__classname__?e.__classname__:e._className?e._className:e.constructor&&e.constructor.name?e.constructor.name:typeof e},e.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];if(e&&0!=e.length){for(var n=["#091528","#fc0000","#03783d","#a6a902","#011c7e","#8f067e","#027e6d"],o=[""],a=0;a<e.length;a++){var r=n[a%n.length];o[0]+=(0==a?"":" ")+"%c "+e[a];var i=0==a?3:0,s=a==e.length-1?3:0;o.push("background: ".concat(r,"; padding: 4px; border-radius: ").concat(i,"px ").concat(s,"px ").concat(s,"px ").concat(i,"px; color: #fff"))}console.log.apply(console,o)}},e.error=function(e){console.log("%c ".concat(e,",'background: #fc0000; padding: 4px; border-radius: 3px 3px 3px 3px; color: #fff"))},e._uid=0,e}();t.Utils=n},578:function(e,t,n){var o,a=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.WindowMessage=void 0;var r=n(845),i=n(303),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.initListener=function(){var e=this;window.addEventListener("message",(function(t){t.data&&t.data.from==e._from||(i.ConstVars.DEBUG&&console.log(e._from+"收到消息",t),null!=e._onMessage&&e._onMessage.call(e._thisObj,t.data))}))},t.prototype.post=function(e,t){window.postMessage({from:this._from,name:this._name,type:e,data:t},"*")},t}(r.BaseMessage);t.WindowMessage=s},938:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EngineManager=void 0;var o=n(462),a=n(140),r=n(316),i=n(12),s=n(754),c=n(650),u=n(348),p=function(){function e(){}return e.init=function(){for(var e=[s.LayaEngineInfo,i.EgretEngineInfo,a.CocosEngineInfo,r.Cocos2dxEngineInfo,u.PIXIEngineInfo],t=0;t<e.length;t++){var n=new e[t];this._engineDic[n.name]||this.register(n)}},e.register=function(e){e.getClassName||(e.getClassName=function(e){return c.Utils.getClassName(e)}),this._engineDic[e.name]=e},e.check=function(){for(var e in this._engineDic){var t=this._engineDic[e];if(t.haveEngine())return t}return null},e.getTreeNode=function(e,t){var n=new o.TreeNode;n.name=e.getClassName(t),n.memberName=e.getObjName(t),n.visible=e.getVisible(t),n.uid=t.devUUID;var a=e.getChildren(t);return n.hasChildren=!!a&&a.length>0,n.updateIcon(),n},e.getPropNodes=function(e,t,n,o){var a={};a={};for(var r=e.getPropNames&&e.getPropNames(t),i=e.getNotShowPropNames&&e.getNotShowPropNames(t),s=t;s;){var c=Reflect.ownKeys(s);for(var u in c){var p=c[u];if("string"==typeof p&&(!i||-1==i.indexOf(p))){var l=this.getOnePropNode(t,s,p);!n&&l.isPrivate||(o||"function"!=l.type)&&(a[l.name]=l)}}s=s.__proto__}if(r&&r.length>0)for(var g=0;g<r.length;g++)a[r[g]]||(l=this.getOnePropNode(t,s,r[g]),!n&&l.isPrivate||(o||"function"!=l.type)&&(a[l.name]=l));return a},e.getOnePropNode=function(e,t,n){var o={name:n};o.isPrivate=0==n.indexOf("_")||0==n.indexOf("$");var a=Object.getOwnPropertyDescriptor(t,n);a&&(o.isGetter=null!=a.get,o.isSetter=o.isGetter&&null!=a.set);var r=null;try{r=e[n]}catch(e){r="faild to get value"}var i=typeof r;return o.type=i,"object"==i&&r&&(o.expandable=!0),o.value=c.Utils.stringifyValue(r),o},e._engineDic={},e}();t.EngineManager=p},316:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Cocos2dxEngineInfo=void 0;var o=n(511),a=function(){function e(){this.name="Cocos2dx"}return e.prototype.haveEngine=function(){return!!(window.cc&&window.CocosEngine&&window.cc.director&&this.stage)},e.prototype.init=function(){var e=this;e.version=window.CocosEngine,e.baseCls=cc.BaseNode||cc._BaseNode||cc.Node,e._mask=new o.Cocos2dxStageMask(e)},Object.defineProperty(e.prototype,"stage",{get:function(){var e;return window.cc&&window.cc.director&&window.cc.director._scenesStack&&(e=window.cc.director._scenesStack[0]),e},set:function(e){},enumerable:!1,configurable:!0}),e.prototype.start=function(e,t){},e.prototype.getChildren=function(e){return e.children},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.canUse=function(e){return e&&0!=e.isValid},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.active},e.prototype.setMouseEnable=function(e){},e.prototype.setVisible=function(e,t){e.active=t},e.prototype.showFPS=function(e){},e}();t.Cocos2dxEngineInfo=a},511:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Cocos2dxStageMask=void 0;var o=n(303),a=function(){function e(e){var t=this;t._engine=e,cc.DrawNode&&(t._mask=new cc.DrawNode,t._mask.name=o.ConstVars.StageMaskName)}return e.prototype.showRect=function(e){var t=this;t._bindObj=e;var n=Math.max(e.width,20),o=Math.max(e.height,20),a=e.convertToWorldSpace(),r=t._engine.stage;n*=e.scaleX,o*=e.scaleY,t._mask&&(t._mask.clear(),t._mask.removeFromParent()),t._mask.drawRect(cc.p(a.x-n*e.anchorX,a.y-o*e.anchorY),cc.p(n,o),new cc.Color(0,200,0,55),1,new cc.Color(0,200,0,235)),r.addChild(t._mask)},e.prototype.handleActiviteChange=function(e){var t=this;t._bindObj&&(t._bindObj.activeInHierarchy||t.clear())},e.prototype.clear=function(){var e=this;e._bindObj&&(e._bindObj=null),e._mask.getComponent(cc.Graphics).clear(),e._mask&&e._mask.removeFromParent()},e}();t.Cocos2dxStageMask=a},140:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CocosEngineInfo=void 0;var o=n(118),a=function(){function e(){this.name="Cocos"}return e.prototype.haveEngine=function(){return!!(window.cc&&window.CocosEngine&&window.cc.director&&this.stage)},e.prototype.init=function(){var e=this;e.version=window.CocosEngine,e.baseCls=cc.BaseNode||cc._BaseNode||cc.Node,e._mask=new o.CocosStageMask(e)},Object.defineProperty(e.prototype,"stage",{get:function(){var e;return window.cc&&window.cc.director&&window.cc.director.getScene&&(e=window.cc.director.getScene()),e},set:function(e){},enumerable:!1,configurable:!0}),e.prototype.start=function(e,t){},e.prototype.getChildren=function(e){return e.children},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask.clear()},e.prototype.canUse=function(e){return e&&0!=e.isValid},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.active},e.prototype.setMouseEnable=function(e){},e.prototype.setVisible=function(e,t){e.active=t},e.prototype.showFPS=function(e){},e}();t.CocosEngineInfo=a},118:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CocosStageMask=void 0;var o=n(303),a=function(){function e(e){var t=this;t._engine=e,t._mask=new cc.Node,t._mask.addComponent(cc.Graphics),t._mask.name=o.ConstVars.StageMaskName}return e.prototype.showRect=function(e){var t=this;t._bindObj=e;var n=e.worldPosition,o=e.worldScale;if(n&&o){var a=20,r=20;e.on(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED,t.handleActiviteChange,t);var i=e.components;if(i)for(var s=0;s<i.length;s++)if("cc.UITransform"==i[s].__classname__||"cc.UITransform"==i[s].__cid__){var c=i[s];a=c.width,r=c.height;break}var u=t._engine.stage;if(u){var p=u.getChildByName("Canvas");p&&(u=p)}var l=u.worldPosition,g=t._mask.getComponent(cc.Graphics);a*=o.x,r*=o.y,g.clear(),g.lineWidth=1,g.fillColor.fromHEX("#00C80022"),g.fillRect(n.x-l.x-a/2,n.y-l.y-r/2,a,r),g.close(),g.stroke(),g.fill(),u.addChild(t._mask)}},e.prototype.handleActiviteChange=function(e){var t=this;t._bindObj&&(t._bindObj.activeInHierarchy||t.clear())},e.prototype.clear=function(){var e=this;e._bindObj&&(e._bindObj.on(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED,e.handleActiviteChange,e),e._bindObj=null),e._mask.getComponent(cc.Graphics).clear(),e._mask.removeFromParent()},e}();t.CocosStageMask=a},12:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EgretEngineInfo=void 0;var o=n(455),a=n(588),r=function(){function e(){this.name="Egret"}return e.prototype.haveEngine=function(){return!!(window.egret&&window.egret.sys&&window.egret.sys.$TempStage)},e.prototype.init=function(){var e=this;e.version=egret.Capabilities.engineVersion,e.baseCls=egret.DisplayObject,e.stage=egret.sys.$TempStage,e._mask=new a.EgretStageRectMask},e.prototype.start=function(e,t){o.EgretMouseEvent.start();var n=egret.sys.$TempStage;n.addEventListener(o.EgretMouseEvent.MOUSE_DOWN,(function(t){e(t.data)}),this),n.addEventListener(o.EgretMouseEvent.MOUSE_MOVE,(function(e){t(e.data)}),this)},e.prototype.setMouseEnable=function(e){o.EgretMouseEvent.enableMouseEvent=e},e.prototype.getChildren=function(e){return e.$children||[]},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.getNotShowPropNames=function(e){return e==this.stage?["x","y","alpha","visible","scaleX","scaleY","rotation","cacheAsBitmap","scrollRect","filters","blendMode","touchEnabled","matrix"]:null},e.prototype.canUse=function(e){return!!e},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e==this.stage||e.visible},e.prototype.setVisible=function(e,t){e.visible=t,t&&e.alpha<.1&&(e.alpha=1)},e.prototype.showFPS=function(e){var t=document.getElementById("egret-fps-panel");if(e)if(t)t.style.visibility="visible";else{var n=document.querySelectorAll(".egret-player")[0]["egret-player"];if(!egret.nativeRender){var o=n.playerOption;n.player.displayFPS(!0,!0,o.logFilter,o.fpsStyles)}}else t&&(t.style.visibility="hidden")},e}();t.EgretEngineInfo=r},455:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EgretMouseEvent=void 0;var n=function(){function e(){}return e.start=function(){var t=this;t._point=new egret.Point,t._rect=new egret.Rectangle,t._asDownEvent=egret.TouchEvent.TOUCH_BEGIN,t.MOUSE_MOVE=e.EventPreName+egret.TouchEvent.TOUCH_MOVE,t.MOUSE_DOWN=e.EventPreName+t._asDownEvent;var n=egret.sys.$TempStage;n.addEventListener(egret.TouchEvent.TOUCH_BEGIN,t.handleMouseDownEvent,t),n.addEventListener(egret.TouchEvent.TOUCH_END,t.handleMouseUPEvent,t),n.addEventListener(t._asDownEvent,t.handleMouseEvent,t);var o=egret.TouchEvent.dispatchTouchEvent;egret.TouchEvent.dispatchTouchEvent=function(e,n,a,r,i,s,c,u){if(void 0===u&&(u=!1),t.enableMouseEvent||n!=t._asDownEvent)return o.call(egret.TouchEvent,e,n,a,r,i,s,c,u);var p=egret.sys.$TempStage;t.check(p,i,s)}},e.handleMouseDownEvent=function(e){var t=this;t._curMouseMoveTime=Date.now(),egret.sys.$TempStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,t.handleMouseMove,t)},e.handleMouseUPEvent=function(e){egret.sys.$TempStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.handleMouseMove,this)},e.handleMouseMove=function(e){var t=this,n=Date.now();n-t._curMouseMoveTime<t._mouseMoveTime||(t._curMouseMoveTime=n,t.handleMouseEvent(e))},e.handleMouseEvent=function(t){var n=this,o=egret.sys.$TempStage;n.check(o,t.stageX,t.stageY),n._target&&o.dispatchEventWith(e.EventPreName+t.type,!0,n._target)},e.check=function(e,t,n){if(e!=egret.sys.$TempStage&&(!e.visible||0==e.scaleX||0==e.scaleY))return null;var o=this,a=e.$getInvertedConcatenatedMatrix();if(0==a.a&&0==a.b&&0==a.c&&0==a.d)return null;var r=a.a*t+a.c*n+a.tx,i=a.b*t+a.d*n+a.ty,s=e.$scrollRect?e.$scrollRect:e.$maskRect;if(s&&!s.contains(r,i))return null;if(e.$mask&&!e.$mask.$hitTest(t,n))return null;var c=e.$children;if(c)for(var u=null,p=c.length-1;p>=0;p--){var l=c[p];if(!l.$maskedObject&&(u=o.check(l,t,n)))return o._target=u,u}else if(e.$getContentBounds().contains(r,i))return o._target=e,e;return null},e.EventPreName="egretInspectEvent_",e.enableMouseEvent=!0,e._mouseMoveTime=500,e._curMouseMoveTime=0,e}();t.EgretMouseEvent=n},588:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EgretStageRectMask=void 0;var o=n(303),a=function(){function e(){this._mask=new egret.Sprite,this._rect=new egret.Rectangle,this._tempPoint=new egret.Point,this._mask.name=o.ConstVars.StageMaskName}return e.prototype.showRect=function(e){var t=this;if(t._bindObj&&t._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,t.clear,t),t._bindObj=e,t._bindObj.addEventListener(egret.Event.REMOVED_FROM_STAGE,t.clear,t),e){var n=1,o=1;egret.sys.$TempStage.addChild(t._mask),e!=egret.sys.$TempStage&&(n=e.scaleX,o=e.scaleY),t._tempPoint.x=0,t._tempPoint.y=0,e.localToGlobal(0,0,t._tempPoint),t._rect.x=t._tempPoint.x,t._rect.y=t._tempPoint.y,t._rect.width=Math.max(20,e.width)*n,t._rect.height=Math.max(20,e.height)*o,t._mask.graphics.clear(),t._mask.graphics.lineStyle(1,51200,.9),t._mask.graphics.beginFill(51200,.2),t._mask.graphics.drawRect(t._rect.x,t._rect.y,t._rect.width,t._rect.height),t._mask.graphics.endFill()}else t._mask.parent&&t._mask.parent.removeChild(t._mask)},e.prototype.clear=function(){var e=this;e._bindObj&&e._bindObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,e.clear,e),e._bindObj=null,e._mask.parent&&e._mask.parent.removeChild(e._mask),e._rect.setEmpty()},e}();t.EgretStageRectMask=a},754:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LayaEngineInfo=void 0;var o=n(604),a=n(147),r=function(){function e(){this.name="Laya"}return e.prototype.getParent=function(e){return e.parent},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.visible&&0!=e.alpha},e.prototype.setVisible=function(e,t){e.visible=t,t&&e.alpha<.1&&(e.alpha=1)},e.prototype.setMouseEnable=function(e){o.LayaMouseEvent.enableMouseEvent=e},e.prototype.canUse=function(e){return e&&!e.destroyed},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.haveEngine=function(){return window.Laya&&window.Laya.stage},e.prototype.init=function(){var e=this;e.baseCls=Laya.Sprite,e.stage=Laya.stage,e.version=Laya.version,e._mask=new a.LayaStageRectMask},e.prototype.start=function(e,t){var n=this;o.LayaMouseEvent.start(this),Laya.stage.on(o.LayaMouseEvent.MOUSE_DOWN,this,(function(t){e.call(n,t)})),Laya.stage.on(o.LayaMouseEvent.MOUSE_MOVE,this,(function(e){t.call(n,e)}))},e.prototype.getChildren=function(e){return e._children||e._childs||[]},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.showFPS=function(e){window.Laya.Stat&&(e?window.Laya.Stat.show():window.Laya.Stat.hide())},e}();t.LayaEngineInfo=r},604:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LayaMouseEvent=void 0;var n=function(){function e(){}return e.start=function(t){var n=this;n._engine=t,n._point=new Laya.Point,n._rect=new Laya.Rectangle,n.MOUSE_MOVE=e.EventPreName+Laya.Event.MOUSE_MOVE,n.MOUSE_DOWN=e.EventPreName+Laya.Event.MOUSE_DOWN,Laya.stage.on(Laya.Event.MOUSE_DOWN,n,n.handleMouseDownEvent),Laya.stage.on(Laya.Event.MOUSE_UP,n,n.handleMouseUPEvent),Laya.stage.on(Laya.Event.MOUSE_DOWN,n,n.handleMouseEvent);var o=Laya.TouchManager.prototype,a=o.sendEvents;Object.defineProperties(o,{sendEvents:{value:function(e,t){(n.enableMouseEvent||t!=Laya.Event.CLICK)&&a.call(this,e,t)},enumerable:!0}})},e.handleMouseDownEvent=function(e){var t=this;t._curMouseMoveTime=Date.now(),Laya.stage.on(Laya.Event.MOUSE_MOVE,t,t.handleMouseMove)},e.handleMouseUPEvent=function(e){Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.handleMouseMove)},e.handleMouseMove=function(e){var t=this,n=Date.now();n-t._curMouseMoveTime<t._mouseMoveTime||(t._curMouseMoveTime=n,t.handleMouseEvent(e))},e.handleMouseEvent=function(t){this.check(Laya.stage,Laya.MouseManager.instance.mouseX,Laya.MouseManager.instance.mouseY),Laya.stage.event(e.EventPreName+t.type,this._target)},e.check=function(e,t,n){this._point.setTo(t,n),e.fromParentPoint(this._point),t=this._point.x,n=this._point.y;var o=e._style.scrollRect;if(o&&(this._rect.setTo(o.x,o.y,o.width,o.height),!this._rect.contains(t,n)))return!1;var a=!1;Laya.Label&&e instanceof Laya.Label&&(a=!0),Laya.Button&&e instanceof Laya.Button&&(a=!0),Laya.Image&&e instanceof Laya.Image&&(a=!0),Laya.Text&&e instanceof Laya.Text&&(a=!0);var r=this._engine.getChildren(e);if(!a&&r){for(var i=r.length-1;i>-1;i--){var s=r[i];if(!s.destroyed&&s.visible&&this.check(s,t,n))return!0}if(e._extUIChild)for(i=e._extUIChild.length-1;i>=0;i--){var c=e._extUIChild[i];if(!c.destroyed&&c.visible&&this.check(c,t,n))return!0}}var u=this.hitTest(e,t,n);return u&&(this._target=e),u},e.hitTest=function(e,t,n){var o=!1;e.scrollRect&&(t-=e._style.scrollRect.x,n-=e._style.scrollRect.y);var a=e._style.hitArea;return a&&a._hit?a.contains(t,n):((e.width>0&&e.height>0||e.mouseThrough||a)&&(o=e.mouseThrough?e.getGraphicBounds().contains(t,n):(a||this._rect.setTo(0,0,e.width,e.height)).contains(t,n)),o)},e.EventPreName="layaInspactEvent_",e.enableMouseEvent=!0,e._mouseMoveTime=500,e._curMouseMoveTime=0,e}();t.LayaMouseEvent=n},147:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LayaStageRectMask=void 0;var o=n(303),a=function(){function e(){this._mask=new Laya.Sprite,this._rect=new Laya.Rectangle,this._tempPoint=new Laya.Point,this._mask.name=o.ConstVars.StageMaskName,Laya.version.startsWith("1.")?this._mask.alpha=.3:this._mask.alpha=1}return e.prototype.showRect=function(e){var t=this;t._bindObj&&t._bindObj.off(Laya.Event.UNDISPLAY,t,t.clear),t._bindObj=e,t._bindObj.on(Laya.Event.UNDISPLAY,t,t.clear),e?(Laya.stage.addChild(t._mask),t._tempPoint.x=0,t._tempPoint.y=0,e.localToGlobal(t._tempPoint),t._rect.x=t._tempPoint.x,t._rect.y=t._tempPoint.y,t._rect.width=Math.max(20,e.width)*e.scaleX,t._rect.height=Math.max(20,e.height)*e.scaleY,t._mask.graphics.clear(),t._mask.graphics.drawRect(t._rect.x,t._rect.y,t._rect.width,t._rect.height,"#00C80022","#00C800ee",1)):t._mask.removeSelf()},e.prototype.clear=function(){var e=this;e._bindObj&&e._bindObj.off(Laya.Event.UNDISPLAY,e,e.clear),e._bindObj=null,e._mask.removeSelf()},e}();t.LayaStageRectMask=a},348:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PIXIEngineInfo=void 0;var o=n(786),a=function(){function e(){this.name="PIXI",this._haveInjectApplictionRender=!1,this._clssNameArray=[]}return e.prototype.haveEngine=function(){if(!window.PIXI||!window.PIXI.Application||!window.PIXI.Ticker)return!1;var e=this;if(!e._haveInjectApplictionRender){e._haveInjectApplictionRender=!0;var t=window.PIXI.Ticker.prototype,n=t.update;Object.defineProperty(t,"update",{value:function(){if(!e.stage)for(var t=this._head,o=0;t&&!(++o>=100);){if(t.context&&t.context instanceof window.PIXI.Application){e.stage=t.context.stage;break}t=t.next}n.call(this)},enumerable:!0})}return!!e.stage},e.prototype.init=function(){var e=this;e.version=PIXI.VERSION,e.baseCls=PIXI.DisplayObject,e._mask=new o.PIXIStageRectMask(e);var t=window.PIXI;for(var n in t)e._clssNameArray.push({name:n,class:t[n]})},e.prototype.start=function(e,t){},e.prototype.getClassName=function(e){if("number"==typeof e||"string"==typeof e)return e;for(var t=this,n=0;n<t._clssNameArray.length;n++)if(t._clssNameArray[n].class==e.constructor)return t._clssNameArray[n].name;return e.__class__?e.__class__:e.$owner&&e.$owner.constructor?e.$owner.constructor.name:e.__classname__?e.__classname__:e._className?e._className:e.constructor&&e.constructor.name?e.constructor.name:typeof e},e.prototype.getChildren=function(e){return e.children?e.children:[]},e.prototype.getParent=function(e){return e.parent},e.prototype.drawMask=function(e){this._mask&&this._mask.showRect(e)},e.prototype.clearMask=function(){this._mask&&this._mask.clear()},e.prototype.canUse=function(e){return!!e},e.prototype.getObjName=function(e){return e.name},e.prototype.getVisible=function(e){return e.visible},e.prototype.setMouseEnable=function(e){},e.prototype.setVisible=function(e,t){e.visible=t,t&&0==e.alpha&&(e.alpha=1)},e.prototype.showFPS=function(e){},e}();t.PIXIEngineInfo=a},786:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PIXIStageRectMask=void 0;var o=n(303),a=function(){function e(e){this._engine=e,this._mask=new PIXI.Graphics,this._tempPoint=new PIXI.Point,this._mask.name=o.ConstVars.StageMaskName}return e.prototype.showRect=function(e){var t=this;if(t._bindObj,t._bindObj=e,e){t._engine.stage.addChild(t._mask),t._tempPoint.x=0,t._tempPoint.y=0;var n=e.toGlobal(t._tempPoint),o=e.getLocalBounds(),a=e.scale,r=Math.max(20,a.x*o.width),i=Math.max(20,a.y*o.width),s=0,c=0,u=e.anchor;u&&(s=u.x,c=u.y),t._mask.clear(),t._mask.beginFill(51200,.3),t._mask.lineStyle(1,51200,.5),t._mask.drawRect(n.x-r*s,n.y-r*c,r,i),t._mask.endFill()}else t._mask.parent&&t._mask.parent.removeChild(t._mask)},e.prototype.clear=function(){var e=this;e._bindObj=null,e._mask.parent&&e._mask.parent.removeChild(e._mask)},e}();t.PIXIStageRectMask=a}},r={};function i(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return a[e].call(n.exports,n,n.exports,i),n.exports}e=i(222),t=i(938),n=i(650),o=i(303),new(function(){function a(){this._uid2Obj={},this._treeSetting={hightLightClick:!1,hightlightHover:!1,preEventTouch:!1,showPrivate:!1,showFunction:!1,showFPS:!0},this.init()}return a.prototype.init=function(){var o=this;o.msg=e.Message.getMessage("Stage",o.handleRecvMessage,o),t.EngineManager.init();var a=setInterval((function(){o.checkCostomEngine(),o._engine=t.EngineManager.check(),o._engine&&(clearInterval(a),o._engine.init(),Object.defineProperties(o._engine.baseCls.prototype,{devUUID:{get:function(){var e=this.$_DevUUID;return e||(e=this.$_DevUUID=n.Utils.getUID(),o._uid2Obj[e]=this),e},enumerable:!1}}),o._engine.start((function(e){e&&o.showClickObj(e,o._treeSetting.hightLightClick)}),(function(e){if(e&&o._treeSetting.hightlightHover){if(o._lastMoveObj==e)return;o._lastMoveObj=e,o.showClickObj(e,o._treeSetting.hightlightHover)}})),o._gameInfo={name:window.document.title,engin:o._engine.name,version:o._engine.version},o.msg.post("treeSetingReq"),o.msg.post("gameInfoResponse",o._gameInfo),o.handleInitStage())}),1e3)},a.prototype.checkCostomEngine=function(){var e=this;if(!e._customEngine&&window.getGameInspectUserCostomEngine&&(e._customEngine=window.getGameInspectUserCostomEngine(),e._customEngine&&e._customEngine.engine)){var n=e._customEngine.engine;if(Array.isArray(n))for(var o=0;o<n.length;o++)t.EngineManager.register(n[o]);else t.EngineManager.register(n)}},a.prototype.showClickObj=function(e,n){for(var o,a=this,r=e;r;){var i=t.EngineManager.getTreeNode(a._engine,r),s=a._engine.getChildren(r),c=[];if(s)for(var u=0;u<s.length;u++)o&&o.uid==s[u].devUUID?c.push(o):c.push(t.EngineManager.getTreeNode(a._engine,s[u]));i.updateChild(c,!1),(o=i).show=!0,o.updateIcon(),r=a._engine.getParent(r)}a.msg.post("initStageDataResponse",o),a._engine&&(n&&a._engine.drawMask(e),a.msg.post("selectNode",e.devUUID)),a.msg.post("propDataResponse",{uid:e.devUUID,props:t.EngineManager.getPropNodes(a._engine,e,a._treeSetting.showPrivate,a._treeSetting.showFunction)})},a.prototype.handleInitStage=function(){var e=this,n=t.EngineManager.getTreeNode(e._engine,e._engine.stage);e.msg.post("initStageDataResponse",n)},a.prototype.handleRecvMessage=function(e){var a=this;if(a._engine){if("expandTreeReq"==e.type){var r=a._uid2Obj[e.data];if(a._engine.canUse(r)){var i=[],s=a._engine.getChildren(r);if(s)for(var c=0;c<s.length;c++)i.push(t.EngineManager.getTreeNode(a._engine,s[c]));a.msg.post("expandTreeResponse",{uid:r.devUUID,children:i})}}else if("initStageDataReq"==e.type)a.handleInitStage();else if("propChangeReq"==e.type){var u=e.data.data,p=(r=a._uid2Obj[e.data.uid],e.data.propPath);if(a._engine.canUse(r)){var l=r,g=void 0;if(p){var h=p.split(".");for(c=0;c<h.length;c++)if(c==h.length-1)l[h[c]]=u,g=l[h[c]],a.msg.post("propChangeResponse",{uid:r.devUUID,propPath:p,data:n.Utils.stringifyValue(g)});else if(!(l=l[h[c]]))return}}}else if("showRectInStageReq"==e.type)r=a._uid2Obj[e.data],a._engine.canUse(r)&&(a._engine.drawMask(r),a.msg.post("selectNode",r.devUUID));else if("propDataReq"==e.type)r=a._uid2Obj[e.data],a._engine.canUse(r)&&a.msg.post("propDataResponse",{uid:r.devUUID,props:t.EngineManager.getPropNodes(a._engine,r,a._treeSetting.showPrivate,a._treeSetting.showFunction)});else if("treeSettingInfo"==e.type){var d=e.data;for(var _ in d)a._treeSetting[_]=d[_];0!=d.hightLightClick&&0!=d.hightlightHover||a._engine&&a._engine.clearMask(),0==d.hightlightHover&&(a._lastMoveObj=null),null!=d.showFPS&&a._engine.showFPS(a._treeSetting.showFPS),a._engine.setMouseEnable(!d.preEventTouch)}else if("expandPropReq"==e.type){if(d=e.data,r=a._uid2Obj[d.uid],a._engine.canUse(r)){for(p=d.prop.split("."),l=r,c=0;c<p.length;c++)if(!(l=l[p[c]]))return;a.msg.post("expandPropResponse",{uid:r.devUUID,prop:d.prop,data:t.EngineManager.getPropNodes(a._engine,l,a._treeSetting.showPrivate,a._treeSetting.showFunction)})}}else if("visibleChangeReq"==e.type)d=e.data,r=a._uid2Obj[d.uid],a._engine.canUse(r)&&(a._engine.setVisible(r,d.data),a.msg.post("propDataResponse",{uid:r.devUUID,props:t.EngineManager.getPropNodes(a._engine,r,a._treeSetting.showPrivate,a._treeSetting.showFunction)}));else if("gameInfoReq"==e.type)a._gameInfo&&a.msg.post("gameInfoResponse",a._gameInfo);else if("showTreeNodeInConsoleReq"==e.type)if(r=a._uid2Obj[e.data],a._engine.canUse(r))if(a._customEngine&&a._customEngine.printVar)a._customEngine.printVar(r);else{var f="gameInspectNode"+e.data;n.Utils.log("临时变量名",f),console.log(r),window[f]=r}else o.ConstVars.DEBUG&&console.log("没有找到节点： "+e.data);else if("inspectClassDefinedReq"==e.type)if(r=a._uid2Obj[e.data],a._engine.canUse(r)){var v="gameInspectClassFun"+e.data,m=r.constructor;a._customEngine&&a._customEngine.getClassFun&&(m=a._customEngine.getClassFun(r)),m&&(window[v]=m,a.msg.post("inspectCodeResponse",{name:v,url:location.href}))}else o.ConstVars.DEBUG&&console.log("没有找到节点： "+e.data);else"inspectVarDefinedReq"==e.type?(r=a._uid2Obj[e.data],a._engine.canUse(r)?(v="gameInspectVarFun"+e.data,(m=a.getVarLocationFun(r))?(window[v]=m,a.msg.post("inspectCodeResponse",{name:v,url:location.href})):(n.Utils.error("没有找到对应的变量声明"),alert("未找到变量声明的地方"))):o.ConstVars.DEBUG&&console.log("没有找到节点： "+e.data)):"showTreeNodePathReq"==e.type&&(r=a._uid2Obj[e.data],a._engine.canUse(r)&&a.printNodePath(r));o.ConstVars.DEBUG&&console.log(" Inspection  接受到消息： ",e)}},a.prototype.getVarLocationFun=function(e){var t=this;if(e){var o;if(t._customEngine&&t._customEngine.getVarLocationFun)o=t._customEngine.getVarLocationFun(e);else for(var a=e.parent;a;){var r=Object.keys(a);for(var i in r){var s=r[i];if(a[s]==e){o=a.constructor,n.Utils.log("对应变量： ".concat(s));break}}a=a.parent}return o}},a.prototype.printNodePath=function(e){var t=this;if(e)if(t._customEngine&&t._customEngine.printNodePath)t._customEngine.printNodePath(e);else{for(var o="",a=void 0,r=e;r;){a=r.parent;for(var i=void 0;a;){var s=Object.keys(a);for(var c in s){var u=s[c];if(a[u]==r){i=u,r=a;break}}if(i)break;a=a.parent}i?o=i+(o?"."+o:""):(i||(i=t._engine.getObjName(r)),!i&&r.parent&&-1!=(c=t._engine.getChildren(r.parent).indexOf(r))&&(i=c+""),i&&(o=i+(o?"."+o:"")),r.parent||(o=t._engine.getClassName(r)+(o?"."+o:"")),r=r.parent)}n.Utils.log("对应变量： "+o)}},a}())})();