/*

l'objectid est de stocker les etats dans une matrice car ceci pourra nous faciliter le travail
donc ca va etre des etats qui dessinent le contour d'un rectangle

*/
function Matrice(){

this.matrice=null;


this.creerMatrice=function(nb){
var mat=[];

var hauteure=Math.floor((nb-6)/2)+2+(nb-6)%2;;


for(var i=0;i<hauteure;i++){
	mat[i]=[];
	for(var j=0;j<3;j++)
		mat[i][j]=false;
	}

	
if(nb<=4){

	mat[0][0]=true;
	mat[0][2]=true;
	mat[1][0]=true;
	mat[1][2]=true;

}else{

	
	// mettre a vrai la prepiere et la derniere ligne
	
	for(i=0;i<3;i++){
		mat[0][i]=true;
		mat[hauteure-1][i]=true;
	
	}

	// mettre a vrai la premiere et la derniere colonne
	
	for(var i=1;i<hauteure-1;i++){
	
		mat[i][0]=true;
		mat[i][2]=true;
	
	}
	

}	
	
	
	this.matrice=mat;
};



this.ajouter=function(e){


	for(var i=0;i<this.matrice.length;i++){
	
		for(var j=0;j<3;j++){
			if(this.matrice[i][j]==true){
				this.matrice[i][j]=e;
				return;
				
				}

		}

	}


};

this.placer=function(e){

// permet de placer les etats dans la matrice

for(var i=0;i<e.length;i++){
	
	

	this.ajouter(e[i]);

}


this.falserCasesLibres();


};

this.falserCasesLibres=function(){

	for(var i=0;i<this.matrice.length;i++){
	
		for(var j=0;j<3;j++){
			
		
			if(this.matrice[i][j]==true){
				this.matrice[i][j]=false;
		
				
			}
		}
	
	}

};





this.dessiner=function(){

for(var i=0;i<this.matrice.length;i++){

	for(var j=0;j<3;j++){

		if(this.matrice[i][j]!=false){
		this.matrice[i][j].setX(i);
		this.matrice[i][j].setY(j);
		this.matrice[i][j].dessiner();

		}


	}
}


};


this.getMatrice=function(){

	return this.matrice;

	};


 this.verifLigne=function(l,a,b){
 	// cette methode retourne vrai s'il existe un etat entre les deux etats

 	
 	var aux;
 	if(a>b){

 		aux=a;
 		a=b;
 		b=aux;

 	}

 	for (var i=a+1;i<b;i++)
 			if(this.matrice[i][l]!=false){
 				
 				return false;
 				
				}
 				return true;


 };


 this.verifColonne=function(c,a,b){


 	
 	var aux;
 	if(a>b){

 		aux=a;
 		a=b;
 		b=aux;

 	}

 	for (var i=a+1;i<b;i++)
 			if(this.matrice[c][i]!=false)
 				return false;
 				return true;



 };



}



