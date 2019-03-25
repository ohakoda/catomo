class gameEntrance extends Phaser.Scene{
	constructor()
	{
		super("GameEntrance");
	}
	create()
	{
	/*	set background for gameEntrance scene	*/
		console.log("into GameEntrance");
		this.add.image(225,400,'bgEnt');
	/*	prepare sound and default font	*/
		BGM = this.sound.add('BGM');		
		system1 = this.sound.add('system1');		
		var typo = this.add.text(0, 0, ' ', { 
			font: '30px "Gamja Flower"',
			fill: '#7a2a33',
		});	
	
	/*	set a button to go into scene UserGuide	*/
		toGuide = this.add.image(30,770,'toGuide');
		toGuide.setInteractive();
		toGuide.on('pointerdown',function()
		{
			console.log("into gotoGuide");
		/*	play system1 and call playBGM()	*/	
			system1.play();
			this.playBGM();
			bgmEnt = true;
		/*	goto userGuide scene	*/	
			this.scene.start("UserGuide");
		},this);	
		
	/* set a button to go into scene PlayGame */
		var btnPlay = this.add.sprite(225,525,'btnSet',0);
		btnPlay.setInteractive();
		btnPlay.on('pointerdown',function()
		{
			console.log("into PlayGame");
		/*	play system1 and call playBGM()	*/	
			system1.play();
			this.playBGM();
			bgmEnt = false;			
		
		/*	check previouse data	*/
			this.login();
			
		/*	goto playGame scene	*/	
			this.scene.start("PlayGame");
		},this);		
		
	/* set a button to go into scene PlayGame as a new game */
		if(log)
		/* only appears when data is stored in localStorage */
		{
			var btnNew = this.add.sprite(225,605,'btnSet',1);
			btnNew.setInteractive();
			btnNew.on('pointerdown',function()
			{
				console.log("into PlayGame as New");
			/*	play system1 and call playBGM()	*/	
				system1.play();
				this.playBGM();
				bgmEnt = false;			
			
			/*	remove previouse data	*/
				this.asNew();
				
			/*	goto playGame scene	*/	
				this.scene.start("PlayGame");
			},this);					
		}
	}	
	playBGM()
	/*	manage play background music */
	/*	background music only start to play once	*/
	{
		if(!bgmEnt)
		{
			console.log("into if BGM.isPlaying");
			BGM.play({loop: true});
		}		
	}
	login()
	/*	retrive data from localstorage	*/
	{
		console.log("into login");
		
		if(!log)
		{
			localStorage.setItem("log", "loged");
		}
		if(!score)
		{
			score = 0;
		}		
		
		if(unlockTomo3)
		{
			unlockTomo1 = true;
			unlockTomo2 = true;
			unlockTomo3 = true;
		}
		else if(unlockTomo2)
		{
			unlockTomo1 = true;
			unlockTomo2 = true;
			unlockTomo3 = false;
			
		}
		else if(unlockTomo1)
		{
			unlockTomo1 = true;
			unlockTomo2 = false;
			unlockTomo3 = false;	
		}
		else
		{
			unlockTomo1 = false;
			unlockTomo2 = false;
			unlockTomo3 = false;	
		}
	}
	asNew()
	{
		localStorage.removeItem("score");
		score = 0;
		localStorage.removeItem("tomo1");
		localStorage.removeItem("tomo2");
		localStorage.removeItem("tomo3");
	}
}
