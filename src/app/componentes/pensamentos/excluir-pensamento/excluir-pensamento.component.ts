import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento';
import { PensamentoService } from '../../../services/pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrl: './excluir-pensamento.component.css'
})
export class ExcluirPensamentoComponent implements OnInit{

  pensamento: Pensamento | undefined

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id')
     this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento
     })
  }

  excluirPensamento() {
    if(this.pensamento!.id){
      this.service.excluir(this.pensamento!.id).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }
}
