import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import cn from 'clsx';
import { useTokens } from "../api/getTokens";

type TokenListProps = {
  openModal: (modal: 'generate' | 'revoke', data?: any) => any
}

export const TokenList: React.FC<TokenListProps> = ({ openModal }) => {
  const { data, isLoading } = useTokens();

  if (isLoading) {
    return (
      <div className="w-full h-40 flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="">
        <h3 className="text-2xl font-bold">You have no tokens yet</h3>
        <p className="mt-4 text-neutral-500">Create your first token by clicking the button below</p>
        <div className="mt-8">
          <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md" onClick={() => openModal('generate')}>
            Generate token
          </button>
        </div>
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">Expires</th>
          <th className="text-left">Last used</th>
          <th className="text-left">Last IP</th>
          <th className="text-left"></th>
        </tr>
      </thead>
      <tbody className="mt-4">
        {data.map((token, index) => {
          const className = cn({
            'border-b border-neutral-100': index !== data.length - 1,
          })
          return (
            <tr key={token._id} className={className}>
              <td>{token.name}</td>
              <td>{token.createdAt}</td>
              <td>{token.lastUsed}</td>
              <td>{token.lastIp}</td>
              <td>
                <button className="bg-transparent hover:bg-neutral-50 hover:border-transparent py-2 text-danger hover:text-danger" onClick={() => openModal('revoke', token)}>Revoke</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}