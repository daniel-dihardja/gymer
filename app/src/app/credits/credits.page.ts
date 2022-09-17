import { Component, OnInit } from '@angular/core';
import { loadScript } from "@paypal/paypal-js";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('init');
    loadScript({ "client-id": environment.payPalClientId, 'buyer-country': 'DE', 'currency': 'EUR', 'locale': 'de_DE' })
      .then((paypal) => {
        // start to use the PayPal JS SDK script
        console.log(paypal);
        paypal.Buttons({
          style: {
            layout: 'vertical',
            color:  'blue',
            shape:  'rect',
            label:  'buynow'
          }
        }).render('#paypal-button-container');
      })
      .catch((err) => {
        console.error("failed to load the PayPal JS SDK script", err);
      });
  }

}
