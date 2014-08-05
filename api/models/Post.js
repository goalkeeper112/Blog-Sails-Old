

module.exports = {

  attributes: {
  	
  	titulo: {
  		type: 'string',
  		unique: true, 
      required: true
  	},

    author: {
      type: 'string',
      required: true
    },

  	contenido: {
  		type: 'string',
  		unique: true, 
      required: true
  	},
    
  },


};
