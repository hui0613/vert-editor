import { UploadProps } from './upload'
export const useHandler = (props: UploadProps) => {
  const handlerSuccess = (res: any) => {
    props.onSuccess(res)
  }

  const handlerError = (res: any) => {
    props.onError(res)
  }

  return {
    handlerError,
    handlerSuccess,
  }
}
