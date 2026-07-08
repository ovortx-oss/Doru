import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } from 'discord.js';

// ─── Primary Red Color ───
const EMBED_COLOR = 0xd32f2f;

export const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('🚀 Automatically build a full server (Channels, Roles, Permissions)')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand(sub => sub
    .setName('gaming')
    .setDescription('🎮 Build a complete GAMING server')
  )
  .addSubcommand(sub => sub
    .setName('school')
    .setDescription('📚 Build a complete SCHOOL / STUDY server')
  )
  .addSubcommand(sub => sub
    .setName('community')
    .setDescription('🤝 Build a complete COMMUNITY server')
  );

export async function execute(interaction) {
  // ─── Admin Check ───
  if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle('⛔ Access Denied')
      .setDescription('You need **Administrator** permissions to use this command.');
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  const sub = interaction.options.getSubcommand();

  // ─── 1. GAMING TEMPLATE ───
  if (sub === 'gaming') {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLOR)
      .setTitle('🎮 Building Your Gaming Server...')
      .setDescription('Creating channels, voice zones, and configuring roles with permissions...');
    await interaction.reply({ embeds: [embed], ephemeral: true });

    try {
      // Categories
      const infoCat = await interaction.guild.channels.create({ name: '📋 SERVER INFO', type: ChannelType.GuildCategory });
      const gameCat = await interaction.guild.channels.create({ name: '🎮 GAMING HUB', type: ChannelType.GuildCategory });
      const voiceCat = await interaction.guild.channels.create({ name: '🔊 VOICE CHANNELS', type: ChannelType.GuildCategory });

      // Text Channels
      await interaction.guild.channels.create({ name: '📜 rules', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '📢 announcements', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '👋 welcome', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '💬 general-chat', type: ChannelType.GuildText, parent: gameCat });
      await interaction.guild.channels.create({ name: '🎯 lfg', type: ChannelType.GuildText, parent: gameCat });
      await interaction.guild.channels.create({ name: '📸 clips', type: ChannelType.GuildText, parent: gameCat });
      await interaction.guild.channels.create({ name: '🤖 bot-commands', type: ChannelType.GuildText, parent: gameCat });

      // Voice Channels
      await interaction.guild.channels.create({ name: '🎙️ General Voice', type: ChannelType.GuildVoice, parent: voiceCat });
      await interaction.guild.channels.create({ name: '🏆 Competitive', type: ChannelType.GuildVoice, parent: voiceCat });
      await interaction.guild.channels.create({ name: '🎧 Chill Zone', type: ChannelType.GuildVoice, parent: voiceCat });

      // Roles with Permissions
      await interaction.guild.roles.create({ 
        name: 'Team Lead', 
        color: '#3498db',
        permissions: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.KickMembers, PermissionFlagsBits.ModerateMembers]
      });
      await interaction.guild.roles.create({ name: 'Gamer', color: '#2ecc71' });
      await interaction.guild.roles.create({ name: 'Streamer', color: '#e74c3c', mentionable: true });
      await interaction.guild.roles.create({ name: 'Pro Player', color: '#f1c40f' });
      await interaction.guild.roles.create({ name: 'Noob', color: '#95a5a6' });

      const doneEmbed = new EmbedBuilder()
        .setColor(EMBED_COLOR)
        .setTitle('✅ Gaming Server Ready! 🎮')
        .setDescription('Your gaming community is fully built with permissions pre-configured.')
        .addFields(
          { name: '📂 Categories', value: '3 created', inline: true },
          { name: '💬 Text Channels', value: '7 created', inline: true },
          { name: '🔊 Voice Channels', value: '3 created', inline: true },
          { name: '👤 Roles', value: '5 created (Team Lead has Kick/Manage permissions)', inline: false }
        );
      await interaction.editReply({ embeds: [doneEmbed] });

    } catch (err) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xED4245)
        .setTitle('❌ Setup Failed')
        .setDescription(`\`${err.message}\``);
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  }

  // ─── 2. SCHOOL TEMPLATE ───
  else if (sub === 'school') {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLOR)
      .setTitle('📚 Building Your School Server...')
      .setDescription('Setting up classrooms, study rooms, and faculty roles...');
    await interaction.reply({ embeds: [embed], ephemeral: true });

    try {
      const infoCat = await interaction.guild.channels.create({ name: '📋 CAMPUS INFO', type: ChannelType.GuildCategory });
      const studyCat = await interaction.guild.channels.create({ name: '📖 STUDY ROOMS', type: ChannelType.GuildCategory });
      const voiceCat = await interaction.guild.channels.create({ name: '🔊 LECTURE HALLS', type: ChannelType.GuildCategory });

      await interaction.guild.channels.create({ name: '📜 school-rules', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '📢 announcements', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '👋 introductions', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '💬 general-study', type: ChannelType.GuildText, parent: studyCat });
      await interaction.guild.channels.create({ name: '🧮 math-help', type: ChannelType.GuildText, parent: studyCat });
      await interaction.guild.channels.create({ name: '🔬 science-lab', type: ChannelType.GuildText, parent: studyCat });
      await interaction.guild.channels.create({ name: '✍️ essay-review', type: ChannelType.GuildText, parent: studyCat });
      await interaction.guild.channels.create({ name: '🎙️ Study Group 1', type: ChannelType.GuildVoice, parent: voiceCat });
      await interaction.guild.channels.create({ name: '🎙️ Study Group 2', type: ChannelType.GuildVoice, parent: voiceCat });
      await interaction.guild.channels.create({ name: '🧘 Focus Room', type: ChannelType.GuildVoice, parent: voiceCat });

      await interaction.guild.roles.create({ 
        name: 'Teacher', 
        color: '#e74c3c',
        permissions: [PermissionFlagsBits.KickMembers, PermissionFlagsBits.ModerateMembers, PermissionFlagsBits.ManageMessages]
      });
      await interaction.guild.roles.create({ name: 'TA', color: '#3498db' });
      await interaction.guild.roles.create({ name: 'Student', color: '#2ecc71' });
      await interaction.guild.roles.create({ name: 'Graduate', color: '#f1c40f' });

      const doneEmbed = new EmbedBuilder()
        .setColor(EMBED_COLOR)
        .setTitle('✅ School Server Ready! 📚')
        .setDescription('Your study community is live. Teachers can manage messages.')
        .addFields(
          { name: '📂 Categories', value: '3', inline: true },
          { name: '💬 Text Channels', value: '7', inline: true },
          { name: '🔊 Voice Channels', value: '3', inline: true }
        );
      await interaction.editReply({ embeds: [doneEmbed] });

    } catch (err) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xED4245)
        .setTitle('❌ Setup Failed')
        .setDescription(`\`${err.message}\``);
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  }

  // ─── 3. COMMUNITY TEMPLATE ───
  else if (sub === 'community') {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLOR)
      .setTitle('🤝 Building Your Community Server...')
      .setDescription('Creating social hubs, meeting spaces, and community roles...');
    await interaction.reply({ embeds: [embed], ephemeral: true });

    try {
      const infoCat = await interaction.guild.channels.create({ name: '📋 COMMUNITY INFO', type: ChannelType.GuildCategory });
      const socialCat = await interaction.guild.channels.create({ name: '💬 SOCIAL HUB', type: ChannelType.GuildCategory });
      const voiceCat = await interaction.guild.channels.create({ name: '🔊 MEETING SPOTS', type: ChannelType.GuildCategory });

      await interaction.guild.channels.create({ name: '📜 community-guidelines', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '📢 announcements', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '👋 introductions', type: ChannelType.GuildText, parent: infoCat });
      await interaction.guild.channels.create({ name: '💬 general-chat', type: ChannelType.GuildText, parent: socialCat });
      await interaction.guild.channels.create({ name: '🖼️ art-gallery', type: ChannelType.GuildText, parent: socialCat });
      await interaction.guild.channels.create({ name: '📸 photography', type: ChannelType.GuildText, parent: socialCat });
      await interaction.guild.channels.create({ name: '🎵 music-corner', type: ChannelType.GuildText, parent: socialCat });
      await interaction.guild.channels.create({ name: '🎙️ Town Hall', type: ChannelType.GuildVoice, parent: voiceCat });
      await interaction.guild.channels.create({ name: '🎧 Music Lounge', type: ChannelType.GuildVoice, parent: voiceCat });

      await interaction.guild.roles.create({ 
        name: 'Community Lead', 
        color: '#e74c3c',
        permissions: [PermissionFlagsBits.Administrator]
      });
      await interaction.guild.roles.create({ 
        name: 'Moderator', 
        color: '#3498db',
        permissions: [PermissionFlagsBits.KickMembers, PermissionFlagsBits.ModerateMembers, PermissionFlagsBits.ManageMessages]
      });
      await interaction.guild.roles.create({ name: 'Member', color: '#2ecc71' });
      await interaction.guild.roles.create({ name: 'VIP Supporter', color: '#f1c40f' });

      const doneEmbed = new EmbedBuilder()
        .setColor(EMBED_COLOR)
        .setTitle('✅ Community Server Ready! 🤝')
        .setDescription('Your community is now live. Moderators have kick/ban permissions.')
        .addFields(
          { name: '📂 Categories', value: '3', inline: true },
          { name: '💬 Text Channels', value: '7', inline: true },
          { name: '🔊 Voice Channels', value: '2', inline: true }
        );
      await interaction.editReply({ embeds: [doneEmbed] });

    } catch (err) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xED4245)
        .setTitle('❌ Setup Failed')
        .setDescription(`\`${err.message}\``);
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  }
}