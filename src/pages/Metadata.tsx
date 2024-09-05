import Header from "@/components/Header"
import MetadataForm from "@/components/MetadataForm"

const Metadata = () => {
  return (
    <div className="flex flex-col justify-center bg-black font-primary">
        <Header/>
        <div>
            <h1 className="text-3xl text-white flex justify-center font-semibold p-4 mb-4">Configure your own metadata for your own minted NFT on solana </h1>
        </div>
        <div className="flex justify-center mb-8">
            <MetadataForm />
        </div>
    </div>
  )
}

export default Metadata