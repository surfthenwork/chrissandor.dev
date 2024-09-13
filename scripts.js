var app = angular.module("myApp", ['ngSanitize']);

// Directive to rotate text with fade effect
app.directive('rotateText', ['$interval', function ($interval) {
    return function (scope, element) {
        const wordArr = ['Husband', 'Father', 'Learner', 'Surfer', 'Skateboarder', 'Angler'];
        let i = 0;

        function updateWord() {
            element.removeClass('reveal'); // Fade out current word
            setTimeout(() => {
                i = (i + 1) % wordArr.length;
                element.text(wordArr[i]).addClass('reveal'); // Update word and fade in
            }, 1000);  // Sync with fade-out duration
        }

        // Initialize with the first word and start rotation
        element.text(wordArr[0]).addClass('reveal');
        const stopWord = $interval(updateWord, 4000);

        // Cancel interval on element destroy
        element.on('$destroy', () => $interval.cancel(stopWord));
    };
}]);

app.controller("myCtrl", ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.pageTitle = document.title;

    // Preload images
    function preload(...images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    preload(
        "./assets/featured-jmt.png",
        "./assets/featured-drac.png",
        "./assets/featured-hsi.png",
        "./assets/featured-br.png"
    );

    // Load featured projects and handle trusted HTML snippets
    $http.get('./data/featuredProjects.json').then(res => {
        $scope.featuredProjects = res.data;
        $scope.trustedSnippet = () => $sce.trustAsHtml($scope.featuredProjects);
    });

    // Pagination logic
    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.data = Array.from({ length: 8 }, (_, i) => `Item ${i}`);
    $scope.numberOfPages = () => Math.ceil($scope.data.length / $scope.pageSize);

    // Load additional data (about details, footer icons)
    $http.get('./data/aboutDetails.json').then(res => $scope.aboutDetails = res.data);
    $http.get('./data/footerIcons.json').then(res => $scope.footerIcons = res.data);
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
document.getElementById('copyright').textContent = new Date().getFullYear();