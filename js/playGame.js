class playGame extends Phaser.Scene
{	
	constructor()
	{
		super("PlayGame");
	}
	create()
	{ 
	/* calling functions */
		console.log('into create');
		this.createWorld();
		this.createPlayer();
		this.createCat1();
		this.createCat2();	
		this.createCat3();
		this.createCat4();	
		this.createCat5();
		this.createCat6();	
		this.createFood();
		this.createGull();
 		this.setCollider();	
		
	/* UI & audio */
		this.add.image(230,40,'point');
		this.scoreDisplay();
		cursors = this.input.keyboard.createCursorKeys();
        damage = this.sound.add("damage");
        system1 = this.sound.add("system1");
        system4 = this.sound.add("system4");
		
	/* set a button to go into scene UserGuide */		
		toGuide = this.add.image(410,40,'toGuide');
		toGuide.setInteractive();
		toGuide.on('pointerdown',function()
		{
			console.log("into toGuide");			
			system1.play();			
			
			this.scene.start("UserGuide");
		},this);
		
	/* set a button to go into scene MyTomo */		
		toTomo = this.add.image(45,40,'toTomo');
		toTomo.setInteractive();
		toTomo.on('pointerdown',function()
		{
			console.log("into toTomo");
			system1.play();
			
			this.scene.start("MyTomo");
		},this);	
		
	/* set a button to go into scene gameEntrance */		
		var btnEnd = this.add.sprite(60,780,'btnSet',2);
		btnEnd.scaleX *= 0.6;
		btnEnd.scaleY *= 0.6;
		btnEnd.setInteractive();
		btnEnd.on('pointerdown',function()
		{
			console.log("into btnEnd");
			system1.play();
			BGM.stop();
			this.scene.start("GameEntrance");
			
		},this);			
}
	update()
	{ 
		this.updateCursors();
		this.updateFood();
		this.updateCat(cat1);
		this.updateCat(cat2);
		this.updateCat(cat3);
		this.updateCat(cat4);
		this.updateCat(cat5);
		this.updateCat(cat6);
		this.hideGull();
		this.unlockTomo();
	}
	
/* World */
	createWorld()
	/* construct the world */
	{
		this.add.image(225, 400, 'bg1');
		var bg2 = this.add.image(225, 400, 'bg2')
			.setAlpha(0);
		this.add.image(225, 604, 'pier');
		ground = this.physics.add.staticGroup();
		ground.create(225, 778, 'grwnd');	
		
		this.tweens.add({
		/* switching background every 6 seconds */
			targets: bg2,
			alpha: { value: 1, duration: 60000, ease: 'Power1' },
			yoyo: true,
			loop: -1
		});
	}

/* Score Display */	
	scoreDisplay()
	{
		scoreText = this.add.text(335, 20, score, { 
			font: '30px "Gamja Flower"',
			fill: '#7a2a33',
			//align: 'right',
			wordWrap: {width: 300}
		}).setOrigin(1, 0);
	}
/* Player */
	createPlayer()
	/* create a player */
	{
		console.log('into createPlayer');
		player = this.physics.add.sprite(400,650,'player',1);
		player.setBounce(0.4)
			  .setCollideWorldBounds(true);	
		this.animPlayer();
	}
	animPlayer()
	/* animating the player's action */
	{
		this.anims.create({
			key:'left',
			frames:this.anims.generateFrameNumbers(
				'player',
				{start:4,end:5}
			),
			frameRate:8,
			repeat:-1
		});
		this.anims.create({
			key:'default',
			frames:[{key:'player',frame:1}],
		});
		this.anims.create({
			key:'feed',
			frames:[
				{key:'player',frame:2},
				{key:'player',frame:3},
				{key:'player',frame:1}
			],
			frameRate:4,
			repeat:-1
		});	
		this.anims.create({
			key:'right',
			frames:this.anims.generateFrameNumbers(
				'player',
				{start:6,end:8}
			),
			frameRate:8,
			repeat:-1
		});		
	}
	updateCursors()
	/* update the player's action and call associated animation */
	{
		if (cursors.left.isDown)
		/* player move to left by pressing left key*/
        {
			console.log('left is down');
            player.setVelocityX(-160);
			player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
		/* player move to right by pressing right key*/
        {
			console.log('right is down');
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
		else if(cursors.down.isDown) 
		/* player get ready to feed by pressing down key*/
		{	
			console.log('down is down');
			player.setVelocityX(0);
			player.anims.play('feed', true);
			this.feedCat();
		}
		else
		/* default setting for the player */
        {
			//console.log('default');
            player.setVelocityX(0);
            player.anims.play('default');
        }		
	}
/* Cat */
	/* create 6 cats and each cat call functions */
	createCat1(){
		cat1 = this.physics.add.sprite(0,750,'nekoSet',0);
		this.defaultCat(cat1);
		this.settingCat(cat1);  
	}
	createCat2(){
		cat2 = this.physics.add.sprite(0,750,'nekoSet',0);	
		this.defaultCat(cat2);
		this.settingCat(cat2);  
	}
	createCat3(){
		cat3 = this.physics.add.sprite(0,750,'nekoSet',0);			
		this.defaultCat(cat3);
		this.settingCat(cat3);  
	}
	createCat4(){
		cat4 = this.physics.add.sprite(0,750,'nekoSet',0);	
		this.defaultCat(cat4);
		this.settingCat(cat4);  
	}
	createCat5(){
		cat5 = this.physics.add.sprite(0,750,'nekoSet',0);	
		this.defaultCat(cat5);
		this.settingCat(cat5);  
	}
	createCat6(){
		cat6 = this.physics.add.sprite(0,750,'nekoSet',0);
		this.defaultCat(cat6);
		this.settingCat(cat6);  
	}
	defaultCat(c)
	/* default setting for the cats */
	{
		console.log('into defaultCat');
		cat = c;
		cat.setAlpha(0)	
		   .setCollideWorldBounds(true)
		   .body.setOffset(0, 0)
		   .setBounce(1, 0);
		this.physics.world.enable([ cat ]);
	}
	settingCat(c)
	/* produce randome settings */
	{
		console.log('into settingCat');
		cat = c;
		
	/* select cat from 3 sprites  */ 	
		var catFace = Phaser.Math.Between(0, 2);
		cat.setFrame(catFace); 		
		cat.enableBody(true);
		
	/* make cat appear  */ 	
		this.tweens.add({
			targets: cat,
			alpha: {value: 1, duration: 1000, ease:'Power1'},
		});			
		
	/* set Position/Acceleration/Gravity at randome */
		var catY = Phaser.Math.Between(-50, 200);
		var catX = Phaser.Math.Between(0, 550);
		var catXGv = Phaser.Math.Between(-5, 5);
		var catXAc = Phaser.Math.Between(-3, 3);
		var catYAc = Phaser.Math.Between(3, 6);		
		cat.setPosition(catX, catY);
		cat.body.setVelocity(0, 0);
		cat.body.setAcceleration(catXAc, catYAc);
		cat.body.setGravity(catXGv, -300);
	}
	updateCat(c)
	/*	update cat position	*/
	{
		cat = c;		
		
		if(cat.y >= 500)
		{			
			this.tweens.add({
				targets: cat,
				alpha: {value: 0, duration: 1000, ease:'Power1'},
			});			
			this.settingCat(cat);
		}
	}
/* Food & Feed */
	createFood()
	/* create food */
	{
		console.log('up createFood ');
		food = this.physics.add.sprite(player.x-15, player.y,'foodSet',1);
		food.setAlpha(0).setCollideWorldBounds(true);
	}
	feedCat()
	/* produce food to feed cats */	
	{
		console.log('into feedCat ');

		food.setAlpha(0)
	/*select food from onigiri 4:fish 1 */
		var cFood = Phaser.Math.Between(0, 4);
		if (cFood > 0)
		{
			food.setFrame(1);
			onigiri = true;
			fish = false;
		}
		else{
			food.setFrame(0);
			onigiri = false;
			fish = true;
		}
		food.enableBody(true);
	
	/* set position and length food can reach */
		var foodY = Phaser.Math.Between(-400, -600);
		food.setVelocityY(foodY);
		food.setPosition(player.x-15, player.y);
		
		this.tweens.add({
			targets: food,
			alpha: {value: 1, duration: 500, ease:'Power1'},
		});						
	}
	updateFood()
	/* food disappears when food reaches player's height or lower */
	{
		if(food.y >= player.y)
		{
			food.setAlpha(0);
		}
	}
/* Seagull */
	createGull()
	/* create seagull and call a function*/
	{
		console.log('into if createGull');
		seagull = this.physics.add.sprite(0,750, 'tori',0);
		seagull.setAlpha(0)
		   .setCollideWorldBounds(true)
		   .setBounce(1, 0);
		seagull.body.setGravity(0, -270);
		this.physics.world.enable([ seagull ]);
		
		this.attackTime();
	}
	attackTime()
	/* set a timer to to call attackGull() */
	{
		if(attack)
		{
			console.log('into if attack');
		
		/*timing is set at random*/
			var timer = Phaser.Math.Between(500, 6000);			
			this.time.addEvent({
				delay: timer,
				callback: this.attackGull
			});		
			attack = false;
		}
	} 
	attackGull()
	{
		console.log('into attackGull');
	/* select seagull's icon from 2 frames */
		var gullFace = Phaser.Math.Between(0, 1);
		seagull.setFrame(gullFace);
		
		var gullY = Phaser.Math.Between(200, 500);
		if(gullFace > 0)
		/* set seagull's action: fly towards to right  */
		{
			console.log('into gull0');
			seagull.enableBody(true);
			seagull.body.setVelocity(150, 0);
			seagull.setPosition(-100, gullY)
				   .setAlpha(1);
			/* identifyer for the next seagull's action */
			gullRight = true;
		}
		else
		/* set seagull's action: fly towards to left  */			
		{
			console.log('into gull1');
			seagull.enableBody(true);
			seagull.body.setVelocity(-150, 0);
			seagull.setPosition(550, gullY)
				   .setAlpha(1);			
			/* identifyer for the next seagull's action */
			gullLeft = true;
		}
	}
	hideGull()
	/* hide seagull when it hits to the edge */
	{
		if(seagull.x >= 414)
		/* check if seagull reaches to right */
		{
			if(gullRight)
			/* check if seagull fly to right */
			{
				console.log('into gullRight');
				seagull.disableBody(true);
				seagull.setAlpha(0);				
				gullRight = false;
				
				attack = true;
				this.attackTime();
			}
		}
		else if(seagull.x <= 36)
		/* check if seagull reaches to the right */
		{
			/* check if seagull fly to left */
			if(gullLeft)
			{
				console.log('into gullLeft');
				seagull.disableBody(true);
				seagull.setAlpha(0);			
				gullLeft = false;
				attack = true;
				this.attackTime();
			}
		}
	}
/* Item(myTomo) */
	unlockTomo()
	/* create identifyers depending on scores 
	 *  to unlock myTomo cat and call function*/
	{
		if(score >= 10 && score < 50)
		/* change required scores 
	     *  to make game more difficult */
		{
			if(!unlockTomo1)
			{
				unlockTomo1 = true;
				this.unlocked();
				localStorage.setItem("tomo1", "unlocked");
			}
		}
		if(score >= 200 && score < 250)
		{
			if(!unlockTomo2)
			{
				unlockTomo2 = true;
				this.unlocked();				
				localStorage.setItem("tomo2", "unlocked");
			}
		}
		if(score >= 300 && score < 350)
		{
			if(!unlockTomo3)
			{
				unlockTomo3 = true;
				this.unlocked();				
				localStorage.setItem("tomo3", "unlocked");
			}
		}
	}
	unlocked()
	/* notify when unlocked */
	{
		system4.play();
		
	/* create part rounded rect for notice board*/	
		var msgBoard = this.add.graphics().setAlpha(0);
		msgBoard.fillStyle(0x7a2a33, 1);
		msgBoard.fillRoundedRect(75, 250, 300, 200, { 
			tl: 20, tr: 3, bl: 3, br: 20 
		});
	/* display congrat message */
		var congrat = this.add.text(115, 270, 'Congratulation!\nYou\'ve got a new tomodach cat.',
		{
			font: '35px "Gamja Flower"',
			fill: '#ffffff',
			align: 'center',
			wordWrap: {width: 260}			
		}).setAlpha(0);
		
	/* notice appears and disappears */
		this.tweens.add({
			targets: [msgBoard, congrat],
			alpha: { value: 1, duration: 500, ease: 'Power1' },
			yoyo: true,
			loop: 0
		});
		
	}
/* collider */	
   setCollider()
   {
		this.physics.add.collider(player, ground);
		this.physics.add.collider(cat1, cat2);
		this.physics.add.collider(cat1, cat3);
		this.physics.add.collider(cat1, cat4);
		this.physics.add.collider(cat1, cat5);
		this.physics.add.collider(cat1, cat6);
		this.physics.add.collider(cat2, cat3);
		this.physics.add.collider(cat2, cat4);
		this.physics.add.collider(cat2, cat5);
		this.physics.add.collider(cat2, cat6);
		this.physics.add.collider(cat3, cat4);
		this.physics.add.collider(cat3, cat5);
		this.physics.add.collider(cat3, cat6);
		this.physics.add.collider(cat4, cat5);
		this.physics.add.collider(cat4, cat6);
		this.physics.add.collider(cat5, cat6);
			
		this.physics.add.collider
			(cat1, food, this.fedCat1, null, this);
		this.physics.add.collider
			(cat2, food, this.fedCat2, null, this);
		this.physics.add.collider
			(cat3, food, this.fedCat3, null, this);
		this.physics.add.collider
			(cat4, food, this.fedCat4, null, this);
		this.physics.add.collider
			(cat5, food, this.fedCat5, null, this);
		this.physics.add.collider
			(cat6, food, this.fedCat6, null, this);
			
		this.physics.add.collider
			(seagull, food, this.lostPoint, null, this);
	}
	fedCat1(cat1, food){ this.fedCat(cat1, food); }
	fedCat2(cat2, food){ this.fedCat(cat2, food); }
	fedCat3(cat3, food){ this.fedCat(cat3, food); }
	fedCat4(cat4, food){ this.fedCat(cat4, food); }
	fedCat5(cat5, food){ this.fedCat(cat5, food); }
	fedCat6(cat6, food){ this.fedCat(cat6, food); }
	fedCat(c, f)	
	/* set regulations for cat and food collision */
	{
		console.log('into fedCat');
		cat = c;
		food = f;
		
	/* reset food */
		food.disableBody(true);
		food.setAlpha(0);
		food.setPosition(player.x-15, player.y);
		
	/* reset cat */
		cat.setAlpha(0);
		cat.disableBody(true);
		this.settingCat(cat);
		var catCry = this.sound.add('catCry');
		catCry.play();
		
	/* set different score for onigiri and fish */
		if(onigiri)
		{
			score += 10;			
		}
		else{
			score += 40;
		}
        scoreText.setText(score);
		localStorage.setItem("score", score);
		
	}
	lostPoint()
	/* set regulations for seagull and food collision */
	{
		console.log('into lostPoint');
		
	/* reset food */	
		food.disableBody(true);
		food.setAlpha(0);
		food.setPosition(player.x-15, player.y);

	/* reset seagull */	
		seagull.disableBody(true);
		seagull.setAlpha(0);
		seagull.setPosition(0, 750);
		attack = true;
		this.attackTime();
	
	/* update score */
		if(score > 100)
		{
			score -= 100;
		}
		else{
			score = 0;
		}		
        scoreText.setText(score);
		damage.play();
	}
}//end PlayGame

	

