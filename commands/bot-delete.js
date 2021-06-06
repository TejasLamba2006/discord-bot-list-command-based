const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "bot-delete",
	run: async(client, message, args) => {
	
    	let botID = args[0]
		
	    const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	    .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())
		
	    if(!message.member.roles.cache.has(client.settings.modRole)) return message.channel.send(embed.setDescription("Sorry, You Do Not Have The Permission To Use This Command"))
	    if(message.channel.id !== client.settings.processChannel) return message.channel.send(embed.setDescription(`This Command Only <#${client.settings.processChannel}> You can use it on your channel!`));
   
		 if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Please enter the ID of the bot whose profile you want to view."));
		
		 let bot = db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	     let discordBot = null;
         try {
	    	 discordBot = await client.users.fetch(botID);
	     }	catch {
            return message.channel.send(embed.setDescription("I Could Not Find Such A Bot."));
	     }	
		 
		 if(!bot) return message.channel.send(embed.setDescription(`In the system **${discordBot.username}** I Could Not Find The Bot Name.`))
    
    if(bot.status == "Approved") db.subtract(`serverData.${message.guild.id}.succSize`, 1)
	  if(bot.status == "Pending")  db.subtract(`serverData.${message.guild.id}.waitSize`, 1)
	  if(bot.status == "Denied")  db.subtract(`serverData.${message.guild.id}.redSize`, 1)
    
    db.delete(`serverData.${message.guild.id}.botsData.${botID}`);
     message.react(client.settings.emoji)
    return message.channel.send(embed.setDescription(`**${discordBot.username}** The Bot name was deleted from the system
.`))
  }
}
