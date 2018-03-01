const TOKEN = process.env.TELEGRAM_TOKEN || '554993857:AAFmayNVU7_N-S2lhn1I3CS2RqA97NRQ3IE';
const TelegramBot = require('node-telegram-bot-api');
const options = {
    webHook: {
        // Port to which you should bind is assigned to $PORT variable
        // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
        port: process.env.PORT
        // you do NOT need to set up certificates since Heroku provides
        // the SSL certs already (https://<app-name>.herokuapp.com)
        // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
    }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://rcgpod-test-bot.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);

// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);

//const greetingPart = process.env.GREETING || `Спасибо, что ты с нами. Мы так давно тебя ждали! 🎲`;
//var greetingParts = [`Спасибо, что ты с нами. Мы так давно тебя ждали! 🎲`,`Располагайся поудобнее. И не стесняйся, твоё первое сообщение само себя не напишет 😉`,`Roses are red,\nViolets are blue,\nYou listened to us,\nNow we listen to you.❤️`,`Спасибо, что ты с нами! Если хочешь, можешь рассказать немного о себе, но это необязательно 😊`,`Здорово, что ты с нами! Рады новому собеседнику 🙃`];
//const greetingPart = process.env.GREETING || greetingParts[Math.floor(Math.random() * greetingParts.length)];

var greetingParts = ['Спасибо, что ты с нами. Мы давно тебя ждали! 😊','Не стесняйся, твоё первое сообщение само себя не напишет 😉','Чувствуй себя как дома 😎','Нам тебя не хватало 🙃','Обувь можно не снимать 🤓'];

bot.on('new_chat_members', (msg)=> {
    const { first_name, last_name, username } = msg.new_chat_member;
    const name = username ? username : `${first_name} ${last_name}`;
    
    var greetingPart = greetingParts[Math.floor(Math.random() * greetingParts.length)];
    
    const greeting = `Добро пожаловать, [${name}](tg://user?id=${msg.new_chat_member.id})! 🙌🏼

${greetingPart}`;
    bot.sendMessage(msg.chat.id, greeting, {parse_mode:'Markdown'});
})
