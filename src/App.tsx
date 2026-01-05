import { type ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './routes/HomePage'
import Login from './routes/Login'
import SignUp from './routes/SignUp'
import { useAuth } from './context/authContext'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer position="top-right" newestOnTop closeOnClick pauseOnHover />
    </Router>
  )
}

export default App
