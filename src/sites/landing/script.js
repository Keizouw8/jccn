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
				if(i == 1 && !active()) i = 2;
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
				if(i == 2 && !active()) i = 1;
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

document.querySelectorAll("span.contact > i").forEach(function(e){
	e.addEventListener("click", function(){
		window.electronAPI.openLink(e.getAttribute("goto"));
	});
});

document.querySelector("p.connected > i.fa-clipboard").addEventListener("click", function(){
	window.electronAPI.clipboard(document.querySelector("p.connected > span").innerText);
});

window.electronAPI.onChangeAddress(function(address, port){
	document.querySelector(".connected").setAttribute("active", Boolean(address).toString());
	document.querySelector(".connected > span").innerText = address ? `${address}:${port}` : "thunderbolt offline";
	if(!address) document.querySelector("h2.multiplayer").setAttribute("active", "false");
});
window.electronAPI.getAddress();

var active = () => document.querySelector("p.connected").getAttribute("active") == "true";