$(document).ready(function () {
  const form = document.querySelector('form');
  const btn = document.querySelector('button');
  btn.addEventListener('click', () => {
    if (form.checkValidity()) {
      $.ajax({
        url: 'testAccount.json',
        dataType: 'json',
        success: function (data) {
          console.log('successfully loaded json file');
          let email = document.getElementById('exampleInputEmail').value;
          if (data.some(data => data.email === email)) {
            alert("error! Email in use");
          } else {
            // form.submit();
            window.location.href = './login.html';
          }
        },
        error: function () {
          console.log("error");
        }
      });
    }
  });
});
