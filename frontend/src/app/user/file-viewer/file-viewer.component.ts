import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {

  constructor(private userService: UserService) { }

  dataResults: any;

  ngOnInit() {
    this.dataResults = this.userService.dataResults;
    console.log('dataResults',this.dataResults);
  }


  downloadObjectAsJson() {
    // one way
    //html file
    //<div id="container"></div>
    //component file
    // var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.dataResults));
    // var a = document.createElement('a');
    // a.href = 'data:' + data;
    // a.download = 'data.json';
    // a.innerHTML = 'download JSON';
    // var container = document.getElementById('container');
    // container.appendChild(a);
  
    //Another way
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.dataResults));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", 'data' + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }

  


}

