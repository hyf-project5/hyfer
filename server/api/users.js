
/*
 * GET users listing.
 */

module.exports = {
    home: home,
    list: list,
    add: add,
    user: user,
    edit: edit,
    save: save,
    save_edit: save_edit,
    delete_user: delete_user
}

function home(req, res) {
    res.sendfile('client/views/index.html')
}
function list(req, res) {
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableusers', (err, rows) => {
            if (err)
                console.log("Error Selecting : %s ", err);

            return res.send(rows);
        });
    });
};

function user(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableusers WHERE userId=' + parseInt(id), (err, rows) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send({ data: rows })

            }
        });
    });
};

function add(req, res) {
    res.sendfile('public/views/index.html')
};

function edit(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableusers WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            else { res.send({ data: rows }) }
        });

    });
};

/*Save the users*/
function save(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, connection) => {
        //let dateAndTime= new Date();
        let data = {
            userFirstName: input.userFirstName,
            userLastName: input.userLastName,
            userAddress: input.userAddress,
            userEmail: input.userEmail,
            userPassword: input.userPassword,
            userMobile: input.userMobile,
            userRole: input.userRole,
            userClass: input.userClass,
            userPhoto: input.userPhoto
            //userRegisterDate: dateAndTime
        };
        //console.log(data.userRegisterDate);
        let query = connection.query("INSERT INTO tableusers set ? ", data, (err, rows) => {
            if (err)
                console.log("Error inserting : %s ", err);
            res.redirect('/');

        });
        // console.log(query.sql); get raw query
    });
};

function save_edit(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let data = {
            userFirstName: input.userFirstName,
            userLastName: input.userLastName,
            userAddress: input.userAddress,
            userEmail: input.userEmail,
            //userPassword  : input.userPassword,
            userMobile: input.userMobile,
            userRole: input.userRole,
            userClass: input.userClass
        };

        connection.query("UPDATE tableusers set ? WHERE userId = ? ", [data, id], (err, rows) => {
            if (err)
                console.log("Error Updating : %s ", err);
            // res.redirect('/');
            res.send({ data: rows })
        });
    });
};

function delete_user(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM tableusers  WHERE userId = ? ", [id], (err, rows) => {
            if (err)
                console.log("Error deleting : %s ", err);
            // res.redirect('/');
            else { console.log('success'); res.send({ data: rows }) }
        });
    });
};


