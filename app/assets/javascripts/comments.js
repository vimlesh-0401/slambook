(function( $ ) {
  $.fn.Comments = function(){
    $this = $(this);
    $comment = $this.find('.g-post .g-comments');
    var img = "/assets/users-737a573a08722eff250a31b012809d4c099083e6014469ff73bd30b6bf5aab1d.png"
    
    var _gComment = {
      before: function(){
        $comment.html('')
      },
      init: function(){
        _gComment.before();
        _gComment.reader({post_id: $this.attr('post-id')});
        _gComment.after();
      },
      render: function(comment, input){
        var arr = []
        arr.push('<div class="media" g-comments="',comment.id,'"> <div class="media-left"><img src="',img,'" class="media-object"/></div><div class="media-body" id="',comment.id,'">')
        arr.push('<h4 class="media-heading">',comment.name,' <small> <i> @ ',gutil.toDate(comment.created_at),'</i></small></h2>')
        arr.push('<div class="reply-body"><p>',comment.text,'</p></div><small class="control" g-control="',comment.id,'"></small>')
        if(!comment.comment_id){
          arr.push('<div class="reply-comments" g-reply-comments="',comment.id,'"></div>')
        }
        arr.push('</div></div>')
        $box = $(arr.join(''))
        
        $('<a href="javascript:void(0);" class="comment"/>')
          .attr('comment-id', comment.id)
          .attr("g-reply-user",comment.name)
          .attr('g-load-reply', true)
          .attr('g-total-reply', 0)
          .attr('g-start-at', 0)
          .attr('g-end-at',0)
          .html('<i class="fa">Reply</i>')
          .css('margin','0px 5px')
          .on('click', function(){
            if(comment.comment_id){
              $(this).closest('.reply-comments').next().val($(this).attr('g-reply-user')).focus();
            }else{
              if($(this).attr('g-load-reply') === false || $(this).attr('g-load-reply') === 'false'){
                $(this).closest('small.control').next().next().focus();
              }else{
                _gComment.inputBox(this);
              }
            }
          })
          .appendTo($box.find('div.media-body>small.control'));
        
        $('<a href="javascript:void(0);" class="comment"/>')
          .attr('comment-id', comment.id)
          .html('<i class="fa">Like</i> <small></small>')
          .css('margin','5px 0px')
          .attr('g-controls','comment-like')
          .attr('g-likes-count', function(){
            $.get('/likes',{object_id: comment.id, class_name: "Comment"}, function(data){
              $('.g-comments div[g-comments="'+data.post_id+'"] small[g-control="'+data.post_id+'"] a[g-controls="comment-like"]').attr('g-likes-count',data.likes);
              $('.g-comments div[g-comments="'+data.post_id+'"] small[g-control="'+data.post_id+'"] a[g-controls="comment-like"]').attr('g-liked', (data.liked !== null && data.liked.status==1))
              $('.g-comments div[g-comments="'+data.post_id+'"] small[g-control="'+data.post_id+'"] a[g-controls="comment-like"] small').html(data.likes)
            })
          })
          .on('click', function(){
            status = 1;
            if($(this).attr('g-liked') === 'true' || $(this).attr('g-liked') === true){
              status = 2;
            }
            $.post('/likes',{like:{comment_id: comment.id, status: status}, object_id: comment.id, class_name: "Comment"}, function(data){
              $('.g-comments div[g-comments="'+data.post_id+'"] small[g-control="'+data.post_id+'"] a[g-controls="comment-like"] small').html(data.likes);
              $('.g-comments div[g-comments="'+data.post_id+'"] small[g-control="'+data.post_id+'"] a[g-controls="comment-like"]').attr('g-likes-count',data.likes);
              $('.g-comments div[g-comments="'+data.post_id+'"] small[g-control="'+data.post_id+'"] a[g-controls="comment-like"]').attr('g-liked', (data.liked !== null && data.liked.status==1))
            });
          })
          .appendTo($box.find('div.media-body>small.control'));
        if(input && $(input).hasClass('reply-box')){
          $(input).prev().append($box)
        }else if(input){
          $('div[post-id='+comment.post_id+'] .g-comments').append($box);
        }else{
          if(comment.comment_id){
            $(".g-post .g-comments .media[g-comments="+comment.comment_id+"] .media-body> div[g-reply-comments="+comment.comment_id+"].reply-comments").prepend($box)
          }else{
            $('div[post-id='+comment.post_id+'] .g-comments').prepend($box);
          }
        }
      },
      inputBox: function(curr){

        if($(curr).parent().prev().hasClass('reply-box')){
          return false;
        }
        var commentId = $(curr).attr('comment-id');
        _gComment.reader({comment_id: commentId})
        $(curr).attr('g-load-reply', false)
        $input = $('<input type="text" name="comment"/>')
          .attr('class', 'reply-box')
          .attr('placeholder', 'Write a reply...')
          .attr('comment-id', commentId)
          .attr('data-g-input', 'reply-box')
          .on('keydown', function(e){
            if(_gComment.handleKey(e)){
              _gComment.save($(this));
            }
          });
          setTimeout(function(){
            $(curr).parent().parent().append($input)
            $input.focus();
          }, 1000)
      },
      save: function(input){
        var commentId = $(input).attr('comment-id');
        var postId = $(input).attr('post-id');
        if(!commentId) commentId = '';
        if(!postId) postId = '';
        var comment = $(input).val();
        $.ajax({
          type:'POST',
          url: '/comments',
          data: {comment:{comment_id: commentId, post_id: postId, text: comment}},
          success:function(comment){
            _gComment.render(comment, input)
            $(input).val('')
          },
          error: function(data){
          }
        });
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
      reader: function(data){
        $.ajax({
          type:'GET',
          url: '/comments',
          data: data,
          success:function(data){
            for(index = 0; index < data.length; index++){
              comment = data[index];
              _gComment.render(comment)
            }
          },
          error: function(data){
          }
        });
      },
      after: function(){
        $('<input type="text" name="comment"/>')
          .attr('class', 'comment-box')
          .attr('placeholder', 'Write a comment...')
          .attr('post-id', $this.attr('post-id'))
          .on('keydown', function(e){
            if(_gComment.handleKey(e)){
              _gComment.save($(this));
            }
          })
          .appendTo($this.find('.panel-footer span'));
      },
      replies: function(){

      }
    }
    _gComment.init();
  }
}( jQuery ));