import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeoAgencyComponent } from './components/pages/seo-agency/seo-agency.component';
import { AiStartupComponent } from './components/pages/ai-startup/ai-startup.component';
import { MachineLearningComponent } from './components/pages/machine-learning/machine-learning.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TeamComponent } from './components/pages/team/team.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { CaseStudyComponent } from './components/pages/case-study/case-study.component';
import { CaseStudyDetailsComponent } from './components/pages/case-study-details/case-study-details.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import {EditProfileComponent} from './components/pages/edit-profile/edit-profile.component';
import {ChatComponent} from './components/pages/chat/chat.component';
import { EchangeComponent } from './components/pages/echange/echange.component';
import { PayementComponent } from './components/pages/payement/payement.component';
import { EchangeDetailsComponent } from './components/pages/echange-details/echange-details.component';
import { ParticipantComponent } from './components/pages/participant/participant.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import {ReclamationComponent} from './components/pages/reclamation/reclamation.component';
import {CreateBlogComponent} from './components/pages/create-blog/create-blog.component';
import {UpdateBlogComponent} from './components/pages/update-blog/update-blog.component';
import {AuthGuard} from './security/AuthGuard';
import {ProfileComponent} from './components/pages/profile/profile.component';
const routes: Routes = [
    {path: '', component: SeoAgencyComponent},
    {path: 'create-blog', component: CreateBlogComponent , canActivate: [AuthGuard]},
    {path: 'update-blog/:blogId', component: UpdateBlogComponent , canActivate: [AuthGuard]},
    { path: 'blog-details/:blogId', component: BlogDetailsComponent, canActivate: [AuthGuard]},
    {path: 'ai-startup', component: AiStartupComponent},
    {path: 'machine-learning', component: MachineLearningComponent},
    {path: 'about', component: AboutComponent},
    {path: 'team', component: TeamComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'testimonials', component: TestimonialsComponent},
    {path: 'case-study', component: CaseStudyComponent},
    {path: 'case-study-details/:idEvent', component: CaseStudyDetailsComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'services-details', component: ServicesDetailsComponent},
    {path: 'blog', component: BlogComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'contact', component: ContactComponent},
    {path: 'echange', component: EchangeComponent},
    {path: 'payement', component: PayementComponent, canActivate: [AuthGuard]},
    { path: 'echange/:id', component: EchangeDetailsComponent },
    { path: 'demande/:echangeId', component: ParticipantComponent },
    {path: 'edit-profile', component: EditProfileComponent},
    {path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
    {path: 'reclamation', component: ReclamationComponent, canActivate: [AuthGuard]},
    {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
    {path: '**', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
