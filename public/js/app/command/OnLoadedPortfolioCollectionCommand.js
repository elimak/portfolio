/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
define([
], function () {
    var OnLoadedPortfolioCollectionCommand = Backbone.Command.extend({

        njs: 'inject',
        portfolioService: 'inject',
        portfolioCollection: 'inject',
        portfolioModel: 'inject',

        execute:function () {

            if( this.portfolioService.get("data") === null ) return;

            this.portfolioCollection.reset();

            for(var i=0; i <this.portfolioService.get("data").length; i++){
                this.portfolioCollection.add(this.portfolioService.get("data")[i]);
            }
           /*
            this.portfolioModel.set({
                randomPortfolio: _.shuffle(this.portfolioCollection.models).slice(0,2)
            });     */
        }
    });

    return OnLoadedPortfolioCollectionCommand;
});