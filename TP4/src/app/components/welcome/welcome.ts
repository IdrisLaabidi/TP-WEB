import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  protected username: string = 'Idris Youssef';
  protected readonly imagePath = 'favicon.ico';

  onClick = () => {
    alert(`Bonjour ${this.username}`);
  };
}
