var img = "/assets/users-737a573a08722eff250a31b012809d4c099083e6014469ff73bd30b6bf5aab1d.png";
(function( $ ) {
  
  var Renderer = {
    render: function(post, element, created){

      var arr = [];
      arr.push('<div class="panel panel-default g-panel" post-id="',post.id,'"> <div class="panel-heading posts">');
      arr.push('<div class="image"></div><div class="g2-vk"></div><h5><span>',post.name,'<span><span><small>',gutil.toDate(post.created_at),'</small></span></h5>');
      arr.push('</div><div class="panel-body g-post"> <div class="g-post-body">');
      arr.push(post.text);
      arr.push('</div><div class="g-controls">');
      arr.push('</div>');
      arr.push('<div g-controls="g2-vk-post-like" g-post-id="post-',post.id,'"><span g-content="emogies"></span><span g-content="text"></span></div>')
      arr.push('<div class="g-comments">');
      arr.push('');
      arr.push('</div> </div> <div class="panel-footer"> <span>');
      arr.push('</span> </div> </div>');
      $post = $(arr.join(''));
      $('<img>').attr('src', img)
        .attr('class','media-object')
        .appendTo($post.find('.panel-heading div.image'))
      
      $('<a href="javascript:void(0);" g-controls="post-like" style="margin: 20px 10px"><i class="fa fa-thumbs-up"> Like </i></a>')
        .on('click', function(){
          status = 1;
          if($(this).attr('g-liked') === 'true' || $(this).attr('g-liked') === true){
            status = 2;
          }
          $.post('/likes',{like:{post_id: post.id, status: status}, object_id: post.id, class_name: "Post"}, function(data){
            Renderer.likes(data)
          });
        })
        .attr('g-likes-count', function(){
          $.get('/likes',{object_id: post.id, class_name: "Post"}, function(data){
            Renderer.likes(data)
          })
        })
        .appendTo($post.find('.g-post .g-controls'))
      
      $('<a href="javascript:void(0);" g-controls="create-comment" style="margin: 20px 10px"><i class="fa fa-comment-o"> Comment </i></a>')
        .on('click', function(){
          $(this).closest('.g-panel').find('.panel-footer span input').focus();
        })
        .appendTo($post.find('.g-post .g-controls'))

      $('<a href="javascript:void(0);" g-controls="share-post" style="margin: 20px 10px"><i class="fa fa-share"> Share </i></a>')
        .on('click', function(){
          
        })
        .appendTo($post.find('.g-post .g-controls'))

      if(created){
        $(element).prepend($post);
      }else{
        $(element).append($post);
      }
      $post.Comments();
    },
    likes: function(data){
      $('div[post-id='+data.post_id+'] div[g-controls="g2-vk-post-like"]').attr('g-visible', (data.likes > 0))
      $('div[post-id='+data.post_id+'] div[g-controls="g2-vk-post-like"] span[g-content="text"]').html('<span>'+data.users.list.join('<br/>')+'</span><i class="fa"><em style="font-size: 10px;">'+data.users.text+'</em></i>')
      $('div[post-id='+data.post_id+'] .g-controls a[g-controls="post-like"]').attr('g-likes-count',data.likes);
      $('div[post-id='+data.post_id+'] .g-controls a[g-controls="post-like"]').attr('g-liked', (data.liked !== null && data.liked.status==1))
    }
  }
  $.fn.Post = function(){
    $this = $(this);
    var _gPost = {
      before: function(){
        // Implement something that can be check or happne before commit.
      },
      init: function(){
        $this.find('.panel-footer span a.create-post').on('click', function(){
          _gPost.before();
          _gPost.create();
          _gPost.after();
        })
      },
      create: function(){
        var text = $('#user-posts .g-panel .panel-body textarea').val();
        if(text === '' || text === undefined){
          return false;
        }
        var oData = new FormData();
        oData.append('post[text]', text);
        $.ajax({
          type:'POST',
          url: '/posts',
          contentType: false,
          processData: false,
          data: oData,
          success:function(post){
            Renderer.render(post, "#user-posts-area", true)
          },
          error: function(data){
          }
        });
      },
      after: function(){
        $('#user-posts .g-panel .panel-body textarea').val('')
      },
      comment: function(e){
        console.log(e.keyCode)
      }
    }
    _gPost.init();
  }
  $.fn.Posts = function(){
    $this = $(this);
    var _gPosts = {
      before: function(){
        $this.html('')
      },
      init: function(){
        _gPosts.before();
        _gPosts.render();
        _gPosts.after();
        
      },
      render: function(){
        $.ajax({
          type:'GET',
          url: '/posts',
          data: {search: ''},
          success:function(posts){
            for(index = 0; index < posts.length; index++){
              post = posts[index];
              Renderer.render(post, "#user-posts-area")
            }
          },
          error: function(data){
          }
        });
      },
      after: function(){
        
      }
    }
    _gPosts.init();
  }
}( jQuery ));