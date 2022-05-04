// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, channel_id, messages, min_pause, max_pause, stop } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    send_message();
});

function getRandomInt(upper_bound) {
    return Math.floor(Math.random() * upper_bound);
}

function send_message() {
    if (stop) {
        return;
    }
    const channel = client.channels.cache.get(channel_id);
    const message = messages[getRandomInt(messages.length)];
    channel.send(message);
    const delay = 1000 * (min_pause + Math.random() * (max_pause - min_pause));
    setTimeout(send_message, delay);
}

// Login to Discord with your client's token
client.login(token);
