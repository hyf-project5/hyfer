var app = angular.module('sms_app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        //login page
        //.when("/", {templateUrl: "views/login.html", controller: "loginCtrl"})
    
        .when("/users", {templateUrl: "views/users.html", controller: "usersCtrl"})
        .when("/classes", {templateUrl: "views/classes.html", controller: "classesCtrl"})
        .when("/report", {templateUrl: "views/report.html", controller: "reportCtrl"})
        .when("/student:ID", {templateUrl: "views/student.html", controller: "studentCtrl"})
        .when("/mentor:ID", {templateUrl: "views/mentor.html", controller: "mentorCtrl"})

        //page not found 404
        //.otherwise("/404", {templateUrl: "views/404.html", controller: "404Ctrl"});

}]);


app.controller('ctrl', ['$scope','$filter','$location', '$http','$log', function($scope,$filter,$location, $http,$log){
	$scope.test ="test test test test 123123123";
}]);







/*var sms_app = angular.module('sms_app', ['ngRoute']);*/
//app.directive('allUsers',allUsers);
//app.directive('oneUser',oneUser)
app.controller('mainController', ['$scope', '$http', function($scope,$http){

   $http.get('/users').success(function(data){
        
      //console.log(data);
      //$scope.test=data[0].name;
      $scope.usersData = data;
      //console.log(data[0].id);
      //$scope.editId=""
      //$scope.editIdLink="/users/edit/"+usersData[0].userId;
   }).error(function(error){
      console.log(error)
   })

}]);

/*app.controller('userController', ['$scope', '$http','$location','$routeParams',function($scope, $http, $location, $routeParams){
   
   $http.get('/users').then(function(response){
         
      console.log(response.data[0].userFirstName);
      $scope.usersData = response.data;
      $scope.single = $routeParams.oneuser;
      
   }, function(error){console.log(error)}) 
}]);*/

/*app.controller('delController', ['$scope', '$http','$log','$routeParams', function($scope, $http,$log,$routeParams){
	$http({
		url:"users/delete",
		params:{id:$routeParams.id},
		method:"delete"
	})
	.then(function(response){
		$scope.usersData = response.data;
	})
}]);*/