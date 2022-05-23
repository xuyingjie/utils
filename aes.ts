/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
 */

import { stringToArrayBuffer } from './arrayBuffer'

const algorithm = 'AES-GCM'

/**
 * encrypt
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
 * @param {string} passwd 
 * @param {arrayBuffer} data 
 */
export async function encrypt(passwd: string, data: ArrayBuffer) {
    const key = await importKey(passwd)

    // https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
    // never reuse an IV with the same key
    // The AES-GCM specification recommends that the IV should be 96 bits long, and typically contains bits from a random number generator. 
    // Note that the IV does not have to be secret, just unique: so it is OK, for example, to transmit it in the clear alongside the encrypted message.
    const iv = window.crypto.getRandomValues(new Uint8Array(12))

    // key: from generateKey or importKey above
    // data: ArrayBuffer of data you want to encrypt
    // returns an ArrayBuffer containing the encrypted data
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: algorithm,
            iv,
        },
        key,
        data,
    )
    return {
        iv: iv.buffer,
        data: encrypted,
    }
}

/**
 * decrypt
 * @param {string} passwd 
 * @param {arrayBuffer} iv 
 * @param {arrayBuffer} data 
 */
export async function decrypt(passwd: string, iv: ArrayBuffer, data: ArrayBuffer) {
    const key = await importKey(passwd)
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: algorithm,
            iv,
        },
        key,
        data,
    )
    return decrypted
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
async function importKey(passwd: string) {
    // This must be one of: 128, 192, or 256
    const rawKey = stringToArrayBuffer(passwd)
    return await window.crypto.subtle.importKey(
        'raw',
        rawKey,
        algorithm,
        false,
        ['encrypt', 'decrypt']
    )
}

export async function generateKey() {
    const key = await window.crypto.subtle.generateKey(
        {
            name: algorithm,
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    )

    // result is a Promise that fulfills with an ArrayBuffer containing the key in the requested export format.
    const result = await window.crypto.subtle.exportKey(
        "raw",
        key,
    )
    return result
}
