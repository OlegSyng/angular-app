import { Component } from '@angular/core';

class ClickLogItem {
  constructor(public clickCount: number, public timestamp: Date) {}
}

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  username = '';
  serverName= 'TestServer';
  serverCreated = false;
  servers = ['TestServer', 'TestServer 2'];
  showSecret = false;
  clickLog: ClickLogItem[] = [];

  constructor() {}

  ngOnInit() {}

  onCreateServer() { 
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onClickResetUsername() {
    this.username = '';
  }

  onClickShowDetails() {
    this.showSecret = !this.showSecret;
    this.clickLog.push(new ClickLogItem(this.clickLog.length + 1, new Date()));
  }

  showDate(clickLogItem: ClickLogItem) {
    return clickLogItem.timestamp.toLocaleTimeString();
  }

}
