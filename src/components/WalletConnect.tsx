import { Wallet, Shield, Lock, Users, Sparkles, ArrowRight, CheckCircle, Zap } from 'lucide-react'

interface WalletConnectProps {
  onConnect: () => void
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 slide-in">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-6 rounded-full shadow-2xl floating">
              <Wallet className="h-16 w-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">Decentralized</span>
          <br />
          <span className="text-gray-900">Report Card</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Secure, immutable student performance records on the Stacks blockchain. 
          Connect your wallet to manage academic records with transparency and trust.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={onConnect}
            className="btn-primary text-lg px-8 py-4 flex items-center space-x-3 min-w-[250px] group"
          >
            <Wallet className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            <span>Connect Your Wallet</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-3 min-w-[250px] group">
            <Zap className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            <span>Watch Demo</span>
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card-hover text-center group">
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Shield className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Immutable Records</h3>
          <p className="text-gray-600 leading-relaxed">
            Once issued, report cards are permanently stored on the blockchain and cannot be modified or deleted, ensuring complete data integrity.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600 font-medium">100% Secure</span>
          </div>
        </div>

        <div className="card-hover text-center group">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Lock className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Access</h3>
          <p className="text-gray-600 leading-relaxed">
            Only authorized educators can issue report cards, ensuring data integrity and preventing fraud through blockchain-based authentication.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-600 font-medium">Authorized Only</span>
          </div>
        </div>

        <div className="card-hover text-center group">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Users className="h-10 w-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Verification</h3>
          <p className="text-gray-600 leading-relaxed">
            Anyone can verify the authenticity of report cards through the public blockchain ledger, building trust through complete transparency.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-purple-600 font-medium">Public Verification</span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 gradient-text">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: 1, title: 'Connect Wallet', desc: 'Connect your Stacks wallet to access the platform', icon: Wallet },
            { step: 2, title: 'Add Records', desc: 'Authorized educators can add student performance records', icon: Shield },
            { step: 3, title: 'Verify Records', desc: 'Anyone can view and verify the authenticity of records', icon: CheckCircle },
            { step: 4, title: 'Trust & Transparency', desc: 'Build trust through decentralized, immutable records', icon: Sparkles }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 transform translate-x-4"></div>
                  )}
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="card mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10,000+', label: 'Records Stored', color: 'text-blue-600' },
            { number: '500+', label: 'Institutions', color: 'text-green-600' },
            { number: '99.9%', label: 'Uptime', color: 'text-purple-600' },
            { number: '24/7', label: 'Verification', color: 'text-orange-600' }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="glass-effect rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the future of academic record management. Connect your wallet and start building trust through blockchain technology.
          </p>
          <button
            onClick={onConnect}
            className="btn-primary text-lg px-10 py-4 flex items-center space-x-3 mx-auto group"
          >
            <Wallet className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            <span>Connect Wallet Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletConnect 