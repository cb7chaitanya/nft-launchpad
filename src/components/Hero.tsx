import { useNavigate } from "react-router-dom"
import Button from "./Button"


const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col text-white p-8 col-span-2">
        <div className="text-5xl font-semibold leading-relaxed p-2 md:text-8xl">
            You don't need to reinvent the wheel. 
        </div>
        <div className="p-2 text-lg text-zinc-400 font-thin">
            Create your own NFT on Solana with the power of Arweave on the existing Metaplex defined NFT standards, here and now on your NFT vault.
        </div>
        <Button label="Set Metadata" onClick={() => navigate('/metadata')}/>
    </div>
  )
}

export default Hero