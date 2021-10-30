import { useState, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import ReactMarkdown from 'react-markdown'
import { v4 } from 'uuid'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import defaultVal from './defaultMarkDown'
import { useStore, getDB } from '../../store'
import { MAIN_COLLECTION } from '../../constants'
import { RxDatabase } from 'rxdb'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './yupCodeAdderSchema'
import clsx from 'clsx'

const CodeAdder = ({ toogleCodeAdderOpen }: any) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const { fields, append } = useFieldArray({
    control,
    name: 'testCases',
  })

  console.log(fields)

  const [markdown, setMarkDown] = useState(defaultVal)
  const markDownTextAreaRef = useRef(null)
  const titleRef = useRef(null)
  const db: RxDatabase = useStore(getDB) as RxDatabase
  const onSave = () => {
    if (markDownTextAreaRef.current && titleRef.current) {
      console.log(db.collections[MAIN_COLLECTION])
      db.collections[MAIN_COLLECTION].insert({
        id: v4(),
        title: (titleRef.current as any)?.value as any,
        markdown: (markDownTextAreaRef.current as any)?.value,
        testCases: [{ input: 'fak', output: 'fak' }],
      })
        .then((s) => {
          return db.collections[MAIN_COLLECTION].findOne(
            '50125ddf-e412-4277-a46b-f18ea6adb06f'
          ).exec()
        })
        .then(console.log)
        .catch(console.error)
    }
  }
  // console.log(errors)
  const onSubmit = (data: any) => {
    console.log({data})
  }

  return (
    <div className="w-screen bg-white dark:bg-gray-900 overflow-auto pl-32 pr-32">
      <div className="flex justify-end mr-5 h-5 mb-2">
        <div
          className="sidebar-icon margin ml-0 mr-0"
          onClick={toogleCodeAdderOpen}
        >
          <AiOutlineClose size="28" />
        </div>
      </div>
      <h2 className="text-3xl dark:text-white">Enter Question Title</h2>
      <section className="border-dashed border-2 border-light-blue-500 h-20 p-1">
        <input
          {...register('title')}
          // ref={titleRef}
          type="text"
          className="w-full h-full shadow appearance-none border rounded text-5xl dark:bg-gray-900 dark:text-white"
        />
      </section>
      <h2 className="text-3xl dark:text-white">Enter Question Text</h2>
      <section className="grid grid-cols-2 gap-1">
        <section className="border-dashed border-2 border-light-blue-500  p-1">
          <textarea
            {...register('markdown')}
            // ref={markDownTextAreaRef}
            value={markdown}
            onChange={({ target: { value } }) => {
              setMarkDown(value)
            }}
            className="w-full h-full shadow appearance-none border rounded dark:bg-gray-900 dark:text-white"
          />
        </section>
        <section className="border-dashed border-2 border-light-blue-500 p-1 overflow-auto">
          <ReactMarkdown
            className="dark:bg-gray-900 dark:text-white max-h-screen"
            children={markdown}
            remarkPlugins={[remarkGfm]}
            components={{
              h1({ node, ...props }) {
                return <h1 className="text-4xl" {...props} />
              },
              h2({ node, ...props }) {
                return <h2 className="text-3xl" {...props} />
              },
              h3({ node, ...props }) {
                return <h3 className="text-2xl" {...props} />
              },
              h4({ node, ...props }) {
                return <h4 className="text-xl" {...props} />
              },
              h5({ node, ...props }) {
                return <h5 className="text-lg" {...props} />
              },
              h6({ node, ...props }) {
                return <h6 className="text-base" {...props} />
              },
              a({ node, ...props }) {
                return <a className="underline text-blue-400" {...props} />
              },
              code({ node, inline, className, children, ref, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={nord}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          />
        </section>
      </section>
      {fields.map((field, index) => (
        <section className="grid grid-cols-2 gap-1 mt-5 mb-5" key={field.id}>
          <input
            className={clsx(
              'w-full h-full shadow appearance-none border rounded text-5xl dark:bg-gray-900 dark:text-white',
              { 'border-red-600': !!errors?.testCases?.[index]?.input }
            )}
            {...register(`testCases.${index}.input`)}
            placeholder="Input"
          />
          <input
            className={clsx(
              'w-full h-full shadow appearance-none border rounded text-5xl dark:bg-gray-900 dark:text-white',
              { 'border-red-600': !!errors?.testCases?.[index]?.output }
            )}
            {...register(`testCases.${index}.output`)}
            placeholder="Output"
          />
        </section>
      ))}
      <button
        onClick={() => {
          append({ input: '', output: '' })
        }}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Add Input/Output
      </button>
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Save
      </button>
    </div>
  )
}

export default CodeAdder
