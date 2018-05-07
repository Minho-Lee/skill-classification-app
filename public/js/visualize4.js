var xValues = [];
var yValues = [];
var zValues = [];

var skills = [{ "skill_name": "watson", "children": [{ "skill_name": "conversation", "children": "" }, { "skill_name": "discovery", "children": "" }] },
    { "skill_name": "iaas", "children": [{ "skill_name": "virtual_compute", "children": "" }, { "skill_name": "virtual_storage", "children": "" }, { "skill_name": "virtual_network", "children": "" }] }
];

var skillCaps = {
    "watson": 12,
    "coversation": 6,
    "discovery": 6,
    "iaas": 12,
    "virtual_compute": 4,
    "virtual_storage": 4,
    "virtual_network": 4
};

var skillToVisualize = "watson"
// var skills = ["deep_data_governance","data_analytics_ai", "paas", "iaas", "infrastructure", "deployment", "security_compliance]

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
            console.log(skills[i]);
            var a = skills[i].children;
            for (var j = 0; j < a.length; j++) {
                skillChildren.push(a[j].skill_name);
            }
            break;
        }
    }

var colorscaleValue = [
    [0, '#ff0000'],
    [1, '#00ff00']
];


    var originalData = employeeData;
    var total = totalEmployees;

    xValues = skillChildren;

    for (var i = 0; i < originalData.length; i++) {

        yValues.push(i.toString());
        var e = []

        for (var j = 0; j < originalData[i].values.length; j++) {
            if (skillChildren.includes(originalData[i].values[j].skill_name)) {

                var d = originalData[i].values[j].skill_level;
                console.log(parseInt(d) + " " + parseInt(originalData[i].values[j].skill_cap));
                e.push(parseInt(d) / parseInt(skillCaps[originalData[i].values[j].skill_name]));
            }
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
}