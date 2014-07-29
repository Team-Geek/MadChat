
var mysql = require('mysql');
var io = require('socket.io').listen(53297);

var db = mysql.createConnection({
	host: '211.39.253.201',
	port: '3306',
	user: 'jeremy',
	password: 'shg,shk#3792',
	database: 'chatDB'
});

io.sockets.on('connection', function (socket){
	
	socket.on('signup', function (data){
		
		checkid(data, socket);
		//socket.emit('signup', 0);
	
	});
	
	socket.on('login', function (data){	
		login(data, socket);
	
	});
	
	
	socket.on('message', function (data){
		io.sockets.emit('message', data);
	});
});

function checkid(data, socket)
{
	var check = 0;
	
	db.query('SELECT * FROM Userlist WHERE userid="' + data.newId + '"', function(error, ids){
		console.log(ids.length);
		if(ids.length > 0)
		{
			check = 1;
		}
		
		
		db.query('SELECT * FROM Userlist WHERE nickname="' + data.newNickname + '"', function(error, nicknames){
			console.log(nicknames.length);
			if(nicknames.length > 0)
			{
				check = 2;
			}
			
			if(check == 0)
				db.query('INSERT INTO Userlist VALUES ("' 
				+ data.newId + '", "' + data.newPassword + '", "' + data.newNickname + '")');
		
			socket.emit('signup', check);
			
		});
				
	});
		
}

function login(data, socket)
{
		
	db.query('SELECT * FROM Userlist WHERE userid="' + data.userid 
	+ '" AND password="' + data.password + '"', function(error, results){
				
		if(results.length != 0)
		{
			socket.emit('login', results[0].nickname);
		}
		else
		{
			socket.emit('login', null);
		}			
	});
}

function createRoom(data, socket)
{
	db.query
}
