<h1 align='center'> Rainbow Studios: Where Development Begins!  </h1
<a href="https://discord.gg/gf56GZA6mp"><img src="http://invidget.switchblade.xyz/gf56GZA6mp"/></a> <br>
https://discord.gg/gf56GZA6mp
JOIN FOR ERRORS AND SUPPORT

### Discord Bot Listbot

- Easy To setup and run the bot
- Tested by **ME**

### How to setup?

- Go to https://discord.dev/ and create a application
- Copy your `TOKEN` and paste in [`index.js`](https://github.com/TajuModding/discord-bot-list-command-based/blob/main/index.js) `line 69`
- Fill `line 20-30` of `client.settings` [`index.js`](https://github.com/TajuModding/discord-bot-list-command-based/blob/main/index.js)
```js
client.settings = {
    prefix: "REPLACE_PREFIX", //Put ur prefix "/" is the prefix in Rainbow Studios
    token: "REPLACE_TOKEN", //Put your token from discord.dev
    addChannel: "ADD_CHANNEL_ID", //The channel ID where users can run `/bot-add <BOT ID>`
    logChannel :"LOG_CHANNEL_ID", //The log channel id where all logs will go
    modRole: "BOT_TESTER_ROLE_ID", //the role id which can accept bots	
    processChannel: "TESTING_CHANNEL_ID", //	Where '/accept' and '/deny' commands will only work
    emoji: "☑️", //the emoji reacted to all successfull commands
    devRole: "DEVOLOPER_ROLE_ID" //the role id given to users when thier bot's are accepted
    
 }
```

### How to run the bot?

- Open console type node `index.js`

### [LICENSE](https://github.com/TajuModding/discord-bot-list-command-based/blob/main/LICENSE)
```
MIT License

Copyright (c) 2021 Tejas Lamba

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
