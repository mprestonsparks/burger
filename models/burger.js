// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  // Select all entries in the burgers table
  all: function(callback) {
    orm.all("burgers", function(res) {
      callback(res);
    });
  },
  // The variables cols and vals are arrays
  create: function(cols, vals, callback) {
    orm.create("burgers", cols, vals, function(res) {
      callback(res);
    });
  },
  // objColVals is an object specifying columns as object keys with associated values
  update: function(objColVals, condition, callback) {
    orm.update("burgers", objColVals, condition, function(res) {
      callback(res);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js)
module.exports = burger;
