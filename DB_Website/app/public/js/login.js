$(function() {
  $.getJSON('api');

  $('.login-form').submit(function(e) {
    e.preventDefault();
    $.post('api', {
      email: $('#login-form-email').val(),
      password: $('#login-form-password').val()
    });
  });
});
