var chat = {};
chat.layout = [];
chat.header = [];
chat.body = {};
chat.footer = [];
chat.layout.push('<aside id="sidebar_secondary" class="tabbed_sidebar ng-scope chat_sidebar popup-box-on"></aside>');
chat.header.push('    <div class="popup-head">');
chat.header.push('        <div class="popup-head-left pull-left">');
chat.header.push('            <a title="" target="_blank" href="">');
chat.header.push('                <img class="md-user-image" alt="" title="" src="">')
chat.header.push('                <h1></h1>');
// chat.header.push('                <small><br> <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span></small>');
chat.header.push('            </a>');
chat.header.push('        </div>');
chat.header.push('        <div class="popup-head-right pull-right">');
chat.header.push('            <button class="chat-header-button" type="button"><i class="glyphicon glyphicon-facetime-video"></i></button>');
chat.header.push('            <button class="chat-header-button" type="button"><i class="glyphicon glyphicon-earphone"></i></button>');
chat.header.push('            <div class="btn-group slambook">');
chat.header.push('                <button class="chat-header-button" data-toggle="dropdown" type="button" aria-expanded="false">');
chat.header.push('                    <i class="glyphicon glyphicon-paperclip"></i> ');
chat.header.push('                </button>');
chat.header.push('                <ul role="menu" class="dropdown-menu pull-right">');
chat.header.push('                    <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-picture" aria-hidden="true"></span> Gallery</a></li>');
chat.header.push('                    <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-camera" aria-hidden="true"></span> Photo</a></li>');
chat.header.push('                    <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span> Video</a></li>');
chat.header.push('                    <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-headphones" aria-hidden="true"></span> Audio</a></li>');
chat.header.push('                    <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Location</a></li>');
chat.header.push('                    <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Contact</a></li>');
chat.header.push('                </ul>');
chat.header.push('            </div>');
chat.header.push('            <button data-widget="remove" g-control="g-ctrl-remove" id="removeClass" class="chat-header-button pull-right" type="button"><i class="glyphicon glyphicon-remove"></i></button>');
chat.header.push('        </div>');
chat.header.push('    </div>');

var body = []
body.push('    <div id="chat" class="chat_box_wrapper chat_box_small chat_box_active" style="opacity: 1; display: block; transform: translateX(0px);">')
body.push('        <div class="chat_box touchscroll chat_box_colors_a">');
body.push('        </div>');
body.push('    </div>');
left_msg = [];
left_msg.push('            <div class="chat_message_wrapper chat_message_left">');
left_msg.push('                <div class="chat_user_avatar">');
left_msg.push('                    <a href="" target="_blank" >');
left_msg.push('                        <img alt="" title=""  src="" class="md-user-image">');
left_msg.push('                    </a>');
left_msg.push('                 </div>');
left_msg.push('                <ul class="chat_message">');
left_msg.push('                    <li>');
left_msg.push('                        <p> </p>');
left_msg.push('                    </li>');
left_msg.push('                    <li>');
left_msg.push('                        <p> <span class="chat_message_time">13:38</span> </p>');
left_msg.push('                    </li>');
left_msg.push('                </ul>');
left_msg.push('            </div>');

right_msg = [];

right_msg.push('            <div class="chat_message_wrapper chat_message_right">');
right_msg.push('                <div class="chat_user_avatar">');
right_msg.push('                    <a href="" target="_blank" >');
right_msg.push('                        <img alt="" title="" src="" class="md-user-image">');
right_msg.push('                    </a>');
right_msg.push('                </div>');
right_msg.push('                <ul class="chat_message">');
right_msg.push('                    <li>');
right_msg.push('                        <p>');
right_msg.push('                            ');
right_msg.push('                            <span class="chat_message_time">13:34</span>');
right_msg.push('                        </p>');
right_msg.push('                    </li>');
right_msg.push('                </ul>');
right_msg.push('            </div>');

chat.body.main = body;
chat.body.left = left_msg;
chat.body.right = right_msg;

chat.footer.push('    <div class="chat_submit_box">');
chat.footer.push('        <div class="uk-input-group">');
// chat.footer.push('            <div class="gurdeep-chat-box">');
// chat.footer.push('                <span style="vertical-align: sub;" class="uk-input-group-addon">');
// chat.footer.push('                    <a href="javascript:void(0);"><i class="fa fa-smile-o"></i></a>');
// chat.footer.push('                </span>');
// chat.footer.push('                <input type="text" g-control="g-ctrl-message" placeholder="Type a message" id="submit_message" name="submit_message" class="md-input">');
// chat.footer.push('                <span style="vertical-align: sub;" class="uk-input-group-addon">');
// chat.footer.push('                    <a href="javascript:void(0);"><i class="fa fa-camera"></i></a>');
// chat.footer.push('                </span>');
chat.footer.push('                  <textarea g-access="g-ctrl-chat" g-control="g-ctrl-message" placeholder="Type a message"></textarea>');
// chat.footer.push('            </div>');

// chat.footer.push('            <span class="uk-input-group-addon">');
// chat.footer.push('                <a href="javascript:void(0);"><i class="glyphicon glyphicon-send"></i></a>');
// chat.footer.push('            </span>');
chat.footer.push('        </div>');
chat.footer.push('    </div>');

