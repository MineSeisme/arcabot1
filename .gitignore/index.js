const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("*")

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '*help', type: 0}});
    console.log("Le bot a démarré !");
});

bot.login('NDYwNDU2MzMzMTYyODQwMDc0.DhFBAA.mf257Z0uZAmaQX5TGs7fpsNkJjk');

bot.on('message', message => {
    if (message.content === "*ping"){
        message.reply("pong");
        console.log('La commande Ping a été demandée .');
    }

bot.on('message', message => {
    if (message.content === "*version"){
        message.reply("ArcaBot est en version 1.2 .");
        console.log('La commande Version a été demandée');
    }

    if (message.content === (prefix + "help")){
        var help_embed = new Discord.RichEmbed()
        .setColor('#0FB09B')
        .addField("Commandes d'ArcaBot :", "  *help : Affiche les commandes d'ArcaBot")
        .addField("Autres commandes :", "  *version : Affiche la version d'ArcaBot")
    message.channel.sendEmbed(help_embed);
       // message.channel.sendMessage("Voici les commandes de ArcaBot :\n *help pour afficher les commandes");
        console.log("La commande Help à été demandée !");
    }
    
});})

bot.login(process.env.TOKEN);
