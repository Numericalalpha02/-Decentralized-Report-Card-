import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { STACKS_TESTNET } from '@stacks/network';
import { showConnect } from '@stacks/connect';
import { UserSession } from '@stacks/auth'
import { Wallet, Sparkles, Shield, TrendingUp, AlertCircle } from 'lucide-react'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddRecord from './pages/AddRecord'
import ViewRecords from './pages/ViewRecords'
import ManageEducators from './pages/ManageEducators'
import WalletConnect from './components/WalletConnect'

const network = STACKS_TESTNET;

function App() {
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const session = new UserSession()
    setUserSession(session)
    const isSignedIn = session.isUserSignedIn()
    setIsWalletConnected(isSignedIn)
    console.log('Initial wallet status:', isSignedIn)
  }, [])

  const handleConnect = async () => {
    if (!userSession) return

    setIsLoading(true)
    try {
      console.log('Attempting to connect Leather Wallet...')
      await showConnect({
        appDetails: {
          name: 'Decentralized Report Card',
          icon: 'https://your-app-icon.com/icon.png',
        },
        userSession,
        onFinish: () => {
          console.log('Wallet connection finished')
          // Check if user is actually signed in
          const isSignedIn = userSession.isUserSignedIn()
          console.log('User signed in status:', isSignedIn)
          
          if (isSignedIn) {
            setIsWalletConnected(true)
            showSuccessNotification('Leather Wallet connected successfully! 🎉')
          } else {
            setIsWalletConnected(false)
            showErrorNotification('Leather Wallet connection failed. Please try again.')
          }
        },
        onCancel: () => {
          console.log('User cancelled connection')
          setIsWalletConnected(false)
          showErrorNotification('Leather Wallet connection cancelled')
        },
      })
    } catch (error) {
      console.error('Failed to connect Leather Wallet:', error)
      setIsWalletConnected(false)
      showErrorNotification('Failed to connect Leather Wallet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    if (userSession) {
      userSession.signUserOut();
      setIsWalletConnected(false)
      showSuccessNotification('Leather Wallet disconnected successfully')
    }
  }

  const showSuccessNotification = (message: string) => {
    setNotificationMessage(message)
    setNotificationType('success')
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const showErrorNotification = (message: string) => {
    setNotificationMessage(message)
    setNotificationType('error')
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 floating"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 floating" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-200 rounded-full opacity-20 floating" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 z-50 slide-in">
            <div className={`${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2`}>
              {notificationType === 'success' ? (
                <Sparkles className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{notificationMessage}</span>
            </div>
          </div>
        )}

        {/* Enhanced test section */}
        <div className="relative z-10">
          <div className="glass-effect rounded-2xl mx-4 mt-4 p-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className={`p-3 rounded-full ${isWalletConnected ? 'bg-green-100 pulse-glow' : 'bg-primary-100'}`}>
                <Wallet className={`h-8 w-8 ${isWalletConnected ? 'text-green-600' : 'text-primary-600'}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">Decentralized Report Card</h2>
                <p className="text-sm text-gray-600">
                  {isWalletConnected ? 'Leather Wallet Connected' : 'Connect your Leather Wallet to get started'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleConnect}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2 min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="h-5 w-5" />
                    <span>{isWalletConnected ? 'Reconnect Leather Wallet' : 'Connect Leather Wallet'}</span>
                  </>
                )}
              </button>
              
              {isWalletConnected && (
                <button 
                  onClick={handleDisconnect}
                  className="btn-danger flex items-center space-x-2 min-w-[200px]"
                >
                  <Shield className="h-5 w-5" />
                  <span>Disconnect</span>
                </button>
              )}
            </div>

            {/* Connection Status */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isWalletConnected ? 'status-online' : 'status-offline'}`}></div>
                <span className="text-sm font-medium">
                  {isWalletConnected ? 'Connected to Leather Wallet' : 'Not Connected'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <Navbar 
          isConnected={isWalletConnected}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          userSession={userSession}
        />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {!isWalletConnected ? (
            <div className="fade-in">
              <WalletConnect onConnect={handleConnect} />
            </div>
          ) : (
            <div className="bounce-in">
              <Routes>
                <Route path="/" element={<Dashboard userSession={userSession} />} />
                <Route path="/add-record" element={<AddRecord userSession={userSession} />} />
                <Route path="/view-records" element={<ViewRecords userSession={userSession} />} />
                <Route path="/manage-educators" element={<ManageEducators userSession={userSession} />} />
              </Routes>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-20 pb-8">
          <div className="container mx-auto px-4 text-center">
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary-600" />
                <span className="text-lg font-semibold gradient-text">Built on Stacks Blockchain</span>
              </div>
              <p className="text-gray-600 text-sm">
                Secure, immutable student performance records with transparency and trust
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App 