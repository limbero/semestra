(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(n){n.exports={2019:{boston:{"01-01":"New Year's Day","01-21":"Martin Luther King Day","02-18":"Washington's Birthday","04-15":"Marathon Monday","05-27":"Memorial Day","07-04":"Independence Day","09-02":"Labor Day","10-14":"Indigenous People's Day","11-11":"Veterans Day","11-28":"Thanksgiving Day","11-29":"Day After Thanksgiving","12-24":"Christmas Eve","12-25":"Christmas Day"},uk:{"01-01":"New Year's Day","04-19":"Good Friday","04-22":"Easter Monday","05-06":"Early May bank holiday","05-27":"Spring bank holiday","08-26":"Summer bank holiday","12-25":"Christmas Day","12-26":"Boxing Day"},sweden:{"01-01":"Ny\xe5rsdagen","01-06":"Trettondedag jul","04-19":"L\xe5ngfredagen","04-22":"Annandag p\xe5sk","05-01":"F\xf6rsta maj","05-30":"Kristi himmelsf\xe4rdsdag","06-06":"Nationaldagen","06-21":"Midsommarafton","12-24":"Julafton","12-25":"Juldagen","12-26":"Annandag jul","12-31":"Ny\xe5rsafton"}},2020:{boston:{"01-01":"New Year's Day","01-20":"Martin Luther King Day","02-17":"Washington's Birthday","04-20":"Marathon Monday","05-25":"Memorial Day","07-04":"Independence Day","09-07":"Labor Day","10-12":"Indigenous People's Day","11-11":"Veterans Day","11-26":"Thanksgiving Day","11-27":"Day After Thanksgiving","12-24":"Christmas Eve","12-25":"Christmas Day"},uk:{"01-01":"New Year's Day","04-10":"Good Friday","04-13":"Easter Monday","05-08":"Early May bank holiday (VE day)","05-25":"Spring bank holiday","08-31":"Summer bank holiday","12-25":"Christmas Day","12-28":"Boxing Day (substitute day)"},sweden:{"01-01":"Ny\xe5rsdagen","01-06":"Trettondedag jul","04-10":"L\xe5ngfredagen","04-13":"Annandag p\xe5sk","05-01":"F\xf6rsta maj","05-21":"Kristi himmelsf\xe4rdsdag","06-06":"Nationaldagen","06-19":"Midsommarafton","12-24":"Julafton","12-25":"Juldagen","12-26":"Annandag jul","12-31":"Ny\xe5rsafton"}}}},15:function(n){n.exports={boston:23,sweden:25,uk:28}},20:function(n,e,a){n.exports=a(32)},26:function(n,e,a){},32:function(n,e,a){"use strict";a.r(e);var t=a(0),r=a.n(t),o=a(13),i=a.n(o),c=(a(26),a(3)),u=a(5),d=a(4),l=a(1),s=a(2),y=a(14),g=a(15),f=a(8),m=a(6),v=a(7),h=function(){function n(){Object(m.a)(this,n)}return Object(v.a)(n,null,[{key:"removeFromArray",value:function(n,e){return n.filter(function(n){return n!==e})}},{key:"addToArray",value:function(n,e){return[].concat(Object(f.a)(n),[e])}}]),n}(),p=function(){function n(){Object(m.a)(this,n)}return Object(v.a)(n,null,[{key:"zeropad",value:function(n,e){for(var a=String(n);a.length<e;)a="0".concat(a);return a}},{key:"fullDateTimeString",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return this.dateStringYYYYMMDD(n)+e+this.timeStringHHMMSSMMM(n)}},{key:"dateTimeStringYYYYMMDDHHMM",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return this.dateStringYYYYMMDD(n)+e+this.timeStringHHMM(n)}},{key:"utcDateTimeStringYYYYMMDDHHMM",value:function(n){return"".concat(this.dateTimeStringYYYYMMDDHHMM(n,"T"),"Z")}},{key:"utcDateTimeStringYYYYMMDDHHMMSSMMM",value:function(n){return"".concat(this.fullDateTimeString(n,"T"),"Z")}},{key:"dateStringYYYYMMDD",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-";return n.getUTCFullYear()+e+this.dateStringMMDD(n,e)}},{key:"dateStringMMDD",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-",a=this.zeropad(n.getUTCMonth()+1,2)+e;return a+=this.zeropad(n.getUTCDate(),2)}},{key:"timeStringHHMM",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:":",a=this.zeropad(n.getUTCHours(),2)+e;return a+=this.zeropad(n.getUTCMinutes(),2)}},{key:"timeStringHHMMSS",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:":";return this.timeStringHHMM(n)+e+this.zeropad(n.getUTCSeconds(),2)}},{key:"timeStringHHMMSSMMM",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".";return this.timeStringHHMMSS(n)+e+this.zeropad(n.getUTCMilliseconds(),3)}},{key:"dateFromUTCFormControlString",value:function(n){return new Date("".concat(n,"Z"))}},{key:"isSameDate",value:function(n,e){return n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth()&&n.getUTCDate()===e.getUTCDate()}},{key:"isBefore",value:function(n,e){return n.getUTCFullYear()<=e.getUTCFullYear()&&n.getUTCMonth()<=e.getUTCMonth()&&n.getUTCDate()<e.getUTCDate()}},{key:"weekdayFromDate",value:function(n){return this.weekday(n.getUTCDay())}},{key:"weekdayNameFromDate",value:function(n){return this.weekdayName(this.weekdayFromDate(n))}},{key:"weekday",value:function(n){return[6,0,1,2,3,4,5][n]}},{key:"weekdayName",value:function(n){return["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][n]}},{key:"isLeapYear",value:function(n){return n%4===0&&(n%100!==0||n%400===0)}},{key:"lengthOfMonth",value:function(n,e){var a=[31,28,31,30,31,30,31,31,30,31,30,31];return this.isLeapYear(e)&&(a[1]=29),a[n]}}]),n}(),b={year:{padding:10,borderRadius:5}};function k(){var n=Object(l.a)(["\n  grid-column-start: ",";\n  grid-column-end: span 1;\n\n  box-sizing: border-box;\n  height: 75px;\n  padding: 5px;\n\n  font-size: 1.5rem;\n  text-align: center;\n  text-transform: uppercase;\n  line-height: 75px;\n"]);return k=function(){return n},n}var D=s.a.div(k(),function(n){return n.weekday||"auto"});var M=function(n){return r.a.createElement(r.a.Fragment,null,Object(f.a)(Array(7).keys()).map(function(n){return r.a.createElement(D,{key:n,weekday:p.weekdayName(n).toLowerCase()},p.weekdayName(n).slice(0,3))}))};function w(){var n=Object(l.a)(["\n  grid-column-start: ",";\n  grid-column-end: span 1;\n  background-color: ",";\n  ","\n\n  box-sizing: border-box;\n  height: 75px;\n  padding: 7px;\n  border-radius: 5px;\n\n  p.date {\n    margin: 0;\n  }\n  p.holiday {\n    margin: 5px 0 0 0;\n    font-size: 0.8rem;\n    color: var(--text-color-secondary);\n    ","\n  }\n"]);return w=function(){return n},n}var x=s.a.div(w(),function(n){return n.weekday||"auto"},function(n){return n.workedHoliday?"var(--arbetad-helgdag)":(e=n.weekday,a=n.holiday,T(e)||a?"var(--helgdag)":n.vacationing?"var(--semester)":"var(--vardag)");var e,a},function(n){return 11===n.month?"":n.date===p.lengthOfMonth(n.month,n.year)&&"sunday"!==n.weekday?"box-shadow: 0 ".concat(4*b.year.padding,"px 0 -").concat(5*b.year.borderRadius,"px var(--month-divider), ")+"".concat(4*b.year.padding,"px 0 0 -").concat(5*b.year.borderRadius,"px var(--month-divider);"):p.lengthOfMonth(n.month,n.year)-n.date<7?"box-shadow: 0 ".concat(4*b.year.padding,"px 0 -").concat(5*b.year.borderRadius,"px var(--month-divider);"):void 0},function(n){return n.workedHoliday?"text-decoration: line-through;":""});function T(n){return["saturday","sunday"].includes(n)}var S=function(n){var e=p.weekdayNameFromDate(n.day).toLowerCase(),a=p.dateStringMMDD(n.day);return r.a.createElement(x,Object.assign({weekday:e,month:n.day.getUTCMonth(),date:n.day.getUTCDate(),year:n.day.getUTCFullYear(),vacationing:n.vacationing,workedHoliday:n.workedHoliday,onClick:function(){return function(){if(T(e))return!1;n.holiday?n.toggleWorkedHoliday(a):n.toggleDayOff(a)}()}},n),r.a.createElement("p",{className:"date"},n.day.getUTCDate()),r.a.createElement("p",{className:"holiday"},n.holiday))};function C(){var n=Object(l.a)(["\n  grid-column-start: months;\n\n  grid-row-start: ",";\n  grid-row-end: span ",";\n\n  box-sizing: border-box;\n  padding: 5px;\n\n  font-size: 2rem;\n  text-align: center;\n  text-transform: uppercase;\n\n  writing-mode: vertical-rl;\n  text-orientation: mixed;\n  letter-spacing: ","px;\n  line-height: 100%;\n"]);return C=function(){return n},n}var Y=["January","February","March","April","May","June","July","August","September","October","November","December"],O=s.a.div(C(),function(n){return n.startRow||"auto"},function(n){return n.spanRows||"1"},function(n){return 30*n.spanRows/n.month.length});var j=function(n){var e=new Date(Date.UTC(n.year,0,1)),a=p.weekdayFromDate(e),t=2;return r.a.createElement(r.a.Fragment,null,Y.map(function(e,o){for(var i=p.lengthOfMonth(o,n.year)+a,c=t,u=0;i>=8;)i-=7,u++;return a=i,t=c+u,0===o&&(t++,u++),r.a.createElement(O,{key:e,startRow:c,spanRows:u,month:e},e)}))};function E(){var n=Object(l.a)(["\n  box-sizing: border-box;\n  width: 100%;\n  padding: ","px ","px ","px ","px;\n  padding-bottom: ","px;\n  margin-bottom: ","px;\n\n  display: grid;\n  grid-template-columns:  \n                          [months]    1fr\n                          [monday]    3fr\n                          [tuesday]   3fr\n                          [wednesday] 3fr\n                          [thursday]  3fr\n                          [friday]    3fr\n                          [saturday]  3fr\n                          [sunday]    3fr;\n\n  grid-gap: ","px;\n  background-color: var(--year-background);\n  border-radius: ","px;\n"]);return E=function(){return n},n}var H=s.a.div(E(),b.year.padding,2*b.year.padding,2*b.year.padding,b.year.padding,2*b.year.padding,4*b.year.padding,b.year.padding,b.year.borderRadius);var U=function(n){for(var e=new Date(Date.UTC(n.year,0,1)),a=[];e.getUTCFullYear()===n.year;)a.push(new Date(e.getTime())),e.setUTCDate(e.getUTCDate()+1);return r.a.createElement(H,null,r.a.createElement(M,null),a.map(function(e){var a=p.dateStringMMDD(e);return r.a.createElement(S,Object.assign({key:p.dateStringYYYYMMDD(e),day:e,holiday:n.holidays[a]||"",vacationing:n.vacationDays.includes(a),workedHoliday:n.workedHolidays.includes(a)},n))}),r.a.createElement(j,{year:n.year}))};function F(){var n=Object(l.a)(["\n  background: none;\n  border: none;\n\n  padding: 0 4px 2px;\n  margin-inline-start: 3px;\n\n  font-size: 1rem;\n  font-weight: bold;\n  background-color: ",";\n  color: var(--background-color);\n\n  border-radius: 3px;\n\n  &:disabled {\n    background-color: var(--inactive);\n  }\n\n  &:first-child {\n    margin-inline-start: 0;\n  }\n  \n  &:not(:disabled):not(:active):not(:focus):hover {\n    color: #FD4;\n  }\n  \n  &:not(:disabled):hover {\n    cursor: pointer;\n  }\n  &:active, &:focus {\n    outline: none;\n    color: #000;\n    background-color: ",";\n  }\n"]);return F=function(){return n},n}function N(){var n=Object(l.a)(["\n  background-color: var(--year-background);\n\n  display: inline;\n  box-sizing: border-box;\n  padding: 19px 15px 15px;\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n\n  position: fixed;\n  top: -4px;\n\n  box-shadow: 4px 4px 0 0 rgba(0,0,0, 0.3);\n  transform: translateX(-100%);\n"]);return N=function(){return n},n}var A=s.a.div(N()),z=s.a.button(F(),function(n){return n.accentColor},function(n){return n.accentColor});var L=function(n){return r.a.createElement(A,null,r.a.createElement("div",{style:{display:"inline-block"}},r.a.createElement("strong",null,"Vacation days left:")," ",n.vacationDaysLeft,"/",n.numVacationDays),r.a.createElement("div",{style:{display:"inline-block",marginInlineStart:"10px"}},r.a.createElement(z,{onClick:function(){return n.addNumVacationDays(-1)},disabled:0===n.vacationDaysLeft,accentColor:"var(--red)"},"\u2013"),r.a.createElement(z,{onClick:function(){return n.addNumVacationDays(1)},accentColor:"var(--green)"},"+")))};function J(){var n=Object(l.a)(["\n  background: none;\n  border: none;\n\n  padding: 5px;\n  margin: 0 15px;\n\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: var(--inactive);\n\n  border-radius: 3px;\n\n  &:disabled {\n    background-color: var(--text-color);\n    color: var(--background-color);\n  }\n\n  &:first-child {\n    margin-inline-start: 0;\n  }\n  \n  &:not(:disabled):not(:active):not(:focus):hover {\n    color: #FD4;\n  }\n  \n  &:not(:disabled):hover {\n    cursor: pointer;\n  }\n  &:active, &:focus {\n    outline: none;\n    color: #000;\n    background-color: #FD4;\n  }\n"]);return J=function(){return n},n}function R(){var n=Object(l.a)(["\n  margin: 20px 0;\n"]);return R=function(){return n},n}function V(){var n=Object(l.a)(["\n  font-family: monospace;\n  font-size: 4rem;\n  margin: 1rem 0;\n"]);return V=function(){return n},n}function I(){var n=Object(l.a)(["\n  margin: 0 auto;\n  width: 70vw;\n  max-width: 900px;\n  min-width: 600px;\n  background-color: var(--background-color);\n  color: var(--text-color);\n"]);return I=function(){return n},n}var B=s.a.div(I()),W=s.a.h1(V()),P=s.a.nav(R()),K=s.a.button(J());function Z(n){return r.a.createElement(K,{disabled:n.value===n.currentlyPicked,onClick:function(){return n.pick(n.value)}},n.children)}var G=["2019","2020"],X=["boston","uk","sweden"];function $(n){var e={};return X.forEach(function(a){e[a]={},G.forEach(function(t){e[a][t]=n})}),e}var q={"semestra-year":5,"semestra-location":"someplace","semestra-vacationAllotment":$(5),"semestra-vacationDays":$([]),"semestra-workedHolidays":$([])};function Q(n,e){var a=Object(t.useState)(function(){try{var a=JSON.parse(window.localStorage.getItem(n));return a&&function n(e,a){if(!e)return!0;if(typeof e!==typeof a)return!1;if(Array.isArray(e)){if(!Array.isArray(a))return!1;for(var t=0;t<a.length;t++)if(!n(e[t],a[t]))return!1}else if("object"===typeof e){var r=Object.keys(e),o=Object.keys(e);if(r.length>o.length)return!1;for(var i=0;i<r.length;i++)return!!o.includes(r[i])&&n(e[r[i]],a[o[i]])}return!0}(a,q[n])?a:e}catch(t){return console.log(t),e}}),r=Object(d.a)(a,2),o=r[0],i=r[1];return[o,function(e){try{var a=e instanceof Function?e(o):e;i(a),window.localStorage.setItem(n,JSON.stringify(a))}catch(t){console.log(t)}}]}var _=function(){var n=[2019,2020],e=Q("semestra-year",2019),a=Object(d.a)(e,2),t=a[0],o=a[1],i=["boston","uk","sweden"],l=Q("semestra-location","boston"),s=Object(d.a)(l,2),f=s[0],m=s[1];function v(e){var a={};return i.forEach(function(t){a[t]={},n.forEach(function(n){var r=e;"function"===typeof e&&(r=e(t,n)),a[t]["".concat(n)]=r})}),a}var p=Q("semestra-vacationAllotment",v(function(n,e){return g[n]})),b=Object(d.a)(p,2),k=b[0],D=b[1],M=Q("semestra-vacationDays",v([])),w=Object(d.a)(M,2),x=w[0],T=w[1],S=Q("semestra-workedHolidays",v([])),C=Object(d.a)(S,2),Y=C[0],O=C[1];function j(){return E(arguments.length>0&&void 0!==arguments[0]?arguments[0]:k[f][t])>0}function E(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:k[f][t])-x[f][t].length+Y[f][t].length}function H(n){N(x,T,f,t,n)}function F(n){N(Y,O,f,t,n)}function N(n,e,a,t,r){e(Object(u.a)({},n,Object(c.a)({},a,Object(u.a)({},n[a],Object(c.a)({},t,r)))))}return r.a.createElement(B,null,r.a.createElement(W,null,"semestra"),r.a.createElement("div",{style:{textAlign:"right"}},r.a.createElement(L,{vacationDaysLeft:E(),numVacationDays:k[f][t],addNumVacationDays:function(n){var e;j(e=k[f][t]+n)+1&&D(Object(u.a)({},k,Object(c.a)({},f,Object(u.a)({},k[f],Object(c.a)({},t,e)))))}})),r.a.createElement(P,null,n.map(function(n){return r.a.createElement(Z,{key:n,value:n,currentlyPicked:t,pick:o},n)})),r.a.createElement(P,null,i.map(function(n){return r.a.createElement(Z,{key:n,value:n,currentlyPicked:f,pick:m},r.a.createElement("img",{alt:n,style:{display:"block"},height:32,src:"/icons/".concat(n,".png")}))})),r.a.createElement(U,{year:t,holidays:y["".concat(t)][f],toggleDayOff:function(n){x[f][t].includes(n)?H(h.removeFromArray(x[f][t],n)):j()&&H(h.addToArray(x[f][t],n))},toggleWorkedHoliday:function(n){if(Y[f][t].includes(n)){if(!j())return;F(h.removeFromArray(Y[f][t],n))}else F(h.addToArray(Y[f][t],n))},vacationDays:x[f][t]||[],workedHolidays:Y[f][t]||[]}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var nn;nn=_,i.a.render(r.a.createElement(nn,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(n){n.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.b7497992.chunk.js.map