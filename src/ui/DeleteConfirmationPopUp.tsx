import useConfirmation from '@/hooks/useConfirmation'
import { useImperativeHandle, type Ref } from 'react'
import Modal from './modals/Modal'
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
type MapRef = {
  showConfirm: () => void
}
interface DeleteConfirmationPopUpProps {
  itemLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  ref?: Ref<MapRef>
}
export default function DeleteConfirmationPopUp({
  itemLabel,
  onCancel,
  onConfirm,
  ref,
}: DeleteConfirmationPopUpProps) {
  const { showConfirm, confirm, handleClose, handleConfirm } = useConfirmation({
    onConfirm,
    onCancel,
  })
  const text = itemLabel
    ? `Are you sure you want to delete this ${itemLabel}?`
    : 'Are you sure you want to delete this?'

  useImperativeHandle(
    ref,
    () => ({
      showConfirm: () => confirm(),
    }),
    []
  )
  return (
    <Modal isOpen={showConfirm} onClose={handleClose}>
      <button
        onClick={handleClose}
        type="button"
        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors duration-300 ease-in-out will-change-[color]  "
        data-modal-hide="popup-modal"
      >
        <XCircleIcon className="size-8" />
        <span className="sr-only">Close modal</span>
      </button>
      <div className="p-4 md:p-5 text-center">
        <InformationCircleIcon className="size-12 text-primary mx-auto my-4" />
        <h3 className="mb-5 text-xl font-normal text-primary">{text}</h3>
        <button
          onClick={handleConfirm}
          data-modal-hide="popup-modal"
          type="button"
          className="text-white bg-primary hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center transition-colors duration-300 ease-in-out will-change-[color]"
        >
          Yes, I&apos;m sure
        </button>
        <button
          onClick={handleClose}
          data-modal-hide="popup-modal"
          type="button"
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all duration-300 ease-in-out will-change-[color]"
        >
          No, cancel
        </button>
      </div>
    </Modal>
  )
}
