const Discord = require('discord.js');
module.exports.run = (client, message, args, op) => {
    let fetched = op.active.get(message.guild.id);

    if (!fetched) return message.channel.send('> Hiện không có bài hát nào được chơi trong hàng chờ!');

    let queue = fetched.queue;
    let nowPlaying = queue[0];

    let resp = `>>> __**Đang chơi bài hát**__\n**${nowPlaying.songTitle}** | **Yêu cầu bởi:** *${nowPlaying.requester}*\n\n__**Hàng chờ**__\n`;

    for (var i = 1; i < queue.length; i++) {
        resp += `>>> ${i}. **${queue[i].songTitle}** | **Yêu cầu bởi:** *${queue[i].requester}*\n`;
    }

    message.channel.send(resp);
}
module.exports.help = {
    name: 'queue',
    usage: 'queue,q',
    catetory: 'Entertainment',
    description: 'Dùng để kiểm tra hàng chờ!'
}