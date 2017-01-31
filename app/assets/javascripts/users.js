var img = "/assets/users-737a573a08722eff250a31b012809d4c099083e6014469ff73bd30b6bf5aab1d.png";
(function( $ ) {
  
  $.fn.Friends = function(){
    $this = $(this);
    $friends_cont = $(".g-friends-list .g-friends-container .g-friends");
    var _gFriends = {
      before: function(){
        // If possible schedule to reload content if not loaded.
        // once ui is ready reload all the content and try to fill the ui.
        // Find how to bind, trigger and unbind a process in javascript.
        $friends_cont.html('')
      },
      init: function(){
        _gFriends.before();
        $.ajax({
          type:'GET',
          url: '/users',
          data: {search: ''},
          success:function(users){
            for(index = 0; index < users.length; index++){
              user = users[index];
              _gFriends.insert(user)
            }
          },
          error: function(data){
          }
        });
        _gFriends.after();
      },
      after: function(){
        // Unregister or register triggers
        $friends_cont.height($friends_cont.parent().height()-85);
        $friends_cont.css('overflow-y', 'auto');
      },
      insert: function(user){
        arr = [];
        arr.push('<div class="g-friend" g-control="g2-vk-friend"></div>');
        $friend = $(arr.join(''));
        $('<a href="javascript:void(0);">')
          .attr('g-friend-id', user.id)
          .attr('g-control', 'g2-vk-clk')
          .html('<span class="name">'+user.name+'</span>')
          .append('<span class="image-o image"><i class="fa fa-circle"></i></span>')
          .on('click', function(){
            _gFriends.chatbox(this);
          })
          .appendTo($friend);

        $friends_cont.append($friend);
      },
      chatbox: function(user){
        $(user).Chatbox();
      }
    }
    _gFriends.init();
  }
  
}( jQuery ));