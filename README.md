# ShopEase — Fullstack E-commerce (React + Spring Boot + MySQL)

A complete e-commerce web app: browse products, register/login, add to cart,
checkout, and view order history.

- **Frontend:** React 18 + Vite + React Router + Axios
- **Backend:** Spring Boot 3 (Java 17) + Spring Security + JWT + Spring Data JPA
- **Database:** MySQL

---

## 1. Prerequisites

Install these before you start:

- **Java 17+** — `java -version`
- **Maven 3.8+** — `mvn -version` (or use the included `mvnw` if you generate one)
- **Node.js 18+** and npm — `node -v`
- **MySQL 8+** running locally — `mysql --version`

---

## 2. Database setup

You don't need to manually create tables — Hibernate does that automatically
(`ddl-auto=update`) and seeds a few sample products on first run
(`data.sql`). You only need to make sure MySQL is running and a user/password
that can create databases exists.

By default the backend expects:

```
Host: localhost:3306
Database: ecommerce_db   (auto-created if missing)
Username: root
Password: root
```

If your MySQL credentials differ, edit:

```
ecommerce-backend/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

---

## 3. Run the backend

```bash
cd ecommerce-backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**.

On first run, Hibernate creates all tables and `data.sql` inserts 3 sample
categories and 6 sample products, so the storefront isn't empty.

### Quick API test

```bash
# Register a user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"password123"}'

# List products (public)
curl http://localhost:8080/api/products
```

### Making yourself an admin

New users get role `USER` by default. To manage products (create/update/delete),
promote a user to `ADMIN` directly in MySQL:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'jane@example.com';
```

Then log in again on the frontend to get a fresh token with the ADMIN role.

---

## 4. Run the frontend

In a **separate terminal**:

```bash
cd ecommerce-frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173** and talks to the backend at
`http://localhost:8080/api` (configured in `src/api/axios.js`).

---

## 5. What's included

### Backend (`ecommerce-backend/`)
- JWT-based authentication (`/api/auth/register`, `/api/auth/login`)
- Product catalog with categories, search, and filtering
  (`/api/products`, `/api/categories`)
- Cart management, tied to the logged-in user (`/api/cart`)
- Checkout flow that validates stock, creates an order, deducts inventory,
  and clears the cart (`/api/orders/checkout`)
- Order history (`/api/orders`, `/api/orders/{id}`)
- Role-based authorization: only `ADMIN` users can create/update/delete
  products; anyone can browse
- Global exception handling with clean JSON error responses
- Sample seed data so the store isn't empty on first run

### Frontend (`ecommerce-frontend/`)
- Product listing with search + category filter
- Product detail page with add-to-cart
- Cart page (update quantity, remove items, live total)
- Checkout page (shipping address, order placement)
- Login / Register pages with JWT stored in `localStorage`
- Order history page
- Auto-logout when the JWT expires or is invalid (401 handling)
- Clean, responsive CSS — no UI framework dependency

---

## 6. API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account, returns JWT |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/products` | Public | List products (`?categoryId=`, `?search=`) |
| GET | `/api/products/{id}` | Public | Product detail |
| POST | `/api/products` | ADMIN | Create product |
| PUT | `/api/products/{id}` | ADMIN | Update product |
| DELETE | `/api/products/{id}` | ADMIN | Delete product |
| GET | `/api/categories` | Public | List categories |
| GET | `/api/cart` | USER | Get current user's cart |
| POST | `/api/cart` | USER | Add item to cart `{productId, quantity}` |
| PUT | `/api/cart/{id}` | USER | Update quantity `{quantity}` |
| DELETE | `/api/cart/{id}` | USER | Remove cart item |
| POST | `/api/orders/checkout` | USER | Place order `{shippingAddress}` |
| GET | `/api/orders` | USER | Order history |
| GET | `/api/orders/{id}` | USER | Order detail |

All authenticated requests need header: `Authorization: Bearer <token>`

---

## 7. Project structure

```
ecommerce-backend/
  src/main/java/com/ecommerce/
    config/          # Security config
    security/        # JWT util + filter
    model/            # JPA entities
    repository/       # Spring Data repositories
    dto/              # Request/response objects
    service/           # Business logic
    controller/         # REST endpoints
    exception/          # Custom exceptions + global handler
  src/main/resources/
    application.properties
    data.sql          # Seed data

ecommerce-frontend/
  src/
    api/axios.js       # Axios instance with JWT interceptor
    context/            # Auth + Cart React context
    components/          # Navbar, ProductCard, PrivateRoute
    pages/                # Home, ProductDetail, Cart, Checkout, Login, Register, Orders
    App.jsx
    main.jsx
    styles.css
```

---

## 8. Next steps / ideas to extend

- Add product image upload instead of URL-only
- Add an admin dashboard UI (currently the ADMIN endpoints exist but there's
  no dedicated admin frontend — you can call them via curl/Postman or add a
  simple admin page)
- Add pagination to the product list
- Add payment gateway integration (Stripe/Razorpay) at checkout
- Add product reviews/ratings
- Dockerize both services with a `docker-compose.yml` for one-command startup
