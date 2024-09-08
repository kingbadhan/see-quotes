let arr = [];
function uNm() {
  temp = arr.length+1;
  return arr.push(temp);
}

const express = require("express");
const app = express();
let port = 8080;
const path = require("path");

let posts = [
  { id: uNm(), username: "king_badhan", content: "my trust is at 0% for everyOne" },
  { id: uNm(), username: "coder.lp", content: "coding is my lifeline" },
  { id: uNm(), username: "laddi_badhan", content: "jai babe di ji" },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.render("home"));

app.get("/rolldice", (req, res) => {
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice", {diceVal});
});

app.get("/ig1/:username", (req, res) => {
  const followers = ["abc", "adam", "zampa", "bob", "casey", "xyz"];
  let {username} = req.params;
  res.render("ig1", {username, followers});
});

app.get("/ig2/:username", (req, res) => {
  let {username} = req.params;
  const instaData = require("./data.json");
  const data = instaData[username];
  if(data)  res.render("ig2", {data});
  else res.render("err");
});

app.get("/register", (req, res) => {
  let { user, password } = req.query;
  res.send(`<h1>Standard Get Response. Welcome to ${user}</h1>`);
});

app.post("/register", (req, res) => {
  let { user, password } = req.body;
  res.send(`<h1>Standard Post Response. Welcome to ${user}</h1>`);
});

app.get("/posts", (req, res) => {
  res.render("index", {posts});
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uNm();
  posts.push( { id, username, content } );
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id == p.id);
  if(!post) res.render("err");
  else res.render("show", {post});
});

app.patch("/posts/:id/edit", (req, res) => {
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id == p.id);
  post.content = newContent;
  console.log(newContent, id);
  res.send("working properly");
  // res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("edit", {post});
});

app.delete("/posts/:id", (req, res) => {
  let {id} = req.params;
  posts = posts.filter((p) => id != p.id);
  res.redirect("/posts");
});

app.listen(port);