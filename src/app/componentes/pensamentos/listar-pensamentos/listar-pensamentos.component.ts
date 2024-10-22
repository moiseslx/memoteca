import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento';
import { PensamentoService } from '../../../services/pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrl: './listar-pensamentos.component.css',
})
export class ListarPensamentosComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];

  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string =  'Meu Mural'

  constructor(private service: PensamentoService, private router: Router) {}

  ngOnInit(): void {
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((value) => {
        this.listaPensamentos = value;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((value) => {
        this.listaPensamentos.push(...value);
        if (!value.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((value) => {
        this.listaPensamentos = value;
      });
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos';
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.favoritos = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((value) => {
        this.listaPensamentos = value;
        this.listaFavoritos = value;
      });
  }

  recarregarPensamentos() {
    this.favoritos = false
    this.paginaAtual = 1
    this.router.navigate([this.router.url])
  }
}
