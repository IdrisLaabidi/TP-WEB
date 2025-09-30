// ------------------------------ EX1 ------------------------------
// intialisation via `tsc --init` et execution via puis `node hello.ts`
console.log("Hello, TypeScript!");

// ------------------------------ EX2 ------------------------------
let age: number = 25;
let name: string = "Alice";
let isAdmin: boolean = true;

const tableau: number[] = [1, 2, 3, 4, 5];
const tuple: [string, number] = ["Alice", 25];

enum Role {
    User = 1,
    Admin = 2,
    SuperAdmin =3
};

// ------------------------------ EX3 ------------------------------
let id : number | string = 123;

type A = { a :  string}
type B = { b :  number}
//intersection type
let ab : A & B = { a : "hello", b : 42};

type Status = "pending" | "done" | "canceled";

let unknownValue: unknown = "Hello TypeScript!";

// On doit faire une assertion de type pour accéder à la longueur
if (typeof unknownValue === "string") {
  let length: number = (unknownValue as string).length;
  console.log("Longueur de la chaîne :", length);
}

// ------------------------------ EX4 ------------------------------
interface User{
    id: number;
    name: string;
    email?: string; // propriété optionnelle
    readonly isAdmin: boolean; // propriété en lecture seule
}

const user1: User = {
    id: 1,
    name: "Alice",
    isAdmin: true
};

interface Admin extends User {
  permissions: string[];
}

const admin1: Admin = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  isAdmin: true,
  permissions: ["read", "write", "delete"]
};

console.log(user1);
console.log(admin1);

// ------------------------------ EX5 ------------------------------
// Fonctions

// 1. Fonction add
function add(a: number, b: number): number {
  return a + b;
}

// 2. Fonction greet avec paramètre optionnel
function greet(name: string, age?: number): void {
  if (age !== undefined) {
    console.log(`Bonjour ${name}, tu as ${age} ans.`);
  } else {
    console.log(`Bonjour ${name}!`);
  }
}

// 3. Fonction power avec exp par défaut
function power(base: number, exp: number = 2): number {
  return Math.pow(base, exp);
}

// 4. Fonction combine avec surcharge
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: any, b: any): any {
  return a + b;
}

console.log(add(3, 5));
greet("Alice");
greet("Bob", 30);
console.log(power(3));
console.log(power(2, 5));
console.log(combine(2, 3));
console.log(combine("Hello, ", "World!"));

// ------------------------------ EX6 ------------------------------
// Programmation Orientée Objet

// 1. Classe Person
class Person {
  constructor(public name: string, public age: number) {}

  greet(): void {
    console.log(`Salut, je m'appelle ${this.name} et j'ai ${this.age} ans.`);
  }
}

// 2. Classe Student
class Student extends Person {
  constructor(name: string, age: number, public school: string) {
    super(name, age);
  }
}

const student = new Student("Karim", 22, "FST");
student.greet();
console.log(`École: ${student.school}`);

// 3. Classe abstraite Shape
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }
  area(): number {
    return this.width * this.height;
  }
}

console.log("Aire du cercle:", new Circle(5).area());
console.log("Aire du rectangle:", new Rectangle(4, 6).area());

// 4. Interface Drivable + implémentation
interface Drivable {
  drive(): void;
}

class Car implements Drivable {
  constructor(public brand: string) {}
  drive(): void {
    console.log(`${this.brand} est en train de rouler 🚗`);
  }
}

const car = new Car("Toyota");
car.drive();

// ------------------------------ EX7 ------------------------------
// Génériques

// 1. Fonction identity
function identity<T>(value: T): T {
  return value;
}
console.log(identity<string>("Hello"));
console.log(identity<number>(123));

// 2. Fonction getFirst
function getFirst<T>(arr: T[]){
  return arr[0];
}
console.log(getFirst([10, 20, 30]));
console.log(getFirst(["a", "b", "c"]));

// 3. Classe Repository
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items = this.items.filter(i => i !== item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const repo = new Repository<number>();
repo.add(1);
repo.add(2);
repo.remove(1);
console.log(repo.getAll());

// 4. Interface ApiResponse
interface ApiResponse<T> {
  data: T;
  error?: string;
}

const response: ApiResponse<string[]> = {
  data: ["item1", "item2"]
};
console.log(response);

// ------------------------------ EX8 ------------------------------
//Fichier: main.ts
import { addFn } from "./math";
console.log(addFn(5, 7));

//Fichier: index.ts
import { subtract } from "./index";
console.log(subtract(10, 4));

//Exemple d'import type / Fichier: types.ts
import type { UserType } from "./types";
const user2:UserType = { id: 2, name: "Bob" };
console.log(user2);

// ------------------------------ EX9 ------------------------------
// Outils & Bonnes pratiques
// 1. `tsc --init`
// 2. Dans tsconfig.json : "strict": true
// 3. Installer ESLint & Prettier :
//    npm install eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
// 4. Exemple de .eslintrc.json :

