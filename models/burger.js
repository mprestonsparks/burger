// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  // Select all entries in the burgers table
  all: function(callback) {
    orm.all("burgers", function(res) {
      callback(res);
    });
  },
  // Add new entry to burgers table
  create: function(cols, vals, callback) {
    orm.create("burgers", cols, vals, function(res) {
      callback(res);
    });
  },
  // Change 'devoured' boolean state
  update: function (condition, callback) {
    orm.update('burgers', 'devoured', '1', 'id', condition, function (res) {
        callback(res);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js)
module.exports = burger;
