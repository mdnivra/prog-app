(function () {
	'use strict';

	define([
		'jquery',
		'underscore',
		'backbone',
		'bootstrap'
		],function( $, _, Backbone, Bootstrap){

		return {
			jquery : $,
			underscore : _ ,
			backbone : Backbone,
			bootstrap : Bootstrap
		};
	});
})();