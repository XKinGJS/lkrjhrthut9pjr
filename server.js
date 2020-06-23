const express = require("express");
const session = require("express-session");
const request = require("request");
const app = express ();
app.get ('/', (req, res) => {
res.sendStatus (200);
});
app.listen (process.env.PORT);
function m() {
request.get(`https://${process.env.PROJECT_DOMAIN}.glitch.me/`, (error, response, body) => {
let ff = body;
return ff
}
)}
setInterval(m, 60000); 

const Discord = require('discord.js');
const { Client, RichEmbed } = require("discord.js");
const client = new Client({ disableEveryone: false})
const botversion = require('./package.json').version;
const fs = require('fs');
const ms = require("ms");
const prefix = '#'
const devs = ['541532350719459348','99351862692544532']
client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})


client.on("message", async message => {
try {
const translate = require("google-translate-open-api").default;
const ISO = require("iso-639-1");
const slug = require("speakingurl");
  let prefix = "#";
  if (message.content.startsWith(prefix + "tr")) {
    
let args = message.content.split(/[ ]+/);
let lang = args[1];
let text = args.slice(2).join(" ");
var slugtr = slug(lang);
var language = ISO.getName(slugtr);
    if (!lang)return message.reply("Usage: `#translate <language code> [word]`\nEx: `#translate ar hello world`");
    if (!text)return message.reply("Please Write Your word, and try again");
    if (!language) return message.reply("Vaild Language Code");

let loading = await message.channel.send("Translating Your message...").catch(err => message.channel.send(err));
let result = await translate([text], {
      tld: "com",
      to: slugtr,
      format: "text",
      browers: true
    });
let data = result.data[0];

    if (!data)return message.reply("i can't Translate Now, Please try again later");

let embed = new Discord.RichEmbed()
        .setTitle(`Translator`)
        .setDescription(`language: **${language}**\nText: **${data}**`)
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/1200px-Google_Translate_logo.svg.png")
        .setFooter("Powered by: Google Translate | Request By: " + message.author.tag)
        .setColor("#66ccff");
loading.edit(embed);

}} catch (err) {
    message.channel.send(" " + err).catch();}
});

client.on("message", async message => {
  const request = require("request");

  let prefix = "#";
  var args = message.content.split(/[ ]+/);
  var loc = args[1];

if (message.content.startsWith(prefix + "weather")) {
    if (!loc) return message.reply("Usage: `#weather <capita|countryl>`");
    request({json: true, url: "http://api.weatherapi.com/v1/current.json?key=f7d7cad88f4549dbbd4141628202504&q=" + loc}, (err, res, json) => {
if (!json.location){message.reply("I can't find this location!");} 
else {
  
let embed = new Discord.RichEmbed()
            .setTitle(`Weather for ${json.location.name}`)
            .setDescription(`🗺️ Location: **${json.location.country} / ${json.location.name}**\n🌡️ Temperature: **${json.current.temp_c}°C** / **${json.current.temp_f}°F**\n💨 Wind: **${json.current.wind_kph}Km/h** | **${json.current.wind_mph}mph**\n😓 Humidity: **${json.current.humidity}%**\n📰 Condition: **${json.current.condition.text}**`)
            .setThumbnail("https:" + json.current.condition.icon)
            .setFooter(`Last Update at: ${json.current.last_updated} | Request by: ${message.author.tag}`)
            .setColor("#66ccff");
   message.channel.send(embed);

}});
  
}});



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity(' #help-me | Me Codes V5.0.2', { type: 'PLAYING' })
});

client.on('message' , async (message) => {
var prefix = "#"
    if(message.content.startsWith(prefix + "topinv")) {
if(message.author.bot) return;
if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
  var invites = await message.guild.fetchInvites();
    invites = invites.array();
 //   invites(invites, 'uses', { reverse: true });
    let possibleInvites = ['User Invited |  Uses '];
    invites.forEach(i => {
        if (i.uses === 0) {
            return;
        }
      possibleInvites.push(['\n\ ' +'<@'+ i.inviter.id +'>' + '  :  ' +   i.uses]);//ه
    })
    const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
    .addField("Top Invites." ,`${(possibleInvites)}`)
 
    message.channel.send(embed)
    }
});

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
if(message.content.startsWith(prefix + "topinv")) {
  message.guild.fetchInvites( ).then(i => {
    var invites = [ ];
    i.forEach(inv => { 
    var [invs,i]=[{},null];
      
  if(inv.maxUses) {
    invs[inv.code] =+ inv.uses+"/"+inv.maxUses;
  } else {
    invs[inv.code] =+ inv.uses;
  }
    invites.push(`invite: ${inv.url} inviter: ${inv.inviter} \`${invs[inv.code]}\`;`)
     
      let embed = new Discord.RichEmbed()
     .setColor("BLACK")
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
      .setDescription(`${invites.join(`\n`)+'\n\n **By:** '+ message.author}`)
      .setFooter(`${client.user.tag}`, `${client.user.avatarURL}`)
     message.channel.send(embed)

    })
  })
}
}) 

client.on('message',async message => {
	if (!message.guild || message.author.bot) return;
    var command = message.content.toLowerCase().split(" ")[0]; 
   var args = message.content.toLowerCase().split(" ");
   var user = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id === args[1]));
  
   if(command == prefix + '1topinv') {
       if(!args[1] !== 'invite')
       if(message.channel.type !== "text") return;
message.guild.fetchInvites().then(res => {
       let invs = new Discord.Collection();
       res.forEach(i => {
           if(!message.guild.member(i.inviter.id)) return;
           if(!invs.has(i.inviter.id)) invs.set(i.inviter.id, i.uses);
           else invs.set(i.inviter.id, invs.get(i.inviter.id)+i.uses);
       })
       let desc = "";

     
       console.log(invs.sort((a, b) => b - a))
       desc += invs.sort((a, b) => b - a).firstKey(10).map((id, index) => "#" + (index+1) + " | " + (message.guild.member(id) ? message.guild.member(id) : "``Unknown``") + " invites: `" + invs.sort((a, b) => b - a).array()[index] + "`").join("\n");
       let embed = new Discord.RichEmbed()
       .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
       .setTitle(" INVITES [ 1/1 ]")
       .setTimestamp()
       .setColor('Default')
       .setFooter(message.author.tag, message.author.avatarURL)
       .setDescription(desc);
       message.channel.send(embed);    
})
   }
       });


 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "Activation protection") {
		       if (message.author.id !== "541532350719459348") return message.channel.send(`<:694579706842054737:697941194017210398> | **Only an administrator should do protection**`)
 message.channel.sendMessage(`<:694579706842054737:697941194017210398> | ** تــم تـفـعـل الـحـمـايـة مـن الـحـاقـديـن ** <:694579680036257903:697941179270168578>`);
 
       
    }
}) 

const buy = JSON.parse(fs.readFileSync('./buy.json' , 'utf8'));
client.on('message',message =>{
   if(message.content.startsWith(prefix + '1buy role')){
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  let args = message.content.split(" ").slice(2).join(" ");
  if(!args) return message.channel.send(`🙄 Please Type the role Name/ID`);
  let role = message.guild.roles.find('name',args)||message.guild.roles.find('id',args);
  if(!role) return message.channel.send(`🙄 I Can't find this role`);
  buy[message.guild.id].role = role.id
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  message.channel.send(new Discord.RichEmbed()
  .setColor('#35393e').setFooter(message.author.tag,message.author.avatarURL).setTimestamp()
  .setAuthor('Change settings',message.guild.iconURL)
  .addField(`**Role Now**`,`**\`\`\`${role.name}\`\`\`**`,true)
  )
  }
  if(message.content.startsWith(prefix+'buy aaaa3')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  let args = message.content.split(" ").slice(2).join(" ");
  if(!args) return message.channel.send(`🙄 Please Type the role Price`)
  if(isNaN(parseInt(args))) return message.channel.send(`🙄 The price is wrong!`)
  if(parseInt(args)<0) return message.channel.send(`🙄 The price is wrong!`)
  buy[message.guild.id].price = args
  fs.writeFile("./buy.json", JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  message.channel.send(new Discord.RichEmbed()
  .setColor('#36393e').setFooter(message.author.tag,message.author.avatarURL).setTimestamp()
  .setAuthor('Change settings',message.guild.iconURL)
  .addField(`**Role Price Now**`,`**\`\`\`${args}$\`\`\`**`,true)
  )
  }
  if(message.content.startsWith(prefix+'1buy tran')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  let user = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[2])
  buy[message.guild.id].transfer = user.id
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  message.channel.send(new Discord.RichEmbed()
  .setColor('#36393e').setFooter(message.author.tag,message.author.avatarURL).setTimestamp()
  .setAuthor('Change settings',message.guild.iconURL)
  .addField(`**Trans To**`,`**${user}**`,true)
  )
  }
  if(message.content.startsWith(prefix+'1buy on')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  buy[message.guild.id].onoff = 'On'
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  let on1 = new Discord.RichEmbed()
  .setColor('#36393e')
  .setDescription(`**\`\`\`The BuyRole Has Been Enabled\`\`\`**`)
  message.channel.send(on1)
  }
  if(message.content.startsWith(prefix+'1buy off')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  buy[message.guild.id].onoff = 'Off'
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  let off1 = new Discord.RichEmbed()
  .setColor('#36393e')
  .setDescription(`**\`\`\`The BuyRole has been disabled\`\`\`**`)
  message.channel.send(off1)
  }
  if(message == prefix + 'buy enabled') {
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  let pp = buy[message.guild.id].price
  let brole = message.guild.roles.find('id',buy[message.guild.id].role)
  let btrans = buy[message.guild.id].transfer
  if(!brole) return message.channel.send(`🙁 Please setup the command again`)
  if(!message.guild.members.find('id',buy[message.guild.id].transfer))return message.channel.send(`🙁 Please setup the command again`)
  if(buy[message.guild.id].onoff === 'Off') return message.channel.send(`🙁 - the command has been disabled\nplease type __${prefix}buy on__ to turn it on`)
  if(message.author.id === buy[message.guild.id].transfer) return message.channel.send(`you can't buy a rank because you can't transfer credits to your self 🤗`)
  if(message.member.roles.find(r=>r.id == buy[message.guild.id].role)) return message.reply(`**You already have the rank \`${brole.name}\` ✅**`);
  message.channel.send(new Discord.RichEmbed()
  .setColor('#36393e')
  .addField(`**Command:**`, `**\`#credits ${message.guild.members.get(buy[message.guild.id].transfer)} ${buy[message.guild.id].price}\`**`)).then(msgs=>{
  let lPrice = Math.floor(pp-(pp*(5/100)));
  let filter = response => response.author.id == "567703512763334685" && response.mentions._content.includes(`:moneybag: | ${message.author.username}, has transferred \`$${lPrice}\` to <@${buy[message.guild.id].transfer}>`);
  message.channel.awaitMessages(filter, { maxMatches: 1, time: 240000, errors: ['time'] })
  .then( collected =>{
  let log = message.guild.channels.find("name", `❖・log・vip`);
  let gg = new Discord.RichEmbed()
  .setColor('#36393e')
  .setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588151955063570433/582096911448801288.png`)
  .setAuthor(`New purchase`,`https://cdn.discordapp.com/attachments/584630360017469461/584687464334098432/581239984376381455.gif`)
  .addField(`**User :**`,`${message.author.id}، ${message.author}`,true)
  .addField(`**Role :**`,`\`\`\`${brole.name}\`\`\``,true)
  .addField(`**💰 Rank Price :**`,`\`\`\`${buy[message.guild.id].price}$\`\`\``,true)
 .addField(`**💳 Transferd To :**`,`<@${buy[message.guild.id].transfer}>`,true)
  .addField(`**Date:**`,`\`\`\`${moment(message.author).format('DD/MM/YYYY')}\`\`\` `,true)
  .setTimestamp();
  if(log) log.send(gg)
  const done = new Discord.RichEmbed()
  .setColor('#36393e')
  .setDescription(`**\`\`\`Done Buy Role ${brole.name}\`\`\`**`)
  .setTimestamp();
  message.member.addRole(brole)
  message.channel.send(done);
 var mmm = setTimeout(() => {
message.member.removeRole(brole)
}, 2592000000)
  message.author.send(new Discord.RichEmbed()
  .setColor("#36393e")
  .setTitle('Role VIP')
  .setDescription(`\`\`\`RANK NAME: ${brole.name} RANK PRICE: ${buy[message.guild.id].price}$ \`\`\``)
  .setFooter(message.guild.name,message.guild.iconURL))
})
})
}  
});





