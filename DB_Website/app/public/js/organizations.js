$(function() {
  $.getJSON('api/organizations', updateOrgs);

  $('.organizations-form').submit(function(e) {
    e.preventDefault();
    $.post('api/organizations', {
      name: $('#organizations-form-name').val(),
      title: $('#organizations-form-title').val(),
      user1: $('#user1-form-message').val(),
      user2: $('#user2-form-message').val(),
      user3: $('#user3-form-message').val(),
      user4: $('#user4-form-message').val(),
      user5: $('#user5-form-message').val()
    }, updateOrgs);
  });

  $('.organizations-messages').on('click', function(e) {
      if (e.target.className == 'glyphicon glyphicon-remove') {
        $.ajax({
          url: 'api/organizations/' + e.target.id,
          type: 'DELETE',
          success: updateOrgs
        }); //ajax
      } // the target is a delete button
  }); //feedback messages

  function updateOrgs(data) {
   var output = '';
   $.each(data,function(key, item) {
     output += '     <div class="organizations-item item-list media-list">';
     output += '       <div class="organizations-item media">';
     output += '       <div class="media-left"><button class="organizations-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
     output += '         <div class="organizations-info media-body">';
     output += '           <div class="organizations-head">';
     output += '             <div class="organizations-title">' + item.title + ' <small class="organizations-name label label-info">' + item.name + '</small></div>';
     output += '           </div>';
     output += '           <div class="organizations-message">' + "User 1: " + item.user1 + '</div>';
     output += '           <div class="organizations-message">' + "User 2: " + item.user2 + '</div>';
     output += '           <div class="organizations-message">' + "User 3: " + item.user3 + '</div>';
     output += '           <div class="organizations-message">' + "User 4: " + item.user4 + '</div>';
     output += '           <div class="organizations-message">' + "User 5: " + item.user5 + '</div>';
     output += '         </div>';
     output += '       </div>';
     output += '     </div>';
   });
   $('.organizations-messages').html(output);
  }
});
