# MovieRama

# Please star the repo thank you

# App on the heroku

http://joli-monsieur-61212.herokuapp.com/

# Things to Improve

1) Unit Tests and add Mocha for conditionsForLikesAndHates etc...
2) Instanbul for code coverage
3) Better naming to routes, variables, methods
4) Change for loops to checkUserAndMovie to keys [0] and from checkLikesAndHatesFromDb 
5) Add jdocs

# Github Sign in instructions

You must have Name and Public email, you can check it here https://github.com/settings/profile otherwise you will not be able to signup/login

# Installation instructions

1) Clone the repository from your github client from https://github.com/Ierofantis/MovieRama.git or from ssh git@github.com:Ierofantis/MovieRama.git
2) You will need node js installed on your machine https://nodejs.org/en/download
3) You will need postgress DB also https://www.postgresql.org/download/
4) You will need to create a connection with host, user, password and db 
5) The default port is 5432
6) Also create from there https://github.com/settings/developers a new oauth app
7) After you finish with these steps create a clone of env.example without the example extension
8) Open your command line tool (cmd,iterm etc.) and navigate to the project
9) Type `npm install`
10) After that type `npx sequelize-cli db:migrate`
11) Now you are ready to type `node server`
12) When the server starts creates some records (for represent the different users)

And that's it

# User instructions

As a vistor:

1) You can see the movies (Title,Description,Author,Date,likes,dislikes)
2) You can sort by likes,dislikes,date
3) Github signup/login ( You must have Name and Public email, you can check it here https://github.com/settings/profile otherwise you will not be able to signup/login )

As a registered user:

1) Add movie
2) Like or Dislike movies (not your own)
3) View all movies submitted by a specific user

I am using ejs template engine and after some actions you have to refresh the page to see the changed behavior

![alt tag](https://i.imgur.com/yCbxIDj.jpg)

© Theodore P. 2020

