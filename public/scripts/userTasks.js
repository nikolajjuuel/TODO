/// styling


//  user's tasks
const renderTasks = function (tasks) {
  //console.log("tasks", tasks);
  for (const task in tasks) {
    //console.log('RENDERING TASK')
    createTaskElement(tasks[task]);
  }
};

//create and distribution of user's tasks
createTaskElement = function (obj) {
  //console.log('CREATED TASK EL', obj);
  const $watch = $("#toWatch");
  const $eat = $("#toEat");
  const $read = $("#toRead");
  const $buy = $("#toBuy");
  const $task = $(`<div class="container">
      <header><i class="fas fa-compact-disc main" data-task-imp=${obj.important}></i>
        <div data-task-id=${obj.id} class="title">${obj.title}</div><i class="fas fa-times"></i>
      </header>

      <div style="display:none">
      <img src="${obj.task_img_url}" alt="">
      <img src="${obj.task_text_info}" alt="">
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
  }
  if (obj.category === "To eat") {
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
 // console.log('JQUERY FUNC CALL')
  //const checkExist = setInterval(function () {
  // change category -> edit -> EVENT
  $(".title").on('click', function(){
    console.log($(this).parent().next().slideToggle());
  })

  $(".edit").on("click", function () {
  //  console.log('EDIT EVENT')
    $(this).siblings(".categories").slideToggle();
  });
  // EVENT for compact-disc icon

  $(".main").on("click", function () {
    const important = $(this)[0].getAttribute('data-task-imp');
    console.log(important);

    let toggleImportant = (toggle) => {
      if (important === 'false') {
        return 'true';
      }
      if (important === 'true') {
        return 'false';

      }
    }

    const id = $(this).next()[0].getAttribute("data-task-id"); //id = task id

    $.ajax({
      url: `/important/${id}`, //id = task id
      data: { important: toggleImportant(important) },
      method: "POST",
      success: function (data) {
        console.log("@@@@EDIT CALL@@@@ success");
       // tasks();
        tasks();

      },
      error: function (err) {
        //  console.error(err);
      },
    });
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
          //console.log("&&&&DELETE CALL&&&&&", id);
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
    //  console.log("NEW CATEGORY", newCategory);

      const id = $(this).attr("data-task-id"); //task id
      $.ajax({
        url: `/edit/${id}`, //id = task id
        data: { category: newCategory },
        method: "POST",
        success: function (data) {
       //   console.log("@@@@EDIT CALL@@@@ success");

          tasks();
        },
        error: function (err) {
          console.error(err);
        },
      });
    });
  }
  ///styling kinda works ehere
 // console.log('HELLO WORLD')
  const container = $('.container').each(function (index, element) {
  //  console.log('container element', element);
    const impData = $(this).children().children()[0].getAttribute('data-task-imp');

    console.log('IMPDATA', impData);
  
    if (impData === 'true') {
       $(this).addClass("clicked");
   //   console.log('TOBESTYLED', styleThis);
    }
  
  });

};


// request for user's task
const tasks = () => {
  $.ajax({
    url: "/api/tasks",
    method: "GET",
    dataType: "json",
    success: function (data) {
     // console.log("TASKS CALL", data.tasks);
      $(".container").empty();
      $("#toWatch").empty();
      $("#toEat").empty();
      $("#toRead").empty();
      $("#toBuy").empty();
      renderTasks(data.tasks);
      runJquery();
    },
    error: function (err) {
      console.error(err);
    },
  });
};

