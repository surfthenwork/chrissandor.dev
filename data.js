angular.module('myApp').factory('myData', function () {
    
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