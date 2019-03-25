var game; 
window.onload = function() 
{
	var gameConfig = {
	type:Phaser.AUTO,
		width: 450,
		height: 800,
		backgroundColor: 0x93d9bf,
		physics: {
			default:'arcade',
			arcade:{
				gravity:{y:300},
				debug:false
			}
		},
		audio:{
			disableWebAudio: true
		},
		scene: [
			loadGame, 
			gameEntrance,
			playGame,
			myTomo,
			userGuide
		]
	}
	game = new Phaser.Game(gameConfig);
	window.focus();
}
class loadGame extends Phaser.Scene
{
	constructor(){
		super("LoadGame");
	}
	preload()
	{
	/* loading audio */
		this.load.audio('BGM','assets/audio/BGM.mp3');
		this.load.audio('bgmOver','assets/audio/bgmOver.mp3');
		this.load.audio('catCry','assets/audio/catCry.mp3');
		this.load.audio('damage','assets/audio/damage.mp3');
		this.load.audio('system1','assets/audio/system1.mp3');
		this.load.audio('system2','assets/audio/system2.mp3');
		this.load.audio('system3','assets/audio/system3.mp3');
		this.load.audio('system4','assets/audio/system4.mp3');
	/* loading background images */
		this.load.image('bg1','assets/sprite/bg1.png');
		this.load.image('bg2','assets/sprite/bg2.png');
		this.load.image('bgEnt','assets/sprite/bgEnt.png');
		this.load.image('bgGuide','assets/sprite/bgGuide.png');
		this.load.image('bgOver','assets/sprite/bgOver.png');
		this.load.image('bgTomo','assets/sprite/bgTomo.png');
		this.load.image('pier','assets/sprite/pier.png');
		this.load.image('grwnd','assets/sprite/grwnd.png');
	/* loading system UI */
		this.load.image('close','assets/sprite/close.png');
		this.load.image('point','assets/sprite/point.png');
		this.load.image('toGuide','assets/sprite/toGuide.png');
		this.load.image('toTomo','assets/sprite/toTomo.png');
		this.load.spritesheet(
			'btnSet','assets/sprite/btnSet.png',
			{frameWidth:168,frameHeight:53}
		);
		this.load.spritesheet(
			'btnInfo','assets/sprite/btnInfo.png',
			{frameWidth:100,frameHeight:100}
		);
	/* loading characters and items */
		this.load.spritesheet(
			'player','assets/sprite/player.png',
			{frameWidth:80,frameHeight:80}
		);		
		this.load.spritesheet(
			'nekoSet','assets/sprite/nekoSet.png',
			{frameWidth:55,frameHeight:62}
		);
		this.load.spritesheet(
			'tori','assets/sprite/tori.png',
			{frameWidth:72,frameHeight:50}
		);
		this.load.spritesheet(
			'foodSet','assets/sprite/foodSet.png',
			{frameWidth:25,frameHeight:23}
		);		
	}
	create()
	{
		console.log("into LoadGame");
		this.scene.start("GameEntrance");
	}
}
/* system and UI */
var toTomo;
var toGuide; 
var btnClose; 
var cursors;
var score;	
var scoreText;
var textGuide;

/* audio */
var system1; 
var system2; 
var system3; 
var system4; 
var damage;
var BGM;

/* arguments */
var attack = true;
var gullRight = false;
var gullLeft = false;
var bgmEnt = false; 

/* characters & items */
var player;
var food;	var fish; 	var onigiri; 
var seagull; 
var cat;	var cat1;	var cat2; 	var cat3; 
var cat4; 	var cat5; 	var cat6;	
var tomo1; var tomo2; var tomo3; 
var name1; var name2; var name3;
var ground; 

/* check previous data */
var score = localStorage.getItem("score");
var unlockTomo1 = localStorage.getItem("tomo1");	
var unlockTomo2 = localStorage.getItem("tomo2");	
var unlockTomo3 = localStorage.getItem("tomo3");
var log = localStorage.getItem("log");


