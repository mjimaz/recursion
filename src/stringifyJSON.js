// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

//reading sources:
//http://www.json.org/

var stringifyJSON = function(obj) {
  // your code goes here
  
  return stringifyRecursion(obj, "");
};


function stringifyRecursion(obj, stringify){
	
	var inputType = typeof(obj);

	switch(inputType){
		case "number":
			stringify += obj;
			break;

		case "string":
			stringify += '"'+obj+'"';
			break;

		case "object":
			if(obj === null){
				stringify += 'null';
			}else if(Array.isArray(obj)){
				stringify += '[';
				var numOfElements = obj.length;
				
				for(var i = 0 ; i < numOfElements ; i++){
					
					stringify = stringifyRecursion(obj[i], stringify);
					
					if(i < numOfElements - 1){
						stringify += ',';
					}
				}
				stringify += ']';
			}else{			    
			   
				stringify += '{';                
                
				var numOfItems =Object.keys(obj).length;
				var items = 0;
				var tempKey, tempValue;

				for(var key in obj){

					//make sure that the key & value are valid
					tempKey = stringifyRecursion(key, "");
					tempKey +=":";
					tempValue = stringifyRecursion(obj[key], "");
				
					
					//if valid, include in JSON string
					if(tempValue !== undefined){
                        stringify += tempKey+tempValue;
                        
					    if(items < numOfItems - 1){
						    stringify += ',';
					    }
					}
					items++;
				}

				stringify += '}';
			}
		break;

		case "boolean":
			stringify += obj;
			break;
		
		//both types are invalid in JSON format
		case "undefined":
		case "function":
		    return undefined;
	}

	return stringify;
}