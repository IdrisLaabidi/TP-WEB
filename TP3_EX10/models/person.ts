export abstract class Person {
  constructor(
    public id: number,
    public name: string
  ) {}

  abstract getRole(): string;
}

export class User extends Person {
  getRole(): string {
    return "User";
  }
}

export class Admin extends Person {
  getRole(): string {
    return "Admin";
  }
}
