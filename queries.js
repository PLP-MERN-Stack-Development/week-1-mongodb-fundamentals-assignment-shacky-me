// MongoDB Queries for plp_bookstore
// Task 1: MongoDB Setup (Done manually)
// ---------------------------
// - Database: plp_bookstore
// - Collection: books

// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// 3. Find books by a specific author
db.books.find({ author: "Paulo Coelho" });

// 4. Update the price of a specific book
db.books.updateOne({ title: "The Alchemist" }, { $set: { price: 18.99 } });

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Alchemist" });

// Task 3: Advanced Queries

// 6. Books in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 },
});

// 7. Projection: title, author, price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

// 8. Sort by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination (Page 2, 5 books per page)
const page = 2;
const pageSize = 5;
db.books
  .find({}, { _id: 0, title: 1, author: 1, price: 1 })
  .sort({ price: 1 })
  .skip((page - 1) * pageSize)
  .limit(pageSize);

// Task 4: Aggregation Pipeline

// 11. Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
    },
  },
  {
    $sort: { averagePrice: -1 },
  },
]);

// 12. Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 },
    },
  },
  {
    $sort: { bookCount: -1 },
  },
  {
    $limit: 1,
  },
]);

// 13. Group books by publication decade
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          {
            $toString: {
              $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10],
            },
          },
          "s",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { _id: 1 },
  },
]);

// Task 5: Indexing

// 14. Create an index on the title field
db.books.createIndex({ title: 1 });

// 15. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 16. Use explain() to show performance improvement
db.books.find({ title: "The Alchemist" }).explain("executionStats");

// 17. List all current indexes
db.books.getIndexes();
