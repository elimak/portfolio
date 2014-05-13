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
    var PortfolioDataResponder = BaseResponder.extend({

        navigatorBehaviors: ["IHasStateValidationOptionalAsync"/*, "IHasStateRedirection"*/],

        njs: 'inject',
        portfolioService: 'inject',
        portfolioCollection: 'inject',
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

            this.portfolioService.off("complete", this.onPreparedValidation);
            this.portfolioService.once("complete", this.onPreparedValidation);
            this.portfolioService.load("data/projects_overview.json");
        },

        onPreparedValidation: function() {
            if(this.callOnPrepared !== null)
                this.callOnPrepared();
            this.callOnPrepared = null;
        },

        validate: function(truncatedState, fullState) {
            return this.portfolioCollection.size() > 0 || fullState == States.NOT_FOUND;
        },

        redirect: function(truncatedState, fullState) {
            return States.NOT_FOUND;
        }
    });

    return PortfolioDataResponder;
});