//shows the skill level heatmap view pertaining to each platform: IAAS, Watson etc..
//rating goes from 0% (skills needed),  to 100% (skill requirements settled).

var xValues = [];
var yValues = [];
var zValues = [];

  var colorscaleValue = [
        [0, '#ff0000'],
        [1, '#00ff00']
    ];



function transpose(sourceArray)
{
  return sourceArray[0].map(function (_, c) { return sourceArray.map(function (r) { return r[c]; }); });
}


var skills = [{ "skill_name": "iaas", "children": [{ "skill_name": "isolated_virtual_network", "children": "" }, { "skill_name": "virtual_machines", "children": "" }, { "skill_name": "bare_metal", "children": "" }, { "skill_name": "load_balancing", "children": "" }, { "skill_name": "firewalls", "children": "" }, { "skill_name": "block_storage", "children": "" }, { "skill_name": "fire_storage", "children": "" }, { "skill_name": "object_storage", "children": "" }] }
];

var skillCaps = { "watson": 10,
    "iaas": 32,
    "isolated_virtual_network": 4,
    "virtual_machines": 4,
    "bare_metal": 4,
    "load_balancing": 4,
    "firewalls":4,
    "block_storage":4,
    "fire_storage":4,
    "object_storage":4
};

var skillToVisualize = "iaas";

$(document).ready(function() {
    calcValues();
});

function updateChart(element) {
    xValues = [];
    yValues = [];
    zValues = [];
    skillToVisualize = element.value;
    calcValues();
}


function calcValues() {
    var skillChildren = [];
    for (var i = 0; i < skills.length; i++) {
        if (skills[i].skill_name == skillToVisualize) {
            var subSkills = skills[i].children;
            for (var j = 0; j < subSkills.length; j++) {
                skillChildren.push(subSkills[j].skill_name);
            }
            break;
        }
    }

  

    var originalData = employeeData;
    var total = totalEmployees;

    xValues = skillChildren;

  yValues = [0] ;
    for (var i = 0; i < originalData.length; i++) {
		var subSkillLevels = [];
        for (var j = 0; j < originalData[i].values.length; j++) {
            if (skillChildren.includes(originalData[i].values[j].skill_name)) {

                subSkillLevels.push(Math.round(parseInt(originalData[i].values[j].skill_level)/(originalData.length*skillCaps[originalData[i].values[j].skill_name])*100));}
        }
        zValues.push(subSkillLevels);
    }

     zValues = transpose(zValues);

var finalValues= [];
     for (var i = 0; i < zValues.length; i++) {
     	var res = 0;
     	for (var j = 0; j < zValues[i].length; j++) {
     	res += (zValues[i][j]);
     	}
     		finalValues.push (res);
     }

zValues = [finalValues];

    var data = [{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: colorscaleValue,
        showscale: true
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
                text: zValues[i][j] + "%",
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
}