import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import useForm from "@/hooks/useForm";
import { Dialog } from "@headlessui/react"
import { CreateTokenDTO, useCreateToken } from "../api/createToken";

type ConnectTokenProps = {
  onFinally: () => void;
}

export const ConnectToken: React.FC<ConnectTokenProps> = ({ onFinally }) => {
  const { values, onChange } = useForm<CreateTokenDTO>({
    name: '',
    expires: '3000',
  });
  const createTokenMutation = useCreateToken();

  const handleSubmit = async () => {
    await createTokenMutation.mutateAsync(values);
    onFinally();
  }

  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            {/* @ts-ignore */}
            <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
              Connect to application
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-gray-500">
                You can create a token to connect to your application. Add the token to your application and you will be able to access your data.
              </p>
              <div className="mt-4">
                <div className="bg-neutral-200 p-2 rounded-md">
                  <code className="text-sm">
                    curl<br />
                    -X POST<br />
                    -H "Authorization: Bearer {'<token>'}"
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onFinally}
        >
          Close
        </button>
      </div>
    </>
  )
}