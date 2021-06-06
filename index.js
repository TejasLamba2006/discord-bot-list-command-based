const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL }, disableMentions: 'everyone'});
const db = require('quick.db');


client.commands = new Map();
console.log("These are the Commands Activated") 
 fs.readdir('./commands', (err, files) => {
   files.forEach(file => {
	 if(file.endsWith(".js")){
	  var command = require(`./commands/${file}`);
	  console.log(command.name)
	   client.commands.set(command.name, command)
	 }
   })	
   console.log("Commands Loaded.")   
 })
 
client.settings = {
    prefix: "REPLACE_PREFIX",
    token: "REPLACE_TOKEN",
    addChannel: "ADD_CHANNEL_ID",
    logChannel :"LOG_CHANNEL_ID",
    modRole: "BOT_TESTER_CHANNEL_ID",	
    processChannel: "TESTING_CHANNEL_ID",
    emoji: "☑️",
    devRole: "DEVOLOPER_ROLE_ID"
    
 }
 
client.on('ready', () => {
	client.user.setStatus('online');
    client.user.setActivity(`${client.settings.prefix}help`, {type: "PLAYING"});
    console.log(`Bot is Online Coded By Msv`)
})

client.on('message', async message => {
	if(message.author.bot || !message.guild) return;
	let prefix = client.settings.prefix;
    if(message.channel.id == (client.settings.addChannel || null)) message.delete({timeout: 3000})
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ /g)
	var argCommand = args.shift().toLowerCase()

    const command = client.commands.get(argCommand);

    if(command){
      if(!client.settings.addChannel || !client.settings.logChannel || !client.settings.modRole || !client.settings.processChannel || !client.settings.emoji || !client.settings.devRole){
		return message.channel.send(`All Settings Required To Use Bot.`)
	  }
	  command.run(client, message, args)
	}
})

client.on('guildMemberRemove', async member => {
	member.guild.members.cache.filter(s => db.fetch(`serverData.${member.guild.id}.botsData.${s.id}`)).forEach(x => {
      let bot = db.fetch(`serverData.${member.guild.id}.botsData.${x.id}`);
	  if(bot){
	  if(bot.owner == member.id){
             member.guild.members.ban(x, {reason: "Owner Left Server."})
	     db.set(`serverData.${member.guild.id}.botsData.${x.id}.status`, "Denied")
	     db.set(`serverData.${member.guild.id}.botsData.${x.id}.redReason`, "Owner Left Server.")
	  }
    }
  })
})

client.login("REPLACE_TOKEN")

