var dateFormat = require('dateformat'); 
/*
 * GET lessons listing.
 */
// exports.lessons = function(req, res){
//       res.sendfile('public/views//lessons.html')
// }
exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('select * from tablelessons \
          left outer join  tablemodules on tablelessons.lessonmodule=tablemodules.moduleid',function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
            //res.render('lessons',{page_title:"lessons - Node.js",data:rows});
            //console.log('DATA IS:'+rows[1].name);
            return res.send(rows);
         });
         //console.log(query.sql);

    });
};

exports.lesson = function(req, res){
    var id = req.params.id;  
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tablelessons WHERE lessonId=' + parseInt(id),function(err,rows) { 
            if(err) {
                console.log(err)}
           else{ 
              res.send({data:rows})

           }
         });
    }); 
};


<!-- ///////////// lesson details //////////////////-->

exports.lessonDetails = function(req, res){
  var id =req.params.id;
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT tablelessons.lessonId,concat\
          (userFirstName," ",userLastName) as StudentName, lessonAttended, \
          lessonAssignment, lessonFeedback FROM tableusers INNER JOIN (tablelessons\
           INNER JOIN tablelessondetails ON tablelessons.lessonId = tablelessondetails.\
           lessonId) ON tableusers.userId = tablelessondetails.lessonStudentId\
            where tablelessons.lessonId=?',[id], function(err, rows)
        {  
            if(err){
                console.log("Error Selecting : %s ", err);
                
            }else{
                console.log('the row '+rows);
                res.send({data:rows});
            }
         });
         

    });
};


<!-- ///////////// lesson details //////////////////-->
exports.listWithMentors = function(req, res){
  req.getConnection(function(err,connection){
        var getLessonsWithMentors = 'SELECT * FROM tablelessons, tableusers INNER JOIN tablelessons.id ON tableusers.user';
        var query = connection.query(getLessonsWithMentors,function(err,rows)
        {  
            if(err) {
                console.log("Error Selecting : %s ",err );
            // do morphing and shaping of data that you want to send back HERE!
          }else{
            return res.send(rows);}
         });
    });
};

exports.add = function(req, res){
  res.sendfile('public/views/lessons/lessons.html') 
};

exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tablelessons WHERE id = ?',[id],function(err,rows)
        { 
            if(err){
                console.log("Error Selecting : %s ",err );
            }
            else{res.send({data:rows})}
         });
         
    }); 
};


/*Save the lessons*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        //var dateAndTime= new Date();
        var les_Date=dateFormat(input.lessonDate, "yyyy-mm-dd HH:MM:ss");   
        var data = {
            lessonDate      : les_Date,
            lessonClass     : input.lessonClass,
            lessonLocation  : input.lessonLocation,
            lessonModule    : input.lessonModule,
            lessonMentor1   : input.lessonMentor1,
            lessonMentor2   : input.lessonMentor2,
            lessonMentor3   : input.lessonMentor3
        };
        //console.log(data.lessonRegisterDate);
        var query = connection.query("INSERT INTO tablelessons set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('#/les');
          // else{res.}
        });
       // console.log(query.sql); get raw query
    });
};

exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var data = {
//            lessonDate      : input.lessonDate,
            lessonClass     : input.lessonClass,
            lessonLocation  : input.lessonLocation,
            lessonModule    : input.lessonModule,
            lessonMentor1   : input.lessonMentor1,
            lessonMentor2   : input.lessonMentor2,
            lessonMentor3   : input.lessonMentor3,
        };
        
        connection.query("UPDATE tablelessons set ? WHERE lessonId = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          //res.redirect('/les');
          res.send({data:rows})
        });
    });
};

exports.delete_lesson = function(req,res){    
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM tablelessons  WHERE lessonId = ? ",[id], function(err, rows)
        {
             if(err){
                 console.log("Error deleting : %s ",err );
             //res.redirect('/les');
             }else{console.log('success');res.send({data:rows})}
        });
     });
};


