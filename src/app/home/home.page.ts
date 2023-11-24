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
  myswitch: boolean = true;

  
  constructor() { }

  digitos(valor: string) {
    if (valor == '()') {
      if (this.myswitch) {
        if (this.verifica_zero) {
          this.segundo_elemento = '(';
          this.verifica_zero = false;
        } else {
          this.segundo_elemento += '(';
          this.resultado += '(';
        }
        this.myswitch = false;
      } else {
        if (this.verifica_zero) {
          this.segundo_elemento = ')';
          this.verifica_zero = false;
        } else {
          this.segundo_elemento += ')';
          this.resultado += ')';
        }
        this.myswitch = true;
      }
      return
    }
    if (this.is_novo_calculo) {
      this.resetar();
      if(this.is_segundo_elemento){
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
      if(this.is_segundo_elemento){
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

//teste de funcionamento da funcionalidade parenteses para auxilio de calculo com números negativos / tentativa 1 faltou um switch, deu errado / tentativa 2 adicionar o switch
//criação do método adicionarnumero
  adicionarnumero(numero: string): void {
    if(this.is_novo_calculo) {
      this.primeiro_elemento = "";
      this.segundo_elemento = "";
      this.operador = "";
      this.resultado = "";
      this.memoria = "";
      this.is_novo_calculo = false;
    }
    
    if (this.operador == "") {
      this.primeiro_elemento += numero;
    } else {
      this.segundo_elemento += numero;
    }
  }

//funciolanidade do parenteses para auxilio de cálculo com números negativos
  parenteses(caractere: string): void {
    switch(caractere) {
      case "(":
        this.abreparentese();
        break;
      case ")":
        this.fechaparentese();
        break;
    }
  }
//funcionalidade parenteses para auxilio de calculo com números negativos
//uso do "void" para o método abre e fecha parentese é escolhido já que o método não retorna nenhum valor.
  abreparentese() : void { 
    if (this.operador == "" && this.primeiro_elemento == "") {
      this.primeiro_elemento += "(";
    } else if (this.operador !== "" && this.segundo_elemento == "") {
      this.segundo_elemento += "(";
    }
  }
//uso do método "endsWith" é uma função que checa se uma string termina com caracteres de outra string, retornando "true" caso termine e "false" caso não.
//caso o "endsWith" "retorne" true é adicionado o sinal de negativo.
  fechaparentese() : void {
    if (this.operador == "" && this.primeiro_elemento.endsWith("(")) {
      this.primeiro_elemento = this.primeiro_elemento.slice(0, -1);
      this.primeiro_elemento += "-";
    } else if (this.operador !== "" && this.segundo_elemento.endsWith("(")) {
      this.segundo_elemento = this.segundo_elemento.slice(0, -1);
      this.segundo_elemento += "-";
    } else {
      this.adicionarnumero(")");
    }
  }

  definiroperador(operador: string): void {
    if (this.primeiro_elemento !== "") {
      this.operador = operador;
    }
  }

  calcular() {
//parte da modificação ----> alteração de "parseInt" para "parseFloat" para o tratamento de números "quebrados".
    if (this.operador == "+" && this.segundo_elemento != "") {
      //this.memoria = this.resultado;
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
      //this.memoria += "=" + this.resultado;
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
    } else if (this.operador == "/" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
      this.is_novo_calculo = true;
      //inicio da modificação -- primeira modificação (nova funcionalidade) %
    } else if (this.operador == "%" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento) / 100).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
      this.is_novo_calculo = true;
      //funcionalidade +/- para cálculo com e de números negativos
      //+/- representa a soma como o primeiro elemento negativo somando com o segundo elemento também como sendo negativo.  
    } else if (this.operador == "+/-" && this.primeiro_elemento != "" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) * -1 + parseFloat(this.segundo_elemento) * -1).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
      this.is_novo_calculo = true;
      //funcionalidade sqrt para cálculo de raiz quadrada.
      //Math.sqrt retorna a raiz quadrada de um número. 
    } else if (this.operador == "sqrt" && this.primeiro_elemento != "") {
       if (parseFloat(this.primeiro_elemento) >= 0) { //valida número positivo, já que raiz^2 não aceita número negativo, para que Math.sqrt possa funcionar.
        this.resultado = Math.sqrt(parseFloat(this.primeiro_elemento)).toString();
        this.memoria = "sqrt(" + this.primeiro_elemento + ")=" + this.resultado;
        this.is_novo_calculo = true;
       }
      //funcionalidade ^2 para cálculo com número ao quadrado.
      //parseFloat ** potencializado a 2 para ser o elemento ao quadrado.
    } else if (this.operador == "^2" && this.primeiro_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) ** 2).toString();
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
      } /*else if (this.segundo_elemento == "" && this.operador == "") {
        alert("Nenhum elemento foi definido.")
      }*/ else {
        alert("O segundo elemento não foi definido.")
      }
    }
  }

  resetar() {
    this.resultado = "0";
    //this.memoria = ""
    this.verifica_zero = true;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operador = "";
    this.is_novo_calculo = false;
  }
}