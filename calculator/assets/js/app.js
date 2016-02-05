(function($) {
	
	var _hidden        = "0";
	var _bClear        = false;
	var _bLastOperator = "";
	var _bLastKey      = "";
	var tempEquation   = "";
	
	$('.key').on('click', function() {
	
		var _key      = $(this).text();
		var _equation = $('.equation').text();
	
		if( _key == "C" )	{
			
			_hidden = "0";
			_bClear = false;
			
			$('.output').text("0");
			$('.equation').html("&nbsp;");
		}
		
		if( _bClear )	{
			
			_hidden = "0";
			_bClear = false;
		}
		
		if( $.isNumeric(_key) || _key == "." || _key == "+/-" )	{
			
			if( _key == "+/-" )	{

				if( _hidden.indexOf("-") == -1 && _hidden.length >= 1 )	{
					
					_hidden = "-" + _hidden;
				}
				else if( _hidden.indexOf("-") >= 0 )	{
					
					_hidden = _hidden.replace("-", "");
				}
			}	else {
				
				_hidden += _key;
			}
			
			if ( _hidden.length == 1 && _key == "." )
				_hidden = "0" + _hidden;
			
			_hidden = _hidden.
						replace(/^0+(?!\.|$)/, '').
						replace( /^([^.]*\.)(.*)$/, function ( a, b, c ) { 
					        return b + c.replace( /\./g, '' );
					    });
			
			$('.output').text(_hidden);
		}
		
		if( _key == "+" || _key == "-" || _key == "*" || _key == "/" || _key == "=" )	{
			
			if( _key == "=" )	{
				
				if ( ! $.isNumeric( tempEquation.substr(-1, 1) ) )
					tempEquation = tempEquation.substr(0, tempEquation.length - 1);
				else
					tempEquation = tempEquation;
				
				if( _bLastOperator.length )
					tempEquation += _bLastOperator + _hidden;
				else
					tempEquation += _hidden;
				
				_hidden = "0";
				$('.output').text(eval(tempEquation));
				$('.equation').html("&nbsp;");
			}	else 	{
				
				if ( _hidden == 0 )	{
					
					if ( ! $.isNumeric( _equation.substr(-1, 1) ) )
						tempEquation = _equation.substr(0, _equation.length - 1) + _key;
					
					$('.equation').html(tempEquation);
					
					console.log( "-------------------------");
					console.log( "_key : " + _key );
					console.log( "_bLastKey : " + _bLastKey );
					console.log( "_equation : " + _equation );
					console.log( "tempEquation : " + tempEquation );
					console.log( "-------------------------");	
					return;
				}	else {
				
					_bClear = true;
					_equation += _hidden + _key;
					
					$('.equation').html(_equation);
					
					if ( ! $.isNumeric( _equation.substr(-1, 1) ) )
						tempEquation = _equation.substr(0, _equation.length - 1);
					else
						tempEquation = _equation;
					
					$('.output').text(eval(tempEquation));
				}

				_bLastOperator = _key;
			}
		}
		
		_bLastKey = _key;
		
		console.log( "_key : " + _key );
		console.log( "_bLastKey : " + _bLastKey );
		console.log( "_bLastOperator : " + _bLastOperator );
		console.log( "_hidden : " + _hidden );
		console.log( "_hidden Length : " + _hidden.length );
		
		console.log( "_equation : " + _equation );
		console.log( "tempEquation : " + tempEquation );
		
	});
})(jQuery);