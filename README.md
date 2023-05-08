A simple adventure game by {who?} based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: unsatisfied (name at least 4 of the classes).

4 interactive scenes, Demo1,2,3,4

- **2+ scenes *not* based on `AdventureScene`**: unsatisfied (name the classes).

3 general scenes, including an introduction scene, and two ending scenes

- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: unsatisfied (name the method and explain the use of it).

    addsprite(x, y, name)
    Used to add a sprite and automatically set it to be interactive

    - Enhancement 2: unsatisfied (name the method and explain the use of it).

    shakeTween()
    This function can be called to generate an animation effect that makes the screen shake.

Experience requirements:
- **4+ locations in the game world**: unsatisfied (name at least 4 of the classes).

4 locations, including the prison cell, the second floor of the prison, the guards' locker room, and the first floor of the prison.

- **2+ interactive objects in most scenes**: unsatisfied (describe two examples)

Several interactive targets, including prison bar, jail gates, beds, seniors, closets, switches, electric gates, doors

- **Many objects have `pointerover` messages**: unsatisfied (describe two examples)

`pointerover` messages exist for every interactable object in the game,

For example, when the mouse hovers over the door it will show whether the door is currently unlocked, 

and when the mouse hovers over the bed it will prompt the player that something is hidden under the bed

- **Many objects have `pointerdown` effects**: unsatisfied (describe two examples)

`pointerdown` messages exist for every interactable object in the game.

For example, for the prison bar, when the player clicks on it, if it is not destroyed then a shaking effect appears, and if it is destroyed then it goes to the next scene. 

Another example is the electric gate click can open the electric gate, thus unlocking the state of the gate.

- **Some objects are themselves animated**: unsatisfied (describe two examples)

When the player clicks on the bed, there is an animation of the bed moving, expressing the player moving the bed to find something hidden under it.

When the player clicks on the unbroken prison bar, there is a shaking animation that expresses the player shaking the bar.

When the player holds the rebar and then clicks on the prison bar, there is a screen shaking animation that expresses that the player has used a lot of force to destroy the prison bar.

Asset sources:
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)

art source:
bar, bed, door come from Sharm https://opengameart.org/content/lpc-dungeon-elements

closet comes from Cookie  https://opengameart.org/content/electrical-closet

gate comes from 853e78 https://pixelartmaker.com/art/2bcd628e77e1284

powerbox comes from 9664c4 https://pixelartmaker.com/art/92d766e0683933f


Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.