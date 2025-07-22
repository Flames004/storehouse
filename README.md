# Storehouse - Cloud File Storage System

A cloud storage file system built with Node.js and Express.js that provides secure cloud file storage and management capabilities. Users can register accounts, upload files, and access their data from anywhere with robust authentication and file management features.

## 🚀 Features

### Core Features
- **User Authentication**: Secure registration and login system with JWT tokens
- **File Upload**: Upload files to personal cloud storage
- **File Download**: Download and access stored files from anywhere
- **File Management**: Organize and manage personal file collections
- **Cloud Storage**: Secure cloud-based file storage with MongoDB
- **Personal Dashboard**: Individual user accounts with private file access

### Security Features
- **Password Hashing**: BCrypt password hashing for enhanced security
- **JWT Authentication**: Token-based authentication for secure sessions
- **Input Sanitization**: Server-side validation and sanitization
- **Private Storage**: Each user has isolated, secure file storage
- **Access Control**: Files are only accessible by their owners

### Storage Features
- **MongoDB Integration**: Scalable NoSQL database for user and file metadata
- **File Metadata**: Track file information, upload dates, and ownership
- **User Isolation**: Complete separation of user data and files
- **Secure Access**: Authentication-protected file operations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Embedded JavaScript templating engine
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Flowbite** - Component library built on Tailwind CSS

### File Storage & Management
- **Cloud Storage** - Secure file storage and retrieval system
- **File Metadata** - Track file information and ownership
- **User Isolation** - Private file storage per user account

### Security & Authentication
- **BCrypt** - Password hashing library
- **JSON Web Token (JWT)** - Token-based authentication
- **Express Validator** - Server-side input validation

### Development Tools
- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management
- **Cookie Parser** - Cookie parsing middleware

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "dotenv": "^17.2.0",
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "express-validator": "^7.2.1",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.16.4"
}
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Flames004/storehouse.git
   cd storehouse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/storehouse_database
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   PORT=3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Run the application**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`


## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/user/register` | Display registration form | Public |
| POST | `/user/register` | Create new user account | Public |
| GET | `/user/login` | Display login form | Public |
| POST | `/user/login` | Authenticate user and return JWT | Public |

### File Management Routes (Future Implementation)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/files` | Display user's file dashboard | Private |
| POST | `/files/upload` | Upload file to user's storage | Private |
| GET | `/files/download/:id` | Download specific file | Private |
| DELETE | `/files/:id` | Delete user's file | Private |

### Request/Response Examples

#### Registration (POST `/user/register`)
**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64f8b2a1e123456789abcdef",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### Login (POST `/user/login`)
**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8b2a1e123456789abcdef",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

## ⚙️ Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB connection string for user and file metadata
- `JWT_SECRET`: Secret key for JWT token signing and verification
- `PORT`: Server port (default: 3000)

### User Database Schema
```javascript
{
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  }
}
```

### File Schema (Future Implementation)
```javascript
{
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}
```

## 🔒 Security Measures

- **Password Hashing**: All passwords are hashed using BCrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication with expiration
- **Input Validation**: Server-side validation for all user inputs
- **File Isolation**: Each user can only access their own uploaded files
- **Secure Upload**: File validation and secure storage practices
- **Error Handling**: Secure error messages without exposing sensitive data

## 🎨 UI Components

The application uses **Tailwind CSS** and **Flowbite** for styling:
- Responsive design that works on all devices
- Dark mode support for better user experience
- Modern file upload and management interface
- Clean dashboard design for file organization
- Consistent design system with utility classes

## 🚀 Future Enhancements

### Phase 1 - Core File Management
- [ ] File upload functionality with drag-and-drop
- [ ] File download and preview capabilities
- [ ] File deletion and management
- [ ] File organization with folders

### Phase 2 - Advanced Features
- [ ] File sharing with other users
- [ ] File versioning and history
- [ ] Search and filter capabilities
- [ ] File type restrictions and validation

### Phase 3 - Enhanced Security & UX
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] File encryption for sensitive data

### Phase 4 - Collaboration & Integration
- [ ] Real-time collaboration features
- [ ] Social media authentication
- [ ] API for third-party integrations
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

>Made by Deepak Shukla
