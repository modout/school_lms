import { Injectable } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Image } from '../../models/image.interface';
import { FileUpload } from '../../models/fileupload.interface';

@Injectable()
export class UploadServiceProvider {

  constructor(private local_db: IonicStorageModule, private db: AngularFireDatabase, private afs: AngularFirestore,
  	private afstorage: AngularFireStorage) {
    console.log('Hello UploadServiceProvider Provider');
  }

  uploadPic(image: FileUpload): Promise<Image>{
    const storageRef =   this.afstorage.ref(`${image.path}/${image.name}`);
     const uploadTask = storageRef.putString(image.file, 'data_url');
     return new Promise<Image>((resolve, reject) => {
      uploadTask.snapshotChanges().subscribe(
        (snapshot) =>{
          //update the progress property of the upload object
          uploadTask.percentageChanges().subscribe(progress =>{
            image.progress = progress;
            console.log('progress... ', image.progress);
          })
        },
        (err) =>{
          //if there's an error log it in the console
          console.log(err)
        },
        () =>{
          let tempUrl = '';
          //on success of the upload, update the url property of the upload object
          storageRef.getDownloadURL().subscribe(down_url =>{
            tempUrl = down_url;
            }, 
            err =>{
               console.log(err)
            },
            () =>{
              let image_out: Image = {
                url: tempUrl,
                name: image.name,
                progress: image.progress,
                path: image.path
              }
              resolve(image_out)
            }
          ) 
        }
      )
    })
  }

  uploadPics(pics: FileUpload[]): Promise<Image[]>{
    let images: Image[] = [];
    return new Promise<Image[]>((resolve, reject) =>{
      pics.forEach(pic =>{
        this.uploadPic(pic).then(image => images.push(image)).catch(err =>{
           console.log(err)
        });
        if(images.length == pics.length){
          resolve(images);
        }
      })
    })
  }


  uploadProof(file: FileUpload): Promise<FileUpload>{
    const storageRef =   this.afstorage.ref(`${file.path}/${file.name}`);
     const uploadTask = storageRef.putString(file.file, 'data_url');
     return new Promise<FileUpload>((resolve, reject) => {
      uploadTask.snapshotChanges().subscribe(
        (snapshot) =>{
          //update the progress property of the upload object
          uploadTask.percentageChanges().subscribe(progress =>{
            file.progress = progress;
            console.log('progress... ', file.progress);
          })
        },
        (err) =>{
          //if there's an error log it in the console
          console.log(err)
        },
        () =>{
          let tempUrl = '';
          //on success of the upload, update the url property of the upload object
          storageRef.getDownloadURL().subscribe(down_url =>{
            tempUrl = down_url;
            }, 
            err =>{
               console.log(err)
            },
            () =>{
              let fileout: FileUpload = {
                url: tempUrl,
                name: file.name,
                progress: file.progress,
                path: file.path
              }
              resolve(fileout)
            }
          ) 
        }
      )
    })
  }


}
