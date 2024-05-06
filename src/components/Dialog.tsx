import { Dialog as HeadlessDialog } from "@headlessui/react"
import { X } from "lucide-react"

interface Props {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
  children: React.ReactNode
  confirmBtnName?: string
  loading?: boolean
}

export default function Dialog({
  title,
  description,
  open,
  onClose,
  onConfirm,
  children,
  confirmBtnName = "Confirm",
  loading = false,
}: Props) {
  return (
    <HeadlessDialog open={open} onClose={onClose}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <HeadlessDialog.Panel className="w-full max-w-md flex flex-col gap-2 relative z-50 rounded-lg bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <HeadlessDialog.Title
              as="h3"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </HeadlessDialog.Title>
            <X size={20} onClick={onClose} className="cursor-pointer " />
          </div>
          <HeadlessDialog.Description as="p" className="text-sm text-gray-500">
            {description}
          </HeadlessDialog.Description>
          <div>{children}</div>
          <button
            disabled={loading}
            onClick={onConfirm}
            className="self-end rounded-md py-1 px-3 text-gray-900 ring-1 ring-gray-300"
          >
            {confirmBtnName}
          </button>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  )
}
