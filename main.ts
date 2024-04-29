input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    game.pause()
    datalogger.log(datalogger.createCV("Steps", steps))
    game.resume()
})
input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onPinPressed(TouchPin.P2, function () {
    record.startRecording(record.BlockingState.Blocking)
    record.playAudio(record.BlockingState.Blocking)
})
input.onButtonPressed(Button.AB, function () {
    game.pause()
    basic.showString("Steps: " + steps)
    game.resume()
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
input.onPinPressed(TouchPin.P1, function () {
    music.play(music.stringPlayable("C D E F G A B C5 ", 120), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C5 B A G F E D C ", 120), music.PlaybackMode.UntilDone)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    game.pause()
    steps += 1
    game.resume()
})
let emptyObstacleY = 0
let ticks = 0
let steps = 0
let bird: game.LedSprite = null
record.setMicGain(record.AudioLevels.High)
let index = 0
let obstacles: game.LedSprite[] = []
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)
basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
    for (let obstacle2 of obstacles) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index2 = 0; index2 <= 4; index2++) {
            if (index2 != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index2))
            }
        }
    }
    for (let obstacle3 of obstacles) {
        if (obstacle3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
    }
    ticks += 1
    basic.pause(1000)
})
