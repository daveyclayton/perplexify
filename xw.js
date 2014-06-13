function startOver(){
clearClues();
theGrid = new Object();
document.getElementById('gridtable').innerHTML = '';
document.getElementById('gridform').style.display = "none";
document.getElementById('ipform').style.display = "inline-block";


document.getElementById('addnumbers').style.display = btype;
document.getElementById('usegrid').style.display = btype;
document.getElementById('releasegrid').style.display = 'none';
document.getElementById('instr1').style.display = 'block';
document.getElementById('instr2').style.display = 'none';

document.getElementById('interfacewrapper').style.display = "none";
document.getElementById('gridtablecontainer').style.display = "none";
document.getElementById('cluelist').style.display = "none";
document.getElementById('interfacewrapper').style.display = "none";

 return false;
 
}

var theGrid = new Object();
var caught = false;
var btype = 'block';

function renderPage(){
if(window.innerHeight<=480){
//adjust display for buttons
btype = 'inline-block';

//alert("small page!" + window.innerHeight);

}else{
btype = 'block';

//alert("big page!" + window.innerHeight);

};

//turn it off
var divh = document.getElementById('footer').clientHeight;
var pageh = document.getElementById('main').clientHeight;

//if the doc height is less than the window size, stick the footer at abs bottom, otherwise make it relative
if(pageh+divh <= window.innerHeight){

document.getElementById('footer').style.position = 'absolute';
document.getElementById('footer').style.bottom = '0';
}else{
document.getElementById('footer').style.position = 'relative';
};


}

function buildGrid(){

if (isNaN(document.forms['specForm'].elements['sizeText'].value || Number(document.forms['specForm'].elements['sizeText'].value)*1>40 || Number(document.forms['specForm'].elements['sizeText'].value)*1 < 3)) {
alert('Um, your grid size has to be a number, \nideally between 3 and 40');
return false;
}else{


var ipsize = document.forms['specForm'].elements['sizeText'].value;

if(document.forms['specForm'].elements['symm180'].checked){
var ipsymm = 1;
}else{
var ipsymm = 2;
}

var ipblock = 0;

if(document.forms['specForm'].elements['ablock1'].checked){
ipblock = 1;
}else if(document.forms['specForm'].elements['ablock2'].checked){
ipblock = 2;
}

//alert(ipblock)

theGrid = new xw(ipsize, ipsymm, ipblock);


document.getElementById('gridtablecontainer').style.display = "inline-block";
document.getElementById('gridform').style.display = "inline-block";
document.getElementById('ipform').style.display = "none";


document.getElementById('instr1').style.display = 'block';
document.getElementById('instr2').style.display = 'none';

 return false;
};




}

function xw(size, symm, blk){
this.size = size;
this.symm = symm;
this.clueListDown = [];
this.clueListAcross = [];
this.distList = [];
this.isNumbered = false;
this.autoBlock = blk;
this.drawMe();

}


xw.prototype.drawMe = function(){

//loop thru width+height to make the content string of table cells

var cellString = '';

for(var n=0;n<this.size;n++){
cellString = cellString + '<tr>';
for(var j=0;j<this.size;j++){

var colstr = '#FFFFFF';

if(this.autoBlock == 1){
//block the human oddth of every odd row,starting from 1,1 (0/0)
//if j == even and n == even

if (j%2 == 0 && n%2 == 0){
colstr = '#000000';
}


}else if(this.autoBlock == 2){
//block the human eventh of every even row,starting from 1,1 (0/0)
//if j == odd and n == odd

if (j%2 != 0 && n%2 != 0){
colstr = '#000000';
}



}


cellString = cellString + '<td style="background-color:'+colstr+';" id="blk'+j+'_'+n+'"><div/>';
cellString = cellString + '</td>';
};

cellString = cellString + '</tr>';
};

document.getElementById('gridtable').innerHTML = cellString;

var minDim  = (this.size * 26) + 20;

document.getElementById('gridtablecontainer').style.minWidth = minDim+'px';
document.getElementById('gridtablecontainer').style.minHeight = minDim+'px';

for(var n=0;n<this.size;n++){
for(var j=0;j<this.size;j++){
document.getElementById('blk'+j+'_'+n).onclick=function(){setSquare(this.id);};

};
};


document.getElementById('interfacewrapper').style.display = "inline-block";




}



