$(function () {
  const checkExist = setInterval(function () {
    if ($("#form")) {
      $("#form").submit(function (event) {
        event.preventDefault();
        const $newTask = $("#todo").val();
        console.log("MAIN INPUT", $newTask);
        $("#form").css("display", "none");
        $(".lds-ring").css("display", "inline-block");
        $.ajax({
          url: "/text",
          method: "POST",
          data: { text: $newTask },
          success: () => {
            $("#todo").val("");
            console.log("MAIN SUBMIT CALL");
            tasks();
            $("#form").css("display", "block");
            $(".lds-ring").css("display", "none");
          },
          error: function (err) {
            $("#form").css("display", "block");
            $(".lds-ring").css("display", "none");
            console.error(err);
          },
        });
      });
    }
    clearInterval(checkExist);
  }, 100); // check every 100ms
  tasks();
});