client.on('message', message => {
    if(message.content.startsWith("#Me")) {
		if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
        let rank = message.guild.member(message.author).roles.find('name','⌥ Support');

  if (!rank) return message.channel.send('🛑 **| يجب ان تمتلك رتبة سبورت لأستخدام هذا الأمر.**');
     message.channel.send(`**
<:694579669265285180:697941169912545290>  | #js   =  <#709304920943099934>
<:694579669265285180:697941169912545290>  | #py   =  <#709305195229741117>
<:694579669265285180:697941169912545290>  | #html =  <#709305587984236581>
<:694579669265285180:697941169912545290>  | #php  =  <#709305822836162611> 
<:694579669265285180:697941169912545290>  | #css  =  <#709306486043574274> 
**`)
}})
          


client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'js')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・codes・js`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;
msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message.author.id;
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message.author.id;
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`|| <@&709430479983476787> ||
**\`Me Codes V5.0.2\`**
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
\`\`\`js
${thisMessage}\`\`\`
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
<:JavaScript:709433874345885697> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
 m.react("✅") 
m.react("❌")
})
})
})
})
})
})
})
})
})
}
});

client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'py')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・codes・py`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;
msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message.author.id;
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message.author.id;
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`|| <@&709430480231203264> ||
**\`Me Codes V5.0.2\`**
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
\`\`\`py
${thisMessage}\`\`\`
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
<:Python:709433871392833547> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
 m.react("✅") 
m.react("❌")
})

})
})
})
})
})
})
})
})
}
});

client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'html')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・codes・html`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;
msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message.author.id;
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message.author.id;
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`|| <@&709430480558358528> ||
**\`Me Codes V5.0.2\`**
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
\`\`\`js
${thisMessage}\`\`\`
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
<:HTML:709433871443427338> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
 m.react("✅") 
m.react("❌")
})
})
})
})
})
})
})
})
})
}
});


client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'php')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・codes・php`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;
msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message.author.id;
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message.author.id;
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`|| <@&709430480927457331> ||
**\`Me Codes V5.0.2\`**
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
\`\`\`js
${thisMessage}\`\`\`
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
<:PHP:709433871459942400> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
 m.react("✅") 
m.react("❌")
})
})
})
})
})
})
})
})
})
}
});

client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'css')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・codes・css`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;
msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message.author.id;
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message.author.id;
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`|| <@&709430481946673185> ||
**\`Me Codes V5.0.2\`**
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
\`\`\`js
${thisMessage}\`\`\`
<a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076><a:__:690216797894738076>
<:CSS:709433871388901418> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
 m.react("✅") 
m.react("❌")
})
})
})
})
})
})
})
})
})
}
});






/*var top = require("./top.json");
function save() {
    fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
    if (newMember.user.bot) return;
    if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
    if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
        "text": 0,
        "voice": parseInt(Math.random()*10),
        "msgs": 0,
        "id": newMember.user.id
    }
    save();
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
        var addXP = setInterval(async function () {
            top[newMember.guild.id][newMember.user.id].voice+=parseInt(Math.random()*4);
            save();
            if (!newMember.voiceChannel) {
                clearInterval(addXP);
            }
        }, 60000);
    }
});
client.on("message", async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!top[message.guild.id]) top[message.guild.id] = {};
    if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
        "text": parseInt(Math.random()*10),
        "voice": 1,
        "msgs": 0,
        "id": message.author.id
    }
    if (top[message.guild.id][message.author.id].msgs > 10) {
        top[message.guild.id][message.author.id].text += parseInt(Math.random()*4);
        top[message.guild.id][message.author.id].msgs = 0;
    }
    save();
    var args = message.content.split(" ");
    var cmd = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "top text")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${textStr}   \n\n\n **? | For More: \`${prefix}top text\`**`, true)  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send({
                embed: embed
            });
     //   if (!message.content.startsWith(prefix)) return;
  } else {
    if(message.content.startsWith(prefix + "top voice")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${voiceStr}   \n\n\n **:sparkles: More?** \`${prefix}top voice\``, true)
  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()  
            message.channel.send({
                embed: embed
            });
      
 
     //  break;
       // if (!message.content.startsWith(prefix)) return;
  } else {
       if(message.content.startsWith(prefix + "top")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()  
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
            .addField("**TOP 5 TEXT :speech_balloon:**", `${textStr}  \n\n  **:sparkles: More?** \`${prefix}top text\``, true)
            .addField("**TOP 5 VOICE :microphone2:**", `${voiceStr} \n\n **:sparkles: More?** \`${prefix}top voice\``, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("13B813");
            message.channel.send({
                embed: embed
            
  
            });

      
       
        }
  }
  }
  
});



client.on('message' , async (message) => {
var prefix = "#"
    if(message.content.startsWith(prefix + "topinv")) {
if(message.author.bot) return;
if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
  var invites = await message.guild.fetchInvites();
    invites = invites.array();
 //   invites(invites, 'uses', { reverse: true });
    let possibleInvites = ['User Invited |  Uses '];
    invites.forEach(i => {
        if (i.uses === 0) {
            return;
        }
      possibleInvites.push(['\n\ ' +'<@'+ i.inviter.id +'>' + '  :  ' +   i.uses]);//ه
    })
    const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
    .addField("Top Invites." ,`${(possibleInvites)}`)
 
    message.channel.send(embed)
    }
});

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
if(message.content.startsWith(prefix + "topinv")) {
  message.guild.fetchInvites( ).then(i => {
    var invites = [ ];
    i.forEach(inv => { 
    var [invs,i]=[{},null];
      
  if(inv.maxUses) {
    invs[inv.code] =+ inv.uses+"/"+inv.maxUses;
  } else {
    invs[inv.code] =+ inv.uses;
  }
    invites.push(`invite: ${inv.url} inviter: ${inv.inviter} \`${invs[inv.code]}\`;`)
     
      let embed = new Discord.RichEmbed()
     .setColor("BLACK")
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
      .setDescription(`${invites.join(`\n`)+'\n\n **By:** '+ message.author}`)
      .setFooter(`${client.user.tag}`, `${client.user.avatarURL}`)
     message.channel.send(embed)

    })
  })
}
}) 


client.on("message", message => {

            if (message.content.startsWith(prefix + "1111")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' '); 
  message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
})
 message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'online').size}\` : عدد الاعضاء المستلمين`); 
 message.delete(); 
};     
});

client.on('message',async message => {
	if (!message.guild || message.author.bot) return;
    var command = message.content.toLowerCase().split(" ")[0]; 
   var args = message.content.toLowerCase().split(" ");
   var user = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id === args[1]));
  
   if(command == prefix + 'topinv') {
       if(!args[1] !== 'invite')
       if(message.channel.type !== "text") return;
message.guild.fetchInvites().then(res => {
       let invs = new Discord.Collection();
       res.forEach(i => {
           if(!message.guild.member(i.inviter.id)) return;
           if(!invs.has(i.inviter.id)) invs.set(i.inviter.id, i.uses);
           else invs.set(i.inviter.id, invs.get(i.inviter.id)+i.uses);
       })
       let desc = "";

     
       console.log(invs.sort((a, b) => b - a))
       desc += invs.sort((a, b) => b - a).firstKey(10).map((id, index) => "#" + (index+1) + " | " + (message.guild.member(id) ? message.guild.member(id) : "``Unknown``") + " invites: `" + invs.sort((a, b) => b - a).array()[index] + "`").join("\n");
       let embed = new Discord.RichEmbed()
       .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
       .setTitle(" INVITES [ 1/1 ]")
       .setTimestamp()
       .setColor('Default')
       .setFooter(message.author.tag, message.author.avatarURL)
       .setDescription(desc);
       message.channel.send(embed);    
})
   }
       });*/
	   
	   
/*let current = 0;
const ticket = JSON.parse(fs.readFileSync("./ticket.json", 'utf8'));
client["on"]('message', message => {
if(message["content"]["startsWith"](prefix + "new")){
var numbers = [1, 2, 3, 4];
current++;
let reason = message["content"]["split"](" ").slice(1).join(" ")
let reassonnew = new Discord.RichEmbed()
.setColor('#36393e')
.setDescription(`**<a:579734284693405696:677203471908208694> | Please Type Reason Ticket**`);
if(!reason) return message["channel"].send(reassonnew);
let srole = message.guild.roles.find('name', `♛ •  Me ≫Support Ticket`)
message.guild.createChannel(`ticket-${current}`, "text").then(ticketx => {
let role = message.guild.roles.find("name", srole);
let role2 = message.guild.roles.find("name", "@everyone");
ticketx.overwritePermissions(role, {
SEND_MESSAGES: true,
READ_MESSAGES: true
});  
ticketx.overwritePermissions(role2, {
SEND_MESSAGES: false,
READ_MESSAGES: false
});
ticketx.overwritePermissions(message.author, {
SEND_MESSAGES: true,
READ_MESSAGES: true
});
const d1 = new Discord.RichEmbed()
.setDescription(`**<:580185227381702676:677203444788101170>  | Done Open your <#${ticketx.id}>**`)  
.setColor('BLACK')
message.channel.send(d1);
const nonedear = new Discord.RichEmbed()
.setDescription(`**This Member ${message.author} Was Open Ticket \n\n Reason: \`${reason}\` \n\n Wait For Support To Connect To You**`)
.setColor('BLACK')
.setFooter(`Me Codes` , client.user.avatarURL)
.setTimestamp();
ticketx.send(nonedear);
}).catch(console.error);
} else if (message.content.startsWith(prefix + 'close')) {          
let noperm = new Discord.RichEmbed()
.setColor('BLACK')
.setDescription(`<a:22:603398930528600095>  You Don't Have Permission`);
var perm = message.guild.member(message.author).hasPermissions('MANAGE_ROLES');
if(!perm) return message.channel.send(noperm)
if (!message.channel.name.startsWith(`ticket-`)) {
return
}  
else message.channel.delete()
fs.writeFile("./ticket.json", JSON.stringify(ticket), (err) => {
if(err) console.log(err)
})
}
})*/

/*
let rep = JSON.parse(fs.readFileSync("./rep.json", "utf8"));
client.on('message', message => { 
    if(!rep[message.author.id]) rep[message.author.id] = {
        repo: 0,
    }
    if(message.content.startsWith(prefix + 'thank')){
      if(!message.channel.guild) return;
                    moment.locale('en');
        let ment = message.mentions.users.first();
       var getvalueof;
       if(ment) {
           getvalueof = ment;
    } else {
           getvalueof = message.author;
    }
if(message.author.id === ment.id) return message.reply(`<a:579734284693405696:677203471908208694> | ** Can't thank yourself **`);
            rep[getvalueof.id].repo += 1; 
message.channel.send(`<a:568120432948150273:677203429507989573> | **${message.author.username} He Thanked ${getvalueof.username}**`)
      let send = new Discord.RichEmbed()
      .setColor('#36393e')
      .setDescription(`\`\`\`
Name Member: ${message.author.tag} \n\nSupport: ${getvalueof.tag} \n\nReason Thanked: Support Help Member
\`\`\``)
      client.channels.get('700113091878191205').send(send)
        
       }
    fs.writeFile('./rep.json', JSON.stringify(rep), (err) => {
     if(err) throw err.message + ' '+err.file;
 })
});
client.on('message', message => {
if (message.content.startsWith(prefix + 'my')) {
let men = message.mentions.users.first();
let userData = rep[message.author.id];
if(!men){
let embed = new Discord.RichEmbed()
.setAuthor(`${message.author.username}`, message.author.avatarURL)
.setColor('#36393e')
.setDescription(`\`\`\`js
Thanks: ${userData.repo}
\`\`\``)
.setTimestamp()
.setFooter(`${message.author.username}`, message.author.avatarURL)
message.channel.sendEmbed(embed)
} else if (men){
let userData2 = rep[message.mentions.users.first().id]
let embed2 = new Discord.RichEmbed()
.setAuthor(`${men.username}`, men.avatarURL)
.setColor('#36393e')
.setDescription(`\`\`\`js
Thanks: ${userData2.repo}
\`\`\``)
.setTimestamp()
.setFooter(`${men.username}`, men.avatarURL)
message.channel.send(embed2)
}
}
});

*/



client.on('message',async message => {
let args = message.content.split(" ")
let mention = message.mentions.users.first() || message.guild.members.get(args[1])
if(message.content.startsWith("#قبول")) {
let role = message.guild.roles.find(r => r.name === `⌥ Support`)
if(!message.channel.guild) return;
let acRoom = message.guild.channels.find('name', '❖・acceptance・support');
if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
if(!mention) return message.reply("**Please Mention**");
message.channel.send(`> **Done Accept <#691338063233810452>**`)
acRoom.send(`> **  ${mention} Hello, Kia Support has been accepted into the server <@682738973772480512> ** | <a:22:603398930528600095>`)
mention.addRole(role)
}
});

