const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "reference-list",
	run: async(client, message, args) => {
	  const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
	 
	  if(!message.member.roles.cache.has(client.settings.modRole)) return message.channel.send(embed.setDescription("You Do Not Have The Required Permission To Use This Command"))

	  let obj = await db.get(`serverData.${message.guild.id}.botsData`) || {}
	  let veri = Object.keys(obj).map(botID => {
		return {
		  ID: botID,
		  durum: obj[botID].status
		};
	  }).filter(data => data.durum == "Pending")
	  if(veri.length <= 0) return message.channel.send(embed.setDescription("There are no bots currently pending")) 
	  
	 return message.channel.send(embed .setDescription(
	  `System Now Total **${veri.length}** Bot Approval Pending! \n\n`+
	  veri.map(data => `(**${data.ID}**) | [Botu Link (0)](https://discord.com/oauth2/authorize?client_id=${data.ID}&scope=bot&permissions=0) `).join("\n"))
	  )
  }
}
