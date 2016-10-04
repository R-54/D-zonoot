var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var isLookingRight = false;
var player;
var cursors;

function preload()
{
    // Background.
    game.load.image('cave', 'assets/cave.jpg');
    // Character.swimming
    game.load.spritesheet('diver', 'assets/diver-swim.png', 73, 50);
    // Character attacking witha knive
    game.load.spritesheet('diver-knive', 'assets/diver-knive.png', 80, 50);
}

function create()
{
    // Start physics system.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add a nice background.
    game.add.sprite(0,0, 'cave');

    // Add a player sprite to the game, with physics, gravity
    // and bounds enabled.
    player = game.add.sprite(32, game.world.height - 150, 'diver');
    game.physics.arcade.enable(player);
    player.body.gravity.y = 10;
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.animations.add('swim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);

    // Populate cursors.
    cursors = game.input.keyboard.createCursorKeys();
}

function update()
{
    player.body.velocity.x = 0;
    
    // The user press the left button.
    if(cursors.left.isDown)
    {
        if(isLookingRight)
        {
            player.scale.x *= -1;
            isLookingRight = false;
        }
        
        // Check if the player wants to move in a diagonal direction.
        if(cursors.up.isDown)
            player.body.velocity.y = -100;
        else if(cursors.down.isDown)
            player.body.velocity.y = 100;

        player.body.velocity.x = -150;
        player.animations.play('swim');
    }
    
    // The user press the right button.
    else if(cursors.right.isDown)
    {
        if(!isLookingRight)
        {
            player.scale.x *= -1;
            isLookingRight = true;
        }

        // Check if the player wants to move in a diagonal direction.
        if(cursors.up.isDown)
            player.body.velocity.y = -100;
        else if(cursors.down.isDown)
            player.body.velocity.y = 100;

        player.body.velocity.x = 150;
        player.animations.play('swim');
    }
    
    // The user press the up button.
    else if(cursors.up.isDown)
        player.body.velocity.y = -100;
    
    // The user press the down button.
    else if(cursors.down.isDown)
        player.body.velocity.y = 100;

    // The user stay still.
    else
        player.animations.play('swim');
}