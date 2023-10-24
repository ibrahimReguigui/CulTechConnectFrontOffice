import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentDto} from '../models/CommentDto';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
    url = 'http://localhost:8093/comments';
  constructor(private http: HttpClient) { }

    createComment(comment: CommentDto, postId: number): Observable<CommentDto> {
        const url = `${this.url}/post/${postId}/comments`;
        return this.http.post<CommentDto>(url, comment);
    }

    getCommentsByBlogId(blogId: number): Observable<CommentDto[]> {
        const url = `http://localhost:8093/comments/blog/${blogId}/comments`;
        return this.http.get<CommentDto[]>(url);
    }


    deleteComment(commentId: number): Observable<any> {
        const url = `${this.url}/${commentId}`;
        return this.http.delete(url);
    }


}
