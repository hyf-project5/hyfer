
/*
 * GET users listing.
 */

exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableusers',function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
            //res.render('users',{page_title:"users - Node.js",data:rows});
            //console.log('DATA IS:'+rows[1].name);
            return res.send(rows);
         });
         //console.log(query.sql);

    });
};

exports.add = function(req, res){
  res.render('add_users',{page_title:"Add users - Node.js"}); 
};

exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tableusers WHERE id = ?',[id],function(err,rows)
        { 
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_users',{page_title:"Edit users - Node.js",data:rows});
         });
         //console.log(query.sql);
    }); 
};



/*Save the users*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        //var dateAndTime= new Date();
        var data = {
            userFirstName : input.fname,
            userLastName  : input.lname,
            userAddress   : input.address,
            userEmail     : input.email,
            userPassword  : input.pass,
            userMobile    : input.mob,
            userRole      : input.role,
            userClass     : input.group_num, 
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
            userFirstName : input.fname,
            userLastName  : input.lname,
            userAddress   : input.address,
            userEmail     : input.email,
            //userPassword  : input.pass,
            userMobile    : input.mob,
            userRole      : input.role,
            userClass     : input.group_num 
        };
        
        connection.query("UPDATE tableusers set ? WHERE userId = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/');
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
             res.redirect('/');
        });
     });
};


