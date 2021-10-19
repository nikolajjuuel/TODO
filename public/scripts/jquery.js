$(function () {
   const checkExist = setInterval(function () {

      $('.edit').on("click", function () {
         const $options = $('.active');
        $(this).siblings('.categories').slideToggle();
      })

      if ($(".fa-times")) {
         console.log("Exists!");

         $(".fa-times").on("click", function () {
            $(this).parent().parent().toggleClass("clicked");

            const id = $(this).prev()[0].getAttribute("data-task-id"); //id = task id

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

        //  if ($('#watch-edit')) {
        //   console.log("YOU CAN EDIT TO WATCH")
        //   $("#watch-edit").on("click", function (e) {
        //     // e.preventDefault()
        //     const id = $(this).parent().parent().children().children()[1].getAttribute("data-task-id");
        //     console.log("@@@@@@@@@@@@@@ task id", id)

        //     $.ajax({
        //       url: `/edit/${id}`, //id = task id
        //       method: "POST",
        //       success: function (data) {
        //          console.log("@@@@@@@@@@@@ success")
        //          //location.reload();
        //       },
        //       error: function (err) {
        //          console.error(err);
        //       },
        //    });
        //});
      //}
         clearInterval(checkExist);
      }
   }, 100); // check every 100ms
});
