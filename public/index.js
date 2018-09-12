$('.login').on('submit', (event) => {
  event.preventDefault();
  console.log($('#user').val());
  console.log($('#password').val());
});