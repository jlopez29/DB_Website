$(function() {
  $.getJSON('api/signup');

  $('.signup-form').submit(function(e) {
    e.preventDefault();
    $.post('api/signup', {
      email: $('#signup-form-email').val(),
      password: $('#signup-form-password').val()
    });
  });
});
