import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input.required<string>();
  variant = input.required<'primary' | 'ghost'>();
  link = input<string>('');
  buttonClick = output<void>();
  showIcon = input<boolean>(false);
  fullWidth = input<boolean>(false);
  height = input<number>(36);
  padding = input<string>('0 16px');
  fontWeight = input<number>(500);
  color = input<string | null>(null);

  onClick(): void {
    this.buttonClick.emit();
  }
}
