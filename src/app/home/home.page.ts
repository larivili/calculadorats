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

  constructor() { }

// funcionalidade "." para que seja apenas adicionado 1 ponto por elemento, onde ocorre a validação.
  digitos(valor: string) {
    if (this.is_novo_calculo) {
      this.resetar();
      if (this.is_segundo_elemento) {
        this.segundo_elemento += this.validarPonto(valor, this.segundo_elemento);
        this.resultado += this.validarPonto(valor, this.segundo_elemento);
      } else {
        if (this.verifica_zero) {
          this.resultado = this.validarPonto(valor, this.resultado);
          this.verifica_zero = false;
        } else {
          this.resultado += this.validarPonto(valor, this.resultado);
        }
      }
    } else {
      if (this.is_segundo_elemento) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = this.validarPonto(valor, this.resultado);
          this.verifica_zero = false;
        } else {
          this.resultado += this.validarPonto(valor, this.resultado);
        }
      }
    }
  }  
//metodo para validar o ponto, verifica se já foi adicionado o ponto, e se já foi computado o "." retorna vazio se não retorna o valor.
  validarPonto(valor: string, elemento: string): string {
    if (valor == '.' && elemento.includes('.')) {
      return '';
    }
    return valor;
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
//aplicado o 'toFixed(2)' para que seja utilizada 2 casas decimais para os dados float.
     if (this.operador == "+" && this.segundo_elemento != "") {
        this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toFixed(2).toString();
        this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
        this.is_novo_calculo = true;
     } else if (this.operador == "-" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toFixed(2).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
     } else if (this.operador == "*" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toFixed(2).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
  //alteração para que se o divisor for 0 não seja permitida a divisão.
     } else if (this.operador == "/" && this.segundo_elemento != "" && parseFloat(this.segundo_elemento) !== 0) {
       this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toFixed(2).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
      if (this.operador == "/" && this.segundo_elemento !== "" && parseFloat(this.segundo_elemento) === 0) {
       alert("Não é permitida divisão por 0")
     }
  //inicio da modificação -- primeira modificação (nova funcionalidade) %
     } else if (this.operador == "%" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento) / 100).toFixed(2).toString();
       this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
       this.is_novo_calculo = true;
  //funcionalidade +/- para cálculo com e de números negativos
  //+/- representa a soma como o primeiro elemento negativo (por mais que não simbolize, apenas na memória) somando com o segundo elemento também como sendo negativo.  
     } else if (this.operador == "+/-" && this.primeiro_elemento != "" && this.segundo_elemento != "") {
       this.resultado = (- parseFloat(this.primeiro_elemento) + (parseFloat(this.segundo_elemento) * -1)).toFixed(2).toString();
       this.memoria = "(-" + this.primeiro_elemento + ")" + this.operador + "(" + this.segundo_elemento + ")=" + this.resultado;
       this.is_novo_calculo = true;
  //funcionalidade sqrt para cálculo de raiz quadrada.
  //Math.sqrt retorna a raiz quadrada de um número. 
     } else if (this.operador == "√" && this.primeiro_elemento != "") {
       if (parseFloat(this.primeiro_elemento) >= 0) { //valida número positivo, já que raiz^2 não aceita número negativo, para que Math.sqrt possa funcionar.
         this.resultado = Math.sqrt(parseFloat(this.primeiro_elemento)).toFixed(2).toString();
         this.memoria = "√(" + this.primeiro_elemento + ")=" + this.resultado;
         this.is_novo_calculo = true;
       }
  //funcionalidade ^2 para cálculo com número ao quadrado.
  //parseFloat ** potencializado a 2 para ser o elemento ao quadrado.
     } else if (this.operador == "^2" && this.primeiro_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) ** parseFloat(String(2))).toFixed(2).toString();
       this.memoria = this.primeiro_elemento + "^2=" + this.resultado;
       this.is_novo_calculo = true;
  //funcionalidade para exponênciação.
  //quase o mesmo do calculo ao quadrado mas o parseFloat é potencializado pelo segundo elemento.
     } else if (this.operador == "^" && this.primeiro_elemento != "" && this.segundo_elemento != "") {
       this.resultado = (parseFloat(this.primeiro_elemento) ** parseFloat(this.segundo_elemento)).toFixed(2).toString();
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