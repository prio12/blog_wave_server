# BlogWave Server 🌊

A robust RESTful API backend for BlogWave, a modern blogging platform that enables users to create, share, and engage with blog content through features like bookmarking, clapping (likes), following, and real-time notifications.

## 🚀 Features

### User Management
- **User Registration & Authentication**: Secure user creation with duplicate prevention
- **Profile Management**: Update profile pictures, display names, and about sections
- **Social Features**: Follow/unfollow system with real-time notifications
- **User Discovery**: Fetch all users or specific user details

### Blog Operations
- **CRUD Operations**: Create, read, update, and delete blog posts
- **Rich Content**: Support for titles, descriptions, and images
- **Personal Collections**: View user-specific blogs
- **Author Information Sync**: Automatic author profile updates across all posts

### Engagement Features
- **Clapping System**: Like blogs with user tracking to prevent duplicates
- **Bookmarking**: Save favorite blogs for later reading
- **Responses/Comments**: Add responses to blog posts
- **Notifications**: Real-time follower notifications with read/unread status

### Admin Capabilities
- **Content Moderation**: Delete users or blogs with cascade cleanup
- **Data Integrity**: Automatic removal of references when content is deleted
- **Relationship Management**: Clean up followers, following, bookmarks, and claps

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: CORS enabled, environment variable configuration
- **Development**: Nodemon for hot-reloading

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prio12/blog_wave_server.git
   cd blogwave-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   PORT=5000
   ```

4. **Start the server**
   
   Development mode:
   ```bash
   npm run start-dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## 📡 API Endpoints

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Register a new user |
| GET | `/users` | Get all users |
| GET | `/users/:userUid` | Get specific user details |
| PUT | `/users/:userId` | Update user profile/follow/bookmark |
| PUT | `/user/notification` | Mark notifications as read |

### Blog Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/blogs` | Create a new blog post |
| GET | `/blogs` | Get all blog posts |
| GET | `/blogs/:blogId` | Get specific blog details |
| GET | `/blogs/myBlogs/:uid` | Get user's blogs |
| PUT | `/blogs/myBlogs/edit/:_id` | Update a blog post |
| PUT | `/blogs/updateAuthorInfo` | Update author info across posts |
| PUT | `/blogs/blogDetails/likes/:_id/:userId` | Add a clap/like to a blog |
| PUT | `/blogs/selectedBLog/responses/:_id` | Add a response/comment |

### Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| DELETE | `/delete/:_id` | Delete a blog post |
| DELETE | `/adminDelete` | Admin delete with cascade cleanup |

## 🗄️ Database Structure

### Collections

**users**
```javascript
{
  uid: String,
  name: String,
  email: String,
  profilePic: String,
  about: String,
  following: Array,
  followers: Array,
  bookmarks: Array,
  clapped: Array,
  notifications: Array
}
```

**blogs**
```javascript
{
  _id: ObjectId,
  userUid: String,
  author: String,
  authorImage: String,
  title: String,
  description: String,
  image: String,
  claps: Number,
  likedBy: Array,
  responses: Array,
  createdAt: Date
}
```

## 🔒 Security Features

- Environment variable protection for sensitive credentials
- Duplicate user prevention
- CORS configuration for cross-origin requests
- MongoDB injection protection through ObjectId validation

## 📦 Dependencies

```json
{
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "mongodb": "^6.1.0"
}
```

## 🚦 Server Status

The server runs on port `5000` by default (configurable via environment variables).

Health check endpoint:
```
GET / → "Blog Wave Server is running"
```

## 🔄 Data Integrity

The API implements cascade deletion patterns:
- When a blog is deleted, it's automatically removed from all users' bookmarks and clapped lists
- When a user is deleted, they're removed from all followers/following relationships
- Admin deletion ensures complete cleanup of related data

## 🎯 Future Enhancements

- [ ] Implement authentication middleware (JWT)
- [ ] Add pagination for blog feeds
- [ ] Implement search functionality
- [ ] Add rate limiting
- [ ] Create unit and integration tests
- [ ] Add input validation middleware
- [ ] Implement caching layer (Redis)
- [ ] Add TypeScript support

---

## 🔗 Related Repositories

- **[Blogwave Server](https://github.com/prio12/BlogWave)** - Backend API with Socket.io server, Express, and MongoDB

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For questions or feedback, please open an issue on the repository.

---

**Built with ❤️ for the blogging community**
