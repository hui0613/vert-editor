import { throwError } from '@dew-editor/utils'
import { UploadRequestHandler, UploadRequestOptions } from './upload'

const SCOPE = 'Upload'

export class UploadAjaxError extends Error {
  name = 'UploadAjaxError'
  status: number
  method: string
  url: string

  constructor(message: string, status: number, method: string, url: string) {
    super(message)
    this.status = status
    this.method = method
    this.url = url
  }
}

function getError(action: string, options: UploadRequestOptions, xhr: XMLHttpRequest) {
  let msg: string
  if (xhr.response) {
    msg = `${xhr.response.err || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to request ${options.method} ${options.action} ${xhr.status}`
  }
  return new UploadAjaxError(msg, xhr.status, options.method, action)
}

function getBody(xhr: XMLHttpRequest): XMLHttpRequestResponseType {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export const ajaxUpload: UploadRequestHandler = (options) => {
  if (typeof XMLHttpRequest === 'undefined') {
    throwError(SCOPE, 'XMLHttpRequest is undefined')
  }

  const xhr = new XMLHttpRequest()

  const formData = new FormData()

  formData.append(options.filename, options.file, options.file.name)

  xhr.addEventListener('error', () => {
    options.onError(getError(options.action, options, xhr))
  })
  xhr.addEventListener('load', (evt: any) => {
    if (xhr.status < 200 || xhr.status >= 300) {
      options.onError(getError(options.action, options, xhr))
      return
    }
    options.onSuccess(getBody(xhr))
  })

  xhr.open(options.method, options.action, true)

  xhr.send(formData)

  return xhr
}
