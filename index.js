// Load the net module to create a tcp server.
var net = require('net'), 
	util = require('util'), 
	Alarm = require('./lib/alarm').Alarm, 
	fs = require('fs'),
	path = require('path'),
	config = { ip: 'localhost', port: 7000, buffer_max_length: 1024 },
	actions = [];
	//queue = [];

var Job = function (action, parameters) {
	var alarm, self = this;
	
	self.action = action;
	self.parameters = parameters;
	
	self.run = function () {
		actions[self.action].run(self);
	};
	
	self.queue = function () {
		if (self.on) {
			self.on.forEach(function (v) {
				alarm = new Alarm();
				alarm.setDate(v, function () {
					self.run();
				});
			});
		}
	};
};

/*function queue_job(job) {
	job.
}*/

function create_job_from_data(data) {
	var m, job, parsed = data.match(/^([^\n]+)\ndo ([^\n]+)\n([^\n]*)?/);
	
	if (!parsed || parsed.length != 4) {
		console.error('Error parsing ' + util.inspect(data));
		return;
	}
	
	job = new Job(parsed[2], parsed[3] || null);
	
	if (parsed[1] === 'now') {
		
	} else if (m = parsed[1].match(/on ([^\n]+)/)) {
		job.on = m[1].split(',').map(function (v) {
			return new Date(v.trim());
		});
	}/* else {
		console.log(parsed[1]);
	}*/
	
	return job;
}

var server = net.createServer(function (socket) {
	var job, buffer = [], length = 0;
	
	socket.setEncoding('utf8');
	socket.on('data', function (data) {
		buffer.push(data);
		length += data.length;
		
		if (length > config.buffer_max_length) {
			console.error('Buffer limit reached, dropping client.');
			socket.destroy();
		} else if (data.substr(data.length - 2) == '\n\n') {
			job = create_job_from_data(buffer.join(''));
			
			if (job) {
				//queue_job(job);
				job.queue();
				socket.end('done');
			} else {
				socket.end('failed');
			}
			
			socket.destroy();	// Make sure connection is closed
			console.info('Connection destroyed');
		}
	});
	
	socket.on('end', function () {
		console.info('Connection interupted');
	});
	
	socket.on('connect', function () {
		console.info('Connection from ' + socket.remoteAddress);
	});
	
	

});

if (!fs.existsSync('action')) {
	throw 'Folder "action" does not exist';
}

fs.readdirSync('action').forEach(function(file) {
	actions[file.substr(0, file.length - 3)] = require('./action/' + file);
});

server.on('listening', function () {
	console.info(util.format('TCP server listening on port %d at %s.', config.port, config.ip));
});

server.listen(config.port, config.ip);