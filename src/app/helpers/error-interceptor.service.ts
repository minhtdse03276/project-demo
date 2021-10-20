import { LoaderService } from './helper-services/loader.service';
import { Router } from '@angular/router';
import { Injectable, Injector } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { catchError, finalize, delay, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private _appService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this._appService.show();
    }, 0);
    return next.handle(request).pipe(
      // delay(2000),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status < 300) {
          // console.log(`Requesting...`);
        }
      }),
      // request finish
      finalize(() => {
        setTimeout(() => {
          this._appService.hide();
        }, 500);
      }),
      // handle error
      catchError((error: HttpErrorResponse) => {
        if (error.status > 400) {
          console.log(`Error request!`);
        }
        // if (error.status === 401) {
        //   this.router.navigate(['/404']);
        // }
        return throwError(error);
      })
    );
  }
}
