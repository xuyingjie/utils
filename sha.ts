import { stringToArrayBuffer, arrayBufferToHex } from './arrayBuffer'

type AlgorithmType = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

/**
 * sha
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 * @param {string} str 
 * @param {string} algorithm SHA-1 SHA-256 SHA-384 SHA-512
 */
export async function sha(str: string, algorithm: AlgorithmType = 'SHA-256') {
    const uint8 = stringToArrayBuffer(str)
    const buf = await window.crypto.subtle.digest(algorithm, uint8)
    return arrayBufferToHex(buf)
}
