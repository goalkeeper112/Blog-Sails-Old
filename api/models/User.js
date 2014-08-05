var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	
  	username: {
  		type: 'string',
  		unique: true,
  		required: true
  	},

  	password: {
  		type: 'string',
  		required: true
  	},

  	toJSON: function(){
  		var obj = this.toObject();
  		delete obj.password;
  		return obj;
  	}
    
  },

// Metodo para encriptar la contraseña introducida por el usuario 
  beforeCreate: function(user, cb){

  	bcrypt.genSalt(10, function(err, salt){
  		bcrypt.hash(user.password, salt, function(err, hash){
  			if(err){
  				console.log(err);
  				return cb(err);
  			} else{
  				user.password = hash;
  				return cb(null, user);
  			}
  		});
  	});
  }

};
