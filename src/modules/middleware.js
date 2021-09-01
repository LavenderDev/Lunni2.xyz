const sessions = require(`./sessions`)
const users = require(`../data/schemas/users`)

module.exports.updateUser = async (req, res, next) => {
     try {
       const key = res.cookies.get('key')
         ?? req.get('Authorization');
       if (key) {
         const { authUser } = await sessions.get(key);
         res.locals.user = authUser;
       }
     } finally {
       return next();
     }
};

 
module.exports.validateUser = async (req, res, next) => {
  if (res.locals.user) {
    const userData = await users.findOne({ discordId: res.locals.user.id })
    if (!userData) {
      await users.create({
        discordId: res.locals.user.id,
        username: res.locals.user.username,
        avatarUrl: res.locals.user.avatarUrl(),
        discriminator: res.locals.user.discriminator
      })
    } else {
      await users.findOneAndUpdate({ discordId: res.locals.user.id },
        {
          discordId: res.locals.user.id,
          username: res.locals.user.username,
          avatarUrl: res.locals.user.avatarUrl(),
          discriminator: res.locals.user.discriminator
      })
    }
    next()
  } else {
    res.render("errors/401")
  }
};

module.exports.updateGuilds = async (req, res, next) => {
  try {
    const key = res.cookies.get('key')
      ?? req.get('Authorization');
    if (key) {
      const { guilds } = await sessions.get(key);
      res.locals.guilds = guilds;
    }
  } finally {
    return next();
  }
};

/*module.exports.getUserGuilds = async (req, res, next) => {
  try {
    bot.guilds.cache.forEach((g) => {
      let totalUserGuilds = []
      const member = g.members.cache.find(m => m.id === res.locals.user.id)
      if (member) {
        if (g.members.cache.get(res.locals.user.id).permissions.has("ADMINISTRATOR")) {
          totalUserGuilds.push(g)
        }
      }

      res.locals.meGuilds = totalUserGuilds
    })
    next()
  } catch (err) {
    res.render("errors/404")
  }
}


module.exports.validateUserPerms = async (req, res, next) => {
  const guild = bot.guilds.cache.get(req.params.id)
  if (guild) {
    if (guild.members.cache.get(res.locals.user.id).permissions.has("ADMINISTRATOR")) {
      next()
    } else {
      res.render("errors/404")
    }
  } else {
    res.render("errors/404")
  }
}

module.exports.validateGuild = async (req, res, next) => {
  res.locals.guild = bot.guilds.cache.find(g => g.id === req.params.id)
  return (res.locals.guild)
    ? next()
    : res.render('errors/404');
};

*/