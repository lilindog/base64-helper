/**
 * utf16BE BMP 转utf8
 * 注意，不处理BMP以上的字符，代理区会报错
 *
 * @param {Uint8Array} bytes - utf16be字节块
 * @return {Uint8Array} - utf8字节块
 * @public
 */
export function utf16toUtf8 (bytes) {
    if (!(bytes instanceof Uint8Array)) throw '[ utf16toUtf8 ] bytes 必须为Uint8二进制数据';
    const utf8 = [];
    let i = 0;
    for (; i < bytes.byteLength; i += 2) {
        const [ a, b ] = bytes.slice(i, i + 2);
        const byte = a << 8 | b;
        if (byte < 0x80) {
            utf8.push(byte);
            continue;
        }
        if (byte < 0x800) {
            utf8.push(
                0xc0 | byte >>> 6,
                byte | 0x3f
            );
            continue;
        }
        if (byte < 0xd800 || byte > 0xdfff) {
            utf8.push(
                0xe0 | byte >>> 12,
                (byte >>> 6 & 0x3f) | 0x80,
                byte & 0x3f | 0x80
            );
            continue;
        }
        throw `[ utf16toUtf8 ] 支持支UTF16BE,且不支持BMP以上的字符`;
    }
    return new Uint8Array(utf8);
}