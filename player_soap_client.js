let soap = require('strong-soap').soap;

let url = './wsdls/players.wsdl';

let options = {};

function afficheInfos(player) {

    let element = player.playerSoapInfo;

    console.log(` - Name : ${element.name};`);
    console.log(` - Age : ${element.age};`);
    console.log(` - Citizenship : ${element.citizenship};`);

    let teams = player.teams;
    if (Array.isArray(teams) && teams.length){
        console.log(" - teams : ")
        teams.forEach(team => {
            if(team){
                if(team.teamSoapInfo){
                    console.log(`   * Name : ${team.teamSoapInfo.name};`);
                    console.log(`   * Country : ${team.teamSoapInfo.country};`);
                    console.log(`   * Type : ${team.teamSoapInfo.type};`);
                    console.log(`   * Captain : ${team.teamSoapInfo.captain};`);
                }
                console.log(`   * Position : ${team.position};`);
            }
        })
    }
}

soap.createClient(
    url, 
    options, 
    function(err, client) {

        let soapGetPlayerRequestParam = {
            getPlayerRequest: {
                pid: [1, 2]
            }
        };

        let soapCreatePlayerRequestParam = {
            createPlayerRequest: {
                playerSoapInfo: {
                    pid: 0,
                    name: "Jean Bernard",
                    age: 28,
                    citizenship: "French",
                }
            },
        };

        let soapModifyPlayerRequestParam = {
            modifyPlayerRequest: {
                playerSoapInfo: {
                    pid: 1,
                    name: "Jean Bernard Da Silva",
                    age: 30,
                    citizenship: "Brazillian",
                }
            },
        };

        let soapDeletePlayerRequestParam = {
            deletePlayerRequest: {
                pid: 1
            }
        };

        client.getPlayer(
            soapGetPlayerRequestParam, 
            function(err1, result, envelope, soapHeader) {

                console.log("****************************");
                console.log("RÉCUPÉRER DES Joueurs");
                result.playerSoap.forEach(player => {
                    if (player){
                        console.log(" ")
                        afficheInfos(player);
                    }
                })
                console.log("****************************");
                console.log(" ")
                // console.log(result.playerSoap[0].teams)
            }
        );

        client.createPlayer(
            soapCreatePlayerRequestParam,
            function(err2, result, envelope, soapHeader) {
                console.log("****************************");
                console.log("CRÉATTION D'UN JOUEUR");
                afficheInfos(result.playerSoap);
                console.log("****************************");
                console.log(" ")

            }
        )

        client.modifyPlayer(
            soapModifyPlayerRequestParam,
            function(err3, result, envelope, soapHeader) {
                console.log("****************************");
                console.log("MODIFICATION D'UN JOUEUR");
                afficheInfos(result.playerSoap);
                console.log("****************************");
                console.log(" ")

            }
        )

        client.deletePlayer(
            soapDeletePlayerRequestParam, 
            function(err4, result, envelope, soapHeader) {
                
                console.log("SUPPRESSION D'UN JOUEUR");
                console.log(result.deleteResult);
                console.log("\n****************************");

            }
        );

    }
);