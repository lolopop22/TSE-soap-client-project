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
                if(team.team){
                    console.log(`   * Name : ${team.team.name};`);
                    console.log(`   * Country : ${team.team.country};`);
                    console.log(`   * Type : ${team.team.type};`);
                    console.log(`   * Captain : ${team.team.captain};`);
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

        let soapRequestParam = {
            getPlayerRequest: {
                pid: [1,2]
            }
        };

        client.getPlayer(
            soapRequestParam, 
            function(err, result, envelope, soapHeader) {

                console.log("RÉCUPÉRER DES Joueurs");
                result.playerSoap.forEach(player => {
                    if (player){
                        afficheInfos(player);
                    }
                })
                console.log("****************************");
            }
        );
    }
);