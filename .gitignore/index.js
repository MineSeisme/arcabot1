const Discord = require('discord.js');
const CLEAR_MESSAGES = '@clearMessages';
const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');

var bot = new Discord.Client();
var prefix = ("-")

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '[-info]', type: 0}});
    console.log("Le bot a démarré !");
});

bot.login('NDYwNDU2MzMzMTYyODQwMDc0.DhFBAA.mf257Z0uZAmaQX5TGs7fpsNkJjk');

bot.on('message', message => {
    if (message.content.startsWith(prefix + "ping")) {
    var now = require('performance-now');
    var startTime = now();
    message.channel.send("pong = wait...")
    .then(message => {
    var endTime = now();
    return message.edit("pong :ping_pong: = " + Math.round(endTime - startTime) + " ms.");
    }).catch(console.error);
    }});
                
    bot.on('message', message => {
        if (message.content === "-version"){
            message.reply("Je suis en version 1.7 .");
            console.log('La commande Version a été demandée');
        }
        if (message.content === prefix + "info"){
            var help_embed = new Discord.RichEmbed()
                .setColor('#0031F7')
                .setTitle("Mes commandes Principales :")
                .addField("-info :", "Affiche ce menu .")
                .addField("-ping :" ,"Affiche la latence qui me sépare d'Arcadia .")
                .addField("-clear :", "Supprime les messages du channel ou vous vous trouvez.")
                .addField("Autres commandes :", "  -version : Affiche ma version .")
            message.channel.sendEmbed(help_embed);
            console.log("La commande Help à été demandée !");
        }

if(message.content.startsWith(prefix + "clear")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Désolé, vous n'avez pas la permission nécessaire pour executer la commande !");

	let args = message.content.split(" ").slice(1);

	if(!args[0]) return message.channel.send("Indique un nombre de messages à supprimer !")
	message.channel.bulkDelete(args[0]).then(() => {
	message.channel.send(`${args[0]} messages ont été supprimé(s) ! :thumbsup:`);
	console.log("La commande Clear a été demandée !")
	})

}



        bot.login(process.env.TOKEN);})
