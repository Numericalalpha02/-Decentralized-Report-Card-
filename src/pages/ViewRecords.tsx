import { useState, useEffect } from 'react'
import { UserSession } from '@stacks/connect'
import { Search, Filter, Eye, Download, Calendar, Building, User } from 'lucide-react'

interface ViewRecordsProps {
  userSession: UserSession | null
}

interface StudentRecord {
  studentId: string
  studentName: string
  grades: number[]
  subjects: string[]
  gpa: number
  timestamp: number
  academicYear: string
  institution: string
}

const ViewRecords = ({ userSession }: ViewRecordsProps) => {
  const [records, setRecords] = useState<StudentRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<StudentRecord[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInstitution, setSelectedInstitution] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch actual records from blockchain
    const mockRecords: StudentRecord[] = [
      {
        studentId: 'STU001',
        studentName: 'John Doe',
        grades: [3.8, 3.9, 4.0, 3.7],
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
        gpa: 3.85,
        timestamp: Date.now() - 86400000, // 1 day ago
        academicYear: '2023-2024',
        institution: 'University of Technology'
      },
      {
        studentId: 'STU002',
        studentName: 'Jane Smith',
        grades: [4.0, 3.9, 3.8, 4.0],
        subjects: ['Computer Science', 'Data Structures', 'Algorithms', 'Database'],
        gpa: 3.93,
        timestamp: Date.now() - 172800000, // 2 days ago
        academicYear: '2023-2024',
        institution: 'Tech Institute'
      },
      {
        studentId: 'STU003',
        studentName: 'Mike Wilson',
        grades: [3.5, 3.6, 3.7, 3.8],
        subjects: ['English', 'History', 'Geography', 'Literature'],
        gpa: 3.65,
        timestamp: Date.now() - 259200000, // 3 days ago
        academicYear: '2023-2024',
        institution: 'Liberal Arts College'
      }
    ]

    setRecords(mockRecords)
    setFilteredRecords(mockRecords)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = records

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedInstitution) {
      filtered = filtered.filter(record => record.institution === selectedInstitution)
    }

    if (selectedYear) {
      filtered = filtered.filter(record => record.academicYear === selectedYear)
    }

    setFilteredRecords(filtered)
  }, [records, searchTerm, selectedInstitution, selectedYear])

  const institutions = [...new Set(records.map(record => record.institution))]
  const years = [...new Set(records.map(record => record.academicYear))]

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 3.7) return 'text-green-600 bg-green-100'
    if (grade >= 3.0) return 'text-blue-600 bg-blue-100'
    if (grade >= 2.0) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">View Records</h1>
        <p className="text-gray-600 mt-2">
          Browse and verify student performance records stored on the blockchain.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="input-field"
            >
              <option value="">All Institutions</option>
              {institutions.map(institution => (
                <option key={institution} value={institution}>{institution}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-field"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <Eye className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedInstitution || selectedYear 
                ? 'Try adjusting your search criteria.'
                : 'No student records have been added yet.'
              }
            </p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.studentId} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900">{record.studentName}</h3>
                    </div>
                    <span className="text-sm text-gray-500">ID: {record.studentId}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{record.institution}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{record.academicYear}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">GPA:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(record.gpa)}`}>
                        {record.gpa.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Subject Grades:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {record.subjects.map((subject, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">{subject}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(record.grades[index])}`}>
                            {record.grades[index].toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Added: {formatDate(record.timestamp)}</span>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Verified on Blockchain</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ViewRecords 