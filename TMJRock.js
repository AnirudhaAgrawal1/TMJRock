// TMJRock part starts here
function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id"+cid;
return new TMJRockElement(element)
}
$$$.model={
"onStartup":[],
"accordian":[],
"modals":[]
};
$$$.modals={};
$$$.modals.show=function(mid){
var modal=null;
for(let i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
};
function Modal(cref)
{
var objectAddress=this;
var contentReference=cref;
this.beforeOpening=null;
this.afterOpening=null;
this.beforeClosing=null;
this.afterClosing=null;
this.getContentId=function()
{
return contentReference.id;
}
var modalMaskDivision=document.createElement('div');
modalMaskDivision.classList.add('tmjrock_modalMask');
modalMaskDivision.style.display='none'
document.body.append(modalMaskDivision);
var modalDivision=document.createElement('div');
modalDivision.classList.add('tmjrock_modal');
modalDivision.style.display='none'
document.body.append(modalDivision);
var headerDivision=document.createElement('div');
headerDivision.style.background="#ADD8E6";
headerDivision.style.right=0;
headerDivision.style.height="40px";
headerDivision.style.padding="5px";
modalDivision.appendChild(headerDivision);
if(contentReference.hasAttribute('size'))
{
let size=contentReference.getAttribute('size');
let xpos=size.indexOf("x");
if(xpos==-1) xpos=size.indexOf("X");
if(xpos==-1) throw "In case of modal, size should be specified as widthxheight";
if(xpos==0 || xpos==size.length) throw "In case of modal, size should be specified as widthxheight";
var width=size.substring(0,xpos);
var height=size.substring(xpos+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=height+"px";
}
else 
{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}
if(contentReference.hasAttribute('header'))
{
var hd=contentReference.getAttribute('header');
headerDivision.innerHTML=hd;
}
if(contentReference.hasAttribute('maskColor'))
{
modalMaskDivision.style.background=contentReference.getAttribute('maskColor');
}
if(contentReference.hasAttribute('modalBackgroundColor'))
{
modalDivision.style.background=contentReference.getAttribute('modalBackgroundColor');
}
var contentDivision=document.createElement('div');
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-130)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";
contentReference.remove();
contentDivision.appendChild(contentReference);
modalDivision.appendChild(contentDivision);
var footerDivision=document.createElement('div');
footerDivision.style.background="silver";
footerDivision.style.left="0";
footerDivision.style.right="0";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="5px";
modalDivision.appendChild(footerDivision);
if(contentReference.hasAttribute('footer'))
{
var footer=contentReference.getAttribute('footer');
footerDivision.innerHTML=footer;
}
var closeButtonSpan=null;
if((!contentReference.hasAttribute('closeButton')) || contentReference.getAttribute('closeButton').toUpperCase()=='TRUE')
{
closeButtonSpan=document.createElement('span');
closeButtonSpan.classList.add('tmjrock_closeButton');
var closeButtonMarker=document.createTextNode('x');
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
if(contentReference.hasAttribute('afterOpening'))
{
var oo=contentReference.getAttribute('afterOpening');
this.afterOpening=oo;
}
if(contentReference.hasAttribute('afterClosing'))
{
var oc=contentReference.getAttribute('afterClosing');
this.afterClosing=oc;
}
if(contentReference.hasAttribute('beforeOpening'))
{
this.beforeOpening=contentReference.getAttribute('beforeOpening');
}
if(contentReference.hasAttribute('beforeClosing'))
{
this.beforeClosing=contentReference.getAttribute('beforeClosing');
}
this.show=function(){
let openModal=true;
if(this.beforeOpening)
{
openModal=eval(this.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display='block';
modalDivision.style.display='block';
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
}
if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalMaskDivision.style.display='none';
modalDivision.style.display='none';
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
}
}
}





function accordianHeadingClicked(accordianIndex,panelIndex)
{
if($$$.model.accordian[accordianIndex].expandedIndex!=-1) $$$.model.accordian[accordianIndex].panels[$$$.model.accordian[accordianIndex].expandedIndex].style.display="none";
$$$.model.accordian[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordian[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordian[accordianIndex].expandedIndex=panelIndex+1;
}
$$$.toAccordian=function(accord){
var children=accord.childNodes;
var panels=[];
let x;
for(x=0;x<children.length;x++)
{
if(children[x].nodeName=="H3") panels[panels.length]=children[x];
if(children[x].nodeName=="DIV") panels[panels.length]=children[x];
}
if(panels.length%2!=0) throw "Heading and dividion are malformed to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3") throw "Heading and division are malformed to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Heading and division are malformed to create accordian";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function(){
accordianHeadingClicked(accordianIndex,panelIndex);
}
}
var accordianLength=$$$.model.accordian.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianLength,x);
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none";
}
$$$.model.accordian[accordianLength]={
"panels":panels,
"expandedIndex":-1
};
}// toAccordian function ends here
$$$.onDocumentLoaded=function(func){
if((typeof func)!="function") throw "Expected function, found "+(typeof func)+"in call to onDocumentLoaded";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}// onDocumentLoaded function ends here
$$$.initFramework=function(){
// modal part starts here
var all=document.getElementsByTagName('*');
var modal;
for(let i=0;i<all.length;i++)
{
if(all[i].hasAttribute('forModal'))
{
if(all[i].getAttribute('forModal').toUpperCase()=='TRUE')
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
}
// modal part ends here
let allTags=document.getElementsByTagName("*")
let a=null;
for(let x=0;x<allTags.length;x++)
{
a=allTags[x];
if(a.hasAttribute("accordian"))
{
if(a.getAttribute("accordian")=="true")
{
$$$.toAccordian(a);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}
} // initFramework function ends here
window.addEventListener('load',function(){
$$$.initFramework();
});
function TMJRockElement(element)
{
this.element=element;
this.html=function(content)
{
if((typeof this.element.innerHTML)=="string")
{
if(typeof content=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
}; // html function ends here
this.value=function(content){
if((typeof this.element.value)=="string")
{
if(typeof content=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
};// value function ends here
/*this.fillComboBox=function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be called on SELECT type object only."
if(!jsonObject["dataSource"]) throw "dataSource property required in call to fillComboBox."
alert(jsonObject["dataSource"] instanceof Map)





}// fillComboBox function ends here
*/
this.isValid=function(obj)
{
var valid=true;
for(var key in obj)
{
var elements=document.getElementsByName(key);
if(elements.length==1)
{
var element=elements[0];
elementType=element.type;
if(elementType=='text')
{
value=element.value.trim();
document.getElementById(obj[key].errorPane).innerHTML="";
if(obj[key].required==true && value=="")
{
valid=false;
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.required;
} 
if(value.length>obj[key].maxLength)
{
valid=false;
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.maxLength;
}
}
if(elementType=='textarea')
{
value=element.value.trim();
document.getElementById(obj[key].errorPane).innerHTML="";
if(obj[key].required==true && value=="")
{
valid=false;
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.required;
}
}
if(elementType=='select-one')
{
value=element.value;
document.getElementById(obj[key].errorPane).innerHTML="";
if(value==obj[key].invalid)
{
valid=false;
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.invalid;
}
}
if(elementType=='checkbox')
{
if(obj[key].requiredState!=element.checked && obj[key].displayAlert==true)
{
alert(obj[key].errors.requiredState);
}
}
}// if condition for elementSize==1 ends here
else
{
var firstElement=elements[0];
var secondElement=elements[1];
if(firstElement.type=='radio' && secondElement.type=='radio')
{
document.getElementById(obj[key].errorPane).innerHTML="";
if(obj[key].required==true && firstElement.checked==false && secondElement.checked==false)
{
valid=false;
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.required;
}
}
}
}// for loop ends here
return valid;
}// isValid function ends here


}// class ends here


$$$.ajax=function(jsonObject){
if(!jsonObject["url"]) throw "url property missing in call to ajax";
let url=jsonObject["url"];
if((typeof url)!="string") throw "url prpoerty should be of string type in call to ajax";
let methodTYpe="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof methodType)!="string") throw "method property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "method property should be GET/POST in call to ajax";
}
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be of function type in call to ajax";
}
let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be of function type in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function()
{
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
}
if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function()
{
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
var jsonData={};
var queryString="";
var sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;
if((typeof sendJSON)!='boolean') throw "sendJSON property should be of boolean type in call to ajax";
if(jsonObject["data"])
{
jsonData=jsonObject["data"];
if(!sendJSON)
{
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}
}
xmlHttpRequest.open(methodType,url,true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
xmlHttpRequest.setRequestHeader("content-Type","application/x-www-form-urlencoded");
xmlHttpRequest.send(queryString);
}
}
}; // ajax function ends here
// TMJRock part ends here