client.on('message',async message => {
let args = message.content.split(" ")
let mention = message.mentions.users.first() || message.guild.members.get(args[1])
if(message.content.startsWith("#رفض")) {
if(!message.channel.guild) return;
let acRoom = message.guild.channels.find('name', '❖・acceptance・support');
if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
if(!mention) return message.reply("**Please Mention**");
message.channel.send(`> **Done Refusal <#691338063233810452>**`)
acRoom.send(`> ** ${mention} You have been rejected ** | <a:593078070760439808:603398933976449024>`)
}
});



client.on ("guildMemberAdd", member => {
  
   var role = member.guild.roles.find(role => role.name === "⌥ Members");
   member.addRole(role);
  
})






let devs2 = ['541532350719459348','599351862692544532','513432487771504658']
client.on("message", async message => {
  var prefix = "1";
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "bc")) {
      if (!devs2.includes(message.author.id)) return message.channel.send(`**بس  عمك بس هو اللي يرسل برودكاست**`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    message.channel
      .send(
        ">>> **[1] All Members :hourglass:  \n[2] Online Members :hourglass:  \n[3] For Roles :hourglass:  \n[0] Closed  :lock:**"
      )
      .then(m => {
        message.channel
          .awaitMessages(msg => msg.author.id === message.author.id, {
            max: 1,
            time: 1000 * 60 * 2,
            errors: ["time"]
          })
          .then(c => {
            if (c.first().content === "1") {
              message.guild.members.forEach(m => {
                m.send(`${args}\n`).catch(err => {
                  if (err) throw err;
                });
              });
              c.first().delete();
              m.delete();
              message.channel.send(
                "**Successfuly Shared :white_check_mark: **"
              );
            }
            if (c.first().content === "2") {
              message.guild.members
                .filter(m => m.presence.status !== "offline")
                .forEach(m => {
                  m.send(`${args}\n`).catch(err => {
                    if (err) throw err;
                  });
                });
              c.first().delete();
              m.delete();
              message.channel.send("**Successfuly Shared :white_check_mark: **");
            }
            if (c.first().content == "0") {
              c.first().delete();
              m.delete();
              message.channel.send("**Successfuly Shared :white_check_mark: **");
            }
            if (c.first().content === "3") {
              m.edit("**>>> Type Role**").then(ms => {
                message.channel
                  .awaitMessages(msg => msg.author.id === message.author.id, {
                    max: 1,
                    time: 1000 * 60 * 2,
                    errors: ["time"]
                  })
                  .then(c => {
                    let role = message.guild.roles.find(
                      role => role.name === c.first().content
                    );
                    if (!role)
                      return message.channel
                        .send(
                          "**:x: Can't Find Role :x:**"
                        )
                        .then(() => {
                          ms.delete();
                          c.first().delete();
                        });
                    let roleID = role.id;
                    message.guild.roles.get(roleID).members.forEach(m => {
                      m.send(`${args}\n`).catch(err => {
                        if (err) throw err;
                      });
                    });
                    c.first().delete();
                  m.delete();
                    message.channel.send("**Successfuly Shared :white_check_mark: **");
                  });
              });
            }
          })
          .catch(() => m.delete());
      });
  } else if (message.content.startsWith(prefix + "setname")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "") return;
    client.user.setUsername(args);
    message.channel.send(`Successfuly Changeed To..**${args}** `);
  } else if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "") return;
    client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
    message.channel.send(`**Successfuly Changeed To ${args}** `);
  }
});






client.on('message', message => {
if (message.author.x5bz) return;
if (!message.content.startsWith(prefix)) return;

let command = message.content.split(" ")[0];
command = command.slice(prefix.length);

let args = message.content.split(" ").slice(1);

if (command == "ban") {
             if(!message.channel.guild) return message.reply('** هذا الأمر شغال فقط في السيرفرات**');
       
if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("** ` BAN_MEMBERS ` You do not have a feature **");
if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("** ` BAN_MEMBERS ` The bot does not have a property**");
let user = message.mentions.users.first();
let reason = message.content.split(" ").slice(2).join(" ");
if (message.mentions.users.size < 1) return message.reply("<:581966414576091146:677203428119805983> | **The person's origin **");
if(!reason) return message.reply ("<:694579652425023509:697941165592281098> | **Write down the reason**");
if (!message.guild.member(user)
.bannable) return message.reply("<a:579734284693405696:677203471908208694> | ** Member rank higher than bot cannot be dismissed **");

message.guild.member(user).ban(7, user);
  	message.channel.send('<a:555:700115961608536184> | ** The flight has arrived **');


const banembed = new Discord.RichEmbed()
.setAuthor(`BANNED!`, user.displayAvatarURL)
.setColor("RANDOM")
.setTimestamp()
.addField("<:379673174494806019:677203441776459795>  | **Labeled person** : ",  '**[ ' + `${user.tag}` + ' ]**')
.addField("<:391322002692112384:677203465742843912> | **By:** : ", '**[ ' + `${message.author.tag}` + ' ]**')
.addField("<:694579706842054737:697941194017210398> | **Reason:**", '**[ ' + `${reason}` + ' ]**')
client.channels.find("name",'❖・log').send
};
});

client.on('message', message => {
if (message.author.x5bz) return;
if (!message.content.startsWith) return;

let command = message.content.split(" ")[0];


let args = message.content.split(" ").slice(1);

if (command == "بان") {
             if(!message.channel.guild) return message.reply('** هذا الأمر شغال فقط في السيرفرات**');
       
if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("** ` BAN_MEMBERS ` You do not have a feature **");
if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("** ` BAN_MEMBERS ` The bot does not have a property**");
let user = message.mentions.users.first();
let reason = message.content.split(" ").slice(2).join(" ");
if (message.mentions.users.size < 1) return message.reply("<:581966414576091146:677203428119805983> | **The person's origin **");
if(!reason) return message.reply ("<:694579652425023509:697941165592281098> | **Write down the reason**");
if (!message.guild.member(user)
.bannable) return message.reply("<a:579734284693405696:677203471908208694> | ** Member rank higher than bot cannot be dismissed **");

message.guild.member(user).ban(7, user);
  	message.channel.send('<a:555:700115961608536184> | ** The flight has arrived **');


const banembed = new Discord.RichEmbed()
.setAuthor(`BANNED!`, user.displayAvatarURL)
.setColor("RANDOM")
.setTimestamp()
.addField("<:379673174494806019:677203441776459795>  | **Labeled person** : ",  '**[ ' + `${user.tag}` + ' ]**')
.addField("<:391322002692112384:677203465742843912> | **By:** : ", '**[ ' + `${message.author.tag}` + ' ]**')
.addField("<:694579706842054737:697941194017210398> | **Reason:**", '**[ ' + `${reason}` + ' ]**')
client.channels.find("name",'❖・log').send
};
});


////الحمايه من الروابط مع الغاء وتفعيل
let spread = JSON.parse(fs.readFileSync('./spread.json' , 'utf8'));


client.on('message', message => {
    if(message.content.startsWith(prefix + "antispread off")) {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
spread[message.guild.id] = {
onoff: 'Off',
}
     
message.channel.send(`**⛔ The AntiSpread Is __𝐎𝐅𝐅__ !**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
        client.on('message', message => {
    if(message.content.startsWith(prefix + "antispread on")) {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
spread[message.guild.id] = {
onoff: 'On',
}
     
message.channel.send(`**✅ The AntiSpread Is __𝐎𝐍__ !**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
    client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.gmail.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});

client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.snapchat.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'

            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.instagram.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.twitter.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.facebook.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});



client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.youtube.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});

client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.discordapp.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://discord.gg/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});



////توب انفايت وانفو انفايت واكس بي






/*level code
const xp = JSON.parse(fs.readFileSync('./xp.json' , 'utf8'));
client.on('message', message => {
let xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if (!xp[message.author.id]) {
    xp[message.author.id] = {
        xp: 0,
        level: 1
    };
}


let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp = curxp + xpAdd;
if (nxtLvl <= xp[message.author.id].xp) {
    xp[message.author.id].level = curlvl + parseInt(1);
    let lvlup = new Discord.RichEmbed()
        .setTitle("Level Up!")
        .addField("Congrats to", `${message.author}`)
        .setColor("#08ff00")
        .addField("New Level", curlvl + parseInt(1));

    message.channel.send(lvlup).then(msg => {
        msg.delete(5000)
    });
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            if (err) console.log(err)
    })
  })*/

client.on('message',message =>{
    if(message.content.startsWith(prefix + 'topinvites')) {
      
  message.guild.fetchInvites().then(i =>{
  var invites = [];
   
  i.forEach(inv =>{
    var [invs,i]=[{},null];
     
    if(inv.maxUses){
        invs[inv.code] =+ inv.uses+"/"+inv.maxUses;
    }else{
        invs[inv.code] =+ inv.uses;
    }
        invites.push(`invite: ${inv.url} inviter: ${inv.inviter} \`${invs[inv.code]}\`;`);
   
  });
  var embed = new Discord.RichEmbed()
  .setColor("#000000")
  .setDescription(`${invites.join(`\n`)+'\n\n**By:** '+message.author}`)
           message.channel.send({ embed: embed });
   
  });
   
    }
  });




client.on('message', message => {
if(message.content === prefix + 'invite-info') {
		let oi = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;
		let Tag = message.mentions.users.first() ? message.mentions.users.first().tag : message.author.tag;
		let Username = message.mentions.users.first() ? message.mentions.users.first().username : message.author.username;
		let Avatar = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL;
		
		message.guild.fetchInvites().then(invs => {
			let member = client.guilds.get(message.guild.id).members.get(oi);
			let personalInvites = invs.filter(i => i.inviter.id === oi);
			let urll = invs.filter(i => i.inviter.id === oi);
			let link = urll.reduce((p , v) => v.url +` , Total de membros recrutados no convite: ${v.uses}.\n`+ p, `\nServidor: ${message.guild.name} \n `);
			let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
			let inviteCode = personalInvites.reduce((p, v) => v.code);
			let possibleInvites = [['Total de membros recrutados:']];
			possibleInvites.push([inviteCount, inviteCode]);
			let user = message.mentions.users.first() || message.author;
			let mem = message.guild.member(user);
			let millisJoined = new Date().getTime() - mem.joinedAt.getTime();
			let daysJoined = millisJoined / 1000 / 60 / 60 / 24;
			
			var inviteInfo = new Discord.RichEmbed()
			.setTitle(`:incoming_envelope: **[INVITE INFO]** ${Username}`)
			.setThumbnail(client.user.avatarURL)
			.addField('**الدعوات**', `** ↝** [ شخص **${Number(inviteCount)}** ]`)
			.addField('**تم الانضمام للسيرفر من**', `** ↝** [ يوم **${daysJoined.toFixed(0)}** ]`)
			.addField('**رابط دعوة الانضمام**', `** ↝** [ **${inviteCode || 'Zm2U6we'}** ]`)
			.setColor('#36393e')
			.setTimestamp()
			.setFooter(Tag, Avatar)
			
			message.channel.send(inviteInfo);
    })
			
                                      
                                      
                                      };
});






////اعطاء وسحب رولات


