
// ADDING A NEW NOTE
let addNoteBtn = document.getElementById("notesBtn");

let addNote = () => {
  let notesDiv = document.createElement("div");
  notesDiv.style.position = "relative";
  notesDiv.className = "notesDiv";

  let newNote = document.createElement("textarea");
  newNote.className = "notes";
  newNote.setAttribute("placeholder", "Add a note here");
  newNote.setAttribute("spellcheck" , "false")
  newNoteValue = newNote.value

  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash-alt icon4";
  
  // SAVING DATA TO LOCALSTORAGE AND LOCALDATARR

  let saveData = (event) => {
  
    let data = event.target.value;
    let localData = localStorage.getItem("localData");
    
    if (localData == null) {
      localDataArr = [];
    } else {
      localDataArr = JSON.parse(localData);
    }
    
    localDataArr.push(data);
    localStorage.setItem("localData", JSON.stringify(localDataArr));
  }

  newNote.addEventListener('change' , saveData)
  
  // DELETEING NOTESDIV AND UPDATING DATA IN LOCALSTORAGE AND LOCALDATAARR
  let deleteNote = (event) => {
    let noteToBeDeleted = event.target.parentNode;
    document.getElementsByClassName("main")[0].removeChild(noteToBeDeleted);
    
    let noteToBeDeletedToo = event.target.previousElementSibling;
    let noteToBeDeletedTooValue = noteToBeDeletedToo.value;
    
    for (i = 0; i < localDataArr.length; i++) {
      if (noteToBeDeletedTooValue == localDataArr[i]) {
        localDataArr.splice(i, 1);
        localStorage.clear();
        localStorage.setItem("localData", JSON.stringify(localDataArr));
      }
    }
  };
  deleteIcon.addEventListener("click", deleteNote);
  
  notesDiv.appendChild(newNote);
  notesDiv.appendChild(deleteIcon);
  document.getElementsByClassName("main")[0].appendChild(notesDiv);
};

addNoteBtn.addEventListener("click", addNote);



// HOVER EFFECTS FOR THE ADD ICON
addNoteBtn.addEventListener("mouseenter", () => {
  let plus = document.getElementById("icon3");
  plus.style.color = "#8790e0";
  plus.style.transform = "rotate(180deg)";
});
addNoteBtn.addEventListener("mouseleave", () => {
  let plus = document.getElementById("icon3");
  plus.style.color = "black";
  plus.style.transform = "rotate(0deg)";
});

// GETING DATA FROM LOCAL STORAGE AND DISPLAYING IT ON DOM
let displayNotes = () => {
  let notes = localStorage.getItem("localData");
  if (notes == null) {
    localDataArr = [];
  } else {
    localDataArr = JSON.parse(notes);
  }
  
  for (i = 0; i < localDataArr.length; i++) {
    addNote();
    let newNote = document.querySelectorAll(".notes");
    let noteValaue = localDataArr[i];
    newNote[i].value = noteValaue;
  }
};

window.addEventListener("load", displayNotes);


// SEARCH 
let search = document.getElementById('search')

  let findData = (event) => {
      let searchValue = event.target.value.toLowerCase()
      let notesDiv = document.getElementsByClassName('notesDiv')
      let n = Array.from(notesDiv)
      for ( i = 0; i < n.length; i++){
          if (n[i].firstElementChild.value.toLowerCase().includes(searchValue)){
            n[i].style.display = "inline-block"
          }
          else{
            n[i].style.display = "none"
          }
        }
  }         
search.addEventListener('input' , findData)

// DELETING ALL DATA IN LOCALSTORAGE AND INDIRECTLY CALLING DISPLAYNOTES()
let deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener("click", () => {
  for (i = 0; i < localDataArr.length; i++) {
    localDataArr.splice(i, 1);
  }
  localStorage.clear();
  
  window.location.reload();
});




              
