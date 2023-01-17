// const count: number = Irobot.historyOfJobComplete.length;

const time: string = Irobot.historyOfJobComplete[0].Timestamp

IfNotifications.sendNotification.setMessage(time);