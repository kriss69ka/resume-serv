const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

const createUser = require("./createUser.js");

const app = express();
app.use(bodyParser.json());

const adapter = new FileAsync("db.json");
low(adapter)
  .then(db => {
    app.get("/user/:id", (req, res) => {
      const userInDb = db
        .get("users")
        .find({ id: req.params.id })
        .value();

      if (userInDb) {
        return res.json({
          result: true,
          userInfo: userInDb
        });
      } else {
        return res.json({
          userInDb: false,
          userId: req.params.id
        });
      }
    });

    app.post("/regUser", (req, res) => {
      const user = req.body.userInfo;
      const userInDb = db
        .get("users")
        .find({ id: user.uid })
        .value();

      if (req.body.userInfo) {
        if (userInDb) {
          return res.json({
            alreadyRegistered: true
          });
        } else {
          db.set(`users.${user.uid}`, createUser(user)).write();
          return res.json({
            registered: true,
            id: user.uid
          });
        }
      }
      res.json({
        result: false
      });
    });

    app.post("/edit", (req, res) => {
      const user = req.body.userInfo;
      db.set(`users.${user.id}`, user).write();
      res.json({
        result: true
      });
    });

    return db.defaults({ users: [] }).write();
  })
  .then(() => {
    app.listen(3000, () => console.log("listening on port 3000"));
  });
