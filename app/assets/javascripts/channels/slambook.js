App.slambook = App.cable.subscriptions.create("SlambookChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    alert('You are already logged in..')
  }
});
