import React from 'react';
import './App.css'; // Import your CSS file
import Table from './table';
import DynamicTable from './mux_table';


const App = () => {
  // Sample data
  const data = [
    {
      "question_name": "What is your name?",
      "responses": [
        {
          "response": "Stephen ",
          "date": "2023-08-16T14:15:44.497507Z"
        }
      ]
    },
    {
      "question_name": "Tell me about yourself?",
      "responses": [
        {
          "response": "I am Stephen ",
          "date": "2023-08-16T14:15:44.50291Z"
        }
      ]
    },
    {
      "question_name": "How do you like your tea? Choose all that apply.",
      "responses": [
        {
          "response": "Cold, Hot ",
          "date": "2023-08-16T14:15:44.552108Z"
        }
      ]
    },
    {
      "question_name": "What is your sex?",
      "responses": [
        {
          "response": "Male",
          "date": "2023-08-16T14:15:44.566079Z"
        }
      ]
    },
    {
      "question_name": "Choose your preferred start date.",
      "responses": [
        {
          "response": "2023-08-16T13:41:24.233Z",
          "date": "2023-08-16T14:15:44.572158Z"
        }
      ]
    },
    {
      "question_name": "Choose your preferred start time.",
      "responses": [
        {
          "response": "2023-08-16T13:41:24.233Z",
          "date": "2023-08-16T14:15:44.582066Z"
        }
      ]
    },
    {
      "question_name": "Choose the option that best suits your needs.",
      "responses": [
        {
          "response": "Take a cash",
          "date": "2023-08-16T14:15:44.587915Z"
        }
      ]
    }
  ]

  return (
    <div className="app">
      <h1>Responses Table</h1>
      <DynamicTable data={data} />
    </div>
  );
};

export default App;
