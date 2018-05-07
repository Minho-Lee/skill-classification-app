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
			if (element.type === 'number') {
				values.push({ "skill_name": element.name, "skill_level": element.value });
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
});