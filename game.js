var bar_broken = false;
var bed_move = false;
var talk_num = 0;
var switch_stairwell = false;
var switch_box = false;

class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "Prison cell");
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('door', 'door.png');
        this.load.image('bar', 'bar.png');
        this.load.image('bed', 'bed.png');
    }

    onEnter() {
        let door = this.addsprite(this.w * 0.35, this.w * 0.47, "door");
        door.scale = 4;
            
        door.on('pointerover', () => this.showMessage("The door to the prison cell, but you don't have the key."))
            .on('pointerdown', () => {
            this.showMessage("Find the other way to leave the cell");
            this.tweens.add({
                targets: door,
                y: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
            });
        
        let cellBar1 = this.addsprite(this.w * 0.198, this.w * 0.47, "bar");
        cellBar1.scale = 1.18;

        cellBar1.on('pointerover', () => this.showMessage("The cell bars, which seem to have been in place for many years."))
            .on('pointerdown', () => {
            this.showMessage("Still strong, try the other side");

            this.tweens.add({
                targets: cellBar1,
                y: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });

            });

        let cellBar2 = this.addsprite(this.w * 0.5, this.w * 0.47, "bar");
        cellBar2.scale = 1.18;

        cellBar2.on('pointerover', () => {
            if (bar_broken == false){
                this.showMessage("The cell bars, which seem to have been in place for many years(Maybe you can pry it open with something).")
            }
            else
            {
                this.showMessage("The cell bars has been broken.")
            }
            
        })
            .on('pointerdown', () => {
            if (bar_broken == false)
            {
                if(this.hasItem("rebar"))
                {
                    this.showMessage("You use the rebar to pry open the bar with force");
                    this.shakeTween();
                    bar_broken = true;
                }
                else
                {
                    this.showMessage("You can't destroy it with your bare hands, maybe some tools are needed.");
                    this.tweens.add({
                        targets: cellBar2,
                        y: '+=' + this.s,
                        repeat: 2,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 100
                    });
                }
            }
            else
            {
                this.gotoScene('demo2');
            }           
        });

        let bed = this.addsprite(this.w * 0.5, this.w * 0.1, "bed");
        bed.scale = 0.7;

        bed.on('pointerover', () =>{
            if(bed_move == false)
            {
                this.showMessage("Dilapidated bed, you seem to have hidden something underneath.");
            }
            else
            {
                this.showMessage("Dilapidated bed, but great for hiding things.");
            }
        })
        .on('pointerdown', () =>{
            if(bed_move == false)
            {
                this.showMessage("You moved the bed and found the rebar hidden under it.");
                this.tweens.add({
                    targets: bed,
                    x: this.w * 0.6,
                    ease: 'Linear',
                    yoyo:true,
                    duration: 2000
                });
                this.gainItem('rebar');
                bed_move = true;
            }
            else
            {
                this.showMessage("You don't have anything left to hide under the bed.");           
            }
        })
        

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The 2nd floor of the prison");
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('bar', 'bar.png');
        this.load.image('door', 'door.png');
    }

    onEnter() {

        let cellBar1 = this.addsprite(this.w * 0.15, this.w * 0.47, "bar");
        cellBar1.scale = 1.18;
    
        cellBar1.on('pointerover', () => this.showMessage("The prison cell of your cell, has been destroyed"))
            .on('pointerdown', () => {
                this.gotoScene('demo1');
        });

        let cellBar2 = this.addsprite(this.w * 0.55, this.w * 0.47, "bar");
        cellBar2.scale = 1.18;
    
        cellBar2.on('pointerover', () => this.showMessage("Another prison cell with an old man lying inside."))
            .on('pointerdown', () => {
                if(talk_num != 2)
                {
                    this.showMessage("You try to talk to the old man, but get no reply");
                    talk_num++;
                }
                else
                {
                    this.showMessage("\"Be quite!\" the old man shouts as he throws something at you");
                    this.gainItem('Mysterious Key');
                    talk_num++;
                }            
        });

        let door1 = this.addsprite(this.w * 0.55, this.w * 0.2, "door");
        door1.scale = 3;

        door1.on('pointerover', () => this.showMessage("Locked door with a sign that reads \"Guard Locker Room\""))
            .on('pointerdown', () => {
                if(this.hasItem("Mysterious Key"))
                {
                    this.gotoScene('demo3');
                }
                else
                {
                    this.showMessage("You don't have the key");
                    this.tweens.add({
                        targets: door1,
                        y: '+=' + this.s,
                        repeat: 2,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 100
                    });
                }            
            });

        let door2 = this.addsprite(this.w * 0.37, this.w * 0.075, "door");
        door2.scale = 3;

        door2.on('pointerover', () => this.showMessage("The door to the stairwell, which was locked."))
        .on('pointerdown', () => {
            if(switch_stairwell == false)
            {
                this.showMessage("Maybe there will be a switch nearby.")
                this.tweens.add({
                    targets: door2,
                    y: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            }
            else
            {
                this.gotoScene('demo4');
            }            
        });

        let clip = this.add.text(this.w * 0.41, this.w * 0.04, "🔘")
        .setFontSize(this.s * 1.5)
        .setInteractive()
        .on('pointerover', () => this.showMessage("A button that seems to control the switch in the stairwell."))
        .on('pointerdown', () => {
            this.showMessage("The stairwell door is now unlocked.")
            switch_stairwell = true;
        })



    }
}

class Demo3 extends AdventureScene {
    constructor() {
        super("demo3", "The Guard Locker Room");
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('door', 'door.png');
        this.load.image('closet', 'closet.png');
    }

    onEnter() {

        let door1 = this.addsprite(this.w * 0.35, this.w * 0.47, "door");
        door1.scale = 3;

        door1.on('pointerover', () => this.showMessage("Back to 2nd floor"))
            .on('pointerdown', () => {
                this.gotoScene("demo2") 
        });

        let closet = this.addsprite(this.w * 0.35, this.w * 0.1, "closet");
        closet.scale = 0.25;

        closet.on('pointerover', () => this.showMessage("The guards' closet, in which many pieces of guards' uniforms are placed."))
        .on('pointerdown', () => {
            if(this.hasItem("Guard uniform"))
            {
                this.showMessage("You're already wearing a guard's uniform.")
            }
            else
            {
                this.showMessage("You open the closet and change into a guard's uniform.")
                this.gainItem("Guard uniform")
            }
        })
        
        


    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "The 1st floor of the prison");
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('door', 'door.png');
        this.load.image('gate', 'gate.png');
        this.load.image('powerbox', 'powerbox.png');
    }

    onEnter() {

        let door1 = this.addsprite(this.w * 0.35, this.w * 0.47, "door");
        door1.scale = 3;

        door1.on('pointerover', () => this.showMessage("Back to 2nd floor"))
            .on('pointerdown', () => {
                this.gotoScene("demo2") 
        });

        let gate = this.addsprite(this.w * 0.35, this.w * 0.12, "gate");
        gate.scale = 1.5;

        gate.on('pointerover', () => {
            if(switch_box == false)
            {
                this.showMessage("The gate doesn't seem to be electrified and you can't open it.")
            }
            else
            {
                this.showMessage("The gate has been unlocked.")
            }
            
        })
        .on('pointerdown', () => {
            if(switch_box == false)
            {
                this.showMessage("Find a way to power up the gate.")
                this.tweens.add({
                    targets: gate,
                    y: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            }
            else
            {
                if(this.hasItem("Guard uniform"))
                {
                    this.gotoScene("GE")
                }
                else
                {
                    this.gotoScene("BE")
                }
            }
        });

        let powerbox = this.addsprite(this.w * 0.6, this.w * 0.12, "powerbox");
        powerbox.scale = 0.5;

        powerbox.on('pointerover', () => {
            if(switch_box == false)
            {
                this.showMessage("The electric switch closed.")
            }
            else
            {
                this.showMessage("The electric switch opened.")
            }  
        })
            .on('pointerdown', () => {
                this.showMessage("You opened the electric switch.")
                switch_box = true;
        });

    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {

        let text1 = this.add.text(
            0,//x
            0,//y
            `You are a solider, but you are in jail because of the frame-up of others. Soon after, you will be sentenced to death.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text1.setOrigin(0);
        text1.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-300);
        text1.alpha = 0;

        let text2 = this.add.text(
            0,//x
            0,//y
            `While you wait in despair in the prison, but suddenly see the guards suddenly for unknown reasons gathered and left the prison.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text2.setOrigin(0);
        text2.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-225);
        text2.alpha = 0;

        let text3 = this.add.text(
            0,//x
            0,//y
            `You know that this is your last chance. The only way to prove your innocence is to live.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text3.setOrigin(0);
        text3.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-150);
        text3.alpha = 0;

        let text4 = this.add.text(
            0,//x
            0,//y
            `Find a way to get out of this prison.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text4.setOrigin(0);
        text4.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-75);
        text4.alpha = 0;

        let startText = this.add.text(
            0,//x
            0,//y
            "Click to Start", //text
            {
                font: "40px Arial",
                color: "#ffffff",
            }
        );

        startText.setOrigin(0.5);
        startText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY+300);
        startText.alpha = 0;

        this.tweens.add({
            targets: text1,
            alpha:{from: 0, to: 1},
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text2,
            alpha:{from: 0, to: 1},
            delay:1000,
            duration: 1000, 
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text3,
            alpha:{from: 0, to: 1},
            delay:2000,
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text4,
            alpha:{from: 0, to: 1},
            delay:3000,
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: startText,
            alpha:1,
            delay:4000,
            duration: 1500,
            ease: 'Linear',
            yoyo: true,
            repeat:-1,
        });

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });

    }
}

class BE extends Phaser.Scene {
    constructor() {
        super('Bad End');
    }
    create() {
        let text1 = this.add.text(
            0,//x
            0,//y
            `You open the gate of the prison and find that the prison seems to have been attacked and the scene is very chaotic.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text1.setOrigin(0);
        text1.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-300);
        text1.alpha = 0;

        let text2 = this.add.text(
            0,//x
            0,//y
            `You try to use the chaos to leave the prison quietly.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text2.setOrigin(0);
        text2.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-225);
        text2.alpha = 0;
        
        
        let text4 = this.add.text(
            0,//x
            0,//y
            `Unfortunately, the prison uniform you are wearing is too conspicuous, the guards still found you.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text4.setOrigin(0);
        text4.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-150);
        text4.alpha = 0;

        let text3 = this.add.text(
            0,//x
            0,//y
            `You were caught.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text3.setOrigin(0);
        text3.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-75);
        text3.alpha = 0;

        let BeText = this.add.text(
            0,//x
            0,//y
            "Bad End", //text
            {
                font: "70px Arial",
                color: "#ff0000",
            }
        );
        BeText.scale = 0;
        BeText.setOrigin(0.5);
        BeText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY+300);

        this.tweens.add({
            targets: text1,
            alpha:{from: 0, to: 1},
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text2,
            alpha:{from: 0, to: 1},
            delay:1000,
            duration: 1000, 
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text3,
            alpha:{from: 0, to: 1},
            delay:3000,
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text4,
            alpha:{from: 0, to: 1},
            delay:2000,
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: BeText,
            scale:1.5,
            delay:4000,
            duration: 1500,
            ease: 'Linear',
        });
    }
}

class GE extends Phaser.Scene {
    constructor() {
        super('Good End');
    }
    create() {
        let text1 = this.add.text(
            0,//x
            0,//y
            `You open the gate of the prison and find that the prison seems to have been attacked and the scene is very chaotic.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text1.setOrigin(0);
        text1.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-300);
        text1.alpha = 0;

        let text2 = this.add.text(
            0,//x
            0,//y
            `In the chaos, you are well protected by the guard suit, no guards found your identity.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text2.setOrigin(0);
        text2.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-225);
        text2.alpha = 0;
        
        
        let text3 = this.add.text(
            0,//x
            0,//y
            `You finally managed to escape from the prison.`, //text
            {
                font: "28px Arial",
                color: "#ffffff",
            } //style
        );
        text3.setOrigin(0);
        text3.setPosition(this.cameras.main.centerX-800, this.cameras.main.centerY-150);
        text3.alpha = 0;

        let GeText = this.add.text(
            0,//x
            0,//y
            "Good End", //text
            {
                font: "70px Arial",
                color: "#00ffff",
            }
        );
        GeText.scale = 0;
        GeText.setOrigin(0.5);
        GeText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY+300);

        let ThankText = this.add.text(
            0,//x
            0,//y
            `Thank you for you playing`, //text
            {
                font: "40px Arial",
                color: "#ffffff",
            } //style
        );
        ThankText.setOrigin(0.5);
        ThankText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY+375);
        ThankText.alpha = 0;

        this.tweens.add({
            targets: text1,
            alpha:{from: 0, to: 1},
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text2,
            alpha:{from: 0, to: 1},
            delay:1000,
            duration: 1000, 
            ease: 'Linear',
        });

        this.tweens.add({
            targets: text3,
            alpha:{from: 0, to: 1},
            delay:2000,
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: GeText,
            scale:1.5,
            delay:3000,
            duration: 1500,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: ThankText,
            alpha:1,
            delay:4000,
            duration: 1500,
            yoyo:true,
            ease: 'Linear',
            repeat: -1,
        });
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [GE],
    title: "Adventure Game",
});

