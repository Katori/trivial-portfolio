// The user IDs of the site administrators. These can be gained through various methods (console.log).
var siteAdminsIds=["onT3dEMCGKtMZAjcz","yWeg8Re8jxz9YGfyF","rvexnwidAA5JTZjYA","QritvqMDfwRLhBfj5","PKQ6QMQJA4FEaAsMX"];

Meteor.methods({
});
Meteor.startup(function () {
	// On startup, the server makes sure that the admin IDs specified are admins.
	Meteor.users.update({_id : {$in: siteAdminsIds}}, {$set: {admin: true}}, {multi: true});
	// If there are no posts, add some to get the DB started.
	if(Posts.find().count()===0){
		// Posts.insert()
		var titles = ["Portfolio Piece 1", "Portfolio Piece 2"];
		var entries = ["This is one portfolio entry lorem ipsum dolor",
		"This is another portfolio entry lorem ipsum dolor blah blah blah"];
		for (var i=0; i < titles.length; i++){
			Posts.insert({title: titles[i],entry: entries[i]});
		}
	}
});

// Publish the userData, which presently is only the admin field.
Meteor.publish("userData", function () {
	if (this.userId) {
		return Meteor.users.find({_id: this.userId},
			{fields: {'admin': 1}});
	} else {
		this.ready();
	}
});