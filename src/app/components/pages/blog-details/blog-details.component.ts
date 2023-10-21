import { Component, OnInit } from '@angular/core';
import {BlogForm} from '../../models/BlogForm';
import {BlogServiceService} from '../../services/blog-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentDto} from '../../models/CommentDto';
import {CommentServiceService} from '../../services/comment-service.service';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

    blogId: number;
    blog: BlogForm | undefined;

    images: string = '';
    newComment: CommentDto = new CommentDto();
    comments: any[] = [];
    constructor(private blogService: BlogServiceService,
                private route: ActivatedRoute,
                private router: Router,
                private commentService: CommentServiceService) { }

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

                this.commentService.getCommentsByBlogId(blogId).subscribe(
                    (comments: CommentDto[]) => {
                        this.comments = comments; // Mettez à jour la variable comments avec les données obtenues
                    },
                    error => {
                        console.error('Une erreur s\'est produite lors de la récupération des commentaires du blog.', error);
                    }
                );
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
    createComment(): void {
        this.commentService.createComment(this.newComment, this.blogId).subscribe(
            (data: any) => {
                console.log('Comment created successfully: ', data);
                this.getBlogDetails(this.blogId);
            },
            error => {
                console.error('Erreur lors de la création du commentaire.', error);
            }
        );
        this.newComment = new CommentDto();
    }

    getTimeAgo(dateAdded: string): string {
        const currentTime = new Date();
        const previousTime = new Date(dateAdded);
        const timeDifference = Math.abs(currentTime.getTime() - previousTime.getTime());
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `Il y a ${days} jour(s)`;
        } else if (hours > 0) {
            return `Il y a ${hours} heure(s)`;
        } else if (minutes > 0) {
            return `Il y a ${minutes} minute(s)`;
        } else {
            return 'Il y a quelques instants';
        }
    }

    deleteComment(commentId: number): void {
        this.commentService.deleteComment(commentId).subscribe(
            (data: any) => {
                console.log('Comment deleted successfully: ', data);
                this.getBlogDetails(this.blogId); // Mettez à jour les commentaires après la suppression
            },
            error => {
                console.error('Erreur lors de la suppression du commentaire.', error);
            }
        );
    }
}
