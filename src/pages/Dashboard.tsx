import { useState, useEffect } from 'react'
import { UserSession } from '@stacks/connect'
import { GraduationCap, Plus, Eye, Users, TrendingUp, Shield, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DashboardProps {
  userSession: UserSession | null
}

interface StatsCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description?: string
}

const StatsCard = ({ title, value, icon: Icon, color, description }: StatsCardProps) => (
  <div className="card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
)

const Dashboard = ({ userSession }: DashboardProps) => {
  const [stats, setStats] = useState({
    totalRecords: 0,
    authorizedEducators: 0,
    recentActivity: 0,
    averageGPA: 0
  })

  useEffect(() => {
    // TODO: Fetch actual stats from blockchain
    setStats({
      totalRecords: 1247,
      authorizedEducators: 23,
      recentActivity: 15,
      averageGPA: 3.42
    })
  }, [])

  const quickActions = [
    {
      title: 'Add Student Record',
      description: 'Create a new student performance record',
      icon: Plus,
      path: '/add-record',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Records',
      description: 'Browse and verify student records',
      icon: Eye,
      path: '/view-records',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Manage Educators',
      description: 'Authorize or revoke educator access',
      icon: Users,
      path: '/manage-educators',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the Decentralized Report Card system. Manage student records with transparency and trust.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Records"
          value={stats.totalRecords.toLocaleString()}
          icon={GraduationCap}
          color="bg-primary-500"
          description="Student records on blockchain"
        />
        <StatsCard
          title="Authorized Educators"
          value={stats.authorizedEducators.toString()}
          icon={Users}
          color="bg-green-500"
          description="Active educators"
        />
        <StatsCard
          title="Recent Activity"
          value={stats.recentActivity.toString()}
          icon={Clock}
          color="bg-yellow-500"
          description="Records added this week"
        />
        <StatsCard
          title="Average GPA"
          value={stats.averageGPA.toFixed(2)}
          icon={TrendingUp}
          color="bg-purple-500"
          description="System-wide average"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.path}
                to={action.path}
                className="card hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="card">
          <div className="space-y-4">
            {[
              { action: 'Record Added', student: 'John Doe', time: '2 hours ago', gpa: '3.8' },
              { action: 'Record Added', student: 'Jane Smith', time: '4 hours ago', gpa: '3.9' },
              { action: 'Educator Authorized', student: 'Dr. Johnson', time: '1 day ago', gpa: '-' },
              { action: 'Record Added', student: 'Mike Wilson', time: '2 days ago', gpa: '3.7' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">{item.student}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{item.time}</p>
                  {item.gpa !== '-' && (
                    <p className="text-sm font-medium text-gray-900">GPA: {item.gpa}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Blockchain Status</h3>
                <p className="text-sm text-gray-600">Stacks Network</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Contract Status</h3>
                <p className="text-sm text-gray-600">Smart Contract</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 