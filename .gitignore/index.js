const Discord = require('discord.js');
const CLEAR_MESSAGES = '@clearMessages';
const YoutubeStream = require ('youtube-audio-stream')
var now = require('performance-now');
var bot = new Discord.Client();
var prefix = ("-")

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '[-all]', type: 0}});
    console.log("Le bot a démarré !");
});

bot.login('process.env.TOKEN');

bot.on("guildMemberAdd", member => {
  member.guild.channels.find("name", "discussion").send(`Salut ${member}, Bienvenue sur **Arcadia** !🎈🎉👍 `)
})

bot.on("guildMemberRemove", member => {
  member.guild.channels.find("name", "discussion").send(`${member} est parti d'**Arcadia** 🙁 👎 `)
})

bot.on('guildMemberAdd', member => {
  var role = member.guild.roles.find('name', 'Membres Connectés');
  member.addRole(role)
})

bot.on('message', message => {
    if (message.content.startsWith(prefix + "ping")) {
    var startTime = now();
    message.channel.send("pong = wait...")
    .then(message => {
    var endTime = now();
    return message.edit("pong :ping_pong: = " + Math.round(endTime - startTime) + " ms.");
    }).catch(console.error);
    console.log("Le ping a été demandée")
}});
                
    bot.on('message', message => {
        if (message.content === "-surprise"){
            message.author.send("Félicitation, tu a trouvé la commande cachée :thumbsup: ! Va voir l'Administrateur pour recevoir ta récompense !");
            console.log('La commande cachée à été découverte !');
        }


        if (message.content === prefix + "all"){
            var help_embed = new Discord.RichEmbed()
                .setColor ("#00FEB7")
                .setTitle("Menu Principal")
                .setDescription("__*Bienvenue dans le menu du serveur*__")
                .addField("Commandes d'infos : 💡", "-m info")
                .addField("Commandes fun : 🎉", "-m fun")
                .addField("Commandes de modération : ⚖️", "-m modo")
                .addField("Autres commandes : 💎", "-m other")
                message.channel.sendEmbed(help_embed);
            console.log("La commande Principal à été demandée !");
        }

        if (message.content === prefix + "m info"){
            var info_embed = new Discord.RichEmbed()
                .setColor("#0031F7")
                .setTitle("**Mes commandes d'Informations :**")
                .addField("-all :", "Affiche le menu antérieur .")
                .addField("-pannel :", "affiche le panneau indicatif d'Arcadia")
                .addField("-ping :" ,"Affiche la latence qui me sépare d'Arcadia .")
                message.channel.sendEmbed(info_embed);
                console.log("La commande d'Infos à été demandée !");
        }

        if (message.content === prefix + "m fun"){
          var fun_embed = new Discord.RichEmbed()
                .setColor("#CDA16F")
                .setTitle("**Mes commandes pour s'amuser :**")
                .addField("-8ball :", "Donne une réponse aléatoire à une question donnée .")
                message.channel.sendEmbed(fun_embed);
                console.log("Les commandes d'Amusement ont été demandées !");
        }

        if (message.content === prefix + "m modo"){
          var modo_embed = new Discord.RichEmbed()
                .setColor("#E8FE00")
                .setTitle("**Mes commandes de modération :**")
                .addField("-clear :", "Supprime un nombre de message donné dans le channel ou vous vous trouvez.")
                .addField("-mute / -unmute :", "Permet de mute / demute une personne sélectionnée .")
                .addField("-warn / -deletewarns :", "Permet de warn / unwarn une personne sélectionnée .")
                .addField("-seewarns < @ + nom de la personne > :", "Affiche les warns de la personne mentionnée .")
                .addField("-kick :", "Expulse une personne sélectionnée du serveur .")
                .addField("-ban :", "Ban une personne sélectionnée du serveur .")
                message.channel.sendEmbed(modo_embed);
                console.log("Les commandes de Modération ont été demandées !");
            }

            if (message.content === prefix + "m other"){
              var other_embed = new Discord.RichEmbed()
                .setColor("#FE0069")
                .setTitle("Autres commandes :")
                .addField("-card: ", "Affiche ma carte d'identitée .")
                .addField("-me :", "Vous envoie vos stats en MP")
                .addField("-share :", "Cette commande vous donne un lien d'invitation pour partager le serveur !")
                .addField("-about :", "Vous donne des informations additionnelles .")
            message.channel.sendEmbed(other_embed);
            console.log("Les autres commandes ont été demandées !");
        }

        if (!message.content.startsWith(prefix)) return;

        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "me":

            var userCreateDate = message.author.createdAt.toString().split(" ");
            var msgauthor = message.author.id;

            var stats_embed = new Discord.RichEmbed()

            .setColor("#FCDC12")
            .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
            .addField(`ID de l'utilisateur :id:`, msgauthor, true)
            .addField("Date de création du compte :clock3: :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
            .setThumbnail(message.author.avatarURL)
            message.reply("Je t'ai envoyé tes stats en MP ! :thumbsup:")
            message.author.send({embed: stats_embed});
            console.log("Un utilisateur a réclamé ses statistiques")
         } 

        if (!message.content.startsWith(prefix)) return;

        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "about":

            var about_embed = new Discord.RichEmbed()

            .setColor("#FE8F01")
            .setTitle("Voici les informations à propos du serveur et du reste :")
            .addField("A propos du bot :", "**Voici des infos sur le bot**")
            .addField("Crédits :", "Ce bot à été créé par Valentin (@𝕸𝖎𝖓𝖊𝕾𝖊𝖎𝖘𝖒𝖊) sur Visual Code avec node.js (en JavaScript) avec la participation des Tutoriels, de @Albamort et de @Eliot .")
            .addField("Hébergement", "Il est hébergé sur Heroku afin de vous offire un bot actif 24/7")
            .addField("A propos d'Aradia :", "**Voici des infos à propos d' Arcadia**")
            .addField("L'histoire d'Arcadia :", "Arcadia à été créé par Valentin (@𝕸𝖎𝖓𝖊𝕾𝖊𝖎𝖘𝖒𝖊) pour (de base), aider lui et ses abonnés à communiquer au travers de channels, mais personne ne venait et il a décidé de continuer à développer son serveur et à en faire de la pub et cela a commencé à créer une communautée ! Un grand merci à vous, qui avez aidé le serveur à rester debout :) <3")
            .addField("La commande secrete :", "Une commande est cachée dans le serveur ! Si tu la trouve en premier, tu gagne une surprise")
            .setFooter("A propos - ArcaBot")
            message.reply("Je t'ai envoyé les infos en MP")
            message.author.send({embed: about_embed});
            console.log("Un utilisateur a voulu en savoir plus (about)")
        }

        if (!message.content.startsWith(prefix)) return;

        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "share":

            var userCreateDate = message.author.createdAt.toString().split(" ");
            var msgauthor = message.author.id;

            var share_embed = new Discord.RichEmbed()

            .setColor("#01FE29")
            .setTitle("Voici le lien pour inviter des gens sur Arcadia : :thumbsup:")
            .addField("https://discord.gg/Q2ghAg3", "Ce lien n'expire pas :)")
            .setFooter("Nous te remercions pour avoir participé au développement du serveur ! <3 👏 ")
            message.reply("Je t'ai envoyé le lien en MP")
            message.author.send({embed: share_embed});
            console.log("Un uilisateur a partagé le serveur !")
            break;
        }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.channel.send("Désolé, vous n'avez pas la permission nécessaire pour executer la commande ! :thumbsdown:");

        if(message.mentions.users.size === 0) {
            return message.channel.send(':no_entry: Vous devez mentionner un utilisateur ! :no_entry:');

        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("L'utilisateur est introuvable ou inexistant ! :thumbsdown:");
        }

        if(!message.guild.member(bot.user).hasPermission("MUTE_MEMBERS")) return message.channel.send("Je n'ai pas la permission pour executer la commande ! :thumbsdown:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est désormais mute ! :thumbsup:`);
            console.log("Un utilisateur a été mute !")
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.channel.send("Désolé, vous n'avez pas la permission nécessaire pour executer la commande ! :thumbsdown:");

        if(message.mentions.users.size === 0) {
            return message.channel.send(':no_entry: Vous devez mentionner un utilisateur ! :no_entry:');

        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("L'utilisateur est introuvable ou inexistant ! :thumbsdown:");
        }

        if(!message.guild.member(bot.user).hasPermission("MUTE_MEMBERS")) return message.channel.send("Je n'ai pas la permission pour executer la commande ! :thumbsdown:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} est désormais démute ! :thumbsup:`);
            console.log("Un utilisateur a été mute !")
        })
    }


        if (message.content === prefix + "pannel"){
            var sign_embed = new Discord.RichEmbed()
             .setColor("#FA0102")
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
                .addField("Nom :", "**ArcaBot**")
                .addField("Tag : :hash:", `#${bot.user.discriminator}`)
                .addField("ID : :id:", `${bot.user.id}`)
                .addField("Version :", "ArcaBot est en version 2.0")
                message.channel.sendEmbed(card_embed)
                console.log("La Carte d'identitée a été demandée !")
        }


