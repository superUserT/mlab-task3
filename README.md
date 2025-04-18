# Task 1: Simple Mock Media Server

This is a simple RESTful API built using Express.js to manage a list of objects. The API supports retrieving all objects and adding new ones.

## 🛠️ Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/superUserT/mlab-task3.git
   cd mlab-task3
   ```

2. **Install dependencies**:

   ```bash
   npm i
   ```

3. **Start the server**:

   ```bash
   npm start
   ```

   By default, the server runs on port `3000`.

---

## 📡 API Endpoints

### `GET /objects`

Returns the list of stored objects.

#### Example:

```bash
curl http://localhost:3000/movies
```

#### Response:

```json
[
  { "title": "The Godfather" },
  { "title": "The Dark Knight" },
  { "title": "Jerusalema" },
  { "title": "tsotsi" },
  { "title": "The Lord of the Rings" },
  { "title": "up!" }
]
```

---

### `POST /objects`

Adds a new object. The request body must be JSON with at least a `name` field.

#### Example:

```bash
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"title": "Tekken"}'
```

#### Response:

```json
{
  // previous movies
  "title": "Tekken"
}
```

---

## 🧱 Project Structure

- `index.js`: Entry point of the server, defines routes.
- `objects.js`: Contains the object storage and utility functions.

---

## 🔒 Notes

- This API uses in-memory storage; restarting the server will reset the object list.
- There is no validation or error handling beyond basic route handling.

---

## 📬 Contact

For questions or contributions, open an issue or pull request on the repository.
