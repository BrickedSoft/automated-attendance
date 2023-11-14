import { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { button } from '@renderer/assets/data/form'
import { Upload } from './Icons'
import { UserContextType, UserStore } from '@renderer/types/user'
import { UserContext } from '@renderer/context/UserContext'
import { fields } from '@renderer/assets/data/form'

const ImageSelect = () => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const [name, setName] = useState<string>('')
  const [studentId, setStudentId] = useState<number>()
  const { addUsers } = useContext(UserContext) as UserContextType
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': [],
      'image/svg': []
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userStore: UserStore = {
      name,
      studentId: studentId as number,
      images: files.map((file) => file.path)
    }

    /* ----------------- getting newly created user on callback ----------------- */

    button.add.onClick(userStore).then((user) => addUsers([user]))

    /* ---------------------------- Resetting Fields ---------------------------- */
    setName('')
    setStudentId(undefined)
    setFiles([])
  }

  const preview = files.map((file) => {
    const calculateSize = (size: number) => {
      const kb = size / 1024
      if (kb < 1024) return `${kb.toFixed(0)} KB`
      else return `${(kb / 1024).toFixed(0)} MB`
    }

    return (
      <div
        className="inline-flex rounded-[4px] border-[#eaeaea] w-24 h-24 overflow-hidden"
        key={file.name}
      >
        <div className="relative flex flex-col">
          <img
            src={file.preview}
            className="block w-auto h-full object-cover"
            onLoad={() => {
              URL.revokeObjectURL(file.preview)
            }}
          />
          <div className="absolute w-full flex justify-center bottom-0 left-2/4 -translate-x-2/4 backdrop-blur-sm py-1 px-0.5">
            <p className="text-white text-xs">{calculateSize(file.size)}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <form
      className="flex flex-col gap-12 justify-center items-center px-16 py-12 rounded-lg border border-gray-300"
      onSubmit={onSubmit}
    >
      <div className="w-full flex gap-16">
        <div className="w-full self-start grid grid-cols-[auto_1fr] gap-6 items-center">
          <label htmlFor={fields.name.name} className="block text-sm font-medium text-gray-900">
            {fields.name.label}
          </label>
          <input
            type={fields.name.type}
            id={fields.name.name}
            name={fields.name.name}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
            placeholder={fields.name.placeholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={fields.name.required}
          />
        </div>

        <div className="w-full self-start grid grid-cols-[auto_1fr] gap-6 items-center">
          <label htmlFor={fields.id.name} className="block text-sm font-medium text-gray-900">
            {fields.id.label}
          </label>
          <input
            type={fields.id.type}
            id={fields.id.name}
            name={fields.id.name}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
            placeholder={fields.id.placeholder}
            value={studentId ?? ''}
            onChange={(e) => setStudentId(Number(e.target.value))}
            required={fields.id.required}
          />
        </div>
      </div>

      {/* -------------------------------- Dropzone -------------------------------- */}

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full min-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-light-blue-ff/10 py-6 px-9"
        >
          {files.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <Upload />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG or JPG</p>
            </div>
          )}

          <aside className="flex flex-wrap gap-4">{preview}</aside>
          <input {...getRootProps()} {...getInputProps()} id="dropzone-file" className="hidden" />
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-light-blue-ff hover:bg-light-blue-b3 focus:ring-4 focus:outline-none focus:ring-light-blue-ff/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center dark:focus:ring-light-blue-ff/55 transition duration-300"
      >
        <div className="p-0.25 rounded-full bg-white">{button.add.icon}</div>
        {button.add.title}
      </button>
    </form>
  )
}

export default ImageSelect
