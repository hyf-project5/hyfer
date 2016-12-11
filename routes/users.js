
/*
 * GET users listing.
 */
exports.home = function(req, res){
      res.sendfile('public/views/index.html')
}
exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableusers',function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );

            return res.send(rows);
         });
    });
};

exports.user = function(req, res){
    var id = req.params.id;  
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableusers WHERE userId=' + parseInt(id),function(err,rows) { 
            if(err) {
                console.log(err)}
           else{ 
              res.send({data:rows})

           }
         });
    }); 
};

exports.add = function(req, res){
  res.sendfile('public/views/index.html')
};

exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableusers WHERE id = ?',[id],function(err,rows)
        { 
            if(err){
              console.log("Error Selecting : %s ",err );
            }
            else{res.send({data:rows})}
         });

    }); 
};

/*Save the users*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        //var dateAndTime= new Date();
        var data = {
            userFirstName : input.userFirstName,
            userLastName  : input.userLastName,
            userAddress   : input.userAddress,
            userEmail     : input.userEmail,
            userPassword  : input.userPassword,
            userMobile    : input.userMobile,
            userRole      : input.userRole,
            userClass     : input.userClass,
            userPhoto     : input.userPhoto
            //userRegisterDate: dateAndTime
        };
        //console.log(data.userRegisterDate);
        var query = connection.query("INSERT INTO tableusers set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/');

        });
       // console.log(query.sql); get raw query
    });
};

exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var data = {
            userFirstName : input.userFirstName,
            userLastName  : input.userLastName,
            userAddress   : input.userAddress,
            userEmail     : input.userEmail,
            //userPassword  : input.userPassword,
            userMobile    : input.userMobile,
            userRole      : input.userRole,
            userClass     : input.userClass 
        };
        
        connection.query("UPDATE tableusers set ? WHERE userId = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          // res.redirect('/');
          res.send({data:rows})
        });
    });
};

exports.delete_user = function(req,res){    
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM tableusers  WHERE userId = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
             // res.redirect('/');
             else{console.log('success');res.send({data:rows})}
        });
     });
};


