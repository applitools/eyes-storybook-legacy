/* eslint-disable */
/*
* EventSource polyfill version 0.9.7
* https://github.com/amvtek/EventSource/blob/master/dist/eventsource.min.js
 */
!function(a){function b(a,b,c,d){this.bubbles=!1,this.cancelBubble=!1,this.cancelable=!1,this.data=b||null,this.origin=c||"",this.lastEventId=d||"",this.type=a||"message"}function c(){return window.XDomainRequest&&window.XMLHttpRequest&&void 0===(new XMLHttpRequest).responseType?!0:!1}if(!a.EventSource||a._eventSourceImportPrefix){var d=(a._eventSourceImportPrefix||"")+"EventSource",e=function(a,b){if(!a||"string"!=typeof a)throw new SyntaxError("Not enough arguments");this.URL=a,this.setOptions(b);var c=this;setTimeout(function(){c.poll()},0)};if(e.prototype={CONNECTING:0,OPEN:1,CLOSED:2,defaultOptions:{loggingEnabled:!1,loggingPrefix:"eventsource",interval:500,bufferSizeLimit:262144,silentTimeout:3e5,getArgs:{evs_buffer_size_limit:262144},xhrHeaders:{Accept:"text/event-stream","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"}},setOptions:function(a){var b,c=this.defaultOptions;for(b in c)c.hasOwnProperty(b)&&(this[b]=c[b]);for(b in a)b in c&&a.hasOwnProperty(b)&&(this[b]=a[b]);this.getArgs&&this.bufferSizeLimit&&(this.getArgs.evs_buffer_size_limit=this.bufferSizeLimit),("undefined"==typeof console||"undefined"==typeof console.log)&&(this.loggingEnabled=!1)},log:function(a){this.loggingEnabled&&console.log("["+this.loggingPrefix+"]:"+a)},poll:function(){try{if(this.readyState==this.CLOSED)return;this.cleanup(),this.readyState=this.CONNECTING,this.cursor=0,this.cache="",this._xhr=new this.XHR(this),this.resetNoActivityTimer()}catch(a){this.log("There were errors inside the pool try-catch"),this.dispatchEvent("error",{type:"error",data:a.message})}},pollAgain:function(a){var b=this;b.readyState=b.CONNECTING,b.dispatchEvent("error",{type:"error",data:"Reconnecting "}),this._pollTimer=setTimeout(function(){b.poll()},a||0)},cleanup:function(){this.log("evs cleaning up"),this._pollTimer&&(clearInterval(this._pollTimer),this._pollTimer=null),this._noActivityTimer&&(clearInterval(this._noActivityTimer),this._noActivityTimer=null),this._xhr&&(this._xhr.abort(),this._xhr=null)},resetNoActivityTimer:function(){if(this.silentTimeout){this._noActivityTimer&&clearInterval(this._noActivityTimer);var a=this;this._noActivityTimer=setTimeout(function(){a.log("Timeout! silentTImeout:"+a.silentTimeout),a.pollAgain()},this.silentTimeout)}},close:function(){this.readyState=this.CLOSED,this.log("Closing connection. readyState: "+this.readyState),this.cleanup()},_onxhrdata:function(){var a=this._xhr;if(a.isReady()&&!a.hasError()){this.resetNoActivityTimer(),this.readyState==this.CONNECTING&&(this.readyState=this.OPEN,this.dispatchEvent("open",{type:"open"}));var b=a.getBuffer();b.length>this.bufferSizeLimit&&(this.log("buffer.length > this.bufferSizeLimit"),this.pollAgain()),0==this.cursor&&b.length>0&&"﻿"==b.substring(0,1)&&(this.cursor=1);var c=this.lastMessageIndex(b);if(c[0]>=this.cursor){var d=c[1],e=b.substring(this.cursor,d);this.parseStream(e),this.cursor=d}a.isDone()&&(this.log("request.isDone(). reopening the connection"),this.pollAgain(this.interval))}else this.readyState!==this.CLOSED&&(this.log("this.readyState !== this.CLOSED"),this.pollAgain(this.interval))},parseStream:function(a){a=this.cache+this.normalizeToLF(a);var c,d,e,f,g,h,i=a.split("\n\n");for(c=0;c<i.length-1;c++){for(e="message",f=[],parts=i[c].split("\n"),d=0;d<parts.length;d++)g=this.trimWhiteSpace(parts[d]),0==g.indexOf("event")?e=g.replace(/event:?\s*/,""):0==g.indexOf("retry")?(h=parseInt(g.replace(/retry:?\s*/,"")),isNaN(h)||(this.interval=h)):0==g.indexOf("data")?f.push(g.replace(/data:?\s*/,"")):0==g.indexOf("id:")?this.lastEventId=g.replace(/id:?\s*/,""):0==g.indexOf("id")&&(this.lastEventId=null);if(f.length){var j=new b(e,f.join("\n"),window.location.origin,this.lastEventId);this.dispatchEvent(e,j)}}this.cache=i[i.length-1]},dispatchEvent:function(a,b){var c=this["_"+a+"Handlers"];if(c)for(var d=0;d<c.length;d++)c[d].call(this,b);this["on"+a]&&this["on"+a].call(this,b)},addEventListener:function(a,b){this["_"+a+"Handlers"]||(this["_"+a+"Handlers"]=[]),this["_"+a+"Handlers"].push(b)},removeEventListener:function(a,b){var c=this["_"+a+"Handlers"];if(c)for(var d=c.length-1;d>=0;--d)if(c[d]===b){c.splice(d,1);break}},_pollTimer:null,_noactivityTimer:null,_xhr:null,lastEventId:null,cache:"",cursor:0,onerror:null,onmessage:null,onopen:null,readyState:0,urlWithParams:function(a,b){var c=[];if(b){var d,e,f=encodeURIComponent;for(d in b)b.hasOwnProperty(d)&&(e=f(d)+"="+f(b[d]),c.push(e))}return c.length>0?-1==a.indexOf("?")?a+"?"+c.join("&"):a+"&"+c.join("&"):a},lastMessageIndex:function(a){var b=a.lastIndexOf("\n\n"),c=a.lastIndexOf("\r\r"),d=a.lastIndexOf("\r\n\r\n");return d>Math.max(b,c)?[d,d+4]:[Math.max(b,c),Math.max(b,c)+2]},trimWhiteSpace:function(a){var b=/^(\s|\u00A0)+|(\s|\u00A0)+$/g;return a.replace(b,"")},normalizeToLF:function(a){return a.replace(/\r\n|\r/g,"\n")}},c()){e.isPolyfill="IE_8-9";var f=e.prototype.defaultOptions;f.xhrHeaders=null,f.getArgs.evs_preamble=2056,e.prototype.XHR=function(a){request=new XDomainRequest,this._request=request,request.onprogress=function(){request._ready=!0,a._onxhrdata()},request.onload=function(){this._loaded=!0,a._onxhrdata()},request.onerror=function(){this._failed=!0,a.readyState=a.CLOSED,a.dispatchEvent("error",{type:"error",data:"XDomainRequest error"})},request.ontimeout=function(){this._failed=!0,a.readyState=a.CLOSED,a.dispatchEvent("error",{type:"error",data:"XDomainRequest timed out"})};var b={};if(a.getArgs){var c=a.getArgs;for(var d in c)c.hasOwnProperty(d)&&(b[d]=c[d]);a.lastEventId&&(b.evs_last_event_id=a.lastEventId)}request.open("GET",a.urlWithParams(a.URL,b)),request.send()},e.prototype.XHR.prototype={useXDomainRequest:!0,_request:null,_ready:!1,_loaded:!1,_failed:!1,isReady:function(){return this._request._ready},isDone:function(){return this._request._loaded},hasError:function(){return this._request._failed},getBuffer:function(){var a="";try{a=this._request.responseText||""}catch(b){}return a},abort:function(){this._request&&this._request.abort()}}}else e.isPolyfill="XHR",e.prototype.XHR=function(a){request=new XMLHttpRequest,this._request=request,a._xhr=this,request.onreadystatechange=function(){request.readyState>1&&a.readyState!=a.CLOSED&&(200==request.status||request.status>=300&&request.status<400?a._onxhrdata():(request._failed=!0,a.readyState=a.CLOSED,a.dispatchEvent("error",{type:"error",data:"The server responded with "+request.status}),a.close()))},request.onprogress=function(){},request.open("GET",a.urlWithParams(a.URL,a.getArgs),!0);var b=a.xhrHeaders;for(var c in b)b.hasOwnProperty(c)&&request.setRequestHeader(c,b[c]);a.lastEventId&&request.setRequestHeader("Last-Event-Id",a.lastEventId),request.send()},e.prototype.XHR.prototype={useXDomainRequest:!1,_request:null,_failed:!1,isReady:function(){return this._request.readyState>=2},isDone:function(){return 4==this._request.readyState},hasError:function(){return this._failed||this._request.status>=400},getBuffer:function(){var a="";try{a=this._request.responseText||""}catch(b){}return a},abort:function(){this._request&&this._request.abort()}};a[d]=e}}(window);
