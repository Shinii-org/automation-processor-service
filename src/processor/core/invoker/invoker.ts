import { ICommand } from "../command/command";



export class Invoker {
  private commands: ICommand[];

  constructor() {
    this.commands = [];
  }

  addCommand(command: ICommand) {
    this.commands.push(command);
  }

  async executeCommands() {
    for (const command of this.commands) {
      try {
        await command.execute();
      } catch (err) {
        console.error(err)
      }
    }
  }
}