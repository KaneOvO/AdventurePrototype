class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
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

        this.animation = this.tweens.add({
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

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro,Demo1],
    title: "Adventure Game",
});

