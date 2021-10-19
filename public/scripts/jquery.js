$(function () {
  const checkExist = setInterval(function () {
    if ($(".fas")) {
      console.log("Exists!");

      $(".fas").on("click", function () {
        const id = $(this).prev()[0].getAttribute("data-task-id"); //id = task id

        $(this).parent().parent().toggleClass("clicked");
        $.ajax({
          url: `/delete/${id}`, //id = task id
          method: "POST",
          success: function (data) {
            console.log('&&&&&&&&&&&', id)
            location.reload();
          },
          error: function (err) {
            console.error(err);
          },
        });
      });

      clearInterval(checkExist);
    }
  }, 100); // check every 100ms
});
