const uuidv4 = require('uuid/v4');
module.exports = {
    list,
    module_details,
    add,
    delete_module
}


function list(req, res) {
    req.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT * FROM module', (err, results) => {
                res.status(200).json({ status: 200, results: results });
            });
        }
    })
};

function module_details(req, res) {
    req.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT * FROM module WHERE uuid = ?', [req.params.id], (err, results) => {
                if (results[0] === undefined) {
                    return res.status(404).json({ status: 404, err: "No such entry" });
                }
                res.status(200).json({ status: 200, results: results });
            });
        }
    })
};



function add(req, res) {
    req.getConnection((err, connection) => {
        if (!err) {
            connection.query('INSERT INTO module SET ?, uuid=?', [req.body, uuidv4()], (err, results) => {
                if (err) {
                    console.log(req.body);
                    res.status(400).json({ status: 400, message: err });
                    return;
                }
                res.status(200).json({ message: 'Module created!' });
            });

        }
    })
};



function delete_module(req, res) {
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM module WHERE uuid = ? ", req.params.id, (err, rows) => {
            if (err) {
                console.log("Error Selecting : %s ", err);
                return res.status(500).json(err);
            } else {
                if (rows.affectedRows === 0) {
                    return res.status(404).json({ status: 404, error: "No such module, nothing changed!" });
                } else {
                    console.log('success');
                    res.send({ status: 200, changes: rows })
                };
            }
        });
    });
};