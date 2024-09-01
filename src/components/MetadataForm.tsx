import { useState } from 'react';

interface Attribute {
  trait_type: string;
  value: string;
}

interface MetadataFormProps {
  onSubmit: (data: { name: string; description: string; image: File | null; attributes: Attribute[] }) => void;
}

const MetadataForm: React.FC<MetadataFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [currentAttribute, setCurrentAttribute] = useState<Attribute>({ trait_type: '', value: '' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddAttribute = () => {
    if (currentAttribute.trait_type && currentAttribute.value) {
      setAttributes([...attributes, currentAttribute]);
      setCurrentAttribute({ trait_type: '', value: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && description && image) {
      onSubmit({ name, description, image, attributes });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-zinc-800 rounded shadow-md w-1/2 flex justify-center flex-col">
      <div className="mb-4">
        <label className="block text-zinc-200 text-sm font-bold mb-2" htmlFor="name">
          NFT Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-white bg-zinc-800 leading-tight focus:outline-none border-b-2 border-zinc-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          id="image"
          type="file"
          onChange={handleFileChange}
          className="block w-full text-gray-700 file:border file:bg-gray-200 file:py-2 file:px-4 file:rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trait_type">
          Attribute Type
        </label>
        <input
          id="trait_type"
          type="text"
          value={currentAttribute.trait_type}
          onChange={(e) => setCurrentAttribute({ ...currentAttribute, trait_type: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="value">
          Attribute Value
        </label>
        <input
          id="value"
          type="text"
          value={currentAttribute.value}
          onChange={(e) => setCurrentAttribute({ ...currentAttribute, value: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="button"
          onClick={handleAddAttribute}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Attribute
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Attributes</h3>
        <ul>
          {attributes.map((attr, index) => (
            <li key={index} className="flex justify-between">
              <span>{attr.trait_type}: {attr.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default MetadataForm;
