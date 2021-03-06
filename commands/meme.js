const https = require("https");
const { MessageEmbed } = require("discord.js");
const url = "https://www.reddit.com/r/meme/hot/.json?limit=100";
module.exports = {
  name: "meme",
  category: "Fun",
  description: "Get a random meme.",
  execute(message, args) {
    https.get(url, (result) => {
      var body = "";
      result.on("data", (chunk) => {
        body += chunk;
      });

      result
        .on("end", () => {
          var response = JSON.parse(body);
          var index =
            response.data.children[Math.floor(Math.random() * 99) + 1].data;

          if (index.post_hint !== "image") {
            var text = index.selftext;
            const textembed = new MessageEmbed()
              .setTitle(subRedditName)
              .setColor("DARK_ORANGE")
              .setDescription(`[${title}](${link})\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`)
              .setFooter("Not associated with RoboLiam.");

            message.channel.send(textembed);
          }

          var image = index.preview.images[0].source.url.replace("&amp;", "&");
          var title = index.title;
          var link = "https://reddit.com" + index.permalink;
          var subRedditName = index.subreddit_name_prefixed;

          if (index.post_hint !== "image") {
            const textembed = new MessageEmbed()
              .setTitle(subRedditName)
              .setColor("DARK_ORANGE")
              .setDescription(`[${title}](${link})\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`)
              .setFooter("Not associated with RoboLiam.");

            message.channel.send(textembed);
          }
          const imageembed = new MessageEmbed()
            .setTitle(subRedditName)
            .setImage(image)
            .setColor("DARK_ORANGE")
            .setDescription(`[${title}](${link})`)
            .setURL(`https://reddit.com/${subRedditName}`)
            .setFooter("Not associated with RoboLiam.");
          message.channel.send(imageembed);
        })
        .on("error", console.error);
    });
  },
};
