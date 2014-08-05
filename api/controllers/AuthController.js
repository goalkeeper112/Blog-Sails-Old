var bcrypt = require('bcrypt');

module.exports = {
  	
  login: function(req, res, next){
  	User.findOne({ username: req.param('username') }, function(err, user){
  		if(err){
  			return next(err);
  		}

  		if(user){
  			bcrypt.compare(req.param('password'), user.password, function(err, match){
  				if(err){
  					return next(err);
  				}
  				if(match){
            	
            req.session.user = user.username;
  					req.session.authenticated = true;
  					console.log('Este usuario se a logueado con exito: ', user.username);
  				  res.view('user/logueado', {
              username: user.username,
              session: req.session
            });
  				  return console.log(req.session);
  				} else{
  					return res.send("Contraseña incorrecta");
  				}
  			});
  		}else{
  			var username = req.param('username');
  			return res.send("Este Nombre de usuario: " + username+" no es valido"); 
  		}
  	});
  },

  logout: function(req, res, next){
  	req.session.destroy();
  	res.redirect('/');
  }
  
};
