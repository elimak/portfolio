/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 5:58 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'hbs!templates/component/HeaderView'
], function (template) {
    var HeaderView = Backbone.View.extend({

        navigatorBehaviors: ["IHasStateTransition"],

        className: 'headerView',

        njs: 'inject',

        initialize: function() {
            this.$el.css({display:'none'});
            this.render();
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

    return HeaderView;
});