**Please execute the sql schema and sample data included in this folder before executing any query**


// Add user
INSERT INTO users (username) VALUES ('Jim Cramer');
SELECT * FROM users;

// Add group
INSERT INTO groups (group_name) VALUES ('Class #5');
SELECT * FROM groups;

// Add student to group
INSERT INTO group_students (group_id, user_id) VALUES (1, 1);
SELECT * FROM group_students;

// Add module
INSERT INTO modules (module_name, description, module_img, seq_number, git_url, git_owner, git_repo) VALUES ('Angular JS', 'Some description', 'http://lorempixel.com/600/600/technics/', 5000, 'https://github.com/HackYourFuture/', 'HackYourFuture', 'angular');
SELECT * FROM modules;

// Add running module 
INSERT INTO running_modules (starting_on, scheduled_end, description, module_id, group_id) VALUES ('2017-03-12 12:00:00', '2017-04-02 11:59:59', 'Some description', 1, 5);
SELECT * FROM running_modules;

// Edit a running module duration example
UPDATE running_modules SET scheduled_end = '2017-03-12 12:00:00' WHERE id = ?;

// Add teacher to a running module
INSERT INTO running_module_teachers (running_module_id, user_id) VALUES (10, 16);
** Do we need validation for teacher role by selected user_id?


// List all students inside one group *optional*
SELECT users.username,
        users.register_date,
        groups.group_name
    FROM group_students
    INNER JOIN groups ON group_students.group_id = groups.id
    INNER JOIN users ON group_students.user_id = users.id
    WHERE groups.id = ?    ORDER BY users.username;

// List running modules for one group / or for all groups by removing WHERE statement
SELECT groups.group_name,
        running_modules.starting_on,
        running_modules.scheduled_end,
        running_modules.finished,
        modules.module_name,
        modules.module_img,
        modules.git_url,
        modules.git_repo
    FROM groups
    INNER JOIN running_modules ON running_modules.group_id = groups.id
    INNER JOIN modules ON running_modules.module_id = modules.id
    WHERE groups.id = ?    ORDER BY running_modules.starting_on;

// List running modules for one group with module teacher
SELECT groups.group_name,
        running_modules.starting_on,
        running_modules.scheduled_end,
        running_modules.finished,
        modules.module_name,
        modules.module_img,
        modules.git_url,
        modules.git_repo,
        users.username as teacher
    FROM groups
    INNER JOIN running_modules ON running_modules.group_id = groups.id
    INNER JOIN modules ON running_modules.module_id = modules.id
	INNER JOIN running_module_teachers ON running_module_teachers.running_module_id = running_modules.id
	INNER JOIN users ON running_module_teachers.user_id = users.id
    WHERE groups.id = ?
    ORDER BY running_modules.starting_on;

    ** I had a problem here, how to combine multiple teachers for single running module?