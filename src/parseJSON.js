// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

//sources:
//http://www.json.org/
//http://stackoverflow.com/questions/31502068/remove-white-space-from-json-object-but-not-within-quotes

var parseJSON = function(json) {
  // your code goes here

  //remove white space not within double quotes
  //json = json.replace(/("[^"]*")|\s/g, "$1");

  //console.log('input:'+json);
  //first character in json string determines the type of return value
  //var char0 = json.charAt(0);
  var obj;
  var operators = []; //keep track of operators

  var result = parseRecursion(json, 0, operators, obj);

  //console.log('result:'+result);
  return result;

};


function parseRecursion(json, charIndex, operators, obj, key, value){

	//console.log(json+":"+charIndex);

	var jsonChar = json.charAt(charIndex);

	switch(jsonChar){
	case '[':
  		//console.log('array');
  		obj = [];
  		operators.push(jsonChar);
  		break;
  	case '{':
  		//console.log('object');
  		obj = {};
  		operators.push(jsonChar);
  		break;
  	case ']':
  		if(operators.pop() === '['){
  			//console.log('obj='+obj);
  			return obj;
  		}else{
  			//error, improper array
  			//console.log('improper array');
  			return undefined;
  		}
  		break;
  	case '}':
  		if(operators.pop() === '{'){
  			return obj;
  		}else{
  			//error, improper object
  			return undefined;
  		}
  		break;
  	case '"':
  		console.log('string');
  		//check type of object
  		if(Array.isArray(obj)){ //expect to push items
  			var item = "";

  			//beginning of item
  			while(json.charAt(++charIndex) !== '"'){
  				item += json.charAt(charIndex);
  			}

  			obj.push(item);
  			if(obj.length > 1){
  				if(operators.pop() !== ','){
  					return undefined;
  				}
  			}

  		}else if(typeof(obj) === 'object'){ //expect key and value
  			var key = "";
  			var value = "";

  			//beginning of key
  			while(json.charAt(++charIndex) !== '"'){
  				key += json.charAt(charIndex);
  			}
  			//check if it is value
  			if(json.charAt(++charIndex) !== ':'){
  				return undefined;
  			}
  			
  			//search for beginning of value
  			while(json.charAt(++charIndex) !== '"'){
  				//return undefined;
  			}

  			while(json.charAt(++charIndex) !== '"'){
  				value += json.charAt(charIndex);
  			}

  			//console.log("object = "+key+":"+value);

  			obj[key] = value;

  			//pop a comma in operators array if there is one, maybe check the array or object number of elements???

  			var numOfItems =Object.keys(obj).length;
  			if(numOfItems > 1){
  				if(operators.pop() !== ','){
  					return undefined;
  				}
  			}
  		}
  		break;
  	case ",": //other items in array or object
  		operators.push(jsonChar);
  		break;

  	case "f": //false
  		var item = json.substring(charIndex,charIndex+5); 
  		charIndex += 4;
  		obj.push(false);
  		if(obj.length > 1){
  				if(operators.pop() !== ','){
  					return undefined;
  				}
  			}

  		break;
  	case "n": //null
  		var item = json.substring(charIndex,charIndex+4); 
  		charIndex += 3;
  		obj.push(null);
  		if(obj.length > 1){
  				if(operators.pop() !== ','){
  					return undefined;
  				}
  			}

  		break;
  	case "t": //true
  		//read the next 3 characrers	
  		var item = json.substring(charIndex,charIndex+4); 
  		charIndex += 3;
  		obj.push(true)

  		if(obj.length > 1){
  				if(operators.pop() !== ','){
  					return undefined;
  				}
  			}

  		break;
  	
  	default:
  		console.log('default case:'+jsonChar);

  }

  if(++charIndex < json.length){
  	//console.log('calling:'+json.charAt(charIndex));
  	obj = parseRecursion(json, charIndex, operators, obj);
  }
 
  	return obj;
}

function addItem(obj, item, key){
	if(Array.isArray(obj)){
		obj.push(item);
	}else{
		obj[key] = item;
	}
	return obj;


}