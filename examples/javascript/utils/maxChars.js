/**
 * @name 字符数
 * @param {string} str
 */
 export function getCharsCount(str /* string */) {
    if (typeof str !== 'string') return 0;

    let count = 0;
    for (const txt of str) {
        if (txt.charCodeAt(0) > 255) count += 2 // 中文
        else count++
    }

    return count
}

/**
 * @name 最大字符数
 * @param {string} str
 */
export default (str, max) => {
    if (typeof str !== 'string') return false;
    if (max === undefined) return false;

    const conunt = getCharsCount(str);
    return conunt > max
}