# Decentralized Report Card - Frontend

A modern, responsive React frontend for the Decentralized Report Card system built on the Stacks blockchain.

## Features

### 🎓 **Student Record Management**
- Add immutable student performance records to the blockchain
- View and verify student records with transparency
- Search and filter records by various criteria
- Real-time GPA calculation and validation

### 👨‍🏫 **Educator Authorization System**
- Authorize new educators to issue report cards
- Revoke educator access when needed
- Manage educator permissions securely
- Track authorization history

### 🔐 **Secure Wallet Integration**
- Stacks wallet connection for secure transactions
- User authentication and authorization
- Transaction signing and broadcasting
- Real-time blockchain interaction

### 📱 **Modern UI/UX**
- Responsive design for all devices
- Beautiful, intuitive interface
- Real-time feedback and notifications
- Loading states and error handling

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Stacks Connect** - Blockchain wallet integration
- **Stacks Transactions** - Smart contract interactions

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Stacks wallet (Hiro Wallet recommended)
- Access to Stacks blockchain (testnet/mainnet)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx     # Navigation component
│   └── WalletConnect.tsx # Wallet connection UI
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── AddRecord.tsx   # Add student records
│   ├── ViewRecords.tsx # View and search records
│   └── ManageEducators.tsx # Manage educator access
├── services/           # Business logic and API calls
│   └── blockchain.ts   # Stacks blockchain integration
├── App.tsx            # Main app component
├── main.tsx           # React entry point
└── index.css          # Global styles
```

## Smart Contract Integration

The frontend integrates with the Clarity smart contract through the `BlockchainService` class:

### Key Functions

- `addStudentRecord()` - Add new student performance records
- `getStudentRecord()` - Retrieve student records
- `authorizeEducator()` - Grant educator access
- `revokeEducator()` - Revoke educator access
- `isAuthorizedEducator()` - Check educator permissions

### Contract Address

- **Testnet:** `ST1PQHQKV0RJXZFYVDGX8MNSYVEJSXKT136DCPEHW.decentralized-report-card`
- **Mainnet:** (To be deployed)

## Usage Guide

### 1. Connect Wallet

1. Click "Connect Wallet" on the landing page
2. Choose your Stacks wallet (Hiro Wallet recommended)
3. Authorize the application
4. Your wallet address will be displayed in the navbar

### 2. Dashboard

The dashboard provides:
- System statistics and overview
- Quick access to main functions
- Recent activity feed
- System status indicators

### 3. Add Student Records

1. Navigate to "Add Record"
2. Fill in student information:
   - Student ID (unique identifier)
   - Student Name
   - Academic Year
   - Institution
3. Add subject grades (0-4 scale)
4. Review calculated GPA
5. Submit to blockchain (immutable)

### 4. View Records

1. Navigate to "View Records"
2. Search by student name or ID
3. Filter by institution or academic year
4. View detailed grade breakdowns
5. Verify blockchain authenticity

### 5. Manage Educators

1. Navigate to "Manage Educators"
2. Add new educators with their Stacks address
3. View current authorization status
4. Revoke access when needed
5. Monitor authorization history

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_NETWORK=testnet  # or mainnet
VITE_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFYVDGX8MNSYVEJSXKT136DCPEHW
VITE_CONTRACT_NAME=decentralized-report-card
```

### Network Configuration

The app automatically detects the environment:
- **Development:** Uses Stacks testnet
- **Production:** Uses Stacks mainnet

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- Functional components with hooks
- Proper error handling
- Loading states for UX

### Testing

```bash
npm run test
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder
3. Configure environment variables

### Manual Deployment

1. Build the project: `npm run build`
2. Upload `dist` contents to your web server
3. Configure your server for SPA routing

## Security Considerations

- All transactions are signed by the user's wallet
- No private keys are stored in the application
- Smart contract validation prevents unauthorized access
- Immutable records ensure data integrity
- Transparent verification through blockchain

## Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Ensure you have a Stacks wallet installed
   - Check network connectivity
   - Verify wallet is unlocked

2. **Transaction Failed**
   - Check if you have sufficient STX for fees
   - Verify you're on the correct network
   - Ensure you're authorized for the action

3. **Records Not Loading**
   - Check blockchain network status
   - Verify contract address is correct
   - Check browser console for errors

### Support

For issues or questions:
- Check the browser console for error messages
- Verify your wallet connection
- Ensure you're on the correct network
- Contact the development team

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Built with ❤️ on the Stacks blockchain** 