var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {
  app.get('./notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id) };
    db.collection('notes').findOne(details , (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(item);
      }
    });
  });
  app.get('/notes', function (req, res) {
    //res.send(db.collection('notes').find( {title: { $gt: 4 }).toArray());
    res.end();
});


  app.post('/notes', (req, res) => {

    // Body variable being passed in
    const note = {title: req.body.Symptom, text: req.body.Remedy};
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
