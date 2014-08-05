
module.exports = {

  create: function(req, res, next){
  	User.create(req.params.all(), function UserCreated(err, user){
  		if(err){
  			return next(err);
  		} else{
  			res.view('user/registrado',{
  				username: user.username,
  				createdAt: user.createdAt
  			});
  		}
  	});
  },

  view: function(req, res, next){
  	User.findOne({ username: req.param('username') }, function foundUser(err, user){
  		if(err){
  			return next(err);
  		}
  		if(!user){
  			return next();
  		}
  		res.view({
  			user: user
  		});
  	});
  },

  delete: function(req, res, next){

  	User.findOne({ username: req.param('username') }, function(err, user){
  		if(err){
  			return next(err);
  		}
  		if(!user){
  			return next('No existe ese usuario');
  		}

  		User.destroy({ username: req.param('username') }, function userDestroyed(err){
  			if(err){
  				return next(err);
  			}
  		});

  		res.redirect('/user');
  	});
  }

};
