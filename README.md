app-js
======
app.js helps you organize your JavaScript files by scoping everything in one object and providing easy acces to commonly used elements like window, document, body, etc.

Set it up like this
  app = new _app();
  
  jQuery(document).ready(function($) {
  	app.ready();
  });

## How to use
Let's say you want to add a popup modal feature to your app. You could do it this way:
  
    app.modal = function(){
      var self = this;
      
      self.open = function(){
        // Code to open modal here
        app.trigger('modal-open');
      }
      
      self.close = function(){
        // Code to close modal here
        app.trigger('modal-close');
      }
      
      return self;
      
    }
    
Now you have modal functionality and events on your app that tell you when the modal is openeing and closing. Later on you could do this.

    app.ready(function(){
      
      // Open the modal when a user clicks .open-modal element
      $('.open-modal').click(function(){
        app.modal.open();
      })
      
      // Trigger something whenever the modal is opened
      app.on('modal-open', function(){
        alert('Modal was opened!');
      })
      
    })
