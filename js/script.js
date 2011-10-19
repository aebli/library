var userViewModel = function(data){
	ko.mapping.fromJS(data, {}, this);

	this.fullName = ko.dependentObservable(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
};

var viewModelData = {
	"translation": {},
	"activityStream": [],
	"media": [],
	// helpers
	"actionType": function(section, type){
		return this.translation.internal.actionType[section][type()];
	},
	"mediaType": function(section, type){
		return this.translation.internal.mediaType[section][type()];
	}
}

var viewModelMapping =  {
	"activityStream": {
		"key": function(data){
			return ko.utils.unwrapObservable(data.id);
		}
	},
	"user": {
		"key": function(data){
			return ko.utils.unwrapObservable(data.id);
		},
		"create": function(options){
			return new userViewModel(options.data);
		}
	},
	"created": {
		"create": function(options){
			return new Date(options.data);
		}
	},
	"modified": {
		"create": function(options){
			return new Date(options.data);
		}
	},
	"actionType": {
		"create": function(options){
			options.parent.push(options.data);
		}
	}
};

var viewModel = ko.mapping.fromJS(viewModelData, viewModelMapping);
