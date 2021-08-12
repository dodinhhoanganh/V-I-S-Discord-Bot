const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    var s = args;
    if (message.mentions.users.size) {
        message.channel.send('> ' + s + ' có độ gay là ' + Math.floor(Math.random() * 101) + '% gay');
    } else {
        message.channel.send('> Bạn có độ gay là ' + Math.floor(Math.random() * 101) + '% gay');
    }
}
module.exports.help = {
    name: 'howgay',
    usage: 'howgay',
    catetory: 'Meme',
    description: 'Dùng để kiểm tra độ gay của bạn!'
}