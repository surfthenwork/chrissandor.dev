var app = angular.module("myApp", ['ngSanitize']);

app.controller("myCtrl", ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.pageTitle = document.title;

    const container = document.querySelector('header .container');
    const updateViewportElements = () => {
        container.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', updateViewportElements);
    updateViewportElements();

    // Preload images
    function preload(...images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    preload(
        "./img/drac-01.png",
        "./img/capc-03.png",
        "./img/ohg-01.png",
        "./img/br-01.png"
    );

    // Load featured projects and handle trusted HTML snippets
    $http.get('./data/projects.json').then(res => {
        $scope.projects = res.data;
        $scope.trustedSnippet = () => $sce.trustAsHtml($scope.projects);
    });

    // Pagination logic
    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.data = Array.from({ length: 8 }, (_, i) => `Item ${i}`);
    $scope.numberOfPages = () => Math.ceil($scope.data.length / $scope.pageSize);

    // Load additional data (about, icons)
    $http.get('./data/about.json').then(res => $scope.about = res.data);
    $http.get('./data/icons.json').then(res => $scope.icons = res.data);
}]);

// Initialize tooltips using Bootstrap
const tooltipList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .map(el => new bootstrap.Tooltip(el));

// Tooltip directive for dynamic elements
app.directive('bsTooltip', function () {
    return {
        restrict: 'A',
        link: (scope, element) => {
            $(element).hover(
                () => $(element).tooltip('show'),
                () => $(element).tooltip('hide')
            );
        }
    };
});

// Pagination filter
app.filter('startFrom', () => (input, start) => input.slice(+start));

// Scroll to top logic
let upArrow = document.getElementById("top");

window.onscroll = () => scrollFunction();

function scrollFunction() {
    const nav = document.getElementById("nav");
    const currentScrollPos = window.pageYOffset;

    // Show/hide navigation based on scroll position
    if (currentScrollPos > 80) {
        upArrow.style.display = "flex";
        nav.classList.add("scroll");
        nav.style.top = currentScrollPos > window.prevScrollPos ? "-80px" : "0px";
    } else {
        nav.classList.remove("scroll");
        upArrow.style.display = "none";
    }
    window.prevScrollPos = currentScrollPos;
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Smooth scrolling for anchor links
$(document).ready(() => {
    $(document).on("scroll", onScroll);
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').removeClass('active');
        $(this).addClass('active');

        const target = this.hash;
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top + 2
        }, 500, 'swing', () => {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll() {
    const scrollPos = $(document).scrollTop() + 80;
    $('#menu-container a').each(function () {
        const currLink = $(this);
        const refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-container ul li a').removeClass("active");
            currLink.addClass("active");
        }
    });
}

// Update copyright year
//document.getElementById('copyright').textContent = new Date().getFullYear();