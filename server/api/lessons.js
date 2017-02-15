let dateFormat = require('dateformat');
/*
 * GET lessons listing.
 */
// exports.lessons = function(req, res){
//       res.sendfile('public/views//lessons.html')
// }

module.exports = {
    list: list,
    lesson: lesson,
    lessonDetails: lessonDetails,
    listWithMentors: listWithMentors,
    add: add,
    edit: edit,
    save: save,
    save_edit: save_edit,
    delete_lesson: delete_lesson
}

function list(req, res) {
    req.getConnection((err, connection) => {
        let query = connection.query('select * from tablelessons \
          left outer join  tablemodules on tablelessons.lessonmodule=tablemodules.moduleid', (err, rows) => {
                if (err)
                    console.log("Error Selecting : %s ", err);
                //res.render('lessons',{page_title:"lessons - Node.js",data:rows});
                //console.log('DATA IS:'+rows[1].name);
                return res.send(rows);
            });
        //console.log(query.sql);

    });
};

function lesson(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tablelessons WHERE lessonId=' + parseInt(id), (err, rows) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send({ data: rows })

            }
        });
    });
};


// <!-- ///////////// lesson details //////////////////-->

function lessonDetails(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT tablelessons.lessonId,concat\
          (userFirstName," ",userLastName) as StudentName, lessonAttended, \
          lessonAssignment, lessonFeedback FROM tableusers INNER JOIN (tablelessons\
           INNER JOIN tablelessondetails ON tablelessons.lessonId = tablelessondetails.\
           lessonId) ON tableusers.userId = tablelessondetails.lessonStudentId\
            where tablelessons.lessonId=?', [id], (err, rows) => {
                if (err) {
                    console.log("Error Selecting : %s ", err);

                } else {
                    console.log('the row ' + rows);
                    res.send({ data: rows });
                }
            });


    });
};


// <!-- ///////////// lesson details //////////////////-->

function listWithMentors(req, res) {
    req.getConnection((err, connection) => {
        let getLessonsWithMentors = 'SELECT * FROM tablelessons, tableusers INNER JOIN tablelessons.id ON tableusers.user';
        let query = connection.query(getLessonsWithMentors, (err, rows) => {
            if (err) {
                console.log("Error Selecting : %s ", err);
                // do morphing and shaping of data that you want to send back HERE!
            } else {
                return res.send(rows);
            }
        });
    });
};

function add(req, res) {
    res.sendfile('public/views/lessons/lessons.html')
};

function edit(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        let query = connection.query('SELECT * FROM tablelessons WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            else { res.send({ data: rows }) }
        });

    });
};


/*Save the lessons*/
function save(req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, connection) => {
        //let dateAndTime= new Date();
        let les_Date = dateFormat(input.lessonDate, "yyyy-mm-dd HH:MM:ss");
        let data = {
            lessonDate: les_Date,
            lessonClass: input.lessonClass,
            lessonLocation: input.lessonLocation,
            lessonModule: input.lessonModule,
            lessonMentor1: input.lessonMentor1,
            lessonMentor2: input.lessonMentor2,
            lessonMentor3: input.lessonMentor3
        };
        //console.log(data.lessonRegisterDate);
        let query = connection.query("INSERT INTO tablelessons set ? ", data, (err, rows) => {
            if (err)
                console.log("Error inserting : %s ", err);
            res.redirect('#/les');
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
            //            lessonDate      : input.lessonDate,
            lessonClass: input.lessonClass,
            lessonLocation: input.lessonLocation,
            lessonModule: input.lessonModule,
            lessonMentor1: input.lessonMentor1,
            lessonMentor2: input.lessonMentor2,
            lessonMentor3: input.lessonMentor3,
        };

        connection.query("UPDATE tablelessons set ? WHERE lessonId = ? ", [data, id], (err, rows) => {
            if (err)
                console.log("Error Updating : %s ", err);
            //res.redirect('/les');
            res.send({ data: rows })
        });
    });
};

function delete_lesson(req, res) {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM tablelessons  WHERE lessonId = ? ", [id], (err, rows) => {
            if (err) {
                console.log("Error deleting : %s ", err);
                //res.redirect('/les');
            } else { console.log('success'); res.send({ data: rows }) }
        });
    });
};


