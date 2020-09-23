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
            var enemyTypes = ["dummy", "traveller"];
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
                    fight(150, 70)
                break;
            }

        break;
    }

});

bot.login("token");
