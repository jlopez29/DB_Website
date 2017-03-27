$(function() {
  $.getJSON('api/events', updateEvents);

  $('.events-form').submit(function(e) {
    e.preventDefault();
    $.post('api/events', {
      name: $('#events-form-name').val(),
      title: $('#events-form-title').val(),
      message: $('#events-form-message').val()
    }, updateEvents);
  });

  $('.events-messages').on('click', function(e) {
      if (e.target.className == 'glyphicon glyphicon-remove') {
        $.ajax({
          url: 'api/' + e.target.id,
          type: 'DELETE',
          success: updateEvents
        }); //ajax
      } // the target is a delete button
  }); //feedback messages

  function updateEvents(data) {
   var output = '';
   $.each(data,function(key, item) {
     output += '     <div class="events-item item-list media-list">';
     output += '       <div class="events-item media">';
     output += '       <div class="media-left"><button class="events-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
     output += '         <div class="events-info media-body">';
     output += '           <div class="events-head">';
     output += '             <div class="events-title">' + item.title + ' <small class="events-name label label-info">' + item.name + '</small></div>';
     output += '           </div>';
     output += '           <div class="events-message">' + item.message + '</div>';
     output += '         </div>';
     output += '       </div>';
     output += '     </div>';
   });
   $('.events-messages').html(output);
  }
});
