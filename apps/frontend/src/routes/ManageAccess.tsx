import Modal from "@/components/common/Modal";
import { useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Input from '@/components/ui/Input'
import Button from "@/components/ui/Button";
import cn from 'clsx';

const TOKENS = [
  {
    id: 1,
    name: 'Alx',
    created: '2021-01-01',
    lastUsed: '2021-01-01',
    lastIp: '',
    lastUserAgent: '',
  },
  {
    id: 1,
    name: 'AltSchool',
    created: '2021-01-01',
    lastUsed: '2021-01-01',
    lastIp: '',
    lastUserAgent: '',
  },
]

type Modals = {
  generate: undefined;
  revoke: typeof TOKENS[0];
}

export default function ManageAccess() {
  const [modal, setModal] = useState<{ name: keyof Modals; data: Modals[keyof Modals] } | null>(null)
  const cancelButtonRef = useRef(null);

  const closeModal = () => setModal(null)
  const openModal = (modal: keyof Modals, data?: Modals[keyof Modals]) => setModal({ name: modal, data })

  return (
    <div>
      <header className="flex items-center py-4 pt-8 pb-16">
        <h4 className="text-xl font-bold">Manage Access</h4>
      </header>
      <section className="bg-white rounded-md p-4 border border-neutral-100">
        <div className="flex flex-row-reverse">
          <button className="ml-auto" onClick={() => openModal('generate')}>Generate token</button>
        </div>
        {TOKENS.length > 0 ? (
          <table className="w-full mt-10">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Expires</th>
                <th className="text-left">Last used</th>
                <th className="text-left">Last IP</th>
                <th className="text-left">Last user agent</th>
                <th className="text-left"></th>
              </tr>
            </thead>
            <tbody className="mt-4">
              {TOKENS.map((token, index) => {
                const className = cn({
                  'border-b border-neutral-100': index !== TOKENS.length - 1,
                })
                return (
                <tr key={token.id} className={className}>
                  <td>{token.name}</td>
                  <td>{token.created}</td>
                  <td>{token.lastUsed}</td>
                  <td>{token.lastIp}</td>
                  <td>{token.lastUserAgent}</td>
                  <td>
                    <Button className="bg-transparent hover:bg-neutral-50 hover:border-transparent py-2 text-danger hover:text-danger" onClick={() => openModal('revoke', token)}>Revoke</Button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        ) : (
          <div className="mt-10">
            <h3 className="text-2xl font-bold">You have no tokens yet</h3>
            <p className="mt-4 text-neutral-500">Create your first token by clicking the button below</p>
            <div className="mt-8">
              <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md">
                Generate token
              </button>
            </div>
          </div>
        )}
      </section>
      <Modal open={modal?.name === 'generate'} onClose={closeModal}>
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
            onClick={closeModal}
          >
            Generate
          </Button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={closeModal}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal open={modal?.name === 'revoke'} onClose={closeModal}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                Revoke `{modal?.data?.name}` Token
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
            onClick={closeModal}
          >
            I understand, revoke this token
          </Button>
        </div>
      </Modal>
    </div>
  );
}