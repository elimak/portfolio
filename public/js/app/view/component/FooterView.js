/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/12/14
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */
define([
    'hbs!templates/component/FooterView',
    'constant/States'
], function (template, States) {
    var FooterView = Backbone.View.extend({

        navigatorBehaviors: ["IHasStateTransition"],

        className: 'footerView',

        njs: 'inject',

        initialize: function() {
            this.$el.css({display:'none'});
            this.$el.addClass("footer_line container");
            this.render();
        },

        events: {
            'click .btn2top' : '_onRequestScrollToTop'
        },

        _onRequestScrollToTop: function(e){
            e.preventDefault();
            $("html:not(:animated), body:not(:animated)").animate({ scrollTop: 0}, 500 );
        },

        render: function() {
            this.$el.html(template({}));
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

    return FooterView;
});