function setSquare(id){
if(theGrid.isNumbered){
stripNumbers();
};

var x = (String(id).substr(3,(id.len))).split("_");

colourUp(id);

if(x[0]==x[1] && x[0]==((theGrid.size-1)/2)){

//do nothing - this is the centrepoint

}else{
//go for your life




//find & color the diagonal counterpoint
var altid = 'blk'+((theGrid.size-1)-x[0])+'_'+((theGrid.size-1)-x[1]);
colourUp(altid);

if(theGrid.symm==1){


}else{

//find and colour 90 & 270 degree counterpoints
var altid = 'blk'+(x[1])+'_'+((theGrid.size-1)-x[0]);

colourUp(altid);
var altid = 'blk'+((theGrid.size-1)-x[1])+'_'+(x[0]);

colourUp(altid);




};
};



}


function colourUp(id){
//toggleMe(id);
var cssnip = document.getElementById(id).style



if(cssnip.backgroundColor=='rgb(0, 0, 0)'){

cssnip.backgroundColor='#FFFFFF';
}else{
cssnip.backgroundColor='#000000'

};
}

function toggleMe(id){


if(this.myState){
this.myState = 0;
}else{
this.myState = 1;
};


}



function ordinate(){
var errorlist = [];
for(var n=0;n<theGrid.size;n++){
for(var j=0;j<theGrid.size;j++){
var el = document.getElementById('blk'+j+'_'+n);

///////
if(el.style.backgroundColor=='rgb(255, 255, 255)'){
//if it's white, check surroundings...
//top


var t = document.getElementById('blk'+j+'_'+(n-1));
var tl = document.getElementById('blk'+(j-1)+'_'+(n-1));
var tr = document.getElementById('blk'+(j+1)+'_'+(n-1));

var l = document.getElementById('blk'+(j-1)+'_'+(n));
var r = document.getElementById('blk'+(j+1)+'_'+(n));

var b = document.getElementById('blk'+j+'_'+(n+1));
var bl = document.getElementById('blk'+(j-1)+'_'+(n+1));
var br = document.getElementById('blk'+(j+1)+'_'+(n+1));

if(checkSiblings(t, l, l, tl, t, el)>0){
errorlist.push(1);
};

if(checkSiblings(t, r, t, tr, r, el)>0){
errorlist.push(1);
};

if(checkSiblings(b, l, l, bl, b, el)>0){
errorlist.push(1);
};

if(checkSiblings(b, r, r, br, b, el)>0){
errorlist.push(1);
};

};
/////


};
};

if(errorlist.length > 0){
return(false);

}else{
return(true);
};


}

function checkSiblings(ar1, ar2, ar3, ar4, ar5, el){

if(ar1 && ar2 && ar3.style.backgroundColor == 'rgb(255, 255, 255)' && ar4.style.backgroundColor == 'rgb(255, 255, 255)' && ar5.style.backgroundColor == 'rgb(255, 255, 255)'){
//problem
//el.style.backgroundColor = '#FF0000';
return('1');
};

}

xw.prototype.releaseGrid = function(){
clearClues();
stripNumbers();
document.getElementById('addnumbers').style.display = btype;
document.getElementById('usegrid').style.display = btype;
document.getElementById('releasegrid').style.display = 'none';


document.getElementById('instr1').style.display = 'block';
document.getElementById('instr2').style.display = 'none';


for(var n=0;n<this.size;n++){
for(var j=0;j<this.size;j++){
document.getElementById('blk'+j+'_'+n).onclick=function(){setSquare(this.id);};
document.getElementById('blk'+j+'_'+n).innerHTML = '<div>';

};
};


 return false;
 
 
 
}

