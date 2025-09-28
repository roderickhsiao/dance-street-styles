import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Street Dance Culture - Magazine';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(45deg, #000000 0%, #111111 100%)',
          position: 'relative',
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
            opacity: 0.1,
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo/Brand mark */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#000000',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              S
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontSize: 80,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              margin: '0 0 20px 0',
              letterSpacing: '-0.02em',
              fontFamily: 'system-ui, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            STREET DANCE
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 32,
              color: '#ffffff',
              margin: '0 0 30px 0',
              fontWeight: 600,
              opacity: 0.9,
              fontFamily: 'system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            CULTURE MAGAZINE
          </p>

          {/* Accent line */}
          <div
            style={{
              width: 400,
              height: 4,
              background: 'linear-gradient(90deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
              borderRadius: 2,
            }}
          />
        </div>

        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
            borderRadius: 30,
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
            borderRadius: 40,
            opacity: 0.4,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}