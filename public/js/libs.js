(function () {
	'use strict';

	define([
		'jquery',
		'underscore',
		'backbone',
		'bootstrap',
		'select2'
		],function( $, _, Backbone, Bootstrap, Select2){

		return {
			jquery : $,
			underscore : _ ,
			backbone : Backbone,
			bootstrap : Bootstrap,
			select2: Select2
		};
	});
})();