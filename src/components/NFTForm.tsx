import { useState } from "react";

export interface NFTFormProps {
    onSubmit: (data: {
        name: string;
        imageUrl: string;
        metadataUrl: string;
    }) => void
}

const NFTForm: React.FC<NFTFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [metadataUrl, setMetadataUrl] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ name, imageUrl, metadataUrl });
    }
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New NFT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="metadataUri" className="block text-sm font-medium text-gray-700">Metadata URI</label>
          <input
            type="url"
            id="metadataUri"
            value={metadataUrl}
            onChange={(e) => setMetadataUrl(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Mint NFT
        </button>
      </form>
    </div>
    )
}

export default NFTForm