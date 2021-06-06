const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "bot-chart",
	run: (client, message, args) => {
	 let succSize = db.get(`serverData.${message.guild.id}.succSize`) || 0;
	 let waitSize = db.get(`serverData.${message.guild.id}.waitSize`) || 0;
	 let redSize = db.get(`serverData.${message.guild.id}.redSize`) || 0;
	   
	 const embed = new Discord.MessageEmbed()
	  .setColor("BLUE")
	  .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	  .setTimestamp()
	  .setDescription(`Total Bots; **${succSize + waitSize + redSize}**\nApproved Bots; **${succSize}**\nWaiting Bots; **${waitSize}**\nDenied Bots; **${redSize}**`)
	  .setFooter(client.user.username, client.user.avatarURL())
     message.channel.send(embed)
  }
}
