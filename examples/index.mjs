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

const svg  = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300">
    <text x="0" y="15" fill="red" transform="rotate(30 20,40)">HELLO LILIN 你好黎林 9876</text>
</svg>
`;

const base64Head = "data:image/svg+xml;base64,";
console.log(
    base64Head + string2utf8Base64(svg)
);
// console.log(base64Head + Buffer.from(svg).toString('base64'));
