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
		if(Session.get('selectedPostToEditId')){
			post.date = moment(post.date_created,"X").format("YYYY-MM-DD");
			$("#editPostForm select option[value='"+post.status+"']").attr("selected","selected");
			return post;
		}
	}
});

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

		// $(drawerTarget).css('height', 'auto');
		// var targetHeight=$(drawerTarget).css('height');
		// console.log("auto height completed, set to: "+targetHeight)
		// $(drawerTarget).css('height', '0');
		// console.log("height reset to 0");
		// $(drawerTarget).css('height', targetHeight);
		// console.log("height set to target height");
		// $(drawerTarget).css('height', '453px');
	},
	'click .editLink': function(e){
		e.preventDefault();
		Session.set("selectedPostToEditId",this._id);
		post = Posts.findOne(Session.get('selectedPostToEditId'));
		// $("#editPostForm select option[value='"+post.status+"']").attr("selected","selected");
	}
})