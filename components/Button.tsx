export default function Button({ buttonText = "button text here" }) {
  return (
    <button
      className="rounded-md shadow">
      <p
        className="inline-flex items-center justify-center px-5 py-3 border border-mwt text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-500">
        {buttonText}
      </p>
    </button>
  )
}
