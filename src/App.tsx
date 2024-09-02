import Provider from './components/Provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MintButton from './components/MintButton';
import MetadataForm from './components/MetadataForm';

function App() {
  return (
    <div className='w-full bg-zinc-900'>
      <Provider>
        <MintButton />
        <div className='flex justify-center '>
          <MetadataForm />
        </div>
      </Provider>
      <ToastContainer />
    </div>
  )
}

export default App
