const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    if (!message.member.voiceChannel) return message.channel.send('Bạn cần ở trong voice chat!');
    if (!message.guild.me.voiceChannel) return message.channel.send('Mình không ở trong voice chat!');
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('Bạn cần ở chung voice chat với mình nha!');
    message.guild.me.voiceChannel.leave();
    message.channel.send('> Leaved channel!');
}

module.exports.help = {
    name: 'leave',
    usage: 'leave',
    catetory: 'Entertainment',
    description: 'Dùng để thoát bot khỏi voice chat nếu bot đang ở trong voice chat!'
}