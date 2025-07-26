import { callReadOnlyFunction, callFunction, broadcastTransaction } from '@stacks/transactions'
import { StacksMainnet, StacksTestnet } from '@stacks/network'
import { UserSession } from '@stacks/connect'

// Contract configuration
const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFYVDGX8MNSYVEJSXKT136DCPEHW'
const CONTRACT_NAME = 'decentralized-report-card'
const NETWORK = process.env.NODE_ENV === 'production' ? new StacksMainnet() : new StacksTestnet()

export interface StudentRecord {
  studentId: string
  studentName: string
  grades: number[]
  subjects: string[]
  gpa: number
  timestamp: number
  academicYear: string
  institution: string
}

export interface Educator {
  address: string
  name: string
  institution: string
  authorizedAt: number
  isAuthorized: boolean
}

export class BlockchainService {
  private userSession: UserSession

  constructor(userSession: UserSession) {
    this.userSession = userSession
  }

  // Get student record from blockchain
  async getStudentRecord(studentId: string): Promise<StudentRecord | null> {
    try {
      const result = await callReadOnlyFunction({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-student-record',
        functionArgs: [studentId],
        senderAddress: this.userSession.loadUserData()?.address || '',
      })

      if (result && result.value) {
        // Parse the result from Clarity format to our interface
        return this.parseStudentRecord(result.value)
      }
      return null
    } catch (error) {
      console.error('Error fetching student record:', error)
      return null
    }
  }

  // Add student record to blockchain
  async addStudentRecord(record: Omit<StudentRecord, 'timestamp'>): Promise<boolean> {
    try {
      const functionArgs = [
        record.studentId,
        record.studentName,
        record.grades,
        record.subjects,
        record.gpa,
        record.academicYear,
        record.institution
      ]

      const transaction = await callFunction({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'add-student-record',
        functionArgs,
        senderKey: this.userSession.loadUserData()?.appPrivateKey || '',
      })

      const result = await broadcastTransaction(transaction, NETWORK)
      return result.ok
    } catch (error) {
      console.error('Error adding student record:', error)
      return false
    }
  }

  // Check if educator is authorized
  async isAuthorizedEducator(address: string): Promise<boolean> {
    try {
      const result = await callReadOnlyFunction({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'is-authorized-educator',
        functionArgs: [address],
        senderAddress: this.userSession.loadUserData()?.address || '',
      })

      return result.value === true
    } catch (error) {
      console.error('Error checking educator authorization:', error)
      return false
    }
  }

  // Authorize educator
  async authorizeEducator(address: string): Promise<boolean> {
    try {
      const transaction = await callFunction({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'authorize-educator',
        functionArgs: [address],
        senderKey: this.userSession.loadUserData()?.appPrivateKey || '',
      })

      const result = await broadcastTransaction(transaction, NETWORK)
      return result.ok
    } catch (error) {
      console.error('Error authorizing educator:', error)
      return false
    }
  }

  // Revoke educator authorization
  async revokeEducator(address: string): Promise<boolean> {
    try {
      const transaction = await callFunction({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'revoke-educator',
        functionArgs: [address],
        senderKey: this.userSession.loadUserData()?.appPrivateKey || '',
      })

      const result = await broadcastTransaction(transaction, NETWORK)
      return result.ok
    } catch (error) {
      console.error('Error revoking educator:', error)
      return false
    }
  }

  // Get contract owner
  async getContractOwner(): Promise<string | null> {
    try {
      const result = await callReadOnlyFunction({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-contract-owner',
        functionArgs: [],
        senderAddress: this.userSession.loadUserData()?.address || '',
      })

      return result.value as string
    } catch (error) {
      console.error('Error getting contract owner:', error)
      return null
    }
  }

  // Parse Clarity result to StudentRecord
  private parseStudentRecord(clarityResult: any): StudentRecord {
    // This would need to be implemented based on the actual Clarity data structure
    // For now, returning a mock structure
    return {
      studentId: clarityResult.studentId || '',
      studentName: clarityResult.studentName || '',
      grades: clarityResult.grades || [],
      subjects: clarityResult.subjects || [],
      gpa: clarityResult.gpa || 0,
      timestamp: clarityResult.timestamp || Date.now(),
      academicYear: clarityResult.academicYear || '',
      institution: clarityResult.institution || ''
    }
  }

  // Get all student records (this would need to be implemented based on your contract structure)
  async getAllStudentRecords(): Promise<StudentRecord[]> {
    // This is a placeholder - you would need to implement this based on your contract
    // You might need to maintain an index or use events to track all records
    return []
  }

  // Get all authorized educators (this would need to be implemented based on your contract structure)
  async getAllEducators(): Promise<Educator[]> {
    // This is a placeholder - you would need to implement this based on your contract
    // You might need to maintain an index or use events to track all educators
    return []
  }
}

// Utility function to create blockchain service
export const createBlockchainService = (userSession: UserSession): BlockchainService => {
  return new BlockchainService(userSession)
} 