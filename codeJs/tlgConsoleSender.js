import { program } from 'commander';

program.version('0.0.1');

program
  .command('message')
  .description('enter some message')
  .alias('m')
  .argument('<message>')
  .action(mssg => {
    console.log(mssg);
  });

program
  .command('picture')
  .description('send some picture')
  .alias('p')
  .argument('<path>')
  .action(pic => {
    console.log(pic);
  });

program
  .option('-m, --message', 'to send a message')
  .option('-p, --picture', 'to send a picture')
  .action(task => {
    console.log(`${task}`);
  });

program.parse(process.argv);
