// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
};

// Object for all our SQL statement functions.
var orm = {
  // Funtion that returns all table entries
  all: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  // Function that insert a single table entry
  create: function(table, cols, vals, callback) {
    // Construct the query string add single row
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log(queryString);
		// Perform the database query
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  update: function(tableName, colVal, boolean, colName, condition, callback) {
    // Set the query string update a specific row
    var queryString = "UPDATE ?? SET ??=? WHERE ??=?";
    console.log(queryString);
    // Perform the database query
    connection.query(queryString, [tableName, colVal, boolean, colName, condition], function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }
};

// Export the orm object for use in the model (burger.js)
module.exports = orm;
