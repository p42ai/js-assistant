const fileData = {
    fileName: `/lib.es2022.sharedmemory.d.ts`,
    // File text is copyright Microsoft Corporation and is distributed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
    text: `/// <reference no-default-lib="true"/>\ninterface Atomics{waitAsync(typedArray:BigInt64Array|Int32Array,index:number,value:bigint,timeout?:number):{async:false,value:"ok"|"not-equal"|"timed-out"}|{async:true,value:Promise<"ok"|"not-equal"|"timed-out">};}`
};

export default fileData;