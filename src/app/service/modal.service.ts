import { Injectable } from '@angular/core';
import { ModalOptions } from '../interface/modal-options';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: ModalOptions;
  constructor() {}
}
