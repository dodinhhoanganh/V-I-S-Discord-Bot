const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    if (message.author.id === "447312343433478145") {
        if (args[0]) {
            message.channel.send(`>>> ***Lệnh:***\n${args.join(' ')}\n\n ***Đầu ra:***\n${eval(args.join(' '))}`);
        } else {
            message.channel.send('Bạn cần ghi một giá trị!');
        }
    } else {
        message.channel.send("Bạn không có quyền để dùng lệnh này!");
    }
    
}
module.exports.help = {
    name: 'eval',
    usage: 'eval,ev',
    catetory: 'System'
}