import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { RecipeService } from "src/app/recipes/recipe.service";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registred?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API_KEY = environment.firebaseAPIKey;
    user : BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private tokenExiprationTimer: any;

    constructor(private http: HttpClient, private router: Router , private recipeService : RecipeService) { }

    signup(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }

    logout() {
        this.user.next(null);
        this.recipeService.setRecipes([]);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExiprationTimer) {
            clearTimeout(this.tokenExiprationTimer);
        }
        this.tokenExiprationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, 
                                    userData.id, 
                                    userData._token, 
                                    new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExiprationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, exipresIn: number) {
        const expirationDate = new Date(new Date().getTime() + exipresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(exipresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'These email or password are not correct.'
                break;
            default:
                break;
        }
        return throwError(() => errorMessage);
    }

}