if(message.content.startsWith(prefix + "clear")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: Désolé, vous n'avez pas la permission nécessaire pour executer la commande ! :no_entry:");

	let args = message.content.split(" ").slice(1);

	if(!args[0]) return message.channel.send(":no_entry: Indique un nombre de messages à supprimer ! :no_entry:")
	message.channel.bulkDelete(args[0]).then(() => {
	message.channel.send(`${args[0]} messages ont été supprimé(s) ! :thumbsup:`);
	console.log("La commande Clear a été demandée !")
	})

}

if(message.content.startsWith(prefix + "kick")) {
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Désolé, vous n'avez pas la permission nécessaire pour executer la commande ! :thumbsdown:");

    if (message.mentions.users.size === 0) {
        return message.channel.send(":no_entry: Vous devez mentionner un utilisateur ! :no_entry:")

    }

    var kick = message.guild.member(message.mentions.users.first());
    if(!kick) {
        return message.channel.send("L'utilisateur est introuvable ou inexistant ! :thumbsdown:")
    }

    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send("Je n'ai pas la permission pour exécuter la commande ! :thumbsdown:");
    }

    kick.kick().then(member => {
        message.channel.send(`${member.user.username} à été kick par ${message.author.username} :thumbsup:`)
        console.log("Un utilisateur a été kick");
    });
}

