import { Component } from '@angular/core';

import {
  Observable,
  OperatorFunction,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-find-user-typeahead',
  templateUrl: './find-user-typeahead.component.html',
  styleUrls: ['./find-user-typeahead.component.css'],
})
export class FindUserTypeaheadComponent {
  model: any;
  searching = false;
  searchFailed = false;
  constructor(private userService: UserService) {}

  // search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
  // text$.pipe(
  //   debounceTime(300),
  //   distinctUntilChanged(),
  //   tap(() => (this.searching = true)),
  //   switchMap((term: string) =>
  //     this.userService.searchUser(term).pipe(
  //       tap(() => (this.searchFailed = false)),
  //       catchError(() => {
  //         this.searchFailed = true;
  //         return of([]);
  //       }),
  //     ),
  //   ),
  //   tap(() => (this.searching = false)),
  // );
}
