(()=>{var e,r,n,t={9475:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ConstVars=void 0;var n=function(){function e(){}return e.VERSIONURL="https://github.com/chengyoujie/GameInspect/releases/download/release",e.VERSIONINFOURL="https://chengyoujie.github.io/GameInspect/version/version.txt",e.StageMaskName="$GAME_INSPECT_MASK",e.BUGURL="https://github.com/chengyoujie/GameInspect/issues",e.GitHubURL="https://github.com/chengyoujie/GameInspect",e.TongJiURL="https://hm.baidu.com/hm.js?616b91f08c766f10bb08e53dab9823fe",e.QQ="613279506",e.HEARTBEAT=5e3,e.WINDOW_RELOAD_TAG="$gameInspectHasReload",e.WINDOW_INJECT_RELOAD_CODE="$gameInspectReloadCode",e.WINDOW_HAS_FIND_ENGINE="$gameInspectHasFindEngine",e.ENGINE_MANAGER_PROP_NAME="$gameInspectEngineManager",e.DEBUG=!1,e.DEV=!1,e.$GAMEURL="#GAMEURL#",e.$SITEURL="#SITEURL#",e.$EngineName="#ENGINENAME#",e.$VarGameURL="$gameURL",e.$VarSiteURL="$siteURL",e.$VarEngineName="$engineName",e.$SCRITP_NAMES="gameInsectScriptNames",e.SPECIAL_NAME_START="{",e.SPECIAL_NAME_END="}",e}();r.ConstVars=n},8701:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.WebGLUtils=void 0;var n=function(){function e(){}return e.createProgramUUID=function(){var e=this;return window[e.PROGRAM_ID_CREAT_PROP_NAME]||(window[e.PROGRAM_ID_CREAT_PROP_NAME]=0),window[e.PROGRAM_ID_CREAT_PROP_NAME]++,window[e.PROGRAM_ID_CREAT_PROP_NAME]},e.getProgramId=function(e,r){var n=this;if(!r)return 0;var t=r[n.ProgramIdPropName];return t||(t=n.createProgramUUID(),r[n.ProgramIdPropName]=t,window[n.PROGRAM_DATA_PROP_NAME]||(window[n.PROGRAM_DATA_PROP_NAME]={}),window[n.PROGRAM_DATA_PROP_NAME][t]={program:r,webgl:e}),t},e.getProgramData=function(e){return window[this.PROGRAM_DATA_PROP_NAME]?window[this.PROGRAM_DATA_PROP_NAME][e]:null},e.setCurrentProgram=function(e,r){var n=this;return window[n.CURRENT_PROGRAM_PROP_NAME]=n.getProgramId(e,r),window[n.CURRENT_PROGRAM_PROP_NAME]},e.getCurrentProgramId=function(e){var r=this;if(!window[r.CURRENT_PROGRAM_PROP_NAME]){var n=e.getParameter(e.CURRENT_PROGRAM);window[r.CURRENT_PROGRAM_PROP_NAME]=n?r.getProgramId(n,e):0}return window[r.CURRENT_PROGRAM_PROP_NAME]},e.saveShaderVarInfo=function(e,r,n,t,a){var o=window[this.LOCATION_INFO_PROP_NAME];o||(o=window[this.LOCATION_INFO_PROP_NAME]={}),o[e]||(o[e]={});var i={type:r,funName:t,name:n,value:a};o[e][n]=i},e.getShaderVarInfo=function(e,r){var n=window[this.LOCATION_INFO_PROP_NAME];return n&&n[e]?n[e][r]:null},e.getShaderVars=function(e){var r=window[this.LOCATION_INFO_PROP_NAME];return r?r[e]:null},e.initLocation=function(e,r,n){r&&(r[this.LocationNameProp]=n)},e.getLocationName=function(e){if(e)return e[this.LocationNameProp]},e.saveProgramCode=function(e,r,n){var t=this,a=t.getProgramId(e,r),o=window[t.PROGRAM_SHADER_CODE_PROP_NAME];o||(o=window[t.PROGRAM_SHADER_CODE_PROP_NAME]={});var i=o[a];i||(i=o[a]={programId:a});var R=e.getShaderParameter(n,e.SHADER_TYPE);return R==e.VERTEX_SHADER?i.vert=e.getShaderSource(n):R==e.FRAGMENT_SHADER&&(i.frag=e.getShaderSource(n)),i},e.getAllProgramCode=function(){return window[this.PROGRAM_SHADER_CODE_PROP_NAME]},e.getProgramCode=function(e){return window[this.PROGRAM_SHADER_CODE_PROP_NAME]?window[this.PROGRAM_SHADER_CODE_PROP_NAME][e]:null},e.isEqualShader=function(e,r){return(e=e.replace(/\r/gi,""))==r.replace(/\r/gi,"")},e.WEBGL_DRAW_CMDS=["drawArrays","drawElements","drawArraysInstanced","drawArraysInstancedANGLE","drawElementsInstanced","drawElementsInstancedANGLE","drawRangeElements","multiDrawArraysInstancedBaseInstanceWEBGL","multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL"],e.WEBGL_UNIFORM_CMDS=["uniform1f","uniform1fv","uniform1i","uniform1iv","uniform2f","uniform2fv","uniform2i","uniform2iv","uniform3f","uniform3fv","uniform3i","uniform3iv","uniform4f","uniform4fv","uniform4i","uniform4iv","uniformMatrix2fv","uniformMatrix3fv","uniformMatrix4fv"],e.PROGRAM_ID_CREAT_PROP_NAME="$gameInspectProgramCreateId",e.CURRENT_PROGRAM_PROP_NAME="$gameInspectCurrentProgramId",e.PROGRAM_DATA_PROP_NAME="$gameInspectProgramData",e.ProgramIdPropName="$gameInspectProgramId",e.LocationNameProp="$gameInspcetLocationName",e.LOCATION_INFO_PROP_NAME="$gameInspectLocationInfo",e.PROGRAM_SHADER_CODE_PROP_NAME="$gameInspectProgramCode",e}();r.WebGLUtils=n}},a={};function o(e){var r=a[e];if(void 0!==r)return r.exports;var n=a[e]={exports:{}};return t[e](n,n.exports,o),n.exports}e=o(9475),r=o(8701),n=function(){function e(){this.initProxy()}return e.prototype.initProxy=function(){for(var e=[WebGL2RenderingContext.prototype,WebGLRenderingContext.prototype],n=function(n){var t=e[n],a="createProgram",o=t[a];o&&Object.defineProperty(t,a,{value:function(){var e=o.apply(this,arguments);return r.WebGLUtils.getProgramId(this,e),e}});var i="attachShader",R=t[i];R&&Object.defineProperty(t,i,{value:function(){var e=this,n=arguments[0],t=arguments[1];return r.WebGLUtils.saveProgramCode(e,n,t),R.apply(this,arguments)}});var _="useProgram",P=t[_];P&&Object.defineProperty(t,_,{value:function(){var e=arguments[0];return r.WebGLUtils.setCurrentProgram(this,e),P.apply(this,arguments)}});var s="getUniformLocation",E=t[s];E&&Object.defineProperty(t,s,{value:function(){var e=arguments[0],n=arguments[1],t=E.apply(this,arguments),a=r.WebGLUtils.getProgramId(this,e);return r.WebGLUtils.initLocation(a,t,n),t}});for(var A=r.WebGLUtils.WEBGL_UNIFORM_CMDS,u=function(e){var n=A[e],a=t[n];if(!a)return"continue";Object.defineProperty(t,n,{value:function(){for(var e=this,t=arguments[0],o=r.WebGLUtils.getCurrentProgramId(e),i=r.WebGLUtils.getLocationName(t),R=[],_=1;_<arguments.length;_++)R.push(arguments[_]);r.WebGLUtils.saveShaderVarInfo(o,2,i,n,R);var P=a.apply(this,arguments);return P}})},O=0;O<A.length;O++)u(O)},t=0;t<e.length;t++)n(t)},e}(),window.hasOwnProperty(e.ConstVars.WINDOW_INJECT_RELOAD_CODE)&&window[e.ConstVars.WINDOW_INJECT_RELOAD_CODE]||(window[e.ConstVars.WINDOW_INJECT_RELOAD_CODE]=!0,new n)})();