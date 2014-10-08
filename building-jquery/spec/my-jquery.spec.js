describe('My custom jQuery', function() {
	beforeEach(function() {
		var fixtureHTML = document.getElementById('fixture-template').innerHTML;
		document.getElementById('container').innerHTML = fixtureHTML;
	});

	describe('.html()', function() {
		it('should set the innerHTML on 1 to many elements', function() {
			var divs = document.querySelectorAll('#container div');
			var $divs = $('#container div').html('<strong>sup</strong>');

			expect(divs[0].innerHTML).toEqual('<strong>sup</strong>');
			expect(divs[1].innerHTML).toEqual('<strong>sup</strong>');
			expect(divs[2].innerHTML).toEqual('<strong>sup</strong>');
		});

		it('should be chainable when setting the innerHTML', function() {
			var $divs = $('#container div').html('<strong>sup</strong>');
			expect($divs instanceof jQuery).toBe(true);
		});

		it('should return the innerHTML of the first element in the matched set', function() {
			var divHTML = $('#container div').html();
			expect(divHTML).toEqual('<a href="#">Box 1</a>');
		});
	});

	describe('.css()', function() {
		it('should set a single style property: .css(style, value)', function() {
			var divs = document.querySelectorAll('#container div');
			$('#container div').css('color', 'green');
			expect(divs[0].style.color).toEqual('green');
			expect(divs[1].style.color).toEqual('green');
			expect(divs[2].style.color).toEqual('green');
		});

		it('should set style properties from an object: .css({ })', function() {
			var divs = document.querySelectorAll('#container div');
			$('#container div').css({ color: 'green', display: 'inline-block' });

			expect(divs[0].style.color).toEqual('green');
			expect(divs[1].style.color).toEqual('green');
			expect(divs[2].style.color).toEqual('green');
			expect(divs[0].style.display).toEqual('inline-block');
			expect(divs[1].style.display).toEqual('inline-block');
			expect(divs[2].style.display).toEqual('inline-block');
		});

		it('should be chainable', function() {
			var $divs = $('#container div').css({ color: 'green', display: 'inline-block' });
			expect($divs instanceof jQuery).toBe(true);
		});
	});

	describe('.attr()', function() {
		it('should read an attribute from the first element in the matched set', function() {
			expect($('a#home').attr('title')).toEqual('Home Page');
		});

		it('should write an attribute to all elements in the matched set', function() {
			var divs = document.querySelectorAll('#container div');
			$('#container div').attr('title', 'testing');
			expect(divs[0].title).toEqual('testing');
			expect(divs[1].title).toEqual('testing');
			expect(divs[2].title).toEqual('testing');
		});

		it('should be chainable when in write mode', function() {
			var $divs = $('#container div').attr('title', 'testing');
			expect($divs instanceof jQuery).toBe(true);
		});
	});

	describe('jQuery.each()', function() {
		it('should loop over an array', function() {
			var spy = jasmine.createSpy();
			$.each([1, 2, 3], spy);
			expect(spy.callCount).toEqual(3);
			expect(spy.argsForCall[0]).toEqual([0, 1]);
			expect(spy.argsForCall[1]).toEqual([1, 2]);
			expect(spy.argsForCall[2]).toEqual([2, 3]);
		});

		it('should loop over an object', function() {
			var spy = jasmine.createSpy();
			var cat = { name: 'Spot', age: 10, sex: 'male' };
			$.each(cat, spy);
			expect(spy.callCount).toEqual(3);
			expect(spy.argsForCall[0]).toEqual(['name', 'Spot']);
			expect(spy.argsForCall[1]).toEqual(['age', 10]);
			expect(spy.argsForCall[2]).toEqual(['sex', 'male']);
		});
	});
});