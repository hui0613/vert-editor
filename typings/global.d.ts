declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DewEditor: typeof import('dew-editor')['dewEditor']
  }
}
