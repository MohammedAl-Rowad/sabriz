import { useState } from 'react'
import TopNavigation from '../TopNavigation'
import 'codemirror/lib/codemirror.css'
import { useMount } from 'react-use'
import 'codemirror/theme/nord.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/keymap/sublime'
import CodeMirror, { EditorFromTextArea } from 'codemirror'
import { dataFromHost, useStore } from '../../store'
import { STATUS } from '../../constants'

declare var brython: () => void

type MODE = CodeMirror.Mode<'python' | 'javascript'>

const ContentContainer = () => {
  const [editor, setEditor] = useState<EditorFromTextArea | null>(null)
  const allDataFromHost = useStore(dataFromHost)
  const testCases = allDataFromHost?.question?.testCases

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

  // [1,2,3,4]@3@21
  const runCode = () => {
    const code = editor?.getValue()
    if (code) {
      ;(window as any).soulz = 1111
      // console.log({ testCases, code })
      const mode: MODE = editor?.getMode() as MODE
      const answers: boolean[] = []
      // const testCasez: any = [
      //   { input: '1', output: '1' },
      //   { input: '1', output: '1' },
      //   { input: '1', output: '1' },
      //   { input: '1', output: '1' },
      // ]
      testCases?.forEach(({ input, output }: any, index: number) => {
        const args = input?.split('@').join(',')
        const invoke = `soul(${args})`

        if (mode.name === 'javascript') {
          const codeToRun = `\n ${code}; \n ${invoke}`
          const res = eval(codeToRun)
          if (isNaN(+res) ? +res === output : res === output) {
            answers.push(true)
          } else {
            answers.push(false)
          }
        } else {
          // KING OF HABED!
          ;(document.getElementById('rowadz') as HTMLElement).innerHTML = code
          ;(document.getElementById('rowadz') as HTMLElement).append(
            `\nfrom browser import document\nanswerz = ${invoke}\nel = document.createElement('input')\nel.className = 'hidden answerz'\nel.setAttribute('value', answerz)\ndocument['bodyz'].appendChild(el)`
          )
          brython()
          const input = document.querySelectorAll('.answerz')[index]
          const res = input?.getAttribute('value') as string
          if (isNaN(+res) ? +res === output : res === output) {
            answers.push(true)
          } else {
            answers.push(false)
          }
        }
      })
      const event = new CustomEvent<any>(STATUS, {
        detail: { completed: answers.every((bool) => bool) },
      } as CustomEventInit<any>)
      document.dispatchEvent(event)
      document.querySelectorAll('.answerz').forEach((el) => el.remove())
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
          defaultChecked
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
