
/*
 * GET Modules listing.
 */

exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tablemodules',function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
   
            else{ res.send(rows);}
         });

    });
};

exports.add = function(req, res){
  res.sendfile('public/views/modules/add-module.html') 
};

exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tablemodules WHERE id = ?',[id],function(err,rows)
        { 
            if(err){
                console.log("Error Selecting : %s ",err );
            }
            else{res.send({data:rows})}
         });
         
    }); 
}; 


/*Save the module*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            moduleName     : input.moduleName,
            moduleMentor1  : input.moduleMentor1,
            moduleMentor2  : input.moduleMentor2
        };
        //console.log(data.lessonRegisterDate);
        var query = connection.query("INSERT INTO tablemodules set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('#/modules');
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
            moduleName     : input.moduleName,
            moduleMentor1  : input.moduleMentor1,
            moduleMentor2  : input.moduleMentor2
        };
        
        connection.query("UPDATE tablemodules set ? WHERE moduleId = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.send({data:rows})
        });
    });
};

exports.delete_module = function(req,res){    
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM tablemodules  WHERE moduleId = ? ",[id], function(err, rows)
        {
             if(err){


              // res.sendfile('public/views/index.html')
                res.sendfile('public/views/modules/error.html')
                // res.redirect('#/');
                console.log("Error Selecting : %s ",err );
            } else{console.log('success');res.send({data:rows})}
        });
     });
};

