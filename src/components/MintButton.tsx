import { useWallet } from "@solana/wallet-adapter-react"
import { mintNFT } from "../utils/metaplex"
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { toast } from "react-toastify";
const MintButton = () => {
    const { wallet, connected } = useWallet()
    const walletAdapter = wallet?.adapter as WalletAdapter

    const handleMinting = async () => {
        if(!connected || !walletAdapter) {
            toast.warn('Please connect your wallet first')
            return
        }
        try{
            const nft = await mintNFT(walletAdapter)
            toast(`NFT Minted: ${nft.name}`)
        } catch(error) {
            toast.error('Failed to mint NFT')
            console.error('Minting error: ', error)   
        }
    }
  return (
    <button onClick={handleMinting} disabled={!connected || !walletAdapter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Mint NFT
    </button>
  )
}

export default MintButton