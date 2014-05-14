/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 5:58 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'hbs!templates/component/HeaderView',
    'constant/States'
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
            'click .logo_def'               : '_onRequestNavigation' ,
            'click .logo_retina'            : '_onRequestNavigation' ,
            'click #mobile_menu_home'       : '_onRequestNavigationMobile' ,
            'click #mobile_menu_portfolio'  : '_onRequestNavigationMobile' ,
            'click #mobile_menu_resume'     : '_onRequestNavigationMobile' ,
            'click #mobile_menu_contact'    : '_onRequestNavigationMobile' ,
            'click #menu_home'      : '_onRequestNavigation' ,
            'click #menu_portfolio' : '_onRequestNavigation' ,
            'click #menu_resume'    : '_onRequestNavigation' ,
            'click #menu_contact'   : '_onRequestNavigation',
            'click .menu_toggler'   : '_onSlideMobileMenu'
        },

        _onSlideMobileMenu: function(){
            $( ".mobile_menu_wrapper" ).slideToggle(300);
        },

        _onRequestNavigationMobile: function(e){
            e.preventDefault();
            $( ".mobile_menu_wrapper" ).slideToggle(300);
            this._onRequestNavigation(e);
        },

        _onRequestNavigation: function(e){
            e.preventDefault();
            var state = $(e.target).attr('href');

            this._updateActiveMenu(state);
            this.njs.request(state);
        },

        _updateActiveMenu: function(state){

            _.each([$( "#menu_home" ), $( "#menu_portfolio" ), $( "#menu_resume" ), $( "#menu_contact" )],
                function(element){
                    element.removeClass("current-menu-parent");
                });

            console.log(States.HOME.getLastSegment() +" // "+ state);

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
        },

        render: function() {

            this.$el.html(template({}));
            return this;
        },

        transitionIn: function(callOnComplete) {
            this.$el.css({display:''});
            TweenLite.fromTo(this.$el, 0.5, {alpha:0}, {alpha:1, onComplete:callOnComplete});
            var state =  this.njs.getCurrentState().getLastSegment()? this.njs.getCurrentState().getLastSegment() : "home";
            this._updateActiveMenu(state);
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