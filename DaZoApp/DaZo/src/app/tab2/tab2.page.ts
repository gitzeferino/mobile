// Em src/app/tab2/tab2.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Importe a TabsPage (o "Pai")
import { TabsPage } from '../tabs/tabs.page';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonTextarea,
  IonButton, IonButtons, IonBackButton,
  IonLabel,
  IonDatetime, IonSelect, IonSelectOption,
  IonGrid, IonRow, IonCol, IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonTextarea,
    IonButton, IonButtons, IonBackButton,
    IonLabel, IonDatetime, IonSelect, IonSelectOption,
    IonGrid, IonRow, IonCol, IonIcon,
    CommonModule, FormsModule, RouterModule
  ]
})
export class Tab2Page {

  // Injete a TabsPage (o "Pai")
  constructor(
    public tabsPage: TabsPage
  ) {
    addIcons({
      arrowBackOutline,
      checkmarkOutline
    });
  }

  // ESTA FUNÇÃO ESTAVA EM FALTA
  async enviarBoletim() {
    // Só faça algo se a gravação estiver ativa
    if (this.tabsPage.isRecording) {
      await this.tabsPage.stopCameraPreview();
      await this.tabsPage.presentEnvioToast(); // Mostra "Dados Coletados"
      this.tabsPage.forceRefresh(); // Recarrega o app
    } else {
      // Se não estava gravando, apenas envie
      console.log('Boletim enviado (sem gravação).');
      // Adicione aqui um toast de "enviado com sucesso" se desejar
    }
  }
}