import { useState } from 'react'
import { UserSession } from '@stacks/connect'
import { Plus, X, Save, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AddRecordProps {
  userSession: UserSession | null
}

interface SubjectGrade {
  subject: string
  grade: number
}

const AddRecord = ({ userSession }: AddRecordProps) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    academicYear: '',
    institution: '',
    gpa: '',
    subjects: [{ subject: '', grade: '' }] as SubjectGrade[]
  })

  const handleSubjectChange = (index: number, field: keyof SubjectGrade, value: string) => {
    const newSubjects = [...formData.subjects]
    newSubjects[index] = { ...newSubjects[index], [field]: value }
    setFormData({ ...formData, subjects: newSubjects })
  }

  const addSubject = () => {
    if (formData.subjects.length < 10) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, { subject: '', grade: '' }]
      })
    }
  }

  const removeSubject = (index: number) => {
    if (formData.subjects.length > 1) {
      const newSubjects = formData.subjects.filter((_, i) => i !== index)
      setFormData({ ...formData, subjects: newSubjects })
    }
  }

  const calculateGPA = () => {
    const validGrades = formData.subjects
      .filter(subject => subject.grade && subject.subject)
      .map(subject => parseFloat(subject.grade))
    
    if (validGrades.length === 0) return 0
    
    const total = validGrades.reduce((sum, grade) => sum + grade, 0)
    return (total / validGrades.length).toFixed(2)
  }

  const validateForm = () => {
    if (!formData.studentId.trim()) return 'Student ID is required'
    if (!formData.studentName.trim()) return 'Student name is required'
    if (!formData.academicYear.trim()) return 'Academic year is required'
    if (!formData.institution.trim()) return 'Institution is required'
    
    const validSubjects = formData.subjects.filter(subject => 
      subject.subject.trim() && subject.grade
    )
    
    if (validSubjects.length === 0) return 'At least one subject with grade is required'
    
    for (const subject of validSubjects) {
      const grade = parseFloat(subject.grade)
      if (isNaN(grade) || grade < 0 || grade > 4) {
        return 'Grades must be between 0 and 4'
      }
    }
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement actual blockchain transaction
      // This would call the smart contract function add-student-record
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess('Student record added successfully!')
      setTimeout(() => {
        navigate('/view-records')
      }, 2000)
    } catch (err) {
      setError('Failed to add student record. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add Student Record</h1>
        <p className="text-gray-600 mt-2">
          Create a new immutable student performance record on the blockchain.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-green-500" />
          <p className="text-green-700">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID *
              </label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="input-field"
                placeholder="Enter student ID"
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="input-field"
                placeholder="Enter student name"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year *
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="input-field"
                placeholder="e.g., 2023-2024"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="input-field"
                placeholder="Enter institution name"
                maxLength={100}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Subject Grades</h2>
            <button
              type="button"
              onClick={addSubject}
              disabled={formData.subjects.length >= 10}
              className="btn-primary flex items-center space-x-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.subjects.map((subject, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={subject.subject}
                    onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                    className="input-field"
                    placeholder="Subject name"
                    maxLength={30}
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={subject.grade}
                    onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                    className="input-field"
                    placeholder="Grade (0-4)"
                  />
                </div>
                {formData.subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Calculated GPA:</span>
              <span className="text-lg font-bold text-gray-900">{calculateGPA()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              GPA is calculated as the average of all subject grades (0-4 scale)
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirmation</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Once submitted, this record will be permanently stored on the blockchain and cannot be modified or deleted. 
                  Please ensure all information is accurate before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Add Record</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRecord 