(function() {

	'use strict';

	define([

	], function () {

		return {
				title: {
	                text: null,
	                x: -20 //center
	            },
	            subtitle: {
	                text: '',
	                x: -20
	            },
	            xAxis: {
	                categories: []
	            },
	            yAxis: {
	                title: {
	                    text: 'Temperature (°C)'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }]
	            },
	            tooltip: {
	                valueSuffix: '°C',
	                formatter: function() {
		                return '<b>'+ this.series.name +'</b><br/>'+
		                    this.x +': '+ this.y;
		            }
	            },
	            legend: {
	                layout: 'horizontal',
	                verticalAlign: 'bottom',
	                horizontalAlign: 'center',
	                borderWidth: 0
	            },
	            series: [],

	            credits: {
					enabled: false
				},

				chart: {
					spacingTop: 25
				}
			}

	});
})();