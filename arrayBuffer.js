
// concat arrayBuffer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set
export function concat(a, b) {
    const out = new Uint8Array(a.byteLength + b.byteLength)
    out.set(new Uint8Array(a))
    out.set(new Uint8Array(b), a.byteLength)
    return out.buffer
}

/**
 * ArrayBuffer <==> UTF-8
 */

// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
const encoder = new TextEncoder()
export function stringToArrayBuffer(str) {
    const uint8 = encoder.encode(str)
    return uint8.buffer
}

// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
const decoder = new TextDecoder()
export function arrayBufferToString(buf) {
    return decoder.decode(buf)
}

/**
 * ArrayBuffer <==> Base64
 */

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
export function base64ToArrayBuffer(base64) {
    const latin = atob(base64)
    // utf16 <==> latin1
    return Uint8Array.from(latin, c => c.charCodeAt(0))
}

export function arrayBufferToBase64(buf) {
    const latin = String.fromCharCode.apply(null, new Uint8Array(buf))
    return btoa(latin)
}

/**
 * ArrayBuffer <==> Hex
 */

export function arrayBufferToHex(buf) {
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}
