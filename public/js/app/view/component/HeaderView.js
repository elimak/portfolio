/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 5:58 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'hbs!templates/component/HeaderView',
    'constant/States',
], function (template, States) {
    var HeaderView = Backbone.View.extend({

        navigatorBehaviors: ["IHasStateTransition"],

        className: 'headerView',

        njs: 'inject',

        initialize: function() {
            this.$el.css({display:'none'});
            this.render();
        },

        events: {
            'click .logo_def'       : 'onRequestNavigation' ,
            'click .logo_retina'    : 'onRequestNavigation' ,
            'click #menu_home'      : 'onRequestNavigation' ,
            'click #menu_portfolio' : 'onRequestNavigation' ,
            'click #menu_resume'    : 'onRequestNavigation' ,
            'click #menu_contact'   : 'onRequestNavigation'
        },

        onRequestNavigation: function(e){
            e.preventDefault();
            var state = $(e.target).attr('href');

            _.each([$( "#menu_home" ), $( "#menu_portfolio" ), $( "#menu_resume" ), $( "#menu_contact" )],
                    function(element){
                        element.removeClass("current-menu-parent");
                    });

            switch(state){
                case States.HOME.getLastSegment():
                    $( "#menu_home" ).addClass( "current-menu-parent" );
                    break;
                case States.PORTFOLIO.getLastSegment():
                    $( "#menu_portfolio" ).addClass( "current-menu-parent" );
                    break;
                case States.RESUME.getLastSegment():
                    $( "#menu_resume" ).addClass( "current-menu-parent" );
                    break;
                case States.CONTACT.getLastSegment():
                    $( "#menu_contact" ).addClass( "current-menu-parent" );
                    break;
            }

            this.njs.request(state);
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