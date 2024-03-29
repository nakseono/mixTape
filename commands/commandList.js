const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const embedMessage = new MessageEmbed()
.setColor("#8B00FF")
.setTitle(`믹스테잎 명령어 리스트`)
.addFields(
  {
    name: `\`/정보 [닉네임]\``,
    value: `로스트아크 전투정보실에서 [닉네임]의 데이터를 가져옵니다.
    예시 : \`/정보 홍길동\``,
  },
  {
    name: `\`/로아와 [닉네임]\``,
    value: `입력된 [닉네임]에 해당하는 로아와 링크를 출력합니다.
    예시 : \`/로아와 홍길동\``,
  },
  {
    name: `\`/정산 [닉네임]\``,
    value: `입력된 [닉네임]이 보유한 캐릭터 목록과 주간 수입을 출력합니다.
    예시 : \`/정산 홍길동\``,
  },
  {
    name: `\`/사사게 [닉네임]\``,
    value: `입력된 [닉네임]을 로스트아크 인벤 사건/사고 게시판에 검색합니다.
    예시 : \`/사사게 홍길동\`
    + 여러 닉네임을 한꺼번에 검색하고 싶으면
    닉네임 사이에 \`/\` 를 추가하면 됩니다.
    예시 : \`/사사게 홍길동/고길동/둘리\``,
  },
  {
    name: `\`/경매 [가격]\``,
    value: `입력된 [가격]에 대하여 최대 얼마까지 입찰해야 이득인지 계산합니다.
    예시: \`/경매 3000\``,
  },
  {
    name: `\`/분배 [가격]\``,
    value: `입력된 [가격]에 대하여 얼마를 입찰하면\n공대원들과 나눴을 때 1/N이 되는지 계산합니다.
    예시 : \`/분배 3000\``,
  },
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('명령어')
		.setDescription('mixTape봇의 모든 명령어를 출력합니다.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [embedMessage] });
	},
};