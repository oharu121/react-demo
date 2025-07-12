import React, { useRef, useState } from "react"

export default function ClickOutsideModal() {
  const [open, setOpen] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpen(false)
    }
  }

  const handleOpen = () => setOpen(true)

  if (!open)
    return (
      <button
        onClick={handleOpen}
        className="px-6 py-3 text-base rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        モーダルを開く
      </button>
    )

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        ref={modalRef}
        className="bg-gray-50 rounded-lg shadow-2xl px-8 py-6 min-w-[320px] max-w-[90vw] text-center animate-fadeIn"
      >
        <h2 className="text-2xl font-semibold mb-2 mt-0 text-gray-900">モーダル</h2>
        <p className="text-gray-700">外側をクリックすると閉じます</p>
      </div>
    </div>
  )
}