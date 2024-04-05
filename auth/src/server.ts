import application from '@/app/application'
import serverSettings from './settings/server.settings'

const startupText = `[${serverSettings.port}] - [${serverSettings.appName}] - Listening`
application.listen(serverSettings.port, () => console.log(startupText))
