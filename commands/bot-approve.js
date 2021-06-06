const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "bot-approve",
	run: async(client, message, args) => {
     const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())

	  if(!message.member.roles.cache.has(client.settings.modRole)) return message.channel.send(embed.setDescription("Sorry, You Do Not Have The Permission To Use This Command"))
      if(message.channel.id !== client.settings.processChannel) return message.channel.send(embed.setDescription(`You can only <#${client.settings.processChannel}> ,You can use it on your channel!`));
	  let botID = args[0];
      if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Specify the ID of the Bot you want to confirm."));
	  
	  let discordBot = null;
      try {
		  discordBot = await client.users.fetch(botID);
	  }	catch {
          return message.channel.send(embed.setDescription("I Could Not Find Such A Bot."));
	  }	
	
	  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  if(!bot) return message.channel.send(embed.setDescription(`**${discordBot.username}** Named Bot Has Not Been Added To The System Before.`));
	 	

      if(bot.status == "Approved") {
		  if(!message.guild.members.cache.get(botID)){
			  return message.channel.send(embed.setDescription(`**${discordBot.username}** The Bot Is Approved But Not Available On The Server!`))
		  }
		   return message.channel.send(embed.setDescription(`**${discordBot.username}** The Bot Is Already Approved!`))
	  }
	  let memberData = await client.users.fetch(bot.owner)

      if(!message.guild.members.cache.get(bot.owner)) return message.channel.send(embed.setDescription(`**${memberData.username}** The Bot Cannot Be Approved Because The Named User Exits The Server!`));
	 message.guild.members.cache.get(bot.owner).roles.add(client.settings.devRole)
    if(bot.status == "Pending")  db.subtract(`serverData.${message.guild.id}.waitSize`, 1)
	  if(bot.status == "Denied")  db.subtract(`serverData.${message.guild.id}.redSize`, 1)
	  db.add(`serverData.${message.guild.id}.succSize`, 1);
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Approved")
	   message.react(client.settings.emoji)
	  message.guild.channels.cache.get(client.settings.logChannel).send(
	  embed.setDescription(`${memberData} (**${memberData.tag}**) Name User \`${discordBot.tag}\`(**${discordBot.id}**) Named Bot Approved!`)
	  )
  }
}
