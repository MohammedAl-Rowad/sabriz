import { memo, useCallback } from 'react'
import { AiOutlineClose, AiFillDelete } from 'react-icons/ai'
import { useList, useMount } from 'react-use'
import { RxDatabase } from 'rxdb'
import { createAvatar } from '@dicebear/avatars'
import { MAIN_COLLECTION, SIGNAL_CODE } from '../../constants'
import { getDB, useStore } from '../../store'
import { useDebouncedCallback } from 'use-debounce'
import * as style from '@dicebear/avatars-identicon-sprites'
import { ToastContainer } from 'react-toastify'
import useDarkMode from '../../hooks/useDarkMode'

export interface CodeQuestionListInterface {
  onCodeListToggle: () => void
}

// onCodeListToggle={onCodeListToggle}

const CodeQuestionList = ({ onCodeListToggle }: CodeQuestionListInterface) => {
  const db: RxDatabase = useStore(getDB) as RxDatabase
  // TODO:: create type
  const [questionsList, { set, filter }] = useList<any[]>()
  const getQuestions = useCallback(() => {
    db.collections[MAIN_COLLECTION].find()
      .exec()
      .then((documents) => documents.map((doc) => doc.toJSON()))
      .then((list) => set(list))
  }, [db.collections, set])
  const filterQuestionsDebounced = useDebouncedCallback(
    ({ target: { value } }) => {
      if (!value) {
        // can't use the reset from useList here
        getQuestions()
      } else {
        filter(({ title }: any) =>
          title.toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    200
  )

  useMount(getQuestions)
  const [enabled] = useDarkMode()

  const onDelete = async (id: string) => {
    const { toast } = await import('react-toastify')
    db.collections[MAIN_COLLECTION].findOne(id)
      .remove()
      .then(getQuestions)
      .then(() => {
        toast.success('SOFT DELETED!', { theme: enabled ? 'dark' : 'light' })
      })
      .catch(() => {
        toast.error('Something went wrong while deleting', {
          theme: enabled ? 'dark' : 'light',
        })
      })
  }

  const singleOtherPeerAboutQuestion = (question: any) => {
    const event = new CustomEvent<any>(SIGNAL_CODE, {
      detail: { question },
    } as CustomEventInit<any>)
    document.dispatchEvent(event)
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
          onClick={onCodeListToggle}
        >
          <AiOutlineClose size="28" />
        </div>
      </div>
      <h2 className="text-3xl text-white">All the created questions</h2>
      <section className="border-dashed h-20 p-1">
        <input
          type="text"
          placeholder="filter"
          onChange={filterQuestionsDebounced}
          className="w-full h-full shadow appearance-none border rounded text-5xl dark:bg-gray-900 dark:text-white"
        />
      </section>
      <section className="grid grid-cols-3 gap-1">
        {questionsList?.map(({ title, id, testCases, ...other }: any) => {
          return (
            <div key={id}>
              <div className="flex justify-end mr-5 h-5 mb-2">
                <div
                  className="sidebar-icon margin ml-0 mr-0"
                  onClick={() => onDelete(id)}
                >
                  <AiFillDelete size="28" className="text-red-400" />
                </div>
              </div>
              <div className="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
                <div className="mb-8">
                  <img
                    className="object-center object-cover rounded-full h-36 w-36"
                    src={createAvatar(style, {
                      seed: title,
                      dataUri: true,
                      // ... and other options
                    })}
                    alt={title}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xl text-white font-bold mb-2">{title}</p>
                  <div className="flex justify-center items-center m-1 font-medium py-1 px-2  rounded-full text-white border border-green-300 ">
                    <div className="text-xs font-normal leading-none max-w-full flex-initial">
                      Test Cases Count {testCases.length}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    singleOtherPeerAboutQuestion({
                      ...other,
                      id,
                      title,
                      testCases,
                    })
                  }
                  className="w-3/6 mt-4	bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  Send to the other peer to solve
                </button>
              </div>
            </div>
          )
        })}

        {/* <section className="border-dashed border-2 border-light-blue-500 p-1 overflow-auto"></section> */}
        {/* <section className="border-dashed border-2 border-light-blue-500 p-1 overflow-auto"></section> */}
      </section>
    </div>
  )
}

export default memo(CodeQuestionList)
