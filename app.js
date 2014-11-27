_app = function(){

	var self 		= this;

	/* Internal vars */
	var triggers	= {}

	self.ready = function(){

		self.win 		= jQuery(window);
		self.doc 		= jQuery(document);
		self.body 		= jQuery('body');
		self.html 		= jQuery('html');

		self.trigger('ready');
	}


	self.clean_trigger = function(trigger){
		
		if(!typeof trigger === 'string')
			return trigger;

		trigger = trigger.toLowerCase();

		return trigger;

	}

	self.on = function(trigger, callback){
		
		trigger  = self.clean_trigger(trigger);

		if(typeof trigger !== 'string')
			return null;

		if(typeof triggers[trigger] === 'undefined')
			triggers[trigger] = [];

		if(typeof callback === 'function')
			triggers[trigger].push(callback)

	}

	self.one = function(trigger, callback){
		
		trigger  = self.clean_trigger(trigger);

		if(typeof trigger !== 'string')
			return null;

		if(typeof triggers[trigger] === 'undefined')
			triggers[trigger] = [];

		if(typeof callback === 'function'){
			triggers[trigger].push(callback)
			self.on(trigger, function(){
				self.off(trigger, callback);
			})
		}

	}

	self.off = function(trigger, callback){
		
		var index = triggers[trigger].indexOf(callback);
		if(index >= 0) {
		    triggers[trigger].splice(index, 1);
		}

	}

	self.trigger = function(trigger, args){

		trigger  = self.clean_trigger(trigger);
		
		if(typeof triggers[trigger] === 'undefined')
			triggers[trigger] = [];

		for (k in triggers[trigger]){
			triggers[trigger][k](args);
		}

	}

	self.is = function(_class){
		return self.body.hasClass(_class);
	}

	return self;

}
