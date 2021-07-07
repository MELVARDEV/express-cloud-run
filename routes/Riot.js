const router = require("express").Router();
const fetch = require("node-fetch");
const riotApiKey = process.env.riot_api_key;




function parseRegion (requestRegion){


    let region = null;
   
    switch (requestRegion.toUpperCase()) {
      case "BR":
        region = "BR1";
        break;
      case "EUNE":
        region = "EUN1";
        break;
      case "EUW":
        region = "EUW1";
        break;
      case "LAN":
        region = "LA1";
        break;
      case "LAS":
        region = "LA2";
        break;
      case "NA":
        region = "NA1";
        break;
      case "OCE":
        region = "OC1";
        break;
      case "RU":
        region = "RU1";
        break;
      case "TR":
        region = "TR1";
        break;
      case "JP":
        region = "JP1";
        break;
      case "KR":
        region = "KR";
        break;
      case "PBE":
        region = "PBE";
        break;
      default:
        break;
    }
    return region;
}

router.get("/league/:region/:name",  async (req, res) => {
  if (!req.params.name) {
    return res.status(400).send("Name required");
  }

  if (!req.params.region) {
    return res.status(400).send("Region required");
  }

  const region = parseRegion(req.params.region)

  if(!region){
      return res.status(400).send('Region invalid');
  }

  if(!region){
      return res.status(400).send("Invalid region")
  }

  fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}?api_key=${riotApiKey}`
  )
    .then((response) => response.json())
    .then((summoner) => {
      fetch(
        `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}`,
        {
          method: "GET",
          headers: { "X-Riot-Token": riotApiKey },
        }
      )
        .then((response) => response.json())
        .then((league) => {

            

          return res.status(200).send(league.find(x => x.queueType == 'RANKED_SOLO_5x5'));
        })
        .catch((err) => {
          console.trace(err);
          return res.status(400).send("error");
        });
    })
    .catch((err) => {
      console.trace(err);
      return res.status(400).send("error");
    });
});

router.get("/summoner/:region/:name",  async (req, res) => {
  if (!req.params.name) {
    return res.status(400).send("Name required");
  }


  if (!req.params.region) {
    return res.status(400).send("Region required");
  }

  const region = parseRegion(req.params.region)

  if(!region){
      return res.status(400).send('Region invalid');
  }


  fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}?api_key=${riotApiKey}`
  )
    .then((response) => response.json())
    .then((summoner) => res.status(200).send(summoner))
    .catch((err) => {
      console.trace(err);
      return res.status(400).send("error");
    });
});

module.exports = router;
