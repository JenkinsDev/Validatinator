Validatinator.prototype.utils = {
    /**
     *  Validatinator.utils.getRealType(obj);
     *
     *  Here we get the real type.  This is a nice little fix as typeof
     *  return "Object" with arrays, array literals and a few others.
     *
     *  @Added: 12/15/2013
     */
    getRealType: function(obj) {
        var type = (typeof obj).toLowerCase();

        if (type === "object") {
            if (obj === null)
                return null;

            return obj.constructor.name.toLowerCase();
        }

        return type;
    },

    convertFieldValidationsToArray: function(validationInformation) {

    }
}