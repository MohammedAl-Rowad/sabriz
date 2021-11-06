import TopNavigation from '../TopNavigation'
import 'codemirror/lib/codemirror.css'
import { useMount } from 'react-use'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from 'codemirror'

const ContentContainer = () => {
  useMount(() => {
    const editor = CodeMirror.fromTextArea(
      document.getElementById('code-editor') as HTMLTextAreaElement,
      {
        lineNumbers: true,
        keyMap: 'sublime',
        theme: 'material-ocean',
        mode: 'javascript',
      }
    )
  })

  return (
    <div className="content-container h-screen w-full overflow-auto">
      <TopNavigation />
      <textarea id="code-editor" />
    </div>
  )
}

export default ContentContainer
