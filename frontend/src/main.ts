import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '@angular/compiler';



// Démarrer l'application en utilisant le compilateur JIT
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
