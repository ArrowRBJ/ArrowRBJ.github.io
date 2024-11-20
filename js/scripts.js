//fonction page apprendre.html
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

    function fetchData() {
        let i;
        let xmlDoc = xmlhttp.responseXML;
        let table = "<tr><th>Theme</th><th>Questions</th><th>Reponses</th></tr>";
        let x = xmlDoc.getElementsByTagName("question");

        for (i = 0; i < x.length; i++) {
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

    function filterData(){
        let i;
        let xmlDoc = xmlhttp.responseXML;
        let table = "<tr><th>question</th><th>reponse</th></tr>";
        let x= xmlDoc.getElementsByTagName("question");
        let choix=document.getElementById("thematique").value;
        for(i=0;i<x.length;i++){
            
            if(x[i].getElementsByTagName("theme")[0].textContent==choix || choix== "Tout"){
                table += "<tr><td>" +
                x[i].getElementsByTagName("contenu")[0].textContent +
                "</td><td> " +
                x[i].getElementsByTagName("<bonne_reponse")[0].textContent +
                "</td></tr>"        
                ;
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
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

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

    function answer(selectedAnswer){
        let rndID = localStorage.getItem("selectedQuestion");
        let xmlDoc = xmlhttp.responseXML;
        let x = xmlDoc.getElementsByTagName("question");

        let selectedQuestion = null;
        for (let i = 0; i < x.length; i++) {
            let id = x[i].getElementsByTagName("id")[0].textContent;
            if (id === rndID) {
                selectedQuestion = x[i];
                break;
            }
        }

        // Récupérer la bonne réponse
        let bonneReponse = selectedQuestion.getElementsByTagName("bonne_reponse")[0].textContent;

        // Vérifier si la réponse est correcte
        if (selectedAnswer === bonneReponse) {
            alert("Vrai !");  // Réponse correcte
        } else {
            alert("Faux ! La bonne réponse est : " + bonneReponse);  // Réponse incorrecte
        }
        location.reload();
        //Objectif etait de verifier que la reponse est bonne
        //Au bout de 10 question repondues on met fin à la partie
        //LOCALSTORAGE
        //On garde une trace du score de la derniere partie
        //Total des question posées au joueur
        // pourcentage de bonnes reponse, par theme et total
        //Ces donnés seraient affichées dans une page statistique
    }