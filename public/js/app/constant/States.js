define([
	//'navigator-js'
], function () {

	var States = {};
     States.ROOT = new navigatorjs.NavigationState("");

	States.HOME = States.ROOT.clone().append("home");
	States.PORTFOLIO = States.ROOT.clone().append("portfolio");
	States.RESUME = States.ROOT.clone().append("resume");
	States.CONTACT = States.ROOT.clone().append("contact");
	States.PORTFOLIO_POST = States.ROOT.clone().append("portfolio/post/*");
	States.PORTFOLIO_FILTERED = States.ROOT.clone().append("portfolio/filtered/*");
	States.NOT_FOUND = States.ROOT.clone().append("page-not-found");


	var allStates = [],
		allPaths = [],
		state;
	for (state in States) {
		allStates.push(States[state]);
		allPaths.push(States[state].getPath());
	}

	States.ALL = {};
	States.ALL.STATES = allStates;
	States.ALL.PATHS = allPaths;

	return States;
});