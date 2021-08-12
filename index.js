const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const {
    prefix,
    token,
} = require('./config.json');
const fs = require("fs");
const active = new Map();

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0)
        return console.log("Couldn't find any commands.");

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded! This is function ${i + 1}`);
        var cmd = props.help.usage;
        var command = cmd.split(",");
        for (var i = 0; i < command.length; i++) {
            client.commands.set(command[i], props);
        }
    });
});

client.once('ready', () => {
    console.info(`Ready! Logged in as ${client.user.tag}!`);
    client.user.setActivity("Sử dụng v!help để biết tính năng của các lệnh!");
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});
client.on("message", async message => {
    if (message.author.bot) { return; }
    if (!message.content.startsWith(prefix)) {
        return;
    } 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let op = {
        active: active
    }

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args, op); else message.channel.send(`Không tìm thấy lệnh!`);
})
client.on("guildMemberAdd", (member) => {
    let memberTag = member.user.tag;
    client.channels.find("name", "┏『welcome-and-goodbye").send("Chào mừng bạn " + memberTag + " đã đến với server của bọn mình nha, nhớ đọc luật nhé!");
});

client.login(token);