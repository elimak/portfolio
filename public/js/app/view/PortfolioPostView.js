/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:52 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'hbs!templates/PortfolioPostView'
], function (template) {
    var PortfolioPostView = Backbone.View.extend({

        navigatorBehaviors: ["IHasStateTransition"],

        className: 'portfolioPostView',

        njs: 'inject',
        portfolioPostModel: 'inject',

        initialize: function() {
            this.$el.css({display:'none'});
            this.$el.addClass("content_block right-sidebar row");
            this.listenTo(this.portfolioPostModel, "change:post", this.render);
        },

        render: function() {
            this.$el.html(template(this.portfolioPostModel.get("post")));
            this.$el.find('#slider').nivoSlider({
                directionNavHide:false,
                effect:'fade',
                pauseTime:4000,
                slices: 1
            });
            return this;
        },

        transitionIn: function(callOnComplete) {
            this.$el.css({display:''});
            TweenLite.fromTo(this.$el, 0.5, {alpha:0}, {alpha:1, onComplete:callOnComplete});
        },

        transitionOut: function(callOnComplete) {
            TweenLite.to(this.$el, 0.5, {alpha:0});

            TweenLite.delayedCall(0.5, function() {
                this.$el.css({display:'none'});

                callOnComplete();
            }, null, this);
        }
    });

    return PortfolioPostView;
});