import Modal from "@/components/common/Modal";
import { useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Input from '@/components/ui/Input'
import Button from "@/components/ui/Button";
import cn from 'clsx';
import { useTokens } from "../api/getTokens";
import { Token } from "../types";
import { NewToken } from "../components/NewToken";
import { TokenList } from "../components/TokenList";
import { RevokeToken } from "../components/RevokeToken";


type Modals = {
  generate: undefined;
  revoke: Token;
}

export function ManageAccess() {
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
        <div className="mt-10">
          <TokenList openModal={openModal} />
        </div>
      </section>
      <Modal open={modal?.name === 'generate'} onClose={closeModal}>
        <NewToken onFinally={closeModal} />
      </Modal>
      <Modal open={modal?.name === 'revoke'} onClose={closeModal}>
        <RevokeToken onFinally={closeModal} token={modal?.data} />
      </Modal>
    </div>
  );
}