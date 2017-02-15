let dateFormat = require('dateformat');

module.exports = {
    list: list,
    add: add,
    edit: edit,
    save: save,
    save_edit: save_edit,
    delete_class: delete_class
}
function list(req, res) {
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableclasses', (err, rows) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            //res.render('classes',{page_title:"classes - Node.js",data:rows});
            //console.log('DATA IS:'+rows[1].name);
            else { res.send(rows); }
        });
        //console.log(query.sql);

    });
};

function add(req, res) {
    res.sendfile('public/views/classes/classes.html')
};

function edit(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableclasses WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            else { res.send({ data: rows }) }
        });

    });
};


/*Save the classes*/
function save(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, connection) => {
        //let dateAndTime= new Date();
        let startDate = dateFormat(input.classStartDate, "yyyy-mm-dd HH:MM:ss");
        let endDate = dateFormat(input.classEndDate, "yyyy-mm-dd HH:MM:ss");
        let data = {
            className: input.className,
            classStartDate: startDate,
            classEndDate: endDate,
        };
        //console.log(data.lessonRegisterDate);
        let query = connection.query("INSERT INTO tableclasses set ? ", data, (err, rows) => {
            if (err)
                console.log("Error inserting : %s ", err);
            res.redirect('#/classes');
            // else{res.}
        });
        // console.log(query.sql); get raw query
    });
};

function save_edit(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let startDate = dateFormat(input.classStartDate, "yyyy-mm-dd HH:MM:ss");
        let endDate = dateFormat(input.classEndDate, "yyyy-mm-dd HH:MM:ss");
        let data = {
            className: input.className,
            classStartDate: startDate,
            classEndDate: endDate,
        };

        connection.query("UPDATE tableclasses set ? WHERE classId = ? ", [data, id], (err, rows) => {
            if (err)
                console.log("Error Updating : %s ", err);
            //res.redirect('/les');
            res.send({ data: rows })
        });
    });
};

function delete_class(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM tableclasses  WHERE classId = ? ", [id], (err, rows) => {
            if (err) {
                res.send(err)
                console.log("Error Selecting : %s ", err);
                // res.sendfile('public/views/classes/classes.html')
                //res.redirect('/les');
            } else { console.log('success'); res.send({ data: rows }) }
        });
    });
};


