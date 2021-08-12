const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    if (args[0]) {
        message.channel.bulkDelete(1);
        message.channel.send(join(args));
    } else {
        message.channel.bulkDelete(1);
        message.channel.send('> Giá trị đầu vào không hợp lý!');
    }
}

function join(args) {
    var str = args.join(" ");
    return str;
}

module.exports.help = {
    name: 'say',
    usage: 'say',
    catetory: 'General',
    description: 'Dùng để khiến bot nói!'
}