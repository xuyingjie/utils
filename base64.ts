import {
    stringToArrayBuffer,
    arrayBufferToString,
    base64ToArrayBuffer,
    arrayBufferToBase64,
} from './arrayBuffer'

/**
 * btoa
 * utf-8 support
 * @param {string} str stringToEncode
 */
function btoa(str: string) {
    return arrayBufferToBase64(stringToArrayBuffer(str))
}

/**
 * atob
 * @param {string} base64 encodedData
 */
function atob(base64: string) {
    return arrayBufferToString(base64ToArrayBuffer(base64))
}

export default {
    btoa, atob
}
