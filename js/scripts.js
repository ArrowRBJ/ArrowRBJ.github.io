let xmlhttp = new XMLHttpRequest();
    function loadXMLDoc() {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                fetchData();
            }
        };
        //xmlhttp.open("GET", "https://obiwan.univ-brest.fr/~e22309086/data/bdd.xml", true);
        xmlhttp.open("GET", "data/bdd.xml", true);

        xmlhttp.send();
    }

    let page = 1;
    function fetchData() {
        let i;
        let xmlDoc = xmlhttp.responseXML;
        let table = "<tr><th>Theme</th><th>Questions</th><th>Reponses</th></tr>";
        let x = xmlDoc.getElementsByTagName("question");

         //Calculer nbPage    
        nbPage = Math.ceil(50/10);
        //Calculer startIndex et endIndex    
        startIndex= 15*(page-1);
        endIndex= startIndex+10-1;

        if (endIndex>= x.length) {
            endIndex= x.length -1;
        }

        for (i = startIndex; i <= endIndex; i++) {
            table += "<tr><td>" +
            x[i].getElementsByTagName("theme")[0].textContent +
            "</td><td>" +
            x[i].getElementsByTagName("contenu")[0].textContent +
            "</td><td>" +
            x[i].getElementsByTagName("bonne_reponse")[0].textContent +
            "</td><td>"
            + "<a href='detail.html?id="
            + x[i].getElementsByTagName("id")[0].textContent
            + "'>Details</a>"            
            + "</td>"
            + "</tr>";            
        }
        document.getElementById("data").innerHTML = table;
    }

    function loadPage(pageNumber) {
        //Mettre à jour la valeur de page en fonction de pageNumber
        page = pageNumber
        //Appeler la fonction fetchData 
        fetchData()
    }

    function filterData(){
        let i;
        let xmlDoc = xmlhttp.responseXML;
        let table = "<tr><th>Theme</th><th>Questions</th><th>Reponses</th></tr>";
        let x = xmlDoc.getElementsByTagName("question");
        let theme =  document.getElementById("thematique");
        for (i = 0; i < x.length; i++) {
            if(theme.value==x[i].getElementsByTagName("thematique")[0].textContent){
                table += "<tr><td>" +
                x[i].getElementsByTagName("thematique")[0].textContent +
                "</td><td>" +
                x[i].getElementsByTagName("contenu")[0].textContent +
                "</td><td>" +
                x[i].getElementsByTagName("bonne_reponse")[0].textContent +
                "</td>" +            
                "</tr>";
            }
        }
        document.getElementById("data").innerHTML = table;
        
    }



/// fonction pour page detail.html
    function loadXMLDocAndDisplayData(){       
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                displayData();
            }
        };
    
        //xmlhttp.open("GET", "https://obiwan.univ-brest.fr/~e22309086/data/bdd.xml", true);
        xmlhttp.open("GET", "data/bdd.xml", true);
        xmlhttp.send();    
    }
    
    function displayData() {
        let urlParams = new URLSearchParams(window.location.search);
        let iddata = urlParams.get('id');
    
        let txtQ = document.getElementById("txtQ");
        let txtA = document.getElementById("txtA"); 
        let txtD = document.getElementById("txtD"); 

    
        let i;        
        let xmlDoc = xmlhttp.responseXML;    
        let x = xmlDoc.getElementsByTagName("question");    
        
        for (i = 0; i < x.length; i++) {        
            if (x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == iddata){
                //Afficher les information en utilisant les textboxes 
                txtQ.value = x[i].getElementsByTagName("contenu")[0].textContent;
                txtA.value = x[i].getElementsByTagName("bonne_reponse")[0].textContent;
                txtD.value = x[i].getElementsByTagName("explication")[0].textContent;
            }
        }
    }
        
    
/// fonction pour page Jeu.html
let correctAnswers = 0; // Nombre de bonnes réponses

    function loadXMLDocAndPlay(){       
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                question();
            }
        };
    
        //xmlhttp.open("GET", "https://obiwan.univ-brest.fr/~e22309086/data/bdd.xml", true);
        xmlhttp.open("GET", "data/bdd.xml", true);
        xmlhttp.send();    
    }
//dans une database de 80 question, choisit aléatoirement 1 question et enregistre la valeur en localstorage
    function question(){
        let xmlDoc = xmlhttp.responseXML;
        let x = xmlDoc.getElementsByTagName("question");
        let randomIndex = Math.floor(Math.random() * x.length);

        // Enregistrer la question dans le localStorage
        localStorage.setItem("selectedQuestion", JSON.stringify(randomIndex));
        display();
    }

    function display(){
        let xmlDoc = xmlhttp.responseXML;
        let rndID= localStorage.getItem("selectedQuestion");
        let x = xmlDoc.getElementsByTagName("question");

        // find question in database
        let selectedQuestion = null;
            for (let i = 0; i < x.length; i++) {
                let id = x[i].getElementsByTagName("id")[0].textContent;
                if (id === rndID) {
                    selectedQuestion = x[i];
                    break;
                }
            }
        
        document.getElementById("question").innerHTML = "<h3>"+selectedQuestion.getElementsByTagName("contenu")[0].textContent+"</h3>";

        let bonneReponse = selectedQuestion.getElementsByTagName("bonne_reponse")[0].textContent;
        localStorage.setItem("correctAnswer", bonneReponse);
        let propositions = [];
        
        let propositionNodes = selectedQuestion.getElementsByTagName("proposition");
        for (let i = 0; i < propositionNodes.length; i++) {
            propositions.push(propositionNodes[i].textContent);
        }
        propositions.push(bonneReponse);
        propositions = shuffleArray(propositions);

        for (let i = 0; i < propositions.length; i++) {
            let button = document.getElementById((i + 1).toString());
            button.textContent = propositions[i];        
        }    

    }
//teste si la reponse est bonne
//si nombre de question repondu=10 alor score.html sinon question()
//enregistre le score de la derniere partie et de la partie actuelle en localstorage
    function answer(){
        let correctAnswer = localStorage.getItem("correctAnswer");
    
        
        let isCorrect = selectedButton.textContent === correctAnswer;

        // Récupérer et mettre à jour le nombre de bonnes réponses et le nombre total de réponses
        let totalQuestionsAnswered = parseInt(localStorage.getItem("totalQuestionsAnswered")) || 0;
        let correctAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;

        if (isCorrect) {
            correctAnswers++; // Incrémenter le nombre de bonnes réponses
        }

        totalQuestionsAnswered++; 
        localStorage.setItem("totalQuestionsAnswered", totalQuestionsAnswered);
        localStorage.setItem("correctAnswers", correctAnswers);

        
        if (totalQuestionsAnswered >= 10) {
            window.location.href = "score.html"; // Rediriger vers scores
        } else {
            
            question(); 
        }
        
    }