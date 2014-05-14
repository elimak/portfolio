/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
define([
], function () {
    var OnLoadedPortfolioPostCommand = Backbone.Command.extend({

        njs: 'inject',
        portfolioPostService: 'inject',
        portfolioPostModel: 'inject',

        execute:function () {

            if( this.portfolioPostService.get("data") === null ) return;

            this.portfolioPostModel.reset();
            this.portfolioPostModel.parse(this.portfolioPostService.get("data"));
        }
    });

    return OnLoadedPortfolioPostCommand;
});