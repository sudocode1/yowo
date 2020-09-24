const Discord = require("discord.js");
const bot = new Discord.Client();
const randomer = require("randomer.js");
const wait = require('util').promisify(setTimeout);
const fs = require("fs");

const secret = require("./secret.json");


bot.on("ready", async () => {

    console.log(`Bot Online ${bot.user.tag}`);
    bot.user.setActivity("y!help");

});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.channel.send("denied");

    let prefix = "y!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
   

    switch(cmd) {
        case `${prefix}fight`:

            var data = JSON.parse(fs.readFileSync(`./fightdata.json`, `utf-8`));
            var userid = message.author.id;

            if(!data[userid]) {

                data[userid] = {
                    killed: 0
                }

                fs.writeFileSync(`./fightdata.json`, JSON.stringify(data));
            }

            var enemyTypes = ["dummy", "traveller", "zombie", "skeleton", "king zombie", "sans", "queen skeleton", "spider", "king spider"];
            var currentEnemy = randomer.array(enemyTypes);
            var enemyHealth, enemyCurrentHealth;
        
            var playerHealth = 120;



            var playerCurrentHealth;



            function playerAttack() {
            
                
                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth - Math.floor(Math.random() * 50 + data[userid].killed);
                
                message.channel.send(`**${message.author.username}** attacks **${currentEnemy}**!\n${currentEnemy}\'s health is now ${enemyHealth}`);
            }

            function enemyAttack(d) {
                
                playerCurrentHealth = playerHealth;
                playerHealth = playerCurrentHealth - Math.floor(Math.random() * d);
                
                message.channel.send(`**${currentEnemy}** attacks **${message.author.username}**!\n${message.author.username}\'s health is now ${playerHealth}`);
            }

            async function fight(eHealth, eMaxDamage) {
                enemyHealth = eHealth;

                var playerChanceHealth = 120 + data[userid].killed;

                playerHealth = playerChanceHealth;

                message.channel.send(`You have encountered **${currentEnemy}**!\nPlayer Health: ${playerHealth}\nPlayer Max Damage: ${50 + data[userid].killed}\nEnemy Health: ${enemyHealth}`);


                while (playerHealth > 0) {
                    if(enemyHealth <= 0) {

                        message.channel.send(`**${message.author.username}** wins!`);

                        var currentKills = data[userid].killed;

                        data[userid] = {
                            killed: currentKills + 1
                        }
        
                        fs.writeFileSync(`./fightdata.json`, JSON.stringify(data));

                        message.channel.send(`You now have **${data[userid].killed} kills**!`)

                        return;

                    } else {
                        await wait(2000);
                        playerAttack();
                        if(enemyHealth <= 0) {
                            message.channel.send(`**${message.author.username} wins!**`);

                            var currentKills = data[userid].killed;

                            data[userid] = {
                                killed: currentKills + 1
                            }
            
                            fs.writeFileSync(`./fightdata.json`, JSON.stringify(data));
    
                            message.channel.send(`You now have **${data[userid].killed} kills**!`)

                            return;
                        }
                        await wait(2000);
                        enemyAttack(eMaxDamage);
                    }
                }

                message.channel.send(`**${currentEnemy}** wins!`)
            }

            switch(currentEnemy) {

                // health, maxdamage

                case "dummy":
                    fight(100, 30);
                break;
                
                case "traveller":
                    fight(150, 70);
                break;

                case "zombie":
                    fight(70, 50);
                break;

                case "skeleton":
                    fight(80, 30);
                break;

                case "king zombie":
                    fight(35, 200);
                break;

                case "sans":
                    fight(1000000, 50000);
                break;

                case "queen skeleton":
                    fight(45, 170);
                break;

                case "spider":
                    fight(70, 25);
                break;

                case "king spider":
                    fight(700, 250);
                break;

                
            }

        break;

        case `${prefix}math`:
            
            if(args[0] === `add` || args[0] === `plus` || args[0] === `+`) {

                message.channel.send(parseFloat(args[1]) + parseFloat(args[2]));

            } else if(args[0] === `subtract` || args[0] === `minus` || args[0] === `-`) {

                message.channel.send(parseFloat(args[1]) - parseFloat(args[2]));

            } else if(args[0] === `multiply` || args[0] === `times` || args[0] === `x` || args[0] === `*`) {

                message.channel.send(parseFloat(args[1]) * parseFloat(args[2]));

            } else if(args[0] === `divide` || args[0] === `ed_sheeran_album` || args[0] === `/` || args[0] === `÷`) {

                message.channel.send(parseFloat(args[1]) / parseFloat(args[2]));

            } else {

                message.channel.send("unknown operation");

            } 
            
        break;

        case `${prefix}help`:
            var helpEmbed = new Discord.MessageEmbed()
            .setTitle(`yowo Command list`)
            .addField(`prefix is ${prefix}`,  `\`help\`\n\`fight\`\n\`stats\`\n\`math\``)
            message.channel.send(helpEmbed);
        
        break;

        case `${prefix}stats`:
            var data = JSON.parse(fs.readFileSync(`./fightdata.json`, `utf-8`));
            var userid = message.author.id;

            message.channel.send(`Your kills: ${data[userid].killed}\nYour health: ${data[userid].killed + 120}\nYour maximum damage: ${data[userid].killed + 50}`);
        break;

        case `${prefix}eval`:
            if(message.author.id !== secret.ownerid) return message.channel.send("stinky");

            function clean(text) {
                if (typeof(text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            }

            try {
                const code = args.join(" ");
                let evaled = eval(code);

                if (!typeof evaled === "string")
                    evaled = require("util").inspect(evaled);

                message.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
                  message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
                }
            
        break;

        case `${prefix}leaderboard`:
            var data = require("./fightdata.json");
            const str = Object
            .entries(data) // get an array of key-value pairs of the object: [[id, data]]
            .sort(([, a], [, b]) => b.killed - a.killed) // sort the array by the `.killed` property of the second element of the key-value array (data)
            .slice(0, 15) // get the first 15 elements of the sorted array
            .reduce((s, [id, data]) => `${s}<@${id}>: ${data.killed} killed\n`, ''); // reduce the array into a string

            const boardembed = new Discord.MessageEmbed()
            .addField("Top 15 Highest Levels", str)
            .setColor("#5cb3ff")

            message.channel.send(boardembed);

        break;

    }

});

bot.login(secret.token);
