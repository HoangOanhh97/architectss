import { Component, OnInit, Inject, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var Swiper: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent implements OnInit {
  selectedView = {};
  res_swiper: any;
  gallerySwiper: any;
  galleryList: any = null;

  constructor(private dialogRef: MatDialogRef<GalleryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private elementRef: ElementRef) {

    // this.selectedView = this.projectDetails.listView[0];
    // console.log(this.selectedView);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.galleryList = this.data.detail;
    console.log(this.galleryList);
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.res_swiper = new Swiper(this.elementRef.nativeElement.querySelector('.swiper-res_gallery'), {
      //Here you can provide Swiper config
      loop: true,
      mousewheelControl: true,
      spaceBetween: 60,
      autoplay: {
        delay: 4000,
      },
      speed: 1500,
    });

    this.gallerySwiper = new Swiper(this.elementRef.nativeElement.querySelector('.swiper_gallery'), {
      // autoWidth: true,
      loop: true,
      mousewheelControl: true,
      spaceBetween: 60,
      autoplay: {
        delay: 4000,
      },
      speed: 1500,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
