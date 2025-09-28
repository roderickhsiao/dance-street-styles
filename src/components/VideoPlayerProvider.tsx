'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { VideoModal } from './VideoModal';
import { PiPPlayer } from './PiPPlayer';
import { YouTubeApiManager } from '@/lib/youtube-api';

interface VideoPlayerState {
  isPlaying: boolean;
  isPiPMode: boolean;
  videoId: string | null;
  title: string;
  description: string;
  currentTime: number;
}

interface VideoPlayerContextType {
  state: VideoPlayerState;
  openVideo: (videoId: string, title: string, description: string) => void;
  closeVideo: () => void;
  switchToPiP: () => void;
  switchToModal: () => void;
  updateTime: (time: number) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayer must be used within VideoPlayerProvider');
  }
  return context;
}

interface VideoPlayerProviderProps {
  children: React.ReactNode;
}

export function VideoPlayerProvider({ children }: VideoPlayerProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    isPiPMode: false,
    videoId: null,
    title: '',
    description: '',
    currentTime: 0
  });

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // YouTube API integration
  useEffect(() => {
    // Initialize YouTube API manager
    YouTubeApiManager.getInstance();
    
    // Debounce time updates to prevent excessive re-renders
    let timeUpdateTimeout: NodeJS.Timeout;
    
    // Set up global time update handler
    const handleTimeUpdate = (time: number) => {
      // Clear previous timeout
      if (timeUpdateTimeout) {
        clearTimeout(timeUpdateTimeout);
      }
      
      // Debounce the state update
      timeUpdateTimeout = setTimeout(() => {
        setState(prev => {
          // Only update if time changed significantly
          if (Math.abs(prev.currentTime - time) > 0.5) {
            return { ...prev, currentTime: time };
          }
          return prev;
        });
      }, 100); // 100ms debounce
    };

    // Store the handler for use in video components
    (window as unknown as Record<string, unknown>).__videoPlayerTimeUpdate = handleTimeUpdate;
    
    return () => {
      // Clean up
      if (timeUpdateTimeout) {
        clearTimeout(timeUpdateTimeout);
      }
      delete (window as unknown as Record<string, unknown>).__videoPlayerTimeUpdate;
    };
  }, []);



  const openVideo = (videoId: string, title: string, description: string) => {
    setState({
      isPlaying: true,
      isPiPMode: !isMobile, // Desktop starts in PiP, mobile starts in modal
      videoId,
      title,
      description,
      currentTime: 0
    });
  };

  const closeVideo = () => {
    setState(prev => ({
      ...prev,
      isPlaying: false,
      isPiPMode: false,
      currentTime: 0
    }));
  };

  const switchToPiP = () => {
    setState(prev => ({ ...prev, isPiPMode: true }));
  };

  const switchToModal = () => {
    setState(prev => ({ ...prev, isPiPMode: false }));
  };

  const updateTime = (time: number) => {
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const contextValue: VideoPlayerContextType = {
    state,
    openVideo,
    closeVideo,
    switchToPiP,
    switchToModal,
    updateTime
  };

  return (
    <VideoPlayerContext.Provider value={contextValue}>
      {children}
      
      {/* Global Video Components */}
      {state.isPlaying && state.videoId && (
        <>
          {/* Desktop: Show either PiP or Modal */}
          {!isMobile && (
            <>
              <PiPPlayer
                isVisible={state.isPiPMode}
                videoId={state.videoId}
                title={state.title}
                currentTime={state.currentTime}
                onClose={closeVideo}
                onExpand={switchToModal}
              />
              
              <VideoModal
                isOpen={!state.isPiPMode}
                videoId={state.videoId}
                title={state.title}
                description={state.description}
                currentTime={state.currentTime}
                onClose={closeVideo}
                onPiPRequest={switchToPiP}
                showPiPButton={true}
              />
            </>
          )}
          
          {/* Mobile: Always show modal */}
          {isMobile && (
            <VideoModal
              isOpen={true}
              videoId={state.videoId}
              title={state.title}
              description={state.description}
              currentTime={state.currentTime}
              onClose={closeVideo}
              onPiPRequest={undefined}
              showPiPButton={false}
            />
          )}
        </>
      )}
    </VideoPlayerContext.Provider>
  );
}