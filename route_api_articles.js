var api_artic = require("./server_api_articles");
module.exports = function(app) { 
	

	app.get('/' , function(req, res, next){  
		
		res.render('index');
	})
	app.post('/get_api-article' , function(req, res, next){  
		
	    api_artic.API(req, res ,next);
	})
	
}