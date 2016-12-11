var app = angular.module('sms_app', ['ngRoute','angularUtils.directives.dirPagination']);

app.config(['$routeProvider', function ($routeProvider) {
   $routeProvider
   .when("/", {
      templateUrl: "views/users/all-users.html",
      controller: "mainController"
   })
   .when('/users/:id', {
      templateUrl : 'views/users/single-user.html',
      controller : 'singleController'
   })
   .when("/register", {
      templateUrl: "views/reg.html",
      controller: "mainController"
   })   
   .when('/lessons', {
      templateUrl : 'views/lessons/lessons.html',
      controller : 'lessonController'
   })
   .when('/lessons/:id', {
      templateUrl : 'views/lessons/single-lesson.html',
      controller : 'singleLessonController'
   })
   .when("/classes", {
      templateUrl: "views/classes/classes.html",
      controller: "classesController"
   })
   .when("/modules", {
      templateUrl: "views/modules/modules.html",
      controller: "modulesController"
   })
   .when("/announcement", {
      templateUrl: "views/announcement/announcement.html",
      controller: "announcementCtr"
   })
   .when("/announcement/:id", {
      templateUrl: "views/announcement/single-announcement.html",
      controller: "singleAnnouncementCtr"
   })
    // .otherwise({templateUrl: "views/404.html"});
   .otherwise('/');

}]);


app.controller('mainController', ['$scope', '$http','$route','$routeParams', function($scope,$http,$route,$routeParams){

   $http.get('/users').success(function(data){

      $scope.usersData = data;


   }).error(function(error){
      console.log(error)
   });

   $scope.insertUser = function(info) {

      $http.post('/users/add', {

      "userFirstName":info.userFirstName,
      "userLastName": info.userLastName,
      "userAddress": info.userAddress,
      "userEmail" : info.userEmail,
      "userMobile" : info.userMobile,
      "userRole" : info.userRole,
      "userClass": 1
      }).success(function(data){

          console.log(info)
         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')
      }).error(function(error){
         console.log(error);
      })
   };


   $scope.user = {};
    $scope.editInfo = function(info){

    $scope.user = info;
    console.log(info)

    }
   $scope.UpdateInfo = function(info){

      $http.post('/users/edit/'+info.userId,{

      "userFirstName":info.userFirstName,
      "userLastName": info.userLastName,
      "userAddress": info.userAddress,
      "userEmail" : info.userEmail,
      "userMobile" : info.userMobile,
      "userRole" : info.userRole,
      "userClass": info.userClass

      }).success(function(data){

         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')

      }).error(function(error){console.log(error)});
   }


      $scope.userRegisteration = function(info) {

      $http.post('/users/add', {

      "userFirstName":info.userFirstName,
      "userLastName": info.userLastName,
      "userAddress": info.userAddress,
      "userEmail" : info.userEmail,
      "userMobile" : info.userMobile,
      "userPassword" : info.userPassword,
      "userRole" : "HYF",
      "userClass": 1
      }).success(function(data){

          console.log(info)
         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')
         window.location.replace("http://www.smshyf.com");
      }).error(function(error){
         console.log(error);
      })
   };

   $scope.user = {};
    $scope.deleteInfo = function(info){
    $scope.user = info;

    }

   $scope.delUser = function(user){
      console.log(user)
      // if (confirm('This user will be deleted')){

         $http.delete('/users/delete/'+ user).success(function(data){

            console.log('success');
            $(".modal-backdrop").fadeOut();
            $route.reload();
         }).error(function(error){console.log(error)})
      // }

   };
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
}]);

app.controller('singleController', ['$scope', '$http','$location','$route','$routeParams', function($scope,$http,$location,$route,$routeParams){

   $http.get('/users/' + $routeParams.id).success(function(response) {

      $scope.names = response.data;

      // console.log(response.data)
      // console.log(response.data[0].userFirstName)
      }).error(function(error){
      console.log(error)
      });


   $scope.editInfo = function(info){

   $scope.user = info;
   }

   $scope.UpdateInfo = function(info){

      $http.post('/users/edit/'+$routeParams.id,{

      "userFirstName":info.userFirstName,
      "userLastName": info.userLastName,
      "userAddress": info.userAddress,
      "userEmail" : info.userEmail,
      "userMobile" : info.userMobile,
      "userRole" : info.userRole,
      "userClass": info.userClass

      }).success(function(data){

         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')

      }).error(function(error){console.log(error)});
   }

}]);


