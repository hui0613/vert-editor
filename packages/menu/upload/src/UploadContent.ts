import { definePropType } from '@dew-editor/utils'
import { NOOP, uploadBaseProps } from './upload'

export const uploadContentProps = {
  ...uploadBaseProps,
  handlerSuccess: {
    type: definePropType<(response: any) => void>(Function),
    default: NOOP,
  },
  handlerError: {
    type: definePropType<(error: any) => void>(Function),
    default: NOOP,
  },
}
