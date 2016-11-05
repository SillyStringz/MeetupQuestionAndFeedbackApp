'use strict';
let r = require('./dash'),
	_ = require('lodash');

function setup (io) {

	io.on('connection', function(socket){

		socket.on('question:findById', function(id, cb){
			r.table('question')
			.get(id)
			.run(cb);
		});

		socket.on('question:add', function(record, cb){

			record = _.pick(record, 'name', 'question');
			record.createdAt = new Date();

			r.table('question')
			.insert(record)
			.run(function(err, result){

				if(err){
					cb(err);
				}
				else{
					record.id = result.generated_keys[0];
					cb(null, record);
				}
			});

			socket.on('question:update', function(record, cb){

				record = _.pick(record, 'id', 'name', 'question');
				r.table('question')
				.get(record.id)
				.update(record)
				.run(cb);

		});

		socket.on('question:delete', function(id, cb){

			r.table('question')
			.get(id)
			.delete()
			.run(cb);

	});
}

module.exports = {
	setup: setup
};