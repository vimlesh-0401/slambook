App.slambook = App.cable.subscriptions.create("SlambookChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    $msg = "";
    var id = $(p).attr('g-friend-id');
    if(id == one.receiver_id){
        $msg = $(chat.body.right.join(''));
    }else{
        $msg = $(chat.body.left.join(''));
    }
    $msg.find('.chat_message')
        .html('<li><p>'+one.content+'<span class="chat_message_time"></span></p></li>');

    $msg.find('.chat_user_avatar a> img.md-user-image')
        .attr('src', img);
    $msg.find('.chat_user_avatar a')
        .attr('src', 'web.facebook.com/vimlesh.0401');
    $(p).find('.chat_box.touchscroll.chat_box_colors_a')
        .append($msg)
  }
});
