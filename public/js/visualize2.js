var xValues = [];
var yValues = [];
var zValues = [];

var skills = [
	[{ "skill_name": "iaas", "children": [{ "skill_name": "virtual_compute", "children": "" }, { "skill_name": "virtual_network", "children": "" }, { "skill_name": "virtual_storage", "children": "" }] }]
]
var level2_


// var skills = ["deep_data_governance","data_analytics_ai", "paas", "iaas", "infrastructure", "deployment", "security_compliance]

$(document).ready(function() {
var colorscaleValue = [
    [0, '#ff0000'],
    [1, '#00ff00']
];


	var val = employeeData;
	var total = totalEmployees;

	for (var j = 0; j < val[0].values.length; j++) {
		xValues.push(val[0].values[j].skill_name);
	}

	for (var i = 0; i < val.length; i++) {
		yValues.push(i.toString());

		var e = []
		for (var j = 0; j < val[i].values.length; j++) {
			var d = val[i].values[j].skill_level;
			e.push(parseInt(d));
		}
		zValues.push(e);
	}

	var data = [{
		x: xValues,
		y: yValues,
		z: zValues,
		type: 'heatmap',
		colorscale: colorscaleValue,
		showscale: false
	}];

	var layout = {
		title: 'Skill Classification Heatmap',
		annotations: [],
		xaxis: {
			ticks: '',
			side: 'top'
		},
		yaxis: {
			ticks: '',
			ticksuffix: ' ',
			width: 700,
			height: 700,
			autosize: false
		}
	};

	for (var i = 0; i < yValues.length; i++) {
		for (var j = 0; j < xValues.length; j++) {
			var currentValue = zValues[i][j];
			var textColor = 'white';
			var result = {
				xref: 'x1',
				yref: 'y1',
				x: xValues[j],
				y: yValues[i],
				text: zValues[i][j],
				font: {
					family: 'Arial',
					size: 12,
					color: 'rgb(50, 171, 96)'
				},
				showarrow: false,
				font: {
					color: textColor
				}
			};
			layout.annotations.push(result);
		}
	}


	Plotly.newPlot('myDiv', data, layout);

});