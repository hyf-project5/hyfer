module.exports = {
    list,
    account_details,
    add,
    update,
    delete_account
}

function list(req, res) {
    req.getConnection((err, connection) => {
        if (!err) connection.query('SELECT * FROM accounts', (err, results) => {
            res.send({ status: 200, results: results })
        });
    })
};

function account_details(req, res) {
    req.getConnection((err, connection) => {
        if (!err) connection.query('SELECT * FROM accounts WHERE id = ?', [req.params.id], (err, result) => {
            if (result[0] === undefined) return res.send({ status: 404, error: 'Not found!' });
            else res.send({ status: 200, result: result });
        });
    })
};

function add(req, res) {
    req.getConnection((err, connection) => {
        if (!err) connection.query('INSERT INTO accounts SET ?', req.body, (err, result) => {
            if (err) res.send({ status: 400, message: err });
            else res.send({ status: 200, result: 'Module created!' });
        });
    })
};

function update(req, res) {
    req.getConnection((err, connection) => {
        connection.query("UPDATE accounts SET ? WHERE id = ?", [req.body, req.params.id], (err, result) => {
            if (err) return res.send({ status: 400, error: err });
            if (result.affectedRows > 0) return res.send({ status: 200, result: 'Module updated!' })
            res.send({ status: 404, error: 'Not found!' })
        })
    })
};

function delete_account(req, res) {
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM accounts WHERE id = ? ", req.params.id, (err, result) => {
            if (err) return res.send({ status: 500, error: err });
            if (result.affectedRows > 0) return res.send({ status: 200, result: 'Module deleted!' })
            res.send({ status: 404, error: 'Not found!' })
        })
    })
};