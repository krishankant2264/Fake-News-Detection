import FakeNewsDetector from '@/components/FakeNewsDetector';
import { Database, Shield, Server, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <Shield className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">VeritasAI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#detector" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Analyzer</a>
            <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How it Works</a>
            <a href="#setup" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Local Setup</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
          <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-950/20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              Multi-Model AI Detection Pipeline
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 max-w-4xl mx-auto">
              Combat Misinformation with <span className="text-blue-600 dark:text-blue-500">Machine Learning</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Verify the authenticity of news articles instantly using our ensemble model architecture featuring Naive Bayes, Logistic Regression, SVM, and Random Forest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#detector" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                Start Analyzing
              </a>
              <a href="#setup" className="px-8 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
                Connect Local Dataset
              </a>
            </div>
          </div>
        </section>

        {/* Detector Section */}
        <section id="detector" className="py-20 bg-white dark:bg-slate-900">
          <FakeNewsDetector />
        </section>

        {/* How it works Section */}
        <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Under the Hood</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Our application uses a robust Natural Language Processing (NLP) pipeline evaluating articles across four different machine learning models to provide a reliable consensus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Multinomial Naive Bayes', desc: 'Our baseline model. Excellent for text classification based on word frequencies.' },
                { name: 'Logistic Regression', desc: 'Provides calibrated probabilities to understand the certainty of the prediction.' },
                { name: 'Linear SVM', desc: 'Highly effective in high-dimensional spaces like TF-IDF vectorized text.' },
                { name: 'Random Forest', desc: 'An ensemble method that builds multiple decision trees to prevent overfitting.' },
              ].map((model, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{model.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {model.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Setup Section */}
        <section id="setup" className="py-24 bg-blue-600 dark:bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect Your Custom Dataset</h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  We noticed you have a dataset at <code>D:\DATA SCIENCE PROJECT</code> with <code>True.csv</code> and <code>Fake.csv</code>. 
                  You can easily train the models on your own machine and connect them to this UI!
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">1. Download Backend Code</h4>
                      <p className="text-blue-200 text-sm mt-1">Copy the <code>python_backend</code> folder from this project to your local Windows machine.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">2. Train Models</h4>
                      <p className="text-blue-200 text-sm mt-1">Run <code>python train.py</code>. It's pre-configured to read from your D: drive path.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">3. Start Server</h4>
                      <p className="text-blue-200 text-sm mt-1">Run <code>python app.py</code> to start the local prediction API on port 5000.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <div className="flex items-center px-4 py-3 bg-[#2D2D2D] border-b border-slate-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-4 text-xs font-mono text-slate-400">Terminal - python_backend</div>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="text-green-400">$ python train.py</div>
                  <div className="text-slate-300 mt-2">Looking for dataset at D:\DATA SCIENCE PROJECT...</div>
                  <div className="text-slate-300">Loading data...</div>
                  <div className="text-slate-300">Total articles: 44898</div>
                  <div className="text-slate-300">Preprocessing text... (this may take a while)</div>
                  <div className="text-slate-300 mt-2">--- Training Models ---</div>
                  <div className="text-slate-300">Training Multinomial NB...</div>
                  <div className="text-blue-400">Multinomial NB Accuracy: 93.45%</div>
                  <div className="text-slate-300 mt-2">Models saved successfully to trained_models.pkl!</div>
                  <div className="text-green-400 mt-4">$ python app.py</div>
                  <div className="text-slate-300 mt-2"> * Serving Flask app 'app'</div>
                  <div className="text-slate-300"> * Running on http://127.0.0.1:5000</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            <span>VeritasAI</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Built for Fake News Detection Analysis using Natural Language Processing.
          </p>
        </div>
      </footer>
    </div>
  );
}
