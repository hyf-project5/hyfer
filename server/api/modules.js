
/*
 * GET Modules listing.
 */

module.exports = {
    list: list,
    add: add,
    edit: edit,
    save: save,
    save_edit: save_edit,
    delete_module: delete_module
};

function list(req, res) {
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tablemodules', (err, rows) => {
            if (err)
                console.log("Error Selecting : %s ", err);

            else { res.send(rows); }
        });

    });
};

function add(req, res) {
    res.sendfile('public/views/modules/add-module.html')
};

function edit(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tablemodules WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            else { res.send({ data: rows }) }
        });

    });
};


/*Save the module*/
function save(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, connection) => {
        let data = {
            moduleName: input.moduleName,
            moduleMentor1: input.moduleMentor1,
            moduleMentor2: input.moduleMentor2
        };
        //console.log(data.lessonRegisterDate);
        let query = connection.query("INSERT INTO tablemodules set ? ", data, (err, rows) => {
            if (err)
                console.log("Error inserting : %s ", err);
            res.redirect('#/modules');
            // else{res.}
        });
        // console.log(query.sql); get raw query
    });
};

function save_edit(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let data = {
            moduleName: input.moduleName,
            moduleMentor1: input.moduleMentor1,
            moduleMentor2: input.moduleMentor2
        };

        connection.query("UPDATE tablemodules set ? WHERE moduleId = ? ", [data, id], (err, rows) => {
            if (err)
                console.log("Error Updating : %s ", err);
            res.send({ data: rows })
        });
    });
};

function delete_module(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM tablemodules  WHERE moduleId = ? ", [id], (err, rows) => {
            if (err) {


                // res.sendfile('public/views/index.html')
                res.sendfile('public/views/modules/error.html')
                // res.redirect('#/');
                console.log("Error Selecting : %s ", err);
            } else { console.log('success'); res.send({ data: rows }) }
        });
    });
};

