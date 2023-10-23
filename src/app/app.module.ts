import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeoAgencyComponent } from './components/pages/seo-agency/seo-agency.component';
import { AiStartupComponent } from './components/pages/ai-startup/ai-startup.component';
import { MachineLearningComponent } from './components/pages/machine-learning/machine-learning.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { NavbarStyleOneComponent } from './components/common/navbar-style-one/navbar-style-one.component';
import { FooterStyleOneComponent } from './components/common/footer-style-one/footer-style-one.component';
import { NavbarStyleTwoComponent } from './components/common/navbar-style-two/navbar-style-two.component';
import { FooterStyleTwoComponent } from './components/common/footer-style-two/footer-style-two.component';
import { NavbarStyleThreeComponent } from './components/common/navbar-style-three/navbar-style-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NavbarStyleFourComponent } from './components/common/navbar-style-four/navbar-style-four.component';
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
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import {HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditProfileComponent } from './components/pages/edit-profile/edit-profile.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import { QuestionComponent } from './components/pages/question/question.component';
import { ReponseComponent } from './components/pages/reponse/reponse.component';
import { ResultComponent } from './components/pages/result/result.component';
import { ReclamationComponent } from './components/pages/reclamation/reclamation.component';
import { DialogComponent } from './components/pages/dialog/dialog.component';
//import {MatDialogModule} from '@angular/material/dialog'; 
//import {MatButtonModule} from '@angular/material/button';

function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080',
                realm: 'CulTechConnect',
                clientId: 'microservice-auth'
            },
            initOptions: {

                onLoad: 'check-sso',
                silentCheckSsoRedirectUri:
                    window.location.origin + '/assets/silent-check-sso.html'

            }
        });
}
@NgModule({
  declarations: [
    AppComponent,
    SeoAgencyComponent,
    AiStartupComponent,
    MachineLearningComponent,
    PreloaderComponent,
    NavbarStyleOneComponent,
    FooterStyleOneComponent,
    NavbarStyleTwoComponent,
    FooterStyleTwoComponent,
    NavbarStyleThreeComponent,
    AboutComponent,
    NavbarStyleFourComponent,
    TeamComponent,
    PricingComponent,
    FaqComponent,
    TestimonialsComponent,
    CaseStudyComponent,
    CaseStudyDetailsComponent,
    ErrorComponent,
    SignInComponent,
    SignUpComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    ComingSoonComponent,
    ServicesComponent,
    ServicesDetailsComponent,
    BlogDetailsComponent,
    BlogComponent,
    ContactComponent,
    EditProfileComponent,
    QuizComponent,
    QuestionComponent,
    ReponseComponent,
    ResultComponent,
    ReclamationComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, KeycloakAngularModule, FormsModule, ReactiveFormsModule,
    //MatDialogModule,MatButtonModule
  ],
  providers: [
      { provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

