// Em src/app/tab1/tab1.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDidEnter, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonIcon, IonButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { warningOutline, documentTextOutline, mapOutline, helpCircleOutline } from 'ionicons/icons';

import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    CommonModule,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonIcon, IonButton,
    RouterModule
  ],
})
export class Tab1Page implements ViewDidEnter {

  constructor(
    private alertCtrl: AlertController,
    public tabsPage: TabsPage // Injeta o componente Pai
  ) {
    addIcons({
      warningOutline,
      documentTextOutline,
      mapOutline,
      helpCircleOutline
    });
  }

  ionViewDidEnter() {
    this.tabsPage.getLocation();
  }

  // Alerta SOS (agora controla o temporizador)
  async presentSosAlert() {
    const alert = await this.alertCtrl.create({
      header: 'ATENÇÃO!',
      message: 'Esta ação SIMULA um chamado de emergência e INICIARÁ A GRAVAÇÃO de segurança.<br><br>Deseja continuar com a SIMULAÇÃO?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'OK',
          handler: () => {
            this.logicaGravacaoSOS();
          }
        }
      ]
    });
    await alert.present();
  }

  // 1. LÓGICA DE GRAVAÇÃO DO SOS (5 segundos)
  logicaGravacaoSOS() {
    this.tabsPage.logMessages.push('⚠️ SIMULAÇÃO DE SOS INICIADA (5s) ⚠️');
    this.tabsPage.startCameraPreview();

    // Inicia o temporizador de 5 segundos
    setTimeout(() => {
      // Só para se a gravação ainda estiver ativa
      if (this.tabsPage.isRecording) {
        this.tabsPage.stopCameraPreview();
        this.tabsPage.presentStopToast(); // Avisa "Tempo Esgotado"
        this.tabsPage.forceRefresh(); // Recarrega
      }
    }, 5000); // 5 segundos
  }

  // 2. LÓGICA DE GRAVAÇÃO DO BOLETIM (contínua)
  iniciarGravacaoBoletim() {
    // Apenas inicia a câmera, sem temporizador
    // (O [routerLink] no HTML cuidará da navegação)
    this.tabsPage.logMessages.push('⚠️ GRAVAÇÃO DE BOLETIM INICIADA ⚠️');
    this.tabsPage.startCameraPreview();
  }
}