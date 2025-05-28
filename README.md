# MongoDB Book Database Operations

This repository contains MongoDB queries for managing a book database, including operations for filtering, pagination, and indexing.

---

## Getting Started

To run these scripts, you'll need a running MongoDB instance and the MongoDB Shell (`mongo` or `mongosh`).

### Prerequisites

- **MongoDB Server:** Ensure your MongoDB server is running. You can typically start it via `mongod` if you installed it manually, or as a service if set up.
- **MongoDB Shell:** Have `mongo` (legacy) or `mongosh` (recommended modern shell) installed and accessible in your system's PATH.

### 1. Save Your Queries

Make sure all your MongoDB queries are saved in a single file named `queries.js` in the root directory of this project.

An example `queries.js` would look like this:

```javascript
// queries.js
// Create indexes
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });

// Find books in stock and published after 1925
db.books
  .find({
    in_stock: true,
    published_year: { $gt: 1925 },
  })
  .limit(5)
  .skip(0);

// Explain query execution
db.books.find({ title: "The Great Gatsby" }).explain("executionStats");
```
