import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // Paramétres
  nombreDeCrowders: number = 3;
  nombreDePivots: number = 10;
  nombreDePropositionsParPivots: number = 2;
  nombreDeNotationParProposition: number = 3;
  name = "Simulations ";
  resultat: string = "";

  // Variables pour le calculer
  private nombreDePropositionsTotal: number = 0;
  private nombreDePropostitionsParCrowder: number = 0;
  private nombreDePropostitionsRestantes: number = 0;

  private nombreDeNotationTotal: number = 0;
  private nombreDeNotationParCrowder: number = 0;
  private nombreDeNotationRestantes: number = 0;

  calculer(): void {
    this.resultat = "";

    this.trace("\n## Paramétres ##\n");
    this.trace(`Nombre de crowders : ${this.nombreDeCrowders}\n`);
    this.trace(`Nombre de pivots : ${this.nombreDePivots}\n`);
    this.trace(`Nombre de propositions par pivot : ${this.nombreDePropositionsParPivots}\n`);
    this.trace(`Nombre de notations par proposition : ${this.nombreDeNotationParProposition}\n`);
    this.trace(` --------------------------------------------------------- \n`);

    this.nombreDePropositionsTotal = this.nombreDePivots * this.nombreDePropositionsParPivots;
    this.nombreDePropostitionsParCrowder = Math.floor( this.nombreDePropositionsTotal / this.nombreDeCrowders);
    this.nombreDePropostitionsRestantes = this.nombreDePropositionsTotal % this.nombreDeCrowders;

    this.trace("\n## Propositions ##\n");
    this.trace(`Nombre de propositions Total : ${this.nombreDePropositionsTotal}\n`);
    this.trace(`Nombre de propositions par crowder : ${this.nombreDePropostitionsParCrowder}\n`);
    this.trace(`Nombre de crowders avec une proposition de plus : ${this.nombreDePropostitionsRestantes}\n`);
    this.dispatcherPropositions();

    this.nombreDeNotationTotal = (this.nombreDePropositionsTotal + this.nombreDePivots) * this.nombreDeNotationParProposition;

    this.nombreDeNotationParCrowder = Math.floor(this.nombreDeNotationTotal / this.nombreDeCrowders);
    this.nombreDeNotationRestantes = this.nombreDeNotationTotal % this.nombreDeCrowders;

    this.trace("\n\n## Notations ##\n");
    this.trace(`Nombre de notations Total : ${this.nombreDeNotationTotal}\n`);
    this.trace(`Nombre de notations par crowder : ${this.nombreDeNotationParCrowder}\n`);
    this.trace(`Nombre de crowders avec une notation de plus : ${this.nombreDeNotationRestantes}\n`);
    this.dispatcherNotations();
  }

  private dispatcherPropositions() {
    let crowders = this.creeListeDeCrowders();
    let pivots = this.creeListeDePivots();
    let compteurDePropositions = 0;

    for (let currentCrowderIndex = 0; currentCrowderIndex < crowders.length; currentCrowderIndex++) {
      this.trace("\n");
      this.trace(crowders[currentCrowderIndex] + ":");

      let nombreDesPivotsPourCeCrowder = currentCrowderIndex < this.nombreDePropostitionsRestantes ? this.nombreDePropostitionsParCrowder + 1 : this.nombreDePropostitionsParCrowder;

      let nombreDePropositionProchainPivot = compteurDePropositions + nombreDesPivotsPourCeCrowder;
      while (compteurDePropositions < nombreDePropositionProchainPivot) {
        this.trace(pivots[compteurDePropositions % pivots.length] + ",");
        compteurDePropositions++;
      }
    }
  }

  private dispatcherNotations() {
   
    let crowders = this.creeListeDeCrowders();
    let propositions = this.creeListeDePropositions();
    let compteurDeNotations = 0;

    for (let currentCrowderIndex = 0; currentCrowderIndex < crowders.length; currentCrowderIndex++) {
      this.trace("\n");
      this.trace(crowders[currentCrowderIndex] + ":");
      let nombreDeNotationPourCeCrowder = currentCrowderIndex < this.nombreDeNotationRestantes ? this.nombreDeNotationParCrowder + 1 : this.nombreDeNotationParCrowder;
      let nombreDeNotationProchainPivot = compteurDeNotations + nombreDeNotationPourCeCrowder;

      while (compteurDeNotations < nombreDeNotationProchainPivot) {
        this.trace( propositions[compteurDeNotations % propositions.length] + ",");
        compteurDeNotations++;
      }
    }
  }

  trace(data: string): void {
    this.resultat += data;
  }

  private creeListeDeCrowders(): string[] {
    let result = [];
    for (let i = 0; i < this.nombreDeCrowders; result.push("C" + i++)) {}
    return result;
  }

  private creeListeDePivots(): string[] {
    let result = [];
    for (let i = 0; i < this.nombreDePivots; result.push("P" + i++)) {}
    return result;
  }

  private creeListeDePropositions(): string[] {
    let result = [];
    for (let p = 0; p < this.nombreDePivots; p++) {
      result.push("P" + p);

      for (let pr = 0; pr < this.nombreDePropositionsParPivots; pr++) {
        result.push("P" + p + "PR" + pr);
      }
    }
    return result;
  }
}
