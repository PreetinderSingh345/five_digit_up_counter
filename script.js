let counterButton=document.getElementById("counter-button");//getting the counter button
let prevOver=true;//to store whether the previous counter is over or not and is initially true

counterButton.addEventListener("click", function(){//handling the event when the counter button is clicked
     
    if(!prevOver){//this is the case when a previous counter is already in progress and in this case we display an alert message and return 
        alert("A counter is already in progress");
        return ;
    }    

    let countTill=document.getElementById("counter-input").value;//this is to get the input value from the number input field  

    if(countTill==""){//this is the case when the button is pressed without any number entered inside the input field and we simply display an alert message and return
        alert("Please enter a number");
        return ;
    }

    let target=parseInt(countTill);//this is the target value
    let message=document.getElementsByClassName("message");//this is the list of elements which comprise the message to be displayed when the target is met

    if(target==0){//when the target is already reached
        
        alert("Target reached");//display an alert message

        for(let i=0;i<message.length;i++){//display the message around the outer counter container
            message[i].style.opacity="1"
        }

        setTimeout(function(){//remove the message after 1 second and return 

            for(let i=0;i<message.length;i++){
                message[i].setAttribute("style", "");
            }

        }, 1000);

        return ;

    }   

    if(target<0 || target>=100000){//when the target is out of range, we display an alert message and we return

        window.alert("Enter a value according to the instruction");
        return ;

    }

    prevOver=false;//now if the target is >=1 and in range then a new counter is started and if the button is pressed while this counter is on so we should get an appropriate message, so the previous counter over value is set to false
    
    let totalCount=0;//count reached till now
    let n=target;//to decide the number of digits for which the interval has to be started
    let intervalId=[];//array to store all the intervals ids

    for(let i=0;i<5 && n>=1;i++, n/=10){//iterating on all the digits for which the interval has to be started starting from the 1st, till the 5th digit

        let currVal=document.getElementById("curr-val-"+(i+1));//getting the current value and the next value element of the current digit

        let nextVal=document.getElementById("next-val-"+(i+1));                      

        let val=1000*Math.pow(10, i);//to get stop1 and stop2 values for the current digit

        let stop1=val-500;//this is the time in ms after which the shift up transition will be removed in the current digit for the next value to shift upwards

        let stop2=val;//this is the time in ms after which the value will change in the current digit  

        let count=0;//this is the value which is currently held by the current digit
    
        let id=setInterval(function(){//called for the current digit repeateadly after stop2 ms
            
            if(!intervalId.includes(id)){//we are pushing only unique ids into the interval id array and not doing this each time the set interval function is called for a particular digit
                intervalId.push(id);
            }

            nextVal.classList.add("shift-up");//making the next value for the current digit shift upwards and place over the current value and this process will take 500ms 
                                        
                let idT=setTimeout(function(){//called for the current digit after stop1 ms

                    if(totalCount==target){//this is the case when this function's timer was started at a point when the total count was lesser than the target, but when we entered inside it, then the total count has reached the target so we simply ignore this timeout, clear it and then return 

                        console.log("ignore this");
                        clearTimeout(idT);
                        return ;
                    }
                                                  
                    count++;//increase the count

                    currVal.innerText=count;//now the value below the next value i.e. the current value will be updated and the next value will be shifted down

                    nextVal.classList.remove("shift-up");  

                    if(i==0){//we are incrementing the total count only wrt the ones digit place, so that we don't get extra count                  
                        totalCount++;                                               
                    }                    

                    if(totalCount==target){//this is the case when the target is reached                                    
                                              
                        alert("Target reached");//display an alert message and the next counter can now start
                        prevOver=true;

                        for(let i=0;i<message.length;i++){//display the message elements
                            message[i].style.opacity="1";
                        }                   

                        for(let i=0;i<intervalId.length;i++){//clear all the existing intervals                                                 
                            clearInterval(intervalId[i]);                        
                        }                                    
                        
                        setTimeout(function(){//this function is called after 1s

                            for(let i=0;i<message.length;i++){//hiding the message elements
                                message[i].setAttribute("style", "");
                            }

                            for(let i=0;i<5;i++){//iterating on all the digits

                                let currVal=document.getElementById("curr-val-"+(i+1));//getting the current and the next value elements
                                let nextVal=document.getElementById("next-val-"+(i+1));

                                currVal.innerText="0";//making the current element's value back to 0(original value) before the next value which is currently over the current value is shifted down                      
                                nextVal.classList.remove("shift-up");
                                nextVal.innerText="1";//setting the next value back to its original value
                                
                            }

                        }, 1000);

                        return ;//returing after the target met condition has been handled

                    }                         

                }, stop1);
            

            if(count==9){//in case the count==9, then since we can have values only from 0 to 9 at a particular digit, so we set count to -1, so that the next value can have the value as 0 and not 10 as done below
                count=-1;
            }

            nextVal.innerText=(count+1);//assigning next value a new value which is to take place of the current value

        }, stop2);

    }
        
});

counterButton.addEventListener("mousedown", function(){//handling the event when the counter button is pressed down

    counterButton.style.backgroundColor="#ffd080";//changing the background color and the text color for the button on mousedown event
    counterButton.style.color="whitesmoke";    

});

counterButton.addEventListener("mouseup", function(){//handling the event when the counter button is released

    counterButton.setAttribute("style", "");//restoring the background color and the text color for the button back to normal on mouseup event

});