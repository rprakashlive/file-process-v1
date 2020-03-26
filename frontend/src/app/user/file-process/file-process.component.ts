import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import * as io from "socket.io-client";


@Component({
  selector: 'app-file-process',
  templateUrl: './file-process.component.html',
  styleUrls: ['./file-process.component.css']
})
export class FileProcessComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private spinner: NgxSpinnerService) { }

  userObj:any = {};
  fileArr:any = [];
  returnedArray:any = [];
  maxSize: any = 10;
  processStatusCount: any = 0;

  ngOnInit() {

  }

    public files: NgxFileDropEntry[] = [];
 
    
    public dropped(files: NgxFileDropEntry[]) { 
      console.log("___________",files.length);
      if (files.length === 0){
        return;
      }
      this.files = files;
      this.spinner.show();
      //console.log('this.files',this.files);
      this.returnedArray = this.files.slice(0, 10);
        //console.log("returnedArray",this.returnedArray);

      for (const droppedFile of files) {
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          //console.log('fileEntry',fileEntry.fullPath);
          fileEntry.file((file: File) => {
          const size = this.bytesToSize(file.size);
          var result = fileEntry['fullPath'].substr(1);
          let array = result.split("/");
          array.splice(-1,1)
          var thumbCheck = array.indexOf('thumb') //static
          var isThumbFile = false;
          if (thumbCheck > -1) {
            isThumbFile = true;
          };
         // console.log('finalArray',array);
            var obj = {
              filename : file.name,
              size : size,
              type : file.type,
              rootArr : array,
              caption : file.name, 
              path : fileEntry['fullPath'],
              isThumbFile : isThumbFile
            }
            //console.log('obj',obj);
            this.fileArr.push(obj);
            console.log("this.fileArr.length",this.fileArr.length);
            if (this.files.length === this.fileArr.length) {
              console.log("processed");
              this.spinner.hide();
            }
            // Here you can access the real file
            //console.log(droppedFile.relativePath, file);
          });
        } else {
          console.log('droppedFile',files.indexOf(droppedFile));
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          var result = fileEntry['fullPath'].substr(1);
          let array = result.split("/");
          var isThumbFile = false;
          var obj = {
            filename : fileEntry.name,
            size : "",
            type : "",
            rootArr : array,
            caption : fileEntry.name, 
            path : fileEntry['fullPath'],
            isThumbFile : isThumbFile
          }
          console.log('obj',obj);
          this.fileArr.push(obj);
          if (this.files.length === this.fileArr.length) {
            console.log("processed");
            this.spinner.hide();
          }
          console.log("check not a file", droppedFile.relativePath, fileEntry);
        }
      }
    }
   
    public fileOver(event){   
      console.log("fileover event", event);
    }
    
   
    public fileLeave(event){  
      console.log("fileleave event", event);
    }


     bytesToSize(bytes) {
      if(bytes == 0) return '0 Bytes';
      var k = 1000,
          dm = 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
   } 

   processJson(){
   
    this.spinner.show();
     const paramObj = {
       data : this.fileArr
     }

    console.log(JSON.stringify(paramObj));
    
    this.userService.generateJson(paramObj).subscribe((result) => {
      this.spinner.hide();
      if (result) {
        this.userService.dataResults = result['data'];
        this.router.navigate(['/file-viewer/'])
        console.log("result",result);
      }
     }, (err) => {
       this.spinner.hide();
       console.log(err);
     });
   }


   pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.files.slice(startItem, endItem);
  }


}
