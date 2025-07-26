import { Link, useLocation } from 'react-router-dom'
import { UserSession } from '@stacks/connect'
import { GraduationCap, Plus, Eye, Users, Wallet, LogOut } from 'lucide-react'

interface NavbarProps {
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
  userSession: UserSession | null
}

const Navbar = ({ isConnected, onConnect, onDisconnect, userSession }: NavbarProps) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: GraduationCap },
    { path: '/add-record', label: 'Add Record', icon: Plus },
    { path: '/view-records', label: 'View Records', icon: Eye },
    { path: '/manage-educators', label: 'Manage Educators', icon: Users },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">ReportCard</span>
            </div>
          </div>

          {/* Navigation Links */}
          {isConnected && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {userSession?.loadUserData()?.address?.substring(0, 8)}...
                    {userSession?.loadUserData()?.address?.substring(-6)}
                  </span>
                </div>
                <button
                  onClick={onDisconnect}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="btn-primary flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isConnected && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 