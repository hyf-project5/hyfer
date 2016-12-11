var dateFormat = require('dateformat'); 
/*
 * GET Announcement listing.
 */


exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableannouncements',function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
            else{ res.send(rows);}
         });

    });
};

exports.announcement = function(req, res){
    var id = req.params.id;  
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableannouncements WHERE announcementId=' + parseInt(id),function(err,rows) { 
            if(err) {
                console.log(err)}
           else{ 
              res.send({data:rows})

           }
         });
    }); 
};

exports.add = function(req, res){
  res.sendfile('public/views/announcement/announcement.html') 
};

exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableannouncements WHERE id = ?',[id],function(err,rows)
        { 
            if(err){
                console.log("Error Selecting : %s ",err );
            }
            else{res.send({data:rows})}
         });
         
    }); 
}; 


/*Save the Announcement*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var announcementDate=dateFormat(input.announcementDate, "yyyy-mm-dd HH:MM:ss");
        var data = {
            announcementTitle : input.announcementTitle,
            announcementDesc : input.announcementDesc,
            announcementDate : announcementDate
        }; 
        var query = connection.query("INSERT INTO tableannouncements set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('#/announcement');
        });
    });
};

exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var announcementDate=dateFormat(input.announcementDate, "yyyy-mm-dd HH:MM:ss");
        var data = {
            announcementTitle : input.announcementTitle,
            announcementDesc : input.announcementDesc,
            announcementDate : announcementDate
        }; 
        
        connection.query("UPDATE tableannouncements set ? WHERE announcementId = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.send({data:rows})
        });
    });
};

exports.delete_announce = function(req,res){    
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM tableannouncements  WHERE announcementId = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
             else{console.log('success');res.send({data:rows})}
        });
     });
};


