Validatinator.utils = {
    /**
     *  Validatinator.utils.getRealType(obj);
     *
     *  Here we get the real type.  This is a nice little fix as typeof
     *  return "Object" with arrays, array literals and a few others.
     *
     *  @Added: 12/15/2013
     */
    getRealType: function(obj) {
    	var type = typeof obj;

        if (type.toLowerCase() === "object") {
            if (obj === null)
                return null;

            return obj.constructor.name.toLowerCase();
        }

        return type.toLowerCase();
    },

    /**
     *  Validatinator.utils.convertToArray();
     *
     *  Generally the end user will never touch this method, but here we handle converting the validations
     *  into an array of strings.
     */
    convertToArray: function() {
        
    },
}