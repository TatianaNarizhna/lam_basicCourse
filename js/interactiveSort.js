import { createInterface } from 'readline';

var rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.write("Type 'help' for commands\n");
rl.write('Square numbers:\n');

function createPayer(number, callback) {
  rl.question('Enter player ' + number + ' name? ', function (answer) {
    var player = new Player(answer);

    // Call the callback function once the player is created.
    callback(player);
  });
}

createPayer(1, function (player1) {
  createPayer(2, function (player2) {
    console.log('logging name after making players' + player1.name);
    console.log('logging name after making players' + player2.name);

    // Then call player logic you have from in here.
  });
});
