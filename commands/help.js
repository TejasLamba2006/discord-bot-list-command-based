const Discord = require('discord.js');

module.exports = {
	name: "help",
	run: (client, message, args) => {
     var prefix = client.settings.prefix;
     const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setDescription("If the Owner of the Bot that Inserted It Leave the Server, the Bot is Banned Automatically.")
	 .addField("User Commands", `\`${prefix}bot-add\`,\`${prefix}bot-profile\`,\`${prefix}bot-info\`,\`${prefix}help\``)
	 .addField("Authorized Commands", `\`${prefix}bot-approve\`,\`${prefix}bot-reject\`,\`${prefix}reference-list\`,\`${prefix}bot-delete\`,\`${prefix}check\``)
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
	 return message.channel.send(embed)
  }
}
