/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from '../../firebase'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const Modal = ({ isOpen, onClose }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser)
      } else {
        // User is logged out
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleLogin = async () => {

    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD

    if (email === adminEmail && password === adminPassword) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        alert('Login successful')
        onClose()
        window.open('/my-profile', '_blank')
      } catch (error) {
        alert('Login failed: ' + error.message)
      }
    } else {
      alert('Login failed: Invalid credentials')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      alert('Logout successful')
      window.open('/', '_blank')
      window.close('/my-profile')
    } catch (error) {
      alert('Logout failed: ' + error.message)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed w-full h-full inset-0 p-6 flex items-center justify-center z-50 font-['Poppins']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 bg-black opacity-40"></div>
            <motion.div
              className="flex flex-1 flex-col justify-center space-y-5 bg-gray-100 p-12 rounded-md max-w-md z-50"
              initial={{ scale: 0.5, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -100 }}
            >
              <div className="flex flex-col my-4 text-center">
                <h2 className="text-xl md:text-3xl font-bold tracking-widest">
                  Admin Login
                </h2>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-light placeholder-font-normal"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-light placeholder-font-normal"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <motion.button
                  onClick={handleLogin}
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-1 rounded-lg font-medium bg-blue-600 text-gray-100 transition-all duration-300 hover:bg-blue-700 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                {/* Conditionally render the logout button */}
                {user ? (
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-1 rounded-lg font-medium text-red-600 transition-all duration-300 hover:text-red-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                ) : null}
                <div className="flex justify-center items-center">
                  <span className="w-full border border-black"></span>
                  <span className="px-4">Or</span>
                  <span className="w-full border border-black"></span>
                </div>
                <motion.button
                  className="text-gray-500 hover:text-gray-700 ml-2 font-medium transition-all duration-300"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Modal
