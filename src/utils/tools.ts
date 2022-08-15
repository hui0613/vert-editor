export function debounce(fn: any, delay: number, callback?: (args: any) => any): (args: any) => any {
  let timer: number | null = null
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
