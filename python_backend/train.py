import os
import pandas as pd
import pickle
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# UPDATE THIS PATH TO MATCH YOUR DATASET LOCATION
# Based on your request, this is your dataset path
DATASET_DIR = r"D:\DATA SCIENCE PROJECT"
TRUE_CSV = os.path.join(DATASET_DIR, "True.csv")
FAKE_CSV = os.path.join(DATASET_DIR, "Fake.csv")

def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Convert to lowercase
    text = text.lower()
    return text

def train_models():
    print(f"Looking for dataset at {DATASET_DIR}...")
    
    if not os.path.exists(TRUE_CSV) or not os.path.exists(FAKE_CSV):
        print(f"Error: Could not find True.csv or Fake.csv in {DATASET_DIR}")
        print("Please ensure the path is correct and the files exist.")
        return

    print("Loading data...")
    df_true = pd.read_csv(TRUE_CSV)
    df_fake = pd.read_csv(FAKE_CSV)

    # Add labels (1 for Real, 0 for Fake)
    df_true['label'] = 1
    df_fake['label'] = 0

    # Combine datasets
    df = pd.concat([df_true, df_fake], ignore_index=True)
    
    # Shuffle dataset
    df = df.sample(frac=1).reset_index(drop=True)

    print(f"Total articles: {len(df)}")
    
    # Preprocess text (combine title and text if both exist, otherwise just use text)
    if 'title' in df.columns and 'text' in df.columns:
        df['full_text'] = df['title'] + " " + df['text']
    else:
        df['full_text'] = df['text']

    print("Preprocessing text... (this may take a while)")
    df['clean_text'] = df['full_text'].apply(preprocess_text)

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(df['clean_text'], df['label'], test_size=0.2, random_state=42)

    print("Vectorizing text using TF-IDF...")
    vectorizer = TfidfVectorizer(max_features=10000, stop_words='english')
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # Define models as requested
    models = {
        'Multinomial NB': MultinomialNB(),
        'Logistic Regression': LogisticRegression(max_iter=1000),
        'Linear SVM': LinearSVC(max_iter=1000),
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    }

    trained_models = {}

    print("\n--- Training Models ---")
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train_vec, y_train)
        predictions = model.predict(X_test_vec)
        acc = accuracy_score(y_test, predictions)
        print(f"{name} Accuracy: {acc * 100:.2f}%")
        trained_models[name] = model

    print("\nSaving models and vectorizer...")
    save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'trained_models.pkl')
    with open(save_path, 'wb') as f:
        pickle.dump({
            'models': trained_models,
            'vectorizer': vectorizer
        }, f)
    
    print(f"Models saved successfully to {save_path}!")
    print("\nYou can now run 'python app.py' to start the backend server.")

if __name__ == "__main__":
    train_models()
