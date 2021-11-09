const cron = require("node-cron");

const loaAlarm = (message, client) => {
  // console.log("알람 실행");

  //? 알람 전달 할 채널과 역할 ID 찾는 파트.
  let alarmChannelID = String(
    client.channels.cache.find((x) => x.name === "로스트아크-알람")
  ).slice(2, -1);

  let alarmRoleID = message.guild.roles.cache.find(
    (role) => role.name === "loaAlarm"
  );

  // console.log(`alarmChannelID : ${alarmChannelID}`);
  // console.log(`alarmRoleID : ${alarmRoleID}`);

  //? 알람 메시지들 정리.

  const message_MON = `${alarmRoleID}\n\`\`\`diff\n월요일 로스트아크 일정\n\n- 카오스 게이트 & 모험섬 출현 10분 전입니다.\n\n+ 카오스 게이트는 매 정시마다, 모험섬은 11:00, 13:00, 19:00, 21:00, 23:00 에 열립니다.\`\`\``;
  const message_TUE = `${alarmRoleID}\n\`\`\`diff\n화요일 로스트아크 일정\n\n- 필드 보스 & 유령선 & 모험섬 출현 10분 전입니다.\n\n+ 필드 보스와 유령선은 매 정시마다,\n+ 모험섬은 11:00, 13:00, 19:00, 21:00, 23:00 에 열립니다.\`\`\``;
  const message_WED = `${alarmRoleID}\n\`\`\`diff\n수요일 로스트아크 일정\n\n- 모험섬 출현 10분 전입니다.\n\n+ 모험섬은 11:00, 13:00, 19:00, 21:00, 23:00 에 열립니다.\`\`\``;
  const message_THU = `${alarmRoleID}\n\`\`\`diff\n목요일 로스트아크 일정\n\n- 카오스 게이트 & 유령선 & 모험섬 출현 10분 전입니다.\n\n+ 카오스 게이트와 유령선은 매 정시마다,\n+ 모험섬은 11:00, 13:00, 19:00, 21:00, 23:00 에 열립니다.\`\`\``;
  const message_FRI = `${alarmRoleID}\n\`\`\`diff\n금요일 로스트아크 일정\n\n- 필드 보스 & 모험섬 출현 10분 전입니다.\n\n+ 필드 보스는 매 정시마다, 모험섬은 11:00, 13:00, 19:00, 21:00, 23:00 에 열립니다.\`\`\``;
  const message_SAT = `${alarmRoleID}\n\`\`\`diff\n토요일 로스트아크 일정\n\n- 카오스 게이트 & 유령선 & 모험섬 출현 10분 전입니다.\n\n+ 카오스 게이트와 유령선은 매 정시마다,\n+ 모험섬은 9:00, 11:00, 13:00, 19:00, 21:00, 23:00 에 열립니다.\n\n+ 주말 모험섬은 1부 9:00, 11:00, 13:00 \n+ 2부 19:00, 21:00, 23:00 로 나뉘며, 각각 보상 획득이 가능합니다.\`\`\``;
  const message_SUN = `${alarmRoleID}\n\`\`\`diff\n일요일 로스트아크 일정\n\n- 카오스 게이트 & 필드 보스 & 모험섬 출현 10분 전입니다.\n\n+ 카오스 게이트와 필드 보스는 매 정시마다,\n+ 모험섬은 9:00, 11:00, 13:00, 19:00, 21:00, 23:00 에 열립니다.\n\n+ 주말 모험섬은 1부 9:00, 11:00, 13:00 \n+ 2부 19:00, 21:00, 23:00 로 나뉘며, 각각 보상 획득이 가능합니다.\`\`\``;

  //? 각 시간별 cron 표현식 정리.
  // [월, 화, 목, 금] 은 시간대가 같으니까 묶자.
  // 수요일..은 조금 어려울 것 같고, 주말에 다음날 8시 50분에도 알림이 가는데 해결해야할 듯.
  // 현재 EC2 인스턴스가 한국 시간 기준으로 9시간이 느림. (10시 50분) -> (1시 50분)
  // 그러면...

  const rule_MTTF = (day) => {
    // MON TUE THU FRI SAT SUN 월화목금토일 11시 ~ 24시 -> 2~15
    return `50 2-15 * * ${day}`;
  };

  const rule_WED_09 = `50 23 * * TUE`;
  const rule_WED_11 = `50 2 * * WED`;
  const rule_WED_19 = `50 10 * * WED`;
  const rule_WED_21 = `50 12 * * WED`;
  const rule_WED_23 = `50 14 * * WED`;

  const rule_SAT_09 = `50 23 * * FRI`;

  const rule_SUN_09 = `50 23 * * SAT`;

  // const test = `* 2 * * TUE`;

  // let now = new Date();
  // console.log(now);
  // console.log(now.getHours());

  //! 월
  cron.schedule(rule_MTTF(`MON`), () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_MON);
  });

  //! 화
  cron.schedule(rule_MTTF(`TUE`), () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_TUE);
  });

  //! 수 (5개)
  cron.schedule(rule_WED_09, () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_WED);
  });

  cron.schedule(rule_WED_11, () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_WED);
  });

  cron.schedule(rule_WED_19, () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_WED);
  });

  cron.schedule(rule_WED_21, () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_WED);
  });

  cron.schedule(rule_WED_23, () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_WED);
  });

  //! 목
  cron.schedule(rule_MTTF(`THU`), () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_THU);
  });

  //! 금
  cron.schedule(rule_MTTF(`FRI`), () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_FRI);
  });

  //! 토 (2개)
  cron.schedule(rule_SAT_09, () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_SAT);
  });

  cron.schedule(rule_MTTF(`SAT`), () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_SAT);
  });

  //! 일 (2개)

  cron.schedule(rule_SUN_09, () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_SUN);
  });

  cron.schedule(rule_MTTF(`SUN`), () => {
    client.channels.cache.get(`${alarmChannelID}`).send(message_SUN);
  });
};

module.exports = { loaAlarm };
