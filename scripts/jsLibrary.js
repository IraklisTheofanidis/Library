let myLibrary=[];


function book(title, author,pages,read) {
    this.title = title;
    this.author=author;
    this.pages = pages;
    this.read=read;

    this.info = function() {
        return ("Title: "+ title + " author: " + author +" pages: " +pages+ " read:" + read);
      };
      

  }

if (localStorage.getItem('books') === null) {
    myLibrary = [];
} 
else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    myLibrary = booksFromStorage;
    showBookInLibrary();
}
  
  function addBookToLibrary(titleText, authorText,pagesText,TRUE){   
     let book1 = new book(titleText, authorText,pagesText,TRUE);   
     myLibrary.push(book1);

    // showBookInLibrary(book1);
    showBookInLibrary();
    // alert(myLibrary.length);
}

document.getElementById("submit").addEventListener("click", function() {
    let titleText = document.getElementById("title").value;
    let authorText= document.getElementById("author").value;
    let pagesText = document.getElementById("pages").value;
    let readCheck = document.getElementById("checkbox");
    
    checkError(titleText,authorText,pagesText,readCheck);
    

    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("pages").value="";
  });


function checkError(titleText,authorText,pagesText,readCheck){
    if(titleText===""||authorText===""||pagesText===""){
        if(titleText===""){
            document.getElementById("titleError").style.display="block";
        }
        else{
            document.getElementById("titleError").style.display="none";
        }
        if(authorText===""){
            document.getElementById("authorError").style.display="block";
        }
        else{
            document.getElementById("authorError").style.display="none";
        }
        if(pagesText===""){
            document.getElementById("pagesError").style.display="block";
        }
        else{
            document.getElementById("pagesError").style.display="none";
        }

    }
    else{
        if(!checkSameTitle(titleText))
        {
            document.getElementById("titleError").style.display="none";
            document.getElementById("authorError").style.display="none";
            document.getElementById("pagesError").style.display="none";
            document.getElementById("sameTitle").style.display="none";
            if(readCheck.checked == true){addBookToLibrary(titleText, authorText,pagesText,true);}
            else{addBookToLibrary(titleText, authorText,pagesText,false);}
        }
        
    }
}

function checkSameTitle(titleText){
    
    for(k=0;k<myLibrary.length;k++)
        {
            if(myLibrary[k].title===titleText){
                
                document.getElementById("sameTitle").style.display="block";
                return true;
            }
        }      
        return false;
}
  

function showBookInLibrary(){

    refreshLibrary();
    localStorage.setItem('books', JSON.stringify(myLibrary));
    for(i=0;i<myLibrary.length;i++){
        let div = document.createElement('div');
        div.setAttribute('class', 'books'); 
       
        let h3 = document.createElement('h3');
        h3.textContent = myLibrary[i]["title"];
        div.appendChild(h3);

        let author = document.createElement("p");
        author.textContent = "Author: " +myLibrary[i]["author"];
        author.setAttribute("class","author");
        div.appendChild(author);

        let pages = document.createElement("p");
       pages.textContent = "Pages: " +myLibrary[i]["pages"];
       div.appendChild(pages);

       let buttons = document.createElement("div");

       let readButton = document.createElement("button");
        if(myLibrary[i].read===true){readButton.textContent="Read";}
        else{readButton.textContent="Not Read";}

        readButton.addEventListener("click", function(e) {
            alert(e.target.textContent);
            if(e.target.textContent==="Read"){
                e.target.textContent="Not Read"
                titleChild=e.target.parentNode.parentNode.childNodes[0].textContent; //takes tha value of h3(from the same div)
                for(k=0;k<myLibrary.length;k++)
                {
                    if(myLibrary[k].title===titleChild){
                        alert(JSON.stringify(myLibrary));
                        myLibrary[k].read=false;
                        alert(JSON.stringify(myLibrary));
                    }
                }               
            }
            else{
                e.target.textContent="Read";
                titleChild=e.target.parentNode.parentNode.childNodes[0].textContent;
                for(k=0;k<myLibrary.length;k++)
                {
                    if(myLibrary[k].title===titleChild){
                        alert(JSON.stringify(myLibrary));
                        myLibrary[k].read=true;
                        alert(JSON.stringify(myLibrary));
                    
                    }
                 
                }
            }
        });

       //readButton.textContent="Read";
       readButton.setAttribute("class","btn");
       buttons.appendChild(readButton);

       let removeButton = document.createElement("button");
       removeButton.textContent="Remove";
       removeButton.setAttribute("class","btn remove");
       removeButton.setAttribute("id",i);
       removeButton.setAttribute("style", "color: red;");
       removeButton.addEventListener("click", function(e) {
            titleChild=e.target.parentNode.parentNode.childNodes[0].textContent;
         //   alert(myLibrary.length);
            for(k=0;k<myLibrary.length;k++)
            {
                if(myLibrary[k].title===titleChild){
                    alert(JSON.stringify(myLibrary));
                    myLibrary.splice(k,1);
                    alert(JSON.stringify(myLibrary));
                    
                }
                 
            }
            e.target.parentNode.parentNode.remove();

  });
       
       buttons.appendChild(removeButton);


       div.appendChild(buttons);

        document.getElementById("deksia").appendChild(div); 
       // let ele = document.querySelectorAll(".books");     
    }    
}

function refreshLibrary(){
    let ele = document.querySelectorAll(".books");
   
    for(i=0;i<ele.length;i++)
    {
    
        ele[i].remove();
    }
}