client.on("message", message => {
	var args = message.content.split(' ').slice(1); 

	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
  let roleremove = new Discord.RichEmbed()
  .setDescription(`
  أمثله على الأوامر : 
  ${prefix}roleremove @mention rolename : \`لسحب رتبة لعضو معين\`
  ${prefix}roleremove all rolename : \`لسحب رتبة للجميع\` 
  ${prefix}roleremove humans rolename : \`لسحب رتبة للاشخاص فقط\`
  ${prefix}roleremove bots rolename : \`لسحب رتبة لجميع البوت\``);
  let roleadd = new Discord.RichEmbed()
   .setDescription(`
  أمثله على الأوامر : 
  ${prefix}role @mention rolename : \`لأعطاء رتبة لعضو معين\`
  ${prefix}role all rolename : \`لأعطاء رتبة للجميع\` 
  ${prefix}role humans rolename : \`لأعطاء رتبة اعضاء معينن \`
  ${prefix}role bots rolename : \`لأعطاء رتبة لجميع البوتات\``)
	if( !msg.startsWith(`${prefix}role`)) return;
          if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
              if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But I Dont Have Permission** `MANAGE_GUILD`' );
let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy `Premium`")
      
    // if(!premium.includes(message.guild.id)) return message.channel.send(embed); else
  
	if( msg.toLowerCase().startsWith(`${prefix}roleremove` )){
    
    let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy `Premium`")
      
    // if(!premium.includes(message.guild.id)) return message.channel.send(embed); else
		if( !args[0] ) return message.channel.send(roleremove);
		if( !args[1] ) return message.channel.send(roleremove);
 //if(!message.guild.channel) return message.reply("hi")
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.channel.send(roleremove);if( message.mentions.members.first() ){

			message.mentions.members.first().removeRole( role1 );
			//return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');

      const e = new Discord.RichEmbed()
    
      
             .setDescription(':white_check_mark:** Change Role For **'+args[0]+'**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
             .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
             .setColor('BLACK')
              message.channel.send(e)
		}
		if( args[0].toLowerCase() == "all" ){
      

      const e1 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`All\`\`**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.channel.send(e1)
		} else if( args[0].toLowerCase() == "bots" ){
      

      const e2 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Bots\`\`**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.channel.send(e2)
		} else if( args[0].toLowerCase() == "humans" ){

      const e3 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Humans\`\`**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.channel.send(e3)
		} 	
	} else {
		if( !args[0] ) return message.channel.send(roleadd);
		if( !args[1] ) return message.channel.send(roleadd);
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.channel.send(roleadd);if( message.mentions.members.first() ){

			message.mentions.members.first().addRole( role1 );
			//return message.reply(`**:white_check_mark: \`\`[ ${role1.name} ]\`\` رتبة \`\`[ ${args[0]} ]\`\` لقد تم اعطاء **`);
     const e = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **'+args[0]+'**,** '+'**'+'+'+'`'+' '+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
            message.channel.send(e)
     
     
     
      
		}
		if( args[0].toLowerCase() == "all" ){
      

       const e1 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`All\`\`**,** '+'**'+'+'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.channel.send(e1)
		} else if( args[0].toLowerCase() == "bots" ){
      

      const e2 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Bots\`\`**,** '+'**'+'+'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.channel.send(e2)
		} else if( args[0].toLowerCase() == "humans" ){
      

       const e3 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Humans\`\`**,** '+'**'+'+'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.channel.send(e3)
		} 
	} 
});



const bot = client
bot.mutes = require("./mutes.json")
client.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`)
    bot.setInterval(() => {
        for (let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let member = bot.mutes[i].muted
            let mutereason = "Mute time is over"
            if (Date.now() > time) {
                bot.guilds.get(bot.mutes[i].guildid).members.get(`${member}`).removeRole(bot.mutes[i].roleid, mutereason)
                delete bot.mutes[i];
                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), (err) => {
                    if (err) throw err;
                    console.log(`${bot.users.get(member).username} has been unmuted`)
                })
            }
        }
    }, 5000)
})
bot.on("guildMemberAdd", async (member) => {
    for (let i in bot.mutes) {
        let data = bot.mutes[i];
        if (data === undefined) return;
        if (data.guildid !== member.guild.id) return;
        let mutereason = "ليه تهرب "
        let guildID = bot.mutes[i].guildid;
        if (member.id === bot.mutes[i].muted) {
            bot.guilds.get(`${guildID}`).members.get(`${member.id}`).addRole(`${bot.mutes[i].roleid}`, mutereason)
        } else {
            return;
        }
    }
})
client.on('message', async message => {
    let prefix = "#"//تقدر تعدل البيرفيكس
    let messageArray = message.content.split(' ')
    let args = messageArray.slice(1)
    let cmd = messageArray[0]
    if (cmd === `${prefix}mute`) {
        message.delete();
      
  if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(':no_entry: | You dont have **MUTE_MEMBERS** Permission!');
      if(!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) return message.channel.send(':no_entry: | I dont have **MUTE_MEMBERS** Permission!');
        let themuteguy = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!themuteguy) return message.channel.send("**الرجاء وضع المنشن**").then(msg => msg.delete(8000))
        if (themuteguy.id == message.author.id) return message.reply('انت لاتستطيع اعطاء ميوت لنفسك :eyes:  ')
        let roleid = message.guild.roles.find(c => c.name === "Muted")
        if (!roleid) return message.reply(`Please use \`${prefix}setup\` first`)
        let mutereason = args.join(" ").slice(25)
        if (!mutereason) return message.reply(`\`Write: ${prefix}mute mention time reason\``)
        let time = args[1]
        if (ms(time) > 2.592e+9) return message.reply('ما تقدر تعطي لشخص ميوت اكثر من 30 ايام') 
        if (themuteguy.roles.has(roleid.id)) return message.channel.send("هذا الشخص معه ميوت بالفعل")
        bot.mutes.count++ + 1
        if (isNaN(bot.mutes.count)) bot.mutes.count = 0 + 1;
        bot.mutes[bot.mutes.count] = {
            time: Date.now() + ms(time),
            muted: themuteguy.id,
            roleid: roleid.id,
            guildid: message.guild.id
        }
        await message.guild.member(themuteguy.id).addRole(roleid.id, mutereason)
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            if (err) throw err;
            message.reply(`Done <@!${themuteguy.id}> Has been muted!`).then(msg => msg.delete(20000))
            let muteembed = new Discord.RichEmbed()//اللوق
                .setAuthor("log")
                .setColor("#FFFFFF")
                .setTimestamp()
                .addField("For:", `${themuteguy} \`(${themuteguy.id})\``)
                .addField("By:", `${message.author} \`(${message.author.id})\``)
                .addField("Reason:", mutereason)
                .addField("Time", `${ms(ms(time), { long: true })}`)
            let mutechannel = bot.channels.find(c => c.name === "log")//تقدر تغير اللوق من هنا 
            if (!mutechannel) return;
            mutechannel.send(muteembed)
        })
    }
    if (cmd == `${prefix}unmute`) {
         if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(':no_entry: | You dont have **MUTE_MEMBERS** Permission!');
      if(!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) return message.channel.send(':no_entry: | I dont have **MUTE_MEMBERS** Permission!');
        let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tounmute) return message.reply('**منشن شخص لأعطائه ميوت**')
        let muterole = message.guild.roles.find(c => c.name == 'Muted')
        if (!muterole) {
            aaa = await message.guild.createRole({
                name: "Muted",
                permissions: []
            });
        }
        if(!tounmute.roles.has(muterole.id)) return message.reply('هو ليس عنده ميوت !')
        for(var i in bot.mutes) {
            let data = bot.mutes[i];
            if(data.muted == tounmute.id && data.guild == message.guild.id){
            message.guild.members.get(`${tounmute.id}`).removeRole(message.guild.roles.find(c => c.name == 'Muted'), "Unmute command")
            delete bot.mutes[i];
            }
        }
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            message.channel.send('Done')
            if (err) throw err;
        })
    }
    if (cmd == `${prefix}setup`) { // الكوماند هذا لو انت سويت كاتقوري جديد وسويت فيه شانلات جديدة مو موجود فيها منع للميوت اكتب الكوماند ذا
      
        let role = message.guild.roles.find(c => c.name === "Muted")
        if (!role) {
            muterole = await message.guild.createRole({
                name: "Muted",
                permissions: []
            });
        }
        message.guild.channels.forEach(async (channel) => {
            await channel.overwritePermissions(role.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
        message.channel.send('Done')
    }
})



























///// - قـائـمـة الـكوادت 





//////////////////////////// - قــائــمــة الــرئــيــســة - /////////////////////////////


	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
<:694579669265285180:697941169912545290> | ~~#~~ 1 - \` #help-js \` <a:525837021558865961:677203465646243844> \`Javascript list \` <:2_:597778055188185150>

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` #help-py \` <a:525837021558865961:677203465646243844> \` Python List \` <:5_:597778029099352075>

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` #help-html \` <a:525837021558865961:677203465646243844> \` Html list \` <:4_:597778036171079681>
 
<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` #help-php \` <a:525837021558865961:677203465646243844> \` Php list \` <:1_:597778061995278360>

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` #help-css \` <a:525837021558865961:677203465646243844> \` Css list \` <:3_:597778047416008704>

<:694579669265285180:697941169912545290> | ~~#~~ 6 - \` #help-mine \` <a:525837021558865961:677203465646243844> \` Minecraft menu \` <a:580460324608671744:594959116599033857> **`);
 
 
    }
}) 


//////////////////////////// - قــائــمــة قــســم الــجــافــا- /////////////////////////////


 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`** 
 
<:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-source \` <a:525837021558865961:677203465646243844> \` قسم السورس \` <:694579720972533806:697941198228160512> 

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-admin \` <a:525837021558865961:677203465646243844> \` قسم الأكواد الإدارية \` <:694579714378956871:697941196475072523>

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-general \` <a:525837021558865961:677203465646243844> \` قسم الأكواد العامة \` <:580185227381702676:677203444788101170>

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-welcome \` <a:525837021558865961:677203465646243844> \` قسم أكواد الترحيب \` <a:9_:674311890524176384>

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-help \` <a:525837021558865961:677203465646243844> \` قسم أكواد الهلب \` <a:34:674311916931383363>

<:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-js-games \` <a:525837021558865961:677203465646243844> \` قسم أكواد  العاب \` <a:558950229437710337:594176088612274196>

<:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-js-music \` <a:525837021558865961:677203465646243844> \` قسم أكواد الميوزك \` <a:5_:674311882756194355>

<:694579669265285180:697941169912545290> | ~~#~~ 8 - \` ${prefix}help-js-islam \` <a:525837021558865961:677203465646243844> \`  قسم أكواد الاسلامية \` <a:2_:674311882340827167>

<:694579669265285180:697941169912545290> | ~~#~~ 9 - \` ${prefix}help-js-own \` <a:525837021558865961:677203465646243844> \` قسم اكواد اصحاب البوت \` <:694579680321208401:697941179173437470>

<:694579669265285180:697941169912545290> | ~~#~~ 10 - \` ${prefix}help-js-other \` <a:525837021558865961:677203465646243844> \` قسم أكواد منوعة \` <a:1_:674311239845019659>

<:694579669265285180:697941169912545290> | ~~#~~ 11 - \` ${prefix}help-js-bc \` <a:525837021558865961:677203465646243844> \` قسم أكواد البرودكاست \` <a:wewewewewewe:677203437569703946>

**`);
 
       
    }
}) 




//////////////////////////// - قــســم أكــواد الــســورس - /////////////////////////////


 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-source") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`** 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-source-1 \` <a:525837021558865961:677203465646243844> \` كود السورس الأساسي \`  
 
 <:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-source-2 \` <a:525837021558865961:677203465646243844> \` السورس الأساسي مع الستريمنق ومعلومات البوت \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-source-3 \` <a:525837021558865961:677203465646243844> \` السورس الأساسي مع الواتشينق \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-source-4 \` <a:525837021558865961:677203465646243844> \` السورس الاساسي مع البنق \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-source-5 \` <a:525837021558865961:677203465646243844> \` السورس الاساسي مع معلومات البوت المطور و الستريم \` 
** `);
 
       
    }
}) 


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-source-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود السورس الأساسي

<a:28:674311913576071179> | __C__ode : https://4cash.me/source-code

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم السورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
 
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-source-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : السورس الأساسي مع الستريمنق ومعلومات البوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/Basi-fence-bot-information

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم السورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
  
  
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-source-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : السورس الأساسي مع الواتشينق

<a:28:674311913576071179> | __C__ode : https://4cash.me/The-basic-source-file-with

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم السورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});  
  
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-source-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : السورس الاساسي مع البنق

<a:28:674311913576071179> | __C__ode : https://4cash.me/The-main-source-file-with

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم السورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-source-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : السورس الاساسي مع معلومات البوت المطور و الستريم

<a:28:674311913576071179> | __C__ode : https://4cash.me/The-basic-sourceforce-2

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم السورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});





