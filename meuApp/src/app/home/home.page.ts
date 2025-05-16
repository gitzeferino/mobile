import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private afAuth: AngularFireAuth, private toastController: ToastController) {}

  async login() {
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.showToast('Login realizado com sucesso!');
    } catch (error: any) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }
}
