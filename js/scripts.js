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
    function loadXMLDocAndPlay(){       
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                play();
            }
        };
    
        //xmlhttp.open("GET", "https://obiwan.univ-brest.fr/~e22309086/data/bdd.xml", true);
        xmlhttp.open("GET", "data/bdd.xml", true);
        xmlhttp.send();    
    }

    function play(){
        

    }