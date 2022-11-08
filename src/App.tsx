import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home';
import { ReactQueryDevtools} from "react-query/devtools"
import {QueryClient, QueryClientProvider} from 'react-query' 
import { AuthProvider } from './lib/auth';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import NotFound from './pages/NotFound';


const queryClient = new QueryClient()
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/verify-otp' element={<VerifyOtp />} />
              <Route path='/login' element={<Login />} />
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
    </>
  );
}

export default App;
