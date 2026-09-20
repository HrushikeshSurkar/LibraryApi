import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Users } from './users';
import { UsersPageService } from './users.service';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [
        provideZonelessChangeDetection(),
        UsersPageService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load users', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:5147/api/users');
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, data: [{ user_id: '1', user_name: 'John', user_email: 'j@a.com', user_contact: '1234567890', user_address: 'Addr', user_role: 'Reader' }] });

    expect(component).toBeTruthy();
  });
});
