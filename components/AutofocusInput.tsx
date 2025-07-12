import React, { useEffect, useRef } from "react"

export default function AutofocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
          メールアドレス：
        </label>
        <input
          ref={inputRef}
          id="email"
          type="email"
          placeholder="your@email.com"
          className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 placeholder-gray-400"
        />
      </div>
    </div>
  )
}