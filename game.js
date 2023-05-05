var bar_broken = false;
var bed_move = false;

class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
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
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
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
        
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Demo1,Demo2],
    title: "Adventure Game",
});

