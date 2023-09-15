const { SlashCommandBuilder, PermissionFlagsBits, Embed } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help about certain commands')
        .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),
    // ############################################
	async execute(interaction) {
        var warningEmbed = new EmbedBuilder()
            .setColor(0x00700b)
            .setTitle(`List Of Commands!`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .addFields(
                { name: "Help", value: "This command. `/help`"},
            )
        interaction.reply({ content: ``, embeds: [warningEmbed], ephemeral: true });
    },
};
