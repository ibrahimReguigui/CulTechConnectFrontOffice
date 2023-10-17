import { Component, OnInit } from '@angular/core';
import {BlogForm} from '../../models/BlogForm';
import {BlogServiceService} from '../../services/blog-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

    blogId: number;
    blog: BlogForm | undefined;

    images: string = '';


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
  constructor(private blogService: BlogServiceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
          this.blogId = Number(params.get('blogId'));
          this.getBlogDetails(this.blogId);
      });
  }

    getBlogDetails(blogId: number): void {
        this.blogService.getBlogById(blogId).subscribe(
            (data: BlogForm) => {
                this.blog = data;
                console.log(data);
                console.log(typeof data.image);
                this.images = this.arrayBufferToBase64(this.blog.image);
            },
            error => {
                console.error('Une erreur s\'est produite lors de la récupération des détails du blog.', error);
            }
        );

    }
    arrayBufferToBase64(image: string): string {
        return 'data:image/jpeg;base64,' + image;
    }

    goToUpdateBlog(blogId: number): void {
        this.router.navigate(['/update-blog', blogId]);
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