if(message.content.startsWith(prefix + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Désolé, vous n'avez pas la permission nécessaire pour executer la commande ! :thumbsdown:")

    if(message.mentions.users.size === 0) {
        return message.channel.send(":no_entry: Vous devez mentionner un utilisateur ! :no_entry:")
    }

    var ban = message.guild.member(message.mentions.users.first());
    if (!ban) {
        return message.channel.send("L'utilisateur est introuvable ou inexistant ! :thumbsdown:");
    }
    
    if (!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
        return message.channel.send("Je n'ai pas la permission pour exécuter la commande ! :thumbsdown:")
    }
    ban.ban().then(member => {
        message.channel.send(`${member.user.username} à été banni par ${message.author.username} :thumbsup:`)
    }

    )
}


var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <utilisateur> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <utilisateur> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <utilisateur> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes: :thumbsup:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes: :tumbsup:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <utilisateur> ");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <utilisateur> ");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès! :thumbsup:`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès! :thumbsup:`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }},)
  
  bot.on('message', message => {
      if (message.content.startsWith(prefix + "8ball")) {
    let args = message.content.split(" ").slice(1);
    let tte = args.join(" ")
    if (!tte){
      return message.reply(":no_entry: Veuillez poser une question ! :no_entry:")};
  
      var replys = [
        "Oui",
        "Non",
        "Je ne sais pas",
        "Peut-être",
        "Peut-être pas",
        "Sa dépend",
        "Surement",
        "Sans doute",
        "Probablement",
        "Probablement pas",
        "Absolument",
        "Absolument pas"
      ];
  
      let reponse = (replys[Math.floor(Math.random() * replys.length)])
      message.channel.send(reponse)
      console.log("La commande 8ball a été demandée")
    }})
