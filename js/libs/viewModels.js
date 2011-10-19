var translationModel = function(options){
	this["translation_" + options.name] = function() {
        return options.value;
    };
};