/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:52 PM
 * To change this template use File | Settings | File Templates.
 */
define([

], function () {
    var PortfolioModel = Backbone.Model.extend({
        defaults: {
            filteredPortfolio: null, // []
            randomPortfolio: null, // []
            filter: 'all', //all, programming, techlead, prototyping, content, ux, pm
            selected: null
        },

        initialize: function() {
            this.set({
                filteredPortfolio: [] ,
                randomPortfolio: []
            });
        }
    });

    return PortfolioModel;
});