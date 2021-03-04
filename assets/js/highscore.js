var highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("scores-list");

    // sort scores from high to low
    highScores.sort(function (a,b){
        return b.finalScore - a.finalScore
    })
    
    // saves only 5 scores total
    highScores.splice(5);

    // display the scores
    for (var i = 0; i < highScores.length; i++) {
        var newLi = document.createElement("li")
        newLi.textContent = highScores[i].name + " - " + highScores[i].finalScore
        scoreList.appendChild(newLi)
    }

    


