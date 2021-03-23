let soap = require('strong-soap').soap;

let url = './wsdls/teams.wsdl';

let options = {};

function afficheInfos(team){

    let element = team.teamSoapInfo;

    console.log(` - TeamId : ${element.tId};`);
    console.log(` - Name : ${element.name};`);
    console.log(` - Country : ${element.country};`);
    console.log(` - Type : ${element.type};`);
    console.log(` - Captain : ${element.captain};`);

    let players = team.players;
    if (Array.isArray(players) && players.length){
        console.log(" - Players : ")
        players.forEach(player => {
            if(player){
                if(player.playerSoapInfo){
                    console.log(`   * Name : ${player.playerSoapInfo.name};`);
                    console.log(`   * Age : ${player.playerSoapInfo.age};`);
                    console.log(`   * Citizenship : ${player.playerSoapInfo.citizenship};`);
                }
                console.log(`   * Position : ${player.position};`);
                console.log(" ");
            }
        })
    } else {
        console.log("Cette équipe n'a pas de joueurs enregistrés pour l'instant.");
    }
}

soap.createClient(
    url, 
    options, 
    function(err, client) {

        let soapGetTeamRequestParam = {
            getTeamRequest: {
                tid: [1,2]
            },
        };

        let soapCreateTeamRequestParam = {
            createTeamRequest: {
                teamSoap: {
                    tid: 0,
                    teamSoapInfo: {
                        name: "Seleção",
                        country: "Brazil",
                        type: "National team",
                        captain: "Casemiro",
                    },
                    players: {
                        playerSoapInfo: {
                            pid: 1,
                            name: "Neymar Jr",
                            age: 28,
                            citizenship: "Brazillian",
                        },
                        position: "Ailier gauche"
                    }
                }
                
            },
        };

        let soapModifyTeamRequestParam = {
            modifyTeamRequest: {
                // tid: 1,
                teamSoap: {
                    tId: 1,
                    teamSoapInfo: {
                        name: "PSG",
                        country: "Brazil",
                        type: "National team",
                        captain: "MANDADA",
                    },
                    players: {
                        playerSoapInfo: {
                            pid: 1,
                            name: "Neymar Jr",
                            age: 28,
                            citizenship: "Brazillian",
                        },
                        position: "Défenseur central"
                    }
                }
                
            },
        };

        let soapDeleteTeamRequestParam = {
            deleteTeamRequest: {
                tId: 2
            },
        };

        
        
        client.getTeam(
            soapGetTeamRequestParam, 
            function(err1, result, envelope, soapHeader) {

                console.log("RÉCUPÉRER DES ÉQUIPES");
                result.teamSoap.forEach(team => {
                    if (team){
                        afficheInfos(team);
                    }
                })
                console.log("****************************");

                // console.log(result);
                // afficheInfos(result.teamSoap[0]);
            }
        );

        client.createTeam(
            soapCreateTeamRequestParam,
            function(err2, result, envelope, soapHeader) {

                console.log("CRÉATTION D'UNE ÉQUIPE");
                afficheInfos(result.teamSoap);
                console.log("****************************");

            }
        )

        client.modifyTeam(
            soapModifyTeamRequestParam,
            function(err3, result, envelope, soapHeader) {

                console.log("MODIFICATION D'UNE ÉQUIPE");
                afficheInfos(result.teamSoap);
                console.log("****************************");

            }
        )

        client.deleteTeam(
            soapDeleteTeamRequestParam,
            function(err4, result, envelope, soapHeader) {
                
                console.log("SUPPRESSION D'UNE ÉQUIPE");
                console.log(result.deleteResult);
                console.log("\n****************************");

            }
        )
    }
);