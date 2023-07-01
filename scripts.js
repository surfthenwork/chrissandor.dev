/* Place your JavaScript in this file */

var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, myData) {

    // Featured Projects (JSON)
    /*$http.get('data/featuredProjects.json')
        .then(function (res) {
            $scope.featuredProjects = res.data;
        });*/

    // Featured Projects
    $scope.featuredProjects = myData;

});