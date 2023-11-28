import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = "0";
  memoria: string = "";
  verifica_zero: boolean = true;
  operador_inserido: boolean = false;
  is_segundo_elemento: boolean = false;
  primeiro_elemento: string = "";
  segundo_elemento: string = "";
  operador: string = "";
  is_novo_calculo: boolean = false;
  resposta_usuario: string = "";

  constructor() { }

  digitos(valor: string) {
    if (this.is_novo_calculo) {
      this.resetar();
      if (this.is_segundo_elemento) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    } else {
      if (this.is_segundo_elemento) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    }

  }

  operadores(operador: string) {
    if (!this.operador_inserido && this.verifica_zero == false) {
      this.primeiro_elemento = this.resultado;
      this.resultado += operador;
      this.operador_inserido = true;
      this.operador = operador;
      this.is_segundo_elemento = true;
    }
  }

   calcular() {
//alteração de "parseInt" para "parseFloat" para o tratamento de números "quebrados".
     if (this.operador == "+" && this.segundo_elemento != "") {
        this.memoria = this.resultado;
        this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
        this.memoria += "=" + this.resultado;
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
     } else if (this.operador == "-" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
     } else if (this.operador == "*" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
  //alteração para que se o divisor for 0 não seja permitida a divisão.
     } else if (this.operador == "/" && this.segundo_elemento != "" && parseFloat(this.segundo_elemento) !== 0) {
       this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
      if (this.operador == "/" && this.segundo_elemento !== "" && parseFloat(this.segundo_elemento) === 0) {
       alert("Não é permitida divisão por 0")
     }
  //inicio da modificação -- primeira modificação (nova funcionalidade) %
     } else if (this.operador == "%" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento) / 100).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
  //funcionalidade +/- para cálculo com e de números negativos
  //+/- representa a soma como o primeiro elemento negativo (por mais que não simbolize, apenas na memória) somando com o segundo elemento também como sendo negativo.  
     } else if (this.operador == "+/-" && this.primeiro_elemento != "" && this.segundo_elemento != "") {
       this.resultado = (- parseFloat(this.primeiro_elemento) + (parseFloat(this.segundo_elemento) * -1)).toString();
       this.memoria = "(-" + this.primeiro_elemento + ")" + this.operador + "(" + this.segundo_elemento + ")=" + this.resultado;
       this.is_novo_calculo = true;
  //funcionalidade sqrt para cálculo de raiz quadrada.
  //Math.sqrt retorna a raiz quadrada de um número. 
     } else if (this.operador == "√" && this.primeiro_elemento != "") {
       if (parseFloat(this.primeiro_elemento) >= 0) { //valida número positivo, já que raiz^2 não aceita número negativo, para que Math.sqrt possa funcionar.
         this.resultado = Math.sqrt(parseFloat(this.primeiro_elemento)).toString();
         this.memoria = "√(" + this.primeiro_elemento + ")=" + this.resultado;
         this.is_novo_calculo = true;
       }
  //funcionalidade ^2 para cálculo com número ao quadrado.
  //parseFloat ** potencializado a 2 para ser o elemento ao quadrado.
     } else if (this.operador == "^2" && this.primeiro_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) ** parseFloat(String(2))).toString();
       this.memoria = this.primeiro_elemento + "^2=" + this.resultado;
       this.is_novo_calculo = true;
  //funcionalidade para exponênciação.
  //quase o mesmo do calculo ao quadrado mas o parseFloat é potencializado pelo segundo elemento.
     } else if (this.operador == "^" && this.primeiro_elemento != "" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) ** parseFloat(this.segundo_elemento)).toString();
       this.memoria = this.primeiro_elemento + "^" + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
     } else {
       if (this.operador == "") {
         alert("Nenhum operador foi selecionado.")
       } else if (this.segundo_elemento == "" && this.operador == "") {
         alert("Nenhum elemento foi definido.")
       } else {
         alert("O segundo elemento não foi definido.")
       }
    }
   }

//funcionalidade minigame, gera uma conta aleatória para o usuário responder.
//gera o número aleatório
  gerador_numero(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//gera operador aleatório dentre + - * / ^2 e %
  gerador_operador(): string {
    const operadores = ['+', '-', '*', '/', '^2', '%'];
    const indice = this.gerador_numero(0, operadores.length - 1);
    return operadores[indice];
  }
//gera a conta aleatória, faz a seleção dos números e operadores aleatoriamente.
  gerador_conta(): string {
    const primeiro_numero = this.gerador_numero(0, 100);
    const segundo_numero = this.gerador_numero(0, 100);
    const operador = this.gerador_operador();
    return primeiro_numero.toString() + ' ' + operador + ' ' + segundo_numero.toString();
  }
//metodo minigame, seleciona a conta e exibe ao usuário
  minigame(): void {
    const conta_aleatoria = this.gerador_conta();
    this.memoria = ('Bem vindo ao jogo, resolva: ' + conta_aleatoria + '=');
    this.resultado = '';
    this.resposta_usuario = '';
  }
//verifica a resposta do usuario e encerra se certo ou se errado
  verificar_resposta(): void {
    const resultado_esperado = eval(this.memoria);
    if (!isNaN(parseFloat(this.resposta_usuario)) && parseFloat(this.resposta_usuario) == resultado_esperado) {
      this.resultado = 'Resposta correta!';
    } else {
      this.resultado = 'Resposta errada, o resultado é ' + resultado_esperado;
    }
    this.memoria = '';
    this.resposta_usuario = '';
  }
  
  resetar() {
    this.resultado = "0";
    this.memoria = ""
    this.verifica_zero = true;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operador = "";
    this.is_novo_calculo = false;
  }
}