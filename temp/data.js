angular.module('myApp').factory('myProjects', function () {

    var featuredProjects = [
        {
            "heading": "California Mutual Insurance Company",
            "subHeading": "",
            "description": "",
            "featuredAsset": "assets/featured-cal-mutual.jpg",
            "featuredAssetPosition": "left",
            "problem": {
                "description": "",
                "asset": "",
                "assetType": ""
            },
            "solution": {
                "description": "",
                "asset": "",
                "assetType": ""
            },
            "process": {
                "description": "",
                "asset": "",
                "assetType": ""
            },
            "outcome": {
                "description": "",
                "asset": "",
                "assetType": ""
            }
        },
        {
            "heading": "Monterey County Child Abuse Prevention Council",
            "subHeading": "",
            "description": "",
            "featuredAsset": "assets/featured-capc.jpg",
            "featuredAssetPosition": "center"
        },
        {
            "heading": "Salinas Valley Ag Tech Summit",
            "subHeading": "",
            "description": "",
            "featuredAsset": "assets/featured-svats.jpg",
            "featuredAssetPosition": "center"
        },
        {
            "heading": "Olive Hill Greenhouses",
            "subHeading": "",
            "description": "",
            "featuredAsset": "assets/featured-ohg.jpg",
            "featuredAssetPosition": "right"
        }
    ]

    return featuredProjects;

});


angular.module('myApp').factory('myLinks', function () {

    var getConnected = [
        {
            "title": "Dribbble",
            "icon": "ico-dribbble.svg",
            "link": "https://dribbble.com/chrissandor"
        },
        {
            "title": "LinkedIn",
            "icon": "ico-linkedin.svg",
            "link": "https://www.linkedin.com/in/chrissandor/"
        },
        {
            "title": "Resume",
            "icon": "ico-resume.svg",
            "link": "https://drive.google.com/file/d/1NtBQtozi8-bdZQP62YGal4QiEc6Am0uZ/view?usp=drive_link"
        }
    ]

    return getConnected;

});