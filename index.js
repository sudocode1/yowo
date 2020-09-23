const Discord = require("discord.js");
const bot = new Discord.Client();
const randomer = require("randomer.js");
const wait = require('util').promisify(setTimeout);


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
            var enemyTypes = ["dummy", "traveller", "zombie", "skeleton", "king zombie", "sans"];
            var currentEnemy = randomer.array(enemyTypes);
            var enemyHealth, enemyCurrentHealth;
        
            var playerHealth = 120;
            var playerCurrentHealth;



            function playerAttack() {
            
                
                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth - Math.floor(Math.random() * 50);
                
                message.channel.send(`**${message.author.username}** attacks **${currentEnemy}**!\n${currentEnemy}\'s health is now ${enemyHealth}`);
            }

            function enemyAttack(d) {
                
                playerCurrentHealth = playerHealth;
                playerHealth = playerCurrentHealth - Math.floor(Math.random() * d);
                
                message.channel.send(`**${currentEnemy}** attacks **${message.author.username}**!\n${message.author.username}\'s health is now ${playerHealth}`);
            }

            async function fight(eHealth, eMaxDamage) {
                enemyHealth = eHealth;

                var playerChanceHealth = playerHealth + Math.floor(Math.random() * 100);
                playerHealth = playerChanceHealth;

                message.channel.send(`You have encountered **${currentEnemy}**!\nPlayer Health: ${playerHealth}\nEnemy Health: ${enemyHealth}`);


                while (playerHealth > 0) {
                    if(enemyHealth <= 0) {
                        return message.channel.send(`**${message.author.username}** wins!`);
                    } else {
                        await wait(2000);
                        playerAttack();
                        if(enemyHealth <= 0) {
                            return message.channel.send(`**${message.author.username} wins!**`);
                        }
                        await wait(2000);
                        enemyAttack(eMaxDamage);
                    }
                }

                message.channel.send(`**${currentEnemy}** wins!`)
            }

            switch(currentEnemy) {
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
            .addField(`prefix is ${prefix}`,  `\`help\`\n\`fight\`\n\`math\``)
            message.channel.send(helpEmbed);
        
        break;


    }

});

bot.login("token");
