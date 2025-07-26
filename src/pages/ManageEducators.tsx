import { useState, useEffect } from 'react'
import { UserSession } from '@stacks/connect'
import { Plus, X, Shield, UserCheck, UserX, AlertCircle, Search } from 'lucide-react'

interface ManageEducatorsProps {
  userSession: UserSession | null
}

interface Educator {
  address: string
  name: string
  institution: string
  authorizedAt: number
  isAuthorized: boolean
}

const ManageEducators = ({ userSession }: ManageEducatorsProps) => {
  const [educators, setEducators] = useState<Educator[]>([])
  const [filteredEducators, setFilteredEducators] = useState<Educator[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEducator, setNewEducator] = useState({
    address: '',
    name: '',
    institution: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // TODO: Fetch actual educators from blockchain
    const mockEducators: Educator[] = [
      {
        address: 'ST1PQHQKV0RJXZFYVDGX8MNSYVEJSXKT136DCPEHW',
        name: 'Dr. Sarah Johnson',
        institution: 'University of Technology',
        authorizedAt: Date.now() - 86400000 * 30, // 30 days ago
        isAuthorized: true
      },
      {
        address: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
        name: 'Prof. Michael Chen',
        institution: 'Tech Institute',
        authorizedAt: Date.now() - 86400000 * 15, // 15 days ago
        isAuthorized: true
      },
      {
        address: 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0',
        name: 'Dr. Emily Rodriguez',
        institution: 'Liberal Arts College',
        authorizedAt: Date.now() - 86400000 * 7, // 7 days ago
        isAuthorized: true
      },
      {
        address: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
        name: 'Prof. David Wilson',
        institution: 'State University',
        authorizedAt: Date.now() - 86400000 * 60, // 60 days ago
        isAuthorized: false
      }
    ]

    setEducators(mockEducators)
    setFilteredEducators(mockEducators)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = educators

    if (searchTerm) {
      filtered = filtered.filter(educator =>
        educator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        educator.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        educator.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredEducators(filtered)
  }, [educators, searchTerm])

  const handleAddEducator = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newEducator.address.trim() || !newEducator.name.trim() || !newEducator.institution.trim()) {
      setError('All fields are required')
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement actual blockchain transaction
      // This would call the smart contract function authorize-educator
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newEducatorRecord: Educator = {
        address: newEducator.address,
        name: newEducator.name,
        institution: newEducator.institution,
        authorizedAt: Date.now(),
        isAuthorized: true
      }

      setEducators([...educators, newEducatorRecord])
      setNewEducator({ address: '', name: '', institution: '' })
      setShowAddForm(false)
      setSuccess('Educator authorized successfully!')
    } catch (err) {
      setError('Failed to authorize educator. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRevokeEducator = async (address: string) => {
    if (!confirm('Are you sure you want to revoke this educator\'s authorization?')) {
      return
    }

    try {
      // TODO: Implement actual blockchain transaction
      // This would call the smart contract function revoke-educator
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setEducators(educators.map(educator =>
        educator.address === address
          ? { ...educator, isAuthorized: false }
          : educator
      ))
      
      setSuccess('Educator authorization revoked successfully!')
    } catch (err) {
      setError('Failed to revoke educator authorization. Please try again.')
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(-6)}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Educators</h1>
          <p className="text-gray-600 mt-2">
            Authorize or revoke educator access to the report card system.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Educator</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-green-500" />
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {/* Add Educator Form */}
      {showAddForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Add New Educator</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleAddEducator} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stacks Address *
                </label>
                <input
                  type="text"
                  value={newEducator.address}
                  onChange={(e) => setNewEducator({ ...newEducator, address: e.target.value })}
                  className="input-field"
                  placeholder="Enter Stacks address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={newEducator.name}
                  onChange={(e) => setNewEducator({ ...newEducator, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter educator name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  value={newEducator.institution}
                  onChange={(e) => setNewEducator({ ...newEducator, institution: e.target.value })}
                  className="input-field"
                  placeholder="Enter institution"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    <span>Authorize Educator</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search educators by name, institution, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Educators List */}
      <div className="space-y-4">
        {filteredEducators.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <Shield className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No educators found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search criteria.'
                : 'No educators have been authorized yet.'
              }
            </p>
          </div>
        ) : (
          filteredEducators.map((educator) => (
            <div key={educator.address} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${educator.isAuthorized ? 'bg-green-100' : 'bg-red-100'}`}>
                    {educator.isAuthorized ? (
                      <UserCheck className="h-5 w-5 text-green-600" />
                    ) : (
                      <UserX className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{educator.name}</h3>
                    <p className="text-sm text-gray-600">{educator.institution}</p>
                    <p className="text-xs text-gray-500 font-mono">{formatAddress(educator.address)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {educator.isAuthorized ? 'Authorized' : 'Revoked'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(educator.authorizedAt)}
                    </p>
                  </div>

                  {educator.isAuthorized && (
                    <button
                      onClick={() => handleRevokeEducator(educator.address)}
                      className="btn-secondary text-sm flex items-center space-x-2"
                    >
                      <UserX className="h-4 w-4" />
                      <span>Revoke</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {educators.filter(e => e.isAuthorized).length}
            </p>
            <p className="text-sm text-gray-600">Authorized Educators</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {educators.filter(e => !e.isAuthorized).length}
            </p>
            <p className="text-sm text-gray-600">Revoked Educators</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {educators.length}
            </p>
            <p className="text-sm text-gray-600">Total Educators</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageEducators 