const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "bot-reject",
	run: async(client, message, args) => {
      const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())

	  if(!message.member.roles.cache.has(client.settings.modRole)) return message.channel.send(embed.setDescription("Sorry, You Do Not Have The Permission To Use This Command"))
	  if(message.channel.id !== client.settings.processChannel) return message.channel.send(embed.setDescription(`This Command Only <#${client.settings.processChannel}> You can use it on your channel!`));
      let botID = args[0];
      let redReason = args.slice(1).join(' ');
      if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Specify the ID of the Bot you want to reject."));
	  if(!redReason) return message.channel.send(embed.setDescription("Please Specify a Reason."));
	  
	  let discordBot = null;
      try {
		  discordBot = await client.users.fetch(botID);
	  }	catch {
          return message.channel.send(embed.setDescription("I Could Not Find Such A Bot."));
	  }	
	  
	  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  if(!bot) return message.channel.send(embed.setDescription(`**${discordBot.username}** Name Bot Has Not Been Added To The System Before.`));

	  if(bot.status == "Denied")  return message.channel.send(embed.setDescription(`**${discordBot.username}** The Bot Name Is Already Denied!`))
	  if(bot.status == "Pending")  db.subtract(`serverData.${message.guild.id}.waitSize`, 1)
	  if(bot.status == "Approved")  db.subtract(`serverData.${message.guild.id}.succSize`, 1)
       let memberData = await client.users.fetch(bot.owner)
   
       if(message.guild.members.cache.get(bot.owner)) message.guild.members.cache.get(bot.owner).roles.remove(client.settings.devRole)
		   
	   db.add(`serverData.${message.guild.id}.redSize`, 1);
	   db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Denied")
	   db.set(`serverData.${message.guild.id}.botsData.${botID}.redReason`, redReason)
	  message.guild.channels.cache.get(client.settings.logChannel).send(
	   embed.setDescription(`${memberData} (Name User **${memberData.tag}**) Bot Name \`${discordBot.tag}\`(**${discordBot.id}**) Reason: \`${redReason}`)
	  
	  )
	   message.react(settings.emoji)
  }
}
