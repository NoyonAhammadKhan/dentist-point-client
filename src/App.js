import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routers from './Routes/Routes/Routes';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={routers}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
