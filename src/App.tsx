import Provider from './components/Provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MintButton from './components/MintButton';
import MetadataForm from './components/MetadataForm';

function App() {
  return (
    <div className='h-screen w-full bg-red-400'>
      <Provider>
        <MintButton />
        <MetadataForm onSubmit={(data) => console.log(data)}/>
      </Provider>
      <ToastContainer />
    </div>
  )
}

export default App
