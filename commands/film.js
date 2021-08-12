const Discord = require('discord.js');
const URI = require('uri-js');
const util = require('util');
const td = new util.TextDecoder('UTF-8', { fatal: true })
module.exports.run = async (client, message, args, op) => {
    if (!message.member.voiceChannel) return message.channel.send('Bạn cần ở trong voice chat!');
    const permissions = message.member.voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT")) return message.channel.send("Mình không thể kết nối tới voice channel này, có vẻ hình như là mình không có quyền!");
    if (!permissions.has("SPEAK")) return message.channel.send("Mình không thể kết nối tới voice channel này, có vẻ hình như là mình không có quyền!");
    if (!args[0]) return message.channel.send('Sử dụng v!film <tên phim hoặc url>(chỉ hỗ trợ phimmoizz.net)');
    const voiceChat = message.member.voiceChannel.join();

    if (args[0] === 'skip') {
        return skip(client, op, args, message);
    }

    if (args[0] === 'queue') {
        return queueFilm(client, op, args, message);
    }

    if (waitforRespond === true) {
        if (args[0] < 6 && args[0] > 0) {
            waitforRespond = false;
            if (!queue[0]) {
                queue.push(`${filmName[args[0] - 1]} | Độ dài: ${filmLength[args[0] - 1]} | URL: ${URLARRAY[args[0] - 1]}`);
                message.channel.send(`>>> Now Playing: ${filmName[args[0] - 1]} | Length: ${filmLength[args[0] - 1]} | URL: ${URLARRAY[args[0] - 1]}`);
            } else {
                queue.push(`${filmName[args[0] - 1]} | Độ dài: ${filmLength[args[0] - 1]} | URL: ${URLARRAY[args[0] - 1]}`);
                message.channel.send(`>>> Đã thêm vào hàng chờ: ${filmName[args[0] - 1]} | Độ dài: ${filmLength[args[0] - 1]} | URL: ${URLARRAY[args[0] - 1]}`);
            }
        } else {
            return CancelRespondThenSearch(client, op, args, message);
        }
    } else {
        if (!args[0].includes('http://www.phimmoizz.net/phim/')) {
            return searchfilm(client, op, args, message);
        }

    }   
}

function skip(client, op, args, message) {
    if (!args[1] && !args[2]) {
        message.channel.send(`>>> Bỏ qua phim: ${queue[0]}!`);
        queue.splice(0, 1);
    } else {
        message.channel.send(`>>> Đã bỏ qua những phim có số thứ tự từ ${args[1]} đến ${args[2]}!`);
        queue.splice(args[1] - 1, args[2]);
    }
    if (queue.length > 0) {
        message.channel.send(`>>> Đang chơi phim: ${queue[0]}`);
    }
}

function queueFilm(client, op, args, message) {
    if (queue.length > 0) {
        let resp = '';
        resp += `>>> ***Phim đang chạy:***\n${queue[0]}\n\n***Hàng chờ:***`;
        for (var i = 1; i < queue.length; i++) {
            resp += `\n${i}. ${queue[i]}`;
        }
        message.channel.send(resp);
    } else {
        message.channel.send("> Không có phim nào hiện đang chơi!");
    }
    
}

function CancelRespondThenSearch(client, op, args, message) {
    waitforRespond = false;
    searchfilm(client, op, args, message);
}

async function play(client, op, data, message) {

}

var waitforRespond = false;
var URLARRAY;
var filmName;
var filmLength;
var queue = new Array();

function searchfilm(client, op, args, message) {
    var urlsearch = td.decode(Buffer.from('http://www.phimmoizz.net/tim-kiem/' + EditString(args.join("-")) + "/"));
    var request = require('request');
    var htmldata = "";
    request(urlsearch, function (error, response, body) {
        htmldata = body;
        if (htmldata.includes('<ul class="list-movie">')) {
            var pos = htmldata.search('<ul class="list-movie">');
            var contentfromultoend = htmldata.substr(pos);
            var poscloseul = contentfromultoend.search('</ul>');
            var content = htmldata.substr(pos, poscloseul + 5);
            var count = occurrences(content, "</li>");
            let resp = '';
            URLARRAY = new Array();
            filmName = new Array();
            filmLength = new Array();
            resp += `List movies:\n`;
            var i = 0;
            while (i < count && i < 5) {
                var posURL = content.search('<a class="block-wrapper" title="');
                var contentfromurltoend = content.substr(posURL);
                var posURLClose = contentfromurltoend.search('</a>');
                var URLContent = content.substr(posURL, posURLClose + 4);
                var posHref = URLContent.search('href="');
                var contentHref = URLContent.substr(posHref);
                var endHref = contentHref.search('/">');
                var OnlyURL = URLContent.substr(posHref, endHref + 1).replace('href="', 'http://www.phimmoizz.net/') + "xem-phim.html";
                URLARRAY.push(OnlyURL);
                var postime = content.search('<span class="movie-title-chap">');
                var contentfromtimetoend = content.substr(postime);
                var posclosetime = contentfromtimetoend.search('</span>');
                var time = content.substr(postime, posclosetime).replace('<span class="movie-title-chap">', '').replace('</span>', '').replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>').replace('&nbsp;', ' ').replace('&lsquo;', '‘').replace('&rsquo;', '’').replace('&larr;', '←').replace('&uarr;', '↑').replace('&rarr;', '→').replace('&amp;', '&').replace('&quot;', '"').replace('phút', 'min').replace('tập', 'chap');
                var posname = content.search('<span class="movie-title-1">');
                var contentfromnametoend = content.substr(posname);
                var posclose = contentfromnametoend.search('</span>');
                var name = content.substr(posname, posclose + 7).replace('<span class="movie-title-1">', '').replace('</span>', '').replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>').replace('&nbsp;', ' ').replace('&lsquo;', '‘').replace('&rsquo;', '’').replace('&larr;', '←').replace('&uarr;', '↑').replace('&rarr;', '→').replace('&amp;', '&').replace('&quot;', '"');
                var filmindex = content.search('<li class="movie-item">');
                var contentfromfilm = content.substr(filmindex);
                var posclose3 = content.search('</li>');
                var contentfromfilm1 = content.substr(contentfromfilm, posclose3 + 5);
                content = content.replace(contentfromfilm1, '');
                resp += (`${i + 1}. ${name} | Độ dài: ${time}\n`);
                filmName.push(name);
                filmLength.push(time);
                i++;
            }
            message.channel.send(resp);
            waitforRespond = true;
        } else {
            message.channel.send("Xin lỗi, mình không tìm được phim nào!");
            waitforRespond = false;
        }
    });
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function EditString(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\s+/g, ' ');
    str.trim();
    return str;
}

module.exports.help = {
    name: 'film',
    usage: 'film,movie',
    catetory: 'Entertainment',
    description: 'Dùng để xem phim!'
}