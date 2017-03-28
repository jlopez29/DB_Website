$(function() {
  $.getJSON('api/events', updateEvents);

  $('.events-form').submit(function(e) {
    e.preventDefault();
    $.post('api/events', {
      title: $('#events-form-title').val(),
      location: $('#events-form-location').val(),
      starts: $('#events-form-startTime').val(), 
      ends: $('#events-form-endTime').val(),
      contact_email: $('#events-form-email').val(),
      contact_phone: $('#events-form-phone').val(),
      url: $('#events-form-url').val()
    }, updateEvents);
  });

  $('.events-messages').on('click', function(e) {
      if (e.target.className == 'glyphicon glyphicon-remove') {
        $.ajax({
          url: 'api/events/' + e.target.id,
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
     output += '             <div class="events-title">' + item.title + ' <small class="events-name label label-info">' + item.contact_email + " ~ [ " + item.contact_phone + ' ]</small></div>';
     output += '           </div>';
     output += '           <div class="events-message">Location: ' + item.location + '</div>';
     output += '           <div class="events-message">Starts: ' + item.starts + '</div>';
     output += '           <div class="events-message">Ends: ' + item.ends + '</div>';
     output += '           <div class="events-message">"Url: <a href="'+item.url+'">' + item.url + '</a></div>';
     output += '         </div>';
     output += '       </div>';
     output += '     </div>';
   });
   $('.events-messages').html(output);
  }
});
