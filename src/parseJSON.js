// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

//sources:
//http://www.json.org/
//http://stackoverflow.com/questions/31502068/remove-white-space-from-json-object-but-not-within-quotes

var parseJSON = function(json) {
  // your code goes here

  //remove white space not within double quotes
  json = json.replace(/("[^"]*")|\s/g, "$1");

  console.log('input:'+json);
  
  //first character in json string determines the type of return value
  //var char0 = json.charAt(0);
  var obj;
  var operators = []; //keep track of operators

  var result = parseRecursion(json, 0, operators, obj);

  console.log('result:'+result);

  if(Array.isArray(result)){

  }else{

    for(var key in result){
      console.log(key+":"+result[key]);
    }
  }
  return result;

};


function parseRecursion(json, charIndex, operators, obj, values){

	

	var jsonChar = json.charAt(charIndex);

	//console.log("json char:"+jsonChar);
  switch(jsonChar){

	 case '[':
  		//console.log('array');
  		obj = [];
  		operators.push(jsonChar);
  
      return parseRecursion(json, ++charIndex, operators, obj);

  		break;
  
  	case '{':
  		//console.log('object');
  		obj = {};
  		operators.push(jsonChar);

      return parseRecursion(json, ++charIndex, operators, obj);
  		
      break;
  	
    case ']':
 
  		if(operators.pop() === '['){
        //check if there are items to push into the obj array
        if(values !== undefined){
          //console.log('closing ] values does not equal to undefined');
          obj.push(values[0]);
        }
  		  
      	return obj;
  		
      }else{
  			//error, improper array
  			//console.log('improper array');
  			return undefined;
  		}
  		break;
  	
    case '}':
  		if(operators.pop() === '{'){
         //check if there are items to push into the obj array
        if(values !== undefined){
          obj[values[0]] = values[1];
        }
  			return obj;
  		}else{
  			//error, improper object
  			return undefined;
  		}
  		break;

  	case '"':

      var tempString = "";
      //search for the closing " starting from index charIndex

      var closingQuotesIndex = json.indexOf('"', charIndex+1);


      if(closingQuotesIndex === -1){
        //error in string format
        return undefined;
      }else{
        
        tempString = json.substring(charIndex+1, closingQuotesIndex);
        
      }
  		
      //need to check if key/item or value
      if(values !== undefined){
        //object element
        values.push(tempString);
      } else{
        //array element || object element
        var values = [tempString];
      }    

      //console.log('tempString:'+tempString);
      //console.log('values0'+values[0]);
      //console.log('values1'+values[1]);

      return parseRecursion(json, closingQuotesIndex+1, operators, obj, values);

  		break;

  	case ",": //other items in array or object

      //save values in object
      if(Array.isArray(obj)){
        obj.push(values[0]);
      }else{
        obj[values[0]] = values[1];
      }

  		//operators.push(jsonChar);

      //console.log(',:'+obj);

      return parseRecursion(json, ++charIndex, operators, obj);

  		break;

  	case "f": //false
      
      //need to check if key/item or value
      if(values !== undefined){
        //object element
        values.push(false);
      } else{
        //array element || object element
        var values = [false];
      }    
      return parseRecursion(json, charIndex+5, operators, obj, values);
  		break;
  	
    case "n": //null
  		
      //need to check if key/item or value
      if(values !== undefined){
        //object element
        values.push(null);
      } else{
        //array element || object element
        var values = [null];
      } 
      return parseRecursion(json, charIndex+4, operators, obj, values);

  		break;
  	case "t": //true
  		
      //need to check if key/item or value
      if(values !== undefined){
        //object element
        values.push(true);
      } else{
        //array element || object element
        var values = [true];
      } 
      return parseRecursion(json, charIndex+4, operators, obj, values);

  		break;

    case ":":
      return parseRecursion(json, ++charIndex, operators, obj, values); 
    break;
  	
  	default: //number
  		//console.log('default case:'+jsonChar);
      var commaIndex = json.indexOf(',', charIndex+1);

      if(commaIndex === -1){//end of string
        commaIndex = json.indexOf(']', charIndex+1);
      }

      //console.log('commaIndex:'+commaIndex);
      console.log('number:'+json.substring(charIndex, commaIndex));
      var number = Number(json.substring(charIndex, commaIndex));

      //need to check if key/item or value
      if(values !== undefined){
        //object element
        values.push(number);
      } else{
        //array element || object element
        var values = [number];
      } 
      return parseRecursion(json, commaIndex, operators, obj, values); 

  }

  /*

  if(++charIndex < json.length){
  	//console.log('calling:'+json.charAt(charIndex));
  	obj = parseRecursion(json, charIndex, operators, obj);
  }
 
  	return obj;
    */
}

function addItem(obj, item, key){
	if(Array.isArray(obj)){
		obj.push(item);
	}else{
		obj[key] = item;
	}
	return obj;


}