import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-onpush-async-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  templateUrl: './onpush-async-child.html',
  styleUrl: './child.scss',
})
export class OnpushAsyncChild {
  @Input({ required: true }) message$!: Observable<string>;
}