function useGrid(){
var check = false;

if(ordinate()){
	check=true;
}else{
	if(confirm("Your grid has multiple adjacent spaces.\n Use it anyway?")){
	check=true;
	};
}

if(check==true){

numerate();
writeClues();
document.getElementById('addnumbers').style.display = 'none';
document.getElementById('usegrid').style.display = 'none';
document.getElementById('releasegrid').style.display = btype;

document.getElementById('instr2').style.display = 'block';
document.getElementById('instr1').style.display = 'none';

for(var n=0;n<theGrid.size;n++){
for(var j=0;j<theGrid.size;j++){
var el = document.getElementById('blk'+j+'_'+n);

el.onclick = null;
if(el.style.backgroundColor=='rgb(255, 255, 255)'){
el.childNodes[0].innerHTML = el.childNodes[0].innerHTML + '<input id="ip'+j+'_'+n+'" type="text" maxlength="1"/>';
};

};
};
};

 return false;
 
 
}

function addNumbers(){
var check = false;

if(ordinate()){
	check=true;
}else{
	if(confirm("Your grid has multiple adjacent spaces.\n Number it anyway?")){
	check=true;
	};
}

if(check==true){

theGrid.isNumbered = true;
numerate();
writeClues();
};

 return false;
}

function writeClues(){
//create the clue lists...

var ipstr = '';
for(var n=0;n<theGrid.clueListAcross.length;n++){

	var a = theGrid.clueListAcross[n][0];
	var b = theGrid.clueListAcross[n][1];
	
	ipstr = ipstr + '<li>'+a+': <i>('+b+')</i></li>';
	
};
document.getElementById('acrosslist').innerHTML = ipstr;

var ipstr = '';
for(var n=0;n<theGrid.clueListDown.length;n++){
	var a = theGrid.clueListDown[n][0];
	var b = theGrid.clueListDown[n][1];
	
	ipstr = ipstr + '<li>'+a+': <i>('+b+')</i></li>';
	
};


document.getElementById('downlist').innerHTML = ipstr;

/// and write the distribution table

//write distribution list

var ipstr = '';
for(var n=0;n<theGrid.size;n++){
theGrid.distList.push([n+1,0]);
};


for(var n=0;n<theGrid.clueListAcross.length;n++){

//add one for each length val to the second item of distList n[1]

theGrid.distList[Number(theGrid.clueListAcross[n][1])-1][1]++;

};

for(var n=0;n<theGrid.clueListDown.length;n++){

theGrid.distList[Number(theGrid.clueListDown[n][1])-1][1]++;

};


	
	var maxval = theGrid.distList[0][1];
	
	for(var n=1;n<theGrid.distList.length;n++){
	if(theGrid.distList[n][1] > maxval){
	 maxval = theGrid.distList[n][1];
	
	};
	};

	
	
	//var multor = ;


for(var n=0;n<theGrid.distList.length;n++){
	var a = theGrid.distList[n][0];
	var b = theGrid.distList[n][1];
	
	//ipstr = ipstr + '<li><strong>'+a+'</strong> letter words - '+b+'</li>';
	
	//snip off the trailing divider...
	var brdOR=''
	
	if(n==theGrid.distList.length-1){
	var brdOR = ' style="border-bottom:0;"';
	}
	
	var unit = 100 / maxval;
	
	var wid = ((b*unit)+1);
	
	ipstr = ipstr + '<li'+brdOR+'><span class="clbar" style="width:'+wid+'px;"></span><span class="clnumeral">'+b+'</span></li>';
}


document.getElementById('distlist').innerHTML = ipstr;

document.getElementById('cluelist').style.display = "inline-block";

};

function stripNumbers(){
theGrid.isNumbered = false;

document.getElementById('cluelist').style.display = "none";

for(var n=0;n<theGrid.size;n++){
for(var j=0;j<theGrid.size;j++){
var el = document.getElementById('blk'+j+'_'+n);

if(el.style.backgroundColor=='rgb(255, 255, 255)'){
if(el.childNodes[0].hasChildNodes()){
var x = el.childNodes[0].childNodes[0]
el.childNodes[0].removeChild(x);
};
};

};
};

}

