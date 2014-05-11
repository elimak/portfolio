/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'model/PortfolioItemModel'
], function (PortfolioItemModel) {
    var PortfolioCollection = Backbone.Collection.extend({
        model: PortfolioItemModel
    });

    return PortfolioCollection;
});