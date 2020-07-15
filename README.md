# MovieRama

# Migrations Sequelize

## Create Migration

`sequelize migration:create --name addcolumn-updated_at-event-table`

# Run Migration



#Installation instructions

1) Clone the repository from your github client from https://github.com/Ierofantis/MovieRama.git or from ssh git@github.com:Ierofantis/MovieRama.git
2) You will need node js installed on your machine https://nodejs.org/en/download
3) You will need postgress DB also https://www.postgresql.org/download/
4) You will need to create a connection with host, user, password and db 
5) Also create from there https://github.com/settings/developers a new oauth app
6) After you finish with these steps create a clone of env.example without the example extension
7) Open your command line tool (cmd,iterm etc.) and navigate to the project
8) Type `npm install`
9) After that type `npx sequelize-cli db:migrate`
10) Now you are ready to type `node server`
11) When the server starts creates some records

And that's it

#User instructions

As a vistor:

1) You can see the movies (Title,Description,Author,Date,likes,dislikes)
2) You can sort by likes,dislikes,date
3) Github login

As a registered user:

1) Add movie
2) Like or Dislike movies (not your own)
3) View all movies submitted by a specific user

© Theodore P. 2020

