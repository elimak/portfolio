/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/12/14
 * Time: 4:24 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'service/BaseService'
], function (BaseService) {
    var PortfolioPostService = BaseService.extend({

        load: function(data_url) {
            return this._super(data_url, "GET");
        }
    });

    return PortfolioPostService;
});