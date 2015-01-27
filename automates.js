unction Etat(int n){

this.num=n;
this.relations=[];


this.ajouterRelation=function(k){

this.relations.push(k);

};


this.annulerRelation=function(k){

// this.relations.drop(k);

};


this.getRelations=function(){

return this.relations;

};


this.exist=function(){



}


}


function Automates(){


var etats=[];


this.ajouterEtat=function(e){

this.etats.push(e);

};


this.supprimerEtat=function(e){

//this.etats.enlever(e);

};




}
