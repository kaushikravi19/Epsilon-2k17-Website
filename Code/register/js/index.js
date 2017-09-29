$('.glide').glide({
	type: 'carousel',
	autoplay: false,
	afterTransition: afterCardChange,
	beforeTransition: beforeCardChange,
	paddings: '30px'
});

function afterCardChange(args) {
	var index = !args ? 1 : args.index;

	$('.card-details [data-target="card-name"]').html(cardInfo[index - 1].name);
	$('.card-details [data-target="card-desc"]').html('Funds: $' + cardInfo[index - 1].funds);
	$('[data-target="card-name"], [data-target="card-desc"]').animate({ 'opacity': 1 }, 50);
	$('.pay-btn').removeAttr('disabled');
}

function beforeCardChange(args) {
	var current = $('.glide__slide.active');
	current.removeClass('active');
	
	var left = args.swipe.distance > 0;
	var direction = left ? args.index - 1 : args.index + 1;
	var newIndex = parseInt(current.attr('data-slide-number')) + (left ? -1 : 1);
	if (newIndex > args.length) {
		newIndex = 1;
	}
	else if (newIndex <= 0) {
		newIndex = args.length;
	}
	
	$('[data-target="card-name"], [data-target="card-desc"]').animate({ 'opacity': 0 }, 50);
	
	$('[data-slide-number="' + newIndex + '"]').addClass('active');
	$('.pay-btn').attr('disabled', true);
}

var cardInfo = [{
	'name': 'Rewards MasterCard',
	'funds': '2300.00'
}, {
	'name': 'Simple Debit',
	'funds': '320.40'
}, {
	'name': 'Paypal Wallet',
	'funds': '1200.00'
}];

afterCardChange();