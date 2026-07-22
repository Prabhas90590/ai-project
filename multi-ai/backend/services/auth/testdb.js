import dns from "dns";

dns.resolveSrv("_mongodb._tcp.cluster0.4dgxesk.mongodb.net", (err, records) => {
  console.log("Error:", err);
  console.log("Records:", records);
});