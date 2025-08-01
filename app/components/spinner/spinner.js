// app/components/spinner/spinner.js
"use client";

export default function Spinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`${sizeClasses[size]} bg-care-blue rounded-full animate-pulseRhythmic`}
        style={{ animationDelay: '-0.3s' }}
      ></div>
      <div
        className={`${sizeClasses[size]} bg-care-blue rounded-full animate-pulseRhythmic`}
        style={{ animationDelay: '-0.15s' }}
      ></div>
      <div
        className={`${sizeClasses[size]} bg-care-blue rounded-full animate-pulseRhythmic`}
      ></div>
    </div>
  );
}
