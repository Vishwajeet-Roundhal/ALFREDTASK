# 🧠 Flashcard Learning App (Leitner System)

A full-stack flashcard learning application implementing the **Leitner System** using the **MERN stack (MongoDB, Express.js, React, Node.js)**. This app helps users review flashcards using spaced repetition, tracking progress through different review boxes.

---

## 🚀 Features  
✅ **Leitner System-based Flashcard Learning**  
✅ **User Authentication (JWT)**  
✅ **Spaced Repetition Algorithm**  
✅ **Flashcard Management (Add, Edit, Delete)**  
✅ **Real-time Progress Tracking**  

---

## 🛠️ Setup Instructions  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/Vishwajeet-Roundhal/ALFREDTASK.git
cd ALFREDTASK
```
### 2️⃣ Backend Setup (Node.js & Express.js)
```sh
node server
npm i
```
### Create .env file
```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run server
```sh
node server
```
The backend runs on http://localhost:5000

### 3️⃣ Frontend Setup (React.js) and Navigate to the Frontend folder
```sh
npm i
```
Run Frontend server
```sh
npx vite
```
The frontend runs on http://localhost:5173/

## 📌 Thought Process & Implementation

#### 🛠 How It Works:  
- Each flashcard **starts in Box 1**.  
- If the user **answers correctly**, the card moves to the **next box**.  
- If the user **answers incorrectly**, the card moves **back to Box 1**.  
- The **next review date** is set based on the box number:  

| Box Number | Next Review After |
|------------|------------------|
| 📦 **Box 1** | 1 Day |
| 📦 **Box 2** | 3 Days |
| 📦 **Box 3** | 7 Days |
| 📦 **Box 4** | 14 Days |
| 📦 **Box 5** | 30 Days |

- **Cards in higher boxes appear less frequently**, reinforcing spaced repetition.
- Once a flashcard reaches **Box 5**, it is considered **mastered** and appears rarely.
