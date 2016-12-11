var dateFormat = require('dateformat'); 
/*
 * GET Classes listing.
 */
// exports.classes = function(req, res){
//       res.sendfile('public/views/classes/classes.html')
// }
exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableclasses',function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
            //res.render('classes',{page_title:"classes - Node.js",data:rows});
            //console.log('DATA IS:'+rows[1].name);
            else{ res.send(rows);}
         });
         //console.log(query.sql);

    });
};

exports.add = function(req, res){
  res.sendfile('public/views/classes/classes.html') 
};

exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableclasses WHERE id = ?',[id],function(err,rows)
        { 
            if(err){
                console.log("Error Selecting : %s ",err );
            }
            else{res.send({data:rows})}
         });
         
    }); 
}; 


/*Save the classes*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        //var dateAndTime= new Date();
        var startDate=dateFormat(input.classStartDate, "yyyy-mm-dd HH:MM:ss");
        var endDate=dateFormat(input.classEndDate, "yyyy-mm-dd HH:MM:ss");
        var data = {
            className       : input.className,
            classStartDate  : startDate,
            classEndDate    : endDate,
        };
        //console.log(data.lessonRegisterDate);
        var query = connection.query("INSERT INTO tableclasses set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('#/classes');
          // else{res.}
        });
       // console.log(query.sql); get raw query
    });
};

exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var startDate=dateFormat(input.classStartDate, "yyyy-mm-dd HH:MM:ss");
        var endDate=dateFormat(input.classEndDate, "yyyy-mm-dd HH:MM:ss");
        var data = {
            className       : input.className,
            classStartDate  : startDate,
            classEndDate    : endDate,
        };
        
        connection.query("UPDATE tableclasses set ? WHERE classId = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          //res.redirect('/les');
          res.send({data:rows})
        });
    });
};

exports.delete_class = function(req,res){    
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM tableclasses  WHERE classId = ? ",[id], function(err, rows)
        {
             if(err){
              res.send(err)
                 console.log("Error Selecting : %s ",err );
               // res.sendfile('public/views/classes/classes.html')
             //res.redirect('/les');
            } else{console.log('success');res.send({data:rows})}
        });
     });
};


