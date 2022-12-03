const fs = require('fs');
const chalk = require('chalk')
const moment = require('moment')
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')

function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}
})
}

function nocache(module, cb = () => { }) {
console.log(`Module ${module} Memantau Data Module Dan Memperbaiki`)
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})
}

require('../teamsbot')
nocache('../teamsbot', module => console.log(chalk.greenBright('[ TEAMS BOT ]  ') + time + chalk.cyanBright(` "${module}" Data diupdate!`)))

require('../help')
nocache('../help', module => console.log(chalk.greenBright('[ TEAMS BOT ]  ') + time + chalk.cyanBright(` "${module}" Data diupdate!`)))

require('../consoledata')
nocache('../consoledata', module => console.log(chalk.greenBright('[ TEAMS BOT ]  ') + time + chalk.cyanBright(` "${module}" Data diupdate!`)))

// Auto Update Server
require('./func_Server')
nocache('./func_Server', module => console.log(chalk.greenBright('[ TEAMS BOT ]  ') + time + chalk.cyanBright(` "${module}" Data diupdate!`)))

module.exports = { nocache, uncache }