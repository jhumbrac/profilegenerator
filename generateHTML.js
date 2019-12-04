const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const pdf = require('html-pdf');

// var html = fs.readFileSync('./index.html', 'utf8');
// var options = { format: 'Letter' };

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

let profileImage;
let userName;
let locationLink;
let githubProfile;
let userBlog;
let userBio;
let publicRepo;
let followers;
let githubStars;
let following;

inquirer
.prompt([
  {
    type: 'list',
    name: 'color',
    message: 'Choose a color theme',
    choices: ['green', 'blue', 'pink', 'red'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'userName',
    message: 'What is your github username?',
    filter: function(val) {
      return val;
    }
  }
]).then( data=> {
  // console.log(data);
  const queryURL = `https://api.github.com/users/${data.userName}`;
  axios.get(queryURL).then(function(response){
    console.log(response.data);
    profileImage = response.data.avatar_url;
    userName = response.data.name;
    locationLink = response.data.location;
    githubProfile = response.data.html_url;
    userBlog = response.data.blog;
    userBio = response.data.bio;
    publicRepo = response.data.public_repos;
    followers = response.data.followers;
    githubStars = response.data.starred_url;
    following = response.data.following;
    fs.writeFileSync('index.html', generateHTML(data), err=>{
      if (err) {
        throw err;
      }
    })
    var html = fs.readFileSync('./index.html', 'utf8');
    var options = { format: 'Letter' };

    pdf.create(html, options).toFile(`./${userName.split(' ').join('')}-profile-${data.color}.pdf`, function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });


  });
  // console.log(
  //   generateHTML(data)
  // );
  
}).catch(function(err){
  console.log(err);
})

function generateHTML(data) {
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[data.color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[data.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
    </head>
    <body>
        <section class="wrapper">
        <main>
          <div class="photo-header">
            <img src="${profileImage}" alt="${userName}'s profile pic">
            <h1>${userName}</h1>
            <h2>${userBio}</h2>
            <nav class="links-nav">
              <a href="https://www.google.com/maps/place/${locationLink}" class="nav-link">${locationLink}</a>
              <a href="${githubProfile}" class="nav-link">See Github Profile</a>
            </nav>
          </div>
          <div class="container row">
            <p class="card col">Public Repositories: ${publicRepo}</p>
            <p class="card col">Github Stars: 5</p>
            <p class="card col">Followers: ${followers}</p>
            <p class="card col">Following: ${following}</p>
          </div>
        </main>
        </section>
    </body>
  </html>`
        }