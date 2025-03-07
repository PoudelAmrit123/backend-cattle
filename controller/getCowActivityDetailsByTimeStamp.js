import { getDB } from "../db/db.js";
import { timeStamp } from "../utils/time.behavior.js";

export const getCowActivityDetailsByTimeStamp = async (req, res) => {
  const email  =  req.headers['authorization']?.split(' ')[1]
  const cowId = req.params.id;
  const duration = req.query.dur;
  const collection = getDB().collection("cowactivity");

  const dbData = await collection
    .find({
      user : email
    })
    .sort({ cow_id: 1, timestamp: 1 })
    .toArray();

  //

  const timeago = new Date(new Date().getTime() - duration * 60 * 1000);

  const groupedData = dbData.reduce((acc, item) => {
    if (!acc[item.cow_id]) {
      acc[item.cow_id] = [];
    }
    acc[item.cow_id].push(item);
    return acc;
  }, {});

  const dataWithInTimeStamp = groupedData[cowId].filter((item) => {
    return item.timestamp >= timeago;
  });

  const { summary, activityMap, highestBehavior } = timeStamp(
    duration,
    groupedData[cowId]
  );

  const data = {
    dataWithInTimeStamp,
    summary,
    activityMap,
    highestBehavior,
  };

  res.json({ message: "The data on the Selected TimeFrame is :", data });
};
