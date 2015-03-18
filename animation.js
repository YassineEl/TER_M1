
function Animation(t,m){

	this.tab=t;
	this.mot=m;


	this.animer=function(i){


		

		var u=this.tab;
		var u1=this;
		if(i<this.tab.length){

				u[i].setColor("yellow");
				setTimeout(function(){ 

						console.log(i);
						 u[i].setColor("blue");
						u1.animer(i+1);



				}, 3000);

		}
		

	};


}
