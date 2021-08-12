const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    var s = args;
    if (message.mentions.users.size) {
        message.channel.send('> ' + s + ' có độ simp là ' + Math.floor(Math.random() * 101) + '% simp');
    } else {
        message.channel.send('> Bạn có độ simp là ' + Math.floor(Math.random() * 101) + '% simp');
    }
}
module.exports.help = {
    name: 'howsimp',
    usage: 'howsimp',
    catetory: 'Meme',
    description: 'Dùng để kiểm tra độ dại gái của bạn!'
}