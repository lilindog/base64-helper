import { encode } from '../src/index.mjs';

const str = 'abcd';

const buffer = new Uint8Array([...str].reduce((result, char) => {
    result.push(char.charCodeAt());
    return result;
}, []));

const base64code = encode(buffer);

console.log(base64code);