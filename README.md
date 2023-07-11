## Installing Node.js on Mac and Windows
Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that allows developers to run JavaScript on the server-side. In this README, we will explain the steps to install Node.js on Mac and Windows.

# Installing Node.js on Mac
Follow these steps to install Node.js on your Mac:

1. Open a web browser and navigate to the Node.js official website.
2. Click on the "Download" button to download the latest version of Node.js for Mac.
3. Once the download is complete, open the downloaded file.
4. Follow the instructions in the Node.js installer to complete the installation process.
# Installing Node.js on Windows
Follow these steps to install Node.js on your Windows machine:

1. Open a web browser and navigate to the Node.js official website.
2. Click on the "Download" button to download the latest version of Node.js for Windows.
3. Once the download is complete, open the downloaded file.
4. Follow the instructions in the Node.js installer to complete the installation process.
## Doing npm install and starting a Node.js app
Once Node.js is installed on your machine, you can use npm (Node Package Manager) to install packages for your Node.js application.

Follow these steps to do npm install and start a Node.js app:

1. Open a terminal or command prompt window.
2. Navigate to your Node.js application directory.
3. Run the command npm install to install the dependencies listed in your package.json file.
4. Once the installation is complete, run the command npm run serve to start your Node.js application.
That's it! Your Node.js application should now be up and running. You can access it by navigating to http://localhost:3002 (or a different port if specified in your code)

# API Documentation
https://documenter.getpostman.com/view/20848322/2s93RL2H5u



# Thought Process
### Understanding of problem
First of all the most important thing i did is understanding of the problem statement. I have done it so by going through the 
problem description thoroughly multiple times  as it helps me to understand the possible entities as following 
* procure-to-pay activities / activities
* variant
    * unique sequence of activities
* Dataset 
    * includes the column ActivityName, CaseId and Time Stamp

After identifying the entities i go through the acceptance criteria to understand what is required and i go to know the following information
* aggregate cases that have sane event execution order and provide an  output which is an  array of objects where one object consists of a variant(a specific sequence of activities) and the number of occurrence of that variant in dataset (dashboard picture at the end of the read me also make it clear).
* As per performance measure of the code it should respond in 50 milliseconds.

at this point after understanding of the problem i moved to the next step which is planing

### Planing
At this point after having the understanding of what needs to be done and also having  a look into the dataset i have to decide for an proper approach towards the problem.
After reading the Hints/FAQ part of the read me i came to know that the data is not in its pure form (has duplications and also not sorted).

so the first part of the solution for me is preparing the data in a way that it is easier to work with
After preparing the data the second part of the solution should be the aggregation of the data according to requirements and then final part should be extracting the final array from aggregated data. so in short my solution is based on three steps or in other words the problem is divided into three parts.
#### Prepare dataSet 
prepare dataset into a easy to work with data structure (no duplications and sorted data) and i decided to go with the a data structure where records are grouped by the CaseID and then this grouped record consist of an array of unique activities related to that particular case and sorted by time of occurrence.
following is the example of data structure 
```
const logsGroupedByCaseId = {
'100430035020118300012015' :[
        {
          Timestamp: "2021-02-20T12:41:32.000Z",
          ActivityName: "Post invoice in MM",
        },
        {
          Timestamp: "2021-04-27T00:40:00.000Z",
          ActivityName: "Change purchase order item",
        },
      ]
}
```
this refinement of the dataset will make the next steps easy
#### perform aggregation on the prepared data set
after 1st stpe as i already have the data set grouped by CaseID and in the timely mannar sequance of activites so next step is to  perform aggregation on this more clean form of data.
#### extract the final output from the aggregated data (last step)

and at the end for performance measure utilize and refactor the code so that i can perform all these operation in 50 milliseconds.




## Data
Which properties of the data did you check for? Which assumptions did you make? Which edge cases are worth considering?

## Performance
Which performance considerations did you make?

## Scope
Which aspects did you consider but put out of scope? What could be potential improvements or extensions in the future?

## Correctness
How do you test your solution for correctness? What are potential improvements from your point of view?

