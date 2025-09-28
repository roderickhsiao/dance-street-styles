// YouTube JavaScript API integration
// Types for YouTube Player API
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string | HTMLElement, config: YouTubePlayerConfig) => YouTubePlayer;
      PlayerState: {
        UNSTARTED: -1;
        ENDED: 0;
        PLAYING: 1;
        PAUSED: 2;
        BUFFERING: 3;
        CUED: 5;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerConfig {
  height?: string | number;
  width?: string | number;
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    enablejsapi?: 0 | 1;
    fs?: 0 | 1;
    modestbranding?: 0 | 1;
    origin?: string;
    rel?: 0 | 1;
    start?: number;
  };
  events?: {
    onReady?: (event: { target: YouTubePlayer }) => void;
    onStateChange?: (event: { target: YouTubePlayer; data: number }) => void;
    onError?: (event: { target: YouTubePlayer; data: number }) => void;
  };
}

interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  getVideoUrl(): string;
  destroy(): void;
}

export class YouTubeApiManager {
  private static instance: YouTubeApiManager;
  private players: Map<string, YouTubePlayer> = new Map();
  private timeUpdateCallbacks: Map<string, (time: number) => void> = new Map();
  private apiReady = false;
  private readyCallbacks: (() => void)[] = [];
  private scriptLoaded = false;

  static getInstance(): YouTubeApiManager {
    if (!YouTubeApiManager.instance) {
      YouTubeApiManager.instance = new YouTubeApiManager();
    }
    return YouTubeApiManager.instance;
  }

  private constructor() {
    // Initialize YouTube API loading when needed
    if (typeof window !== 'undefined') {
      if (window.YT && window.YT.Player) {
        this.apiReady = true;
      } else {
        window.onYouTubeIframeAPIReady = () => {
          this.apiReady = true;
          this.readyCallbacks.forEach(callback => callback());
          this.readyCallbacks = [];
        };
      }
    }
  }

