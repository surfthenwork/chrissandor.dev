var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {

    $scope.pageTitle = document.title;

    // Preload Featured Projects
    var projectImg = new Array()
    function preload() {
        for (i = 0; i < preload.arguments.length; i++) {
            projectImg[i] = new Image()
            projectImg[i].src = preload.arguments[i]
        }
    }
    preload( // Preload paginated items
        "./assets/featured-jmt.png",
        "./assets/featured-drac.png",
        "./assets/featured-hsi.png",
        "./assets/featured-br.png"
    )

    // Featured Projects
    $http.get('./data/featuredProjects.json')
        .then(function (res) {
            $scope.featuredProjects = res.data;
        });

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

    // About Details
    $http.get('./data/aboutDetails.json')
        .then(function (res) {
            $scope.aboutDetails = res.data;
        });

    // Footer Icons
    $http.get('./data/footerIcons.json')
        .then(function (res) {
            $scope.footerIcons = res.data;
        });

});


// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Tooltip directive for ng-repeat
app.directive('bsTooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).hover(function () {
                // on mouseenter
                $(element).tooltip('show');
            }, function () {
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

// Featured Projects Pagination startFrom filter
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; // parse to int
        return input.slice(start);
    }
});

// Get the scroll to top button:
let upArrow = document.getElementById("top");

// When the user scrolls down 80px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        upArrow.style.display = "flex"; 
        //upArrow.style.display = "none"; //turned off button
        nav.classList.add("box-shadow");
    } else {
        upArrow.style.display = "none";
        nav.classList.remove("box-shadow");
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$(document).ready(function () {
    $(document).on("scroll", onScroll);
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

// Get current year
document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));

//ScrollReveal().reveal('.about-details .grid .item', { interval: 200 });