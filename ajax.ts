interface AjaxParams {
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    headers?: any,
    body?: Document | XMLHttpRequestBodyInit | null | undefined,
    responseType?: XMLHttpRequestResponseType,
    onprogress?: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any,
}

/**
 * ajax
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
 */
export function ajax({ url, method = 'GET', headers = {}, body = null, responseType = 'arraybuffer', onprogress }: AjaxParams) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = responseType

        if (onprogress) {
            xhr.onprogress = onprogress
            xhr.upload.onprogress = onprogress
        }

        xhr.onload = () => {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                resolve(xhr.response)
            } else {
                reject(xhr.status)
            }
        }

        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key])
        })
        xhr.send(body)
    })
}
