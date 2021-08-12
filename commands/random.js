const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    var s = args[0];
    var x = args[1];
    var times = args[2]
    if (x > s && s > 0 && x > 0) {
        if (times < 1) {
            
        } else {
            for (var i = 0; i < times; i++) {
                message.channel.send(`${i+1}. Số ngẫu nhiên: ${between(s, x)}`);
            }
        }
    } else {
        message.channel.send('Giá trị đầu vào không đúng!');
    }
}

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

module.exports.help = {
    name: 'random',
    usage: 'random,ran',
    catetory: 'General',
    description: 'Dùng để tạo ra 1 số ngẫu nhiên!'
}