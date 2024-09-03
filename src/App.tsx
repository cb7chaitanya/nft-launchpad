import Provider from './components/Provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Metadata from './pages/Metadata';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/metadata' element={<Metadata />}/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
