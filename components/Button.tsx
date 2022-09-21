export function Button({ btnText = "button text here", btnClasses =  ''}) {
  return (
    <button 
      className="rounded-md shadow">
      <p
        className={`inline-flex items-center justify-center px-5 py-3 border border-mwt text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-500 ${btnClasses}`}>
        {btnText}
      </p>
    </button>
  )
}

// @TODO how do I place the below word "disabled" via a function param?

export function ButtonDisabled({ btnText = "button text here", btnClasses =  ''}) {
  return (
    <button 
      className="rounded-md shadow" disabled>
      <p
        className={`inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-500 cursor-not-allowed focus:outline-none opacity-50 ${btnClasses}`}>
        {btnText}
      </p>
    </button>
  )
}
