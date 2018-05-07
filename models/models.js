var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var individualEmployeeSchema = new Schema({
    id: String,
    values: Schema.Types.Mixed
});

var individualEmployeeModel = mongoose.model('individualEmployee', individualEmployeeSchema, 'individualEmployee');

var aggEmployeeSchema = new Schema({
	totalEmployees: String,
    id: String,
    values: Schema.Types.Mixed
});

var aggEmployeeModel = mongoose.model('aggEmployee', aggEmployeeSchema, 'aggEmployee');

module.exports = { individualEmployeeModel: individualEmployeeModel, aggEmployeeModel: aggEmployeeModel};