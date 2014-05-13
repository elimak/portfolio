/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/12/14
 * Time: 10:37 AM
 * To change this template use File | Settings | File Templates.
 */
define([
    'hbs!templates/component/PreFooterView',
    'constant/States'
], function (template, States) {
    var PreFooterView = Backbone.View.extend({

        navigatorBehaviors: ["IHasStateTransition"],

        className: 'preFooterView',

        njs: 'inject',
        randomPortfolioModel: 'inject',

        $tweet:"",

        initialize: function() {
            this.$el.css({display:'none'});
            this.$el.addClass("container");
            this.render();

           // this.listenTo(this.randomPortfolioModel, "change:randomPortfolio", this.render);
        },

        render: function() {
            console.log("rendering?");
            this.$el.html(template({}));
            return this;
        },

        transitionIn: function(callOnComplete) {

            this.$el.css({display:''});
            TweenLite.fromTo(this.$el, 0.5, {alpha:0}, {alpha:1, onComplete:callOnComplete});

            $tweet = $('.tweet_1057').tweet({
                modpath: 'twitter/',
                count: 4,
                username : 'elimak'
            });
        },

        transitionOut: function(callOnComplete) {
            TweenLite.to(this.$el, 0.5, {alpha:0});

            TweenLite.delayedCall(0.5, function() {
                this.$el.css({display:'none'});

                callOnComplete();
            }, null, this);
        }
    });

    return PreFooterView;
});