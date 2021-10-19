$(function () {
    const tasks = () => {
        $.ajax({
            url: '/api/tasks',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data.tasks);
                renderTasks(data.tasks);
            },
            error: function (err) {
                console.err(err);

            }
        });
    }

    tasks();

    createTaskElement = function (obj) {
        console.log(obj)
        const $watch = $("#toWatch");
        const $eat = $('#toEat');
        const $read = $('#toRead');
        const $buy = $('#toBuy');
        const $task = $(`<div class="container">
            <header><i class="fas fa-compact-disc main"></i></i>
              <div data-task-id=${obj.id} class="title">${obj.title}</div><i class="fas fa-times"></i>
            </header>
            <hr>
            <div class="categories" style="display:none">
              <form class="switch-category" data-task-id=${obj.id}>
              <button type="submit" name="To watch" value="To watch"><i class="fas fa-compact-disc">
                    <p>Watch</p>
                  </i></button>
                <button name="To read" type="submit" value="To read"> <i class="fas fa-book">
                    <p>Read</p>
                  </i></button>
                <button name="To eat" type="submit" value="To eat"><i class="fas fa-pizza-slice">
                    <p>Eat</p>
                  </i></button>
                <button name="To buy" type="submit" value="To buy"><i class="fas fa-shopping-cart">
                    <p>Buy</p>
                  </i></button>
              </form>

            </div>
            <div class="edit">
              <div>Change Category</div><i class="far fa-edit"></i>
            </div>
          </div>`);
        if (obj.category === 'To watch') {
            return $watch.append($task);
        }
        else if (obj.category === 'To eat') {
           return $eat.append($task);
        }
        if (obj.category === 'To read') {
            return $read.append($task);
        }
        if (obj.category === 'To buy') {
            return $buy.append($task);
        }

    }

    const renderTasks = function (tasks) {
        console.log('tasks', tasks);
        for (const task in tasks) {
            createTaskElement(tasks[task]);
        }

    }


}
)

