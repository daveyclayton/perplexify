<?php
preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT'], $matches);

if (count($matches)>1){
  //Then we're using IE
  $version = $matches[1];

  switch(true){
    case ($version<=8):
      //IE 8 or under!
      header('Location:browsers.html');
      break;

    case ($version==9):
      //IE9!
      break;

    default:
      //You get the idea
  }
}
?>

<!doctype html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Perplexify is a free online tool for setting crosswords.</title>
  <meta name="description" content="">

  <meta name="viewport" content="width=device-width">
  
  <meta name="description" content="Perplexify lets you design beautiful, symmetrical crossword grids, analyse them and populate them with perplexing parlance">
  <meta name="keywords" content="crosswords, more crosswords, cryptic crosswords, DIY, does anything use meta-keywords nowadays anyway?">
  
  <link href='http://fonts.googleapis.com/css?family=Niconne|Merienda+One|Damion|Unna|Felipa' rel='stylesheet' type='text/css'>
  
  <link rel="stylesheet" href="css/inputs.css">
  <link rel="stylesheet" href="css/styles.css">

</head>
<body onresize="renderPage();" onload="renderPage();">
<!--SHIM -->
<div>
 <!-- WRAP ALL -->
 <div id="wrapall">
 	<div id="tag"> </div>
 	
 	
	<!-- MAIN -->
 	<div id="main">
 
 
	<div id="header"><h1>Perplexify</h1></div>
 
	<div style="clear:both;"> </div>


  	<!-- BUILD FORM -->
  	<div id="ipform">
  		<form id="specForm">
  		<fieldset>
       <legend>Build a new grid: </legend>
        <p> <label>Grid size: </label> 
  		<input style="width:50px;" id="sizeText" type="text" value="15"/> 
  		</p>
       <p>
          <label>Symmetry: </label>           
          <input type = "radio"
                 name = "symmRadio"
                 id = "symm180"
                 value = "180"
                 checked = "checked" />
          <label for = "symm180">180&deg;</label> 
          <input type = "radio"
                 name = "symmRadio"
                 id = "symm90"
                 value = "90" />
          <label for = "symm90">90&deg;</label>
          </p>
          <p>
           <label>Autoblock: </label>           
          <input type = "radio"
                 name = "blockRadio"
                 id = "ablock0"
                 value = "0"
                 checked = "checked" />
          <label for = "ablock0">None</label> 
          <input type = "radio"
                 name = "blockRadio"
                 id = "ablock1"
                 value = "1" />
          <label for = "ablock1">Odds</label> 
            <input type = "radio"
                 name = "blockRadio"
                 id = "ablock2"
                 value = "2" />
          <label for = "ablock2">Evens</label> 
          
 		</p>
 		<p>
		 <input type = "submit" value="Build" onclick="buildGrid(); renderPage(); return false;">
        </p>       
      </fieldset>     
  		</form>
  	</div>
  	<!-- /BUILD FORM -->
  	
  	<!-- GRID WRAPPER -->
  	<div id="gridsheet">
  	
  	<!-- GRID INTERFACE -->
  	<div id="interfacewrapper">
  	
  	
  	<!-- GRID TABLE ELEMENTS-->
  	<div id="gridtablecontainer">
  	
  	<table id="gridtable"> </table>
  	
  	</div>
  	<!-- /GRID TABLE ELEMENTS-->
  	
  	
  	<!-- GRID FORM ELEMENTS-->
  	
  	<div id="gridform">
  	
  	<form id="processForm">
  	<fieldset>
  	<legend>Options: </legend><div>
  	<input class="formbut" id="startover" type = "submit" value="Start Over" onclick="startOver(); renderPage(); return false;" title="Choose a new grid spec.">
    <input class="formbut" id="addnumbers" type = "submit" value="Add numbers" onclick="addNumbers(); renderPage(); return false;" title="Show the clue numbers and word-length distribution">
    <input class="formbut" id="usegrid" type = "submit" value="Use grid" onclick="useGrid(); renderPage(); return false;" title="Start adding your answers">
    <input class="formbut" id="releasegrid" style="display:none; width:120px;" type = "submit" value="Release grid" onclick="theGrid.releaseGrid(); renderPage(); return false;" title="Edit the grid layout">
       </div><ul class="instr" id="instr1"><li>Click on the squares to block/unblock.</li><li>Choose "add numbers" to show clue numbers word-length distributions.</li><li>Choose "use grid" to type your answers into the grid.</li></ul>
       <ul class="instr" id="instr2"><li>Click on a square to type in a letter.</li><li>Choose "start over" to build a new grid</li><li>Choose "release grid" to edit your current grid layout</li></ul>
       
       
       </fieldset>
  	</form>
  	
  	</div>
  	
  	<!-- /GRID FORM ELEMENTS-->
  	
  	<div style="clear:both;"> </div>
  		
  	</div>
  	<!-- /GRID INTERFACE -->
  	
  	</div>	
	<!-- /GRID WRAPPER -->
	
	
	
<!--clues lists-->
<div id="metalist">
<div class="rule"> </div>
  <div id="cluelist">
  
  <div id="cla">
  	<h2>Across</h2>
  	<ul id="acrosslist">
  	</ul>
  	</div>
  	
  	<div id="cld">
  	<h2>Down</h2>
  	<ul id="downlist">
  	</ul>
  	</div>
  	
  	<div id="cllen">
  	<h2>Distribution</h2>
  	<div id="cllistwrapper">
  	<ol id="distlist">
  	</ol>
  	</div>
  	
  	</div>
  	
  	</div>	
  	</div>
<!--/clues lists-->

  	<div style="clear:both;"> </div>
  	
</div>
<!-- /MAIN -->


<div id="footer">
<h4>What's all this malarky then?</h4>
<div id="footercontent">
<div id="footerleft">
<p>Well, since you ask... I was looking for a simple tool to create and fill crossword grids but couldn't find one, so I made my own. It's a bit shonky, so please be gentle.</p>
</div>
<div id="footerright">
<p>If you'd like to share your comments or suggestions, tweet me up <a href="http://www.twitter.com/daveyclayton">@daveyclayton</a></p>
</div>
<div style="clear:both;"></div>
</div>
</div>
</div>
<!-- /WRAP ALL -->
</div>
<!--/SHIM -->

  <script src="xw.js"></script>
  
</body>
</html>