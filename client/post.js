Template.post.helpers({
	postImageId: function(e){
		return this.imageId;
	},
	postImage: function(e){
		return Images.findOne({_id:this.imageId});
	},
	parsedDateCreated: function (e){
		return moment(this.date_created,"X").fromNow();
	},
	parsedCompletion: function (e){
		// Add percent sign to completion percentage for rendering.
		return this.completion+="%";
	},
	pencil: function (e){
		// Render different pencils based on project completion status.
		switch (this.status){
			case "justBegun":
				return "<div class='pencil justBegun'></div>"
				break
			case "workInProgress":
				return "<div class='pencil workInProgress'></div>"
				break
			case "takingABreak":
				return "<div class='pencil takingABreak'></div>"
				break
			case "completed":
				return "<div class='pencil finished'></div>"
				break
			default:
				return "Something's wrong, no project status."
				break
		}
	}
});

Template.post.rendered = function(){
	// Adjust in-progress project pencil widths according to project completion.
	// Disabled for now.
	// $('.pencil .workInProgress').velocity({width: this.completion+155+121}, 2000);
};