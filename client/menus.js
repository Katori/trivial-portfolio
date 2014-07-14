Template.regularMenu.rendered = function(){
	currentPage = Router.current().route.name;
	$("a#"+currentPage).addClass("active");
}

Template.smallMenu.rendered = function(){
	currentPage = Router.current().route.name;
	$("a#"+currentPage).addClass("active");
}