const sortList =  document.querySelector(".list");
  const  items = document.querySelectorAll(".item");


items.forEach(item => {
    item.addEventListener("dragstart", () => {
        //Adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });
    //Remove dragging class from item on draggend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"))
});

const initSorttableList = (e) => {
    e.preventDefault();
    const draggingItem = sortList.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    const siblings = [...sortList.querySelectorAll(".item:not(.dragging)")];
    //Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight /2;
    });
    // Inserting the dragging item before the found sibling
    
    sortList.insertBefore(draggingItem, nextSibling);
   
}


sortList.addEventListener("drageover", initSorttableList);
sortList.addEventListener("dragenter", initSorttableList);