//////////////////////////// - قـــســم أكــواد لادارية - /////////////////////////////





 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`** 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-admin-1 \` <a:525837021558865961:677203465646243844> \` كود الباند \`  
 
 <:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-admin-2 \` <a:525837021558865961:677203465646243844> \` كود الكيك \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-admin-3 \` <a:525837021558865961:677203465646243844> \` كود مسح الشات مع عدد وشبيه بالبروبوت \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-admin-4 \` <a:525837021558865961:677203465646243844> \` كود فتح وتقفيل الشات \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-admin-5 \` <a:525837021558865961:677203465646243844> \` كود رابط يرسله خاص ل 100شخص لمدة 24 ساعه \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-js-admin-6 \` <a:525837021558865961:677203465646243844> \`  كود لانشاء شات كتابي \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-js-admin-7 \` <a:525837021558865961:677203465646243844> \` كود لانشاء روم صوتي \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 8 - \` ${prefix}help-js-admin-8 \` <a:525837021558865961:677203465646243844> \` invite : كود دعوه البوت مثال \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 9 - \` ${prefix}help-js-admin-9 \` <a:525837021558865961:677203465646243844> \` كود الاوتو رول التفعيل داخل السيرفر \` ** `);
 
       
    }
}) 

 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 <:694579669265285180:697941169912545290> | ~~#~~ 10 - \` ${prefix}help-js-admin-10 \` <a:525837021558865961:677203465646243844> \` كود مانع بوتات النشر \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 11 - \` ${prefix}help-js-admin-11 \` <a:525837021558865961:677203465646243844> \` كود يمسح الي ينشر في سيرفرك و ياخد ميوت \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 12 - \` ${prefix}help-js-admin-12 \` <a:525837021558865961:677203465646243844> \` كود يمنع نشر الروابط \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 13 - \` ${prefix}help-js-admin-13 \` <a:525837021558865961:677203465646243844> \` كود تفعيل برياكشن \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 14 - \` ${prefix}help-js-admin-14 \` <a:525837021558865961:677203465646243844> \` كود تفعيل بامر \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 15 - \` ${prefix}help-js-admin-15 \` <a:525837021558865961:677203465646243844> \` كود الوران \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 16 - \` ${prefix}help-js-admin-16 \` <a:525837021558865961:677203465646243844> \` كود بان صوتي و فكه \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 17 - \` ${prefix}help-js-admin-17 \` <a:525837021558865961:677203465646243844> \` كود كيك صوتي \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 18 - \` ${prefix}help-js-admin-18 \` <a:525837021558865961:677203465646243844> \` كود ديفن و ان ديفن \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 19 - \` ${prefix}help-js-admin-19 \` <a:525837021558865961:677203465646243844> \` كود منع السب \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 20 - \` ${prefix}help-js-admin-20 \` <a:525837021558865961:677203465646243844> \` كواد رد تلقائى \` **`);
 
       
    }
}) 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الباند

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-1

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});  
  
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الكيك

<a:28:674311913576071179> | __C__ode :  https://4cash.me/codes-2

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
  
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود مسح الشات براكشن

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-3

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
 
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود فتح وتقفيل الشات

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-4

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : د رابط يرسله خاص ل 100شخص لمدة 24 ساعه

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-5

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لانشاء شات كتابي

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-6

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لانشاء روم صوتي

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-7

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
  

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-8") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : invite : كود دعوه البوت مثال

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-8

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-9") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الاوتو رول التفعيل داخل السيرفر

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-9

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-10") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود مانع بوتات النشر

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-10

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-11") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود منع نشر السيرفرات و اخد ميوت في سيرفرك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-11

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-12") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود منع نشر الروابط بكل انواعها

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-12

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-13") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود تفعيل برياكشن

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-13

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-14") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود تفعيل بامر

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-14

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-15") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الوران

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-15

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-16") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود باند صو فكه

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-16

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-17") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود كيك فويس

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-17

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-18") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ديفن و ان ديفن

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-18

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-19") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : منع السب

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-19

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-admin-20") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : رد تلقائى

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-20

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد الإدارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

client.on('message', msg => {
    if (msg.content === 'هلا') {
      msg.reply('**__هــلا بــك ياغــالــى__**');
    }
  });




//////////////////////////// - قــســم أكـــواد الــعــامــه - /////////////////////////////






 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`** 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-general-1 \` <a:525837021558865961:677203465646243844> \` كود بنق \`  
 
 <:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-general-2 \` <a:525837021558865961:677203465646243844> \` كود لم تنمشن لى البوت يرد عليك بى help \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-general-3 \` <a:525837021558865961:677203465646243844> \` كود التصويتات مثل برو بوت \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-general-4 \` <a:525837021558865961:677203465646243844> \` كود معلومات السيرفر \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-general-5 \` <a:525837021558865961:677203465646243844> \` كود المعلومات الشخصية \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-js-general-6 \` <a:525837021558865961:677203465646243844> \` كود معلومات البوت مثل اس بوت \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-js-general-7 \` <a:525837021558865961:677203465646243844> \` id كود \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 8 - \` ${prefix}help-js-general-8 \` <a:525837021558865961:677203465646243844> \` كود rep \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 9 - \` ${prefix}help-js-general-9 \` <a:525837021558865961:677203465646243844> \` كود عمل روم فويس اونلاين \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 12 - \` ${prefix}help-js-general-10 \` <a:525837021558865961:677203465646243844> \` كود افتار مثل برو بوت \`

 <:694579669265285180:697941169912545290> | ~~#~~ 11 - \` ${prefix}help-js-general-11 \` <a:525837021558865961:677203465646243844> \` كودالوان مثل برو بوت \`

 <:694579669265285180:697941169912545290> | ~~#~~ 12 - \` ${prefix}help-js-general-12 \` <a:525837021558865961:677203465646243844> \` كود مسح الشات بعدد وبدون عدد \` **`);
 
       
    }
}) 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود البنق

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-21

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لم تنمشن لى البوت يرد عليك بى help

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-22

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود التصويتات مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-23

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود معلومات السيرفر

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-24

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود المعلومات الشخصية

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-25

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود معلومات البوت مثل اس بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-26

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : id كود

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-27

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-8") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود rep

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-28

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-9") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود عمل روم فويس اونلاين

<a:28:674311913576071179> | __C__ode :https://4cash.me/codes-29

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-10") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود افتار مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-30

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-11") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الوان مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-31

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-general-12") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود مسح بعدد او بدون عدد مثل البروبوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-32

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم الأكواد العامة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});



//////////////////////////// - قــســم أكــواد تــرحــيــب - /////////////////////////////




 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`** 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-welcome-1 \` <a:525837021558865961:677203465646243844> \` كود ترحيب مع ذكر رقم العضو \`  
 
 <:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-welcome-2 \` <a:525837021558865961:677203465646243844> \` كود الترحيب مع صورة \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-welcome-3 \` <a:525837021558865961:677203465646243844> \` كود مغادرة العضو \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-welcome-4 \` <a:525837021558865961:677203465646243844> \` كود تم دعوته بواسطة \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-welcome-5 \` <a:525837021558865961:677203465646243844> \` كود ترحيب بامبد و مغادره كذلك \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-js-welcome-6 \` <a:525837021558865961:677203465646243844> \` كود ترحيب بصوره + invited by \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-js-welcome-7 \` <a:525837021558865961:677203465646243844> \` كود ترحيب معريب \` **`)
 
 
       
    }
}) 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ترحيب بصورة

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-33

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الترحيب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الترحيب في الخاص مع رقم العضو

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-34

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الترحيب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود مغادرة العضو

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-35

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الترحيب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود تم دعوته بواسطة

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-36

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الترحيب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ترحيب بامبد و مغادره كذلك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-37

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الترحيب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});



  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ترحيب بصوره + invited by 

<a:28:674311913576071179> | __C__ode :https://4cash.me/codes-38

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الترحيب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-welcome-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ترحيب معريب

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-39

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الترحيب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});





//////////////////////////// - قــســم أكـــواد الــهــلــب - /////////////////////////////





 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`** 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-help-1 \` <a:525837021558865961:677203465646243844> \` كود هلب مع امبد يرسل بنفس الشات \`  
 
 <:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-help-2 \` <a:525837021558865961:677203465646243844> \` كود هلب مزخرف بدون امبد ويرسل عالخاص \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-help-3 \` <a:525837021558865961:677203465646243844> \` كود بامبد علي الخاص \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-help-4 \` <a:525837021558865961:677203465646243844> \` كود هلب برياكشن \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-help-5 \` <a:525837021558865961:677203465646243844> \` كود هلب 3 صفحات برياكشن \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-js-help-6 \` <a:525837021558865961:677203465646243844> \` كود هلب متعدد \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-js-help-7 \` <a:525837021558865961:677203465646243844> \` كود هلب متعدد اللغات \` **`)
 
 
       
    }
}) 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود هلب مع امبد يرسل بالخاص

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-40

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الهلب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود هلب بدون امبد ويرسل عالخاص

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-41

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الهلب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود بامبد علي الخاص*

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-42

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الهلب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود هلب برياكشن

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-43

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الهلب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود هلب 3 صفحات برياكشن

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-44

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الهلب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود هلب متعدد

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-45

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الهلب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-help-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود هلب متعدد اللغات

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-46

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الهلب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});



//////////////////////////// - قــســم أكـــواد الــعــاب - ///////////////////////////// 






 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`** 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-games-1 \` <a:525837021558865961:677203465646243844> \` لعبة اسئلة فورت نايت \`  
 
 <:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-games-2 \` <a:525837021558865961:677203465646243844> \` كود لعبة صراحة \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-games-3 \` <a:525837021558865961:677203465646243844> \` كود لعبة كت تويت \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-games-4 \` <a:525837021558865961:677203465646243844> \` لعبة لو خيروك \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-games-5 \` <a:525837021558865961:677203465646243844> \` لعبة مريم \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-js-games-6 \` <a:525837021558865961:677203465646243844> \` لعبة عقاب \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-js-games-7 \` <a:525837021558865961:677203465646243844> \` لعبة فكك تحتاج جيسون \` 
 
 <:694579669265285180:697941169912545290> | ~~#~~ 8 - \` ${prefix}help-js-games-8 \` <a:525837021558865961:677203465646243844> \` لعبة قرعة \`
 
 <:694579669265285180:697941169912545290> | ~~#~~ 9 - \` ${prefix}help-js-games-9 \` <a:525837021558865961:677203465646243844> \` لعبة اكس او \`
 
 <:694579669265285180:697941169912545290> | ~~#~~ 10 - \` ${prefix}help-js-games-10 \` <a:525837021558865961:677203465646243844> \` لعبة اسرع كتابة \` ** `)
    
    }
}) 

 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 11 - \` ${prefix}help-js-games-11 \` <a:525837021558865961:677203465646243844> \` لعبة عواصم \`

<:694579669265285180:697941169912545290> | ~~#~~ 12 - \` ${prefix}help-js-games-12 \` <a:525837021558865961:677203465646243844> \` لعبة pupg \`

<:694579669265285180:697941169912545290> | ~~#~~ 13 - \` ${prefix}help-js-games-13 \` <a:525837021558865961:677203465646243844> \` كود احصائيات فورت نايت \`

<:694579669265285180:697941169912545290> | ~~#~~ 14 - \` ${prefix}help-js-games-14 \` <a:525837021558865961:677203465646243844> \` لعبة انمي \`

<:694579669265285180:697941169912545290> | ~~#~~ 15 - \` ${prefix}help-js-games-15 \` <a:525837021558865961:677203465646243844> \` لعبة زاحف  \`
**`)
 
    }
}) 


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود اسئلة لعبة فورت نايت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-47

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة صراحة

<a:28:674311913576071179> | __C__ode :https://4cash.me/codes-48

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة كت تويت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-49

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة لو خيروك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-50

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
  if (message.author.bot) return;
   if (message.content === prefix + "help-js-games-5") {
	   if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
   message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');
         
message.author.sendMessage(`
❖ **كود لعبة مريم**
https://4cash.me/codes-51
`);

  }
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة عقاب

<a:28:674311913576071179> | __C__ode :https://4cash.me/codes-52

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة فكك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-53

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-8") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود قرعة

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-54

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-9") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة اكس او

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-55

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-10") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة اسرع كتابة

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-56

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-11") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : لعبة عواصم 

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-57

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-12") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود PUPG

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-58

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-13") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود احصائيات فورت نايت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-59

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-14") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : لعبة انمي

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-60

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-games-15") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد لعبه الزحف

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-61

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد  العاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});




//////////////////////////// - قــســم أكـــواد الـمـيـوزك - /////////////////////////////




 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-music") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-music-1 \` <a:525837021558865961:677203465646243844> \` كود الميوزك بالارقام \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-music-2 \` <a:525837021558865961:677203465646243844> \` كود ميوزك جافا \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-music-3 \` <a:525837021558865961:677203465646243844> \` كود الميوزك المتداول في الجيت هب \`

**`)
 
    }
}) 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-music-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الميوزك بالارقام

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-62

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الميوزك

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-music-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ميوزك جافا

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-63

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الميوزك

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
 
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-music-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ميوزك المتداول في الجت هب 

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-64

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الميوزك

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


//////////////////////////// - قــســم أكـــواد الاسلامية - /////////////////////////////





 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-islam") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-islam-1 \` <a:525837021558865961:677203465646243844> \` د القران الكريم (25 سورة ) ـ \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-islam-2 \` <a:525837021558865961:677203465646243844> \` كود الاذكار \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-islam-3 \` <a:525837021558865961:677203465646243844> \` كود صفحات القران الكريم \`

**`)
 
    }
}) 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-islam-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : القران الكريم (25 سورة ) ـ

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-65

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الاسلامية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-islam-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الاذكار

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-66

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الاسلامية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
 
  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-islam-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود صفحات القران الكريم

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-67

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد الاسلامية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});



