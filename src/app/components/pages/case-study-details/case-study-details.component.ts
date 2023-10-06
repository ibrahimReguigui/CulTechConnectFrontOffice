import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-case-study-details',
    templateUrl: './case-study-details.component.html',
    styleUrls: ['./case-study-details.component.scss']
})
export class CaseStudyDetailsComponent implements OnInit {
    comments = [
        {
            author: 'Nadine Mili',
            image: 'path/to/nadine-image.jpg',
            content: 'Great event!',
            likes: 0,
            dislikes: 0,
        },
        {
            author: 'Sahar Bejaoui',
            image: 'path/to/sahar-image.jpg',
            content: 'I had a wonderful time.',
            likes: 0,
            dislikes: 0,
        },
    ];

    ratings = [5, 4, 3, 2, 1];

    ratingsData: number[] = [];
    ratingsLabels: string[] = ['5 étoiles', '4 étoiles', '3 étoiles', '2 étoiles', '1 étoile'];
    ratingsOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    constructor() { }

    ngOnInit(): void {
    }
    onLike(comment: any): void {
        comment.likes++;
    }
    onDislike(comment: any): void {
        comment.dislikes++;
    }

    calculateAverageRating(): number {
        if (this.ratings.length === 0) {
            return 0;
        }

        const total = this.ratings.reduce((acc, rating) => acc + rating, 0);
        return total / this.ratings.length;
    }
}
