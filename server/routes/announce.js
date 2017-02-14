let dateFormat = require('dateformat');
/*
 * GET Announcement listing.
 */

module.exports = {
    list: list,
    announcement: announcement,
    add: add,
    edit: edit,
    save: save,
    save_edit: save_edit,
    delete_announce: delete_announce
}
function list(req, res) {
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableannouncements', (err, rows) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            else { res.send(rows); }
        });

    });
};

function announcement(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableannouncements WHERE announcementId=' + parseInt(id), (err, rows) => {
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
    res.sendfile('public/views/announcement/announcement.html')
};

function edit(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tableannouncements WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            else { res.send({ data: rows }) }
        });

    });
};


/*Save the Announcement*/
function save(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, connection) => {
        let announcementDate = dateFormat(input.announcementDate, "yyyy-mm-dd HH:MM:ss");
        let data = {
            announcementTitle: input.announcementTitle,
            announcementDesc: input.announcementDesc,
            announcementDate: announcementDate
        };
        let query = connection.query("INSERT INTO tableannouncements set ? ", data, (err, rows) => {
            if (err)
                console.log("Error inserting : %s ", err);
            res.redirect('#/announcement');
        });
    });
};

function save_edit(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let announcementDate = dateFormat(input.announcementDate, "yyyy-mm-dd HH:MM:ss");
        let data = {
            announcementTitle: input.announcementTitle,
            announcementDesc: input.announcementDesc,
            announcementDate: announcementDate
        };

        connection.query("UPDATE tableannouncements set ? WHERE announcementId = ? ", [data, id], (err, rows) => {
            if (err)
                console.log("Error Updating : %s ", err);
            res.send({ data: rows })
        });
    });
};

function delete_announce(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM tableannouncements  WHERE announcementId = ? ", [id], (err, rows) => {
            if (err)
                console.log("Error deleting : %s ", err);
            else { console.log('success'); res.send({ data: rows }) }
        });
    });
};


