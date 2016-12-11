//Module dependencies.
var express = require('express');
// var routes = require('./routes');
var http = require('http');
var path = require('path');

//load users route
var users = require('./routes/users');   //API
var lessons = require('./routes/lessons'); //Lessons Tables API
var classes = require('./routes/classes'); // Classes Tabels API
var announce = require('./routes/announce'); // Announce Tabels API
var modules = require('./routes/modules') // Modules Tabels API

var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3002);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(__dirname+'/public'))
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

app.use(

    connection(mysql,{

    host: 'hykrdb.cmsfrokrxjf7.us-west-2.rds.amazonaws.com',
    user: 'smsuser',
    password: 'uyew65knj098',
    database: 'smshyf'
    },'pool') //or single

);

app.get('/',users.home);
app.get('/users', users.list);
app.get('/users/:id', users.user);
app.get('/users/add', users.add);
app.post('/users/add', users.save);
app.delete('/users/delete/:id', users.delete_user);
app.get('/users/edit/:id', users.edit);
app.post('/users/edit/:id',users.save_edit);

// app.get('/les', lessons.lessons);
app.get('/lessons', lessons.list);
app.get('/lessons/:id',lessons.lesson)
//app.get('/lessons/:id', lessons.lessonDetails);
app.get('/lessons/add', lessons.add);
app.post('/lessons/add', lessons.save);
app.delete('/lessons/delete/:id', lessons.delete_lesson);
app.get('/lessons/edit/:id', lessons.edit);
app.post('/lessons/edit/:id',lessons.save_edit);



// app.get('/cls', classes.classes);
app.get('/classes', classes.list);
app.get('/classes/add', classes.add);
app.post('/classes/add', classes.save);
app.delete('/classes/delete/:id', classes.delete_class);
app.get('/classes/edit/:id', classes.edit);
app.post('/classes/edit/:id',classes.save_edit);



app.get('/announce', announce.list);
app.get('/announce/:id', announce.announcement);
app.get('/announce/add', announce.add);
app.post('/announce/add', announce.save);
app.delete('/announce/delete/:id', announce.delete_announce);
app.get('/announce/edit/:id', announce.edit);
app.post('/announce/edit/:id',announce.save_edit);



app.get('/modules', modules.list);
app.get('/modules/add', modules.add);
app.post('/modules/add', modules.save);
app.delete('/modules/delete/:id', modules.delete_module);
app.get('/modules/edit/:id', modules.edit);
app.post('/modules/edit/:id',modules.save_edit);


app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*|||||||||||||||| Invite by email |||||||||||||||*/

app.get("/invite",function(req,res){res.render("invite");});

app.post("/invite",function(req,res){
    var api_key = 'key-055bb9cb0a075b11fe777e200596e62a';
    var domain = 'sandboxdc00bc963eec4cccae80c4bae64b4a73.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    var data = {
      from: 'HYF Student System <postmaster@sandboxdc00bc963eec4cccae80c4bae64b4a73.mailgun.org>',
      to: req.body.useremail,
      subject: "HYF Student System",
      html: 
      '<table border="0" class="x_phoenix-email-container" cellspacing="0" cellpadding="0" width="512" bgcolor="#FFFFFF" style="background-color:#FFFFFF; margin:0 auto; max-width:512px; width:inherit">\
<tbody>\
<tr>\
<td bgcolor="#F6F8FA" style="background-color:#F6F8FA; padding:12px; border-bottom:1px solid #ECECEC">\
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%!important; min-width:100%!important">\
<tbody>\
<tr>\
<td align="left" valign="middle" style=""><a href="http://smshyf.com" target="_blank" style="color:#737373; display:inline-block; text-decoration:none">SMSHYF.com</a></td>\
<td valign="middle" width="40" style="padding-left:10px"><a href="#" target="_blank" style="border-radius:50%; color:#737373; display:inline-block; text-decoration:none"></a></td>\
<td width="1" style="">&nbsp;</td>\
</tr></tbody></table></td></tr><tr>\
<td style=""><table border="0" cellspacing="0" cellpadding="0" width="100%" style=""><tbody><tr>\
<td style=""><table border="0" cellspacing="0" cellpadding="0" width="100%" style=""><tbody><tr>\
<td class="x_container" bgcolor="#2791bd" align="center" style="background-color:#2791bd; padding:18px 24px; text-align:center">\
<h2 style="margin:0; color:#FFFFFF; font-weight:200; font-size:20px; padding-bottom:6px; line-height:1.2">\
Welcome in HYF Student Managment System</h2></td></tr><tr>\
<td class="x_container" align="center" style="padding:10px 0 40px 0; text-align:center">\
<img src="https://s19.postimg.org/a4no579qr/13913995_948944158548386_1974178573754774448_o.jpg" style="width:100%">\
Please follow this link to finish your registration in our system!\
<table border="0" cellpadding="0" cellspacing="0" style="display:inline-block;margin-top: 6px;">\
<tbody>\
<tr>\
<td align="center" valign="middle" style=""><a href="#" target="_blank" style="word-wrap:normal; color:#737373; word-break:normal; white-space:nowrap; display:block; text-decoration:none">\
<table border="0" cellspacing="0" cellpadding="0" width="auto" style="">\
<tbody>\
<tr>\
<td bgcolor="#008CC9" style="padding:6px 16px; color:#FFFFFF; font-weight:500; font-size:16px; border-color:#008CC9; background-color:#008CC9; border-radius:2px; border-width:1px; border-style:\solid;">\
<a href="http://www.smshyf/register" target="_blank" style="color:#FFFFFF; display:inline-block; text-decoration:none">Register here!</a></td>\
</tr></tbody></table></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr>\
<td style="">\
<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#EDF0F3" align="center" style="background-color:#EDF0F3; padding:0 24px; color:#999999; text-align:center">\
<tbody><tr><td style="">\
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="margin:10px"><tbody><tr>\
<td align="center" style="padding:0 0 12px 0; text-align:center"><p style="margin:0; color:#737373; font-weight:400; font-size:12px; line-height:1.333">\
You are receiving this email because you are accepted as student in Hack your Futre</p></td></tr><tr>\
<td align="center" style="padding:0 0 12px 0; text-align:center"><span dir="ltr">\
<p style="margin:0; color:#737373; font-weight:400; font-size:12px; line-height:1.333">\
© 2016 HackYourFuture | System managment system</p></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>\
'
    };

mailgun.messages().send(data, function (error, body) {
  console.log(body);
    if(!error){
        res.redirect('/');
    }else{
        res.send("ERROR: MAIL NOT SENT! please try again");}
});
});
