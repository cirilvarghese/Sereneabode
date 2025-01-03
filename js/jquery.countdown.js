!function(i){var e="countdown",t=0,s=1,n=2,o=3,r=4,a=5,l=6;i.JQPlugin.createPlugin({name:e,defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1}},_getters:["getTimes"],_rtlClass:e+"-rtl",_sectionClass:e+"-section",_amountClass:e+"-amount",_periodClass:e+"-period",_rowClass:e+"-row",_holdingClass:e+"-holding",_showClass:e+"-show",_descrClass:e+"-descr",_timerElems:[],_init:function(){var e=this;this._super(),this._serverSyncs=[];var t="function"==typeof Date.now?Date.now:function(){return new Date().getTime()},s=window.performance&&"function"==typeof window.performance.now;function n(i){var a=i<1e12?s?performance.now()+performance.timing.navigationStart:t():i||t();a-r>=1e3&&(e._updateElems(),r=a),o(n)}var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,r=0;!o||i.noRequestAnimationFrame?(i.noRequestAnimationFrame=null,setInterval(function(){e._updateElems()},980)):(r=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||t(),o(n))},UTCDate:function(i,e,t,s,n,o,r,a){"object"==typeof e&&e.constructor==Date&&(a=e.getMilliseconds(),r=e.getSeconds(),o=e.getMinutes(),n=e.getHours(),s=e.getDate(),t=e.getMonth(),e=e.getFullYear());var l=new Date;return l.setUTCFullYear(e),l.setUTCDate(1),l.setUTCMonth(t||0),l.setUTCDate(s||1),l.setUTCHours(n||0),l.setUTCMinutes((o||0)-(30>Math.abs(i)?60*i:i)),l.setUTCSeconds(r||0),l.setUTCMilliseconds(a||0),l},periodsToSeconds:function(i){return 31557600*i[0]+2629800*i[1]+604800*i[2]+86400*i[3]+3600*i[4]+60*i[5]+i[6]},_instSettings:function(i,e){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(i){this._hasElem(i)||this._timerElems.push(i)},_hasElem:function(e){return i.inArray(e,this._timerElems)>-1},_removeElem:function(e){this._timerElems=i.map(this._timerElems,function(i){return i==e?null:i})},_updateElems:function(){for(var i=this._timerElems.length-1;i>=0;i--)this._updateCountdown(this._timerElems[i])},_optionsChanged:function(e,t,s){s.layout&&(s.layout=s.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(t.options,s);var n=t.options.timezone!=s.timezone;i.extend(t.options,s),this._adjustSettings(e,t,null!=s.until||null!=s.since||n);var o=new Date;(t._since&&t._since<o||t._until&&t._until>o)&&this._addElem(e[0]),this._updateCountdown(e,t)},_updateCountdown:function(e,t){if(e=e.jquery?e:i(e),t=t||this._getInst(e)){if(e.html(this._generateHTML(t)).toggleClass(this._rtlClass,t.options.isRTL),i.isFunction(t.options.onTick)){var s="lap"!=t._hold?t._periods:this._calculatePeriods(t,t._show,t.options.significant,new Date);(1==t.options.tickInterval||this.periodsToSeconds(s)%t.options.tickInterval==0)&&t.options.onTick.apply(e[0],[s])}if("pause"!=t._hold&&(t._since?t._now.getTime()<t._since.getTime():t._now.getTime()>=t._until.getTime())&&!t._expiring){if(t._expiring=!0,this._hasElem(e[0])||t.options.alwaysExpire){if(this._removeElem(e[0]),i.isFunction(t.options.onExpiry)&&t.options.onExpiry.apply(e[0],[]),t.options.expiryText){var n=t.options.layout;t.options.layout=t.options.expiryText,this._updateCountdown(e[0],t),t.options.layout=n}t.options.expiryUrl&&(window.location=t.options.expiryUrl)}t._expiring=!1}else"pause"==t._hold&&this._removeElem(e[0])}},_resetExtraLabels:function(i,e){for(var t in e)t.match(/[Ll]abels[02-9]|compactLabels1/)&&(i[t]=e[t]);for(var t in i)t.match(/[Ll]abels[02-9]|compactLabels1/)&&void 0===e[t]&&(i[t]=null)},_adjustSettings:function(e,t,s){for(var n,o=0,r=null,a=0;a<this._serverSyncs.length;a++)if(this._serverSyncs[a][0]==t.options.serverSync){r=this._serverSyncs[a][1];break}if(null!=r)o=t.options.serverSync?r:0,n=new Date;else{var l=i.isFunction(t.options.serverSync)?t.options.serverSync.apply(e[0],[]):null;n=new Date,o=l?n.getTime()-l.getTime():0,this._serverSyncs.push([t.options.serverSync,o])}var p=t.options.timezone;p=null==p?-n.getTimezoneOffset():p,(s||!s&&null==t._until&&null==t._since)&&(t._since=t.options.since,null!=t._since&&(t._since=this.UTCDate(p,this._determineTime(t._since,null)),t._since&&o&&t._since.setMilliseconds(t._since.getMilliseconds()+o)),t._until=this.UTCDate(p,this._determineTime(t.options.until,n)),o&&t._until.setMilliseconds(t._until.getMilliseconds()+o)),t._show=this._determineShow(t)},_preDestroy:function(i,e){this._removeElem(i[0]),i.empty()},pause:function(i){this._hold(i,"pause")},lap:function(i){this._hold(i,"lap")},resume:function(i){this._hold(i,null)},toggle:function(e){this[(i.data(e,this.name)||{})._hold?"resume":"pause"](e)},toggleLap:function(e){this[(i.data(e,this.name)||{})._hold?"resume":"lap"](e)},_hold:function(e,t){var s=i.data(e,this.name);if(s){if("pause"==s._hold&&!t){s._periods=s._savePeriods;var n=s._since?"-":"+";s[s._since?"_since":"_until"]=this._determineTime(n+s._periods[0]+"y"+n+s._periods[1]+"o"+n+s._periods[2]+"w"+n+s._periods[3]+"d"+n+s._periods[4]+"h"+n+s._periods[5]+"m"+n+s._periods[6]+"s"),this._addElem(e)}s._hold=t,s._savePeriods="pause"==t?s._periods:null,i.data(e,this.name,s),this._updateCountdown(e,s)}},getTimes:function(e){var t=i.data(e,this.name);return t?"pause"==t._hold?t._savePeriods:t._hold?this._calculatePeriods(t,t._show,t.options.significant,new Date):t._periods:null},_determineTime:function(i,e){var t,s,n=this,o=null==i?e:"string"==typeof i?function(i){i=i.toLowerCase();for(var e=new Date,t=e.getFullYear(),s=e.getMonth(),o=e.getDate(),r=e.getHours(),a=e.getMinutes(),l=e.getSeconds(),p=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,$=p.exec(i);$;){switch($[2]||"s"){case"s":l+=parseInt($[1],10);break;case"m":a+=parseInt($[1],10);break;case"h":r+=parseInt($[1],10);break;case"d":o+=parseInt($[1],10);break;case"w":o+=7*parseInt($[1],10);break;case"o":s+=parseInt($[1],10),o=Math.min(o,n._getDaysInMonth(t,s));break;case"y":t+=parseInt($[1],10),o=Math.min(o,n._getDaysInMonth(t,s))}$=p.exec(i)}return new Date(t,s,o,r,a,l,0)}(i):"number"==typeof i?(t=i,(s=new Date).setTime(s.getTime()+1e3*t),s):i;return o&&o.setMilliseconds(0),o},_getDaysInMonth:function(i,e){return 32-new Date(i,e,32).getDate()},_normalLabels:function(i){return i},_generateHTML:function(e){var p=this;e._periods=e._hold?e._periods:this._calculatePeriods(e,e._show,e.options.significant,new Date);for(var $=!1,u=0,c=e.options.significant,m=i.extend({},e._show),h=t;h<=l;h++)$|="?"==e._show[h]&&e._periods[h]>0,m[h]="?"!=e._show[h]||$?e._show[h]:null,u+=m[h]?1:0,c-=e._periods[h]>0?1:0;for(var d=[!1,!1,!1,!1,!1,!1,!1],h=l;h>=t;h--)e._show[h]&&(e._periods[h]?d[h]=!0:(d[h]=c>0,c--));var g=e.options.compact?e.options.compactLabels:e.options.labels,_=e.options.whichLabels||this._normalLabels,f=function(i){var t=e.options["compactLabels"+_(e._periods[i])];return m[i]?p._translateDigits(e,e._periods[i])+(t?t[i]:g[i])+" ":""},w=e.options.padZeroes?2:1,y=function(i){var t=e.options["labels"+_(e._periods[i])];return!e.options.significant&&m[i]||e.options.significant&&d[i]?'<span class="'+p._sectionClass+'"><span class="'+p._amountClass+'">'+p._minDigits(e,e._periods[i],w)+'</span><span class="'+p._periodClass+'">'+(t?t[i]:g[i])+"</span></span>":""};return e.options.layout?this._buildLayout(e,m,e.options.layout,e.options.compact,e.options.significant,d):(e.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(e._hold?" "+this._holdingClass:"")+'">'+f(t)+f(s)+f(n)+f(o)+(m[r]?this._minDigits(e,e._periods[r],2):"")+(m[a]?(m[r]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[a],2):"")+(m[l]?(m[r]||m[a]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[l],2):""):'<span class="'+this._rowClass+" "+this._showClass+(e.options.significant||u)+(e._hold?" "+this._holdingClass:"")+'">'+y(t)+y(s)+y(n)+y(o)+y(r)+y(a)+y(l))+"</span>"+(e.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+e.options.description+"</span>":"")},_buildLayout:function(e,p,$,u,c,m){for(var h=e.options[u?"compactLabels":"labels"],d=e.options.whichLabels||this._normalLabels,g=function(i){return(e.options[(u?"compactLabels":"labels")+d(e._periods[i])]||h)[i]},_=function(i,t){return e.options.digits[Math.floor(i/t)%10]},f={desc:e.options.description,sep:e.options.timeSeparator,yl:g(t),yn:this._minDigits(e,e._periods[t],1),ynn:this._minDigits(e,e._periods[t],2),ynnn:this._minDigits(e,e._periods[t],3),y1:_(e._periods[t],1),y10:_(e._periods[t],10),y100:_(e._periods[t],100),y1000:_(e._periods[t],1e3),ol:g(s),on:this._minDigits(e,e._periods[s],1),onn:this._minDigits(e,e._periods[s],2),onnn:this._minDigits(e,e._periods[s],3),o1:_(e._periods[s],1),o10:_(e._periods[s],10),o100:_(e._periods[s],100),o1000:_(e._periods[s],1e3),wl:g(n),wn:this._minDigits(e,e._periods[n],1),wnn:this._minDigits(e,e._periods[n],2),wnnn:this._minDigits(e,e._periods[n],3),w1:_(e._periods[n],1),w10:_(e._periods[n],10),w100:_(e._periods[n],100),w1000:_(e._periods[n],1e3),dl:g(o),dn:this._minDigits(e,e._periods[o],1),dnn:this._minDigits(e,e._periods[o],2),dnnn:this._minDigits(e,e._periods[o],3),d1:_(e._periods[o],1),d10:_(e._periods[o],10),d100:_(e._periods[o],100),d1000:_(e._periods[o],1e3),hl:g(r),hn:this._minDigits(e,e._periods[r],1),hnn:this._minDigits(e,e._periods[r],2),hnnn:this._minDigits(e,e._periods[r],3),h1:_(e._periods[r],1),h10:_(e._periods[r],10),h100:_(e._periods[r],100),h1000:_(e._periods[r],1e3),ml:g(a),mn:this._minDigits(e,e._periods[a],1),mnn:this._minDigits(e,e._periods[a],2),mnnn:this._minDigits(e,e._periods[a],3),m1:_(e._periods[a],1),m10:_(e._periods[a],10),m100:_(e._periods[a],100),m1000:_(e._periods[a],1e3),sl:g(l),sn:this._minDigits(e,e._periods[l],1),snn:this._minDigits(e,e._periods[l],2),snnn:this._minDigits(e,e._periods[l],3),s1:_(e._periods[l],1),s10:_(e._periods[l],10),s100:_(e._periods[l],100),s1000:_(e._periods[l],1e3)},w=$,y=t;y<=l;y++){var v="yowdhms".charAt(y),D=RegExp("\\{"+v+"<\\}([\\s\\S]*)\\{"+v+">\\}","g");w=w.replace(D,!c&&p[y]||c&&m[y]?"$1":"")}return i.each(f,function(i,e){var t=RegExp("\\{"+i+"\\}","g");w=w.replace(t,e)}),w},_minDigits:function(i,e,t){return(e=""+e).length>=t?this._translateDigits(i,e):(e="0000000000"+e,this._translateDigits(i,e.substr(e.length-t)))},_translateDigits:function(i,e){return(""+e).replace(/[0-9]/g,function(e){return i.options.digits[e]})},_determineShow:function(i){var e=i.options.format,p=[];return p[t]=e.match("y")?"?":e.match("Y")?"!":null,p[s]=e.match("o")?"?":e.match("O")?"!":null,p[n]=e.match("w")?"?":e.match("W")?"!":null,p[o]=e.match("d")?"?":e.match("D")?"!":null,p[r]=e.match("h")?"?":e.match("H")?"!":null,p[a]=e.match("m")?"?":e.match("M")?"!":null,p[l]=e.match("s")?"?":e.match("S")?"!":null,p},_calculatePeriods:function(i,e,p,$){i._now=$,i._now.setMilliseconds(0);var u=new Date(i._now.getTime());i._since?$.getTime()<i._since.getTime()?i._now=$=u:$=i._since:(u.setTime(i._until.getTime()),$.getTime()>i._until.getTime()&&(i._now=$=u));var c=[0,0,0,0,0,0,0];if(e[t]||e[s]){var m=this._getDaysInMonth($.getFullYear(),$.getMonth()),h=this._getDaysInMonth(u.getFullYear(),u.getMonth()),d=u.getDate()==$.getDate()||u.getDate()>=Math.min(m,h)&&$.getDate()>=Math.min(m,h),g=function(i){return(60*i.getHours()+i.getMinutes())*60+i.getSeconds()},_=Math.max(0,(u.getFullYear()-$.getFullYear())*12+u.getMonth()-$.getMonth()+(u.getDate()<$.getDate()&&!d||d&&g(u)<g($)?-1:0));c[t]=e[t]?Math.floor(_/12):0,c[s]=e[s]?_-12*c[t]:0;var f=($=new Date($.getTime())).getDate()==m,w=this._getDaysInMonth($.getFullYear()+c[t],$.getMonth()+c[s]);$.getDate()>w&&$.setDate(w),$.setFullYear($.getFullYear()+c[t]),$.setMonth($.getMonth()+c[s]),f&&$.setDate(w)}var y=Math.floor((u.getTime()-$.getTime())/1e3),v=function(i,t){c[i]=e[i]?Math.floor(y/t):0,y-=c[i]*t};if(v(n,604800),v(o,86400),v(r,3600),v(a,60),v(l,1),y>0&&!i._since)for(var D=[1,12,4.3482,7,24,60,60],T=l,C=1,b=l;b>=t;b--)e[b]&&(c[T]>=C&&(c[T]=0,y=1),y>0&&(c[b]++,y=0,T=b,C=1)),C*=D[b];if(p)for(var b=t;b<=l;b++)p&&c[b]?p--:p||(c[b]=0);return c}})}(jQuery);