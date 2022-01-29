/*
  @author: Riky Ripaldo
  @github: https://github.com/RikyXDZ
  @tools: Youtube Downloader
*/

const fs = require("fs");
const ytdl = require("ytdl-core");
const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/down", async(req, res) => {
  const id = req.query.url.split("v=")[1];
  const info = await ytdl.getInfo(req.query.url);
  console.log(info.formats[4]);
  console.log(info.formats[1]);

  return res.render("down", {
    url: "https://www.youtube.com/embed/" + id,
    info: info.formats.sort((a, b) => {
      return a.mimeType< b.mimeType;
    }),
  });
});

function main() {
  var server = "http://localhost:8000";
  const { exec } = require("child_process");
  exec(`xdg-open ${server}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error : ${error.message}`);return;
    } if (stderr) {
      console.log(`stderr : ${stderr.message}`);return;
    }
    console.log(stdout);
  });
}

app.listen(8000, () => {
  console.log("\x1b[0;91m[*] \x1b[0;92mStarting Server at \x1b[3;97mhttp://localhost:\x1b[9;94m8000\x1b[0m");
  main();
});
