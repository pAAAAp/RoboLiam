const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "info",
  description: "Displays bot info.",
  execute(message, args) {
    const version = require("../version.json").version;
    const bot = require("../index.js");
    const webp = require("webp-converter");

    let serverCount;
    bot.guilds.cache.tap((coll) => {
      serverCount = coll.size;
    });

    let totalSeconds = bot.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    webp.cwebp(
      "https://top.gg/api/widget/694637394300895273.svg",
      "694637394300895273.png",
      "-q 80",
      function () {
        const Embed = new MessageEmbed()
          .setTitle("Bot Info")
          .setThumbnail(
            "https://cdn.discordapp.com/avatars/694637394300895273/84c7cbd530737d6f5a0b0edb660190a2.png"
          )
          .addField("Version", version)
          .addField("Servers", serverCount)
          .addField(
            "Uptime",
            `${days} days, ${hours} hours, ${minutes} minutes, and ${Math.round(
              seconds
            )} seconds.`
          )
          .setImage("694637394300895273.png");

        message.channel.send(Embed);
      }
    );
  },
};
