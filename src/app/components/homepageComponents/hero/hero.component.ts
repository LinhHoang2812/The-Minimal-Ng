import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  sliders = [
    {
      src: 'https://cdn-img.thehandsome.com/attachment/display/2023/10/19/53c155d1-dbbe-48fa-bf9b-c9f632b91fd8_10.jpg?RS=1920x960',
      title: 'System Home',
      des: 'Winter with 3 characters',
    },
    {
      src: 'https://cdn-img.thehandsome.com/attachment/display/2023/10/19/5cdd787c-e79a-4494-a4f1-befff88029a6_10.jpg?RS=1920x960',
      title: 'SJSJ lookbook',
      des: 'New old money look item',
    },
    {
      src: 'https://cdn-img.thehandsome.com/attachment/display/2023/10/20/fc559c57-158c-4bfd-9d1c-fb06d8db8ff4_10.jpg?RS=1920x960',
      title: '',
      des: '',
    },
    {
      src: 'https://cdn-img.thehandsome.com/attachment/display/2023/10/12/27c64e41-8b32-4aa5-8dc6-8e3b51f05d7b_10.jpg?RS=1920x960',
      title: 'Stunning Ever',
      des: 'Shing 23/FW campaign',
    },
    {
      src: 'https://cdn-img.thehandsome.com/attachment/display/2023/10/17/0c1f8348-bea0-4910-86f0-2b937738a0d9_10.jpg?RS=1920x960',
      title: 'System Paris',
      des: 'Paris collection release',
    },
    {
      src: 'https://cdn-img.thehandsome.com/attachment/display/2023/10/12/da4b46bd-168c-4a00-961c-d281c15a350f_10.jpg?RS=1920x960',
      title: 'Moment in eternity',
      des: "Mine's heritage in a modern way",
    },
  ];
}
