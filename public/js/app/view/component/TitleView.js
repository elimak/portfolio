/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/11/14
 * Time: 12:41 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'hbs!templates/component/TitleView',
    'constant/States'
], function (template, States) {
    var TitleView = Backbone.View.extend({

        navigatorBehaviors: ["IHasStateTransition"],

        className: 'titleView',

        njs: 'inject',

        initialize: function() {
            this.$el.css({display:'none'});
            this.render();

            this.njs.on(navigatorjs.NavigatorEvent.STATE_CHANGED, this._onNavigationChanged);
        },

        _onNavigationChanged: function(){
            console.log("navigation changed "/*this.njs.getCurrentState().getLastSegment()*/);
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

    return TitleView;
});