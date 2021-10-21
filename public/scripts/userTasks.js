const renderTasks = function (tasks) {
  for (const task in tasks) {
    createTaskElement(tasks[task]);
  }
};

//create and distribution of user's tasks
createTaskElement = function (obj) {
  const $watch = $("#toWatch");
  const $eat = $("#toEat");
  const $read = $("#toRead");
  const $buy = $("#toBuy");
  const $task = $(`
      <div class="container">
      <header><i class="fas fa-thumbtack main" data-task-imp=${obj.important}></i>
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
    </div>
    `);

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
  // toggle images and information
  $(".title").on('click', function () {
    $(this).parent().next().slideToggle();
  })

  // toggle change categories
  $(".edit").on("click", function () {
    $(this).siblings(".categories").slideToggle();
  });

  // marks tasks important in the database
  $(".main").on("click", function () {
    const important = $(this)[0].getAttribute('data-task-imp');

    let toggleImportant = (toggle) => {
      if (important === 'false') {
        return 'true';
      }
      if (important === 'true') {
        return 'false';

      }
    }

    //id of selected task
    const id = $(this).next()[0].getAttribute("data-task-id");

    $.ajax({
      url: `/important/${id}`,
      data: { important: toggleImportant(important) },
      method: "POST",
      success: function (data) {
        tasks();
      },
      error: function (err) {
        console.error(err);
      },
    });
  });

  // EVENT for delete task
  $(".fa-times").on("click", function () {
    const id = $(this).prev()[0].getAttribute("data-task-id");

    $.ajax({
      url: `/delete/${id}`,
      method: "POST",
      success: function (data) {
        tasks();
      },
      error: function (err) {
        console.error(err);
      },
    });
  });

  // EVENT for changing category
  $(".switch-category").on("submit", function (e) {
    e.preventDefault();

    //selecting category of clicked button
    const newCategory = $(this)
      .find("button[type=submit]:focus")[0]
      .getAttribute("name");

    const id = $(this).attr("data-task-id");

    $.ajax({
      url: `/edit/${id}`,
      data: { category: newCategory },
      method: "POST",
      success: function (data) {
        tasks();
      },
      error: function (err) {
        console.error(err);
      },
    });
  });

  // applies styling to important tasks 
  const container = $('.container').each(function (index, element) {
    const impData = $(this).children().children()[0].getAttribute('data-task-imp');

    if (impData === 'true') {
      $(this).addClass("clicked");
    }
  });

};

// calls database and displays specific users tasks
const tasks = () => {
  $.ajax({
    url: "/api/tasks",
    method: "GET",
    dataType: "json",
    success: function (data) {
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

