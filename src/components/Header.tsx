import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Logo from "./Logo"
const Header = () => {
  return (
    <div className="flex justify-between items-center p-8">
        <Logo />
        <WalletMultiButton />
    </div>
  )
}

export default Header