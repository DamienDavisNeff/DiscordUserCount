const dotenv = require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

process.on('uncaughtException', (error) => {
    console.error(error);
});

client.once(Events.ClientReady, () => {
	console.log('Ready!');
	UpdateMemberCount();
});

client.on("guildMemberAdd", UpdateMemberCount()); // RUNS WHEN MEMBER JOINS
client.on("guildMemberRemove", UpdateMemberCount()); // RUNS WHEN MEMBER LEAVES

client.login(token);

//

const config = require("./config.json");

async function UpdateMemberCount() {
	const server = client.guilds.cache.get(config.serverID);
	const memberAmount = server.memberCount.toLocaleString();
	const channel = server.channels.cache.get(config.channelID);
	channel.setName(config.channelName.replace("${memberAmount}",memberAmount));
}
