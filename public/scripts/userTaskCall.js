$(function () {
  if ($("#form")) {
    $("#form").submit(function (event) {
      event.preventDefault();
      const $newTask = $("#todo").val();
      $("#form").css("display", "none");
      $(".lds-ring").css("display", "inline-block");
      $.ajax({
        url: "/text",
        method: "POST",
        data: { text: $newTask },
        success: () => {
          $("#todo").val("");
          tasks();
          $("#form").css("display", "flex");
          $(".lds-ring").css("display", "none");
        },
        error: function (err) {
          $("#form").css("display", "flex");
          $(".lds-ring").css("display", "none");
          console.error(err);
        },
      });
    });
  }
  tasks();
});
