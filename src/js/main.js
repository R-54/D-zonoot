var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var player;

function preload()
{
    // Background.
    game.load.image('cave', 'assets/cave.jpg');
    // Character.
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
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
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function update()
{
    var cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;
    
    // The user press the left button.
    if(cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    // The user press the right button.
    else if(cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
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
        player.animations.stop();
        player.frame = 4;
    }
}