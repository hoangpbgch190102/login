import { Routes, Route } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import AuthContextProvider from './contexts/AuthContext'
import ProtectedRoute from './components/routing/ProtectedRoute'

import './App.css'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Auth authRoute='login' />} />
        <Route path='/register' element={<Auth authRoute='register' />} />
        <Route path='/dashboard' element={<ProtectedRoute redirectTo='/login'>
          <Dashboard />
        </ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
