const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
    //Zmienne
    var Reklama_Skf = "";
    var IS_Tr_R_bool = false;
    var ReklamaStatus = "";
    var channel;
    var Ilosc_Reklam = "";
    var wstep = "";
    var Premium_Tekst = "";
//Łączenie z bazą
    con.query(
      `SELECT * from Kanaly where IDDS = ${message.guild.id}`,
      async function(err, rows) {
        if (!rows.length) {
          channel = "<a:false:702810788980588654> Brak kanału do reklam";
        } else {
          wstep = "<a:true:702810851995942922> **Kanał reklam ustawiony na**";
          channel = client.channels.cache.get(rows[0].Kanal_ID);
        }
//Pobieranie...
        await con.query(
          `SELECT * from Reklamy where IDDS = ${message.guild.id}`,
         async function(err, rows) {
            if (!rows.length) {
              IS_Tr_R_bool = false;
              Reklama_Skf =
                "> <a:false:702810788980588654> *Brak ustawionej reklamy*";
            } else {
              IS_Tr_R_bool = true;
              Reklama_Skf =
                "> <a:true:702810851995942922>  Reklama jest ustawiona";
              Ilosc_Reklam = rows[0].Wyslano_L;
              if (rows[0].Zatwierdz == 0) {
                ReklamaStatus = `> <a:true:702810851995942922> **Reklama jest zatwierdzona, i została juz wysłana \`${Ilosc_Reklam}\` razy, w cyklu ** *"RANDEOX V1.2"*`;
              } else if (rows[0].Zatwierdz == 1) {
                ReklamaStatus =
                  "> <a:false:702810788980588654>  **Reklama została odrzucona, ustaw jeszcze raz prawidłową reklamę**";
              } else if (rows[0].Zatwierdz == 2) {
                ReklamaStatus =
                  "> <a:LoadingBar:712727482322780170> **Reklama jest w kolejce do zatwierdzenia**";
              }
              
            }
        let sql = `SELECT * FROM Server_Info WHERE IDDS = ${message.guild.id}`
       await console.log(sql)
           con.query(
              sql,
             async function(err, rows) {
                if(err) throw err
                // console.log(rows[0].Premium)
                // console.log(rows)
                  if(rows.length){
                    
                      console.log("DALEJ")
                    //  console.lo
                        if(rows[0].Premium == "1"){
                          console.log("DALEJ")
Premium_Tekst = "> <:Puchar:726009617674403902> **Ten serwer posiada zakupioną usługę premium** *(Więcej info pod `&premium`)*"
console.log(Premium_Tekst)
                        }
                        if(rows[0].Premium == "2"){
                          Premium_Tekst = "> <:Puchar:726009617674403902> **Ten serwer posiada zakupiony __pakiet usług__ premium** *(Więcej info pod `&premium`)*"
                        }
                      
                  }
              
              console.log("1" + Premium_Tekst)
//Tworzenie embeda statów
            const staty_embed = new Discord.MessageEmbed()
              .setAuthor(
                "Statystyki serwer'a",
                "http://server260631.nazwa.pl/Kolorowy_GIF.gif"
              )
              .setDescription(
                `> ${wstep} *${channel}*\n\n ${Reklama_Skf}\n\n${ReklamaStatus}\n\n${Premium_Tekst}`
              )
              .setColor("#00FF00")
              .setFooter(
                "Komenda została wywołana przez: " +
                  message.author.tag +
                  " | ID: " +
                  message.author.id,
                  message.author.displayAvatarURL({ dynamic: true })
              );

            message.channel.send(staty_embed);
              })
          }
        );
      }
    );
}

module.exports.help = {
    name: "staty",
    aliases: ['statystyki']
}