//////////////////////////// - قــســم أكـــواد الـصــحـاب الـبـوتات - /////////////////////////////





 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-own") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-own-1 \` <a:525837021558865961:677203465646243844> \` كود ست برفكس \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-own-2 \` <a:525837021558865961:677203465646243844> \` كود اذا جت البوت رسالة بالخاص تنرسل لك \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-own-3 \` <a:525837021558865961:677203465646243844> \` الصورة - الاسم - البلاينق \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-own-4 \` <a:525837021558865961:677203465646243844> \` كود اذا احد كلمة البوت يرسل لك في الخاص \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-own-5 \` <a:525837021558865961:677203465646243844> \` كواد رسال الى صاحب بوت \`

**`)
 
    }
}) 



  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-own-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ست برفكس

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-68

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد اصحاب البوت

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-own-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود اذا جت البوت رسالة بالخاص تنرسل لك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-69

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد اصحاب البوت

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-own-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود التحكم في حالات البوت الصورة - الاسم - البلاينق

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-70

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد اصحاب البوت

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-own-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود اذا احد كلمة البوت يرسل لك في الخاص

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-71

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد اصحاب البوت

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-own-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد رسال الى صاحب بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-72

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد اصحاب البوت

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

//////////////////////////// - قــســم أكـــواد الـمـنـوعـات - /////////////////////////////




 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-other") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-other-1 \` <a:525837021558865961:677203465646243844> \` كود بروفايل بخلفيات \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-other-2 \` <a:525837021558865961:677203465646243844> \` كود لفل اب بصوره \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-other-3 \` <a:525837021558865961:677203465646243844> \` كود اكس بي كتابه \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-other-4 \` <a:525837021558865961:677203465646243844> \` كود بروفايل خرافي \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-other-5 \` <a:525837021558865961:677203465646243844> \` كود الرسم كانفاس \`

**`)
 
    }
}) 



  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-other-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود بروفايل بخلفيات

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-73

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد منوعة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-other-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لفل اب بصوره

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-74

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد منوعة

https://media.discordapp.net/attachments/471700655484960779/489865535257968641/levelup.png?width=501&height=282
**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-other-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود اكس بي كتابه

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-75

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد منوعة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-other-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود بروفايل خرافي

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-76

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد منوعة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-other-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود الرسم كانفاس

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-77

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم أكواد منوعة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});



//////////////////////////// - قــســم أكـــواد الـبــرودكــاســت - /////////////////////////////


 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`<:694579700688879668:697941193115304037> | ** Sorry, this section was interrupted by discord section **`)
 
    }
})


/////////////-- تـم تـعـطـل هـذا الـقـسـم


/*

 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-js-bc-1 \` <a:525837021558865961:677203465646243844> \` برودكاست + للكل \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-js-bc-2 \` <a:525837021558865961:677203465646243844> \` برودكاست + للكل + غير مطور \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-js-bc-3 \` <a:525837021558865961:677203465646243844> \` برودكاست + للأونلاين + مع منشن + غير مطور \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-js-bc-4 \` <a:525837021558865961:677203465646243844> \` برودكاست + للكل + مع منشن + غير مطور \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-js-bc-5 \` <a:525837021558865961:677203465646243844> \` برودكاست  للاصدقائك \`

<:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-js-bc-6 \` <a:525837021558865961:677203465646243844> \` برودكاست لكل سيرفرات البوت \`

<:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-js-bc-7 \` <a:525837021558865961:677203465646243844> \` برودكاست لشخص الي تحدده \`

<:694579669265285180:697941169912545290> | ~~#~~ 8 - \` ${prefix}help-js-bc-8 \` <a:525837021558865961:677203465646243844> \` برودكاست  برياكشن \`

<:694579669265285180:697941169912545290> | ~~#~~ 9 - \` ${prefix}help-js-bc-9 \` <a:525837021558865961:677203465646243844> \` برودكاست  كرساله بدون اي شئ  \`

**`)
 
    }
}) 



  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست + للكل

<a:28:674311913576071179> | __C__ode : https://pastebin.com/n2SyjdwH

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست + للكل + غير مطور

<a:28:674311913576071179> | __C__ode : https://pastebin.com/n2SyjdwH

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست + للأونلاين + مع منشن + غير مطور

<a:28:674311913576071179> | __C__ode : https://pastebin.com/n2SyjdwH

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست + للكل + مع منشن + غير مطور

<a:28:674311913576071179> | __C__ode : https://pastebin.com/n2SyjdwH

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست  للاصدقائك

<a:28:674311913576071179> | __C__ode : https://paste.drhack.net/?360e16099f92d0f0#nM7zJvzWUjotWeTxwD797XOoazOgzGi/JDUaiPfV8Aw=

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست لكل سيرفرات البوت

<a:28:674311913576071179> | __C__ode : https://pastebin.com/eX5bvj43

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست لشخص الي تحدده

<a:28:674311913576071179> | __C__ode : https://pastebin.com/6XvedaPm

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-8") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست  برياكشن

<a:28:674311913576071179> | __C__ode : https://pastebin.com/jurcUVMT

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-js-bc-9") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست  كرساله بدون اي شئ 

<a:28:674311913576071179> | __C__ode : https://paste.drhack.net/?b1eeffb0b9da5cf8#zbB6EJ3Rr1P8ZI8XDAjphvkXPHVHN1OkiZY809szGs0=

<a:27:674311912917303296> | __T__ype __o__f __c__ode : 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});*/









//////////////////////////// - قــســم أكـــواد الـبـايـثـون - /////////////////////////////








 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-py-admin \` <a:525837021558865961:677203465646243844> \` قسم كواد الادارة \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-py-source \` <a:525837021558865961:677203465646243844> \` قـسـم كواد السورس \`



**`)
 
    }
}) 



//////////////////////////// - قــســم أكـــواد الـبـايـثـون لاداريــة - /////////////////////////////



 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py-admin") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-py-admin-1 \` <a:525837021558865961:677203465646243844> \` كود اذا دخل البوت لسيرفر يعطيك معلومات عنه + امبد للبايثونوبس \`

 <:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-py-admin-2 \` <a:525837021558865961:677203465646243844> \` كود يغيرلك النك نيم حقك فالسيرفر \`

 <:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-py-admin-3 \` <a:525837021558865961:677203465646243844> \` كود يجيبلك الأيموجيز حقت السيرفر \`

**`)
 
    }
}) 


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py-admin-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود اذا دخل البوت لسيرفر يعطيك معلومات عنه + امبد للبايثونوبس

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-78

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد لادارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py-admin-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود يغيرلك النك نيم حقك فالسيرفر

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-79

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد لادارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py-admin-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود يجيبلك الأيموجيز حقت السيرفر

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-80

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد لادارية

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});




//////////////////////////// - قــســم أكـــواد الـبـايـثـون الــســورس - /////////////////////////////



 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py-source") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-py-source-1 \` <a:525837021558865961:677203465646243844> \` السورس الاساسي مع البيرفكس \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-py-source-2 \` <a:525837021558865961:677203465646243844> \` السورس الاساسي من غير بيرفكس \`



**`)
 
    }
}) 


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py-source-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : السورس الاساسي مع البيرفكس

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-81

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الـسـورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-py-source-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : السورس الاساسي من غير بيرفكس

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-82

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الـسـورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});






//////////////////////////// - قــســم أكـــواد HTML - /////////////////////////////





 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-html-source \` <a:525837021558865961:677203465646243844> \` قـسـم كواد السورس \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-html-general \` <a:525837021558865961:677203465646243844> \` قـسـم كـواد الـعـامـه \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-html-admin \` <a:525837021558865961:677203465646243844> \` قــســم كـواد لاداريـة \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-html-games \` <a:525837021558865961:677203465646243844> \` قـسـم كـواد الـعـاب \`

**`)
 
    }
}) 




//////////////////////////// - قــســم أكـــواد HTML الـسـورس - /////////////////////////////





 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-source") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-html-source-1 \` <a:525837021558865961:677203465646243844> \` كـواد السورس اساسى \`

**`)
 
    }
}) 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-source-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود السورس الاساسي

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-83

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الــسـورس

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});







//////////////////////////// - قــســم أكـــواد HTML الــعــامــة - /////////////////////////////





 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-general") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-html-general-1 \` <a:525837021558865961:677203465646243844> \` كود ساعة رقمية \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-html-general-2 \` <a:525837021558865961:677203465646243844> \` كود قايس وزن \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-html-general-3 \` <a:525837021558865961:677203465646243844> \` الة حاسبة \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-html-general-4 \` <a:525837021558865961:677203465646243844> \` معرفة موقعك \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-html-general-5 \` <a:525837021558865961:677203465646243844> \` كواد الواقت \`
**`)
 
    }
}) 



  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-general-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود ساعة رقمية

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-84

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الـعــامــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-general-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود قايس وزن

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-85

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الـعــامــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-general-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : الة حاسبة

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-86

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الـعــامــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-general-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : معرفة موقعك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-87

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الـعــامــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-general-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد الواقت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-88

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الـعــامــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});






//////////////////////////// - قــســم أكـــواد HTML لادريــة- /////////////////////////////







 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-html-admin-1 \` <a:525837021558865961:677203465646243844> \` كتابة على مجسم \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-html-admin-2 \` <a:525837021558865961:677203465646243844> \` كودادراج فديو لصفحة عرض  \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-html-admin-3 \` <a:525837021558865961:677203465646243844> \` ادراج صوت \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-html-admin-4 \` <a:525837021558865961:677203465646243844> \` تحرك ايقونات الموقع  \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-html-admin-5 \` <a:525837021558865961:677203465646243844> \` كود يخلي ذي تتحرك \`

<:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-html-admin-6 \` <a:525837021558865961:677203465646243844> \` كود يكتب الكلام حرف حرف \`

<:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-html-admin-7 \` <a:525837021558865961:677203465646243844> \` اضافه ايقونه لموقعك \`

<:694579669265285180:697941169912545290> | ~~#~~ 8 - \` ${prefix}help-html-admin-8 \` <a:525837021558865961:677203465646243844> \` كود انميشن على الكانفاس \`
**`)
 
    }
}) 


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كتابة على مجسم

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-89

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كودادراج فديو لصفحة عرض 

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-90

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : ادراج صوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-91

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : تحرك ايقونات الموقع 

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-92

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود يخلي ذي تتحرك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-93

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

||https://cdn.discordapp.com/attachments/576886368165167154/579827093785804824/unknown.png||
**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود يكتب الكلام حرف حرف

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-94

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : اضافه ايقونه لموقعك

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-95

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-admin-8") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود انميشن على الكانفاس

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-96

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الادريــة

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});






//////////////////////////// - قــســم أكـــواد HTML الـعـاب- /////////////////////////////






 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-games") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-html-games-1 \` <a:525837021558865961:677203465646243844> \` كود لعبة tic tac toe \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-html-games-2 \` <a:525837021558865961:677203465646243844> \` لعبة ثعبان \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-html-games-3 \` <a:525837021558865961:677203465646243844> \` المرابعات المتحركه \`

**`)
 
    }
}) 


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-games-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود لعبة tic tac toe

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-97

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الــعــاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-games-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : لعبة ثعبان

<a:28:674311913576071179> | __C__ode :https://4cash.me/codes-98

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الــعــاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-html-games-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : المرابعات المتحركه

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-99

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد الــعــاب

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});







//////////////////////////// - قــســم أكـــواد PHP - /////////////////////////////
  
  
  
  
 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-php-1 \` <a:525837021558865961:677203465646243844> \` جلب عدد الاعجاب على فيس بوك تلقائي \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-php-2 \` <a:525837021558865961:677203465646243844> \` فحص البريد اذا كان صحيح \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-php-3 \` <a:525837021558865961:677203465646243844> \` فنكشن حمايه المدخلات \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-php-4 \` <a:525837021558865961:677203465646243844> \` باسورد عشوائي \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-php-5 \` <a:525837021558865961:677203465646243844> \` تنظيف قبل الادخال الى القاعدة \`

<:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-php-6 \` <a:525837021558865961:677203465646243844> \` عرض حجم الملف بطريقة مقروائه مثل MB \`

<:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-php-7 \` <a:525837021558865961:677203465646243844> \` قالب HTML5 جاهز للعمل \`
**`)
 
    }
}) 



  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : جلب عدد الاعجاب على فيس بوك تلقائي

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-100

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا PHP 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : فحص البريد اذا كان صحيح

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-101

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا PHP 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : فنكشن حمايه المدخلات

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-102

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا PHP 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : باسورد عشوائي

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-103

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا PHP 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : تنظيف قبل الادخال الى القاعدة

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-104

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا PHP 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : عرض حجم الملف بطريقة مقروائه مثل MB

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-105

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا PHP 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-php-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : قالب HTML5 جاهز للعمل

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-106

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا PHP 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});
  
  
  




