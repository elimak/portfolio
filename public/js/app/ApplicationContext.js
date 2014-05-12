/**
 * Created with JetBrains WebStorm.
 * User: elimak
 * Date: 5/10/14
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    //VIEWS
    'view/AppView',
    'view/HomeView',
    'view/PortfolioView',
    'view/ResumeView',
    'view/ContactView',

    //components
    'view/component/HeaderView',
    'view/component/TitleHomeView',
    'view/component/TitleView',
    'view/component/FooterView',

    //MODELS
    'model/PortfolioCollection',
    'model/PortfolioItemModel',
    'model/PortfolioModel',

    //Services

    //COMMANDS
    'command/OnChangeUpdateFilteredPortfolioCommand',

    // constant
    'constant/States',

    'util/isDebug'
], function(
    //VIEWS
    AppView,
    HomeView,
    PortfolioView,
    ResumeView,
    ContactView,

    // components
    HeaderView,
    TitleHomeView,
    TitleView,
    FooterView,

    //MODELS
    PortfolioCollection,
    PortfolioItemModel,
    PortfolioModel,

    //Services

    //COMMANDS
    OnChangeUpdateFilteredPortfolioCommand,

    //
    States,

    isDebug
    ) {

    var ApplicationContext = Backbone.CommandRouter.extend({

        $el: null,

        njs: null, //navigatorjs.Navigator
        stateViewMap: null, //navigatorjs.integration.StateViewMap
        stateCommandMap: null, //navigatorjs.integration.StateCommandMap
        stateUrlSyncer: null, //new navigatorjs.integration.StateUrlSyncer

        routes: {
            "": ""
        },

        initialize: function(options) {
            this.$el = options.$el;

            this.initializeNavigator();
            this.mapModels();
            this.mapServices();
            this.mapStates();
            this.bindCommands();

            if(isDebug) {
                this.addDebug();
            }

            var urlState = this.stateUrlSyncer.getUrlState();

            this.njs.start(urlState.equals('') ? 'home' : urlState);
        },

        initializeNavigator: function() {
            this.njs = new navigatorjs.Navigator();
            this.stateViewMap = new navigatorjs.integration.StateViewMap(this.njs, this.$el);
            this.stateCommandMap = new navigatorjs.integration.StateCommandMap(this.njs, this.injector);
            /** TMP, SHOULD MOVE INSIDE NAVIGATORJS */
            this.stateUrlSyncer = new navigatorjs.integration.StateUrlSyncer(this.njs);
            this.stateUrlSyncer.usePushState();
            this.stateUrlSyncer.start();
            /** END TMP */
            this.injector.map("njs").toValue(this.njs);
        },

        mapModels: function() {
            this.injector.map('portfolioCollection').toSingleton(PortfolioCollection);
            this.injector.map('portfolioModel').toSingleton(PortfolioModel);
        },

        mapServices: function() {
           // this.injector.map('myService').toSingleton(MyService);
        },

        mapStates: function() {

           var appRecipe = this.stateViewMap.mapState(States.ALL.STATES).toView(AppView).withArguments({injector:this.injector});

            this.stateViewMap.mapState(States.HOME).toView(HomeView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#content");
            this.stateViewMap.mapState(States.HOME).toView(TitleHomeView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#title");

            this.stateViewMap.mapState(States.PORTFOLIO).toView(PortfolioView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#content");
            this.stateViewMap.mapState(States.RESUME).toView(ResumeView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#content");
            this.stateViewMap.mapState(States.CONTACT).toView(ContactView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#content");
            this.stateViewMap.mapState([States.PORTFOLIO,States.RESUME,States.CONTACT] ).toView(TitleView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#title");

            this.stateViewMap.mapState(States.ALL.STATES).toView(HeaderView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#header");
            this.stateViewMap.mapState(States.ALL.STATES).toView(FooterView).withArguments({injector:this.injector}).withParent(appRecipe).inside("#footer");

            //TODO APP
            /*
            var todoStates = ["todo", "todo/active", "todo/completed", "todo/edit/*", "todo/active/edit/*", "todo/completed/edit/*"],
                todoRecipe = this.stateViewMap.mapState(todoStates).toView(TodoAppView).withArguments({injector:this.injector});

            this.stateViewMap.mapState(todoStates).toView(HeaderView).withArguments({injector:this.injector}).withParent(todoRecipe).inside("#todoapp");
            this.stateViewMap.mapState(todoStates).toView(TodoListView).withArguments({injector:this.injector}).withParent(todoRecipe).inside("#todoapp");
            this.stateViewMap.mapState(todoStates).toView(FooterView).withArguments({injector:this.injector}).withParent(todoRecipe).inside("#todoapp");
            this.stateViewMap.mapState(todoStates).toView(InfoView).withArguments({injector:this.injector}).withParent(todoRecipe);
            */
        },

        bindCommands: function() {
           /* this.bindCommand(this.injector.getInstance('todoCollection'), "change reset add remove", OnChangeUpdateFilteredTodosCommand);
            this.bindCommand(this.injector.getInstance('todosModel'), "change:filter", OnChangeUpdateFilteredTodosCommand);

            this.bindCommand(this.injector.getInstance('todoCollection'), "change:completed reset add remove", OnChangeUpdateTodoStatsCommand);
            this.bindCommand(this.injector.getInstance('todoCollection'), "change:editing", OnEditingTodoChangedUpdateActiveTodoCommand);

            this.bindCommand(this.injector.getInstance('todosModel'), "change:activeTodo", OnChangeActiveTodoUpdateURLCommand);

            this.bindCommand(this.injector.getInstance('saveTodoService'), "complete", OnSaveTodoServiceCompleteCommand);    */
        },

        addDebug: function() {
            var debugConsole = new navigatorjs.features.DebugConsole(this.njs),
                $debugConsole = debugConsole.get$El(),
                cssPosition = {position: 'fixed', left: 10, bottom: 10};

            $debugConsole.css(cssPosition).appendTo('body');

            var stats = new Stats();

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.right = '10px';
            stats.domElement.style.top = '10px';

            document.body.appendChild( stats.domElement );

            setInterval( function () {
                stats.update();
            }, 1000 / 60 );
        }
    });

    return ApplicationContext;
});