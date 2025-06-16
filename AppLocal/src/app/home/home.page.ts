// Importa o decorator Component do Angular para definir um componente
import { Component } from '@angular/core';
// Importa CommonModule para diretivas comuns do Angular (ngIf, ngFor, etc)
import { CommonModule } from '@angular/common';
// Importa FormsModule para usar ngModel (two-way binding) nos formulários
import { FormsModule } from '@angular/forms';
// Importa módulos do Ionic, incluindo ToastController para mensagens rápidas
import { IonicModule, ToastController } from '@ionic/angular';
// Importa o Storage do Ionic para armazenamento local
import { Storage } from '@ionic/storage-angular';

// Define o componente HomePage com decorador @Component
@Component({
  selector: 'app-home', // seletor HTML para usar o componente (não muito usado com standalone)
  templateUrl: './home.page.html', // arquivo HTML do template
  styleUrls: ['./home.page.scss'], // arquivo de estilos CSS/SCSS
  standalone: true, // componente standalone, não precisa estar declarado em NgModule
  imports: [CommonModule, FormsModule, IonicModule], // módulos importados para este componente
})
export class HomePage {
  // Variável ligada ao campo nome no formulário, inicializada vazia
  nome: string = '';

  // Variável ligada ao campo idade, pode ser número ou null inicialmente
  idade: number | null = null;

  // Variável privada para guardar a instância do Storage (inicialmente null)
  private storageInstance: Storage | null = null;

  // Construtor que injeta as dependências Storage e ToastController
  constructor(private storage: Storage, private toastController: ToastController) {
    // Inicializa o Storage assim que o componente for criado
    this.initStorage();
  }

  // Método assíncrono para criar e guardar a instância do Storage
  async initStorage() {
    this.storageInstance = await this.storage.create();
  }

  // Método chamado ao clicar no botão Salvar
  async salvar() {
    // Validação simples: se nome está vazio ou idade é null, mostra aviso e retorna
    if (!this.nome || this.idade === null) {
      const toast = await this.toastController.create({
        message: 'Preencha todos os campos!', // mensagem de erro
        duration: 2000, // duração da mensagem (2 segundos)
        color: 'danger', // cor vermelha para indicar erro
      });
      await toast.present(); // exibe o toast
      return; // sai da função sem salvar
    }

    // Cria um novo objeto registro com nome e idade informados
    const novoRegistro = { nome: this.nome, idade: this.idade };

    // Se a instância do storage estiver criada
    if (this.storageInstance) {
      // Tenta obter a lista de registros já salvos, ou cria lista vazia se não existir
      let registros = (await this.storageInstance.get('registros')) || [];

      // Adiciona o novo registro à lista
      registros.push(novoRegistro);

      // Salva a lista atualizada no Storage com a chave 'registros'
      await this.storageInstance.set('registros', registros);

      // Cria um toast de sucesso para mostrar que os dados foram salvos
      const toast = await this.toastController.create({
        message: 'Dados salvos com sucesso!', // mensagem de sucesso
        duration: 2000, // duração 2 segundos
        color: 'success', // cor verde para sucesso
      });
      await toast.present(); // exibe o toast

      // Limpa os campos do formulário para o próximo cadastro
      this.nome = '';
      this.idade = null;
    }
  }
}
