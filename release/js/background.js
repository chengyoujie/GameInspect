(()=>{var e,n;e={},n={},chrome.runtime.onConnect.addListener((function(o){console.log("on Connnect "+o.name,o);var a,r,t="DevPanel",i="contentChrome",c=0;if(0==o.name.indexOf(t))a=e,r=n,c=+o.name.replace(t,"");else{if(0!=o.name.indexOf(i))return void console.log("不是 合法的prot.name"+o.name);a=n,r=e,c=o.sender.tab.id}a[o.name]=o,o.onMessage.addListener((function(e,n){for(var o in console.log("Background 接收到 onConnect 消息： ",e,n),r){var a=r[o],d=0;0==a.name.indexOf(t)?d=+a.name.replace(t,""):0==a.name.indexOf(i)&&(d=a.sender.tab.id),d==c&&a.postMessage(e)}})),o.onDisconnect.addListener((function(){console.log("断开链接： "+o.name),delete a[o.name]}))}))})();