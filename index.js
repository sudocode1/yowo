const Discord = require("discord.js");
const bot = new Discord.Client();
const randomer = require("randomer.js");
const sleep = require('system-sleep');


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
   

    switch(cmd) {
        case `${prefix}fight`:
            var enemyTypes = ["dummy"];
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

            if(currentEnemy === "dummy"){
                enemyHealth = 100
                
                while (playerHealth > 0) {
                    if(enemyHealth <= 0) {
                        return message.channel.send(`**${message.author.username}** wins!`);
                    } else {
                        
                        playerAttack();
                        
                        enemyAttack(30);

                        // setInterval(function () {}, 1000)
                        // playerAttack();
                        // setInterval(function () {}, 1000)
                        // enemyAttack(30);
                    }


                }

                message.channel.send(`**${currentEnemy}** wins!`)

                

            }

        break;
    }

});

bot.login("token");
