import useLocalStorage from './useLocalStorage'

const NewTab = () => {
  const [generatedLinks, setGeneratedLinks] = useLocalStorage('generatedLinks', [])

  function clearGeneratedLinks() {
    setGeneratedLinks([])
  }

  const parseLink = (link: string) => {
    console.log('url: ', link)
    const urlObj = new URL(link)
    return urlObj
  }

  return (
    <div className="flex flex-col items-start w-3/4 m-auto gap-6">
      <h1 className="text-4xl font-bold">Branch Link Generator</h1>
      <button
        onClick={clearGeneratedLinks}
        className="bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
        Clear All Links
      </button>
      <table className="text-sm text-left rtl:text-right text-black w-full">
        <thead className="text-xs text-black uppercase bg-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Markets
            </th>
            <th scope="col" className="px-6 py-3">
              Campaign
            </th>
            <th scope="col" className="px-6 py-3">
              Tags
            </th>
            <th scope="col" className="px-6 py-3">
              Branch Link
            </th>
          </tr>
        </thead>
        <tbody>
          {generatedLinks.map(link => (
            <tr className="even:bg-white odd:bg-gray-100">
              <th className="px-6 py-4 font-medium text-black whitespace-nowrap">{link.title}</th>
              <td className="px-6 py-4">{link.eventNames}</td>
              <td className="px-6 py-4">{parseLink(link.link).searchParams.getAll('campaign')}</td>
              <td className="px-6 py-4">{parseLink(link.link).searchParams.getAll('tags')}</td>
              <td className="px-6 py-4">
                <a className="text-blue-600 font-bold" href={link.link}>
                  Preview
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NewTab
