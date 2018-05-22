//shows the top level heatmap view pertaining to each platform.
//rating goes from 0% (skills needed), to 100% (skill requirements settled).

var xValues = [];
var yValues = [];
var zValues = [];

var colorscaleValue = [
    [0, '#ff0000'],
    [1, '#00ff00']
];

var skills = [{ "skill_name": "iaas", "children": [{ "skill_name": "isolated_virtual_network", "children": "" }, { "skill_name": "virtual_machines", "children": "" }, { "skill_name": "bare_metal", "children": "" }, { "skill_name": "load_balancing", "children": "" }, { "skill_name": "firewalls", "children": "" }, { "skill_name": "block_storage", "children": "" }, { "skill_name": "fire_storage", "children": "" }, { "skill_name": "object_storage", "children": "" }] },
    { "skill_name": "watson", "children": [{ "skill_name": "isolated_virtual_network", "children": "" }]}
];

var skillCaps = {
    "watson": 10,
    "iaas": 32,
    "isolated_virtual_network": 4,
    "virtual_machines": 4,
    "bare_metal": 4,
    "load_balancing": 4,
    "firewalls": 4,
    "block_storage": 4,
    "fire_storage": 4,
    "object_storage": 4
};

var skillToVisualize = ["watson", "iaas"]

$(document).ready(function() {
    calcValues();
});

function calcValues() {
    var skillChildren = [];

    for (var k = 0; k < skillToVisualize.length; k++) {
        var subSkills = [];
        for (var i = 0; i < skills.length; i++) {
            if (skills[i].skill_name == skillToVisualize[k]) {
                var a = skills[i].children;

                for (var j = 0; j < a.length; j++) {
                    subSkills.push(a[j].skill_name);
                }
            }
        }

        skillChildren.push(subSkills);
    }

    var originalData = employeeData;
    var total = totalEmployees;

    xValues = skillToVisualize;

    yValues = [0];

    var subSkills = [];
    var zValues = [];
    for (var k = 0; k < skillToVisualize.length; k++) {
        for (var i = 0; i < originalData.length; i++) {

            subSkills = [];
            for (var j = 0; j < originalData[i].values.length; j++) {
                if (skillChildren[k].includes(originalData[i].values[j].skill_name)) {
                    subSkills.push(Math.round(parseInt(originalData[i].values[j].skill_level)));
                }
            }
            zValues.push([subSkills]);
        }
    }


    var z = [];
    for (var k = 0; k < skillToVisualize.length; k++) {

        var val = 0;
        for (var i = 0; i < originalData.length; i++) {
            for (var j = 0; j < originalData[i].values.length; j++) {
                if (skillChildren[k].includes(originalData[i].values[j].skill_name)) {
                    val += Math.round(parseInt(originalData[i].values[j].skill_level));
                }
            }
        }

        z.push((val / parseInt(skillCaps[skillToVisualize[k]])) * 100);
    }

    finalValues = [z];

    zValues = finalValues;

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