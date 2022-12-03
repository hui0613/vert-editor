import type { ExtractPropTypes } from 'vue'
import { definePropType } from '@dew-editor/utils'
import { ajaxUpload } from './ajaxUpload'
export interface UploadRequestOptions {
  action: string
  method: string
  filename: string
  file: File
  onSuccess: (response: any) => void
  onError: (error: any) => void
}

export interface UploadHooks {
  onSuccess: (response: any) => void
  onError: (error: Error) => void
}

export const NOOP = (): void => undefined

export type UploadRequestHandler = (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>

export const uploadBaseProps = {
  action: {
    type: String,
    default: '#',
  },
  method: {
    type: String,
    default: 'post',
  },
  name: {
    type: String,
    default: 'file',
  },
  listType: {
    type: String,
    default: 'text',
  },
  httpRequest: {
    type: Function,
    default: ajaxUpload,
  },
  limit: Number,
} as const

export const uploadProps = {
  ...uploadBaseProps,
  onSuccess: {
    type: definePropType<UploadHooks['onSuccess']>(Function),
    default: NOOP,
  },
  onError: {
    type: definePropType<UploadHooks['onError']>(Function),
    default: NOOP,
  },
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
