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

        if (obj.category === 'To watch') {
            const $watch = $('#toWatch');
            const $task = $(`      <div class="container">
            <header><i class="fas fa-compact-disc main"></i></i>
              <div data-task-id=${obj.id} class="title">${obj.title}</div><i class="fas fa-times"></i>
            </header>
            <hr>
            <div class="categories" style="display:none">
              <form action="/edit/${obj.id}" method="POST">
              <button type="submit" name="category" value="To watch"><i class="fas fa-compact-disc">
                    <p>Watch</p>
                  </i></button>
                <button name="category" type="submit" value="To read"> <i class="fas fa-book">
                    <p>Read</p>
                  </i></button>
                <button name="category" type="submit" value="To eat"><i class="fas fa-pizza-slice">
                    <p>Eat</p>
                  </i></button>
                <button name="category" type="submit" value="To buy"><i class="fas fa-shopping-cart">
                    <p>Buy</p>
                  </i></button>
              </form>

            </div>
            <div class="edit">
              <div>Change Category</div><i class="far fa-edit"></i>
            </div>
          </div>`);

            return $watch.append($task);
        }
        if (obj.category === 'To eat') {
            const $eat = $('#toEat');
            const $task = $(`     <div class="container">
            <header><i class="fas fa-pizza-slice main"></i></i>
              <div data-task-id=${obj.id} class="title">${obj.title}</div><i class="fas fa-times"></i>
            </header>
            <hr>
            <div class="categories" style="display:none">
              <form action="/edit/${obj.id}" method="POST">
                <button name="category" type="submit" value="To watch"><i class="fas fa-compact-disc">
                    <p>Watch</p>
                  </i></button>
                <button name="category" type="submit" value="To read"> <i class="fas fa-book">
                    <p>Read</p>
                  </i></button>
                <button name="category" type="submit" value="To eat"><i class="fas fa-pizza-slice">
                    <p>Eat</p>
                  </i></button>
                <button name="category" type="submit" value="To buy"><i class="fas fa-shopping-cart">
                    <p>Buy</p>
                  </i></button>
              </form>

            </div>
            <div class="edit">
              <div>Change Category</div><i class="far fa-edit"></i>
            </div>
          </div>`);
            return $eat.append($task);
        }
        if (obj.category === 'To read') {
            const $read = $('#toRead');
            const $task = $(`     <div class="container">
            <header><i class="fas fa-book main"></i></i>
              <div data-task-id=${obj.id} class="title">${obj.title}</div><i class="fas fa-times"></i>
            </header>
            <hr>
            <div class="categories" style="display:none">
              <form action="/edit/${obj.id}" method="POST">
                <button name="category" type="submit" value="To watch"><i class="fas fa-compact-disc">
                    <p>Watch</p>
                  </i></button>
                <button name="category" type="submit" value="To read"> <i class="fas fa-book">
                    <p>Read</p>
                  </i></button>
                <button name="category" type="submit" value="To eat"><i class="fas fa-pizza-slice">
                    <p>Eat</p>
                  </i></button>
                <button name="category" type="submit" value="To buy"><i class="fas fa-shopping-cart">
                    <p>Buy</p>
                  </i></button>
              </form>

            </div>
            <div class="edit">
              <div>Change Category</div><i class="far fa-edit"></i>
            </div>
          </div>`);

            return $read.append($task);
        }
        if (obj.category === 'To buy') {
            const $buy = $('#toBuy');
            const $task = $(`     <div class="container">
            <header><i class="fas fa-shopping-cart main"></i></i>
              <div data-task-id=${obj.id} class="title">${obj.title}</div><i class="fas fa-times"></i>
            </header>
            <hr>
            <div class="categories" style="display:none">
              <form action="/edit/${obj.id}" method="POST">
                <button  name="category" id="watch-edit" name="${obj.id}" type="submit" value="To watch"><i class="fas fa-compact-disc">
                    <p>Watch</p>
                  </i></button>
                <button name="category" type="submit" value="To read"> <i class="fas fa-book">
                    <p>Read</p>
                  </i></button>
                <button name="category" type="submit" value="To eat"><i class="fas fa-pizza-slice">
                    <p>Eat</p>
                  </i></button>
                <button name="category" type="submit" value="To buy"><i class="fas fa-shopping-cart">
                    <p>Buy</p>
                  </i></button>
              </form>

            </div>
            <div class="edit">
              <div>Change Category</div><i class="far fa-edit"></i>
            </div>
          </div>`);

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

