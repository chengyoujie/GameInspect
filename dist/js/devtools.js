chrome.devtools.panels.create("GameInspect","icon.png","gameInspect.html",(function(e){e.onShown.addListener((function(e){chrome.runtime.sendMessage({type:"devPanelStateChange",data:{isShow:!0,tabId:chrome.devtools.inspectedWindow.tabId},from:"DevPanel"})})),e.onHidden.addListener((function(){chrome.runtime.sendMessage({type:"devPanelStateChange",data:{isShow:!1,tabId:chrome.devtools.inspectedWindow.tabId},from:"DevPanel"})}))}));
//# sourceMappingURL=devtools.js.map