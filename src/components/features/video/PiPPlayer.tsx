'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { YouTubeApiManager } from '@/lib/youtube-api';

interface PiPPlayerProps {
  isVisible: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
  currentTime?: number;
  onExpand?: () => void;
}



export function PiPPlayer({ 
  isVisible, 
  onClose, 
  videoId, 
  title, 
  currentTime = 0,
  onExpand
}: PiPPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<string>(`pip-player-${Date.now()}`);
  const [playerCreated, setPlayerCreated] = useState(false);
  const lastVideoIdRef = useRef<string>('');
  const apiManagerRef = useRef<YouTubeApiManager | null>(null);

  // Stable time update handler
  const timeUpdateHandler = useCallback((time: number) => {
    const handler = (window as unknown as Record<string, unknown>).__videoPlayerTimeUpdate as ((time: number) => void) | undefined;
    if (handler) handler(time);
  }, []);

  // Initialize YouTube player only when needed
  useEffect(() => {
    if (!apiManagerRef.current) {
      apiManagerRef.current = YouTubeApiManager.getInstance();
    }

    if (isVisible && videoId && playerRef.current && !playerCreated) {
      const playerId = playerInstanceRef.current;
      
      // Add small delay to ensure DOM is ready
      setTimeout(() => {
        if (apiManagerRef.current && playerRef.current) {
          apiManagerRef.current.createPlayer(playerId, videoId, {
            autoplay: true,
            startTime: currentTime,
            onTimeUpdate: timeUpdateHandler,
          }).then(() => {
            setPlayerCreated(true);
            lastVideoIdRef.current = videoId;
          }).catch((error) => {
            console.error('Failed to create YouTube player:', error);
          });
        }
      }, 100);
    }

    // Clean up when PiP closes or video changes
    if ((!isVisible || videoId !== lastVideoIdRef.current) && playerCreated) {
      if (apiManagerRef.current) {
        apiManagerRef.current.destroyPlayer(playerInstanceRef.current);
      }
      setPlayerCreated(false);
      lastVideoIdRef.current = '';
    }
  }, [isVisible, videoId, playerCreated, currentTime, timeUpdateHandler]);

  // Handle seeking when currentTime changes externally (only if player exists and is ready)
  useEffect(() => {
    if (isVisible && playerCreated && currentTime > 0 && apiManagerRef.current) {
      // Check if player is ready before trying to get current time
      if (apiManagerRef.current.isPlayerReady(playerInstanceRef.current)) {
        const currentPlayerTime = apiManagerRef.current.getCurrentTime(playerInstanceRef.current);
        // Only seek if there's a significant difference (avoid constant seeking)
        if (Math.abs(currentPlayerTime - currentTime) > 2) {
          apiManagerRef.current.seekTo(playerInstanceRef.current, currentTime);
        }
      }
    }
  }, [currentTime, isVisible, playerCreated]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-black rounded-lg shadow-2xl overflow-hidden">
      {/* PiP Header with controls */}
      <div className="bg-gray-900 px-3 py-2 flex items-center justify-between">
        <span className="text-white text-sm font-medium truncate">
          {title}
        </span>
        <div className="flex gap-1 ml-2">
          {/* Expand to full modal button */}
          {onExpand && (
            <button
              onClick={onExpand}
              className="text-gray-400 hover:text-white transition-colors p-0.5"
              title="Expand to full view"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          )}
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      {/* Video Content */}
      <div
        ref={playerRef}
        id={playerInstanceRef.current}
        className="w-full aspect-video bg-black"
      />
    </div>
  );
}