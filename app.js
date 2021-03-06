_app = function(_jquery){

	var self 		= this;

	// Set jQuery
	self.$ 			= jQuery;
	if(typeof _jquery !== 'undefined'){
		self.$ = _jquery;
		var $ = _jquery;
	}


	/* Internal vars */
	var triggers	= {}
	
	/**
	 * Call this method when page is ready
	 * to initate the app object
	 *
	 * @return void
	 **/
	self.ready = function(){

		self.win 		= $(window);
		self.doc 		= $(document);
		self.body 		= $('body');
		self.html 		= $('html');

		self.trigger('ready');
	}


	self.get_jquery = function(){

		if(self.$ === false)
			return jQuery;
		return self.$;

	}


	/**
	 * Cleans up a string with a trigger name
	 *
	 * @return string - cleaned up trigger name
	 **/
	self.clean_trigger = function(trigger){
		
		if(!typeof trigger === 'string')
			return trigger;

		trigger = trigger.toLowerCase();

		return trigger;

	}

	/**
	 * Set up a callback function on an event.
	 * Runs every time the event is triggered.
	 *
	 * @return void
	 **/
	self.on = function(trigger, callback){
		
		trigger  = self.clean_trigger(trigger);

		if(typeof trigger !== 'string')
			return null;

		if(typeof triggers[trigger] === 'undefined')
			triggers[trigger] = [];

		if(typeof callback === 'function')
			triggers[trigger].push(callback)

	}
	
	/**
	 * Set up a callback function on an event.
	 * The callback is only ececuted ONCE and
	 * then it will be removed again
	 *
	 * @return void
	 **/
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

	/**
	 * Remove a callback from an event
	 *
	 * @return void
	 **/
	self.off = function(trigger, callback){
		
		if(typeof triggers[trigger] == 'undefined')
			return null;
		
		var index = triggers[trigger].indexOf(callback);
		if(index >= 0) {
		    triggers[trigger].splice(index, 1);
		}

	}
	
	/**
	 * Trigger an event and run the callbacks
	 * hooked to it.
	 *
	 * @return void
	 **/
	self.trigger = function(trigger, args){

		var trigger  = self.clean_trigger(trigger);

		if(typeof triggers[trigger] === 'undefined')
			return;

		for (k in triggers[trigger]){
			triggers[trigger][k](args);
		}

	}

	/**
	 * Helper:
	 * This is a simple function to check if
	 * the body of the given page has a given class
	 *
	 * @return void
	 **/
	 self.is = function(_class){
		return self.body.hasClass(_class);
	}
	
	// Return the app object
	return self;

};
