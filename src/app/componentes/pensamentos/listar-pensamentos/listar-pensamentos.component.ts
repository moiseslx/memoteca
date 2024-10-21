import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento';
import { PensamentoService } from '../../../services/pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrl: './listar-pensamentos.component.css',
})
export class ListarPensamentosComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];

  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((value) => {
      this.listaPensamentos = value;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual).subscribe((value) => {
      this.listaPensamentos.push(...value);
      if (!value.length) {
        this.haMaisPensamentos = false;
      }
    });
  }
}
