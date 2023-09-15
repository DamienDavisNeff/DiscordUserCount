const dotenv = require('dotenv').config();
const { REST, Routes } = require('discord.js');

const clientId = process.env.DISCORD_BOT_ID;
const guildId = process.env.DISCORD_DEV_SERVER_ID;
const token = process.env.DISCORD_TOKEN;

const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch((error) => {
        console.warn(`\x1b[33m(Ensure Variables Are Correct In .env)\x1b[89m`);
        console.error(error);
    });