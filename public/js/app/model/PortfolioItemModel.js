/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 5:02 PM
 * To change this template use File | Settings | File Templates.
 */
define([
], function () {
    var PortfolioItemModel = Backbone.Model.extend({
        defaults: {
            title: '',
            path: '',
            description: '',
            thumbnail: '',
            image: '',
            data: '',
            category: [],
            role: []
        },

        initialize: function() {
        }

    });

    return PortfolioItemModel;
});