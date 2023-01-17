import { withInstall } from '@vert-editor/utils';
import editor from './src/index.vue'

const VertEditor = withInstall(editor)

export { VertEditor }
export default VertEditor