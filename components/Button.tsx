function Button({ message = "text here" }) {
  return (
    <button
      className="rounded-md shadow pb-4">
      <p
        className="inline-flex items-center justify-center px-5 py-3 border border-mwt text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600">
        {message}
      </p>
    </button>
  )
}

export default Button;
