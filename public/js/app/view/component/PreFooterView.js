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
        portfolioModel: 'inject',

        $tweet:"",

        initialize: function() {
            this.$el.css({display:'none'});
            this.$el.addClass("container");

            this.listenTo(this.randomPortfolioModel, "change:randomPortfolio", this.render);
            //this.render();
        },

        events: {
            'click #random-projects li a'  : '_onRequestPortfolioItem'
        },

        _onRequestPortfolioItem: function(e){
             e.preventDefault();
             var state = $(e.target).attr('href');
             var data = $(e.target).attr('data');
             this.portfolioModel.set({selected:{data:data}} );
             this.njs.request(state);
        },

        render: function() {
            this.$el.html(template(this.randomPortfolioModel.toJSON()));
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