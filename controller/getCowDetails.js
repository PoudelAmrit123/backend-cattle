import { userInfo } from "os";
import { getDB } from "../db/db.js";
import { allTime, timeStamp } from "../utils/time.behavior.js";
import cookieParser from "cookie-parser";

//TODO: We will forward the data for the default case for last 30 min here for in this route and when the user change the timestamp range we will hit another api route

export const getCowDetails = async (req, res) => {
  const collection = getDB().collection("cowactivity");
  //  const userName  = req.cookies
  // const userName  = 'test@gmail.com'
  const cowId = req.params.id;
  const email  =  req.headers['authorization']?.split(' ')[1]
 
  const thirtyMinutesAgo = new Date(new Date().getTime() - 200 * 60 * 1000);
  const userData = 'test@gmail.com'

  const dbData = await collection
    .find({ user : email
       
      // cow_id : cowId ,
      // timestamp : {
      //     $gte : thirtyMinutesAgo,
      //     $lt  : new Date(),
      //              }
    })
    .sort({ cow_id: 1, timestamp: -1 })
    .toArray();

          const groupedData = dbData.reduce((acc, item) => {
            if (!acc[item.cow_id]) {
              acc[item.cow_id] = [];
            }

            acc[item.cow_id].push(item);
            return acc;
          }, {});

  const dataWithInTimeStamp = groupedData[cowId].filter((item) => {
    return item.timestamp >= thirtyMinutesAgo && item.timestamp < new Date();
  });

  // const summary = allTime( groupedData[cowId]);
  // const dataWithInTimeStamp = groupedData[cowId]
  const {summary} = timeStamp(30000 , dataWithInTimeStamp)

  const data = {
    cows: dataWithInTimeStamp,
    // details: activityMap,
    summary: summary,
  };
  const test = {
    test2: "this is test",
  }

  res.json({ messaage: "The Details of particular Cow ID", data });
};
