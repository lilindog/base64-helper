import {decode, encode} from '../src/index.mjs';
import { utf16toUtf8 } from "../src/helper.mjs";
import { writeFile } from "fs";

function string2utf8Base64 (str = "") {
    const buffer = string2utf16(str);
    const utf8 = utf16toUtf8(buffer);
    const base64 = encode(utf8);
    return base64;
}

function string2utf16 (str = "") {
    return new Uint8Array(
        [...str].reduce((res, c) => {
            const code = c.charCodeAt(0);
            res.push(code >>> 8, code & 0xff);
            return res;
        }, [])
    );
}

const svg  = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <text x="0" y="15" fill="red" transform="rotate(30 20,40)">HELLO LILIN</text>
</svg>`;
// const svg  = `<>><
//
// <>`;

// data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSI+DQogICAgPHRleHQgeD0iMCIgeT0iMTUiIGZpbGw9InJlZCIgdHJhbnNmb3JtPSJyb3RhdGUoMzAgMjAsNDApIj5IRUxMTyBMSUxJTjwvdGV4dD4NCjwvc3ZnPg==
// console.log(svg[50], svg[51], svg[52], svg[53], svg[54], svg[55]);
console.log(svg.split(''));
console.log(
    // "data:image/svg+xml;base64," +
    string2utf8Base64(svg)
);
console.log(Buffer.from(svg).toString('base64'));

// const d1 = utf16toUtf8(string2utf16(svg));
// const d2 = [...Buffer.from(svg)].map(code => code.toString(10));
//
// writeFile('out.json', d1.valueOf() + '\n' + d2.valueOf(), err => {
//     console.log(err);
// });
