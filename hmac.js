
import { stringToArrayBuffer, arrayBufferToBase64, arrayBufferToHex } from './arrayBuffer'

/**
 * hmacSha1
 * @param {string} key 
 * @param {string} str 
 * @param {string} format base64 hex
 */
export async function hmacSha1(key, str, format) {
    const algorithm = { name: 'hmac', hash: { name: 'sha-1' } }

    const rawKey = stringToArrayBuffer(key)
    const cryptoKey = await window.crypto.subtle.importKey('raw', rawKey, algorithm, false, ['sign'])

    const data = stringToArrayBuffer(str)
    const sign = await window.crypto.subtle.sign(algorithm, cryptoKey, data)

    if (format === 'base64') {
        return arrayBufferToBase64(sign)
    }

    if (format === 'hex') {
        return arrayBufferToHex(sign)
    }

    return sign
}
