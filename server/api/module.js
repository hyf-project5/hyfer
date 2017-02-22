module.exports = {
    list,
    module_details,
    add,
    delete_module
}

function list(req, res) {
    let module = [];
    req.getConnection(function(err, connection) {
        if (!err) {
            connection.query('SELECT * FROM module', [], function(err, results) {
                res.status(200).json({ status: 200, results: results });
            });
        }
    })
};

function module_details(req, res) {
    let module = [];
    req.getConnection(function(err, connection) {
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
    req.getConnection(function(err, connection) {
        if (!err) {
            connection.query('INSERT INTO module SET ?', req.body, function(err, results) {
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
    var uuid = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query("DELETE FROM module  WHERE uuid = ? ", [uuid], function(err, rows) {
            if (err) {
                return res.status(500).json(error);
                console.log("Error Selecting : %s ", err);
            } else {
                if (rows.affectedRows === 0) {
                    return res.status(404).json({ status: 404, error: "No such module, nothing changed!" });
                } else {
                    console.log('success');
                    res.send({ changes: rows })
                };
            }
        });
    });
};