app.controller('lessonController', ['$scope', '$http','$route','$routeParams',
   function($scope,$http,$route,$routeParams){
       $("#newlessonstudent").hide()
       
      // listWithMentors

   $http.get('/lessons').success(function(data){
      //console.log('lessonData ', data);
      $scope.lessonsData = data;

      // we get back some number of lessons. loop through each lesson
      data.forEach(function(lesson, lessonsIndex) {
         // loop through all lesson mentors
         var mentors = [lesson.lessonMentor1, lesson.lessonMentor2, lesson.lessonMentor3];
         // console.log('mentors', mentors);
         mentors.forEach(function (mentorId, mentorIndex) {
            if(mentorId !== null && mentorId !== undefined) {
               // console.log('lesson mentor id: ', mentorId);
               // console.log(mentorId.toString());
               $http.get('/users/' + mentorId.toString()).success(function(mentorData){
                  // console.log('mentor id, data: ', mentorId, mentorData);
                  if (mentorData !== undefined) {
                     if (mentorData.data[0] !== undefined) {
                        if (mentorData.data[0].userFirstName !== undefined) {
                           // console.log('mentor name: ', mentorData.data[0].userFirstName);
                           var mentorName = mentorData.data[0].userFirstName;
                           // merge mentorName back into $scope.lessonsData
                           var fieldName = 'lessonMentor' + ((mentorIndex + 1).toString());
                           // console.log(fieldName);
                           $scope.lessonsData[lessonsIndex][fieldName] = mentorName;
                        }
                     }
                  }
               });
            }
         });

      });

      // get all mentor IDs from lessons Data
      // for each mentor ID, query /users/id

   }).error(function(error){
      console.log(error)
   });



   $scope.showDetails = function(info) {
    // console.log(info)       
    var lesId = info.lessonId;
    // pass the data to the lessontabledetails
      $http.get('/lessons/' + lesId).success(function(response) {
        // $http.get('')
         console.log(response)
         console.log(response.data)
         var array = response.data
          array.forEach(function(lesson, index){
            console.log(lesson)
            
              if(lesson.StudentName !== null && lesson.StudentName !== undefined){
                 console.log(lesson.StudentName)
                 

                 $("#newlessonstudent")
                 .html('<h3>The students of this lesson: </h3>'+'<p>' +(index+1)+'- '+lesson.StudentName+'</p>'+' ')
                 .insertBefore($("#thisLesson"))
                 .fadeToggle(200);

              } 


          });
      }).error(function(error){
        console.log(error)
      });
}



   $scope.insertlesson = function(info) {
      // console.log(info)
      console.log(info)
      $http.post('/lessons/add', {

      'lessonDate'      : info.lessonDate,
      'lessonClass'     : info.lessonClass,
      'lessonLocation'  : info.lessonLocation,
      'lessonModule'    : info.lessonModule,
      'lessonMentor1'   : info.lessonMentor1,
      'lessonMentor2'   : info.lessonMentor2,
      'lessonMentor3'   : info.lessonMentor3


      }).success(function(data){

          // console.log(info)
         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')
      }).error(function(error){
         console.log(error);
      })
   };


    $scope.lesson = {};
    $scope.editInfo = function(info){
    $scope.lesson = info;
    console.log(info)
    }

    $scope.updateInfo = function(lesson){
      // console.log(info.lessonId)
      console.log(lesson)
      $http.post('/lessons/edit/'+lesson.lessonId,{

//      'lessonDate'      : lesson.lessonDate,
      'lessonClass'     : lesson.lessonClass,
      'lessonLocation'  : lesson.lessonLocation,
      'lessonModule'    : lesson.lessonModule,
      'lessonMentor1'   : lesson.lessonMentor1,
      'lessonMentor2'   : lesson.lessonMentor2,
      'lessonMentor3'   : lesson.lessonMentor3


      }).success(function(data){

         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')

      }).error(function(error){console.log(error)});
   }

    $scope.delless = {};
    $scope.deleteInfo = function(info){
    $scope.delless = info;
    console.log(info)
    }
 

   $scope.deleteLesson = function(onelesson){
      console.log(onelesson) // lessonId
       if (confirm('This Lesson will be deleted')){

         $http.delete('/lessons/delete/' + onelesson).success(function(data){

          console.log(data)
             console.log('this data  '+ data)
            console.log('success');
            $(".modal-backdrop").fadeOut();
            $route.reload();
         }).error(function(error){console.log(error)})
       }

   };


    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
}]);

