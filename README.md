# Tech-Blog
Web-based CMS tech blog for amatuer and professional contributors alike

## Table of Contents

- [Project Name](#tech-blog)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [User Story](#user-story)
- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)

# Description

This web-based application allows users to submit as well as review other user's blogs about technology. The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

# User Story

AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions

# Features

This appllication has the following features and functions:

1. Landing page:
    - Initial place where users  are directed when they visit the website with:
        - Existing blog posts (read-only) if any have been posted 
        - Navigation links for the homepage and the dashboard 

2. Log-in functionality 
    - When users select the navigation link from the landing page:
        - Prompt to either "sign up" or "log-in"
            - When selecting the "sign up" option, create a username and password
            - When selecting the "log-in" option, provide the username and password
                - If correct credentials are successfully entered, user now sees navigation links for the homepage, the dashboard, and the option to log out

3. Homepage 
    - When a user is logged in, the following options shall be available:
        - Existing blog posts that include the post title and the date created
        - When an existing blog is selected by the user:
            - Display post title, contents, post creator’s username, and date created for that post
            - The user also has the option to leave a comment by typing free text and selecting the submit button. 
            - When the submit button is selected, the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

4. Dashboard view:
    - When users select the dashboard option from the navigation tool:
        - Presented with view of any blog posts the user has previously created and the option to:      
            - Add a new blog post
            - Delete /edit an existing blog post

5. Submit a new post:
    - When a user is logged in, they have the option to add a new blog post by selecting the button and then:
        - Entering text in a title and form
        - Once completed, select the submit/save button to store the blog for other users to view

6. Delete/update an existing post: 
    - When a user is logged in, they have the option to delete or update an existing blog post by selecting the appropriately labeled button
        - When the delete button is selected, the user shall be prompted with a confirmation of the action.
        - When the update button is selected, the user shall have the ability to revise the title and/or form and then confirm the revisions with a save button.
    - A blog post which is deleted or updated shall reflect those changes on the dashboard once confirmed/saved by the user.

7. Logout functionality:
    - Users may be logged out by two different methods:
        - Selecting the logout option from the navigation tool
        - Being idle for a certain amount of time (set by the developer) after logging in

## Usage

The github repository may be found at https://github.com/sfmacdonald/Tech-Blog

The live URL for the working website deployed via Heroku is https://techie-blog-613aca60cde5.herokuapp.com

When accessed, the initial landing page should reflect the following image:

![Tech Blog]([insert png])