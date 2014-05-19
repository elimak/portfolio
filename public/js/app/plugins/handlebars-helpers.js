require([
	'handlebars'
], function(Handlebars) {

	Handlebars.registerHelper('plural', function (str, count) {
		return str + (count !== 1 ? 's' : '');
	});

    Handlebars.registerHelper('isNotEmptyObj', function(obj, options) {
        return (Object.keys(obj).length > 0)? options.fn(this): options.inverse(this);
    });
});
