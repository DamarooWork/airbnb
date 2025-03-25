import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}
export default function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <div
      id="popup-modal"
      onClick={onClose}
      tabIndex={-1}
      className={`${
        isOpen ? 'flex' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50 `}
    >
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <div
          className="relative bg-white rounded-lg shadow-sm border-primary border-2"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
