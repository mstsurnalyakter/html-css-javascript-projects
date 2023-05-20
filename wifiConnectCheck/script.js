const popup = document.querySelector(".popup"),
wifeIcon = document.querySelector(".icon img"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc")

let isOnline = true, intervalId, timer = 10;
const checkConnention = async () => {
    // Try to fetch random data from the API
    // 200 and 300, the network connention is considered online
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
      
    } catch (error) {
         
        isOnline = false;    //if there is an error, the connection is considered offile
    }
    timer = 10;
    clearInterval(intervalId);

    handlePopup(isOnline);
}


const handlePopup = (status) => {

    if (status) {//If the status is true (online), update icon, title , and description accordingly
        wifeIcon.className = "image";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        return popup.classList.remove("show")
    }
    // If the status is false (offline) , update the icon, title , and accordingly
         wifeIcon.className = "image";
         popupTitle.innerText = "Lost Connection";
        popupDesc.innerHTML = "Your network is unavailable. We will attempt to recoonect you in <b>10</b> second.";
        popup.classList.add("show");

        intervalId = setInterval(() => {//set an interval to decrease the timer by 1 every second
            if (timer === 0) checkConnention();// If the time reaches 0 , check the connection again
                
            
            timer--;
            popup.querySelector(".desc b").innerText = timer;
        }, 1000);
    
}

// Only if isOnline is true, check the connection status every 3 seconds
setInterval(() => isOnline && checkConnention(), 3000);