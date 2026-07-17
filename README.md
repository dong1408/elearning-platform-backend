# E-Learning Platform - Backend API

Backend API cho nền tảng E-Learning, xây dựng với **Node.js + Express + TypeScript** theo kiến trúc layered (MVC).

## Cấu trúc thư mục

```
backend/
├── src/
│   ├── config/         # Cấu hình (env, database)
│   ├── controllers/    # Điều hướng request & response
│   ├── services/       # Logic nghiệp vụ
│   ├── repositories/   # Tương tác database
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Định tuyến API
│   ├── middlewares/    # Auth, validate, error handling
│   ├── validations/    # Joi schemas
│   ├── utils/          # Logger, JWT, response helpers
│   ├── constants/      # Hằng số dùng chung
│   ├── helpers/        # Password hashing, v.v.
│   ├── types/          # TypeScript interfaces & declarations
│   ├── app.ts          # Express app setup
│   └── server.ts       # Entry point
├── tests/
├── uploads/
├── public/
└── logs/
```

## Yêu cầu

- Node.js >= 18
- MongoDB

## Cài đặt

```bash
cp .env.example .env
npm install
```

## Chạy ứng dụng

```bash
# Development (nodemon + tsx)
npm run dev

# Build TypeScript
npm run build

# Production
npm start
```

## API Endpoints

| Method | Endpoint              | Mô tả              | Auth |
|--------|-----------------------|--------------------|------|
| GET    | /api/health           | Health check       | No   |
| POST   | /api/auth/register    | Đăng ký            | No   |
| POST   | /api/auth/login       | Đăng nhập          | No   |
| GET    | /api/users/profile    | Xem hồ sơ          | Yes  |
| PUT    | /api/users/profile    | Cập nhật hồ sơ     | Yes  |

## Biến môi trường

Xem file `.env.example` để biết danh sách biến cần cấu hình.
