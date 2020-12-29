$('.delete_id').on('click', function () {
  var userId = $(this).attr('data_id');
  $.ajax({
    method: "POST",
    url: "/delete",
    data: { "userId": userId },
    success: () => {
      location.reload();
    }
  })
})

$('.update_id').on('click', function () {
  console.log('update')
  var userId = $(this).attr('data_id');
  var userQuote = prompt("수정하기");
  $.ajax({
    method: "POST",
    url: "/update",
    data: { "userId": userId, "userQuote": userQuote},
    success: () => {
      location.reload();
    }
  })
})
