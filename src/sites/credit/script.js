document.querySelector("i#back").addEventListener("click", function(){
	location = "../landing/index.html";
});

document.addEventListener("keydown", function(e){
	if(e.key == "Escape"){
		location = "../landing/index.html";
	}
});