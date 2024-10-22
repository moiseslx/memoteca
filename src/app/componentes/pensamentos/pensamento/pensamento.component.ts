import { Component, Input } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento';
import { PensamentoService } from '../../../services/pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css',
})
export class PensamentoComponent {
  @Input() pensamento: Pensamento | undefined;

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  larguraPensamento(): string {
    if (this.pensamento!.conteudo.length >= 200) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  mudarIconeFavorito(): string {
    if (this.pensamento?.favorito) {
      return 'ativo';
    }

    return 'inativo';
  }

  atualizarFavoritos() {
    if (this.pensamento) {
      this.service.mudarFavorito(this.pensamento).subscribe(() => {
        const index = this.listaFavoritos.indexOf(this.pensamento!);
        if (index > -1) {
          this.listaFavoritos.splice(index, 1);
        }
      });
    }
  }
}
