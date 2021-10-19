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
                console.log(err);

            }
        });
    }

    tasks();

    createTaskElement = function (obj) {
        console.log(obj.category)
        console.log(obj.id)

        if (obj.category === 'To watch') {
            const $watch = $('#toWatch');
            const $task = $(`
            <div class="container"><header><i class="fas fa-compact-disc"></i></i><div class="title">${obj.title}</div><form action="/${obj.id}/delete" method="POST"><button type="submit" name="delete"><a href="DELETE"><i class="fas fa-times"></i></a></button></form></header><hr><form action="/${obj.id}" method="POST"><button class="edit" type="submit" name="edit"><div>Change Category</div><i class="far fa-edit"></i></button></form></div>
            `);

            return $watch.append($task);
        }
        if (obj.category === 'To eat') {
            const $eat = $('#toEat');
            const $task = $(`
            <div class="container"><header><i class="fas fa-pizza-slice"></i></i><div class="title">${obj.title}</div><form action="/${obj.id}/delete" method="POST"><button type="submit" name="delete"><a href="DELETE"><i class="fas fa-times"></i></a></button></form></header><hr><form action="/${obj.id}" method="POST"><button class="edit" type="submit" name="edit"><div>Change Category</div><i class="far fa-edit"></i></button></form></div>
            `);

            return $eat.append($task);
        }
        if (obj.category === 'To read') {
            const $read = $('#toRead');
            const $task = $(`
            <div class="container"><header><i class="fas fa-book"></i></i><div class="title">${obj.title}</div><form action="/${obj.id}/delete" method="POST"><button type="submit" name="delete"><a href="DELETE"><i class="fas fa-times"></i></a></button></form></header><hr><form action="/${obj.id}" method="POST"><button class="edit" type="submit" name="edit"><div>Change Category</div><i class="far fa-edit"></i></button></form></div>
            `);

            return $read.append($task);
        }
        if (obj.category === 'To buy') {
            const $buy = $('#toBuy');
            const $task = $(`      
            <div class="container"><header><i class="fas fa-shopping-cart"></i></i><div class="title">${obj.title}</div><form action="/${obj.id}/delete" method="POST"><button type="submit" name="delete"><a href="DELETE"><i class="fas fa-times"></i></a></button></form></header><hr><form action="/${obj.id}" method="POST"><button class="edit" type="submit" name="edit"><div>Change Category</div><i class="far fa-edit"></i></button></form></div>
            `);

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

