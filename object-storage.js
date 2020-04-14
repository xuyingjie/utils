import { hmacSha1 } from './hmac'

/**
 * https://fetch.spec.whatwg.org/#forbidden-header-name
 * md5 lib: https://github.com/emn178/js-md5
 */
export async function createOSSAuthHeaders({ method = 'GET', bucket, key = '', contentMD5 = '', contentType = 'application/octet-stream', acl = 'private', accessKeyId, accessKeySecret }) {
    const date = new Date().toUTCString()

    const signContent = [
        method,
        contentMD5,
        contentType,
        date,
        `x-oss-date:${date}`,
        `x-oss-object-acl:${acl}`,
        `/${bucket}/${key}`
    ].join('\n')
    const signature = await hmacSha1(accessKeySecret, signContent, 'base64')

    const headers = {
        // 'Date': date, //Date is A forbidden header name
        'x-oss-date': date,
        'x-oss-object-acl': acl,
        'Content-MD5': contentMD5,
        'Content-Type': contentType,
        'Authorization': `OSS ${accessKeyId}:${signature}`
    }
    return headers
}

export async function createOBSAuthHeaders({ method = 'GET', bucket, key = '', contentMD5 = '', contentType = 'application/octet-stream', acl = 'private', accessKeyId, accessKeySecret }) {
    const date = new Date().toUTCString()

    const signContent = [
        method,
        contentMD5,
        contentType,
        '',
        `x-obs-acl:${acl}`,
        `x-obs-date:${date}`,
        `/${bucket}/${key}`
    ].join('\n')
    const signature = await hmacSha1(accessKeySecret, signContent, 'base64')

    const headers = {
        // 'Date': date, //Date is A forbidden header name
        'x-obs-acl': acl,
        'x-obs-date': date,
        'Content-MD5': contentMD5,
        'Content-Type': contentType,
        'Authorization': `OBS ${accessKeyId}:${signature}`
    }
    return headers
}
