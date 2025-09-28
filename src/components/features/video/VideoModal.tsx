'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { PictureInPicture, X } from 'lucide-react';
import { Modal } from '../../ui/modal';
import { YouTubeApiManager } from '@/lib/youtube-api';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
  description: string;
  currentTime?: number;
  onPiPRequest?: () => void;
  showPiPButton?: boolean;
}



export function VideoModal({ 
  isOpen, 
  onClose, 
  videoId, 
  title, 
  description, 
  currentTime = 0,
  onPiPRequest,
  showPiPButton = true
}: VideoModalProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<string>(`modal-player-${Date.now()}`);
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

    if (isOpen && videoId && playerRef.current && !playerCreated) {
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

    // Clean up when modal closes or video changes
    if ((!isOpen || videoId !== lastVideoIdRef.current) && playerCreated) {
      if (apiManagerRef.current) {
        apiManagerRef.current.destroyPlayer(playerInstanceRef.current);
      }
      setPlayerCreated(false);
      lastVideoIdRef.current = '';
    }
  }, [isOpen, videoId, playerCreated, currentTime, timeUpdateHandler]);

  // Handle seeking when currentTime changes externally (only if player exists and is ready)
  useEffect(() => {
    if (isOpen && playerCreated && currentTime > 0 && apiManagerRef.current) {
      // Check if player is ready before trying to get current time
      if (apiManagerRef.current.isPlayerReady(playerInstanceRef.current)) {
        const currentPlayerTime = apiManagerRef.current.getCurrentTime(playerInstanceRef.current);
        // Only seek if there's a significant difference (avoid constant seeking)
        if (Math.abs(currentPlayerTime - currentTime) > 2) {
          apiManagerRef.current.seekTo(playerInstanceRef.current, currentTime);
        }
      }
    }
  }, [currentTime, isOpen, playerCreated]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="w-full max-w-4xl mx-4"
      showCloseButton={false}
    >
      {/* Custom header with video controls */}
      <div className="absolute top-4 end-4 z-20 flex gap-2">
        {/* Back to PiP button */}
        {showPiPButton && onPiPRequest && (
          <button
            onClick={onPiPRequest}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            title="Back to Picture-in-Picture"
          >
            <PictureInPicture className="h-4 w-4" />
          </button>
        )}
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Video Title and Description */}
      <div className="p-4 pb-2">
        <h3 className="text-header-sm font-bold text-content-primary mb-1">
          {title}
        </h3>
        <p className="text-body-sm text-content-secondary">
          {description}
        </p>
      </div>
      
      {/* YouTube Player Container */}
      <div className="p-4 pt-0">
        <div
          ref={playerRef}
          id={playerInstanceRef.current}
          className="w-full aspect-video rounded-lg bg-black"
        />
      </div>
    </Modal>
  );
}