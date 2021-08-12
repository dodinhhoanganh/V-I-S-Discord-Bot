const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    var s = args;
    if (message.mentions.users.size) {
        var n = parseInt(Math.random() * 21);
        var str = '> 8';
        message.channel.send('> Con c* của' + s + ': \n');
        for (var i = 0; i < n; i++) {
            var tmp = '=';
            str += tmp;
        }
        message.channel.send(str + 'D');
    } else {
        var n = parseInt(Math.random() * 21);
        var str = '> 8';
        message.channel.send('> Con c* của bạn' + ': \n');
        for (var i = 0; i < n; i++) {
            var tmp = '=';
            str += tmp;
        }
        message.channel.send(str + 'D');
    }
}

module.exports.help = {
    name: 'pennis',
    usage: 'pennis',
    catetory: 'Meme',
    description: 'Dùng để đo c* của bạn!'
}