var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

// Set handlebars as templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Setup connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "89482579Ab",
    database: "burgers_db"
});

// Setup connection to database
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId); 
});

// Use Handlebars to render the main index.html page
app.get("/", function(req,res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
        if (err) {
            return res.status(500).end;
        }
        res.render("index", {burgers:data});
    });
});

// Add a new item to the database
app.post("/burgers", function(req,res) {
    connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.plan], function(err, result) {
        if (err) {
            return res.status(500).end();
        }
        // Send back the ID of the new item
        res.json({ id: result.insertId });
        console.log({ id: result.insertID });
    });
});

// Update an item
app.put("/burgers/:id", function(req, res) {
    connection.query("UPDATE burgers SET burger = ? WHERE id = ?", [req.body.plan, req.params.id], function(err, result) {
        if (err) {
            return res.status(500).end();
        }
        else if (result.changedRows === 0) {
            // If no rows were changed then ID must not exist, so send 404 error
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Start server so it can listen for client requests
app.listen(PORT, function() {
    // Log (server-side) when server has started
    console.log("Server listening on http://localhost:" + PORT);
});