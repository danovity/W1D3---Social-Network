/* 
  Pick a few of the following tasks and write functions to solve them:

    List everyone and for each of them, list the names of who they follow and who follows them
    Identify who follows the most people
    Identify who has the most followers
    Identify who has the most followers over 30
    Identify who follows the most people over 30
    List those who follow someone that doesn't follow them back
    List everyone and their reach (sum of # of followers and # of followers of followers)
 */

var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

function listAllFollowing(data) {
  //List everyone
  //list the names of who they follow
  //who follows them
  var allFollowing = {};

  var processing = Object.keys(data).map((key, index) => {
    var follows = data[key].follows;
    var userName = key;
    var information = {};
    var followers = Object.keys(data)
      .map((searchUserName, i) => {
        return data[searchUserName].follows.indexOf(userName) !== -1
          ? searchUserName
          : "";
      })
      .filter(item => item !== "");
    information = {
      follows,
      followers
    };

    allFollowing[userName] = information;
    //console.log(`userName is: ${userName}, followers are: ${followers}`);
  });

  //console.log(`List all followings: ${allFollowing}`);
  return allFollowing;
}
console.log(listAllFollowing(data));

function topFollower(data) {
  //Identify who follows the most people
  var mostNumOfFollowers = Object.keys(data)
    .map((key, index) => {
      return data[key].follows.length;
    })
    .reduce((a, b) => {
      return a > b ? a : b;
    });

  var topFollower = Object.keys(data)
    .map((key, index) => {
      return data[key].follows.length === mostNumOfFollowers ? key : null;
    })
    .filter(item => item !== null);

  console.log(`User who follows the most people: ${topFollower}`);
  return topFollower;
}

topFollower(data);

//Identify who has the most followers
function mostFollowers(data) {
  var allData = listAllFollowing(data);
  var length = 0;
  var followersLength = Object.keys(allData).map((key, index) => {
    if (allData[key].followers.length >= length) {
      length = allData[key].followers.length;
    }
  });
  var mostFollowers = Object.keys(allData)
    .map((key, index) => {
      return allData[key].followers.length === length ? key : "";
    })
    .filter(item => item != "");
  console.log(`Users with most followers: ${mostFollowers}`);
  return mostFollowers;
}
mostFollowers(data);

//Identify who has the most followers over 30

function mostFollowersOver30(data) {
  var topFollowers = mostFollowers(data);
  var agesOver30 = topFollowers
    .map((cur, index) => {
      return data[cur].age > 30 ? cur : "";
    })
    .filter(item => item != "");
  console.log(`Most followers over 30: ${agesOver30}`);
  return agesOver30;
}
mostFollowersOver30(data);

//Identify who follows the most people over 30
function topFollowerOver30(data) {
  var users = topFollower(data);
  var agesOver30 = users
    .map((cur, index) => {
      return data[cur].age > 30 ? cur : "";
    })
    .filter(item => item != "");
  console.log(`Follows the most people, over 30: ${agesOver30}`);
  return agesOver30;
}
topFollowerOver30(data);

//List those who follow someone that doesn't follow them back
function trueFollower(data) {
  var allFollowing = listAllFollowing(data);
  var finalResult = {};
  var followBack = Object.keys(allFollowing).map((user, index) => {
    var follows = allFollowing[user].follows;
    result = {};
    var noFollowBack = follows
      .map((cur, i) => {
        /* console.log(
          `${user} follows ${cur}, ${cur} following back? ${data[
            cur
          ].follows.indexOf(user)}`
        ); */
        return data[cur].follows.indexOf(user) == -1 ? cur : "";
      })
      .filter(item => item !== "");
    finalResult[user] = noFollowBack;
  });

  var printResult = Object.keys(finalResult).forEach((user, i) => {
    finalResult[user].forEach((userName, j) => {
      console.log(
        `${user} is following ${userName}, but ${userName} did not follow back ${user}`
      );
    });
  });

  return finalResult;
}
trueFollower(data);

//List everyone and their reach (sum of # of followers and # of followers of followers)

function reach(data) {
  var allFollowing = listAllFollowing(data);
  Object.keys(data).forEach((key, index) => {
    var sumOfFollowers = allFollowing[key].followers.length;
    var sumOfFolFol = allFollowing[key].followers
      .map((name, i) => {
        return allFollowing[name].followers.length;
      })
      .reduce((a, b) => a + b);

    var totalSum = sumOfFolFol + sumOfFollowers;
    var user = key;

    console.log(`${user} has reach of ${totalSum}`);
  });
}
reach(data);
