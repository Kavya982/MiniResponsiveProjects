let input=document.getElementById("input");

function appendChar(char){
    input.value=input.value+char;
}

function clearData(){
    input.value = "";
}
function operation(){
    input.value=eval(input.value);

}
function reduceByOne(){
    let str=input.value;
    let res=str.slice(0,str.length-1);
    input.value=res;

}