app.controller('singleLessonController', ['$scope', '$http','$location','$route','$routeParams', function($scope,$http,$location,$route,$routeParams){

   $http.get('/lessons/' + $routeParams.id).success(function(response) {
//       console.log(response)
      $scope.lessons = response.data;

      // console.log(response.data)
      // console.log(response.data[0].userFirstName)
      }).error(function(error){
      console.log(error)
      });
   
   $scope.updateInfo = function(lesson){
      // console.log(info.lessonId)
      console.log(lesson.lessonId)
      $http.post('/lessons/edit/'+lesson.lessonId,{

//      'lessonDate'      : lesson.lessonDate,
      'lessonClass'     : lesson.lessonClass,
      'lessonLocation'  : lesson.lessonLocation,
      'lessonModule'    : lesson.lessonModule,
      'lessonMentor1'   : lesson.lessonMentor1,
      'lessonMentor2'   : lesson.lessonMentor2,
      'lessonMentor3'   : lesson.lessonMentor3


      }).success(function(data){

         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')

      }).error(function(error){console.log(error)});
   }
//   + $routeParams.id
   $http.get('/lessons' ).success(function(data){
       console.log(data)
      //console.log('lessonData ', data);
      $scope.lessonsData = data;
       var data = data
       console.log(data)
      // we get back some number of lessons. loop through each lesson
      data.forEach(function(lesson, lessonsIndex) {
         // loop through all lesson mentors
         var mentors = [lesson.lessonMentor1, lesson.lessonMentor2, lesson.lessonMentor3];
         // console.log('mentors', mentors);
         mentors.forEach(function (mentorId, mentorIndex) {
//             console.log(mentorId)
            if(mentorId !== null && mentorId !== undefined) {
               // console.log('lesson mentor id: ', mentorId);
               // console.log(mentorId.toString());
               $http.get('/users/' + mentorId.toString()).success(function(mentorData){
                  // console.log('mentor id, data: ', mentorId, mentorData);
                  if (mentorData !== undefined) {
                     if (mentorData.data[0] !== undefined) {
                        if (mentorData.data[0].userFirstName !== undefined) {
                           // console.log('mentor name: ', mentorData.data[0].userFirstName);
                           var mentorName = mentorData.data[0].userFirstName;
                           // merge mentorName back into $scope.lessonsData
                           var fieldName = 'lessonMentor' + ((mentorIndex + 1).toString());
                           // console.log(fieldName);
                           $scope.lessonsData[lessonsIndex][fieldName] = mentorName;
                        }
                     }
                  }
               });
            }
         });

      });

      // get all mentor IDs from lessons Data
      // for each mentor ID, query /users/id

   }).error(function(error){
      console.log(error)
   });
   
   

}]);




///////////// lesson details //////////////////-->


// app.controller('lessonDetailsController', ['$scope', '$http','$location','$route','$routeParams', function($scope,$http,$location,$route,$routeParams){

//    $http.get('/lessons/' + $routeParams.id).success(function(response) {
//       console.log(response.data)
//       //console.log($routeParams.id);
//       // $scope.lessonDetailsData = response.data;
//       $scope.lessonDetailsData = response;
//       }).error(function(error){
//         console.log(error)
//       });
//       }]);


/////////// END lesson details //////////////////-->

app.controller('classesController', ['$scope', '$http','$route','$routeParams', function($scope,$http,$route,$routeParams){
   $http.get('/classes').success(function(data){
      // console.log(data)
      $scope.classesData = data;
   }).error(function(error){
      console.log(error)
   });
    

   $scope.insertClass = function(info) {
      console.log(info)
      $http.post('/classes/add', {

            className       : info.className,
            classStartDate  : info.classStartDate,
            classEndDate    : info.classEndDate


      }).success(function(data){

          console.log(info);
         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')
      }).error(function(error){
         console.log(error);
      })
   };

    $scope.class = {};
    $scope.editInfo = function(info){
    $scope.class = info;
    console.log(info)
    }

    $scope.updateInfo = function(info){
      console.log(info)
      $http.post('/classes/edit/'+ info.classId,{

            "className"       : info.className,
            "classStartDate"  : info.startDate,
            "classEndDate"    : info.endDate


      }).success(function(data){

         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')

      }).error(function(error){console.log(error)});
   }


   $scope.class = {};
    $scope.deleteInfo = function(info){
    $scope.class = info;
    console.log(info)
    }

   $scope.delClass = function(oneClass){
      console.log(oneClass);
      // if (confirm('This Class will be deleted')){

         $http.delete('/classes/delete/'+ oneClass).success(function(data){

            console.log('success');
            $(".modal-backdrop").fadeOut();
            $route.reload();
         }).error(function(error){
          // $("#delete").hide();
          console.log(error)})
      // }

   };


    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
}]);







