var imgId;
var post;

Template.admin.helpers({
	posts: function(e){
		// display posts, sorted by date created
		return Posts.find({},{sort:{date_created: -1}});
	},
	parsedDateCreated: function (e){
		return moment(this.date_created,"X").fromNow();
	},
	selected_post: function(){
		// If the user has selected a post to edit, find it and display it appropriately.
		if(Session.get('selectedPostToEditId')){
			post = Posts.findOne(Session.get('selectedPostToEditId'));
			post.date = moment(post.date_created,"X").format("YYYY-MM-DD");
			// $("#editPostForm select option[value='"+post.status+"']").attr("selected","selected");
			return post;
		}
	}
});

Template.admin.rendered = function (){
	if(Session.get('selectedPostToEditId')){
		$("#editPostForm select option[value='"+post.status+"']").attr("selected","selected");
	}
}

Template.admin.events({
	// Upload the file when the file input is activated, to be ready when the user submits the post.
	'change .myFileInput': function(e){
		console.log("change detected");
		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function (err, fileObj) {
				imgId = fileObj._id;
			});
		});
	},
	'click .inputPostSubmit': function(e){
		// When the user clicks the submit button, get the state of all the inputs,
		// get the ID of the image we uploaded, and store them all in the DB as a Post.
		e.preventDefault();
		var titleValue = document.getElementById("newProjectTitle").value;
		var tagsArray = document.getElementById("newProjectTags").value.split(',');
		var descriptionValue = document.getElementById("newProjectDescription").value;
		var completionValue = document.getElementById("newProjectCompletion").value;
		var statusElement = document.getElementById("newProjectStatus");
		var statusValue = statusElement.options[statusElement.selectedIndex].value;
		var dateCompleted;
		if($('#newProjectIsToday').is(':checked')){
			dateCompleted = moment().format("X");
		}
		else{
			dateCompleted = moment(document.getElementById("newProjectDate").value,"YYYY-MM-DD").format("X");
		}
		var post = Posts.insert({
			title:titleValue,
			tags:tagsArray,
			entry:descriptionValue,
			completion:completionValue,
			status:statusValue,
			date_created:dateCompleted,
			imageId: imgId
		});
		document.getElementById("newProject").reset();
	},
	'click .editPostSubmit': function(e){
		// Similar to the post insert code, this code just updates a post. It doesn't touch the post's image right now.
		e.preventDefault();
		var statusElement = document.getElementById("editProjectStatus");
		Posts.update(Session.get("selectedPostToEditId"),{
			$set:{
				title: document.getElementById("editTitle").value,
				tags: document.getElementById("editTags").value.split(','),
				entry: document.getElementById("editDescription").value,
				completion: document.getElementById("editProjectCompletion").value,
				status: statusElement.options[statusElement.selectedIndex].value,
				date_created: moment(document.getElementById("editDate").value,"YYYY-MM-DD").format("X")
			}
		});
	},
	'click #newProjectIsToday':function(e){
		// When the "Project Is Today" checkbox is unchecked, display the
		// date picker. Hide it when it is checked.
		if($('#newProjectIsToday').is(':checked')){
			$('#newProjectDate').addClass("hide")
		}
		else{
			$('#newProjectDate').removeClass("hide")	
		}
	},
	'click .drawerButton': function(e){
		e.preventDefault();
		// Grab the ID of the drawer to open:
		var drawerId = $(e.target).attr('id');
		// Store the target drawer's content div selector:
		var drawerTarget = '#'+drawerId+'.drawerContents';
		if($(drawerTarget).hasClass('open')){
			$(drawerTarget).removeClass('open');
		}
		else{
			$(drawerTarget).addClass('open');
		}
	},
	'click .editLink': function(e){
		// If a post title is clicked, set the appropriate session variable to its ID, find the post needed to edit, and set the correct attribute in the editing form's status field.
		e.preventDefault();
		Session.set("selectedPostToEditId",this._id);
		post = Posts.findOne(Session.get('selectedPostToEditId'));
		$("#editPostForm select option[value='"+post.status+"']").attr("selected","selected");
	}
})