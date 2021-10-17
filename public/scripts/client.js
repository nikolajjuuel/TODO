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
        console.log(obj.category)
        if (obj.category === 'To watch') {
            const $watch = $('#toWatch');
            const $list = `<li>${obj.title}</li>`
            return $watch.append($list);
        }
        if (obj.category === 'To eat') {
            const $eat = $('#toEat');
            const $list = `<li>${obj.title}</li>`
            return $eat.append($list);
        }
        if (obj.category === 'To read') {
            const $read = $('#toRead');
            const $list = `<li>${obj.title}</li>`
            return $read.append($list);
        }
        if (obj.category === 'To buy') {
            const $buy = $('#toBuy');
            const $list = `<li>${obj.title}</li>`
            return $buy.append($list);
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

