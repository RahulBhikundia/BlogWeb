import express from "express";
import bodyParser from "body-parser";
import { loadData, saveData } from "./data.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { currentPage: "home" });
});

app.get("/started", (req, res) => {
  res.render("started.ejs", { currentPage: "started" });
});

app.get("/blogs", (req, res) => {
  const data = loadData();
  const usersWithIndex = data.map((user, index) => ({ ...user, index }));
  res.render("blogs.ejs", { currentPage: "blogs", users: usersWithIndex });
});

app.get("/:number", (req, res) => {
  const { number } = req.params;
  const data = loadData();
  const usersWithIndex = data.map((user, index) => ({ ...user, index }));

  res.render("blogs.ejs", {
    currentPage: "blogs",
    users: usersWithIndex,
    num: number,
  });
});

app.post("/submit", (req, res) => {
  const data = loadData();
  const newData = {
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  };
  data.push(newData);
  saveData(data);
  res.redirect("/started");
});

app.get("/edit/:number", (req, res) => {
  const { number } = req.params;
  const data = loadData();

  res.render("started.ejs", {
    currentPage: "started",
    users: data,
    num: number,
  });
});

app.post("/submit/:number", (req, res) => {
  const { number } = req.params;
  const data = loadData();
  const newData = {
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  };
  data[number] = newData;
  saveData(data);
  res.redirect(`/${number}`);
});

app.get("/delete/:number", (req, res) => {
  const { number } = req.params;
  const data = loadData();
  data.splice(number, 1);
  saveData(data);
  res.redirect("/blogs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
