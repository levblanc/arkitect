const ora = require('ora')
const chalk = require('chalk')

exports.bold = (msg) => {
  console.log(chalk.bold(msg))
}

exports.info = (msg) => {
  console.log(chalk.blue(msg));
}

exports.success = (msg) => {
  console.log(chalk.green(msg));
}

exports.error = (msg) => {
  if (msg instanceof Error) {
    msg = msg.message
  }

  console.error(chalk.red(msg))
}

exports.warning = (msg) => {
  console.log(chalk.yellow(msg))
}

exports.list = (msgList, type = 'error') => {
  if (!msgList || !Array.isArray(msgList)) {
    console.error(chalk.red(
      'Error in logger.msgList. Param "msgList" is ' + msgList + '.\n'
    ))

    return
  }

  const coloredText = type === 'error' 
    ? chalk.red
    : chalk.yellow

  msgList.forEach((item) => {
    console.log(coloredText(`* ${item}`))
  })
}

exports.spinner = () => {
    let spinner

    const start = (msg) => {
      spinner = ora(msg)
      spinner.color = 'blue'
      spinner.start()
    }

    const stop = () => {
      spinner.stop()
    }

    const success = () => {
      spinner.succeed(chalk.green(msg))
    }

    const fail = () => {
      spinner.fail(chalk.red(msg))
    }

    const info = (msg) => {
      spinner.info(chalk.blue(msg))
    }

    return {
      start,
      stop,
      success,
      fail,
      info
    }
}