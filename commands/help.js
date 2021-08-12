const Discord = require('discord.js');
var respGeneral = '';
var respEntertainment = '';
var respMeme = '';
module.exports.run = async (client, message, args, op) => {
    var fs = require('fs');
        fs.readdir("./commands/", function (err, files) {
        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if (jsfile.length <= 0) {
            console.log("Couldn't find any commands.");
            return;
        }
        jsfile.forEach((f, i) => {
            let props = require(`../commands/${f}`);
            var cmd = props.help.catetory;
            if (cmd === 'General') {
                var desc = props.help.description;
                respGeneral += `${f.replace(".js",'')}: ${desc}\n`;
            }

            if (cmd === 'Entertainment') {
                var desc = props.help.description;
                respEntertainment +=`${f.replace(".js",'')}: ${desc}\n`;
            }
            if (cmd === 'Meme') {
                var desc = props.help.description;
                respMeme +=`${f.replace(".js",'')}: ${desc}\n`;
            }
        });    
        const embed = new Discord.MessageEmbed()
        .setTitle('Trợ giúp | Sử dụng v!lệnh')
       .addField('Chung', respGeneral)
       .addField('Giải trí', respEntertainment)
       .addField('Meme', respMeme)
       .setColor(0xF1C40F);
    message.channel.send({ embeds: [embed] });
    });
    
}

module.exports.help = {
    name: 'help',
    usage: 'help,h',
    catetory: 'General',
    description: 'Dùng để hiện bảng trợ giúp!'
}