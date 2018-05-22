// children of children visualization
//shows the sub-skill within the skill level pertaining to each platform.
//rating goes from 0% (skills needed), to 100% (skill requirements settled).

var xValues = [];
var yValues = [];
var zValues = [];

var skills = [
	{
		"skill_name": "watson",
		"children": [
			{
				"skill_name": "conversation",
				"children": ""
			},
			{
				"skill_name": "discovery",
				"children": ""
			},
			{
				"skill_name": "tone_analyzer",
				"children": ""
			}
		]
	},
	{
		"skill_name": "iaas",
		"children": [
			{
				"skill_name": "virtual_compute",
				"children": [
					{
						"skill_name": "vm",
						"children": ""
					},
					{
						"skill_name": "bare_metal",
						"children": ""
					},
					{
						"skill_name": "vmware",
						"children": ""
					}
				]
			},
			{
				"skill_name": "virtual_storage",
				"children": [
					{
						"skill_name": "block",
						"children": []
					},
					{
						"skill_name": "object",
						"children": []
					},
					{
						"skill_name": "file",
						"children": []
					}
				]
			},
			{
				"skill_name": "virtual_network",
				"children": [
					{
						"skill_name": "public",
						"children": []
					},
					{
						"skill_name": "private",
						"children": []
					}
				]
			}
		]
	}
];

var skillCaps = {
		"watson": 10,
		"conversation":10,
		"discovery":10,
		"tone_analyzer":10,
		"iaas": 10,
		"virtual_compute":10,
		"vm":10,
		"bare_metal":10,
		"vmware":10,
		"virtual_storage":10,
		"file": 10,
		"block":10,
		"object":10,
		"virtual_network":10,
		"public":10,
		"private":10,
};

var skillToVisualize = ["watson", "iaas"];

function getLevel4(originalData, skillChildren) {
				var result = 0;
		for (var i = 0; i < originalData.length; i++) {
				var e = []
				for (var j = 0; j < originalData[i].values.length; j++) {

						if (skillChildren.includes(originalData[i].values[j].skill_name)) {console.log(originalData[i].values[j].skill_name);

								console.log(skillCaps[originalData[i].values[j].skill_name]);
								result += parseInt(originalData[i].values[j].skill_level)/parseInt(skillCaps[originalData[i].values[j].skill_name]);

						}
				}
		}
		return result;
}


function getSkillChildren4(skillToVisualize) {
		var skillChildren = [];
		for (var i = 0; i < skills.length; i++) {
				if (skills[i].skill_name == skillToVisualize) {
						var a = skills[i].children;
						for (var j = 0; j < a.length; j++) {
								skillChildren.push(a[j].skill_name);
						}
						break;
				}
		}
		return skillChildren;
}

function getYValues(size) {
		var resultArray = [];
		for (var i = 0; i < size; i++) {
				resultArray.push(i.toString());
		}
		return resultArray;
}

$(document).ready(function() {
		var colorscaleValue = [
    [0, '#ff0000'],
    [1, '#00ff00']
];


		var originalData = employeeData;
		var total = totalEmployees;

		xValues = skillToVisualize;

		// yValues = getYValues(skillToVisualize.length);
		yValues = ["0"]

		for (var i = 0; i < skillToVisualize.length; i++) {
				var skillChildren = getSkillChildren4(skillToVisualize[i]);
				console.log(getLevel4(originalData, skillChildren));
				zValues.push(getLevel4(originalData, skillChildren));
		}

		zValues = [zValues];
		console.log(xValues);
		console.log(yValues);
		console.log(zValues);

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