const router = require('express').Router()
const middleware = require(`../../modules/middleware`)
const user = require(`../../data/schemas/users`)

router.get("/", (req, res) => {
     res.render("pages/home", { user: res.locals.user })
    
})

router.get("/me", middleware.validateUser, async (req, res) => {
     const userData = await user.findOne({ discordId: res.locals.user.id })
     const { userNickname, userDesc, userPronouns } = userData['settings']
     
     res.render("pages/user", {
          premiumUser: userData.premiumUser,
          nickname: userNickname,
          desc: userDesc,
          pronoun: userPronouns
     })
})


router.put("/me/:module", middleware.validateUser, async (req, res) => {
     const userData = await user.findOne({ discordId: res.locals.user.id })
     const { module } = req.params
     let nick
     let desc
     let pronouns
     if (req.body.userNickname === "") {
          nick = userData['settings'].userNickname
     } else {
          if (req.body.userNickname.split("").length >= 15) {
               nick = req.body.userNickname.slice(15) + "..."
          } else {
               nick = req.body.userNickname
          }
     }
     if (req.body.userDesc === "") {
          desc = userData['settings'].userDesc || "Unknown"
     } else {
          desc = req.body.userDesc
     }
     if (req.body.userPronouns === "Unknown") {
          pronouns = userData['settings'].userPronouns || "Unknown"
     } else {
          pronouns = req.body.userPronouns
     }
     let data = {
          userNickname: nick,
          userDesc: desc,
          userPronouns: pronouns
     }

     userData[module] = data
     await userData.save();
     res.redirect(`/user/${res.locals.user.id}`)
})

router.get("/user", middleware.validateUser, async (req, res) => {
     const userData = await user.findOne({ discordId: res.locals.user.id })
     res.render("pages/profile", {
          desc: userData['settings'].userDesc,
          pronoun: userData['settings'].userPronouns,
          nickname: userData['settings'].userNickname,
          user: res.locals.user,
          userData: userData
     })
})

router.get("/user/:id", async (req, res) => {
     const userData = await user.findOne({ discordId: req.params.id })
     if (!userData) {
          res.render("errors/404")
     } else {
          res.render("pages/profile", {
               desc: userData['settings'].userDesc,
               pronoun: userData['settings'].userPronouns,
               nickname: userData['settings'].userNickname,
               user: res.locals.user,
               userData: userData
          })
     }

})


router.get(["/support", "/server"], (req, res) => {
     res.redirect("https://discord.gg/ksWSgnp8cz")
})
module.exports = router;