/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/12/14
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'responder/BaseResponder',
    'constant/States'
], function (BaseResponder, States) {
    var PortfolioPostDataResponder = BaseResponder.extend({

        navigatorBehaviors: ["IHasStateValidationOptionalAsync"/*, "IHasStateRedirection"*/],

        njs: 'inject',
        portfolioPostService: 'inject',
        portfolioPostModel: 'inject',
        portfolioModel: 'inject',
        callOnPrepared: null,

        initialize: function() {
            _.bindAll(this, 'willValidate', 'prepareValidation', 'onPreparedValidation', 'validate');
        },

        willValidate: function(truncatedState, fullState) {
            return true;  // not sure we need to do a pre validation here
        },

        prepareValidation: function(truncatedState, fullState, callOnPrepared) {
            if (this.validate(truncatedState, fullState)) {
                callOnPrepared();
                return;
            }

            this.callOnPrepared = callOnPrepared;

            this.portfolioPostService.off("complete", this.onPreparedValidation);
            this.portfolioPostService.once("complete", this.onPreparedValidation);
            var selectedModel = this.portfolioModel.get('selected');
            this.portfolioPostService.load(selectedModel.data);
        },

        onPreparedValidation: function() {
            if(this.callOnPrepared !== null)
                this.callOnPrepared();
            this.callOnPrepared = null;
        },

        validate: function(truncatedState, fullState) {
            var selectedModel = this.portfolioModel.get('selected');
            return selectedModel.data ==  this.portfolioPostModel.get("data");
        },

        redirect: function(truncatedState, fullState) {
            return States.NOT_FOUND;
        }
    });

    return PortfolioPostDataResponder;
});