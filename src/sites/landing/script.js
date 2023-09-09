var h2s = document.querySelectorAll("h2");
var img = document.querySelector("img");

var menuItems = [
	() => location = "/share",
	() => location = "/single",
	() => location = "/multi",
	() => location = "../credit/index.html",
	window.electronAPI.quit
];

h2s.forEach(function(e, i, a){
	e.addEventListener("mouseover", function(){
		a.forEach((e) => e.setAttribute("active", "false"));
		e.setAttribute("active", "true");
		img.src = `../../assets/icon${i}.jpg`;
	});

	e.addEventListener("click", menuItems[i]);
});

document.addEventListener("keydown", function(e){
	if(e.key == "ArrowDown"){
		for(var i = 0; i < h2s.length; i++){
			if(h2s[i].getAttribute("active") == "true"){
				h2s[i].setAttribute("active", "false");
				img.src = `../../assets/icon${(i+1) % h2s.length}.jpg`;
				return h2s[(i+1) % h2s.length].setAttribute("active", "true");
			}
		}
		h2s[0].setAttribute("active", "true");
	}
	if(e.key == "ArrowUp"){
		for(var i = 0; i < h2s.length; i++){
			if(h2s[i].getAttribute("active") == "true"){
				h2s[i].setAttribute("active", "false");
				if(--i < 0) i = h2s.length - 1;
				img.src = `../../assets/icon${i}.jpg`;
				return h2s[i].setAttribute("active", "true");
			}
		}
		h2s[h2s.length - 1].setAttribute("active", "true");
	}
	if(e.key == "Enter" || e.key == " "){
		h2s.forEach((e, i) => e.getAttribute("active") == "true" && menuItems[i]());
	}
});

document.querySelectorAll("i").forEach(function(e){
	e.addEventListener("click", function(){
		window.electronAPI.openLink(e.getAttribute("goto"));
	});
});