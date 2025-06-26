import {inject, Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppMessageService {

  messageService = inject(MessageService)

  success(detail: string = '') {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail });
  }

  error(detail: string = '') {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }
}
