$(function () {
   const checkExist = setInterval(function () {
      if ($('.fas')) {
         console.log("Exists!");

         $('.fas').on("click", function () {
            console.log($(this));
            $(this).parent().parent().toggleClass('clicked');
         });

         $('.edit').on("click", function () {
            console.log($(this));
         });

         clearInterval(checkExist);
      }
   }, 100); // check every 100ms








   
}
)

