const dotenv = require('dotenv').config();
const { REST, Routes } = require('discord.js');

const clientId = process.env.DISCORD_BOT_ID;
const guildId = process.env.DISCORD_DEV_SERVER_ID;
const token = process.env.DISCORD_TOKEN;

const rest = new REST().setToken(token);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch((error) => {
        console.warn(`\x1b[33m(Ensure Variables Are Correct In .env)\x1b[39m`);
        console.error(error);
    });

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch((error) => {
        console.warn(`\x1b[33m(Ensure Variables Are Correct In .env)\x1b[39m`);
        console.error(error);
    });