//////////////////////////// - قــســم أكـــواد CSS - /////////////////////////////
  
  
  
  
  
  
  
 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-css") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-css-1 \` <a:525837021558865961:677203465646243844> \` الخلفه الشفافه \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-css-2 \` <a:525837021558865961:677203465646243844> \` تأثير الآلة الكاتبة \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-css-3 \` <a:525837021558865961:677203465646243844> \` Perfect CSS Sprite \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-css-4 \` <a:525837021558865961:677203465646243844> \` تصميم إدخال ملف مخصص \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-css-5 \` <a:525837021558865961:677203465646243844> \` تغيير لون اختيار النص \`

<:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-css-6 \` <a:525837021558865961:677203465646243844> \` قائمة غير مرتبة كجدول زمني \`

**`)
 
    }
}) 


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-css-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : الخلفه الشفافه

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-107

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا css 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-css-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : تأثير الآلة الكاتبة

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-108

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا css 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-css-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : Perfect CSS Sprite

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-109

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا css 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-css-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : تصميم إدخال ملف مخصص

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-110

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا css 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-css-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : تغيير لون اختيار النص

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-111

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا css 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-css-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : قائمة غير مرتبة كجدول زمني

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-112

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا css 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});





//////////////////////////// - قــســم أكـــواد مــايــن كــرافــت - /////////////////////////////







 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 
 <:694579669265285180:697941169912545290> | ~~#~~ 1 - \` ${prefix}help-mine-1 \` <a:525837021558865961:677203465646243844> \` تعديل العالم \`

<:694579669265285180:697941169912545290> | ~~#~~ 2 - \` ${prefix}help-mine-2 \` <a:525837021558865961:677203465646243844> \` مساعد في تعديل العوالم \`

<:694579669265285180:697941169912545290> | ~~#~~ 3 - \` ${prefix}help-mine-3 \` <a:525837021558865961:677203465646243844> \` اسنتيالز \`

<:694579669265285180:697941169912545290> | ~~#~~ 4 - \` ${prefix}help-mine-4 \` <a:525837021558865961:677203465646243844> \` حرب السرير \`

<:694579669265285180:697941169912545290> | ~~#~~ 5 - \` ${prefix}help-mine-5 \` <a:525837021558865961:677203465646243844> \` حرب السماء \`

<:694579669265285180:697941169912545290> | ~~#~~ 6 - \` ${prefix}help-mine-6 \` <a:525837021558865961:677203465646243844> \` ( بيرمشن اكس (تصميم رتب \`

<:694579669265285180:697941169912545290> | ~~#~~ 7 - \` ${prefix}help-mine-7 \` <a:525837021558865961:677203465646243844> \` ارسال رسالة عند دخول الاعضاء \`

<:694579669265285180:697941169912545290> | ~~#~~ 8 - \` ${prefix}help-mine-8 \` <a:525837021558865961:677203465646243844> \` chat manger \`

<:694579669265285180:697941169912545290> | ~~#~~ 9 - \` ${prefix}help-mine-9 \` <a:525837021558865961:677203465646243844> \` level points \`

<:694579669265285180:697941169912545290> | ~~#~~ 10 - \` ${prefix}help-mine-10 \` <a:525837021558865961:677203465646243844> \` chat color \` **`)
    }
}) 


 	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine") {
	 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)

 message.channel.sendMessage(`**
 <:694579669265285180:697941169912545290> | ~~#~~ 11 - \` ${prefix}help-mine-11 \` <a:525837021558865961:677203465646243844> \` Lobby System \`

<:694579669265285180:697941169912545290> | ~~#~~ 12 - \` ${prefix}help-mine-12 \` <a:525837021558865961:677203465646243844> \` برودكاست ماين كرافت \`

<:694579669265285180:697941169912545290> | ~~#~~ 13 - \` ${prefix}help-mine-13 \` <a:525837021558865961:677203465646243844> \` دسكورد ماين كرافت \`

<:694579669265285180:697941169912545290> | ~~#~~ 14 - \` ${prefix}help-mine-14 \` <a:525837021558865961:677203465646243844> \` Anti Cheat \`

<:694579669265285180:697941169912545290> | ~~#~~ 15 - \` ${prefix}help-mine-15 \` <a:525837021558865961:677203465646243844> \` Valut \`
**`)
    }
}) 



  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-1") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : تعديل العالم

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-113

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-2") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : مساعد في تعديل العوالم

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-114

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-3") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : اسنتيالز

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-115

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-4") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : حرب السرير

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-116

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-5") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : حرب السماء

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-117

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-6") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : ( بيرمشن اكس (تصميم رتب

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-118

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-7") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : ارسال رسالة عند دخول الاعضاء

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-119

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-8") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : chat manger

<a:28:674311913576071179> | __C__ode :https://4cash.me/codes-120

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-9") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : level points

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-121

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-10") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : chat color

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-122

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-11") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : Lobby System

<a:28:674311913576071179> | __C__ode :  https://4cash.me/codes-123

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-12") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : برودكاست ماين كرافت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-124

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-13") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : دسكورد ماين كرافت

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-125

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-14") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : Anti Cheat

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-126

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-mine-15") {
         if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** :585881512587821089:`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : Valut

<a:28:674311913576071179> | __C__ode : https://4cash.me/codes-127

<a:27:674311912917303296> | __T__ype __o__f __c__ode : قسم اكواد ا mine 

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});



////////////////////////////// - قـسـم مـلـفـات بـوتـات الـديـسـكـورد

//// - تحذير هذا القسم معطل و غير محديث 



/*	client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
       let embed = new Discord.RichEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL)
       .setFooter(client.user.tag, client.user.avatarURL)
       .setColor("BLACK") 
 .setDescription(`
:dividers: ***⦁⦓ قسم ملفات بوت ⦔⦁*** :dividers:


✽- **#help-files-bot-1 -->  『 بوت سيستم معريب 』** 

✽- **#help-files-bot-2  -->  『 ملف لاست بوت القديم  』**

✽- **#help-files-bot-3  -->  『 ملف بوت برودكاست متطوير 』**

✽- **#help-files-bot-4  -->  『 ملفات بوت اغانى 』**

✽- **#help-files-bot-5  -->  『 ملف بوت سبيد بوت 』**

✽- **#help-files-bot-6  -->  『 ملف كود كريدت 』**

✽- **#help-files-bot-7  -->  『 بوت تقديم 』**

✽- **#help-files-bot-8  -->  『 ملف بوت تكيت 』**

✽- **#help-files-bot-9  -->  『 ملف بوت ترحيب 』**

✽- **#help-files-bot-10  -->  『 ملف بوت حمايه 』**

✽- **#help-files-bot-11  -->  『 ملف اس بوت 』**

✽- **#help-files-bot-12  -->  『 ملف بوت تكيت متطوير 』**`);
 message.channel.send(embed) 
       
    }
})
     client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-1") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**❖-بوت سيستم معريب**
 
 https://cdn.discordapp.com/attachments/575408074479763458/577176365770735616/Me.rar`);

    }
});  

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-2") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**❖-ملف لاست بوت القديم **
 
 https://cdn.discordapp.com/attachments/575408074479763458/578944029845356574/LastBot.rar`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-3") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**
 | __D__escribe : ملف بوت برودكاست متطوير
 | __C__ode : https://cdn.discordapp.com/attachments/575408074479763458/579077740695912458/88a057c48b25d15a.7z
 | __T__ype __o__f __c__ode : __F__iles
**`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-4") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**
 | __D__escribe : ملفات بوت اغانى
 | __C__ode : http://www.mediafire.com/file/8x1x94kj44jkpdh
 | __T__ype __o__f __c__ode : __F__iles
**`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-5") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`
 **
 | __D__escribe : ملف بوت سبيد بوت
 | __C__ode : https://cdn.discordapp.com/attachments/575408074479763458/579444156716417040/Speed_BOT.rar
 | __T__ype __o__f __c__ode : __F__iles
** `);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-6") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**❖-ملف كود كريدت**
 
 https://cdn.discordapp.com/attachments/575408074479763458/579794186212212736/starbot_credit.rar`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-7") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**❖-بوت تقديم**
 
 https://cdn.discordapp.com/attachments/575408074479763458/579046643119292418/2d3006a4ae612b3c.7z`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-8") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**
 | __D__escribe : بوت تكيت
 | __C__ode : http://www.mediafire.com/file/2bxsrma16umny7k/%25D9%2583%25D9%2588%25D8%25A7%25D8%25AF_%25D8%25AA%25D9%2583%25D9%258A%25D8%25AA_%25D8%25AC%25D9%258A%25D8%25AF.rar/file
 | __T__ype __o__f __c__ode : __F__iles
**`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-9") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`
 
 
 **❖-ملف بوت ترحيب**
 
 https://cdn.discordapp.com/attachments/578912198697680906/584298692178083873/0a45962c185060ac.zip`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-10") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**❖-ملف بوت حمايه**
 
 https://cdn.discordapp.com/attachments/578912198697680906/584298955546951680/05cfe8bc501344c3.rar`);

    }
}); 

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-files-bot-11") {
		 if (message.channel.id !== '692848232107081738') return message.reply(`** لا يمكن اكتب اوامر بوت خارج روم <#692848232107081738> ** <a:585881512587821089:677203439037448193>`)
		 message.channel.send('<a:591620992686620673:594172632610373672> | ** تـم ارسـال الـكـود فـى الـخـاص ** ');

 message.author.sendMessage(`**
 | __D__escribe :  __S__Bot
 | __C__ode : http://www.mediafire.com/file/mkkrt7p6o3uzrgq/SBot.rar/file
 | __T__ype __o__f __c__ode : __F__iles
**`);

    }*/
	
	
	
	



















///// -- مممنوع لاقتراب من كواد الحماية






















let anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./config.json", "UTF8"));
client.on("message", message => {
    if (!message.channel.guild) return;
    let user = anti[message.guild.id + message.author.id]
    let num = message.content.split(" ").slice(2).join(" ");
    if (!anti[message.guild.id + message.author.id]) anti[message.guild.id + message.author.id] = {
        actions: 0
    }
    if (!config[message.guild.id]) config[message.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3,
        time: 30
    }
    if (message.content.startsWith(prefix + "limits")) {


        if (!message.member.hasPermission('MANAGE_GUILD')) return;
        if (message.content.startsWith(prefix + "limitsban")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].banLimit = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].banLimit} **`)
        }
        if (message.content.startsWith(prefix + "limitskick")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].kickLimits = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].kickLimits}**`)
        }
        if (message.content.startsWith(prefix + "limitsroleD")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].roleDelLimit = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].roleDelLimit}**`)
        }
        if (message.content.startsWith(prefix + "limitsroleC")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].roleCrLimits = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].roleCrLimits}**`)
        }
        if (message.content.startsWith(prefix + "limitschannelD")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].chaDelLimit = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].chaDelLimit}**`)
        }  
                  if (message.content.startsWith(prefix + "limitstime")) {
            if (!num) return message.channel.send("**⇏ | أرسل رقم ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
            config[message.guild.id].time = num;
            message.channel.send(`**⇏ | تم التغيير اِلي : ${config[message.guild.id].time}**`)
        }
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }
});
client.on("channelDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].chaDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بمسح الكثير من الرومات **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بمسح الكثير من الرتب **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleCreate", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleCrLimits) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بأنشاء الكثير من الرتب **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildBanAdd", async (guild, user) => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'MEMBER_BAN_ADD'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            channel.members.get(entry.id).ban().catch(e => channel.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildKickAdd", async (guild, user) => {
    const entry1 = await channel.fetchAuditLogs({
        type: 'MEMBER_KICK'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            channel.members.get(entry.id).ban().catch(e => channel.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildMemberRemove", async member => {
    const entry1 = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
    if (entry1.action === "MEMBER_KICK") {
        const entry2 = await member.guild.fetchAuditLogs({
            type: "MEMBER_KICK"
        }).then(audit => audit.entries.first())
        const entry = entry2.executor;
        if (!config[member.guild.id]) config[guild.id] = {
            banLimit: 3,
            chaDelLimit: 3,
            roleDelLimit: 3,
            kickLimits: 3,
            roleCrLimits: 3
        }
        if (!anti[member.guild.id + entry.id]) {
            anti[member.guild.id + entry.id] = {
                actions: 1
            }
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
        } else {
            anti[member.guild.id + entry.id].actions = Math.floor(anti[member.guild.id + entry.id].actions + 1)
            console.log("TETS");
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
            if (anti[member.guild.id + entry.id].actions >= config[member.guild.id].kickLimits) {
                member.members.get(entry.id).ban().catch(e => member.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
                anti[member.guild.id + entry.id].actions = "0"
                fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                    if (e) throw e;
                });
                fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                    if (e) throw e;
                });
            }
        }

        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }

})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[Codes] ${client.users.size}`)
    client.user.setStatus("idle")
});

