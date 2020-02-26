import { hmacSha1 } from './hmac'

/**
 * https://fetch.spec.whatwg.org/#forbidden-header-name
 * md5 lib: https://github.com/emn178/js-md5
 */
export async function createOSSAuthHeaders({ method = 'GET', bucket, key = '', contentMD5 = '', contentType = 'application/octet-stream', cacheControl, accessKeyId, accessKeySecret }) {
    const date = new Date().toUTCString()

    const signContent = [
        method,
        contentMD5,
        contentType,
        date,
        `x-oss-date:${date}`,
        `/${bucket}/${key}`
    ].join('\n')
    const signature = await hmacSha1(accessKeySecret, signContent, 'base64')

    const headers = {
        // 'Date': date, //Date is A forbidden header name
        'x-oss-date': date,
        'Content-MD5': contentMD5,
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'Authorization': `OSS ${accessKeyId}:${signature}`
    }
    return headers
}

export async function createOBSAuthHeaders({ method = 'GET', bucket, key = '', contentMD5 = '', contentType = 'application/octet-stream', cacheControl, accessKeyId, accessKeySecret }) {
    const date = new Date().toUTCString()

    const signContent = [
        method,
        contentMD5,
        contentType,
        '',
        `x-obs-date:${date}`,
        `/${bucket}/${key}`
    ].join('\n')
    const signature = await hmacSha1(accessKeySecret, signContent, 'base64')

    const headers = {
        // 'Date': date, //Date is A forbidden header name
        'x-obs-date': date,
        'Content-MD5': contentMD5,
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'Authorization': `OBS ${accessKeyId}:${signature}`
    }
    return headers
}