// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
){
  // your code here
  
  var documentElements = document.documentElement;

  return classNameRecursion([], documentElements, className);
  
};

function classNameRecursion(elementsArray, documentElements, className){

	for(var i = 0 ; i < documentElements.children.length ; i++){
	
		//to account for an element having multiple classes
		var classString = documentElements.children[i].className; //multiple classes are seperated by space
		var classArray = classString.split(' ');
		
		if(classArray.indexOf(className) !== -1){			
			elementsArray.push(documentElements.children[i]);			
		}
		//check if there are children to the node
		if(documentElements.children[i].hasChildNodes()){
			classNameRecursion(elementsArray, documentElements.children[i], className);
		}
	}

	return elementsArray;
}