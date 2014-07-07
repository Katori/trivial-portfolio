// Collections used in the rest of the app.
Posts = new Meteor.Collection("posts");

var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
  stores: [imageStore]
});

// Very simple routing.
Router.map(function(){
	this.route('home',{
		path:'/'
	});
	this.route('admin');
});

if(Meteor.isClient){
	Template.home.events({
		'click #mailMe': function(e){
			window.location='mailto:me@lizlara.com';
		}
	})
}