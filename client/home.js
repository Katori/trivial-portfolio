var isEditing = false;

isUserAdmin = function(){
	// grab user's admin status as soon as it's available, useful in templates
	if(Meteor.user()){
		return Meteor.user().admin
	}
	else{
		return false
	}
}

Template.home.userInfo = function () {
	return String(Meteor.userId());
};

Template.home.rendered = function() {
	// Attach FastClick for mobile devices.
	$(function() {
		FastClick.attach(document.body);
	});
}

Template.home.posts = function () {
	// display posts, sorted by date created
	return Posts.find({},{
		sort:{date_created: -1},
		limit: 2
	});
};

Template.home.isAdmin = function(){
	// Get admin status on homepage.
	return isUserAdmin();
}

Template.home.editPost = function(){
	if(isEditing){
		return true;
	}
	else{
		return false
	}
}

Template.smallMenu.events({
		'click .smallMenu':function(e){
		// If mobile menu is open when clicked, close it. Else, open it.
		if($('nav.smallMenu').hasClass('open')){
			$('nav.smallMenu').removeClass('open');
		}
		else{
			$('nav.smallMenu').addClass('open');
		}
	}
});

Template.adminTools.events({
	'click .editButton': function(e){
		// Set the session variable of the post to edit and take users to the admin page.
		e.preventDefault();
		Session.set("selectedPostToEditId",this._id)
		Router.go("admin");
	},
	// Deletion confirmation and deletion event.
	'click .deleteButton': function(e){
		e.preventDefault();
		if(confirm("Really delete post \x22"+this.title+"\x22?")==true){
			Posts.remove(this._id);	
		}
		else{
		}
	}
});

Template.admin.isAdmin = function(){
	// Get admin status on adminpage.
	return isUserAdmin();
}

Meteor.startup(function () {
	// Subscribe user to userData field, which right now contains only admin status.
	Meteor.subscribe("userData");
});
Deps.autorun(function(){
	if (Meteor.user()){
		console.log(Meteor.userId());
	}
});