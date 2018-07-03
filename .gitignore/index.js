const Discord = require('discord.js');
const CLEAR_MESSAGES = '@clearMessages';
var bot = new Discord.Client();
var prefix = ("-")

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '[-all]', type: 0}});
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
        if (message.content === prefix + "all"){
            var help_embed = new Discord.RichEmbed()
                .setColor("#0031F7")
                .setTitle("Mes commandes Principales :")
                .setThumbnail(message.author.avatarURL)
                .addField("-all :", "Affiche ce menu .")
                .addField("-pannel :", "affiche le panneau indicatif d'Arcadia")
                .addField("-ping :" ,"Affiche la latence qui me sépare d'Arcadia .")
                .addField("-clear :", "Supprime les messages du channel ou vous vous trouvez.")
                .addField("Autres commandes :", "'")
                .addField("-card:", "Affiche ma carte d'identitée .")
            message.channel.sendEmbed(help_embed);
            console.log("La commande Help à été demandée !");
        }

        if (message.content === prefix + "pannel"){
            var sign_embed = new Discord.RichEmbed()
             .setColor("#0031F7")
             .setTitle("Les infos d'Arcadia")
             .addField("Nombre d'utilisateurs sur le serveur :", message.guild.members.size)
             .addField("Nombre de salons et de catégories :", message.guild.channels.size)
             message.channel.sendEmbed(sign_embed)
             console.log("Le pannel a été affiché !")
        }

        if (message.content === prefix + "card"){
            var card_embed = new Discord.RichEmbed()
                .setColor("#0031F7")
                .setTitle("Ma carte d'identitée :")
                .addField("Nom :", "Arcabot")
                message.channel.sendEmbed(card_embed)
                console.log("La Carte d'identitée a été demandée !")
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
