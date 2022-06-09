import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import "./Main.css";
import QuestionContainer from "./question-container/QuestionContainer";
import { getAllComments } from "../services/commentsServicesClient";

const questionsList = [
  {
    question:
      "Every employee of your company has a Google account. Your operational team needs to manage a large number of instances on Compute Engine. Each member of this team needs only administrative access to the servers. Your security team wants to ensure that the deployment of credentials is operationally efficient and must be able to determine who accessed a given instance. What should you do?",
    options: [
      "Generate a new SSH key pair. Give the private key to each member of your team. Configure the public key in the metadata of each instance.",
      "Ask each member of the team to generate a new SSH key pair and to send you their public key. Use a configuration management tool to deploy those keys on each instance.",
      "Ask each member of the team to generate a new SSH key pair and to add the public key to their Google account. Grant the ג€compute.osAdminLoginג€ role to the Google group corresponding to this team.",
      "Generate a new SSH key pair. Give the private key to each member of your team. Configure the public key as a project-wide public SSH key in your Cloud Platform project and allow project-wide public SSH keys on each instance.",
    ],
    correctAnswer: [3],
    explaination: "",
    image: "",
  },
  {
    question:
      "You need to create a custom VPC with a single subnet. The subnet's range must be as large as possible. Which range should you use?",
    options: ["0.0.0.0/0", "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"],
    correctAnswer: [2],
    explaination: "",
    image: "",
  },
  {
    question:
      "You want to select and configure a cost-effective solution for relational data on Google Cloud Platform. You are working with a small set of operational data in one geographic location. You need to support point-in-time recovery. What should you do?",
    options: [
      "Select Cloud SQL (MySQL). Verify that the enable binary logging option is selected.",
      "Select Cloud SQL (MySQL). Select the create failover replicas option.",
      "Select Cloud Spanner. Set up your instance with 2 nodes.",
      "Select Cloud Spanner. Set up your instance as multi-regional.",
    ],
    correctAnswer: [1],
    explaination: "",
    image: "",
  },
  {
    question:
      "You want to configure autohealing for network load balancing for a group of Compute Engine instances that run in multiple zones, using the fewest possible steps. You need to configure re-creation of VMs if they are unresponsive after 3 attempts of 10 seconds each. What should you do?",
    options: [
      "Create an HTTP load balancer with a backend configuration that references an existing instance group. Set the health check to healthy (HTTP)",
      "Create an HTTP load balancer with a backend configuration that references an existing instance group. Define a balancing mode and set the maximum RPS to 10.",
      "Create a managed instance group. Set the Autohealing health check to healthy (HTTP)",
      "Create a managed instance group. Verify that the autoscaling setting is on.",
    ],
    correctAnswer: [3],
    explaination: "",
    image: "",
  },
];

const Main = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await getAllComments();
      console.log(result);
      setComments(result);
    })();
  }, []);

  // filter the comments for given id
  const getFilteredCommentsByID = (comments, index) => {
    let filteredComments = comments.filter(
      (comment) => comment.questionid === index
    );
    return filteredComments;
  };

  return (
    <div>
      <Header />

      <div className="questions-list-div">
        {questionsList.map((questionObject, index) => {
          return (
            <QuestionContainer
              key={Math.random().toString()}
              questionNumber={index + 1}
              question={questionObject.question}
              options={questionObject.options}
              correctAnswer={questionObject.correctAnswer}
              image={questionObject.image}
              explaination={questionObject.explaination}
              comments={getFilteredCommentsByID(
                comments,
                (index + 1).toString()
              )}
            />
          );
        })}
      </div>
      <div className="print-div" onClick={window.print}>
        <img
          className="print-image"
          src={require("../assets/print_icon.png")}
          alt="Print this page"
        />
      </div>
    </div>
  );
};

export default Main;
