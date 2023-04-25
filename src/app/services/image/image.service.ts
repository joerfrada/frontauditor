import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private api: ApiService) { }

  compressImage(image: File, maxSize: number): Observable<Blob> {
    return new Observable((observer: Observer<Blob>) => {
      if (!image.type.match(/image.*/)) {
        observer.error(new Error('File must be an image'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } 
          else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx:any = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob: Blob | null) => {
            if (blob !== null) {
              observer.next(blob);
            } 
            else {
              observer.error(new Error('Failed to compress image'));
            }
          }, image.type, 1);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(image);
    });
  }
}