  private loadYouTubeAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Window is not available'));
        return;
      }

      // Check if API is already loaded
      if (window.YT && window.YT.Player) {
        this.apiReady = true;
        resolve();
        return;
      }

      // Check if script is already loaded/loading
      if (this.scriptLoaded) {
        this.readyCallbacks.push(() => resolve());
        return;
      }

      // Load the script
      this.scriptLoaded = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Script loaded, but we still need to wait for onYouTubeIframeAPIReady
        this.readyCallbacks.push(() => resolve());
      };

      script.onerror = () => {
        this.scriptLoaded = false;
        reject(new Error('Failed to load YouTube API script'));
      };

      document.head.appendChild(script);
    });
  }

  private async waitForApi(): Promise<void> {
    if (this.apiReady) {
      return Promise.resolve();
    }

    // Load the API if not already loaded
    try {
      await this.loadYouTubeAPI();
    } catch (error) {
      console.error('Failed to load YouTube API:', error);
      throw error;
    }

    // Wait for API ready callback
    return new Promise((resolve) => {
      if (this.apiReady) {
        resolve();
      } else {
        this.readyCallbacks.push(resolve);
      }
    });
  }

  async createPlayer(
    containerId: string,
    videoId: string,
    options: {
      autoplay?: boolean;
      startTime?: number;
      onTimeUpdate?: (time: number) => void;
      onStateChange?: (state: number) => void;
    } = {}
  ): Promise<YouTubePlayer> {
    await this.waitForApi();

    // Check if player already exists for this container with same video
    const existingPlayer = this.players.get(containerId);
    if (existingPlayer) {
      try {
        // Check if player is in a valid state first
        const playerState = existingPlayer.getPlayerState();
        if (playerState >= 0) {
          const currentVideoUrl = existingPlayer.getVideoUrl();
          if (currentVideoUrl.includes(videoId)) {
            // Player already exists with same video, just update time if needed
            if (options.startTime && options.startTime > 0) {
              this.seekTo(containerId, options.startTime);
            }
            return existingPlayer;
          }
        }
      } catch {
        // If we can't get video URL or player state, player might be in bad state, recreate it
      }
    }

    // Remove existing player if any
    this.destroyPlayer(containerId);

    const player = new window.YT.Player(containerId, {
      videoId,
      playerVars: {
        autoplay: options.autoplay ? 1 : 0,
        controls: 1,
        enablejsapi: 1,
        fs: 1,
        modestbranding: 1,
        origin: window.location.origin,
        rel: 0,
        start: options.startTime ? Math.floor(options.startTime) : undefined,
      },
      events: {
        onReady: (event) => {
          try {
            // Verify player is functional
            event.target.getPlayerState();
            
            // Start time tracking interval
            if (options.onTimeUpdate) {
              this.timeUpdateCallbacks.set(containerId, options.onTimeUpdate);
              this.startTimeTracking(containerId);
            }
          } catch (error) {
            console.error('YouTube player ready error:', error);
          }
        },
        onStateChange: (event) => {
          try {
            if (options.onStateChange) {
              options.onStateChange(event.data);
            }
            
            // Handle time tracking based on state
            if (event.data === window.YT.PlayerState.PLAYING) {
              this.startTimeTracking(containerId);
            } else {
              this.stopTimeTracking(containerId);
            }
          } catch (error) {
            console.error('YouTube player state change error:', error);
          }
        },
        onError: (event) => {
          console.error('YouTube player error:', event.data);
          // Clean up on error
          this.destroyPlayer(containerId);
        },
      },
    });

    this.players.set(containerId, player);
    return player;
  }

  private timeTrackingIntervals: Map<string, number> = new Map();

  private lastTimeUpdate: Map<string, number> = new Map();

  private startTimeTracking(containerId: string) {
    // Clear existing interval
    this.stopTimeTracking(containerId);
    
    const player = this.players.get(containerId);
    const callback = this.timeUpdateCallbacks.get(containerId);
    
    if (player && callback) {
      const interval = window.setInterval(() => {
        try {
          // Check player state first
          const playerState = player.getPlayerState();
          if (playerState < 0) {
            // Player not ready yet, skip this update
            return;
          }
          
          const currentTime = player.getCurrentTime();
          const lastTime = this.lastTimeUpdate.get(containerId) || 0;
          
          // Only call callback if time changed significantly (avoid spam)
          if (Math.abs(currentTime - lastTime) > 0.5) {
            callback(currentTime);
            this.lastTimeUpdate.set(containerId, currentTime);
          }
        } catch {
          // Player might be destroyed, clear interval
          this.stopTimeTracking(containerId);
        }
      }, 1000); // Update every second
      
      this.timeTrackingIntervals.set(containerId, interval);
    }
  }

  private stopTimeTracking(containerId: string) {
    const interval = this.timeTrackingIntervals.get(containerId);
    if (interval) {
      clearInterval(interval);
      this.timeTrackingIntervals.delete(containerId);
    }
  }

  getPlayer(containerId: string): YouTubePlayer | undefined {
    return this.players.get(containerId);
  }

  destroyPlayer(containerId: string) {
    const player = this.players.get(containerId);
    if (player) {
      try {
        player.destroy();
      } catch {
        // Ignore destroy errors
      }
      this.players.delete(containerId);
    }
    
    this.stopTimeTracking(containerId);
    this.timeUpdateCallbacks.delete(containerId);
    this.lastTimeUpdate.delete(containerId);
  }

  // Utility to seek player to specific time safely
  seekTo(containerId: string, time: number) {
    const player = this.players.get(containerId);
    if (!player) return;
    
    try {
      // Check if player is ready before seeking
      const playerState = player.getPlayerState();
      // Only seek if player is in a valid state (not unstarted)
      if (playerState >= 0) {
        player.seekTo(time, true);
      }
    } catch {
      // Player not ready or error occurred, ignore
    }
  }

  // Check if player is ready and functional
  isPlayerReady(containerId: string): boolean {
    const player = this.players.get(containerId);
    if (!player) return false;
    
    try {
      const playerState = player.getPlayerState();
      // Player is ready if state is not unstarted (-1)
      return playerState >= 0;
    } catch {
      return false;
    }
  }

  // Get current time from player safely
  getCurrentTime(containerId: string): number {
    const player = this.players.get(containerId);
    if (!player) return 0;
    
    try {
      // Check if player is ready before calling methods
      const playerState = player.getPlayerState();
      // Only get time if player is in a valid state
      if (playerState >= 0) {
        return player.getCurrentTime();
      }
    } catch {
      // Player not ready or error occurred
    }
    
    return 0;
  }
}