app.controller('modulesController', ['$scope', '$http','$route','$routeParams', function($scope,$http,$route,$routeParams){
   $http.get('/modules').success(function(data){
      // console.log(data)
      $scope.modulesData = data;
   }).error(function(error){
      console.log(error)
   });
    

   $scope.insertModule = function(info) {

      $http.post('/modules/add', {

        "moduleName"    : info.moduleName,
        "moduleMentor1" : info.moduleMentor1,
        "moduleMentor2" : info.moduleMentor2

      }).success(function(data){

          console.log(info);
         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')
      }).error(function(error){
         console.log(error);
      })
   };

$http.get('/modules').success(function(data){
     
      $scope.modulesData = data;


      data.forEach(function(module, modulesIndex) {
    
         var mentors = [module.moduleMentor1, module.moduleMentor2];
         mentors.forEach(function (mentorId, mentorIndex) {
            if(mentorId !== null && mentorId !== undefined) {

               $http.get('/users/' + mentorId.toString()).success(function(mentorData){
     
                  if (mentorData !== undefined) {
                     if (mentorData.data[0] !== undefined) {
                        if (mentorData.data[0].userFirstName !== undefined) {
                
                           var mentorName = mentorData.data[0].userFirstName;
                    
                           var fieldName = 'moduleMentor' + ((mentorIndex + 1).toString());
                         
                           $scope.modulesData[modulesIndex][fieldName] = mentorName;
                        }
                     }
                  }
               });
            }
         });

      });

   }).error(function(error){
      console.log(error)
   });


   $scope.module = {};
   $scope.editInfo = function(info) {
    $scope.module = info
   };

   $scope.updateInfo = function(info) {

    $http.post('modules/edit/' + info.moduleId, {

      "moduleName"    : info.moduleName,
      "moduleMentor1" : info.moduleMentor1,
      "moduleMentor2" : info.moduleMentor2

    }).success(function(data){

          console.log(info);
         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')
      }).error(function(error){
         console.log(error);
      })
   }
  $scope.module = {};
  $scope.deleteInfo = function(info){
    $scope.module = info;
    console.log(info)
    }

   $scope.delModule = function(module){
      console.log(module); // ID
      // if (confirm('This Module will be deleted')){

         $http.delete('/modules/delete/'+ module).success(function(data){
          
            console.log('success');
            $(".modal-backdrop").fadeOut();
            $route.reload();
         }).error(function(error){
          $(".modal-backdrop").fadeOut();
          console.log(error)})
      // }

   };
   // $scope.delModule = function(module){
   //    console.log(module); // ID

   //       $http.delete('/modules/delete/'+ module).then(function(response){
   //        // console.log('yes, it is done')
   //        console.log(response.data)

   //       },function(error){
   //        console.log('something went wrong')
   //       })


   // };

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
}]);









app.controller('announcementCtr', ['$scope', '$http','$route','$routeParams', function($scope,$http,$route,$routeParams){
   $http.get('/announce').success(function(data){
      // console.log(data)
      $scope.announcementData = data;
      var newData = data.reverse();
      $scope.oneAnncouncementData  = newData[0]
   }).error(function(error){
      console.log(error)
   });
   $scope.insertAnnouncement = function(info) {
      console.log(info)
      $http.post('/announce/add', {
         announcementTitle : info.announcementTitle,
         announcementDesc : info.announcementDesc,
         announcementDate : info.announcementDate

      }).success(function(data){

          console.log(info);
         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')
      }).error(function(error){
         console.log(error);
      })
   };
    
    $scope.announce = {};
    $scope.deleteInfo = function(info){
    $scope.announce = info;
    console.log(info)
    }
   $scope.delAnncounce = function(oneAnncouncement){
//      if (confirm('This anncouncement will be deleted')){

         $http.delete('/announce/delete/'+ oneAnncouncement).success(function(data){

            console.log('success');
            $(".modal-backdrop").fadeOut();
            $route.reload();
         }).error(function(error){console.log(error)})
//      }

   };

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
}]);



app.controller('singleAnnouncementCtr', ['$scope', '$http','$location','$route','$routeParams', function($scope,$http,$location,$route,$routeParams){

   $http.get('/announce/' + $routeParams.id).success(function(response) {
      $scope.announcementData = response.data;
      console.log(response.data)
      }).error(function(error){
      console.log(error)
      });


   $scope.editInfo = function(info){

   $scope.user = info;
   }

   $scope.UpdateInfo = function(info){

      $http.post('/announce/edit/'+$routeParams.id,{

         announcementTitle : info.announcementTitle,
         announcementDesc : info.announcementDesc,
         announcementDate : info.announcementDate

      }).success(function(data){

         $(".modal-backdrop").fadeOut();
         $route.reload();
         console.log('sucsess')

      }).error(function(error){console.log(error)});
   }

}]);
