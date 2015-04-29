
function Etat(n,aut){

this.num=n;
this.trans=[];
this.cercle=null;
this.x=0;
this.y=0;
this.ligne=0;
this.colonne=0;
this.clicked=false;
this.automate=aut;
this.g=null;
this.texte=null;
this.ini=false;
this.fin=false;



// c'est l'element du dom svg dans lequel l'etat sera dessinée
this.el=null;


this.estInitial=function(){

	return this.ini;
};

this.estFinal=function(){
	return this.fin;

};


this.isInitial=function(){

	this.ini=true;
};

this.isFinal=function(){

	this.fin=true;
};


this.ajouterTransition=function(k){
	
	
	 this.trans.push(k);
	 

};


this.getTrans=function(){


return this.trans;
};

this.getNum=function(){

	return this.num;
};

this.getAutomate=function(){

return this.automate;
};

// et c'est l'element dans le dom des transitions

this.addEl=function(e){

	
	this.el=e;
	

};


this.tester=function(){
	
	
	for(var i=0;i<this.trans.length;i++)
		console.log(this.trans[i].getDe()+"->"+this.trans[i].getEtiquette()+"->"+this.trans[i].getA());
};




this.dessiner=function(){
	
	//for(var i=0;i<this.trans.length;i++)
	//	this.trans[i].dessiner();
		
		
		this.cercle=document.createElementNS("http://www.w3.org/2000/svg","circle");
		this.cercle.setAttribute("stroke-width","3");
		this.cercle.setAttribute("cx",this.x);
		this.cercle.setAttribute("cy",this.y);
		this.cercle.setAttribute("fill","red");
		this.cercle.setAttribute("stroke","black");
		this.cercle.setAttribute("r","40");
	



		this.g=document.createElementNS("http://www.w3.org/2000/svg","g");
		this.g.appendChild(this.cercle);

		this.texte=document.createElementNS("http://www.w3.org/2000/svg","text");
	var textNode = document.createTextNode(this.num);
		this.texte.setAttribute("x",this.x);
		this.texte.setAttribute("y",this.y+20);
		this.texte.setAttribute("class","id");


		this.texte.setAttribute("font-size","50");
		this.texte.appendChild(textNode);
		this.g.appendChild(this.texte);
		this.el.appendChild(this.g);
	var u=this;
	
	$(this.g).on("mousedown",function(){
	
		u.down();
	
	});
	
	
	$(document).on("mouseup",function(){
	
	u.up();
	
	});
	
	$(this.el).on("mousemove",function(e){
	
	if(u.isClicked()){
		u.setCord(e.pageX-u.getAutomate().getOffsetX(),e.pageY-u.getAutomate().getOffsetY());
		
		// ceci permet de redessiner toutes les transitions
		//u.getAutomate().redessinerTrans();;
		
		// cette methode permet de redessiner seulement les transitions en rapport avec 
		// les etats sortantes ou entrantes
		u.redessinerTrans();
		u.getAutomate().redessinerTransitions(u.getNum());
		}
	});

};

this.redessinerTrans=function(){


for(var i=0;i<this.trans.length;i++){

	this.trans[i].redessiner();
}

};


this.down=function(){

	this.clicked=true;
};

this.up=function(){

this.clicked=false;

};

this.isClicked=function(){

	return this.clicked;
};

this.setX=function(i){

this.ligne=i;
this.x=i*300+150;

};

this.setY=function(c){

this.colonne=c;
this.y=c*200+100;
};

this.setCord=function(xcor,ycor){

	this.x=xcor;
	this.y=ycor;
	this.cercle.setAttribute("cx",this.x);
	this.cercle.setAttribute("cy",this.y);
	this.texte.setAttribute("x",this.x);
	this.texte.setAttribute("y",this.y+20);
};


this.getX=function(){

return this.x;
};


this.getY=function(){

return this.y;

};


this.getLigne=function(){

return this.ligne;
};

this.getColonne=function(){

	return this.colonne;

};


this.surMemeAxe=function(e){

// return vrai si l'etat e et l'etat courant sont sur le meme axe

return ((this.ligne==e.getLigne())||(this.colonne==e.getColonne()))  ;


};


this.lienDirect=function(e){

// si les deux etats ne sont pas sur le meme axe donc pas de problem

if(this.surMemeAxe(e)==false) return true;

// si c'est sur le meme axe il faut pas qu'il y ait un etat qui gene la transition sinon il faut courber la transition


if(this.memeLigne(e)){

// s'ils se trouve sur la meme colonne


	return this.getAutomate().getMatrice().verifColonne(this.ligne,this.colonne,e.getColonne());

}else{

// s'ils se trouvent sur la meme ligne

  return  this.getAutomate().getMatrice().verifLigne(this.colonne,this.ligne,e.getLigne());

}



};


this.memeLigne=function(e){
	// renvoie vrai si les deux transation ont le meme indice ligne
	return (this.ligne==e.getLigne());
}

this.auDessus=function(e){
// verifie si l'etat courant se situe au dessus de l'etat a


return (this.ligne<e.getLigne());

};

this.aGauche=function(e){
// verifie si l'etat courant se situe sur la gauche de l'etat a


return (this.colonne<e.getColonne());

};


this.existeTransation=function(e){


var t=e.getTrans();
	
for(var i=0;i<t.length;i++){

	
	if(t[i].getA()==this.num) 
	{
		
		return true;
	}



}


return false;

};


this.reconnaitre=function(mot,tab,ind){






if(ind==mot.length){

	
	if(this.estFinal()){

		
		alert("ce mot est reconnu");
		this.getAutomate().animation(tab,mot);


	}else{


		// le mot est bon mais il finit pas à l'etat final
		alert("le mot est bon mais il finit pas à l'etat final");

	}



}else{

	
	
	
	for(i=0;i<this.trans.length;i++){


		if(this.trans[i].getEtiquette()==mot.charAt(ind)){
			ind++;
			tab.push(this.trans[i]);
			var etatArrivee=this.trans[i].getA();
				
			this.getAutomate().getEtat(etatArrivee).reconnaitre(mot,tab,ind);
		}



	}



}




};

}



