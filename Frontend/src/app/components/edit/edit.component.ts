import { Component, OnInit } from '@angular/core';
import { global } from './../../services/global';
import { UploadService } from './../../services/upload.service';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/project';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]

})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public saveProject;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _uploadService: UploadService,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar proyecto';
    this.url = global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      const id = params.id;

      this.getProject(id);
    });
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit() {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {

          // Subir la imagen
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => {

                this.saveProject = result.project;
                this.status = 'success';
              });
          } else {
            this.saveProject = response.project;
            this.status = 'success';
          }

        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
