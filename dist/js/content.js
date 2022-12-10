(()=>{var e,t,n={8786:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseMessage=void 0;var n=function(){function e(e,t,n,o){this._from=e,this._name=o||this._from,this._thisObj=n,this._onMessage=t,this.init(),this.initListener()}return e.prototype.init=function(){},e.prototype.initListener=function(){},e}();t.BaseMessage=n},4347:function(e,t,n){var o,s=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.ChromeConnectMessage=void 0;var r=n(8786),i=n(9475),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s(t,e),t.prototype.init=function(){},t.prototype.initListener=function(){var e=this;if(chrome&&chrome.runtime)try{e._prot=chrome.runtime.connect({name:e._name}),e._prot.onMessage.addListener((function(t,n){i.ConstVars.DEBUG&&console.log("==== Chrome Message 收到消息",t),t.data&&t.data.from==e._from||e._onMessage.call(e._thisObj,t)}))}catch(e){console.log("Game Inspect 链接失败",e)}},t.prototype.post=function(e,t){var n=this;if(n._prot){var o,s=!1;o="string"==typeof e?{from:this._from,name:this._name,type:e,data:t}:e;try{n._prot.postMessage(o)}catch(e){s=!0}s&&(n.initListener(),n._prot.postMessage(o))}},t}(r.BaseMessage);t.ChromeConnectMessage=a},9475:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ConstVars=void 0;var n=function(){function e(){}return e.HOMEURL="http://172.18.2.153:9898/myProgream/GameInspect",e.ReleaseURL="https://github.com/chengyoujie/GameInspect/releases/download/release",e.VERSIONURL=e.ReleaseURL,e.VERSIONINFOURL=e.HOMEURL+"/version/version.txt",e.StageMaskName="$GAME_INSPECT_MASK",e.BUGURL="https://github.com/chengyoujie/GameInspect/issues",e.GitHubURL="https://github.com/chengyoujie/GameInspect",e.QQ="613279506",e.HEARTBEAT=5e3,e.DEBUG=!1,e.DEV=!1,e.$GAMEURL="#GAMEURL#",e.$SITEURL="#SITEURL#",e.$EngineName="#ENGINENAME#",e.$VarGameURL="$gameVar",e.$VarSiteURL="$siteURL",e.$VarEngineName="$engineName",e.$SCRITP_NAMES="gameInsectScriptNames",e}();t.ConstVars=n},8946:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Message=void 0;var o=n(4347),s=n(2951),r=function(){function e(){}return e.getMessage=function(e,t,n,o){return new(this.getMessageClsByType(e))(e,t,n,o)},e.getMessageClsByType=function(e){switch(e){case"DevPanel":case"contentChrome":case"background":return o.ChromeConnectMessage;case"Stage":case"contentWindow":return s.WindowMessage}},e}();t.Message=r},2951:function(e,t,n){var o,s=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.WindowMessage=void 0;var r=n(8786),i=n(9475),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s(t,e),t.prototype.initListener=function(){var e=this;window.addEventListener("message",(function(t){t.data&&t.data.from==e._from||(i.ConstVars.DEBUG&&console.log(e._from+"收到消息",t),null!=e._onMessage&&e._onMessage.call(e._thisObj,t.data))}))},t.prototype.post=function(e,t){var n;n="string"==typeof e?{from:this._from,name:this._name,type:e,data:t}:e,window.postMessage(n,"*")},t}(r.BaseMessage);t.WindowMessage=a}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={exports:{}};return n[e].call(r.exports,r,r.exports,s),r.exports}e=s(9475),t=s(8946),(new(function(){function n(){}return n.prototype.start=function(){var e=this;n.UUID++,e.winMsg=t.Message.getMessage("contentWindow",e.handleRecvWindowMessage,e),e.chromeMsg=t.Message.getMessage("contentChrome",e.handleRecvChromeMessage,e,"contentChrome"+n.UUID+Date.now()+Math.floor(1e6*Math.random())),window.setTimeout((function(){e.injectJSCode()}),200)},n.prototype.handleRecvWindowMessage=function(t){e.ConstVars.DEBUG&&console.log("Content_Win 收到 message",t),t.type&&this.chromeMsg.post(t)},n.prototype.handleRecvChromeMessage=function(t){e.ConstVars.DEBUG&&console.log("Content_Chrome 收到 message",t),t.type&&this.winMsg.post(t)},n.prototype.addScript=function(e,t){var n=document.getElementById(t);n&&document.head.removeChild(n);var o=document.createElement("script");o.innerHTML=e,o.id=t,document.head.appendChild(o)},n.prototype.addScriptByUrl=function(e){var t=this;chrome&&chrome.runtime&&(e=chrome.runtime.getURL(e));var n=document.createElement("script");n.src=e,n.async=!0,n.onload=function(){t.checkCode()},document.head.appendChild(n)},n.prototype.injectJSCode=function(){this.addScriptByUrl("js/inspector.js")},n.prototype.checkCode=function(){var t=this;chrome.storage.local.get(e.ConstVars.$SCRITP_NAMES).then((function(n){if(n&&n[e.ConstVars.$SCRITP_NAMES]){var o=n[e.ConstVars.$SCRITP_NAMES];o&&t.winMsg.post("initUserCode",o)}}))},n.UUID=0,n}())).start()})();