import { nextTick } from 'vue'
import type { VNode } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from '../src/index.vue'

describe('button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button />)

    expect(wrapper.classes()).toContain('vert-button-container')
  })
})
