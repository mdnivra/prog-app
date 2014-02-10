require.config({
	paths : {
		jquery : 'libs/jquery',
		underscore : 'libs/underscore',
		backbone : 'libs/backbone',
		bootstrap : '../bootstrap/js/bootstrap',
		vent: 'utils/vent',
		highcharts: 'libs/highcharts',
		text : 'libs/require/text'
	},
	shim : {
		'underscore' : {
			exports : '_'
		},
		'backbone' : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		'bootstrap' : {
			deps : ['jquery'],
			exports : 'Bootstrap'
		},
		'vent' : {
			deps : ['backbone'],
			exports : 'Vent'	
		},
		'highcharts': {
			deps : ['jquery'],
	        exports: 'Highcharts'
	    }
	}
});

require(['views/app'], function(AppView){
	var appView = new AppView();
});
