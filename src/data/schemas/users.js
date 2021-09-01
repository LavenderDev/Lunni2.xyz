const { model } = require("mongoose")

class GeneralModule {
     userNickname = "Unknown";
     userDesc = "Unknown";
     userPronouns = "Unknown";
}
   
module.exports = model('Users', {
     discordId: String,
     username: String,
     avatarUrl: String,
     discriminator: String,
     premiumUser: { type: Boolean, default: false },
     staff: { type: Boolean, default: false },
     settings: { type: Object, default: new GeneralModule() }
});
