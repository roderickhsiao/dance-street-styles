import { ImageResponse } from 'next/og';

export const runtime = 'edge';
// Cache OG images for 7 days to reduce generation costs
export const revalidate = 604800;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>&subtitle=<subtitle>
    const hasTitle = searchParams.has('title');
    const hasSubtitle = searchParams.has('subtitle');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100) || 'STREET DANCE'
      : 'STREET DANCE';
    const subtitle = hasSubtitle
      ? searchParams.get('subtitle')?.slice(0, 100) || 'CULTURE MAGAZINE'
      : 'CULTURE MAGAZINE';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#000000',
            backgroundImage: 'linear-gradient(45deg, #000000 0%, #111111 100%)',
            position: 'relative',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
              `,
            }}
          />
          
          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              textAlign: 'left',
              zIndex: 1,
              maxWidth: 1000,
              padding: '0 80px',
              width: '100%',
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: '#000000',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                S
              </span>
            </div>

            {/* Dynamic title */}
            <h1
              style={{
                fontSize: title.length > 20 ? 60 : 80,
                fontWeight: 900,
                color: '#f97316',
                margin: '0 0 20px 0',
                letterSpacing: '-0.02em',
                fontFamily: 'Inter, system-ui, sans-serif',
                textTransform: 'uppercase',
                lineHeight: 0.9,
              }}
            >
              {title}
            </h1>

            {/* Dynamic subtitle */}
            {subtitle && (
              <p
                style={{
                  fontSize: 28,
                  color: '#ec4899',
                  margin: '0 0 30px 0',
                  fontWeight: 600,
                  opacity: 0.9,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {subtitle}
              </p>
            )}

            {/* Accent line */}
            <div
              style={{
                width: 300,
                height: 3,
                background: 'linear-gradient(90deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
                borderRadius: 2,
              }}
            />
          </div>

          {/* Magazine-style corner elements */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 200,
              height: 6,
              background: 'linear-gradient(90deg, #f97316 0%, #ec4899 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 200,
              height: 6,
              background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 100%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}