# TMJRock
A JavaScript framework by which the web developer creates a responsive website easily. User need not to worry about writing AJAX calls, creating and managing components.

## Features 
1. AJAX Request
2. Form Validation
3. Accordian Pane
4. Modal View

## How to set up this framework?
Download the TMJRock.js, TMJRock.css file and place in your working directory, then include both the files in your html file.
```
<script src='js/TMJRock.js'></script>
```
```
<link rel='stylesheet' type='text/css' href='css/TMJRock.css'>
```

## How to use this framework?

#### AJAX Request

```
<!Doctype html>
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>Ajax Example</title>
<script src='js/TMJRock.js'></script>
<script>
function populateDesignations()
{
$$$.ajax({
"url":"servletOne",
"methodType":"GET",
"success":function(responseData){
alert(responseData);
},
"failure":function(){
alert("Some problem");
}
});
}
window.addEventListener('load',populateDesignations);
</script>
</head>
<body>
<h1>Get type request</h1>
<br>
<br>
</body>
</html>
```
-------------------
#### Form Validation
```
<!Doctype html>
<html lang='en'>
<head>
<title>TMJRock Validation</title>
<script src='js/TMJRock.js'></script>
<script>
function doSomething()
{
return $$$("someForm").isValid({
"nm":{
"required":true,
"maxLength":20,
"errorPane":"nmErrorSection",
"errors":{
"required":"Name required",
"maxLength":"Name cannot exceed 20 characters"
}
},
"ad":{
"required":true,
"errorPane":"adErrorSection",
"errors":{
"required":"Address required"
}
},
"ct":{
"invalid":-1,
"errorPane":"ctErrorSection",
"errors":{
"invalid":"Select city"
}
},
"gender":{
"required":true,
"errorPane":"genderErrorSection",
"errors":{
"required":"select gender"
}
},
"agree":{
"requiredState":true,
"displayAlert":true,
"errors":{
"requiredState":"Select I agree checkbox"
}
}
});
}
</script>

<body>
<h1>TMJRock validations</h1>
<form id='someForm' onsubmit='return doSomething()'>
Name <input type='text' name='nm' id='nm'><span id='nmErrorSection' style='color:red'></span><br>
Address <textarea id='ad' name='ad'></textarea><span id='adErrorSection' style='color:red'></span><br>
Select city
<select id='ct' name='ct'>
<option value='-1'>select city</option>
<option value='1'>Ujjain</option>
<option value='2'>Dewas</option>
<option value='3'>Indore</option>
</select>
<span id='ctErrorSection' style='color:red'></span><br>
<br>
Gender &nbsp;&nbsp;&nbsp;
Male <input type='radio' name='gender' id='ml' value='M'>&nbsp;&nbsp;&nbsp;
Female <input type='radio' name='gender' id='fe' value='F'>&nbsp;&nbsp;&nbsp;
<span id='genderErrorSection' style='color:red'></span>
<br>
<input type='checkbox' name='agree' id='ag' value='y'> I agree?
<br>
<button type='submit'>Registor</button>
</form>
</body>
</html>
```
#### Output

![Screenshot (5)](https://user-images.githubusercontent.com/76853693/123473669-81308f80-d616-11eb-8244-1b2202c3daba.png)

------
#### Accordian Pane
````

<!Doctype html>
<html lang='en'>
<head>
<title>TMJRock Accordian Pane</title>
<script src='TMJRock.js'></script>
</head>
<body>
<h1>TMJRock Accordian Pane</h1>
<div accordian="true">
<h3>Heading 1</h3>
<div>
1 Whatever Whatever Whatever Whatever
2 Whatever Whatever Whatever Whatever
3 Whatever Whatever Whatever Whatever
4 Whatever Whatever Whatever Whatever
5 Whatever Whatever Whatever Whatever
6 Whatever Whatever Whatever Whatever
</div>
<h3>Heading 2</h3>
<div>
11 Whatever Whatever Whatever Whatever
22 Whatever Whatever Whatever Whatever
33 Whatever Whatever Whatever Whatever
44 Whatever Whatever Whatever Whatever
55 Whatever Whatever Whatever Whatever
66 Whatever Whatever Whatever Whatever
</div>
<h3>Heading 3</h3>
<div>
111 Whatever Whatever Whatever Whatever
222 Whatever Whatever Whatever Whatever
333 Whatever Whatever Whatever Whatever
444 Whatever Whatever Whatever Whatever
555 Whatever Whatever Whatever Whatever
666 Whatever Whatever Whatever Whatever
</div>
</div>
<div id='gogo' accordian="true">
<h3>Heading 1000</h3>
<div>
1 Whatever Whatever Whatever Whatever
2 Whatever Whatever Whatever Whatever
3 Whatever Whatever Whatever Whatever
4 Whatever Whatever Whatever Whatever
5 Whatever Whatever Whatever Whatever
6 Whatever Whatever Whatever Whatever
</div>
<h3>Heading 2000</h3>
<div>
11 Whatever Whatever Whatever Whatever
22 Whatever Whatever Whatever Whatever
33 Whatever Whatever Whatever Whatever
44 Whatever Whatever Whatever Whatever
55 Whatever Whatever Whatever Whatever
66 Whatever Whatever Whatever Whatever
</div>
<h3>Heading 3000</h3>
<div>
111 Whatever Whatever Whatever Whatever
222 Whatever Whatever Whatever Whatever
333 Whatever Whatever Whatever Whatever
444 Whatever Whatever Whatever Whatever
555 Whatever Whatever Whatever Whatever
666 Whatever Whatever Whatever Whatever
</div>
</div>
</body>
</html>

````
#### Output
![Screenshot (6)](https://user-images.githubusercontent.com/76853693/123473814-b63ce200-d616-11eb-8b44-09d3fa3bcb3e.png)


---------

#### Modal View
````
<!Doctype html>
<html lang='en'>
<head>
<title>TMJRock Modal View</title>
<script src='TMJRock.js'></script>
<link rel='stylesheet' type='text/css' href='TMJRock.css'>
<script>
function onOpened()
{
alert("Modal with id ab opened");
}
function onClosed()
{
alert("modal with id ab closed")
}
function abBeforeOpening()
{
alert("ab is ready to be opened");
return true;
}
function abBeforeClosing()
{
alert("b is going to be close");
return true;
}
function createModal1()
{
$$$.modals.show('ab');
}
function createModal2()
{
$$$.modals.show('pq');
}
</script>
<body>
<h1>TMJROCK Modal view</h1>
<button type='button' onclick='createModal1()'>show first modal</button>
<button type='button' onclick='createModal2()'>show second modal</button>
<div id='ab' forModal='true' size='200x300' header='Some Heading' footer='Some footer' maskColor='#808080' modalBackgroundColor='#FFFFFF' closeButton='true' afterOpening='onOpened()' afterClosing='onClosed()' beforeOpening='abBeforeOpening()' beforeClosing='abBeforeClosing()'>
GOD is great
</div>
<div id='pq' forModal='true'>
Ujjain is the city of GODS
</div>
</body>
</html>
````
#### Output
![Screenshot (7)](https://user-images.githubusercontent.com/76853693/123473710-93123280-d616-11eb-932d-27d7ecb7e3fa.png)

--------
