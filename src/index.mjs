

const [ MAP_CHAR, MAP_INDEX ] = (() => {
    return (
        [...`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`]
    ).reduce((result, char, value) => {
        result[0][char] = value;
        result[1][value] = char;
        return result;
    }, [ {}, {} ]);
})();

/**
 * 编码
 *
 * @param {Uint8Array} buffer - 需要编码的二进制数据
 * @return {String} - 返回base64编码
 * @public
 */
const encode = buffer => {
    if (!(buffer instanceof Uint8Array)) throw '[ encode ] buffer必须是Uint8Array';
    const pad = [, '==', '='][buffer.byteLength % 3] ?? '';
    const len =  Math.ceil(buffer.byteLength / 3);
    let index = 0, base64Bytes = [];
    while (index < len) {
        const [ a, b, c ] = buffer.slice(index * 3, index * 3 + 3);
        index++;
        if (b === undefined) {
            base64Bytes.push(
                a >>> 2,
                (a & 0x03) << 4
            );
            continue;
        }
        if (c === undefined) {
            base64Bytes.push(
                a >>> 2,
                (a & 0x03) << 4 | b >>> 4,
                (b & 0x0f) << 2
            );
            continue;
        }
        base64Bytes.push(
            a >>> 2,
            (a & 0x03) << 4 | b >>> 4,
            (b & 0x0f) << 2 | c >>> 6,
            c & 0x3f
        );
    }
    return base64Bytes.reduce(
        (result, bit6code) => result += MAP_INDEX[bit6code],
        ''
    ) + pad;
};

/**
 * 解码
 *
 * @param {String} base64 - 需要解码的base64编码
 * @return {Uint8Array} - 返回二进制数据
 * @public
 */
const decode = base64 => {
    if (typeof base64 !== 'string') throw '[ decode ] base64参数必须为字符串';
    const bytes = [];
    let i = 0;
    for (; i < base64.length; i++) {
        if (base64[i] === '=' && i < base64.length - 2) throw '[ decode ] pad符号位置不正确';
        if (base64[i] === '=') break;
        [
            v => bytes.push(v << 2),
            v => bytes.push(bytes.pop() | v >>> 4, v & 0x0f),
            v => bytes.push(bytes.pop() << 4 | v >>> 2, v & 0x03),
            v => bytes.push(bytes.pop() << 6 | v)
        ][i % 4](MAP_CHAR[base64[i]]);
    }
    return new Uint8Array(bytes.filter(byte => !!byte));
};

export {
    encode,
    decode
};