let antibots = JSON.parse(fs.readFileSync('./antibots.json' , 'utf8'));//require antihack.json file
  client.on('message', message => {;
    if(message.content.startsWith(prefix + "AntiBots On")) {
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'On',
  }
  message.channel.send(`**\`ON\`.**`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
  
          })
  
  
  
  client.on('message', message => {
    if(message.content.startsWith(prefix + "AntiBots Off")) {
		  	let rank = message.guild.member(message.author).roles.find('name', '.');
    if (!rank) return message.channel.send('**<a:591621003919097856:594172692865744900> | __T__here __i__s __n__o __m__atching __r__ank .. **');
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'Off',
  }
  message.channel.send(`**\`OFF\`.**`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
  
          })
  
  client.on("guildMemberAdd", member => {
    if(!antibots[member.guild.id]) antibots[member.guild.id] = {
  onoff: 'Off'
  }
    if(antibots[member.guild.id].onoff === 'Off') return;
  if(member.user.bot) return member.kick()
  })
  
  fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
  if (err) console.error(err)
  .catch(err => {
  console.error(err);
  });
  
  })







































/*const dev = ['599351862692544532']
client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'js')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・audit`);
let roomfi2 = message['guild']['channels'].find('name', `❖・javascript`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
if(!roomfi2) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;

msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message.author.id;
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message.author.id;
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`
**\`Me Codes V5.0.1\`**
\`\`\`js
${thisMessage}\`\`\`
<:2_:597778055188185150> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`)
.then(m => {
m['react']('✅')  
m['react']('❌')
let s = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message["author"]["id"];
let s2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message["author"]["id"];
let ss = m["createReactionCollector"](s, { time: 0})
let ss2 = m["createReactionCollector"](s2, { time: 0})
message.reply(`**<:579734384404332545:677203445140422656>  Done Published Code Must Viewed By Owners**`)
cc2["on"]("collect", r => {
message.reply(`**<a:22:603398930528600095> | Done Cancel Publiched Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000);  
})

ss["on"]("collect", r => {
roomfi2.send(` || <@&692056080750084248> ||
**\`Me Codes V5.0.1\`**
\`\`\`js
${thisMessage}\`\`\`
<:2_:597778055188185150> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
m.react(':667471705111003152:675196847987621919')  
m.react(':667471707858141196:675196960852017152')
roomfi.send(`**<a:22:603398930528600095> | Done Published Code**`)
})
}) 
ss2["on"]("collect", r => {
roomfi.send(`<a:22:603398930528600095> | **Done Cancel Share Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000)
})
})
})
})
})
})
})    
})
})
})
}
});

client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'html')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・audit`);
let roomfi2 = message['guild']['channels'].find('name', `❖・html`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
if(!roomfi2) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;

msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message["author"]["id"];
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message["author"]["id"];
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`
**\`Me Codes V5.0.1\`**
\`\`\`js
${thisMessage}\`\`\`
<:4_:597778036171079681> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`)
.then(m => {
m['react']('✅')  
m['react']('❌')
let s = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message["author"]["id"];
let s2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message["author"]["id"];
let ss = m["createReactionCollector"](s, { time: 0})
let ss2 = m["createReactionCollector"](s2, { time: 0})
message.reply(`**<:579734384404332545:677203445140422656>  Done Published Code Must Viewed By Owners**`)
cc2["on"]("collect", r => {
message.reply(`**<a:22:603398930528600095> | Done Cancel Publiched Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000);  
})

ss["on"]("collect", r => {
roomfi2.send(`|| <@&692056080750084248> ||
**\`Me Codes V5.0.1 \`**
\`\`\`js
${thisMessage}\`\`\`
<:4_:597778036171079681> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
m.react(':667471705111003152:675196847987621919')  
m.react(':667471707858141196:675196960852017152')
roomfi.send(`**<a:22:603398930528600095> | Done Published Code**`)
})
}) 
ss2["on"]("collect", r => {
roomfi.send(`<a:22:603398930528600095> | **Done Cancel Share Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000)
})
})
})
})
})
})
})    
})
})
})
}
});

client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'py')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・audit`);
let roomfi2 = message['guild']['channels'].find('name', `❖・python`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
if(!roomfi2) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;

msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message["author"]["id"];
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message["author"]["id"];
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`
**\`Me Codes V5.0.1\`**
\`\`\`js
${thisMessage}\`\`\`
<:5_:597778029099352075> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`)
.then(m => {
m['react']('✅')  
m['react']('❌')
let s = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message["author"]["id"];
let s2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message["author"]["id"];
let ss = m["createReactionCollector"](s, { time: 0})
let ss2 = m["createReactionCollector"](s2, { time: 0})
message.reply(`**<:579734384404332545:677203445140422656>  Done Published Code Must Viewed By Owners**`)
cc2["on"]("collect", r => {
message.reply(`**<a:22:603398930528600095> | Done Cancel Publiched Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000);  
})

ss["on"]("collect", r => {
roomfi2.send(`|| <@&692056080750084248> ||
**\`Me Codes V5.0.1 \`**
\`\`\`js
${thisMessage}\`\`\`
<:5_:597778029099352075> | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
m.react(':667471705111003152:675196847987621919')  
m.react(':667471707858141196:675196960852017152')
roomfi.send(`**<a:22:603398930528600095> | Done Published Code**`)
})
}) 
ss2["on"]("collect", r => {
roomfi.send(`<a:22:603398930528600095> | **Done Cancel Share Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000)
})
})
})
})
})
})
})    
})
})
})
}
});

client.on('message', message => {
if(message['author'].bot) return undefined;
if(message['content']['startsWith'](prefix + 'php')){
if (message.channel.id !== '671021781271838723') return message.reply(`** لا يمكن اكتب اوامر خارج شات <#671021781271838723>  ** <a:585881512587821089:677203439037448193>`)
//if(message.channel.id !== '') return message['channel'].send(`**The Command Type IN Room <#>**`);
let share1 = message['guild']['member'](message['author'])['roles'].find('name', '⌥ Support');
if(!share1) return message['channel'].send(`**You Not Have Role Support**`)
let roomfi = message['guild']['channels'].find('name', `❖・audit`);
let roomfi2 = message['guild']['channels'].find('name', `❖・php`);
if(!roomfi) return message['channel'].send(`**Not Found Channel**`);
if(!roomfi2) return message['channel'].send(`**Not Found Channel**`);
let filter = m => m.author.id === message.author.id;
let thisMessage;
message['channel'].send(`<a:Parnterdiscord:677203433383657496> | **Type The Code**`).then(m => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(c1 => {
c1.first().delete();
thisMessage = c1.first().content;
let zi;
m['edit'](`<a:585563197491249172:677203486701649960> | **Please Type Description Code**`).then(m2 => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']    
})
.then(c1 => {
c1.first().delete();
zi = c1.first().content;
let zi2;
m2['edit'](`<:580185227381702676:677203444788101170>  | **Please Type Owner Code**`).then(msg => {
message['channel'].awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
})
.then(collected => {
collected.first().delete();
zi2 = collected.first().content;

msg['edit'](`<:579734384404332545:677203445140422656>  | **Please Click Reaction <a:22:603398930528600095> To Share Code | Click Reaction <a:593078070760439808:603398933976449024> To Cancel Share Code**`).then(m => {
m['react']('✅')
m['react']('❌')
m['delete'](5000)  
let c = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message["author"]["id"];
let c2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message["author"]["id"];
let cc = m["createReactionCollector"](c, { time: 0})
let cc2 = m["createReactionCollector"](c2, { time: 0})
cc["on"]("collect", r => {
roomfi.send(`
**\`Me Codes V5.0.1\`**
\`\`\`js
${thisMessage}\`\`\`
<:1_:597778061995278360>  | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`)
.then(m => {
m['react']('✅')  
m['react']('❌')
let s = (react,user) => react["emoji"]["name"] === "✅" && user["id"] === message["author"]["id"];
let s2 = (react,user) => react["emoji"]["name"] === "❌" && user["id"] === message["author"]["id"];
let ss = m["createReactionCollector"](s, { time: 0})
let ss2 = m["createReactionCollector"](s2, { time: 0})
message.reply(`**<:579734384404332545:677203445140422656>  Done Published Code Must Viewed By Owners**`)
cc2["on"]("collect", r => {
message.reply(`**<a:22:603398930528600095> | Done Cancel Publiched Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000);  
})

ss["on"]("collect", r => {
roomfi2.send(`|| <@&692056080750084248> ||
**\`Me Codes V5.0.1 \`**
\`\`\`js
${thisMessage}\`\`\`
<:1_:597778061995278360>  | **Describe**: ${zi}
<a:541930665080520714:594176031385190400> | **Made By**: ${zi2}
<a:MadeBy:670605998238466069> | **Shared By**: ${message.author}`).then(m => {
m.react(':667471705111003152:675196847987621919')  
m.react(':667471707858141196:675196960852017152')
roomfi.send(`**<a:22:603398930528600095> | Done Published Code**`)
})
}) 
ss2["on"]("collect", r => {
roomfi.send(`<a:22:603398930528600095> | **Done Cancel Share Code**`).then(s => {
s.delete(5000)  
})
m.delete(6000)
})
})
})
})
})
})
})    
})
})
})
}
});*/

let current = 0;
const ticket = JSON.parse(fs.readFileSync("./ticket.json", 'utf8'));
client["on"]('message', message => {
if(message["content"]["startsWith"](prefix + "new")){
var numbers = [1, 2, 3, 4];
current++;
let reason = message["content"]["split"](" ").slice(1).join(" ")
let reassonnew = new Discord.RichEmbed()
.setColor('#36393e')
.setDescription(`**Please Type Reason Ticket**`);
if(!reason) return message["channel"].send(reassonnew);
let srole = message.guild.roles.find('name', `⌥ Support Tickets`)
message.guild.createChannel(`ticket-${current}`, "text").then(ticketx => {
let role = message.guild.roles.find("name", srole);
let role2 = message.guild.roles.find("name", "@everyone");
ticketx.overwritePermissions(role, {
SEND_MESSAGES: true,
READ_MESSAGES: true
});  
ticketx.overwritePermissions(role2, {
SEND_MESSAGES: false,
READ_MESSAGES: false
});
ticketx.overwritePermissions(message.author, {
SEND_MESSAGES: true,
READ_MESSAGES: true
});
const d1 = new Discord.RichEmbed()
.setDescription(`**Done Open your <#${ticketx.id}>**`)  
.setColor('BLACK')
message.channel.send(d1);
const nonedear = new Discord.RichEmbed()
.setDescription(`**This Member ${message.author} Was Open Ticket \n\n Reason: \`${reason}\` \n\n Wait For Support To Connect To You**`)
.setColor('BLACK')
.setFooter(`Me Codes` , client.user.avatarURL)
.setTimestamp();
ticketx.send(nonedear);
}).catch(console.error);
} else if (message.content.startsWith(prefix + 'close')) {          
let noperm = new Discord.RichEmbed()
.setColor('BLACK')
.setDescription(`You Don't Have Permission`);
var perm = message.guild.member(message.author).hasPermissions('MANAGE_ROLES');
if(!perm) return message.channel.send(noperm)
if (!message.channel.name.startsWith(`ticket-`)) {
return
}  
else message.channel.delete()
fs.writeFile("./ticket.json", JSON.stringify(ticket), (err) => {
if(err) console.log(err)
})
}
})


client.on("message", message => {
var prefix = "#"
if(message.content.startsWith(prefix + "setAvatar")){
if(message.author.id !== "513432487771504658") return message.channel.send("**Error 424 :x:**")
let args = message.content.split(" ").slice(1).join(" ")
if(!args) return message.channel.send("**I can't find this image**")  
client.user.setAvatar(args).then(() => {
return message.channel.send("**Done**")}).catch(err => message.channel.send(err.message))
}})