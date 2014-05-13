/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
define([
], function () {
    var OnRefreshRandomPortfolioCommand = Backbone.Command.extend({

        njs: 'inject',
        portfolioCollection: 'inject',
        randomPortfolioModel: 'inject',

        execute:function () {

            if( this.portfolioCollection.models === null ) return;

            this.randomPortfolioModel.set({
                randomPortfolio: _.shuffle(this.portfolioCollection.models).slice(0,2)
            });

            console.log(this.randomPortfolioModel.toJSON());
        }
    });

    return OnRefreshRandomPortfolioCommand;
});