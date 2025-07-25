import React from 'react';
import { NextResponse } from 'next/server';
import LargeEmail from '@/emails/large-email';
import { render } from '@react-email/render';

export async function GET() {
  try {
    const html = await render(React.createElement(LargeEmail));

    // Check for hydration markers
    const markers = {
      reactComments: (html.match(/<!--\$[^>]*-->/g) || []).length,
      scriptTags: (html.match(/<script[^>]*>/g) || []).length,
      hiddenDivs: (html.match(/hidden id="[BS]:\d+"/g) || []).length,
      rcFunction: html.includes('$RC'),
      rvFunction: html.includes('$RV'),
      rtFunction: html.includes('$RT'),
      rbArray: html.includes('$RB'),
    };

    const hasMarkers = Object.values(markers).some((v) => !!v);

    // Extract samples if found
    const samples: any = {};
    if (markers.scriptTags > 0) {
      const scripts = html.match(/<script[^>]*>[\s\S]*?<\/script>/g);
      samples.scripts = scripts
        ?.slice(0, 2)
        .map((s) => s.substring(0, 200) + (s.length > 200 ? '...' : ''));
    }
    if (markers.reactComments > 0) {
      const comments = html.match(/<!--\$[^>]*-->/g);
      samples.comments = comments?.slice(0, 5);
    }

    return NextResponse.json({
      hasHydrationMarkers: hasMarkers,
      markers,
      samples,
      htmlLength: html.length,
      message: hasMarkers
        ? '⚠️ Hydration markers found in Next.js app directory!'
        : '✅ Clean HTML - no hydration markers',
      html
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}

