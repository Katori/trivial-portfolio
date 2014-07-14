Template.header.isSmall = function(){
	// Detect if the window is mobile sized. Useful for inserting things based on mobile or not.
	if($(window).width()<=900){
		return true
	}
	else{
		return false
	}
}