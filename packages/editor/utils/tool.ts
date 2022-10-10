// import Clipboard from 'clipboard'

export function insertTextIntoEditor(ele: { [key: string]: any }, text: string) {
  ele.focus()
  const startPos = ele.selectionStart
  const endPos = ele.selectionEnd
  const tempValue = ele.value

  // 如果选中了一段文本，则会进行替换，如果没有选中的文本，则直接插入
  ele.value = tempValue.substring(0, startPos) + text + ' ' + tempValue.substring(endPos)
  ele.selectionStart = startPos + text.length + 1
  ele.selectionEnd = startPos + text.length + 1
}

export function isExistSelection(textareaDom: { [key: string]: any }) {
  return typeof textareaDom.selectionStart === 'number' && typeof textareaDom.selectionEnd === 'number'
}

export function copyTextToClipboard(className: string) {
  //
}

export function debounce(fn: any, delay: number, callback?: (args: any) => any): (args: any) => any {
  let timer: NodeJS.Timeout | null = null
  return function (this: any, args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    const _args = args
    timer = setTimeout(() => {
      const result = fn.call(this, _args)
      if (callback) {
        callback(result)
      }
    }, delay)
  }
}
