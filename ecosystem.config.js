'use strict';

module.exports = {
  apps: [{
    name: "main_server",
    script: "nodejs_mysql_copy/server.js",
    watch: ["nodejs_mysql_copy/app/", "nodejs_mysql_copy/server.js"],
    // Delay between restart
    watch_delay: 1000

  },{
    name      : 'yarn',
    cwd       : 'nodejs_mysql_copy/REACT/app/',
    script    : 'yarn',
    args      : 'start',
    interpreter: '/bin/bash',
    watch: ["nodejs_mysql_copy/REACT/app/public/", "nodejs_mysql_copy/REACT/app/src/"],
    // Delay between restart
    watch_delay: 1000
  },{
    name: "websocket_server",
    script: "websocket_server/server.js",
    watch: ["websocket_server/server.js"],
    // Delay between restart
    watch_delay: 1000

  }]
}