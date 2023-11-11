import { useDropzone } from 'react-dropzone'
import { Upload } from './Icons'

const ImageSelect = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': [],
      'image/svg': []
    }
  })

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.name}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ))

  console.log(acceptedFiles)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-[auto_1fr] gap-12 items-center">
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
          placeholder="john.doe@company.com"
          required
        />
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-light-blue-ff/10"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG or JPG</p>
          </div>
          <input {...getRootProps()} {...getInputProps()} id="dropzone-file" className="hidden" />
        </label>
      </div>
    </div>
  )
}

export default ImageSelect
