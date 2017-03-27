$(function() {
  $.getJSON('api/login');

  $('.login-form').submit(function(e) {
    e.preventDefault();
    $.post('api/login', {
      email: $('#login-form-email').val(),
      password: $('#login-form-password').val()
    });
  });
});
