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
            "</td>" +            
            "</tr>";
        }
        document.getElementById("data").innerHTML = table;
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

    function showOption(){
        document.getElementById("option").innerHTML = "<a href='jeu.html' class='btn btn-outline-success btn-lg btn-block'>Aleatoire</a><a href='jeu.html' class='btn btn-outline-success btn-lg btn-block'>Pollution</a><a href='jeu.html' class='btn btn-outline-success btn-lg btn-block'>Biodiversité</a><a href='jeu.html' class='btn btn-outline-success btn-lg btn-block'>Climat</a><a href='jeu.html' class='btn btn-outline-success btn-lg btn-block'>Énergie</a>";
    }

    function startgame(){
        
    }