const router = require("express").Router();
const ytsearch = require('yt-search')
require("dotenv").config();
const fetch = require('node-fetch')

router.get("/", (req, res) => {
     res.header("Content-Type",'application/json');
     res.json(({"Support Server": "https://discord.gg/ksWSgnp8cz",
     "API endpoints": {
          "Images": [
               "/gif/kiss",
               "/gif/hug",
               "/gif/smile",
               "/gif/sleep",
               "/gif/yawn",
               "/gif/search/<text>",
          ],
          "Other": [
               "/youtube/<search>",
               "/define/<word>"
          ]
     }}))
});





router.get("/youtube/:title", async (req, res) => {
  const search = req.params.title
  const video = (await ytsearch(search)).videos[0]
  if (!video) return res.json({ message: "No search found!", status: res.statusCode.toString() })
  const { title, url, image, thumbnail, seconds, timestamp, ago, views, description } = video
  res.json({
    title: title,
    url: url,
    image: image,
    thumbnail: thumbnail,
    seconds: seconds,
    timestamp: timestamp,
    created: ago,
    views: views,
    description: description
  })
})

router.get("/define/:word", (req, res) => {
  let query = req.params.word
  let link = `https://api.urbandictionary.com/v0/define?term=${query}`
  fetch(link)
    .then((res) => res.json())
    .then((json) => {
      let list = json.list[0]
      if (list.length <= 0) {
       return res.json({message: "No search found!", status: res.statusCode.toString()})
      }
      if (list.definition === "[gone]") {
       return res.json({message: "No search found!", status: res.statusCode.toString()})
      }
      res.json(
      { word: list.word, example: list.example, author: list.author, thumbs_up: list.thumbs_up, thumps_down: list.thumps_down, definition: list.definition}
    )
  })
})

router.get("/gif/kiss", (req, res) => {
  let query = "anime kiss";
  let finder = query.split(/ +/).join("+");
  let link = `https://g.tenor.com/v1/search?q=${finder}&key=${process.env.tenorApiKey}&limit=10000`;

  fetch(link)
    .then((res) => res.json())
    .then((json) => {
      let ar = [];
      json.results.forEach((r) => {
        r.media.forEach((m) => {
          ar.push(m.gif.url);
        });
      });
      const response = ar[Math.floor(Math.random() * ar.length)];
      res.json({ url: response, Credits: "Powered by tenor" });
    });
});

router.get("/gif/hug", (req, res) => {
  let query = "anime hug";
  let finder = query.split(/ +/).join("+");
  let link = `https://g.tenor.com/v1/search?q=${finder}&key=${process.env.tenorApiKey}&limit=10000`;

  fetch(link)
    .then((res) => res.json())
    .then((json) => {
      let ar = [];
      json.results.forEach((r) => {
        r.media.forEach((m) => {
          ar.push(m.gif.url);
        });
      });
      const response = ar[Math.floor(Math.random() * ar.length)];
      res.json({ url: response, Credits: "Powered by tenor" });
    });
});

router.get("/gif/sleep", (req, res) => {
  let query = "anime sleep";
  let finder = query.split(/ +/).join("+");
  let link = `https://g.tenor.com/v1/search?q=${finder}&key=${process.env.tenorApiKey}&limit=10000`;

  fetch(link)
    .then((res) => res.json())
    .then((json) => {
      let ar = [];
      json.results.forEach((r) => {
        r.media.forEach((m) => {
          ar.push(m.gif.url);
        });
      });
      const response = ar[Math.floor(Math.random() * ar.length)];
      res.json({ url: response, Credits: "Powered by tenor" });
    });
});

router.get("/gif/smile", (req, res) => {
  let query = "anime sleep";
  let finder = query.split(/ +/).join("+");
  let link = `https://g.tenor.com/v1/search?q=${finder}&key=${process.env.tenorApiKey}&limit=10000`;

  fetch(link)
    .then((res) => res.json())
    .then((json) => {
      let ar = [];
      json.results.forEach((r) => {
        r.media.forEach((m) => {
          ar.push(m.gif.url);
        });
      });
      const response = ar[Math.floor(Math.random() * ar.length)];
      res.json({ url: response, Credits: "Powered by tenor" });
    });
});

router.get("/gif/yawn", (req, res) => {
  let query = "anime yawn";
  let finder = query.split(/ +/).join("+");
  let link = `https://g.tenor.com/v1/search?q=${finder}&key=${process.env.tenorApiKey}&limit=10000`;

  fetch(link)
    .then((res) => res.json())
    .then((json) => {
      let ar = [];
      json.results.forEach((r) => {
        r.media.forEach((m) => {
          ar.push(m.gif.url);
        });
      });
      const response = ar[Math.floor(Math.random() * ar.length)];
      res.json({ url: response, Credits: "Powered by tenor" });
    });
});

router.get("/gif/search/:query", (req, res) => {
  let query = req.params.query;
  let finder = query.split(/ +/).join("+");
  let link = `https://g.tenor.com/v1/search?q=${finder}&key=${process.env.tenorApiKey}&limit=10000`;

  fetch(link)
    .then((res) => res.json())
    .then((json) => {
      let ar = [];
      json.results.forEach((r) => {
        r.media.forEach((m) => {
          ar.push(m.gif.url);
        });
      });
      const response = ar[Math.floor(Math.random() * ar.length)];
      res.json({ url: response, Credits: "Powered by tenor" });
    });
});

module.exports = router;