chat.compile = false;
(function($){
    $.fn.Chatbox = function(){
        var __open_chats = {};
        var __hidden_chats = {};
        var _gchatbox = {
            before: function(ele){
                var margin = 205;
                var count  = $('.tabbed_sidebar.ng-scope.chat_sidebar').length;
                var width = $('.tabbed_sidebar.ng-scope.chat_sidebar').width() || 0;
                return (205 + (width * count) + (count*5))
            },
            init: function(ele){
                chatId = $(ele).attr('g-chatId');
                if(chatId !== null && typeof chatId !== 'undefined'){
                    if($(document).find('aside[g-chatId="'+chatId+'"').length){
                        return false;
                    }
                }
                var margin = _gchatbox.before(ele);
                $layout = $(chat.layout.join(''));
                $header = $(chat.header.join(''))
                $header.find('.popup-head-left a')
                    .attr('title', $(ele).find('span.name').html() )
                    .attr('href', 'https://web.facebook.com/vimlesh.0401');

                $header.find('.popup-head-left a img.md-user-image')
                    .attr('src',img)
                    .attr('alt',$(ele).find('span.name').html() )
                    .attr('title', $(ele).find('span.name').html());

                $header.find('.popup-head-left a h1')
                    .html($(ele).html() );
                $header.find('div.popup-head-right button[g-control="g-ctrl-remove"]')
                    .on('click', function(){
                        $(this).closest('.tabbed_sidebar.ng-scope.chat_sidebar').remove();
                        _gchatbox.arrange();
                        return false;
                    });
                $layout.append($header);
                $body = $(chat.body.main.join(''));
                $body.attr('g-load-msg', function(){
                    $chatbox_body = $(this)
                    $.get('/messages',{receiver_id: $(ele).attr('g-friend-id')}, function(data){
                        _gchatbox.renderAll($chatbox_body, data)
                    })
                })
                .attr('g-friend-id', $(ele).attr('g-friend-id'))
                $footer = $(chat.footer.join(''));
                $footer.find('.uk-input-group > textarea[g-control="g-ctrl-message"]')
                    .attr('g-friend-id', $(ele).attr('g-friend-id'))
                    .on('keydown', function(e){
                        if(_gchatbox.handleKey(e)){
                            _gchatbox.save(this);
                        }
                    });

                $layout.append($body);
                $layout.append($footer);
                $layout.css('right', margin);
                id = Date.now();
                $layout.attr('g-chatId',id);
                $(ele).attr('g-chatId',id);
                $('body').append($layout);
                $footer.find('.uk-input-group > textarea[g-control="g-ctrl-message"]').focus()
            },
            handleKey:function(e){
                e = (!e) ? window.event : e;
                code = (e.charCode) ? e.charCode : ((e.keyCode) ? e.keyCode : ((e.which) ? e.which : 0));
                if (e.type == "keydown") {
                    if(code == 13 && !e.shiftKey) {
                        e.preventDefault();
                        return true;
                    }
                }
                return false;
            },
            arrange: function(){
                margin = 205;
                $('.tabbed_sidebar.ng-scope.chat_sidebar').each(function(i){
                    pos = (205 + ($(this).width() * i) + (i*5))
                    $(this).css('right', pos);
                })
            },

            save: function(input){
                var id = $(input).attr('g-friend-id');
                var content = $(input).val();
                $.post('/messages',{message:{receiver_id: id, content: content}}, function(data){
                    _gchatbox.render(input, data)
                });
            },
            render: function(input, data){
                lasttime = $(input).attr('g-msg-time');
                current = Date.now();
                $(input).attr('g-msg-time', current);
                if((((current - lasttime)/1000) > 30) || typeof(lasttime) === 'undefined' || lasttime === null){
                    $msg = $(chat.body.right.join(''));
                    $msg.find('.chat_message')
                        .html('<li><p>'+data.content+'<span class="chat_message_time"></span></p></li>');

                    $msg.find('.chat_user_avatar a> img.md-user-image')
                        .attr('src', img);
                    $msg.find('.chat_user_avatar a')
                        .attr('src', 'web.facebook.com/vimlesh.0401');
                    $(input).closest('.tabbed_sidebar.ng-scope.chat_sidebar.popup-box-on')
                        .find('.chat_box_wrapper.chat_box_small.chat_box_active .chat_box.touchscroll.chat_box_colors_a')
                        .append($msg)
                }else{
                    $msg = $(input).closest('.tabbed_sidebar.ng-scope.chat_sidebar.popup-box-on')
                        .find('.chat_box_wrapper.chat_box_small.chat_box_active .chat_box.touchscroll.chat_box_colors_a .chat_message_wrapper').last();
                    $msg.find('.chat_message')
                        .append('<li><p>'+$(input).val()+'</p></li>');
                }
                $panel = $(input).closest('.tabbed_sidebar.ng-scope.chat_sidebar.popup-box-on')
                    .find('.chat_box_wrapper.chat_box_small.chat_box_active .chat_box.touchscroll.chat_box_colors_a');

                $(input).closest('.tabbed_sidebar.ng-scope.chat_sidebar.popup-box-on')
                    .find('.chat_box_wrapper.chat_box_small.chat_box_active')
                    .animate({
                        scrollTop: Math.abs($panel.offset().top) + $panel.height()
                    }, 200);
                $(input).val('').focus();
            },
            renderAll: function(p, comments){
                for(index = 0; index < comments.length; index++){
                  comment = comments[index];
                  _gchatbox.renderOne(p, comment);
                }
            },
            renderOne: function(p, one){
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
        }

        _gchatbox.init(this);
    }
}(jQuery))