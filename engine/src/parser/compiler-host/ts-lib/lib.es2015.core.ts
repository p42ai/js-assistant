const fileData = {
    fileName: `/lib.es2015.core.d.ts`,
    // File text is copyright Microsoft Corporation and is distributed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
    text: `/// <reference no-default-lib="true"/>\ninterface Array<T>{find<S extends T>(predicate:(this:void,value:T,index:number,obj:T[])=>value is S,thisArg?:any):S|undefined;find(predicate:(value:T,index:number,obj:T[])=>unknown,thisArg?:any):T|undefined;findIndex(predicate:(value:T,index:number,obj:T[])=>unknown,thisArg?:any):number;fill(value:T,start?:number,end?:number):this;copyWithin(target:number,start:number,end?:number):this;}interface ArrayConstructor{from<T>(arrayLike:ArrayLike<T>):T[];from<T,U>(arrayLike:ArrayLike<T>,mapfn:(v:T,k:number)=>U,thisArg?:any):U[];of<T>(...items:T[]):T[];}interface DateConstructor{new(value:number|string|Date):Date;}interface Function{readonly name:string;}interface Math{clz32(x:number):number;imul(x:number,y:number):number;sign(x:number):number;log10(x:number):number;log2(x:number):number;log1p(x:number):number;expm1(x:number):number;cosh(x:number):number;sinh(x:number):number;tanh(x:number):number;acosh(x:number):number;asinh(x:number):number;atanh(x:number):number;hypot(...values:number[]):number;trunc(x:number):number;fround(x:number):number;cbrt(x:number):number;}interface NumberConstructor{readonly EPSILON:number;isFinite(number:unknown):boolean;isInteger(number:unknown):boolean;isNaN(number:unknown):boolean;isSafeInteger(number:unknown):boolean;readonly MAX_SAFE_INTEGER:number;readonly MIN_SAFE_INTEGER:number;parseFloat(string:string):number;parseInt(string:string,radix?:number):number;}interface ObjectConstructor{assign<T extends{},U>(target:T,source:U):T&U;assign<T extends{},U,V>(target:T,source1:U,source2:V):T&U&V;assign<T extends{},U,V,W>(target:T,source1:U,source2:V,source3:W):T&U&V&W;assign(target:object,...sources:any[]):any;getOwnPropertySymbols(o:any):symbol[];keys(o:{}):string[];is(value1:any,value2:any):boolean;setPrototypeOf(o:any,proto:object|null):any;}interface ReadonlyArray<T>{find<S extends T>(predicate:(this:void,value:T,index:number,obj:readonly T[])=>value is S,thisArg?:any):S|undefined;find(predicate:(value:T,index:number,obj:readonly T[])=>unknown,thisArg?:any):T|undefined;findIndex(predicate:(value:T,index:number,obj:readonly T[])=>unknown,thisArg?:any):number;}interface RegExp{readonly flags:string;readonly sticky:boolean;readonly unicode:boolean;}interface RegExpConstructor{new(pattern:RegExp|string,flags?:string):RegExp;(pattern:RegExp|string,flags?:string):RegExp;}interface String{codePointAt(pos:number):number|undefined;includes(searchString:string,position?:number):boolean;endsWith(searchString:string,endPosition?:number):boolean;normalize(form:"NFC"|"NFD"|"NFKC"|"NFKD"):string;normalize(form?:string):string;repeat(count:number):string;startsWith(searchString:string,position?:number):boolean;anchor(name:string):string;big():string;blink():string;bold():string;fixed():string;fontcolor(color:string):string;fontsize(size:number):string;fontsize(size:string):string;italics():string;link(url:string):string;small():string;strike():string;sub():string;sup():string;}interface StringConstructor{fromCodePoint(...codePoints:number[]):string;raw(template:{raw:readonly string[]|ArrayLike<string>},...substitutions:any[]):string;}`
};

export default fileData;