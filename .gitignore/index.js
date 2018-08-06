const Discord = require('discord.js');
const {get} = require('snekfetch');
const queue = new Map();
var bot = new Discord.Client();
var dispatcher;
var servers = {};
var prefix = ("-")

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '[-all]', type: 0}});
    console.log("Le bot a démarré !");
});

bot.login(process.env.TOKEN);

bot.on("guildMemberAdd", member => {
  member.guild.channels.find("name", "discussion").send(`Salut ${member}, Bienvenue sur **Arcadia** !🎈🎉👍 `)
})

bot.on("guildMemberAdd", member => {
  member.createDM().then(channel => {
    return channel.send("```Salut et merci d'avoir rejoint Arcadia ! 👍  N'hésite pas a faire un tour dans le règlement pour savoir ce qu'il faut faire/pas faire ! 😉 Je te recommande également de visiter le channel Premiers_Pas pour savoir quoi faire !👌👣```");
  }).catch(console.error)
});

bot.on("guildMemberRemove", member => {
  member.guild.channels.find("name", "discussion").send(`${member} est parti d'**Arcadia** 🙁 👎 `)
})

bot.on('guildMemberAdd', member => {
  var role = member.guild.roles.find('name', 'Membres Connectés');
  member.addRole(role)
})
                
bot.on('message', message => {
  if (message.channel.type === "dm") return;
        if (message.content === "-surprise"){
          var find_embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle("Félicitation !")
                .setDescription("Bravo à toi, tu à découvert ma commande cachée !")
                .addField("Va voir l'administrateur (@𝕸𝖎𝖓𝖊𝕾𝖊𝖎𝖘𝖒𝖊#5131) pour recevoir ta récompense ! (Mentionne moi et écris : `Je l'ai trouvé`).", "Tu sera emenné dans un channel privé ou tu devra envoyer un screen de ce message pour prouver la découverte de la commande ! :thumbsup:")
                .setFooter("PS : NE PARTAGE PAS LA COMMANDE SOUS PEINE DE BANNISSEMENT !")
                message.author.send({embed: find_embed});
            message.delete();
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
                .addField("-Rcat :", "Affiche une image de chat aléatoire .")
                .addField("-joke", "Affiche une blague aléatoire .")
                message.channel.sendEmbed(fun_embed);
                console.log("Les commandes d'Amusement ont été demandées !");
        }

        if (message.content === prefix + "m modo"){
		if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send(":no_entry: Désolé, vous n'avez pas le grade approprié pour accéder à ce menu ! :no_entry:");
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

        if (message.content.startsWith(prefix + "joke")) {
          let args = message.content.split(" ").slice(1);
        
            var replys = [
              "Un jour Dieu dit à Casto de ramer. Et depuis, **Casto rama** .",
              "Qu'est-ce qu'une manifestation d'aveugles? | Un festival de Cannes .",
              "C'est l'histoire d'un gars qui rentre dans un bar, puis dans une table, puis dans une chaise...",
              "Quelle est la mamie qui fait peur au voleurs ? | Mamie Traiette .",
              "Comment fait-on pour allumer un barbecue breton ? | On utilise des breizh .",
              "Où est-ce que les super héros vont-ils faire leurs courses ? | Au supermarché .",
              "Comment est ce que les abeilles communiquent entre elles ? | Par e-miel .",
              "Que dit-on d'une fleur qui a eu zéro à son contrôle ? | Qu'elle s'est planté .",
              "Que fait un employé de chez Sephora à sa pause clope ? | Il parfumer .",
              "Que fait une lampe quand elle se fait agresser ? | Elle crie **A LED !!!** .",
              "Qu'est ce qu'une carotte dans une flaque d'eau ? | Un bonhomme de neige en été .",
              "Quelle est la fée que les enfants détestent ? | La fée C .",
              "Quel est le super héros qui a tout le temps peur ? | Le super-sticieux .",
              "Comment les musiciens choisissent-ils leur parquet ? | Ils choisissent un parquet Fa Si La Si Ré .",
              "Quel est le réseau préféré des pêcheurs ? | Truiteur .",
              "Comment reconnaît-on un cannibale ? | Il mange des petits Suisses .",
              "Que fait une vache quand elle ferme les yeux ? | Du lait concentré .",
              "Quel est le super héros qui donne le plus vite l'heure ? | Speed heure man .",
              "Pourquoi est-ce que les anges sont sourds ? | Parce que Jésus Christ .",
              "Quel est le fruit préféré des profs d'histoire ? | Les dates .",
              "Quelle est la déesse du wifi ? | La déesse L .",
              "Quelle est l'arme préféré des vegans ? | Le lance roquette .",
              "Qu'est-ce qu'un hamster dans l'espace ? | Un hamsteroïde .",
              "Pourquoi est-ce que Winnie l'Ourson veut absolument se marier ? | Pour partir en lune de miel .",
              "Que dit une mère à son fils geek quand le dîner est servi ? | Alt Tab !",
              "Quelle est la meilleure heure pour écouter de la musique ? | Deezer !",
              "Que fait un geek quand il descend du métro ? | Il libère la RAM .",
              "Quel est l'animal le plus connecté ? | Le porc USB .",
              "Où vont les biscottes pour danser ? | En biscothèque .",
              "Comment appelle-t-on un chat qui va dans l'espace ? | Un chatellite .",
              "Que dit Fredon devant sa maison ? | **C’est là que j’hobbit .**",
              "Que dit un chihuahua japonais pour dire bonjour ? | **Konichihuahua !**",
              "Où va Messi quand il se blesse ? | À la pharmessi ! ",
              "Quel est le système préféré des Italiens ? | Windows Vista .",
              "Avec quelle monnaie les marins payent-ils ? | Avec des sous marins .",
              "Que dit un informaticien quand il s'ennuie ? | **J'me fichier !**",
              "Pourquoi est-ce que la Saint Valentin est davantage fêtée dans le Nord ? | Parce que ça se fête en famille !",
              "Quel est le crustacé le plus léger de la mer ? | La palourde .",
              "Pourquoi un chasseur emmène-t-il son fusil aux toilettes ? | Pour tirer la chasse !",
              "Que fait un jardinier quand il ment ? | Il raconte des salades !",
              "Quel est le fast food préféré de Flash ? | Quick .",
              "Quel est le carburant le plus détendu ? | Le kérosène .",
              "Que fait un geek quand il a peur ? | Il URL .",
              "Que dit un rappeur quand il rentre dans une fromagerie ? | Faites du brie ! ",
              "Comment savoir qu'un rat est content ? | Il souris .",
              "Pourquoi est ce que Potter est triste ? | Parce que personne Harry à sa blague .",
              "Qu'est ce qu'un cadeau qui s'en va ? | Une surprise party !",
              "Pourquoi est-ce que les bières sont toujours stressées ? | Parce qu’elles ont la pression .",
              "Qu'est-ce que fait un hibou dans une casserole ? | Hi-bou .",
              "Pourquoi est ce que Hulk a un beau jardin ? | Parce qu’il a la main verte .",
              "Pourquoi est-ce que les moutons aiment le chewing-gum ? | Parce que c’est bon pour la laine !",
              "Quel est le sport préféré des insectes ? | Le criquet .",
              "Quel est le café préféré des espagnols ? | Le café Olé .",
              "Quel est l'aliment le plus hilarant ? | Le riz .",
              "Que dit une noisette quand elle tombe à l'eau ? | **Au secours, je me noix !**",
              "Que dit une imprimante dans l'eau ? | **J’ai papier !!!**",
              "Quel est le jambon que tout le monde déteste ? | Le sale ami .",
              "Que se passe-t-il quand 2 poissons s'énervent ? | Le thon monte .",
              "Pourquoi est-ce que les vêtements sont toujours fatigués quand ils sortent de la machine ? | Parce qu’ils sont léssivés .",
              "Pourquoi est-ce que les mexicains mangent-ils aux toilettes ? | Parce qu’ils aiment manger épicé !",
              "Que faisaient les dinosaures quand ils n'arrivaient pas à se décider ? | Des tirageosaures !",
              "Qu'est-ce qu'un tennisman adore faire ? | Rendre des services .",
	"L'autre jour j'ai raconté une blague à un parisien, il a Paris :/",

"C'est l'histoire d'un shtroumf qui court, qui tombe et qui se fait un bleu .",

"Que demande un douanier à un cochon qui passe la frontière ? | Son passe-porc .",

"Pourquoi est-ce que les livres ont-ils toujours chaud ? | Parce qu’ils ont une couverture .",

"Pourquoi les livres de maths sont toujours tristes ? | Car ils ont plein de problèmes .",

"Vous connaissez l'histoire de l'armoire ? | Elle est pas commode...",

"L'autre jour, j’ai raconté une blague sur Carrefour, mais elle a pas supermarché…",

"Dans la phrase **le voleur a volé une télévision**, où est le sujet ? | En prison !",

"- Docteur, je crois que j'ai besoin de lunettes. | - Oui certainement. Ici c'est une banque.",

"Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ? | Un chat-peint de Noël !",

"Tu connais le parfum **Pur Hasard** ? | Non ? Alors tu mets ton doigt dans ton derrière puis tu le sens et si ça sent bon c'est du **Pur Hasard**.",

"Qu'est-ce qu'un steak qui n'en est pas un ? | Une pastèque ( pas steak ) !",

"Quelles sont les lettres les moins visibles ? | **F , A , C**",

"- Docteur j'ai mal à l'oeil qauche quand je bois mon café. | - Essayez d'enlever la cuillère de la tasse.",

"Quelle est la différence entre un ascenseur et une cigarette ? | Il n'y en a pas. Tous les deux font des cendres...",

"Quel est l'animal qui a le plus de dents ? | La petite souris !",

"Qu'est-ce qu'une duche? | Une douche sans o...",

"Que trouve t-on à l'intérieur d'un nez bien propre ? | Des empreintes digitales !",

"Qui est-ce qui tourne la tête avant de pleurer ? | Le robinet ! ",

"Qu'est-ce qu'un tube de colle avec une cape ? | SuperGlue !",

"Qu'est-ce qui est vert et qui pousse sous l'eau ? | Un chou marin !",

"Savez-vous pourquoi le Père Noël rit tout le temps ? | Parce que ce n'est pas lui qui paye les cadeaux !",

"Quelle est la différence entre la grammaire et le divorce ? En grammaire, c'est le masculin qui l'emporte.",

"Comment ramasse-t-on la papaye ? | Avec une foufourche .",

"Comment apelles-t-on deux petits pois morts ? | Les restes d'un bon duel...",

"Tu connais la blague du photographe ? | Elle est pas encore développée !",

"Qu'est-ce qui est jaune et qui court vite ? Un citron pressé !",

"Qu'est ce qui est jaune et qui attend ? | Johnatan !",

"- Maman, c'est quoi de la lingerie coquine ? | - De la hot couture !",

"Quelle est la différence entre une BMW et une LADA ? | Dans la BMW t'as l'airbag et dans la LADA t'as l'air con !",

"Quel est le seul instrument à vent avec une corde ? | Le string !",

"Que dit la sorcière à son mari quand elle trouve une chose très facile à faire ? | -Ce n’est pas sorcier !",

"Vous avez 5 euros dans votre poche, vous en perdez deux. Qu'est-ce que vous avez dans votre poche ? | Un trou !",

"Que dit un sucre à un café ? | -Plouff...",

"Quelle est la ville la plus vieille du monde ? | Milan !",

"Pourquoi Mickey Mousse ? | Parce que Mario brosse. ",

"Un iceberg vient d'être papa. Comment l'annonce-t-il à ses amis ? | **C'est un petit glaçon** !",

"Qu'est-ce qui fait **zzzb, zzzb,...** ? | Une mouche qui vole à l'envers !",

"C’est l’histoire d’un poil. Avant il était bien, et maintenant, il est pubien...",

"Comment s'appelle la femelle du hamster ? | Hamsterdam .",

"Vous connaissez l'histoire du lit vertical ? | C'est une histoire à dormir debout.",

"Pourquoi Barbie n'a pas d'enfants ? | Parce que Ken est vendu dans une boite séparée .",

"Quel est le fruit préféré des militaires de carrière ? | La grenade .",

"Pourquoi les pêcheurs ne sont jamais gros ? | Parce qu'ils surveillent leur ligne .",

"C'est quoi un canife ? | Un petit fien .",

"Que ne faut-il jamais dire à un antiquaire ? | **Alors, quoi de neuf ?",

"Deux gars sont au camping. Il fait nuit, et l'un deux dit : **On va dormir : ça te tente ?**",

"Qui sait parler toutes les langues sans jamais les apprivoiser ? Le téléphone !",

"Connais-tu la blague sur le chocolat ? | Non ? C'est normal, je l'ai mangé hier ! ",

"Connais-tu l’histoire de l’homme qui habitait juste en face du cimetière ? | - Non. | - Eh bien, maintenant, il habite en face de chez-lui !",

"C'est l'histoire d’un pingouin qui respire par les fesses . | Un jour il s'assit et il meurt.",

"Ce soir, on sera tous devant la télé. Pourquoi ? | Parce que derrière il n'y a rien a voir...",

"Qu'est ce qui est jaune et plein de poils ? | **Une tartine beurrée tombée sur la moquette .**",
            ];
        
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            message.channel.send(reponse)
            console.log("Une blague a été demandée")
          }

        if (!message.content.startsWith(prefix)) return;
          if (message.channel.type === "dm") return;
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
            .addField("Date d'arrivée sur Arcadia :clock3: :", message.member.joinedAt)
            .setThumbnail(message.author.avatarURL)
            message.reply("Je t'ai envoyé tes stats en MP ! :thumbsup:")
            message.author.send({embed: stats_embed});
            console.log("Un utilisateur a réclamé ses statistiques")
         } 



        if (!message.content.startsWith(prefix)) return;
          if (message.channel.type === "dm") return;
        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "share":

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

        if (!message.content.startsWith(prefix)) return;

        var args = message.content.substring(prefix.length).split(" ");
    
        switch (args[0].toLowerCase()) { 
    
            case "GUYEDCDHSDDJ":
    
            var userCreateDate = message.author.createdAt.toString().split(" ");
            var msgauthor = message.author.id;
    
            var stats_embed = new Discord.RichEmbed()
            .setColor("#6699FF")
            .setTitle(`Statistiques du joueurs : ${message.author.username}`)
            .addField(`ID du joueurs :id:`, msgauthor, true)
            .addField(`Date d'inscription du joueur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
            .setThumbnail(message.author.avatarURL)
            message.reply("Tu peux regarder tes messages privés !")
            message.author.send(stats_embed);
    
            break;
            
      case "play":
      if (message.channel.type === "dm") return;
        if (!args[1]) {
    
        message.channel.sendMessage("Tu dois m’indiquer un lien YouTube"); 
    
        return;
    
      }
    
        if(!message.member.voiceChannel) {
    
        message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 
    
        return;
    
      }
    
    
        if(!servers[message.guild.id]) servers[message.guild.id] = {
    
        queue: []
    
      };
    
    
      var server = servers[message.guild.id];
    
    
      server.queue.push(args[1]);
    
      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
    
      play(connection, message) 
    
      });
    
      break; 
    
      case "skip":
      if (message.channel.type === "dm") return;
        if(!message.member.voiceChannel) {
    
        message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 
    
        return;
    
      }
    
        var server = servers[message.guild.id];
    
        if(server.dispatcher) server.dispatcher.end();
    
        break;
    
      case "stop":
      if (message.channel.type === "dm") return;
    
        if(!message.member.voiceChannel) 
        
        return message.channel.send(":x: Tu dois être dans un salon vocal");
    
        message.member.voiceChannel.leave();
    
        break;
      
      }
    
        if(message.content === prefix + "FXGW<ZFVDGSDFGE") {
            var info_embed = new Discord.RichEmbed()
            .setColor("#40A497")
            .setTitle("Voici les informations sur moi et le serveur !")
            .addField(" :robot: Nom :", `${client.user.tag}`, true)
            .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
            .addField("ID :id: ", `${client.user.id}`)
            .addField("Nombre de membres", message.guild.members.size)
            .addField("Nombre de catégories et de salons", message.guild.channels.size)
            .setFooter("Info - Tuto")
            message.channel.sendMessage(info_embed)
            console.log("Un utilisateur a effectué la commande d'info !")
    }

    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type === "dm") return;
  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
      case "about":

      var about_embed = new Discord.RichEmbed()

      .setColor("#FE8F01")
      .setTitle("Voici les informations à propos du serveur et du reste :")
      .addField("A propos du bot :", "**Voici des infos sur le bot**")
      .addField("Crédits :", "Ce bot à été créé par Valentin (@𝕸𝖎𝖓𝖊𝕾𝖊𝖎𝖘𝖒𝖊) sur Visual Code avec node.js (en JavaScript) avec la participation des Tutoriels, de @Albamort et de @Eliot .")
      .addField("Hébergement", "Il est hébergé sur Heroku afin de vous offrire un bot actif 24/7")
      .addField("A propos d'Aradia :", "**Voici des infos à propos d' Arcadia**")
      .addField("L'histoire d'Arcadia :", "Arcadia à été créé par Valentin (@𝕸𝖎𝖓𝖊𝕾𝖊𝖎𝖘𝖒𝖊) pour (de base), aider lui et ses abonnés à communiquer au travers de channels, mais personne ne venait et il a décidé de continuer à développer son serveur et à en faire de la pub et cela a commencé à créer une communautée ! Un grand merci à vous, qui avez aidé le serveur à rester debout :) <3")
      .addField("La commande secrete :", "Une commande est cachée dans le serveur ! Si tu la trouve en premier, tu gagne une surprise")
      .setFooter("A propos - ArcaBot")
      message.reply("Je t'ai envoyé les infos en MP")
      message.author.send({embed: about_embed});
      console.log("Un utilisateur a voulu en savoir plus (about)")
  }

    if(message.content.startsWith(prefix + "mute")) {
        if (message.channel.type === "dm") return;
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
            message.channel.send(`${mute.user.username} est désormais mute ! 🔇 :thumbsup:`);
            console.log("Un utilisateur a été mute !  :thumbsup:")
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
      if (message.channel.type === "dm") return;
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
            message.channel.send(`${mute.user.username} est désormais démute ! 🔊 :thumbsup:`);
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
                .addField("Date de création : :clock3:", message.guild.createdAt)
                .addField("Version : :arrows_counterclockwise: ", "ArcaBot est en version 2.2")
                message.channel.sendEmbed(card_embed)
                console.log("La Carte d'identitée a été demandée !")
        }


        if(message.content.startsWith(prefix + "clear")){
          if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send(`:no_entry:  ${message.author}, je pense que vous n'avez pas les permissions nécessaires pour ça. ツ:no_entry:`);
   
           let args = message.content.split(" ").slice(1);
   
           if(!args[0]) return message.channel.send(` ${message.author}, :no_entry: Il faut préciser le nombre de messages à supprimer ! (Maximum 100 messages):no_entry:`)
           message.channel.bulkDelete(args[0]).then(() => {
                     message.channel.send(`:white_check_mark: ${args[0]} message(s) a/ont bien été supprimé(s) avec succès ! :white_check_mark:`).then(message =>
           bot.setTimeout(function() {
             message.delete();
           }, 2000)
         );
           console.log("Des messages ont été supprimés avec succès!")}) 
       }


 if(message.content.startsWith(prefix + "kick")) {
  if (message.channel.type === "dm") return;
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
  if (message.channel.type === "dm") return;
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
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes: :thumbsup:");
 
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
 
  }
  


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

    bot.on('message', message => {
      if (message.content.startsWith(prefix + "sondage")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: Désolé, vous n'avez pas la permission nécessaire pour executer la commande ! :no_entry:");
	    message.delete();
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ");
            var embed = new Discord.RichEmbed()
                .setDescription("Sondage")
                .addField(thingToEcho, "Répondez avec :white_check_mark: ou :x:")
                .setColor('RANDOM');
                message.guild.channels.find("name", "❓sondages").sendEmbed(embed)
                .then(function (message) {
                  message.react("✅")
                  message.react("❌")
                }).catch(function() {
                });
  }
    });

    bot.on('message', message => {
      if (message.content.startsWith(prefix + "Rcat")){
        try {
            get('https://aws.random.cat/meow').then(res =>{
              const embed = new Discord.RichEmbed()
              .setDescription(`:cat: Voila un chat pour ${message.author.username}`)
              .setImage(res.body.file)
              .setColor('RANDOM')
              return message.channel.send({embed});
            })
        } catch(err) {
            return message.channel.send(error.stack);
        }
      }
    })
    
  
