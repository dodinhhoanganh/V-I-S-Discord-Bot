const Discord = require('discord.js');
module.exports.run = async (client, message, args, op) => {
    let n = args;
    const num = Number(n);
    if (num < 101 && num > 0) {
        message.channel.bulkDelnodeete(num);
        message.channel.send('Đã xóa ' + n + ' tin nhắn trong kênh');
    } else {
        message.channel.send('Số ' + n + ' quá lớn hoặc quá nhỏ, mình không thể thực hiện lệnh với con số này!');
    }
}
module.exports.help = {
    name: 'delete',
    usage: 'delete,del',
    catetory: 'General',
    description: 'Dùng để xóa tin nhắn!'
}