const dotenv = require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

process.on('uncaughtException', (error) => {
    console.error(error);
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
	UpdateMemberCount();
});

// RUNS WHEN MEMBER JOINS
client.on(Events.GuildMemberAdd, () => {
	UpdateMemberCount();
});
// RUNS WHEN MEMBER LEAVES
client.on(Events.GuildMemberRemove, () => {
	UpdateMemberCount();
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
client.login(token);

//

const config = require("./config.json");

async function UpdateMemberCount() {
	const server = client.guilds.cache.get(config.serverID);
	const memberAmount = server.memberCount.toLocaleString();
	const channel = server.channels.cache.get(config.channelID);
	channel.setName(config.channelName.replace("${memberAmount}",memberAmount));
}