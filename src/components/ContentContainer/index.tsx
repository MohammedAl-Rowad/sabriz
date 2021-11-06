import { useState } from 'react'
import TopNavigation from '../TopNavigation'
import 'codemirror/lib/codemirror.css'
import { useMount } from 'react-use'
import 'codemirror/theme/nord.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/keymap/sublime'
import '@codemirror/autocomplete'
import CodeMirror, { EditorFromTextArea } from 'codemirror'

declare var brython: () => void

const ContentContainer = () => {
  const [editor, setEditor] = useState<EditorFromTextArea | null>(null)

  useMount(() => {
    const editor: EditorFromTextArea = CodeMirror.fromTextArea(
      document.getElementById('code-editor') as HTMLTextAreaElement,
      {
        lineNumbers: true,
        keyMap: 'sublime',
        theme: 'nord',
        mode: 'python',
      }
    )

    setEditor(editor)
  })

  const runCode = () => {
    const code = editor?.getValue()
    if (code) {
      ;(document.getElementById('rowadz') as HTMLElement).innerHTML = code
      // comes from cdn
      brython()
      // eval(code)
    }
  }

  return (
    <div className="content-container h-screen w-full overflow-auto">
      <TopNavigation />
      <label className="inline-flex items-center dark:text-white">
        <input
          onClick={() => {
            editor?.setOption('mode', 'python')
          }}
          type="radio"
          className="form-radio text-green-500"
          name="radio"
          value="python"
          checked
        />
        <span className="ml-2">Python</span>
      </label>
      <label className="inline-flex items-center dark:text-white">
        <input
          onClick={() => {
            editor?.setOption('mode', 'javascript')
          }}
          type="radio"
          className="form-radio text-green-500"
          name="radio"
          value="javascript"
        />
        <span className="ml-2">JavaScript</span>
      </label>
      <textarea id="code-editor" />
      <button
        onClick={runCode}
        className="w-1/4 bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
      >
        Run Code
      </button>
    </div>
  )
}

export default ContentContainer
