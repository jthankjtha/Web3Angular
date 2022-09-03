import {Component} from '@angular/core';
import { timeStamp } from 'console';
import {Web3Service} from "./services/contract/web3.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authenticated: boolean = false;
  selectedAccount: string[] | undefined;
  balance: string | undefined;
  tokenMinted = false;


  constructor(
    private web3: Web3Service) {
  }


  Connect() {
    this.web3.connectAccount().then(response => {
      console.log(response);
      this.selectedAccount = response
    })
  }

  ConnectToContract(){
    this.web3.connectToContract().then(response => {
      console.log(response);
    })
  }

  Balance() {
    if(this.selectedAccount != undefined){
      this.web3.accountInfo(this.selectedAccount).then(balance => {
        console.log(balance);
        this.balance = balance
      })
    }
  }

  MintToken(){
    if(this.selectedAccount != undefined){
      this.web3.mintToken(this.selectedAccount).then(trx => {
        console.log(trx);
        this.tokenMinted = true;
      }).catch(err =>{
        console.log(err);
      })
    }
  }

}
