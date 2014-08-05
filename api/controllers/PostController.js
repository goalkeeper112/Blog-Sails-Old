
module.exports = {
    
	publicar: function(req, res, next){
		Post.create(req.params.all(), function postCreated(err, post){
			if(err){
				res.send(err);
				console.log(err);
				return next(err);
			} else{
				res.view('post/posts',{
					titulo: post.titulo,
					author: req.session.user,
					contenido: post.contenido
				});
			}
		});
	},

	eliminar: function(req, res, next){
		Post.find({ titulo: req.param('titulo') }, function(err, post){
			if(err){
				res.send(error);
				console.log(err);
				return next(err);
			}
			if(post){
				Post.destroy({ titulo: post.titulo}, function postDeleted(err){
					if(err){
						res.send(error);
						console.log(err);
						return next(err);
					} else{
						res.send('El post a sido eliminado correctamente');
					}
				});
			} else{
				res.send('El post solicitado no se puede eliminar porque no existe');
			}
		});
	},

	mostrar: function(req, res, next){
		Post.find(function postFound(err, posts){
			if(err){
				res.send(error);
				console.log(err);
				return next(err);
			} else{
				res.view('home/index', {
					posts: posts
				});
			}
		});
	},

	publicaciones: function(req, res, next){
		Post.find(function postFound(err, posts){
			if(err){
				res.send(error);
				console.log(err);
				return next(err);
			} else{
				res.view('post/posts', {
					posts: posts
				});
			}
		});
	},

	findPost: function(req, res, next){
		Post.findOne({ titulo: req.param('titulo') }, function(err, post){
			if(err){
				res.send(error);
				console.log(err);
				return next(err);
			}
			if(post){
				res.view('post/post', {
					titulo: post.titulo,
					author: post.author,
					contenido: post.contenido
				});
			}
		});
	},

	publicacion: function(req, res){
		res.view();
	},

	index: function(req, res, next){
		Post.find(function postFound(err, posts){
			if(err){
				res.send(error);
				console.log(err);
				return next(err);
			} else{
				res.view('post/index', {
					posts: posts
				});
			}
		});
	},

	destruirAll: function(req, res){
		Post.destroy(function(err){
			if(err){
				res.send(err);
			} else{
				res.redirect('/');
			}
		});
	}
  
};
