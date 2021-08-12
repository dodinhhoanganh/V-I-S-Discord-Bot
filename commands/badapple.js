const Discord = require('discord.js');
const fs = require("fs");
module.exports.run = async (client, message, args, op) => {
    const msg = await message.channel.send('```Loading...```');
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
                    msg.edit('Render file: BA' + i +'.txt' + '```' + stringdata[0] + '```', {split: true});
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