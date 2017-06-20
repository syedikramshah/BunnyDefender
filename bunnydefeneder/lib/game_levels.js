
var Player = 'player';
var PlayerDead = 'player_dead';
var PlayerHappy = 'player_happy';
var OpenSpot = 'open';
var ClosedSpot =  'closed';
var Ghost = 'ghost';
var Apple = 'apple';
var Direction = 'direction';
var StartScreen = 'start';
var StartButton = 'start_btn';

var GameLevels = [

     [
         [ClosedSpot,    ClosedSpot,     ClosedSpot,    ClosedSpot,  ClosedSpot,     ClosedSpot],
         [ClosedSpot,    ClosedSpot,     OpenSpot,        OpenSpot,    ClosedSpot,     ClosedSpot],
         [ClosedSpot,    ClosedSpot,     OpenSpot,       OpenSpot, Ghost,          ClosedSpot],
         [ClosedSpot,    ClosedSpot,     Apple,          ClosedSpot, ClosedSpot,     ClosedSpot]

     ],
     [
         [ClosedSpot,    ClosedSpot,     ClosedSpot,    ClosedSpot,  ClosedSpot,     ClosedSpot],
         [ClosedSpot,    ClosedSpot,     OpenSpot,        OpenSpot,    ClosedSpot,     ClosedSpot],
         [ClosedSpot,    Ghost,     OpenSpot,       OpenSpot, Ghost,          ClosedSpot],
         [Apple,    OpenSpot,     OpenSpot,          ClosedSpot, ClosedSpot,     ClosedSpot]

     ],
    [
        [Apple,         ClosedSpot,     ClosedSpot,         ClosedSpot,     ClosedSpot,     ClosedSpot],
        [OpenSpot,      ClosedSpot,     OpenSpot,           OpenSpot,       ClosedSpot,     ClosedSpot],
        [OpenSpot,      Ghost,          OpenSpot,           OpenSpot,       Ghost,          ClosedSpot],
        [OpenSpot,      OpenSpot,       OpenSpot,           ClosedSpot,     ClosedSpot,     ClosedSpot]

    ]

 ];