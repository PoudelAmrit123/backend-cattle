// export const allTime = (data) => {
  


//   const activityMap = data.reduce((acc, item) => {
//     const behavior = item.behavior;
//     acc[behavior] = (acc[behavior] || 0) + 1;
//     return acc;
//   }, {});


//   let highestBehavior = "";
//   let highestCount = 0;

//    Object.entries(activityMap).forEach(([activity, count]) => {
//     if (count > highestCount) {
//       highestCount = count;
//       highestBehavior = activity;
//     }
//   });

//   let summary = "";
//   if (highestBehavior === "Standing") {
//     summary = `The cow has been standing for a majority of the last 100 minutes. Total standing count: ${highestCount}.`;
//   } else if (highestBehavior === "Drinking") {
//     summary = `The cow has been drinking frequently in the last 100 minutes. Total drinking count: ${highestCount}.`;
//   } else if (highestBehavior === "Feeding head up") {
//     summary = `The cow has been feeding with its head up most of the time. Total feeding head up count: ${highestCount}.`;
//   } else if (highestBehavior === "Feeding head down") {
//     summary = `The cow has been feeding with its head down for the majority of the time. Total feeding head down count: ${highestCount}.`;
//   } else if (highestBehavior === "Lying") {
//     summary = `The cow has been lying in the last 100 minutes. Total lying count: ${highestCount}.`;
//   } else {
//     summary = `The cow has shown a variety of behaviors. Most frequent behavior: ${highestBehavior} with a count of ${highestCount}.`;
//   }

//   return { summary, activityMap, highestBehavior };
// };


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
    summary = `The cow has been standing for a large portion of the time. While standing is normal, prolonged standing might indicate the cow is not resting enough. Consider observing its environment for potential stressors. Total standing count: ${highestCount}.`;
  } else if (highestBehavior === "Drinking") {
    summary = `The cow has been drinking regularly, indicating proper hydration. Frequent drinking is essential for its overall well-being, especially if the environment is warmer. Total drinking count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head up") {
    summary = `The cow has been feeding with its head up most of the time. This could mean it's actively searching for food or is engaged in grazing. Total feeding head up count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head down") {
    summary = `The cow has been feeding with its head down for the majority of the time. This is typical when grazing, but it might be worth observing if it's eating enough. Total feeding head down count: ${highestCount}.`;
  } else if (highestBehavior === "Lying") {
    summary = `The cow has been lying down, which is a good sign of rest and relaxation. It’s crucial for cows to rest and recover to maintain their energy levels. Total lying count: ${highestCount}.`;
  } else {
    summary = `The cow has shown a variety of behaviors with the most frequent being ${highestBehavior}, indicating that it has diverse activities during this period. Most frequent behavior: ${highestBehavior} with a count of ${highestCount}.`;
  }

  
  const totalActivities = Object.values(activityMap).reduce((acc, count) => acc + count, 0);

  if (Object.keys(activityMap).length > 1) {
    const mostCommonBehavior = Object.entries(activityMap).sort((a, b) => b[1] - a[1])[0][0];
    const secondMostCommonBehavior = Object.entries(activityMap).sort((a, b) => b[1] - a[1])[1][0];
    summary += ` In addition to the highest activity of ${highestBehavior}, there were notable activities such as ${secondMostCommonBehavior}. This shows the cow has been alternating between different behaviors and not overly focusing on one. Total activities tracked: ${totalActivities}.`;
  }

  
  summary += `\nBased on the current data, it appears the cow is performing its regular activities like standing, drinking, and feeding without any unusual spikes in behavior. However, if standing and grazing activities exceed a certain threshold, it may be a sign of discomfort or a need for more rest.`;

  return { summary, activityMap, highestBehavior };
};

export const timeStamp = (time, data) => {
  const intTime  = parseInt(time)
  const thirtyMinutesAgo = new Date(new Date().getTime() - intTime * 60 * 1000);
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

  Object.entries(activityMap).forEach(([activity, count]) => {
    if (count > highestCount) {
      highestCount = count;
      highestBehavior = activity;
    }
  });

  // Logic for a more insightful summary
  let summary = "";
  
  // Behavior Insights
  if (highestBehavior === "Standing") {
    summary = `The cow has been standing for a large portion of the time. While standing is normal, prolonged standing might indicate the cow is not resting enough. Consider observing its environment for potential stressors. Total standing count: ${highestCount}.`;
  } else if (highestBehavior === "Drinking") {
    summary = `The cow has been drinking regularly, indicating proper hydration. Frequent drinking is essential for its overall well-being, especially if the environment is warmer. Total drinking count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head up") {
    summary = `The cow has been feeding with its head up most of the time. This could mean it's actively searching for food or is engaged in grazing. Total feeding head up count: ${highestCount}.`;
  } else if (highestBehavior === "Feeding head down") {
    summary = `The cow has been feeding with its head down for the majority of the time. This is typical when grazing, but it might be worth observing if it's eating enough. Total feeding head down count: ${highestCount}.`;
  } else if (highestBehavior === "Lying") {
    summary = `The cow has been lying down, which is a good sign of rest and relaxation. It’s crucial for cows to rest and recover to maintain their energy levels. Total lying count: ${highestCount}.`;
  }
  //  else {
  //   summary = `The cow has shown a variety of behaviors with the most frequent being ${highestBehavior}, indicating that it has diverse activities during this period. Most frequent behavior: ${highestBehavior} with a count of ${highestCount}.`;
  // }

 
  const totalActivities = Object.values(activityMap).reduce((acc, count) => acc + count, 0);

  if (Object.keys(activityMap).length > 1) {
    const mostCommonBehavior = Object.entries(activityMap).sort((a, b) => b[1] - a[1])[0][0];
    const secondMostCommonBehavior = Object.entries(activityMap).sort((a, b) => b[1] - a[1])[1][0];
    summary += ` In addition to the highest activity of ${highestBehavior}, there were notable activities such as ${secondMostCommonBehavior}. This shows the cow has been alternating between different behaviors and not overly focusing on one. Total activities tracked: ${totalActivities}.`;
  }

   if(activityMap.length > 0){

     summary += `\nBased on the current data, it appears the cow is performing its regular activities like standing, drinking, and feeding without any unusual spikes in behavior. However, if standing and grazing activities exceed a certain threshold, it may be a sign of discomfort or a need for more rest.`;
     
    }

     const allTime = 'timestamp '

    
  return { summary, activityMap, highestBehavior, dataWithInTimeStamp , allTime };
};
