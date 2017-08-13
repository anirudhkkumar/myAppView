var app = angular.module("arthatic", []); 


app.controller("logincontrol", function($scope, $http, $window, $document) {
    $scope.usrname = function(){
        var url = __env.apiUrl + "/users/login";
       
        if($scope.username && $scope.pass && $('#g-recaptcha-response').val()){
             $scope.loader = true;

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

                $scope.loader = false;

               $window.location.href = "/myprofile.html";
            }, function myError(err) {
                $scope.loader = false;
                $scope.error = true;
                 console.log(err.data.displayMsg);
                 if(err.data && err.data.displayMsg){
                    $scope.errorLevel = err.data.displayMsg
                 }
                 else{
                    $scope.errorLevel = err.data[0].message || err.statusText;
                 }
            });

        }
        else{
            alert("Please enter correct required fields and Recaptcha");
        }       
    };
});

app.controller("myProfilecontrol", function($scope, $http, $window, $document) {

    $scope.logout = function(){
        logout_func($scope, $http, $window, usrData);
    }

    var url = __env.apiUrl + "/users/myProfile";

    var usrData = localStorage.getItem('sessions');

    if(!usrData){
          $window.location.href = "/login.html";
    }
    else{
        usrData = JSON.parse(usrData);

        $http({
            method : "POST",
            url : url,
            data: {
                "profId": usrData.profId,
                "loginToken": usrData.loginToken
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function mySuccess(response) {

            var dob = response.data.data[0].basic.DOB;
            var currentdate = new Date();
            var dateTime = new Date(dob.split('/')[2], dob.split('/')[1], dob.split('/')[0]);

            var timeDiff = Math.abs(currentdate.getTime() - dateTime.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var age = (diffDays / 365).toString().split(".")[0];

            $scope.basic = response.data.data[0].basic;
            $scope.profileStatus = response.data.data[0].profileStatus;
            $scope.education = response.data.data[0].education;
            $scope.family = response.data.data[0].family;
            $scope.professional = response.data.data[0].professional;
            $scope.lifeStyle = response.data.data[0].lifeStyle;
            $scope.contact = response.data.data[0].contact;
            $scope.desiredPartner = response.data.data[0].desiredPartner;
            $scope.parnicYoga = response.data.data[0].parnicYoga;
            $scope.profileImage = response.data.data[0].profileImage;
            $scope.age = age;
            $scope.userid = response.data.data[0].userid;
            
        }, function myError(err) {
            
            $scope.myWelcome = err.statusText;
            console.log(err);
        });
    }   
});

app.controller("editProfilecontrol", function($scope, $http, $window, $document) {

    $scope.logout = function(){
        logout_func($scope, $http, $window, usrData);
    }

    var url = __env.apiUrl + "/users/myProfile";

    var usrData = localStorage.getItem('sessions');

    if(!usrData){
          $window.location.href = "/login.html";
    }
    else{
        usrData = JSON.parse(usrData);

        $http({
            method : "POST",
            url : url,
            data: {
                "profId": usrData.profId,
                "loginToken": usrData.loginToken
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function mySuccess(response) {

            $scope.myWelcome = response.data.data[0];
            console.log(response.data.data[0]);
            // $window.location.href = "/myprofile";
        }, function myError(err) {
            
            $scope.myWelcome = err.statusText;
            console.log(err);
        });
    }   
});

app.controller("registercontrol", function($scope, $http, $window, $document) {
    $scope.register = function(){
        var url = __env.apiUrl + "/users/register";

        console.log($scope.name, $scope.username, $scope.password , $scope.gender , $scope.dob ,$scope.mothertounge ,$scope.mobile , $scope.country, $('#g-recaptcha-response').val());
        if($scope.password != $scope.repassword){
            alert("password does not match with re-type-password");
        } else if($scope.name && $scope.username && $scope.password && $scope.gender && $scope.dob && $scope.mothertounge && $scope.mobile && $scope.country){

            var data = {
                "name": $scope.name,
                "username": $scope.username,
                "pass": $scope.password,
                "gender": $scope.gender,
                "dob": $scope.dob,
                "mothertounge": $scope.mothertounge,
                "mobile": $scope.mobile,
                "country": $scope.country
            };
            $http({
                method : "POST",
                url : url,
                data: data,
                headers: {'Content-Type': 'application/json'}
            }).then(function mySuccess(response) {
                $scope.usrData = response.data;

                console.log(response.data);

               $window.location.href = "/success.html";
            }, function myError(err) {
                $scope.usrData = err.statusText;
                console.log(err);
            });
        }
        else{
            alert("Please enter correct required fields");
        }
        
    };
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
            $window.location.href = "/login.html";
        }, function myError(err) {

            $scope.myWelcome = err.statusText;
            console.log(err);
        });
}

