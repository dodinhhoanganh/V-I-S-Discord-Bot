const Discord = require('discord.js');
const fs = require("fs");
const MESSAGE_CHAR_LIMIT = 1990;

const splitString = (string, prepend = '', append = '') => {
  if (string.length <= MESSAGE_CHAR_LIMIT) {
    return [string];
  }

  const splitIndex = string.lastIndexOf('\n', MESSAGE_CHAR_LIMIT - prepend.length - append.length);
  const sliceEnd = splitIndex > 0 ? splitIndex : MESSAGE_CHAR_LIMIT - prepend.length - append.length;
  const rest = splitString(string.slice(sliceEnd), prepend, append);

  return [`${string.slice(0, sliceEnd)}${append}`, `${prepend}${rest[0]}`, ...rest.slice(1)];
};
module.exports.run = async (client, message, args, op) => {
    const msg = await message.channel.send('```Loading...```');
    const msg1 = await message.channel.send('```Loading...```');
    let i = 1;
 
    var start = +new Date();
    var count = start;
    var curr = 0;
    var tpf = 0;
    while (i <= 6569)
    {
          curr = +new Date();
      		if (i % 30 == 0) //30 frames per second
			      tpf = 43;
		      else
			      tpf = 33;
          if((curr - count) >= tpf)
          {
             fs.readFile(`badapple\\BA` +  i + '.txt', 'utf8', async function(err, data) {
                  if (err) throw err;
                    var stringdata = splitString(data);
                    msg.edit('Render file: BA' + i +'.txt' + '```' + stringdata[0] + '```');
                    await msg1.edit('```' + stringdata[1] + '```');
                    console.log(data);
              });
              i++;
			        count += tpf;
          }
    }
}
module.exports.help = {
    name: 'badapple',
    usage: 'badapple,ba',
    catetory: 'Entertainment',
    description: 'Dùng để chơi video bad apple dưới dạng chữ!'
}