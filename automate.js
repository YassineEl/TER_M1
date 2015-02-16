
function Automate(nb,e,f,t,s){


this.n=nb;
this.etats=[];
this.finaux=f;
this.etiquettes=e;
this.svg=s;
this.trans=t;

this.offsetX=0;
this.offsetY=0;


// c'est la matrice qui va contenir tous mes etats
this.m=new Matrice();





// n c'est le nombre d'etats
// e c'est l'ensemble d'etiquettes
// f c'est l'ensemble des etats finaux
// t c'est l'ensemble des transitions
this.initialiser=function(){



var element =this.svg;

  
 
 
 if (element.offsetParent !== undefined) {
		do {
			this.offsetX += element.offsetLeft;
			this.offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}
  
 



var defs=document.getElementById("definition");



    	










this.m.creerMatrice(this.n);



var i;
var u=this;
for(i=0;i<this.n;i++){
	
	var e=new Etat(i,u);
	    e.addEl(this.svg);	
	this.etats.push(e);

	
	}
	
for( i=0;i<t.length;i++)
			{
	
	 t[i].addAutomate(u);
	 t[i].addEl(this.svg);
	 this.etats[t[i].getDe()].ajouterTransition(t[i]);
	
	
	



	}
	
	// placer les etats dans la matrice
	this.m.placer(this.etats);
	this.dessinerTrans();
	this.m.dessiner();
	this.redessinerTrans();    


/*
on a commencer par dessiner les transition qui au debut sont des points superposés
puis on a dessiner les etats et puis on a redessiné les transitions et ceci c'est 
parce que dans svg il n'y a pas l'attribut z-index pour pouvoir dire que les etats doivent cacher
les traits des transitions donc a joué sur le fait qu'en dessinant les transitions au debut puis les etats
donc ces derniers vons cacher les trait pour et donner une illusion que le trait commence a partir du bord
du cercle et non a partir du centre


*/	
};



this.getEtat=function(i){

return this.etats[i];
};


this.ajouterEtat=function(e){

this.etats.push(e);

};


this.supprimerEtat=function(e){

//this.etats.enlever(e);

};


this.redessinerTrans=function(){

	for(var i=0;i<this.trans.length;i++)
		this.trans[i].redessiner();

};


this.redessinerTransitions=function(k){
	
	for(var i=0;i<this.trans.length;i++)
		if(this.trans[i].getA()==k)
			this.trans[i].redessiner();

};


this.dessinerTrans=function(){

for(var i=0;i<this.trans.length;i++)
		this.trans[i].dessiner();
};


this.getMatrice=function(){

	return this.m;

};


this.getOffsetX=function(){

	return this.offsetX;
};

this.getOffsetY=function(){

	return this.offsetY;
};


this.telecharger=function(){

					
				var texte=$('#documentSvg').html();

				
				var pom = document.createElement("a");
  						


  				 var textNode = document.createTextNode("telecharger le fichier SVG");
  					 
  					 pom.setAttribute('href', 'data:svg/plain;charset=utf-8,' + encodeURIComponent(texte));
  					 pom.setAttribute('download', "automate.svg");
					pom.click();


};




}





