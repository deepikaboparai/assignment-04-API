var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/books'
module.exports = {
addBooks: function (req,res){
		mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
			collection.find({}, {limit: 1, sort: {'_id': -1}}).toArray((err, data) => {
		        if (err) throw err
		        if(data[0] == null)
		       		var id = 1
		       	else		
		        	var id = data[0]['_id'] + 1
		    	var insertData = {
					_id: id,
					title: req.payload.title.toUpperCase(),
					author: req.payload.author.toUpperCase(),
					genre: req.payload.genre.toUpperCase(),
					publication:req.payload.publisher.toUpperCase(), 
					avail:req.payload.copies
				}
			 	collection.insert(insertData,(err, data) => {
			   	 	if (err) throw err
			        db.close()
			        return res("Book inserted")
			    	})
	  	    })
})	},

getdata: function (req,res){
		mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
			collection.find().toArray((err, data) => {
	        if (err) throw err
	        res(data)
	    	db.close()
	  	    })
 })	},

getbookById : function (req,res){
    mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
			collection.find({_id: req.query.id}).toArray((err, data) => {
	        if (err) throw err
	        res(data)
	    	db.close()
	  	    })
		 })
},

getbookbytitle : function (req,res){
		mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
			collection.find({title: req.query.title}).toArray((err, data) => {
	        if (err) throw err
	        res(data)
	    	db.close()
	  	    })
		 })
},
getbookbyauthor : function (req,res){
	    	mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
			collection.find({author:req.query.author }).toArray((err, data) => {
	        if (err) throw err
	        res(data)
	    	db.close()
	  	    })
		 })
},

getbookbyGenre: function (req,res){
		mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
		    collection.find({genre: req.query.genre}).toArray((err, data) => {
	        if (err) throw err
	        res(data)
	    	db.close()
	  	    })
		 })
},
deletebookbyid : function (req,res){
		mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
			collection.remove({_id: req.query.id},(err) => {
	        if (err) throw err
	        res("Book is Deleted")
	    	db.close()
	  	    })
		 })
	},


updatebook : function (req,res){
		mongo.connect(url, (err, db) =>{
		    if (err) throw err
			var collection = db.collection('books')
					var v_id=req.payload.id
					var v_title= req.payload.title.toUpperCase()
					var v_author=req.payload.author.toUpperCase()
					var v_genre= req.payload.genre.toUpperCase()
					var v_publication_info=req.payload.publisher.toUpperCase()
					var v_avail=req.payload.copies
			if(v_title != null){
				collection.update({_id: v_id}, {$set: {title: v_title}})
		  	}
			if(v_author != null){
				collection.update({_id: v_id}, {$set: {author: v_author}})
		  	}
			if(v_genre != null){
				collection.update({_id: v_id}, {$set: {genre: v_genre}})
		  	}
			if(v_publication_info != null){
				collection.update({_id: v_id}, {$set: {publication:v_publication_info }})
		  	}
			if(v_avail != ''){
				collection.update({_id: v_id}, {$set: 	{avail: v_avail}})
		  	}	  	
			db.close()
			res("Book is Updated")
		 })
}
}
