const noteRoutes = require('./note_routes');

// Exporting routes
module.exports = function(app, db) {
  noteRoutes(app,db);

}
