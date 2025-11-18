import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

// Componentes Visuais
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
  IonButton, IonText
} from '@ionic/angular/standalone';

// Ícones
import { addIcons } from 'ionicons';
import { alertCircleOutline, documentTextOutline, helpCircleOutline, radioButtonOnOutline, videocamOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule,
    IonButton, IonText,
    RouterModule
  ],
})
export class TabsPage {

  // Variáveis de Estado
  logMessages: any[] = []; // Suporta texto e objetos com cor
  isRecording: boolean = false;
  
  // Variáveis de Simulação
  latitude: string = '---';
  longitude: string = '---';

  constructor(
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({
      alertCircleOutline,
      documentTextOutline,
      helpCircleOutline,
      radioButtonOnOutline,
      videocamOutline
    });
  }

  // --- SIMULAÇÃO DE LOCALIZAÇÃO ---
  async getLocation() {
    this.logMessages = [];
    this.latitude = '---';
    this.longitude = '---';

    // 1. Mensagem Inicial
    this.logMessages.push('Rastreando localização em tempo real...');

    // Simula um pequeno "loading" de 2 segundos para realismo
    setTimeout(() => {
      // Define coordenadas falsas (ex: Centro de São Paulo)
      this.latitude = '-23.5505';
      this.longitude = '-46.6333';

      // 2. Mensagem Verde de Sucesso
      this.logMessages.push({ 
        text: 'A localização está sendo rastreada com sucesso.', 
        color: 'success' 
      });
    }, 2000);
  }

  // --- SIMULAÇÃO DE CÂMERA ---

  startCameraPreview() {
    this.isRecording = true;
    // Não chamamos nenhum plugin. Apenas mudamos o estado 'isRecording'.
    // O HTML vai mostrar o aviso de "Gravando".
  }

  async stopSimulation() {
    this.logMessages.push('Simulação de SOS parada.');
    await this.stopCameraInternal();
    
    await this.presentStopToast();
    window.location.reload(); 
  }

  async stopCameraPreview() {
    this.logMessages.push('Gravação parada.');
    await this.stopCameraInternal();
  }

  private async stopCameraInternal() {
    this.isRecording = false;
    // Nenhuma limpeza de plugin necessária
  }

  // --- TOASTS / AVISOS ---
  async presentStopToast() {
    const toast = await this.toastCtrl.create({
      message: 'Tempo de gravação esgotado. Recarregando...',
      duration: 2000, position: 'top', color: 'medium'
    });
    await toast.present();
  }

  async presentEnvioToast() {
    const toast = await this.toastCtrl.create({
      message: 'Dados coletados. Recarregando...',
      duration: 2000, position: 'top', color: 'success'
    });
    await toast.present();
  }
  
  forceRefresh() {
    window.location.reload();
  }
}