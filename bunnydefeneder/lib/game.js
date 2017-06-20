var Game_Width = 800;
var Game_Height = 600;
var Padding_Top = 50;
var Padding_Bottom = 50;
var Padding_Left = 50;
var Padding_Right = 50;
var Dot_Width =50;
var Dot_Height = 50;
var Max_Rows = 4;
var Max_Columns = 6;

var PlayerPosX;
var PlayerPosY;
var CurrentMove = 0;
var CurrentLevel=0;
(function () {
    if("vibrate" in window.navigator) {
       /* function vibrate(time)
        {
            window.navigator.vibrate(500);
            clearTimeout(Timer);
            setTimeout(vibrate, 1000);
        }
        var Timer = setTimeout(vibrate, 1000);
*/
    }else
    {
        console.log('no vibration');
    }
    var GameState =
    {
        preload: function()
        {
            game.load.image('background', 'images/background.jpg');
            game.load.image(ClosedSpot, 'images/cannot.png');
            game.load.image(OpenSpot, 'images/can.png');
            game.load.image(Player, 'images/monkeyface.png');
            game.load.image(PlayerDead, 'images/monkey_dead.png');
            game.load.image(PlayerHappy, 'images/monkey_happy.png');
            game.load.image(Ghost, 'images/ghost-1.png');
            game.load.image(Apple, 'images/apple.png');
            game.load.image(Direction, 'images/direction.png');
            game.load.image(StartScreen, 'images/bg-start.png');
            game.load.image(StartButton, 'images/btnstart.png');
        },
        create: function()
        {
            this.SplashScreen = function () {
                CurrentLevel = 0;
                CurrentMove = 0;
                this.background = this.game.add.sprite(0, 0, StartScreen);
                this.background.scale.setTo(0.65,0.75);

                this.startButton = this.game.add.sprite(600, 450, StartButton);
                this.startButton.anchor.setTo(0.5, 0.5);
                this.startButton.scale.setTo(0.5, 0.5);
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.startButton.inputEnabled = true;
                this.startButton.events.onInputOver.add(function(){
                    console.log('hi');
                    this.startButton.scale.setTo(0.6, 0.6);
                    if("vibrate" in window.navigator) {
                        window.navigator.vibrate(500);
                    }
                }, this);
                this.startButton.events.onInputOut.add(function () {

                    console.log('hie    ');
                    this.startButton.scale.setTo(0.5, 0.5);
                }, this);
                this.startButton.events.onInputUp.add(function () {
                    this.startButton.destroy();
                    this.background.destroy();
                    this.InitGameObjects();
                }, this);
               //
            }
            this.InitGameObjects = function () {
                CurrentMove =0;
                var Movement = Movements[CurrentLevel];

                this.background = this.game.add.sprite(0, 0, 'background');

                this.Direction = this.game.add.sprite(0, 0, 'direction');
                this.PlayerWithDirection = this.game.add.group();
                PlayerPosX  = 2;
                PlayerPosY = 1;
                this.Player = this.game.add.sprite(0, 0, Player);
                this.Player.scale.setTo(0.5, 0.5);

                this.PlayerDead = this.game.add.sprite(0, 0, PlayerDead);
                this.PlayerDead.scale.setTo(0.5, 0.5);
                this.PlayerDead.visible = false;


                this.PlayerHappy = this.game.add.sprite(0, 0, PlayerHappy);
                this.PlayerHappy.scale.setTo(0.5, 0.5);
                this.PlayerHappy.visible = false;

                this.PlayerWithDirection.add(this.Direction);
                this.PlayerWithDirection.add(this.Player);
                this.PlayerWithDirection.add(this.PlayerDead);
                this.PlayerWithDirection.add(this.PlayerHappy);

                this.Player.anchor.setTo(0.5, 0.5);
                this.Direction.anchor.setTo(0.5, 0.5);
                this.PlayerDead.anchor.setTo(0.5, 0.5);
                this.PlayerHappy.anchor.setTo(0.5, 0.5);


                if(Movement[0] == 'move_down')
                {
                    this.Direction.angle = 90;
                }
                else if(Movement[0] == 'move_up')
                {
                    this.Direction.angle = 270;
                }
                else if(Movement[0] == 'move_left')
                {
                    this.Direction.angle = 180;
                }
                else if(Movement[0] == 'move_right')
                {
                    this.Direction.angle = 0;
                }


                console.log(GameLevels);
                this.GameBoard = GameLevels[CurrentLevel];
                this.NextMovePossible = function (X, Y) {
                    if(Y < this.GameBoard.length)
                    {
                        if(X < this.GameBoard[Y].length)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                };
                this.GameElements = [];

                this.cannot_dots = this.game.add.group();
                var CurrentX = Padding_Left;
                var CurrentY = Padding_Top;
                var self = this;
                for(var Row = 0; Row < this.GameBoard.length; Row ++)
                {
                    this.GameElements[Row] = [];
                    for(var Column = 0; Column < this.GameBoard[Row].length; Column ++)
                    {
                        this.GameElements[Row].push( self.game.add.sprite(CurrentX, CurrentY, this.GameBoard[Row][Column]));
                        this.GameElements[Row][Column].scale.setTo(0.5, 0.5);
                        this.GameElements[Row][Column].customParams = {type: this.GameBoard[Row][Column]};
                        this.GameElements[Row][Column].anchor.setTo(0.5, 0.5);
                        if(Column == PlayerPosX  && Row == PlayerPosY)
                        {
                            this.PlayerWithDirection.position.set(this.GameElements[Row][Column].position.x, this.GameElements[Row][Column].position.y);
                        }
                        CurrentX +=  Dot_Width * 2.5;
                    }
                    CurrentX = Padding_Left;
                    CurrentY += Dot_Height * 2.0;
                }
                this.game.world.bringToTop(this.Direction);
                this.game.world.bringToTop(this.Player);
                this.game.world.bringToTop(this.PlayerWithDirection);
                console.log("POS",this.PlayerWithDirection.position);
                var self = this;
                function Move()
                {
                    if(CurrentMove<Movement.length)
                    {
                        var CurrentLocation = self.GameBoard[PlayerPosY][PlayerPosX];
                        console.log('Current Position: ' + CurrentLocation);
                        var NextMove = null;
                        var Next_Position_X = self.GameBoard[PlayerPosY][PlayerPosX].x;
                        var Next_Position_Y = self.GameBoard[PlayerPosY][PlayerPosX].y;
                        var NextX = PlayerPosX;
                        var NextY = PlayerPosY;
                        if(CurrentLocation == Apple)
                        {
                            console.log("on Apple");
                            self.Player.visible = false;
                            self.PlayerDead.visible = false;
                            self.PlayerHappy.visible=true;
                            self.Direction.visible = false;
                            self.ResetGame();
                            CurrentLevel++;
                            if(CurrentLevel < GameLevels.length)
                            self.InitGameObjects();
                            else
                            {
                                self.SplashScreen();
                            }
                        }
                        else  if(CurrentLocation != OpenSpot && CurrentLocation != Apple)
                        {
                            self.Player.visible = false;
                            self.PlayerDead.visible = true;
                            self.PlayerHappy.visible=false;
                            self.Direction.visible = false;
                        }
                        else
                        {
                            if(Movement[CurrentMove] == 'move_right')
                            {
                                NextX += 1;
                                //self.Direction.angle = 0;
                                var RotationTween = game.add.tween(self.Direction);
                                RotationTween.to({angle: 0}, 500);
                                RotationTween.start();

                                //NextMove = self.GameBoard[PlayerPosY][PlayerPosX+1];

                            }
                            else  if(Movement[CurrentMove] == 'move_left')
                            {
                                NextX -= 1;
                                var RotationTween = game.add.tween(self.Direction);
                                RotationTween.to({angle: 180}, 500);
                                RotationTween.start();//NextMove = self.GameBoard[PlayerPosY][PlayerPosX-1];
                            }
                            else  if(Movement[CurrentMove] == 'move_up')
                            {
                                NextY -= 1;
                                var RotationTween = game.add.tween(self.Direction);
                                RotationTween.to({angle: 270}, 500);
                                RotationTween.start();
                                //NextMove = self.GameBoard[PlayerPosY-1][PlayerPosX];
                            }
                            else  if(Movement[CurrentMove] == 'move_down')
                            {
                                NextY += 1;
                                var RotationTween = game.add.tween(self.Direction);
                                RotationTween.to({angle: 90}, 500);
                                RotationTween.start();
                                //NextMove = self.GameBoard[PlayerPosY+1][PlayerPosX];
                            }
                            if(self.NextMovePossible(NextX, NextY))
                            {
                                NextMove = self.GameBoard[NextY][NextX];
                                var NextLocation = self.GameElements[NextY][NextX].position;
                                console.log("About to start tween. Current: " + CurrentLocation + " Next: " + NextLocation);
                                var PlayerTween;
                                PlayerTween = game.add.tween(self.PlayerWithDirection);
                                PlayerTween.onComplete.add(OnTweenComplete);
                                PlayerTween.to({x: NextLocation.x, y: NextLocation.y}, 1000, "Linear", true, 2000);
                                PlayerTween.start();
                                PlayerPosX = NextX;
                                PlayerPosY = NextY;
                            }
                            else
                            {
                                self.Player.visible = false;
                                self.PlayerDead.visible = true;
                                self.Direction.visible = false;
                                console.log("Sorry Next Move Impossible!");
                            }
                        }

                        console.log('Next Move: ' + NextMove);

                    }
                    else
                    {
                        var CurrentLocation = self.GameBoard[PlayerPosY][PlayerPosX];
                        if(CurrentLocation == Apple)
                        {
                            console.log("on Apple");
                            self.Player.visible = false;
                            self.PlayerDead.visible = false;
                            self.PlayerHappy.visible=true;
                            self.Direction.visible = false;
                            self.ResetGame();
                            CurrentLevel++;
                            if(CurrentLevel < GameLevels.length)
                            self.InitGameObjects();
                            else
                            {
                                self.SplashScreen();
                            }
                        }
                        else
                        {
                            self.Player.visible = false;
                            self.PlayerDead.visible = true;
                            self.PlayerHappy.visible=false;
                            self.Direction.visible = false;
                        }
                    }
                }
                function OnTweenComplete()
                {
                    CurrentMove ++;
                    Move();
                }
                Move();

            }
            this.ResetGame = function()
            {
                this.Player.destroy();
                this.PlayerHappy.destroy();
                this.PlayerDead.destroy();
                this.Direction.destroy();
                this.PlayerWithDirection.destroy();
                delete this.GameBoard;
                this.GameBoard = [];
                for(var Row = 0; Row < this.GameElements.length; Row ++)
                {

                    for(var Column = 0; Column < this.GameElements[Row].length; Column ++)
                    {
                        this.GameElements[Row][Column].destroy();

                    }

                }
                delete this.GameElements;
                this.GameElements = [];
            }
            this.SplashScreen();
            //this.PlayerWithDirection.anchor.setTo(0.5, 0.5);



        },
        update: function()
        {

        }
    };
    var game = new Phaser.Game(Game_Width, Game_Height, Phaser.AUTO);
    game.state.add('GameState', GameState);
    game.state.start('GameState');
})();
