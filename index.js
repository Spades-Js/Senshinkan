require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const PREFIX = '-'







client.on('ready', () => {
    console.log('Active!')
    client.user.setPresence({
        activity: {
            type: "PLAYING",
            name: "with Spades's pp"
         },
         status: "discord.gg/senshin"
    })
});









client.on('message', async message => {
   

    if (message.content.startsWith(`${PREFIX}invites`)) {
        try {
            let member = message.mentions.members.first() || message.member;
            let invites = await message.guild.fetchInvites();
            let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

            if (memberInvites.size <= 0) {
                return message.channel.send(`${member.user.tag} has not invited anyone to ${message.guild.name}!`, (member === message.author ? null : member));

            }

            let content = memberInvites.map(i => i.code).join("\n")
            let index = 0;
            memberInvites.forEach(invite => index += invite.uses);

            let inviteEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${member.user.tag}'s invites `)
            .addField(`Number of people invited`, index)
            .addField(`Invite Codes`, content )
            .setTitle(`Invite's from ${member.user.tag}`)

            message.channel.send(inviteEmbed)
        } catch (e) {
            return console.log(e)
        }
    }
});




client.on('message', message => {
    const args = message.content.startsWith(`${PREFIX}meme`)

    if (message.content.startsWith(`${PREFIX}meme`)) {
        const got = require(`got`)
        got(`https://www.reddit.com/r/memes/random/.json`).then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddir.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;

            const memeEmbed = new Discord.MessageEmbed()
            .setTitle(`${memeTitle}`)
            .setURL(`${memeUrl}`)
            .setImage(memeImage, ({
                dynamic: true
            }))
            .setColor("RANDOM")
            .setFooter(`👍${memeUpvotes} 👎${memeDownvotes} 💬${memeNumComments} Can't see the meme? Click the blue text at the top!`)

            message.channel.send(memeEmbed)
        })
    }
})

client.on('message', message => {
    if (message.content.startsWith(`${PREFIX}av`)) {
        const avatar = message.mentions.users.first()
        if (!avatar) return message.channel.send(message.author.displayAvatarURL({
            format: "png",
            size: 512
        }))
        else message.channel.send(avatar.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 512
        }))
    }
})

client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ")
    if (message.content.startsWith(`${PREFIX}status`)) {
        let dev = ["565549256749088797"]
        if(!dev.includes(message.author.id)) {
            return message.channel.send({embed : {
                color: "RANDOM",
                description:"Only the bot owner(Spades_) can use this command"
            }})
        } else {
            const statuses = ["with Spades's pp", "online", "idle", "discord.gg/senshin"]
            if (!statuses.includes(args[1])) return message.channel.send('Not a valid status!')
            client.user.setPresence({
                activity: {
                    type: "WATCHING",
                    name: "something"
                },
                status: args[1]
            })
            message.channel.send(`Settings status to: ${args[1]}, may take a bit.`)
        }
    }
});

client.on('message', message => {
    if (message.content.startsWith(`${PREFIX}ping`)) {
       message.channel.send(`📶Pinging...`).then((msg) => {
           const pingembed = new Discord.MessageEmbed()
           .setTitle('📶Ping!')
           .setDescription(
               `📶Pong!\nLatency is ${Math.floor(
                   msg.createdTimestamp - message.createdTimestamp
               )}ms\nAPI Latency is ${Math.round(client.ws.ping)}`
               )
               .setColor("RANDOM")
               msg.edit(pingembed);
               msg.edit("\u200B");
                   
               
               
           
       })
    }
})

client.on('message', message => {
    if (message.content.startsWith(`${PREFIX}slowmode`)) {
        if (!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.channel.send("You do not have permission to use this command!")
        var time = message.content.split(' ').slice(1).join(' ')
        if(!time) return message.channel.send('Please enter the amount of time you want the slowmode to be')
        message.channel.setRateLimitPerUser(time)
        message.channel.send(`k i set the slowmode to : **${time}** seconds.`).then(m => m.delete({
            timeout: 2000
        }))
    }
});

client.on('message', message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return
    if (message.channel.type === 'dm') return
    
    if (message.content.startsWith(`${PREFIX}say`)) {
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send('You dont have the permissions to use this command')
        var text = message.content.split(" ").slice(1).join(' ')
        if (!text) return message.channel.send('What do you want me to say?')
        message.channel.send(text)
        message.delete()
    }
    if (message.content.startsWith(`${PREFIX}specialsay`)) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send('You dont have the right permissions to use this command')
        var embed = message.content.split(" ").slice(1).join(' ')
        if (!embed) return message.channel.send('What do you want me to say?')
        let embedsay = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(embed)

        message.channel.send(embedsay)
        message.delete()
    }
});



client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ")

    if (message.content.startsWith(`${PREFIX}command`) || message.content.startsWith(`${PREFIX}test`)) {
        message.channel.send('Hey there bruh')
    }
    if (message.content.startsWith(`${PREFIX}also`)) {
        message.reply('Also what....')
    }
    if (message.content.startsWith(`${PREFIX}dm`)) {
        message.author.send('Yay the dm command works go tell Spades_!')
    }
    if (message.content.startsWith(`${PREFIX}head`)) {
        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.username)
        .setTitle('Giving you head.... Oh my such throat game')
        .setImage('https://thumb-p8.xhcdn.com/a/VNdwN5NgJhENZE33RnE1kg/000/113/888/678_1000.gif')
        .setDescription('Damn shawty giving you sloppy toppy')
        message.channel.send(embed)
    }
    if (message.content.startsWith(`${PREFIX}help`)) {
        let dm = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor('RANDOM')
        .setTitle('Senshin Bot Commands')
        .setDescription('-help -invites -say -specialsay -ping -head -slowmode -av -status -meme')
        .setFooter('More commands coming soon!')
     
        message.author.send(dm)

     

    }

});







client.login(process.env.TOKEN);