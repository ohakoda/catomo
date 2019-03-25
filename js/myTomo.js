class myTomo extends Phaser.Scene{
	constructor()
	{
		super("MyTomo");
	}
	create()
	{
		console.log("into MyTomo");
		this.add.image(225,400,'bgTomo');
		system2 = this.sound.add("system2");
		
		this.createTomo1();
		this.createTomo2();
		this.createTomo3();
		
	/* go to PlayGame */	
		btnClose = this.add.image(80,680,'close');	
		btnClose.setInteractive();
		btnClose.on('pointerdown',function()
		{
			system2.play();
			this.scene.start("PlayGame");
		},this);
	}
	update()
	/* update cat and display name and image */
	{
		if(unlockTomo1)
		{
			tomo1.setFrame(0);
			name1.setText('Shiro');			
		}
		if(unlockTomo2)
		{
			tomo2.setFrame(1);
			name2.setText('Kuro');			
		}
		if(unlockTomo3)
		{
			tomo3.setFrame(2);
			name3.setText('Tora');			
		}
	}
	createTomo1()
	{
		tomo1 = this.add.image(148,290,'nekoSet',3);
		name1 = this.add.text(125, 220, '?????', { 
			font: '20px "Gamja Flower"',
			fill: '#7a2a33',
		});	
	}
	createTomo2()
	{
		tomo2 = this.add.image(298,290,'nekoSet',3);
		name2 = this.add.text(275, 220, '?????', { 
			font: '20px "Gamja Flower"',
			fill: '#7a2a33',
		})
	}
	createTomo3()
	{
		tomo3 = this.add.image(148,445,'nekoSet',3);
		name3 = this.add.text(125, 375, '?????', { 
			font: '20px "Gamja Flower"',
			fill: '#7a2a33',
		})	
	}

}