
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useMemo } from 'react';

const Provider = ({children}: {children: React.ReactNode}) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint: string = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <div className='h-screen w-full bg-red-400'>
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
        {children}
      </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default Provider