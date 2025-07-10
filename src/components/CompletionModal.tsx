import React from 'react';
import { CheckCircle, X, Sparkles, Trophy } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerName: string;
  category: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose, timerName, category }) => {
  if (!isOpen) return null;

  const getCategoryEmoji = () => {
    const emojis = {
      work: '💼',
      study: '📚',
      exercise: '💪',
      break: '☕',
      meditation: '🧘',
      cooking: '👨‍🍳',
      personal: '🏠',
      other: '📝'
    };
    return emojis[category as keyof typeof emojis] || '⏰';
  };

  const getRandomCongrats = () => {
    const messages = [
      "Awesome work! 🎉",
      "You did it! 🌟",
      "Great job! 👏",
      "Well done! 🎊",
      "Fantastic! ✨",
      "You're on fire! 🔥"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-in zoom-in-95 duration-300">
        {/* Celebration background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50/50 via-blue-50/50 to-purple-50/50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10"></div>
        
        <div className="relative">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-yellow-800" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {getRandomCongrats()}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Timer completed successfully!
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-8 p-4 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{getCategoryEmoji()}</span>
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                {timerName}
              </h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
              Category: <span className="font-medium">{category}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Completed at {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 font-bold text-lg shadow-lg shadow-blue-500/25 transform hover:scale-105"
          >
            Awesome! 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;