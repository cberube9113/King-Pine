// # Chirps Library 

//Stub database
var chirpdb = [
	{id: '1',
	 data: "Just chirpin along...",
	 uid: 'stenaglia',
     timestamp: '2013-03-10_03:14:53'},
    {id: '2',
	 data: "Having fun programming Chirper!",
	 uid: 'rsins',
     timestamp: '2013-03-10_04:19:20'},
];




exports.info = function(req,res){
	  return chirpdb;
	}