export function debounce(fn: any, delay: number) {
  let timer: number | null = null
  return function (this: any, args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    const _args = args
    timer = setTimeout(() => {
      fn.call(this, _args)
    }, delay)
  }
}
