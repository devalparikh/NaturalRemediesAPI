var tools = require('./tools');

module.exports = function (Model) {

	var self = this;

	self.query = function () {

		var callback;
		var query;
		var projection;
		var limit;
		var skip;
		var sort;
		var id;

		for (var i = 0; i < arguments.length; i++) {

			if (arguments[i] instanceof Array) {
				projection = arguments[i];
				projection = tools.replaceAll(projection.toString(), ',', ' ');
			} else {
				switch (typeof arguments[i]) {
					case 'function':
						callback = arguments[i];
						break;
					case 'number':
						if (!limit) {
							limit = arguments[i];
						} else {
							skip = arguments[i];
						}
						break;
					case 'object':
						if (!query) {
							query = arguments[i];
						} else {
							sort = arguments[i];
						}
						break;
					case 'string':
						id = arguments[i];
						break;
					default :
						var oops = arguments[i];
						break;
				}

			}
		}

		if (id) {
			Model.findById(id, function (err, result) {
				if (result) {
					result = JSON.parse(JSON.stringify(result));
				}

				callback(err, result);
			});
		} else {
			Model
				.find(query)
				.select(projection)
				.limit(limit)
				.skip(skip)
				.sort(sort)
				.exec(function (err, result) {

					if (result && result.length > 0) {
						result = JSON.parse(JSON.stringify(result));
					}

					callback(err, result);
				});
		}

	};

	self.update = function () {

		var callback;
		var query, update, options;

		for (var i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case 'function':
					callback = arguments[i];
					break;
				case 'object':
					if (!query) {
						query = arguments[i];
					}
					else if (!update) {
						update = arguments[i];
					}
					else if (!options) {
						options = arguments[i];
					}
					break;
			}
		}

		//if (!data) {
		//	data = {
		//		query  : null,
		//		fields : null,
		//		sort   : null,
		//		limit  : null
		//	};
		//}

		if (!options) {
			options = {safe : true};
		} else {
			options.safe = true;
		}

		//  Model.update(query, update, { safe: true }, callback);
		Model.findOneAndUpdate(query, update, options, function (err, result) {
			if (result) {
				var obj = JSON.parse(JSON.stringify(result));

				if (callback) {
					callback(null, obj);
				}
			}
			else {
				if (callback) {
					callback('There was an error updating the document: ' + err);
				}
			}
		});
	};

	self.updateSet = function (query, field, data, callback) {

		var update = {
			$addToSet : {}
		};

		update.$addToSet[field] = data;

		Model.update(query, update,
			{safe : true, upsert : true}, function (err, result) {
				if (result) {
					var obj = JSON.parse(JSON.stringify(result));

					if (callback) {
						callback(null, obj);
					}
				}
				else {
					if (callback) {
						callback('There was an error updating the document: ' + err);
					}
				}
			}
		)
		;
	};

	self.updateAndReturn = function (query, update, callback) {
		Model.findOneAndUpdate(query, update, {safe : true}, callback);
	};

	self.aggregate = function (pipelines, callback) {
		Model.aggregate(pipelines, function (err, result) {
			callback(err, result);
		});
	};

	self.save = function (obj, callback) {

		var model = new Model(obj);

		model.save(function (err, result) {

			if (!callback) {
				return;
			}

			if (err) {
				callback(err);
			}
			else {
				callback(err, result);
			}
		});

	};

	self.insert = function (obj, callback) {

		var model = new Model(obj);

		model.save(function (err, result) {

			if (!callback) {
				return;
			}

			if (err) {
				callback(err);
			}
			else {
				callback(err, result);
			}
		});

	};

	self.delete = function (id, callback) {

		Model.findByIdAndRemove(id, function (err, result) {

			if (!callback) {
				return;
			}

			if (err) {
				callback(err);
			}
			else {
				callback(err, result);
			}
		});

	};

	self.push = function (query, field, data, callback) {

		var update = {
			$push : {}
		};

		update.$push[field] = data;

		Model.update(query, update, function (err, result) {
				if (result) {
					var obj = JSON.parse(JSON.stringify(result));

					if (callback) {
						callback(null, obj);
					}
				}
				else {
					if (callback) {
						callback('There was an error updating the document: ' + err);
					}
				}
			}
		);
	};

};
