import Button from "@/components/ui/Button";
import { Dialog } from "@headlessui/react";
import { useRevokeToken } from "../api/revokeToken";
import { Token } from "../types";

type RevokeTokenProps = {
  onFinally: () => void;
  token?: Token
}

export const RevokeToken: React.FC<RevokeTokenProps> = ({ onFinally, token }) => {
  const revokeTokenMutation = useRevokeToken()

  const handleSubmit = async () => {
    if (!token) return;
    await revokeTokenMutation.mutateAsync({ _id: token._id })
    onFinally()
  }

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            {/* @ts-ignore */}
            <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
              Revoke `{token?.name}` Token
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to revoke this token? Every application using this token will no longer be able to access your account.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-danger px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-danger-600 sm:ml-3 sm:w-auto"
          onClick={handleSubmit}
          loading={revokeTokenMutation.isLoading}
        >
          I understand, revoke this token
        </Button>
      </div>
    </div>
  )
}