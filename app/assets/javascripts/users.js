$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';

  if (location.pathname === '/') {
    function getUsers() {
      $.ajax({
        url: baseUrl,
        type: 'GET',
        dataType: 'JSON'
      }).done( function(data) {
        var tbody = $('#users');
        tbody.children().remove();
        data.users.forEach( function(user) {
          var firstName = user.first_name ? user.first_name : '0';
          var lastName = user.last_name ? user.last_name : '';
          var phoneNumber = user.phone_number ? user.phone_number : '';
          var row = '<tr data-id="' + user.id + '">';
              row += '<td>' + firstName + '</td>';
              row += '<td>' + lastName + '</td>';
              row += '<td>' + phoneNumber + '</td>';
              row += '<td>'
              row += '<button class="btn btn-primary show">Show</button>';
              row += '</td>';
              row += '</tr>';
              tbody.append(row);
        });
      }).fail( function(err) {
        alert('Something went wrong call support');
      });
    }

    getUsers();

  }

  $(document).on('click', '.show', function() {
      var id = $(this).closest('tr').data().id;
      location.pathname = '/users/' + id;
    })


  var re = /\/users\/\d+/;
  if (location.pathname.match(re)) {
    var panel = $('#panel');
    var id = panel.data().id;
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON'
    }).done( function(data) {
      var user = data.user;
      panel.children('#heading').html(user.name);
      var list = $('#user');
      var name1 = '<li>First Name: ' + user.first_name + '</li>';
      var name2 = '<li>Last Name: ' + user.last_name + '</li>';
      var phone = '<li>Phone Number: ' + user.phone_number + '</li>';
      list.append(firstName);
      list.append(lastName);
      list.append(phoneNumber);
    })
  }

  $('#new_user').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: baseUrl,
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done( function() {
      location.pathname = '/';
    });
  })
  
})