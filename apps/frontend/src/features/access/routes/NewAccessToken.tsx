import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import useForm from "@/hooks/useForm";
import { Dialog, Transition } from "@headlessui/react"
import { ArrowLeftIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTokenDTO, useCreateToken } from "../api/createToken";

export function NewAccessToken() {
  const navigate = useNavigate();
  const { values, onChange } = useForm<CreateTokenDTO>({
    name: '',
    expires: '3000',
  });
  const createTokenMutation = useCreateToken();
  const [newToken, setNewToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await createTokenMutation.mutateAsync(values);
      setNewToken(data.token);
    } catch (err) {
      console.log("err", err);
    }
  }

  const copyToClipboard = () => {
    if (!newToken) return;
    navigator.clipboard.writeText(newToken);
    showCopied();
  }

  return (
    <div>
      <header className="flex items-center py-4 pt-8 pb-16">
        <h4 className="text-xl font-bold">Manage Access</h4>
      </header>
      <section className="bg-white rounded-md p-4 border border-neutral-100 p-8">
        <h3 className="text-xl font-semibold leading-6 text-gray-900 flex gap-4 items-center">
          <ArrowLeftIcon className="w-5 h-5 text-gray-400 mr-2 cursor-pointer" onClick={() => navigate(-1)} />
          New Token
        </h3>
        {!newToken ? (
          <>
            <p className="text-base text-gray-500 mt-4">
              Access token are like ordinary OAuth access tokens. They can be used to make API requests on behalf of a user.
            </p>
            <form className="mt-6 flex flex-col space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input label="Name" name="name" onChange={onChange} inputClassName="w-96 max-w-full" placeholder="Alx" />
                <small className="text-neutral-500">The name of the token.</small>
              </div>
              <div>
                <Input label="Expires" name="expires" value={values.expires} onChange={onChange} inputClassName="w-96 max-w-full" placeholder="3000" />
                <small className="text-neutral-500">The number of seconds from now when the token will expire.</small>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  loading={createTokenMutation.isLoading}
                >
                  Generate
                </Button>
                <button
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>) : (
          <div className="mt-8 text-gray-500">
            <p>New token successfully generated. Make sure to copy it now. You won’t be able to see it again!</p>
            <div className="mt-4 bg-secondary-50 p-4 rounded-md flex">
              <span className="grow">{newToken}</span>
              <span className="self-center relative">
                <ClipboardIcon className="w-5 h-5 text-gray-400 ml-2 cursor-pointer" onClick={copyToClipboard} />
                <Transition
                  show={copied}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-black text-sm">
                    Copied
                  </div>
                </Transition>
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}