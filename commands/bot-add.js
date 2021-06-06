const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "bot-add",
	run: async(client, message, args) => {
      const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
	 

	  if(message.channel.id !== client.settings.addChannel) return message.channel.send(embed.setDescription(`This Command Only <#${client.settings.addChannel}> You can use it on your channel!`));
	  
	  let botID = args[0];
      if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Please enter the ID of the bot you wish to add."));
	  let discordBot = null;
      try {
		  discordBot = await client.users.fetch(botID);
	  }	catch {
          return message.channel.send(embed.setDescription("I Could Not Find Such A Bot."));
	  }		

	  if(!discordBot.bot) return message.channel.send(embed.setDescription("Please Enter Bot ID, Do Not Enter User ID!"));
	  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  
 
	  if(bot) {
		let member = await client.users.fetch(bot.owner);
        return message.channel.send(`**${discordBot.username}** Name Bot to the System **${member.username}** Added By Status; **${bot.status}**`)
	 }
	
	  db.add(`serverData.${message.guild.id}.waitSize`, 1)
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.owner`,  message.author.id)
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Beklemede")
	  
      let sira = db.fetch(`serverData.${message.guild.id}.waitSize`) || 0;
	   
	message.guild.channels.cache.get(client.settings.logChannel).send(
	  embed
	  .setDescription(`A Bot Has Been Added To The System, A Total In Order With This Bot **${sira}** Bot Available!`)
	  .addField("**About Submitted**",`${message.author} (**${message.author.tag}**)`)
	  .addField("**About the Bot**", `\`${discordBot.tag}\`(**${discordBot.id}**)`)
	  )
        message.react(client.settings.emoji)
  }
}
