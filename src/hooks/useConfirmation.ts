import { useState } from 'react'

interface useConfirmationProps {
  onCancel?: () => void
  onConfirm?: () => void
}
export default function useConfirmation({ onCancel, onConfirm }: useConfirmationProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const confirm = () => {
    setShowConfirm(true)
  }
  const handleClose = () => {
    setShowConfirm(false)
    if (onCancel && typeof onCancel === 'function') {
      onCancel()
    }
  }
  const handleConfirm = () => {
    setShowConfirm(false)
    if (onConfirm && typeof onConfirm === 'function') {
      onConfirm()
    }
  }
  return {showConfirm, confirm, handleClose, handleConfirm }
}
