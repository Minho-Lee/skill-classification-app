//base js to handle input and sending data

$(document).ready(function() {
	// This button will increment the value
	$('[data-quantity="plus"]').click(function(e) {
		e.preventDefault();
		// Get the field name
		fieldName = $(this).attr('data-field');
		// Get its current value
		var currentVal = parseInt($('input[name=' + fieldName + ']').val());
		// If is not undefined AND under 10
		if (!isNaN(currentVal) && currentVal < 10) {
			// Increment
			$('input[name=' + fieldName + ']').val(currentVal + 1);
		// } else {
		// 	// Otherwise put a 0 there
		// 	$('input[name=' + fieldName + ']').val(0);
		}
	});
	// This button will decrement the value till 0
	$('[data-quantity="minus"]').click(function(e) {
		// Stop acting like a button
		e.preventDefault();
		// Get the field name
		fieldName = $(this).attr('data-field');
		// Get its current value
		var currentVal = parseInt($('input[name=' + fieldName + ']').val());
		// If it isn't undefined or its greater than 0
		if (!isNaN(currentVal) && currentVal > 0) {
			// Decrement one
			$('input[name=' + fieldName + ']').val(currentVal - 1);
		} else {
			// Otherwise put a 0 there
			$('input[name=' + fieldName + ']').val(0);
		}
	});

	$('.skillSubmitButton').on('click', function(e) {
		e.preventDefault();
		var skillForm = $("#myForm");
		var $elements = skillForm[0].elements;

		var element = $elements[0];
		var values = [];
		for (var i = 1; element; element = $elements[i++]) {
			// console.log(element);
			var val = element.value;
			if (0 < val && val <= 20) 
			{
				val = 1;
			} 
			else if (20< val && val <= 40) 
			{
				val = 2;
			} 
			else if (40 < val && val <= 60) 
			{
				val = 3;
			} 
			else if (60 < val && val <= 80) 
			{
				val = 4;
			} 
			else 
			{
				val = 5;
			}
			if (element.type === 'range') {
				values.push({ "skill_name": element.name, "skill_level": val });
			}
		}
		$.ajax({
			url: '/submitskills',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(values),
			success: function(res) {

			}
		})
	})

	// Dealing with slider (range)
	var $slider = $(".slider");

	// Randomize initial values on sliders
	// console.log($slider.length);
	// for (var i = 0; i < $slider.length; i++) {
	// 	$slider[i].value = Math.random() * 100 + 1;
	// }
	
	$slider.on('input', function() {
		// console.log($(this).parent());
		// disable active on all children in slider and reassign 'active' state
		$(this).parent().find("div").removeClass("active");
		var curVal = $(this)[0].value;
		// console.log(curVal);
		if (0 < curVal && curVal <= 20) 
		{
			$(this).parent().find(".one").addClass('active');
		} 
		else if (20< curVal && curVal <= 40) 
		{
			$(this).parent().find(".two").addClass('active');
		} 
		else if (40 < curVal && curVal <= 60) 
		{
			$(this).parent().find(".three").addClass('active');
		} 
		else if (60 < curVal && curVal <= 80) 
		{
			$(this).parent().find(".four").addClass('active');
		} 
		else 
		{
			$(this).parent().find(".five").addClass('active');
		}
	})
});