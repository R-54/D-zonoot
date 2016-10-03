var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var player;
var lookingRight = false;

function preload()
{
    // Background.
    game.load.image('cave', 'assets/cave.jpg');
    // Character.
    game.load.spritesheet('dude', 'assets/diver-swim.png', 73, 50);
}

function create()
{
    // Start physics system.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add a nice background.
    game.add.sprite(0,0, 'cave');

    // Add a player sprite to the game, with physics, gravity
    // and bounds enabled.
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.gravity.y = 10;
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.animations.add('swim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
}

function update()
{
    var cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;
    
    // The user press the left button.
    if(cursors.left.isDown)
    {
        if(lookingRight)
        {
            player.scale.x *= -1;
            lookingRight = false;
        }
        player.body.velocity.x = -150;
        player.animations.play('swim');
    }
    // The user press the right button.
    else if(cursors.right.isDown)
    {
        if(!lookingRight)
        {
            player.scale.x *= -1;
            lookingRight = true;
        }
        player.body.velocity.x = 150;
        player.animations.play('swim');
    }
    // The user press the up button.
    else if(cursors.up.isDown)
    {
        player.body.velocity.y = -80;
    }
    // The user press the down button.
    else if(cursors.down.isDown)
    {
        player.body.velocity.y = 80;
    }
    // The user stay still.
    else
    {
        player.animations.play('swim');
    }
}