var imgId;

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
	}
})