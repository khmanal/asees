// *********************************** ADOBE PRESENTER SEARCH ENGINE - March 2008-June 2018
// *********************************** J.CH.COUTURES All rights reserved 
// *********************************** jcharles@coutures.org

// *********************************** SEARCH ENGINE

 function searcher(SearchContent,Option1,Option2,Option3) {
	
	// affiche div attente
	var docstyle=0;
	if(SearchContent!="") { 

		SearchContent = SearchContent.toLowerCase();
		//
		DivWriteContent("div_searchresult", "");
		DivDisplay("div_searchresult","block");
		htmlcontent="";
		htmlcontent+="<div class=\"tabledoctitre\"><div style=\"width:700px;\">Recherche : "+SearchContent+"</div></div>";
		DivWriteContentAfter("div_searchresult", htmlcontent);
		
		//
		founddocid = new Array(); 
		foundpageid = new Array(); 
		foundnum=0;
		
		for (i = 1; i <= SDdocnum; i++) {
	
			// search author 
			if (SDdocauthor[i].indexOf(SearchContent,0) >= 0 && Option1==1) {
				//
				founddocid[i]="ok";
				foundnum++; 
				//
				if(docstyle==0) { Showstyle="tableliste2"; docstyle=1; } else { Showstyle="tableliste1"; docstyle=0; }
				SearchShowDocHeader(i,SearchContent,foundnum,Showstyle);

			}

			// search document title 
			if (SDdoctitle2[i].indexOf(SearchContent,0) >= 0 && Option2==1) {
				//
				if(founddocid[SDpagedocid[i]]!="ok") {

					founddocid[i]="ok";
					foundnum++; 
					//
					if(docstyle==0) { Showstyle="tableliste2"; docstyle=1; } else { Showstyle="tableliste1"; docstyle=0; }
					SearchShowDocHeader(i,SearchContent,foundnum,Showstyle);

				}

			}

		}
	
		foundpage=0;
		
		for (i = 1; i <= SDpagenum; i++) {
	
			// search page title 
			// search text content
			if (Option3==1 && (SDpagecontent[i].indexOf(SearchContent,0) >= 0||SDpagetitle2[i].indexOf(SearchContent,0) >= 0)) {
		
				if(founddocid[SDpagedocid[i]]!="ok") {
	
					founddocid[SDpagedocid[i]]="ok";
					foundnum++; 
					//
					if(docstyle==0) { Showstyle="tableliste2"; docstyle=1; } else { Showstyle="tableliste1"; docstyle=0; }
					SearchShowDocHeader(SDpagedocid[i],SearchContent,foundnum,Showstyle);
				}


				foundpageid[i]="ok";
				foundpage++;
				//
				SearchShowDocPage(SDpagedocid[i],i,SearchContent);

			}
		}	 


	} 	// fin de SearchContent non nul

}


 function SearchShowDocHeader(docID,SearchContent,header,Showstyle) {

	//
	htmlcontent="<table width=\"100%\" class=\"Showstyle\"><tr><td>";
	htmlcontent+="<span class=\"titredoc\">"+header+". ";
	htmlcontent+=""+SearchFormatText(SDdoctitle[docID],SearchContent)+"; </span>";
	htmlcontent+=""+SearchFormatText(SDdocauthor[docID],SearchContent)+".</td></tr></table>";
	
	DivAppendDiv("div_searchresult","Doc"+docID,Showstyle,"clear:both;");
	DivWriteContent("Doc"+docID, htmlcontent);

 }
 
 function SearchShowDocPage(docID,pageID,SearchContent) {
	
	numpage=SDpageposition[pageID];
	if(SDpageposition[pageID]<10) { numpage="0"+numpage; }
	if(SDpageposition[pageID]<100) { numpage="0"+numpage; }
	if(SDpageposition[pageID]<1000) { numpage="0"+numpage; }
	if(SDpageposition[pageID]<10000) { numpage="0"+numpage; }
	if(SDpageposition[pageID]<100000) { numpage="0"+numpage; }
	//
	
	var actualdiv = document.getElementById("Doc"+docID);
	var actualdivvalue = actualdiv.getAttribute("class");
	if(actualdivvalue=="tableliste1") { thumbpreview="tablepreview2";} else {thumbpreview="tablepreview1";}
	if(actualdivvalue=="tableliste1") { thumblink="icon_follow.png";} else {thumblink="icon_follow.png";}
	htmlcontent="<table width=\"100%\" class=\""+actualdivvalue+"\"><tr><td class=\""+actualdivvalue+"\">";
	htmlcontent+="<strong>Page "+SDpageposition[pageID]+" : "+SearchFormatText(SDpagetitle2[pageID],SearchContent)+"</strong><br/>\"";
	htmlcontent+="<i>"+SearchFormatText(SDpagecontent[pageID],SearchContent)+"</i>"+"\".";
	
	htmlcontent+="<br/>";
	//htmlcontent+="<a href=\"../../"+SDdocpath[docID]+"viewer.swf?slide="+SDpageposition[pageID]+"\"><img src=\"../../design/nav/"+thumblink+"\" width=\"16\" height=\"16\"  style=\"padding-top:3px;vertical-align:bottom;margin-right:4px;\" border=\"0\" />AFFICHER</a><br/></td>";
	htmlcontent+="<a href=\"../../"+SDdocpath[docID]+"index.htm?slide="+SDpageposition[pageID]+"\"><img src=\"../../design/nav/"+thumblink+"\" width=\"16\" height=\"16\"  style=\"padding-top:3px;vertical-align:bottom;margin-right:4px;\" border=\"0\" />AFFICHER</a><br/></td>";
	
	// htmlcontent+="<a href=\"../../"+SDdocpath[docID]+"viewer.swf?slide="+SDpageposition[pageID]+"\"><strong> >> </strong></a><br/></td>";
	htmlcontent+="<br/></td>";
	
	htmlcontent+="<td class=\""+actualdivvalue+"\"><span class=\""+thumbpreview+"\">";
	//htmlcontent+="<a href=\"../../"+SDdocpath[docID]+"viewer.swf?slide="+SDpageposition[pageID]+"\">";
	//htmlcontent+="<img src=\"../../"+SDdocpath[docID]+"/data/thumb/thumb_slide_"+numpage+".jpg\" width=\"100\" height=\"80\"></img>";
	htmlcontent+="</a>";
	htmlcontent+="</span></td></tr></table>";
	
	DivWriteContentAfter("Doc"+docID, htmlcontent);
	
 }


