$(".unique").click(function (event) {
  var index = $(this).attr("id");
  $("#confirmDeleteLink").attr("href", "/delete/" + index);
});

$("#exampleFormControlTextarea1").on("click", function () {
  $(this).toggleClass("expand");
});


