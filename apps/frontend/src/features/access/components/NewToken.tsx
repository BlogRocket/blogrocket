import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Dialog } from "@headlessui/react"

type NewTokenProps = {
  onFinally: () => void;
}

export const NewToken: React.FC<NewTokenProps> = ({ onFinally }) => {
  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
              New Token
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Access token are like ordinary OAuth access tokens. They can be used to make API requests on behalf of a user.
              </p>
              <div className="mt-4">
                <Input label="Name" />
                <small>What is this token for?</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={onFinally}
        >
          Generate
        </Button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onFinally}
        >
          Cancel
        </button>
      </div>
    </>
  )
}