function clearClues(){
	document.getElementById('cluelist').style.display = "none";
}

function numerate(){
theGrid.clueListAcross = [];
theGrid.clueListDown = [];
theGrid.distList = [];
/////
var number = 1;
for(var n=0;n<theGrid.size;n++){
for(var j=0;j<theGrid.size;j++){
var el = document.getElementById('blk'+j+'_'+n);

///////
if(el.style.backgroundColor=='rgb(255, 255, 255)'){


var t = document.getElementById('blk'+j+'_'+(n-1));
var tl = document.getElementById('blk'+(j-1)+'_'+(n-1));
var tr = document.getElementById('blk'+(j+1)+'_'+(n-1));

var l = document.getElementById('blk'+(j-1)+'_'+(n));
var r = document.getElementById('blk'+(j+1)+'_'+(n));

var b = document.getElementById('blk'+j+'_'+(n+1));
var bl = document.getElementById('blk'+(j-1)+'_'+(n+1));
var br = document.getElementById('blk'+(j+1)+'_'+(n+1));

//if it has a right-hand and no left hand, or lower and no upper, give it a number
hasnumber=false;

if(!l){
if(r.style.backgroundColor == 'rgb(255, 255, 255)'){
//add number (across)
hasnumber=true;

//loop thru and check length, add to cluelist across//////////////
var i=j+1;
var cllen = 1;

while (document.getElementById('blk'+(i)+'_'+(n)) && document.getElementById('blk'+(i)+'_'+(n)).style.backgroundColor == 'rgb(255, 255, 255)')
  {
  cllen++;
  i++;
  };

var clueSet = [number,cllen];
theGrid.clueListAcross.push(clueSet);
////////

};
}else{
if(r){
if(l.style.backgroundColor != 'rgb(255, 255, 255)' && r.style.backgroundColor == 'rgb(255, 255, 255)'){
//add number (across)
hasnumber=true;
//loop thru and check length, add to cluelist across//////////////
var i=j+1;
var cllen = 1;

while (document.getElementById('blk'+(i)+'_'+(n)) && document.getElementById('blk'+(i)+'_'+(n)).style.backgroundColor == 'rgb(255, 255, 255)')
  {
  cllen++;
  i++;
  };

var clueSet = [number,cllen];
theGrid.clueListAcross.push(clueSet);
////////
};
};
};

if(!t){
if(b.style.backgroundColor == 'rgb(255, 255, 255)'){
//add number (down)
hasnumber=true;
//loop thru and check length, add to cluelist across//////////////
var i=n+1;
var cllen = 1;

while (document.getElementById('blk'+(j)+'_'+(i)) && document.getElementById('blk'+(j)+'_'+(i)).style.backgroundColor == 'rgb(255, 255, 255)')
  {
  cllen++;
  i++;
  };

var clueSet = [number,cllen];
theGrid.clueListDown.push(clueSet);
////////
};
}else{
if(b){
if(t.style.backgroundColor != 'rgb(255, 255, 255)' && b.style.backgroundColor == 'rgb(255, 255, 255)'){
//add number (down)
hasnumber=true;
//loop thru and check length, add to cluelist across//////////////
var i=n+1;
var cllen = 1;

while (document.getElementById('blk'+(j)+'_'+(i)) && document.getElementById('blk'+(j)+'_'+(i)).style.backgroundColor == 'rgb(255, 255, 255)')
  {
  cllen++;
  i++;
  };

var clueSet = [number,cllen];
theGrid.clueListDown.push(clueSet);
////////
};
};
};

if(hasnumber){
	el.innerHTML='<div class="innards"><span>'+number+'</span></div>';
	number++;
}else{
el.innerHTML='<div class="innards"></div>';
};

};
};
/////



};
/////


}

