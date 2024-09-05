import { useWallet } from '@solana/wallet-adapter-react'
import Arweave from 'arweave'
import axios from 'axios'

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false
})
/**
 * Uploads user selected image to arweave
 * @param file - The file to be uploaded to Arweave 
 * @returns {Promise<string>} - The URL of the file uploaded to Arweave 
 */
export const uploadImageToArweave = async (file: File): Promise<string> => {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onload = async () => {
            try{
                const data = reader.result as ArrayBuffer
                const transaction = await arweave.createTransaction({ data })
                transaction.addTag('Content-Type', file.type)

                if (window.arweaveWallet) {
                    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
                    await arweave.transactions.sign(transaction);
                    await arweave.transactions.post(transaction);
                    resolve(`https://arweave.net/${transaction.id}`);
                } else {
                    reject(new Error('ArConnect is not installed.'));
                }
            } catch(err){
                reject(err)
            }
        }
        reader.onerror = () => reject(new Error('Failed to read the file'))
        reader.readAsArrayBuffer(file)
    })
}

/**
 * Uploads metadata JSON to Arweave
 * @param metadata - The metadata to be uploaded to Arweave
 * @returns {Promise<string>} - The URL of the metadata uploaded to Arweave
 */

export const uploadMetadataToArweave = async (metadata: object): Promise<string> => {
    try {
      const data = JSON.stringify(metadata);
      const transaction = await arweave.createTransaction({ data });
      transaction.addTag('Content-Type', 'application/json');
  
      // Sign with ArConnect
      if (window.arweaveWallet) {
        await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
        await arweave.transactions.sign(transaction);
        await arweave.transactions.post(transaction);
  
        const { publicKey: address } = useWallet();
        await axios.post(
          import.meta.env.VITE_BASE_URL,
          {
            walletAddress: address,
            metadataURL: `https://arweave.net/${transaction.id}`,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
  
        return `https://arweave.net/${transaction.id}`;
      } else {
        throw new Error('ArConnect is not installed.');
      }
    } catch (err) {
      throw new Error(`Failed to upload metadata: ${err}`);
    }
  };