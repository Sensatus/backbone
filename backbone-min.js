(function(t){var e=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,n,r){e.Backbone=t(e,r,i,n)})}else if(typeof exports!=="undefined"){var i=require("underscore"),n;try{n=require("jquery")}catch(t){}t(e,exports,i,n)}else{e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender||e.$)}})(function(t,e,i,n){var r=t.Backbone;var s=Array.prototype.slice;e.VERSION="1.3.3";e.$=n;e.noConflict=function(){t.Backbone=r;return this};e.emulateHTTP=false;e.emulateJSON=false;var o=e.Events={};var a=/\s+/;var l;var h=function(t,e,n,r,s){var o=0,l;if(n&&typeof n==="object"){if(r!==void 0&&"context"in s&&s.context===void 0)s.context=r;for(l=i.keys(n);o<l.length;o++){e=h(t,e,l[o],n[l[o]],s)}}else if(n&&a.test(n)){for(l=n.split(a);o<l.length;o++){e=t(e,l[o],r,s)}}else{e=t(e,n,r,s)}return e};o.onFirstListener=function(){};o.onNoListeners=function(){};o.on=function(t,e,n){if(typeof this.onFirstListener==="function"&&(!this._events||i.isEmpty(this._events))){this.onFirstListener()}this._events=h(u,this._events||{},t,e,{context:n,ctx:this,listening:l});if(l){var r=this._listeners||(this._listeners={});r[l.id]=l;l.interop=false}return this};o.listenTo=function(t,e,n){if(!t)return this;var r=t._listenId||(t._listenId=i.uniqueId("l"));var s=this._listeningTo||(this._listeningTo={});var o=l=s[r];if(!o){this._listenId||(this._listenId=i.uniqueId("l"));o=l=s[r]=new g(this,t)}var a=f(t,e,n,this);l=void 0;if(a)throw a;if(o.interop)o.on(e,n);return this};var u=function(t,e,i,n){if(i){var r=t[e]||(t[e]=[]);var s=n.context,o=n.ctx,a=n.listening;if(a)a.count++;r.push({callback:i,context:s,ctx:s||o,listening:a})}return t};var f=function(t,e,i,n){try{t.on(e,i,n)}catch(t){return t}};o.off=function(t,e,n){if(!this._events)return this;this._events=h(c,this._events,t,e,{context:n,listeners:this._listeners});if(typeof this.onNoListeners==="function"&&(!this._events||i.isEmpty(this._events))){this.onNoListeners()}return this};o.stopListening=function(t,e,n){var r=this._listeningTo;if(!r)return this;var s=t?[t._listenId]:i.keys(r);for(var o=0;o<s.length;o++){var a=r[s[o]];if(!a)break;a.obj.off(e,n,this);if(a.interop)a.off(e,n)}if(i.isEmpty(r))this._listeningTo=void 0;return this};var c=function(t,e,n,r){if(!t)return;var s=r.context,o=r.listeners;var a=0,l;if(!e&&!s&&!n){for(l=i.keys(o);a<l.length;a++){o[l[a]].cleanup()}return}l=e?[e]:i.keys(t);for(;a<l.length;a++){e=l[a];var h=t[e];if(!h)break;var u=[];for(var f=0;f<h.length;f++){var c=h[f];if(n&&n!==c.callback&&n!==c.callback._callback||s&&s!==c.context){u.push(c)}else{var d=c.listening;if(d)d.off(e,n)}}if(u.length){t[e]=u}else{delete t[e]}}return t};o.once=function(t,e,i){var n=h(d,{},t,e,this.off.bind(this));if(typeof t==="string"&&i==null)e=void 0;return this.on(n,e,i)};o.listenToOnce=function(t,e,i){var n=h(d,{},e,i,this.stopListening.bind(this,t));return this.listenTo(t,n)};var d=function(t,e,n,r){if(n){var s=t[e]=i.once(function(){r(e,s);n.apply(this,arguments)});s._callback=n}return t};o.trigger=function(t){if(!this._events)return this;var e=Math.max(0,arguments.length-1);var i=Array(e);for(var n=0;n<e;n++)i[n]=arguments[n+1];h(v,this._events,t,void 0,i);return this};var v=function(t,e,i,n){if(t){var r=t[e];var s=t.all;if(r&&s)s=s.slice();if(r)p(r,n);if(s)p(s,[e].concat(n))}return t};var p=function(t,e){var i,n=-1,r=t.length,s=e[0],o=e[1],a=e[2];switch(e.length){case 0:while(++n<r)(i=t[n]).callback.call(i.ctx);return;case 1:while(++n<r)(i=t[n]).callback.call(i.ctx,s);return;case 2:while(++n<r)(i=t[n]).callback.call(i.ctx,s,o);return;case 3:while(++n<r)(i=t[n]).callback.call(i.ctx,s,o,a);return;default:while(++n<r)(i=t[n]).callback.apply(i.ctx,e);return}};var g=function(t,e){this.id=t._listenId;this.listener=t;this.obj=e;this.interop=true;this.count=0;this._events=void 0};g.prototype.on=o.on;g.prototype.off=function(t,e){var i;if(this.interop){this._events=h(c,this._events,t,e,{context:void 0,listeners:void 0});i=!this._events}else{this.count--;i=this.count===0}if(i)this.cleanup()};g.prototype.cleanup=function(){delete this.listener._listeningTo[this.obj._listenId];if(!this.interop)delete this.obj._listeners[this.id]};o.bind=o.on;o.unbind=o.off;i.extend(e,o);var _=e.Model=function(t,e){var n=t||{};e||(e={});this.preinitialize.apply(this,arguments);this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)n=this.parse(n,e)||{};var r=i.result(this,"defaults");n=i.defaults(i.extend({},r,n),r);this.set(n,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(_.prototype,o,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",preinitialize:function(){},initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return!!i.iteratee(t,this)(this.attributes)},set:function(t,e,n){if(t==null)return this;var r;if(typeof t==="object"){r=t;n=e}else{(r={})[t]=e}n||(n={});if(!this._validate(r,n))return false;var s=n.unset;var o=n.silent;var a=[];var l=this._changing;this._changing=true;if(!l){this._previousAttributes=i.clone(this.attributes);this.changed={}}var h=this.attributes;var u=this.changed;var f=this._previousAttributes;for(var c in r){e=r[c];if(!i.isEqual(h[c],e))a.push(c);if(!i.isEqual(f[c],e)){u[c]=e}else{delete u[c]}s?delete h[c]:h[c]=e}if(this.idAttribute in r)this.id=this.get(this.idAttribute);if(!o){if(a.length)this._pending=n;for(var d=0;d<a.length;d++){this.trigger("change:"+a[d],this,h[a[d]],n)}}if(l)return this;if(!o){while(this._pending){n=this._pending;this._pending=false;this.trigger("change",this,n)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var n in this.attributes)e[n]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e=this._changing?this._previousAttributes:this.attributes;var n={};var r;for(var s in t){var o=t[s];if(i.isEqual(e[s],o))continue;n[s]=o;r=true}return r?n:false},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend({},t,{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var n=this.validationError=this.validate(t,e)||null;if(!n)return true;this.trigger("invalid",this,n,i.extend(e,{validationError:n}));return false}});var m=e.Collection=function(t,e){e||(e={});this.preinitialize.apply(this,arguments);if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var b={add:true,remove:true,merge:true};var y={add:true,remove:false};var x=function(t,e,i){i=Math.min(Math.max(i,0),t.length);var n=Array(t.length-i);var r=e.length;var s;for(s=0;s<n.length;s++)n[s]=t[s+i];for(s=0;s<r;s++)t[s+i]=e[s];for(s=0;s<n.length;s++)t[s+r+i]=n[s]};i.extend(m.prototype,o,{model:_,preinitialize:function(){},initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},add:function(t,e){return this.set(t,i.extend({merge:false},e,y))},remove:function(t,e){e=i.extend({},e);var n=!i.isArray(t);t=n?[t]:t.slice();var r=this._removeModels(t,e);if(!e.silent&&r.length){e.changes={added:[],merged:[],removed:r};this.trigger("update",this,e)}return n?r[0]:r},set:function(t,e){if(t==null)return;e=i.extend({},b,e);if(e.parse&&!this._isModel(t)){t=this.parse(t,e)||[]}var n=!i.isArray(t);t=n?[t]:t.slice();var r=e.at;if(r!=null)r=+r;if(r>this.length)r=this.length;if(r<0)r+=this.length+1;var s=[];var o=[];var a=[];var l=[];var h={};var u=e.add;var f=e.merge;var c=e.remove;var d=false;var v=this.comparator&&r==null&&e.sort!==false;var p=i.isString(this.comparator)?this.comparator:null;var g,_;for(_=0;_<t.length;_++){g=t[_];var m=this.get(g);if(m){if(f&&g!==m){var y=this._isModel(g)?g.attributes:g;if(e.parse)y=m.parse(y,e);m.set(y,e);a.push(m);if(v&&!d)d=m.hasChanged(p)}if(!h[m.cid]){h[m.cid]=true;s.push(m)}t[_]=m}else if(u){g=t[_]=this._prepareModel(g,e);if(g){o.push(g);this._addReference(g,e);h[g.cid]=true;s.push(g)}}}if(c){for(_=0;_<this.length;_++){g=this.models[_];if(!h[g.cid])l.push(g)}if(l.length)this._removeModels(l,e)}var I=false;var k=!v&&u&&c;if(s.length&&k){I=this.length!==s.length||i.some(this.models,function(t,e){return t!==s[e]});this.models.length=0;x(this.models,s,0);this.length=this.models.length}else if(o.length){if(v)d=true;x(this.models,o,r==null?this.length:r);this.length=this.models.length}if(d)this.sort({silent:true});if(!e.silent){for(_=0;_<o.length;_++){if(r!=null)e.index=r+_;g=o[_];g.trigger("add",g,this,e)}if(d||I)this.trigger("sort",this,e);if(o.length||l.length||a.length){e.changes={added:o,removed:l,merged:a};this.trigger("update",this,e)}}return n?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var n=0;n<this.models.length;n++){this._removeReference(this.models[n],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[this.modelId(this._isModel(t)?t.attributes:t)]||t.cid&&this._byId[t.cid]},has:function(t){return this.get(t)!=null},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,true)},sort:function(t){var e=this.comparator;if(!e)throw new Error("Cannot sort a set without a comparator");t||(t={});var n=e.length;if(i.isFunction(e))e=e.bind(this);if(n===1||i.isString(e)){this.models=this.sortBy(e)}else{this.models.sort(e)}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return this.map(t+"")},create:function(t,e){e=e?i.clone(e):{};var n=e.wait;t=this._prepareModel(t,e);if(!t)return false;if(!n)this.add(t,e);var r=this;var s=e.success;e.success=function(t,e,i){if(n)r.add(t,i);if(s)s.call(i.context,t,e,i)};return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},values:function(){return new k(this,w)},keys:function(){return new k(this,E)},entries:function(){return new k(this,A)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var n=new this.model(t,e);if(!n.validationError)return n;this.trigger("invalid",this,n.validationError,e);return false},_removeModels:function(t,e){var i=[];for(var n=0;n<t.length;n++){var r=this.get(t[n]);if(!r)continue;var s=this.indexOf(r);this.models.splice(s,1);this.length--;delete this._byId[r.cid];var o=this.modelId(r.attributes);if(o!=null)delete this._byId[o];if(!e.silent){e.index=s;r.trigger("remove",r,this,e)}i.push(r);this._removeReference(r,e)}return i},_isModel:function(t){return t instanceof _},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.modelId(t.attributes);if(i!=null)delete this._byId[i];if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,n){if(e){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,n);if(t==="change"){var r=this.modelId(e.previousAttributes());var s=this.modelId(e.attributes);if(r!==s){if(r!=null)delete this._byId[r];if(s!=null)this._byId[s]=e}}}this.trigger.apply(this,arguments)}});var I=typeof Symbol==="function"&&Symbol.iterator;if(I){m.prototype[I]=m.prototype.values}var k=function(t,e){this._collection=t;this._kind=e;this._index=0};var w=1;var E=2;var A=3;if(I){k.prototype[I]=function(){return this}}k.prototype.next=function(){if(this._collection){if(this._index<this._collection.length){var t=this._collection.at(this._index);this._index++;var e;if(this._kind===w){e=t}else{var i=this._collection.modelId(t.attributes);if(this._kind===E){e=i}else{e=[i,t]}}return{value:e,done:false}}this._collection=void 0}return{value:void 0,done:true}};var M=function(t,e,i,n){switch(e){case 1:return function(){return t[i](this[n])};case 2:return function(e){return t[i](this[n],e)};case 3:return function(e,r){return t[i](this[n],q(e,this),r)};case 4:return function(e,r,s){return t[i](this[n],q(e,this),r,s)};default:return function(){var e=s.call(arguments);e.unshift(this[n]);return t[i].apply(t,e)}}};var j=function(t,e,n,r){i.each(n,function(i,n){if(e[n])t.prototype[n]=M(e,i,n,r)})};var q=function(t,e){if(i.isFunction(t))return t;if(i.isObject(t)&&!e._isModel(t))return O(t);if(i.isString(t))return function(e){return e.get(t)};return t};var O=function(t){var e=i.matches(t);return function(t){return e(t.attributes)}};var S={forEach:3,each:3,map:3,collect:3,reduce:0,foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3};var T={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};i.each([[m,S,"models"],[_,T,"attributes"]],function(t){var e=t[0],n=t[1],r=t[2];e.mixin=function(t){var n=i.reduce(i.functions(t),function(t,e){t[e]=0;return t},{});j(e,t,n,r)};j(e,i,n,r)});var z=function(t,e){var n=this;var r;if(t&&i.has(t,"constructor")){r=t.constructor}else{r=function(){return n.apply(this,arguments)}}i.extend(r,n,e);r.prototype=i.create(n.prototype,t);r.prototype.constructor=r;r.__super__=n.prototype;return r};_.extend=m.extend=z;var B=function(t,e){var i=e.error;e.error=function(n){if(i)i.call(e.context,t,n,e);t.trigger("error",t,n,e)}};return e});
//# sourceMappingURL=backbone-min.map