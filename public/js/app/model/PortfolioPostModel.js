/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:52 PM
 * To change this template use File | Settings | File Templates.
 */
define([

], function () {
    var PortfolioPostModel = Backbone.Model.extend({
        defaults: {
            title: "The project's title",
            data: "the-path-to-data.json",
            year: 2012,
            duration: '4 months',
            people: 6,
            agile: true,
            by: {
                name: 'By Elimak',
                url: 'http://www.elimak.com'
            },
            for: {
                name: 'Client name',
                url: 'http://www.uis.unesco.org/'
            },
            slideshow:["img/portfolio/gender-unesco/pic8.jpg"],
            titleRole: 'Multitasking!',
            tasks:[
                'Produced the concept, the storyboards and the data analysis',
                'Managed the project\'s communications and my team from A to Z'
            ],
            softwareDev:{
                programming : true,
                techDesign : true,
                techLead : true
            },
            designManagement:{
                prototyping : true,
                content : true,
                ux : true,
                pm : true
            },
            platform:{
                internetIntranet : true,
                docAnalysis : true,
                mobileTablets : true
            },
            projectDescription :[
                'The project was made by Elimak (my company) for Unesco, institute for Statistics',
                'The concept phase included an extended analysis on the data coverage and relevancy'
            ],
            team:[
                'Project manager + concept + programing: myself',
                'Visual designer / animator: Thijs Geritz'
            ],
            video:{
                url: "http://www.youtube.com/embed/PyPcdVOZc7c?controls=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=opaque",
                width:560,
                height:380
            },
            tags:[
                'User Experience',
                'Mobile'
            ]
        },

        initialize: function() {

        }
    });

    return PortfolioPostModel;
});
