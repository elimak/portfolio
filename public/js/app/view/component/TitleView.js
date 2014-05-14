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

            this.njs.on(navigatorjs.NavigatorEvent.STATE_CHANGED,_.bind(this._onNavigationChanged, this));
        },

        events: {
            'click .breadcrumbs' : '_onRequestNavigation'
        },

        _onRequestNavigation: function(e){
            e.preventDefault();
            var state = $(e.target).attr('href');

            this.njs.request(state);
        },

        _onNavigationChanged: function(){

            var currentStateFullPath = this.njs.getCurrentState().getPath();

            if(this.njs.getCurrentState() == States.HOME) return;

            var section;

            switch (true){
                case currentStateFullPath.toLowerCase().search("portfolio") > -1 : section= "Portfolio"; break;
                case currentStateFullPath.toLowerCase().search("contact") > -1 : section= "Contact"; break;
                case currentStateFullPath.toLowerCase().search("resume") > -1 : section= "Resume"; break;
            }

            var $title =  this.$el.find('.container .title');
            $title.html(section);
            $title.css({display:''});
            TweenLite.fromTo($title, 0.5, {alpha:0}, {alpha:1});
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