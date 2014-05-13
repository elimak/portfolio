define([

], function () {
	var BaseResponder = function(options) {
		this._configure(options);
		this.initialize(options);
	};

	_.extend(BaseResponder.prototype, {
		_configure: function(options) {
			if(options.injector!=undefined) {
				options.injector.injectInto(this);
			}
		},

		initialize: function(options) {}
	});

	BaseResponder.extend = Backbone.Router.extend;

	return BaseResponder;
});