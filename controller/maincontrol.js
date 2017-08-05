var app = angular.module("arthatic", []); 


app.controller("logincontrol", function($scope, $http, $window, $document) {
    $scope.usrname = function(){
        var url = __env.apiUrl + "/users/login";
        $http({
            method : "POST",
            url : url,
            data: {
                "username": $scope.username,
                "pass": $scope.pass
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function mySuccess(response) {
            $scope.usrData = response.data;

            //console.log(response.data.data);
            localStorage.setItem('sessions', JSON.stringify($scope.usrData.data));

           $window.location.href = "/myprofile";
        }, function myError(err) {
            $scope.usrData = err.statusText;
            console.log(err);
        });
    };
});


app.controller("myProfilecontrol", function($scope, $http, $window, $document) {

    $scope.logout = function(){
        logout_func($scope, $http, $window, usrData);
    }

    var url = __env.apiUrl + "/users/myProfile";

    var usrData = localStorage.getItem('sessions');

    if(!usrData){
          $window.location.href = "/login";
    }
    else{

        usrData = JSON.parse(usrData);

        $http({
            method : "POST",
            url : url,
            data: {
                "loginToken": usrData.loginToken,
            },
            method : "POST",
            url : url,
            "basic": {
                "firstName": $scope.firstname,
                "middleName": $scope.middlename,
                "lastName": $scope.lastname,
                "DOB": $scope.dob,
                "TOB": $scope.tob,
                "complex": $scope.complex,
                "disablity": $scope.disablity,
                "gender": $scope.gender,
                "aboutMe": $scope.aboutme,
                "height": $scope.height,
                "maritialStatus": $scope.martialstatus,
                "belongsToCountry": $scope.,
                "belongsToState": ,
                "belongsToCity": ,
                "currentToCountry": ,
                "currentToState": ,
                "currentToCity": ,
                "profileManagedBy": ,
                "languageknown": [
                    "hindi",
                    "english"
                ]
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function mySuccess(response) {

            $scope.myWelcome = response.data;
            console.log(response.data);
            // $window.location.href = "/myprofile";
        }, function myError(err) {
            
            $scope.myWelcome = err.statusText;
            console.log(err);
        });
    } 
    
    
});


function logout_func ($scope, $http, $window, usrData){
     var url = __env.apiUrl + "/users/logout";
        $http({
            method : "POST",
            url : url,
            data: {
                "username": usrData.username,
                "loginToken": usrData.loginToken
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function mySuccess(response) {

            $scope.myWelcome = response.data;
            //console.log(response.data.data);
            localStorage.removeItem('sessions');
            $window.location.href = "/login";
        }, function myError(err) {

            $scope.myWelcome = err.statusText;
            console.log(err);
        });
}

function register_func ($scope, $http, $window){
    
}