// *********************************** TOOL BOX 

function SearchFormatText(str,SearchContent)
{
    str = RemoveExtraSpace(str); // Enlève les espaces doubles, triples, etc.

	var reg=new RegExp(SearchContent, "g");
	str = str.replace(reg,"<span style='font-weight:bold;background-color:#FFFF00;'>"+SearchContent+"</span>");

	return str;    
}

function RemoveExtraSpace(str)
{

	str = str.replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
    str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
    str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
    return str;    
}

function InputGetValue(elementId)
{
	// pas utile remplacable par document.getElementById('searchf_content').value
	var input = document.getElementById(elementId);
	var input_value = input.value;
	return input_value;
}
function CheckboxGetValue(elementId)
{
	if(document.getElementById(elementId).checked) { return 1; } else { return 0; };
}

function RemoveAccents(chaine) {
	chaine=chaine.replace(/[éèêë]/g,"e");
	chaine=chaine.replace(/[àâä]/g,"a");
	chaine=chaine.replace(/[ïî]/g,"i");
	chaine=chaine.replace(/[ùûü]/g,"u");
	chaine=chaine.replace(/[öô]/g,"o");
	return chaine;

}


// 
// *********************************** DISPLAY RESULTS

function PageReady() {
	DivDisplay("divloading","none");
	DivDisplay("layergeneral","block");
}

function DivDisplay(elementId, setTo) {
	if( document.getElementById ) { var theElement = document.getElementById( elementId ); } else {
	if( document.all ) { var theElement = document.all[ elementId ]; } else { var theElement = new Object(); } }
	if( !theElement ) { return; }
	if( theElement.style ) { theElement = theElement.style; }
	theElement.display = setTo;
}

function DivAppendDiv(elementId, NewDivLayer, NewDivClass,NewDivStyle) {
	if( document.getElementById ) { var theElement = document.getElementById( elementId ); } else {
	if( document.all ) { var theElement = document.all[ elementId ]; } else { var theElement = new Object(); } }
	if( !theElement ) { return; }
	//if( theElement.style ) { theElement = theElement.style; }
	var NewDiv=document.createElement("div");
	NewDiv.setAttribute("id",NewDivLayer);
	NewDiv.setAttribute("class",NewDivClass);
	NewDiv.setAttribute("style",NewDivStyle);
	theElement.appendChild(NewDiv);
}

function DivCreateDiv(NewDivLayer, NewDivClass, NewDivStyle) {
	var NewDiv=document.createElement("div");
	NewDiv.setAttribute("id",NewDivLayer);
	NewDiv.setAttribute("class",NewDivClass);
	NewDiv.setAttribute("style",NewDivStyle);
}

function DivRemoveChild(elementId, ChildElementId) {
	
  var theElement = document.getElementById(elementId);
  var ChildElement = document.getElementById(ChildElementId);
  theElement.removeChild(ChildElement);

}


// ----- DivWriteContent

function DivWriteContent(elementId, Content) {
	if( document.getElementById ) { var theElement = document.getElementById( elementId ); } else {
	if( document.all ) { var theElement = document.all[ elementId ]; } else { var theElement = new Object(); } }
	if( !theElement ) { return; }
	//if( theElement.style ) { theElement = theElement.style; }
	theElement.innerHTML = Content;
}

function DivWriteContentAfter(elementId, Content) {
	if( document.getElementById ) { var theElement = document.getElementById( elementId ); } else {
	if( document.all ) { var theElement = document.all[ elementId ]; } else { var theElement = new Object(); } }
	if( !theElement ) { return; }
	//if( theElement.style ) { theElement = theElement.style; }
	theElement.innerHTML += Content;
}

function DivWriteContentBefore(elementId, Content) {
	if( document.getElementById ) { var theElement = document.getElementById( elementId ); } else {
	if( document.all ) { var theElement = document.all[ elementId ]; } else { var theElement = new Object(); } }
	if( !theElement ) { return; }
	//if( theElement.style ) { theElement = theElement.style; }
	theElement.innerHTML = Content + theElement.innerHTML ;
}
