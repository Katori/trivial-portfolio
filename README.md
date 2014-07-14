trivial-portfolio 0.1
=================
A very simple portfolio CMS implemented in Meteor, by Zac North ([@kato](https://twitter.com/kato)).

Example site: http://lizfolio.meteor.com/

## What is it?
A very simple portfolio CMS implemented in Meteor with a pretty front-end designed by a professional designer (Liz Lara).

It is currently known as "lizfolio", created as the portfolio of Liz Lara (see the example site). However, I will be converting it to be a generic portfolio system and later CMS, after the portfolio website is completed.

## How can I use it?
Well, it's really more useful as a learning tool then anything else right now, but just download the latest version on the master branch and run "meteor" in its directory. It should work. If it doesn't, there's an issue.

After you've run it once, go the the /admin/ page, and set up Twitter as a login provider (it currently only supports Twitter, more account systems will be added later. You might be able to get local username/password to work pretty easily.). Watch the JS console for your user ID. Once it is logged, copy it and paste it as an admin ID inside the array at the top of /server/server-main.js. Sorry, this is necessary for now for you to be able to add posts.
## What can I do with it?
Create a portfolio with a very specific theme and style. You could change the name and information on it, if you wanted to use it as your own. Eventually, you will be able to configure it to use your own name and information without changing the code.

But at least it has a fully responsive, phone-first theme.
## Why did you do this?
To practice with Meteor, and demonstrate front-end skills that I have been working on (mainly SCSS). I am still very much a Meteor novice and would love to hear any comments or criticism.
## Roadmap
Features currently completed are ~~struckthrough~~
### Version 0.2
* First user that signs in is admin
* Create/delete admins from the admin area
* ~~Edit posts~~
* Pagination for posts
* Real tags for posts (right now tags are only stored)

### Version 0.3
* Generalize, removing implementation-specific information and allowing user to set up on their own sites from scratch
* More login providers
* Multiple images per project

### Beyond
* trivial-cms
