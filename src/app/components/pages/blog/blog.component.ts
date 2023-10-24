import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../../../services/blog-service.service';
import { Router } from '@angular/router';
import { BlogForm } from '../../../models/BlogForm';
import { FileServiceService } from '../../../services/file-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {KeycloakService} from 'keycloak-angular';
import {GlobalVarService} from '../../../services/global-var.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

    currentPage: number = 1; // Page actuelle, initialisée à 1
    totalItems: number; // Nombre total d'articles de blog
    itemsPerPage: number = 6; // Nombre d'articles par page
    totalPages: number[] = []; // Tableau contenant le nombre total de pages
    blogs: BlogForm[] = [];
    images: SafeUrl[] = [];

    constructor(
        private fileService: FileServiceService,
        private router: Router,
        private keycloak: KeycloakService,
    ) { }

    ngOnInit(): void {
        this.fileService.getBlogs().subscribe((data: BlogForm[]) => {
            this.blogs = data;
            this.totalItems = this.blogs.length;
            this.calculateTotalPages();
            this.images = this.blogs.map(blog => this.arrayBufferToBase64(blog.image));
        });
    }

    onCreateBlogClick(): void {
        this.router.navigate(['/create-blog']);
    }

    arrayBufferToBase64(image: string): string {
        return 'data:image/jpeg;base64,' + image;
    }

    calculateTotalPages(): void {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            this.totalPages.push(i);
        }
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.fileService.getBlogs().subscribe((data: BlogForm[]) => {
            this.blogs = data.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
            this.images = this.blogs.map(blog => this.arrayBufferToBase64(blog.image));
        });
    }

}
