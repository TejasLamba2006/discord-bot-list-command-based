const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "bot-profile",
	run: async(client, message, args) => {
	let botID = args[0]
	const embed = new Discord.MessageEmbed()
	.setColor("BLUE")
	.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	.setTimestamp()
	.setFooter(client.user.username, client.user.avatarURL())
	 if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Please Enter The ID Of The Bot You Want To Check The Profile"));
	 let bot = db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	 let discordBot = null;
	 try {
		 discordBot = await client.users.fetch(botID);
	 }	catch {
		return message.channel.send(embed.setDescription("I Could Not Find Such A Bot."));
	 }	
	 
	 if(!bot) return message.channel.send(embed.setDescription(`In the system **${discordBot.username}** I Could Not Find The Bot Name.`))
	   let ownerName = await client.users.fetch(bot.owner);
	  embed.addField("Bot Name/ID", `\`${discordBot.username}\`(**${discordBot.id}**)`)
	  .addField("Bot Owner",`\`${ownerName.username}\`(**${ownerName.id}**)`)
	  .addField("Bot Status", 
	  bot.status == "Approved" && !message.guild.members.cache.get(botID) 
	  ? "Approved (Not Attached on Server!)" 
	  : bot.status == "Denied" && message.guild.members.cache.get(botID)  
	  ? "Denied (Attached on Bot Server)"  
	  : bot.status == "Pending"  && message.guild.members.cache.get(botID)
	  ? "Pending (Attached on Bot Server)"
	  : bot.status)
	  if(bot.status == "Denied") embed.addField("Denied Why", `\`${bot.redReason}\``)
	 message.channel.send(embed)
  }
}
