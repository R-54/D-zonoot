var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var player;

function preload(){
    game.load.image('cave', '/assets/cave.jpg');
    game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0, 'cave');

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 100;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function update(){
    var cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;
    if(cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }else if(cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }else if(cursors.up.isDown){
        player.body.velocity.y = -150;
    }else if(cursors.down.isDown){
        player.body.velocity.y = 150;
    }else{
        player.animations.stop();
        player.frame = 4;
    }
}