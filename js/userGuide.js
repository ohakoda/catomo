class userGuide extends Phaser.Scene{
	constructor()
	{
		super("UserGuide");
	}
	create()
	{
		console.log("into UserGuide");
		this.add.image(225,400,'bgGuide');
		system2 = this.sound.add("system2");
		system3 = this.sound.add("system3");
		
		this.welcome();
		this.gGull();
		this.gFood();
		this.gTomo();
		this.gLeft();
		this.gDown();
		this.gRight();
		
		btnClose = this.add.image(80,680,'close');	
		btnClose.setInteractive();
		btnClose.on('pointerdown',function()
		{
			system2.play();
			
		/* back to previous scene */
			if(bgmEnt)
			{
				this.scene.start("GameEntrance");
			}
			else
			{
				this.scene.start("PlayGame");
			}
		},this);
	}
	welcome()
	{
	/* set default text */
		textGuide = this.add.text(80,200, 
		'Feed cats and make friend with them! Press a button to see information about icons and action keys',
		{
			font: '30px "Gamja Flower"',
			fill: '#7a2a33',
			wordWrap: {width: 300}
		});		
	}
	gGull()
	/* display icons, set text */
	{
		var guideGull = this.add.image(101,450,'btnInfo',0);
		guideGull.setInteractive();
		guideGull.on('pointerdown',function()
		{
			console.log("into guideGull");
			system3.play();
			textGuide.text = 'The seagull is a thief. It steals food and points. Your cats stay their huts.';
		},this);
	}
	gFood()
	{
		var guideFood = this.add.image(221,450,'btnInfo',1);
		guideFood.setInteractive();
		guideFood.on('pointerdown',function()
		{
			system3.play();
			console.log("into guideFood");
			textGuide.text = 'Onigiri 10 points, \nFish 40 points,\nFood swape at random but onigiri appears more often.';
		},this);			
	}
	gTomo(){
		var guideTomo = this.add.image(341,450,'btnInfo',2);
		guideTomo.setInteractive();
		guideTomo.on('pointerdown',function()
		{
			console.log("into guideTomo");
			system3.play();
			textGuide.text = 'You can access to your cat collections by pressing the icon';
		},this);		
		
	}
	gLeft(){
		var guideLeft = this.add.image(101,570,'btnInfo',3);
		guideLeft.setInteractive();
		guideLeft.on('pointerdown',function()
		{
			console.log("into guideLeft");
			system3.play();
			textGuide.text = 'You can move to left by pressing the left key';
		},this);		
		
	}
	gDown(){
		var guideDown = this.add.image(221,570,'btnInfo',4);
		guideDown.setInteractive();
		guideDown.on('pointerdown',function()
		{
			console.log("into guideDown");
			system3.play();
			textGuide.text = 'You can feed cats by pressing the down key';
		},this);		
		
	}
	gRight(){
		var guideRight = this.add.image(341,570,'btnInfo',5);
		guideRight.setInteractive();
		guideRight.on('pointerdown',function()
		{
			console.log("into guideRight");
			system3.play();
			textGuide.text = 'You can move to right by pressing the right key';
		},this);
		
	}
}