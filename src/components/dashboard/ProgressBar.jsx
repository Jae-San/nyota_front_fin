import React from 'react';
import { ProgressBar } from 'primereact/progressbar';

export const CustomProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
    const progress = Math.round((currentQuestionIndex / totalQuestions) * 100);
    
    return (
        <div className="w-full mb-4">
            <div className="flex justify-content-between mb-2 text-sm font-semibold text-600">
                <span>Progression du Test</span>
                <span>{progress}%</span>
            </div>
            <ProgressBar 
                value={progress} 
                showValue={false} 
                style={{ height: '12px', borderRadius: '20px' }}
                // On force la couleur bleue via CSS global ou inline
                className="custom-blue-bar"
            />
            <div className="flex w-full mt-1" style={{ height: '4px' }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`flex-1 mr-1 border-round ${progress >= (i*25) ? 'bg-blue-500' : 'bg-200'}`} />
                ))}
            </div>
        </div>
    );
};