(function( $ ) {

  $.fn.clients = function(){
    var $table = $(this).find('table.table tbody');

    var __ = {
      init: function(){
        $.ajax({
          type:'GET',
          url: '/clients/clients',
          data: {},
          success:function(data){
            $table.html('');
            clients = data.clients;
            for(index = 0; index < clients.length; index++){
              client = clients[index];
              __.render(client)
            }
            __.footer(data.table)
          },
          error: function(data){
          }
        });
      },
      footer: function(data){
        cols = $table.find("tr:first-child").find('td').length;
        p1 = cols/2;
        p2 = cols-p1;
        $table.parent().find('thead tr').attr('g2-ct', 'header');
        arr = [];
        arr.push("<tr g2-ct='ctrl'><td colspan='",p1,"'><input type='number' class='input-sm' data-min='10' data-max='200' name='pPageCount'/></td>");
        arr.push('<td colspan="',p1,'"><input type="text" name="sSearch"/></td></tr>');
        $table.parent().find('thead').prepend(arr.join(''));
        arr = [];
        arr.push('<tfoot><tr><td colspan="',cols,'">');
        arr.push('<a href="" class="btn btn-default">', data.total,'</a>')
        arr.push('</td></tr></tfoot>');
        $table.parent().append(arr.join(''));
      },
      render: function(client){
        var row = [];
        row.push('<tr>');
        row.push('<td>', client.caller_id,'</td>');
        row.push('<td>', client.called_no,'<p>', client.extn,'</p></td>');
        row.push('<td>', client.call_start_time,'</td>');
        row.push('<td>', client.dial_start_time,'<p>', client.dial_end_time,'</p></td>');
        row.push('<td>', client.disconnect_type,'<p>', client.call_status,'</p></td>');
        row.push('<td><a href="javascript:void(0)" data-url="', client.RecordingURL,'"><i class="fa fa-phone"></i></a></td>');
        row.push('<td>', client.call_duration,'<p>', client.call_type,'</p></td>');
        row.push('<td>', client.dialed_number,'<p>', client.department,'</p></td>');
        $table.append(row.join(''));
      }
    }
    __.init();
  }
}( jQuery ));