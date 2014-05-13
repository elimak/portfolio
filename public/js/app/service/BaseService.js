define([
	'constant/Paths'
], function (Paths) {
	var BaseService = Backbone.Model.extend({
		defaults: {
			path: '',
			loading: false,
			loaded: false,
			success: false,
			data: null
		},

		currentRequest: null,

		initialize: function() {
            _.bindAll(this, 'load', 'onSuccess', 'onError', 'reset' );
		},

		load: function(data_url, type) {
			this.reset();

			this.set({
				path: data_url,
				loading:true
			});

			this.trigger('start');
			
			this.currentRequest = $.ajax({
				type: type,
				dataType: 'json',
				url: data_url,
				success: this.onSuccess,
				error: this.onError
			});

			return this;
		},

		onSuccess: function(data, status) {

			this.set({
				loading: false,
				loaded: true,
				success: data.success,
				data: data
			});

			this.trigger('complete');
		},

		onError: function(response) {
			if(response.statusText=="abort") {	return;}

			this.onSuccess(response.responseText, 'error');
		},

		reset: function() {
			if(this.currentRequest!=null) {
				this.currentRequest.abort();
				this.currentRequest = null;
			}

			this.set({loading: false}, {silent:true});//No one needs to know when this comes forth out of a reset
			this.set({loaded: '', data: ''}, {silent:true});//always enforce event
			this.set({loaded: false, data: null});
		}
	});

	return BaseService;
});