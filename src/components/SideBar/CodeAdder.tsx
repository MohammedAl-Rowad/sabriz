import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { v4 } from 'uuid'
import defaultVal from './defaultMarkDown'
import { useStore, getDB } from '../../store'
import { MAIN_COLLECTION } from '../../constants'
import { RxDatabase } from 'rxdb'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './yupCodeAdderSchema'
import clsx from 'clsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import useDarkMode from '../../hooks/useDarkMode'
import MarkDown from '../common/MarkDown'

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

  const [markdown, setMarkDown] = useState(defaultVal)
  const db: RxDatabase = useStore(getDB) as RxDatabase

  const [enabled] = useDarkMode()

  const onSubmit = async (data: any) => {
    const [{ toast }] = await Promise.all([import('react-toastify')])
    toast('Created!', { theme: enabled ? 'dark' : 'light' })
    db.collections[MAIN_COLLECTION].insert({
      id: v4(),
      ...data,
    })
      .then((s) => {
        return db.collections[MAIN_COLLECTION].findOne(
          '50125ddf-e412-4277-a46b-f18ea6adb06f'
        ).exec()
      })
      .then(console.log)
      .catch(console.error)
  }

  return (
    <div className="w-screen bg-white dark:bg-gray-900 overflow-auto pl-32 pr-32">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-end mr-5 h-5 mb-2">
        <div
          className="sidebar-icon margin ml-0 mr-0"
          onClick={toogleCodeAdderOpen}
        >
          <AiOutlineClose size="28" />
        </div>
      </div>
      <h2
        className={clsx('text-3xl', {
          'text-white': !!!errors?.title,
          'text-red-600': !!errors?.title,
        })}
      >
        Enter Question Title
      </h2>
      <section
        className={clsx(
          'border-dashed border-2 border-light-blue-500 h-20 p-1',
          { 'border-red-600': !!errors?.title }
        )}
      >
        <input
          {...register('title')}
          type="text"
          className="w-full h-full shadow appearance-none border rounded text-5xl dark:bg-gray-900 dark:text-white"
        />
      </section>
      <h2
        className={clsx('text-3xl', {
          'text-white': !!!errors?.markdown,
          'text-red-600': !!errors?.markdown,
        })}
      >
        Enter Question Text
      </h2>
      <section className="grid grid-cols-2 gap-1">
        <section className="border-dashed border-2 border-light-blue-500  p-1">
          <textarea
            {...register('markdown')}
            value={markdown}
            onChange={({ target: { value } }) => {
              setMarkDown(value)
            }}
            className="p-1 w-full h-full shadow appearance-none border rounded dark:bg-gray-900 dark:text-white border-green-500"
          />
        </section>
        <section className="border-dashed border-2 border-light-blue-500 p-1 overflow-auto">
          <MarkDown markdown={markdown} />
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
      <section className="grid grid-cols-1 gap-1 mt-1 mb-1">
        <button
          onClick={() => {
            append({ input: '', output: '' })
          }}
          className="w-1/4 bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
          Add Input/Output
        </button>
      </section>
      <section className="grid grid-cols-1 gap-1 mt-1 mb-1">
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-1/4 bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
          Save
        </button>
      </section>
    </div>
  )
}

export default CodeAdder
