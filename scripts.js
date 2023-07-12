/* Place your JavaScript in this file */

var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) { // myProjects, myLinks

    // Featured Projects
    $http.get('./data/featuredProjects.json')
        .then(function (res) {
            $scope.featuredProjects = res.data;
        });

    // $scope.featuredProjects = myProjects; // data.js

    // Featured Projects Pagination
    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.data = [];
    $scope.numberOfPages = function () {
        return Math.ceil($scope.data.length / $scope.pageSize);
    }
    for (var i = 0; i < 8; i++) {
        $scope.data.push("Item " + i);
    }

    //var itemsPerPage = 4;
    //$scope.totalPages = Math.ceil($scope.featuredProjects.length / itemsPerPage);


    // Get Connected
    $http.get('./data/getConnected.json')
        .then(function (res) {
            $scope.getConnected = res.data;
        });

    // $scope.getConnected = myLinks; // data.js


    $scope.pageTitle = document.title;

});


// Pagination startFrom filter
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; // parse to int
        return input.slice(start);
    }
});


// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 80px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        mybutton.style.display = "block";
        nav.classList.add("box-shadow");
    } else {
        mybutton.style.display = "none";
        nav.classList.remove("box-shadow");
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop() + 80;
    $('#menu-container a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-container ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}