function Transition(i,e,f){

	this.de=i;
	this.etiquette=e;
	this.a=f;
	// c'est une instance de la classe automate
	this.automate=null;
	this.path=null;
	this.clicked=false;
	this.qx=null;
	this.qy=null;
	
	this.texte=null;	
	

	this.test=document.createElementNS("http://www.w3.org/2000/svg","path");
    this.test.setAttribute("d","M 20 230  T 90 230");
	this.test.setAttribute("fill","none");
	this.test.setAttribute("stroke","transparent");
	
	
	
	// c'est l'element dans le dom dans lequel 
	// la transition sera dessinée
	this.el=null;

		
		
		
		
		this.getDe=function(){

			return this.de;

			};



this.getEtiquette=function(){

	return this.etiquette;
};




this.getA=function(){

	return this.a;

};




this.addEl=function(e){
	// c'est l'element svg pour pouvoir dessiner dessus
	this.el=e;
};


this.addAutomate=function(aut){

this.automate=aut;

};




this.redessinerTrans=function(){


var xdep=this.automate.getEtat(this.de).getX();
var ydep=this.automate.getEtat(this.de).getY();
var xarr=this.automate.getEtat(this.a).getX();
var yarr=this.automate.getEtat(this.a).getY();


var dist=Math.sqrt(Math.pow((xarr-xdep),2)+Math.pow((yarr-ydep),2));

this.test.setAttribute("d","M "+xdep+" "+ydep+" T "+xarr+" "+yarr);

xdep=this.test.getPointAtLength(40).x;
ydep=this.test.getPointAtLength(40).y;
xarr=this.test.getPointAtLength(dist-55).x;
yarr=this.test.getPointAtLength(dist-55).y;




var d="M "+xdep+" "+ydep+" Q "+this.qx+" "+this.qy+" "+xarr+" "+yarr;
this.path.setAttribute("d",d);
var centre=this.path.getPointAtLength((dist-60)/2);
this.texte.setAttribute("x",centre.x);
this.texte.setAttribute("y",centre.y);


};



this.courber=function(e1,e2,dist){


if(!e1.memeLigne(e2)){
			
			
			// pour savoir si on va courber la transition horizontalement ou verticalement
			
			if(e1.auDessus(e2))
			this.qy-=dist/4;
			else 
			this.qy+=dist/4;


		}else{

			
			
			if(e1.aGauche(e2))
			{
			
			this.qx+=dist/4;
			}
			else
			{

			
			
			this.qx-=dist/4;
			}
		}

};


this.redessiner=function(){



var xdep=this.automate.getEtat(this.de).getX();
var ydep=this.automate.getEtat(this.de).getY();
var xarr=this.automate.getEtat(this.a).getX();
var yarr=this.automate.getEtat(this.a).getY();


var dist=Math.sqrt(Math.pow((xarr-xdep),2)+Math.pow((yarr-ydep),2));

this.test.setAttribute("d","M "+xdep+" "+ydep+" T "+xarr+" "+yarr);

xdep=this.test.getPointAtLength(40).x;
ydep=this.test.getPointAtLength(40).y;
xarr=this.test.getPointAtLength(dist-55).x;
yarr=this.test.getPointAtLength(dist-55).y;








if(this.de==this.a){


	this.qx=xdep-200;
	this.qy=ydep;

}else{

this.qx=(xdep+xarr)/2;
this.qy=(ydep+yarr)/2;

}




var e1=this.automate.getEtat(this.de);
var e2=this.automate.getEtat(this.a)



if(e1.existeTransation(e2)){

	this.courber(e1,e2,dist);
}
else{
if(e1.surMemeAxe(e2)==false)
this.path.setAttribute("stroke","red");

else{ 

	if(e1.lienDirect(e2))

	this.path.setAttribute("stroke","red");
	
	else{

		this.path.setAttribute("stroke","blue");	


		this.courber(e1,e2,dist);

	}

}



}



var d="M "+xdep+" "+ydep+" Q "+this.qx+" "+this.qy+" "+xarr+" "+yarr;

this.path.setAttribute("d",d);

var xetiquette,yetiquette;
if(this.de==this.a){

	xetiquette=this.qx+70;
	yetiquette=this.qy;

	}else{
var centre=this.path.getPointAtLength((dist-60)/2);
 xetiquette=centre.x;
 yetiquette=centre.y;

}
this.texte.setAttribute("x",xetiquette);
this.texte.setAttribute("y",yetiquette);
// redessiner les path entrants



};

this.dessiner=function(){

var id=""+this.de+"-"+this.a;
this.path=document.createElementNS("http://www.w3.org/2000/svg","path");
this.path.setAttribute("stroke-width","5");
this.path.setAttribute("fill","none");
this.path.setAttribute("marker-end","url(#Triangle)");
this.path.setAttribute("stroke","blue");
this.path.setAttribute("id",id);
this.el.appendChild(this.path);






/*

en choisissant la methode du text path 
l'inconvénient c'est que les lettre (etiquettes) si pivotent
avec la ligne de la transation ce qui est indesirable vue qu'il rend l'etiquette
illisible du coup j'ai decidé de representer ceci avec du texte simple

var text = document.createElementNS(svgNS,"text");
	

this.texte=text;
text.setAttribute("x","100");

text.setAttribute("y","100");
text.setAttribute("fill","black");

var textPath = document.createElementNS(svgNS,"textPath");
textPath.setAttributeNS(xlinkNS, "xlink:href", "#"+id);
textPath.setAttribute("class","id");

var textNode = document.createTextNode(this.etiquette);
    		
	
	
	textPath.appendChild(textNode);
	textPath.setAttribute("rotate","90");
	alert(textPath.getAttribute("rotate");
text.appendChild(textPath);
this.el.appendChild(text);
*/




var svgNS = "http://www.w3.org/2000/svg";
var xlinkNS = "http://www.w3.org/1999/xlink";
var text = document.createElementNS(svgNS,"text");
this.texte=text;
text.setAttribute("x","-1");
text.setAttribute("class","id");
text.setAttribute("y","-1");
text.setAttribute("fill","black");
var textNode = document.createTextNode(this.etiquette);
text.appendChild(textNode);
this.el.appendChild(text);






var u=this;

$(this.path).on("mousedown",function(){
	
		
		u.down();
	
	});
	
	
	$(document).on("mouseup",function(){
	
	u.up();
	
	});
	
	
	$(this.el).on("mousemove",function(e){
	
	if(u.isClicked()){
		u.setQ(e.pageX,e.pageY);
		u.redessinerTrans();
		}
	});




};


this.setQ=function(x,y){

	this.qx=x;
	this.qy=y;
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



}

