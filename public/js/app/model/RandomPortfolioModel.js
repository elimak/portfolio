/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/12/14
 * Time: 7:02 PM
 * To change this template use File | Settings | File Templates.
 */
define([

], function () {
    var RandomPortfolioModel = Backbone.Model.extend({
        defaults: {
            randomPortfolio: null, // []
            time: -1 //
        },

        initialize: function() {
            this.set({
                randomPortfolio: [] ,
                time:0
            });
        },

        startTimer: function(){
            this.set({time:(this.get("time")+1)});

            var that = this;
            setInterval(function(){
                that.set({time: that.get('time')+1 });
            }, 15000);
        }
    });

    return RandomPortfolioModel;
});