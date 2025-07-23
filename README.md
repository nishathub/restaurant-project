# MERN Stack Restaurant Management App

A full-featured restaurant web application built with the MERN stack. This app allows customers to browse the menu, register/login, add items to their cart, and make secure payments using Stripe. Admins have access to a dashboard with analytics, user management, and full control over the menu system.

---

## Features

### Authentication & Authorization
- JWT-based user authentication
- Role-based access control (Admin/User)
- Admin routes are protected on both frontend and backend

### Customer Features
- Account creation & login
- Browse restaurant menu
- Add/remove items to cart
- Stripe payment integration

### Admin Panel
- View dashboard analytics using Recharts
- Add, edit, delete menu items
- Manage users: promote/demote roles, delete users/admins

### Dashboard & Analytics
- Dynamic charts with `recharts`
- Stats on users, menu etc.

### Tech Stack

| Frontend        | Backend           | Database | Other Tools         |
|----------------|-------------------|----------|----------------------|
| React.js        | Node.js + Express | MongoDB  | Stripe  |
| Tailwind CSS    | JWT Auth          |  | Recharts, Axios      |
| Custom Components | MongoDB Aggregation |   | Custom Hooks & Alerts |

---

## Custom Components

-  **Custom Alert System** – Dynamic pop-up alerts for feedback
-  **Loading Spinner** – Indicates ongoing async operations
-  **Custom Delete Modal** – Confirm before deletion actions
-  **Axios Instance Hook** – Handles secure API requests with JWT
-  Admin routes secured by frontend middleware

---

## Backend Highlights

- RESTful APIs with Express.js
- Advanced MongoDB operations:
  - `$lookup`, `$unwind`, `$group`, `$aggregate`
- Role-based route protection
- ImageBB API integration for image handling

---

## Roadmap

- [ ] Email notifications for order confirmations
- [ ] Multi-image upload for menu items
- [ ] Enhanced order tracking system
- [ ] Admin activity logs
- [ ] Pagination and search functionality for admin tables
- [ ] User profile page with order history

---

## Author

**Ashraf Ali**  
MERN Stack Developer  

- [Portfolio](https://ashraf-portfolio-wd.web.app)
- [Resume](https://docs.google.com/document/d/1Z7rp08uI8xHl0tulbbvn0-K1c9otI0mfOo34c2c8djM/edit?usp=sharing) 
- [LinkedIn Profile](https://www.linkedin.com/in/ashrafalibutex42)  
- [Github Profile](https://github.com/nishathub)  
- [Email](mailto:ashraf.ali.butex42@gmail.com)  
