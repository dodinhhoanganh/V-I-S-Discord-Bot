const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    const msg = await message.channel.send(`Pinging...`);
    msg.edit(`Pong! Độ trễ là ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nĐộ trễ của API là ${Math.round(client.ping)}ms!`)
}

module.exports.help = {
    name: 'ping',
    usage: 'ping',
    catetory: 'General',
    description: 'Dùng để kiểm tra độ trễ!'
}