import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from '../../services/firestore-service';
import { Feed } from '../../model/feed';

@Component({
  selector: 'app-new-feed-component',
  imports: [ReactiveFormsModule],
  templateUrl: './new-feed-component.html',
  styleUrl: './new-feed-component.scss',
})
export class NewFeedComponent {

  firestore = inject(FirestoreService);

  fb: FormBuilder = new FormBuilder();

  newFeedForm = this.fb.group({
    name: [''],
    url: ['']
  });

  onSubmit() {

    const newFeed = this.newFeedForm.value as Feed;

    this.firestore.addFeed(newFeed).then(() => {
      alert('Feed added successfully!');
      this.newFeedForm.reset();
    }).catch((err) => {
      alert('Error adding feed: ' + err);
    });

  }

}
