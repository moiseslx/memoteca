import { Component, Input } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent {

  @Input() pensamento : Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: "modelo1"
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 200){
      return 'pensamento-g'
    }

    return 'pensamento-p'
  }

  
}
