$(".unique").click(function (event) {
  var index = $(this).attr("id");
  $("#confirmDeleteLink").attr("href", "/delete/" + index);
});
