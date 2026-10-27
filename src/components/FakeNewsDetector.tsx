"use client";

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertCircle, Loader2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FakeNewsDetector() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    prediction: 'REAL' | 'FAKE';
    confidence: number;
    models: {
      nb: number;
      lr: number;
      svm: number;
      rf: number;
    }
  } | null>(null);
  const [error, setError] = useState('');

  const handleDetect = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze text. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
            Fake News Analyzer
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto">
            Paste a news article or headline below to analyze its authenticity using our multi-model machine learning pipeline.
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="article-text" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Article Text
            </label>
            <textarea
              id="article-text"
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Paste the full text of the news article here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-start gap-3 text-red-700 dark:text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleDetect}
              disabled={loading || !text.trim()}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center gap-2 transform active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Text...
                </>
              ) : (
                'Analyze Authenticity'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg",
                result.prediction === 'REAL' 
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-green-600/20" 
                  : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-red-600/20"
              )}>
                {result.prediction === 'REAL' ? (
                  <ShieldCheck className="w-12 h-12" />
                ) : (
                  <ShieldAlert className="w-12 h-12" />
                )}
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h3 className="text-xl font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Analysis Result
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className={cn(
                    "text-4xl md:text-5xl font-extrabold tracking-tight",
                    result.prediction === 'REAL' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {result.prediction}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {(result.confidence * 100).toFixed(1)}% Confidence
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h4 className="col-span-full text-lg font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Individual Model Predictions
              </h4>
              
              <ModelScoreCard 
                name="Multinomial Naive Bayes (Baseline)" 
                score={result.models.nb} 
              />
              <ModelScoreCard 
                name="Logistic Regression" 
                score={result.models.lr} 
              />
              <ModelScoreCard 
                name="Linear SVM" 
                score={result.models.svm} 
              />
              <ModelScoreCard 
                name="Random Forest" 
                score={result.models.rf} 
              />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> This analysis uses an ensemble of four machine learning models trained on the Fake and Real News Dataset. The final prediction is a weighted average of individual model confidences.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ModelScoreCard({ name, score }: { name: string; score: number }) {
  const isReal = score >= 0.5;
  const percentage = isReal ? score * 100 : (1 - score) * 100;
  const label = isReal ? 'REAL' : 'FAKE';

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{name}</p>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-bold px-2 py-0.5 rounded",
            isReal ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
          )}>
            {label}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {percentage.toFixed(1)}%
        </span>
        <p className="text-xs text-slate-500 dark:text-slate-400">confidence</p>
      </div>
    </div>
  );
}
