import hljs from 'highlight.js'

export const vHighlight = {
  mounted: (el: Element) => {
    updateLighlight(el)
  },
  updated: (el: Element) => {
    updateLighlight(el)
  }
}

function updateLighlight(el: Element) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block: any) => {
    hljs.highlightElement(block)
  })
}