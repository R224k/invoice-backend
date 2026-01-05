// // const express = require("express");
// // const cors = require("cors");
// // const bodyParser = require("body-parser");

// // const db = require("./database/db"); // ✅ ONLY db declaration

// // const app = express();
// // const PORT = 5000;

// // app.use(cors());
// // app.use(bodyParser.json());

// // app.get("/", (req, res) => {
// //   res.send("Backend running");
// // });

// // app.get("/invoices", (req, res) => {
// //   db.all("SELECT * FROM invoices", [], (err, rows) => {
// //     if (err) return res.status(500).json(err);
// //     res.json(rows);
// //   });
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const db = require("./database/db");

// const app = express();   // ✅ app is defined HERE
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// /* ---------- TEST ROUTE ---------- */
// app.get("/", (req, res) => {
//   res.send("Backend running");
// });

// /* ---------- GET ALL INVOICES ---------- */
// app.get("/invoices", (req, res) => {
//   db.all("SELECT * FROM invoices", [], (err, rows) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json(err);
//     }
//     res.json(rows);
//   });
// });

// /* ---------- ADD NEW INVOICE ---------- */
// app.post("/invoices", (req, res) => {
//   const { invoice_number, client_name, date, amount, status } = req.body;

//   if (!invoice_number || !client_name || !date || !amount || !status) {
//     return res.status(400).json({ error: "All fields required" });
//   }

//   db.run(
//     `INSERT INTO invoices (invoice_number, client_name, date, amount, status)
//      VALUES (?, ?, ?, ?, ?)`,
//     [invoice_number, client_name, date, amount, status],
//     function (err) {
//       if (err) {
//         console.error(err);
//         return res.status(500).json(err);
//       }
//       res.json({ id: this.lastID });
//     }
//   );
// });

// /* ---------- START SERVER ---------- */
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend running");
});

/* GET ALL INVOICES */
app.get("/invoices", (req, res) => {
  db.all("SELECT * FROM invoices", [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

/* POST NEW INVOICE */
app.post("/invoices", (req, res) => {
  console.log("POST /invoices body:", req.body); // DEBUG

  const { invoice_number, client_name, date, amount, status } = req.body;

  if (!invoice_number || !client_name || !date || !amount || !status) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.run(
    `INSERT INTO invoices (invoice_number, client_name, date, amount, status)
     VALUES (?, ?, ?, ?, ?)`,
    [invoice_number, client_name, date, amount, status],
    function (err) {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json(err);
      }
      res.json({ id: this.lastID });
    }
  );
});

/* START SERVER */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
