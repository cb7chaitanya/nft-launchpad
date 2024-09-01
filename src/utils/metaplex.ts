import { Connection } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { WalletAdapter } from "@solana/wallet-adapter-base";

const connection = new Connection("https://api.devnet.solana.com");
const metaplex = Metaplex.make(connection)

export const mintNFT = async (wallet: WalletAdapter, name: string, metadataUrl: string): Promise<any> => {
    try {
      // Ensure the wallet is connected before proceeding
      if (!wallet.connected) throw new Error('Wallet is not connected');
  
      // Use the wallet adapter as the identity provider
      metaplex.use(walletAdapterIdentity(wallet));
  
      // Create an NFT with specified metadata and attributes
      const { nft } = await metaplex.nfts().create({
        uri: metadataUrl, // Replace with your metadata URI
        name: name,
        sellerFeeBasisPoints: 500 // 5% royalties
      })
  
      console.log('NFT Created:', nft);
      return nft;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  };