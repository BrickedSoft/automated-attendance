const File = (): JSX.Element => {
  const onSubmit = async (e: any) => {
    e.preventDefault()
    const file = e.target.file.files[0]

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + file.name.replaceAll(' ', '_')
    console.log(filename)
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="file" name="file" />
      </label>
      <button type="submit" value={'submit'}>
        Submit
      </button>
    </form>
  )
}

export default File
