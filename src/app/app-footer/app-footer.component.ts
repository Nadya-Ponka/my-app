import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class FooterComponent implements OnInit {
  public title = 'Made by Nadya Ponkratova';
  constructor() {}

  public ngOnInit(): void {}
}
