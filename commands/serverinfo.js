const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    message.channel.send(`Tổng thành viên: ${message.guild.memberCount}\nTổng số người: ${message.guild.members.filter(member => !member.user.bot).size} \nTổng số bot: ${message.guild.members.filter(member => member.user.bot).size}\nTổng số text chat: ${message.guild.channels.filter(channels => channels.type === 'text').size}\nTổng số voice chat: ${message.guild.channels.filter(channels => channels.type === 'voice').size} \nTổng số thể loại kênh chat: ${message.guild.channels.filter(channels => channels.type === 'category').size} \nTổng số các kênh: ${message.guild.channels.size} \nTổng số role: ${message.guild.roles.size}`);
}
module.exports.help = {
    name: 'serverinfo',
    usage: 'serverinfo',
    catetory: 'General',
    description: 'Dùng để xem thông tin máy chủ!'
}