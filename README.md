# SWIFT Codes Directory

## 👤 About Me

This project was developed using my preferred technology stack TypeScript as it is the language I use daily in my current job. However, I'm actively seeking opportunities to transition away from it. I'm highly motivated and eager to learn a new language such as **Go** from the ground up. Due to a high workload and time constraints, I wasn't able to spend as much time on refining the frontend design as I would have liked.
I’m aware that credentials like those in .env or .yml files should not be exposed, and under normal circumstances I would apply proper security practices. However, since these are purely example/demo values and not sensitive data, I’ve left them as-is to avoid spending extra time on unnecessary security hardening for this project.

To improve performance and ensure scalability, several backend optimizations were introduced:
- **`bic8` column** was derived and indexed to facilitate efficient lookup of SWIFT code branches.
- **Database indexes** were added on key fields such as `swift_code`, `bic8`, `country_iso2`, and `is_headquarter` to optimize query performance.


## 📦 Tech Stack

- **Backend:** Node.js, Express, PostgreSQL, Sequelize
- **Frontend:** Angular
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **Testing:** Jest + Supertest (backend)
- **Deployment:** Nginx for frontend

---

## 🚀 Features

- Retrieve full details of SWIFT codes
- Get all SWIFT codes for a specific country
- Add new entries
- Delete existing codes
- Automatic database seed from CSV
- Fully containerized setup with Docker
- CI-friendly backend test suite

---

## 🔧 Setup

### 1. Clone repo
```bash
git clone https://github.com/yancostrishevsky/SWIFTcodes.git
cd SWIFTcodes
```

### 2. Start full stack
```bash
docker-compose up --build
```

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/v1/swift-codes

---

## 🧲 Run Tests

Tests are run automatically inside the `tests` container, but you can also run them manually:

```bash
docker-compose run --rm tests
```

---

## ✅ What the Tests Cover

The backend test suite, written in **Jest** and **Supertest**, validates all major API functionalities:

| Endpoint | Purpose |
|----------|---------|
| `GET /v1/swift-codes/:swiftCode` | Verifies retrieval of a valid SWIFT code entry |
| `GET /v1/swift-codes/:swiftCode (404)` | Ensures proper handling of unknown SWIFT codes |
| `GET /v1/swift-codes/country/:iso2` | Fetches all codes for a specified country |
| `POST /v1/swift-codes` | Validates input and successfully creates new SWIFT entries |
| `POST (missing fields)` | Confirms rejection of incomplete requests |
| `DELETE /v1/swift-codes/:swiftCode` | Deletes a specific SWIFT code and confirms removal |
| `DELETE again` | Validates 404 response when deleting an already-deleted code |
| `GET HQ with branches` | If the code is a headquarter, ensures the `branches` array is returned |

Each test creates and cleans up its data to maintain database consistency. Tests also include edge cases and assert on HTTP status codes, response structure, and field presence.

---

## 📁 Folder Structure

```
.
├── backend/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── db-init/
│   ├── Dockerfile
│   └── ...
├── frontend-swift/
│   ├── src/
│   ├── dist/
│   ├── angular.json
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## 📁 API Endpoints

### 1. Get SWIFT code details

`GET /v1/swift-codes/:swiftCode`

**Response for HQ:**
```json
{
  "address": "...",
  "bankName": "...",
  "countryISO2": "...",
  "countryName": "...",
  "isHeadquarter": true,
  "swiftCode": "...",
  "branches": [...]
}
```

**Response for branch:**
```json
{
  "address": "...",
  "bankName": "...",
  "countryISO2": "...",
  "countryName": "...",
  "isHeadquarter": false,
  "swiftCode": "..."
}
```

---

### 2. Get SWIFT codes for country

`GET /v1/swift-codes/country/:countryISO2`

```json
{
  "countryISO2": "PL",
  "countryName": "Poland",
  "swiftCodes": [ ... ]
}
```

---

### 3. Add new entry

`POST /v1/swift-codes`

```json
{
  "swiftCode": "TEST123XXX",
  "bankName": "Test Bank",
  "address": "Some Address",
  "countryISO2": "PL",
  "countryName": "Poland",
  "isHeadquarter": true
}
```

---

### 4. Delete SWIFT code

`DELETE /v1/swift-codes/:swiftCode`

```json
{ "message": "SWIFT Code deleted" }
```

---

## 📦 Docker Tips

Rebuild everything:

```bash
docker-compose down -v
docker-compose up --build
```

---

## ✅ Quality Goals

- Code style consistent and clean
- Proper error handling and validation
- All API responses match specification
- Unit + integration tests included
- Portable and containerized
- Easy to run, easy to maintain

---

## 🧠 Author

Jan Stryszewski  
Made with high standards and a little bit of TypeScript pain.

