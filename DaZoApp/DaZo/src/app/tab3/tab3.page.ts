import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 1. Importe os componentes visuais que o FAQ usará
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonIcon, // Adicionei IonIcon aqui
  IonAccordionGroup, IonAccordion
} from '@ionic/angular/standalone';

// 2. Importe e registre os ícones
import { addIcons } from 'ionicons';
import { warningOutline, documentTextOutline, locationOutline, shieldCheckmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  // 3. Adicione os componentes ao array 'imports'
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonIcon, // Adicionei IonIcon aqui também
    IonAccordionGroup, IonAccordion,
    CommonModule, FormsModule
  ]
})
export class Tab3Page {

  constructor() {
    // 4. Registre os ícones usados no HTML
    addIcons({
      warningOutline,
      documentTextOutline,
      locationOutline,
      shieldCheckmarkOutline
    });
  }

}