//  user's tasks
const renderTasks = function (tasks) {
  console.log("tasks", tasks);
  for (const task in tasks) {
    console.log('RENDERING TASK')
    createTaskElement(tasks[task]);
  }
};

//create and distribution of user's tasks
createTaskElement = function (obj) {
  console.log('CREATED TASK EL', obj);
  const $watch = $("#toWatch");
  const $eat = $("#toEat");
  const $read = $("#toRead");
  const $buy = $("#toBuy");
  const $task = $(`<div class="container">
      <header><i class="fas fa-compact-disc main"></i>
        <div data-task-id=${obj.id} class="title">${obj.title}</div><i class="fas fa-times"></i>
      </header>

      <div>
      <img src="${obj.task_img_url}" alt="">
   </div>
      
      <hr>
      <div class="categories" style="display:none">
        <form class="switch-category" data-task-id=${obj.id}>
        <button type="submit" name="To watch" value="To watch"><i class="fas fa-compact-disc specific">
              <p>Watch</p>
            </i></button>
          <button name="To read" type="submit" value="To read"> <i class="fas fa-book specific">
              <p>Read</p>
            </i></button>
          <button name="To eat" type="submit" value="To eat"><i class="fas fa-pizza-slice specific">
              <p>Eat</p>
            </i></button>
          <button name="To buy" type="submit" value="To buy"><i class="fas fa-shopping-cart specific">
              <p>Buy</p>
            </i></button>
        </form>

      </div>
      <div class="edit">
        <div>Change Category</div><i class="far fa-edit"></i>
      </div>
    </div>`);
  if (obj.category === "To watch") {
    return $watch.append($task);
  } else if (obj.category === "To eat") {

    return $eat.append($task);
  }
  if (obj.category === "To read") {
    return $read.append($task);
  }
  if (obj.category === "To buy") {
    return $buy.append($task);
  }
};
// registers all html events(click, submit...)
const runJquery = () => {
  // $("#submitButton").on("click", function () {
  //   $("#form").css("display", "none");
  //   $(".lds-ring").css("display", "inline-block");
  // });
  console.log('JQUERY FUNC CALL')
  //const checkExist = setInterval(function () {
    // change category -> edit -> EVENT
    $(".edit").on("click", function () {
      console.log('EDIT EVENT')
      $(this).siblings(".categories").slideToggle();
    });
    // EVENT for compact-disc icon
    $(".main").on("click", function () {
      console.log('DISC EVENT')
      $(this).parent().parent().toggleClass("clicked");
    });
    // EVENT for delete task
    if ($(".fa-times")) {
      // console.log("Exists!");

      $(".fa-times").on("click", function () {
        const id = $(this).prev()[0].getAttribute("data-task-id"); //id = task id

        $.ajax({
          url: `/delete/${id}`, //id = task id
          method: "POST",
          success: function (data) {
            console.log("&&&&DELETE CALL&&&&&", id);
            tasks();
          },
          error: function (err) {
            console.error(err);
          },
        });
      });
    }

    // EVENT for particular category submit while changing category
    if ($(".switch-category")) {
      $(".switch-category").on("submit", function (e) {
        e.preventDefault(); //prevents refresh


        const newCategory = $(this)
          .find("button[type=submit]:focus")[0]
          .getAttribute("name");
          console.log("NEW CATEGORY", newCategory);

          const id = $(this).attr("data-task-id"); //task id
        $.ajax({
          url: `/edit/${id}`, //id = task id
          data: { category: newCategory },
          method: "POST",
          success: function (data) {
            console.log("@@@@EDIT CALL@@@@ success");
            tasks();
          },
          error: function (err) {
            console.error(err);
          },
        });
      });
    }


};

// request for user's task
const tasks = () => {
  $.ajax({
    url: "/api/tasks",
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log("TASKS CALL",data.tasks);
      $(".container").empty();
      renderTasks(data.tasks);
      runJquery();
    },
    error: function (err) {
      console.error(err);
    },
  });
};

