import Modal from "@/components/common/Modal";
import { useState } from 'react'
import { Token } from "../types";
import { ConnectToken } from "../components/ConnectToken";
import { TokenList } from "../components/TokenList";
import { RevokeToken } from "../components/RevokeToken";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";


type Modals = {
  connect: undefined;
  revoke: Token;
}

export function ManageAccess() {
  const [modal, setModal] = useState<{ name: keyof Modals; data: Modals[keyof Modals] } | null>(null)

  const closeModal = () => setModal(null)
  const openModal = (modal: keyof Modals, data?: Modals[keyof Modals]) => setModal({ name: modal, data })

  return (
    <div>
      <header className="flex items-center py-4 pt-8 pb-16">
        <h4 className="text-xl font-bold">Manage Access</h4>
      </header>
      <section className="bg-white rounded-md p-4 border border-neutral-100">
        <div className="flex flex-row-reverse gap-4">
          <button className="bg-black text-white" onClick={() => openModal('connect')}>Connect</button>
          <NavLink to="new">
            <button className="text-black hover:text-black">Generate token</button>
          </NavLink>
        </div>
        <div className="mt-10">
          <TokenList revoke={(token) => openModal('revoke', token)} />
        </div>
      </section>
      <Modal open={modal?.name === 'revoke'} onClose={closeModal}>
        <RevokeToken onFinally={closeModal} token={modal?.data} />
      </Modal>
      <Modal open={modal?.name === 'connect'} onClose={closeModal}>
        <ConnectToken onFinally={closeModal} />
      </Modal>
    </div>
  );
}