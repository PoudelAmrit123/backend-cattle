export const allTime = (data) => {
  


  const activityMap = data.reduce((acc, item) => {
    const behavior = item.behavior;
    acc[behavior] = (acc[behavior] || 0) + 1;
    return acc;
  }, {});


  let highestBehavior = "";
  let highestCount = 0;

   Object.entries(activityMap).forEach(([activity, count]) => {
    if (count > highestCount) {
      highestCount = count;
      highestBehavior = activity;
    }
  });

  let summary = "";
  if (highestBehavior === "Standing") {
    summary = `The cow has been standing for a majority of the last 100 minutes. Total standing count: ${highestCount}.`;
  } else if (highestBehavior === "Drinking") {
    summary = `The cow has been drinking frequently in the last 100 minutes. Total drinking count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head up") {
    summary = `The cow has been feeding with its head up most of the time. Total feeding head up count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head down") {
    summary = `The cow has been feeding with its head down for the majority of the time. Total feeding head down count: ${highestCount}.`;
  } else if (highestBehavior === "Lying") {
    summary = `The cow has been lying in the last 100 minutes. Total lying count: ${highestCount}.`;
  } else {
    summary = `The cow has shown a variety of behaviors. Most frequent behavior: ${highestBehavior} with a count of ${highestCount}.`;
  }

  return { summary, activityMap, highestBehavior };
};

export const timeStamp = (time, data) => {
  const thirtyMinutesAgo = new Date(new Date().getTime() - time * 60 * 1000);
  const dataWithInTimeStamp = data.filter(
    (item) => item.timestamp >= thirtyMinutesAgo && item.timestamp < new Date()
  );

  const activityMap = dataWithInTimeStamp.reduce((acc, item) => {
    const behavior = item.behavior;
    acc[behavior] = (acc[behavior] || 0) + 1;
    return acc;
  }, {});

  

  let highestBehavior = "";
  let highestCount = 0;

  Object.entries(activityMap).forEach(([behavior, count]) => {
    if (count > highestCount) {
      highestCount = count;
      highestBehavior = behavior;
    }
  });

  let summary = "";
  if (highestBehavior === "Standing") {
    summary = `The cow has been standing for a majority of the last 100 minutes. Total standing count: ${highestCount}.`;
  } else if (highestBehavior === "Drinking") {
    summary = `The cow has been drinking frequently in the last 100 minutes. Total drinking count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head up") {
    summary = `The cow has been feeding with its head up most of the time. Total feeding head up count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head down") {
    summary = `The cow has been feeding with its head down for the majority of the time. Total feeding head down count: ${highestCount}.`;
  } else if (highestBehavior === "Lying") {
    summary = `The cow has been lying in the last 100 minutes. Total lying count: ${highestCount}.`;
  } else {
    summary = `The cow has shown a variety of behaviors. Most frequent behavior: ${highestBehavior} with a count of ${highestCount}.`;
  }

  return { summary, activityMap, highestBehavior, dataWithInTimeStamp };
};
