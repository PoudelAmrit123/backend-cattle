import { getDB } from "../db/db.js";
import { timeStamp } from "../utils/time.behavior.js";

//TODO: We will forward the data for the default case for last 30 min here for in this route and when the user change the timestamp range we will hit another api route

export const getCowDetails = async (req, res) => {
  const collection = getDB().collection("cowactivity");
  const cowId = req.params.id;
 
  const thirtyMinutesAgo = new Date(new Date().getTime() - 200 * 60 * 1000);

  const dbData = await collection
    .find({
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

  const summary = timeStamp(200, groupedData[cowId]);

  const data = {
    cows: dataWithInTimeStamp,
    // details: activityMap,
    summary: summary,
  };

  res.json({ messaage: "The Details of particular Cow ID", data });
};
