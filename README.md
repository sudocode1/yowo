# yowo
The Discord Fighting bot <br>

## Some base information
- Made in discord.js 11.6.4
- Random arrays made with randomer.js 1.0.1

## How it works
First off, the variables are set. <br>
enemyTypes is a list of enemy types (obviously). <br>
currentEnemy is set using Math.random via randomer.js, it will pick a random enemy type from the list. <br>
enemyHealth and enemyCurrentHealth are both set with no value. <br>

playerHealth is set to 120 as there is __currently__ no system for deciding player health. <br>
playerCurrentHealth are set to no value.

```js
var enemyTypes = ["dummy"];
var currentEnemy = randomer.array(enemyTypes);
var enemyHealth, enemyCurrentHealth;
            
var playerHealth = 120;
var playerCurrentHealth;
```


The fighting system itself is built with very basic functions.
`playerAttack()` and `enemyAttack(d)`

playerAttack()

enemyCurrentHealth is set to enemyHealth which at first is set after a enemy is picked.


```js
if(currentEnemy === "dummy"){
    fight(100, 30);
}
```

```js
async function fight(eHealth, eMaxDamage) {
        enemyHealth = eHealth;
```

Otherwise, enemyCurrentHealth is set to enemyHealth after the last attack. <br>
This is to avoid errors in the attack process itself.

After this, enemyHealth is set to enemyCurrentHealth (which has just been set to enemyHealth) - a random number from 0 to 50.

The message for the attack and the health left is then shown.


```js
function playerAttack() {
            
                
    enemyCurrentHealth = enemyHealth;
    enemyHealth = enemyCurrentHealth - Math.floor(Math.random() * 50);
                
    message.channel.send(`**${message.author.username}** attacks **${currentEnemy}**!\n${currentEnemy}\'s health is now ${enemyHealth}`);
    }
```

enemyAttack(d)

The only difference here is because the max damage of an enemy is dependent upon the type of enemy. <br>
`d` is the maximum damage. <br>
So, rather than the calculation being a random number from 0 to 50, it will be a random number from 0 to the value of `d`

```js
function enemyAttack(d) {
                
    playerCurrentHealth = playerHealth;
    playerHealth = playerCurrentHealth - Math.floor(Math.random() * d);
                
    message.channel.send(`**${currentEnemy}** attacks **${message.author.username}**!\n${message.author.username}\'s health is now ${playerHealth}`);
    }
```

## Making it run

After the enemy is selected, an elseif statement is run to see what process to run. <br>
enemyHealth in the context of `dummy` is set to 100.

A while loop is run checking if the playerHealth is above 0. <br>
While it is, the enemyHealth is then checked if it is less than or equal to (`<=`) 0. <br>
If the enemy health is less than or equal to 0, the loop will end and send the message that the player wins. <br>

Otherwise, `playerAttack()` and `enemyAttack(d)` is run.
In this context, the maximum amount of damage the dummy can do is 30, which is why `enemyAttack(d)` is `enemyAttack(30)`. <br>

This is done using an async function, so now you only have to put fight(enemymaxhealth, enemymaxdamage)<br>

```js
async function fight(eHealth, eMaxDamage) {
        enemyHealth = eHealth;

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
```

```js
if(currentEnemy === "dummy"){
    fight(100, 30);
}```