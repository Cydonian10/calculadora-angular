import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should render router-outlet with correct classes', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
    if (routerOutlet) {
      const parentDiv = routerOutlet.parentElement;
      expect(parentDiv).toBeTruthy();
      if (parentDiv) {
        expect(parentDiv.classList.contains('min-w-screen'));
        expect(parentDiv.classList.contains('min-h-screen'));
        expect(parentDiv.classList.contains('bg-slate-700'));
        expect(parentDiv.classList.contains('flex'));
        expect(parentDiv.classList.contains('items-center'));
        expect(parentDiv.classList.contains('justify-center'));
        expect(parentDiv.classList.contains('px-5'));
        expect(parentDiv.classList.contains('py-5'));
      }
    }
  });

  it('should render buy me a beer link with correct href and image', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link).toBeTruthy();
    if (link) {
      expect(link.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');
      const img = link.querySelector('img');
      expect(img).toBeTruthy();
      if (img) {
        expect(img.getAttribute('src')).toBe(
          'https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg',
        );
      }
    }
  });
});
