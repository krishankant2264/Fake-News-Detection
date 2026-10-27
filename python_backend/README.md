# Fake News Detection Backend

This directory contains the Python backend for your Fake News Detection web app. It uses the dataset located at `D:\DATA SCIENCE PROJECT`.

## Prerequisites

1. Make sure you have Python installed on your Windows machine.
2. Install the required packages:

```bash
pip install pandas scikit-learn flask flask-cors
```

## Step 1: Train the Models

Since your dataset is at `D:\DATA SCIENCE PROJECT\True.csv` and `Fake.csv`, the `train.py` script is already configured to look there.

Run the training script:

```bash
python train.py
```

This will read your dataset, preprocess the text, train the four models (Multinomial NB, Logistic Regression, Linear SVM, Random Forest), and save them to `trained_models.pkl`.

## Step 2: Start the API Server

Once the models are trained, start the Flask server to serve predictions to the Next.js frontend:

```bash
python app.py
```

The server will start on `http://127.0.0.1:5000`. Keep this terminal window open.

## Step 3: Use the Web App

With the Flask server running locally on your machine, you can open the Next.js web app. It will automatically detect your local python backend and use it to classify news articles!
