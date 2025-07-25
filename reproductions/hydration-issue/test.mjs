import { render } from '@react-email/render';
import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

// Create a large email component
const LargeEmail = () => {
  const items = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    title: `Product ${i + 1}`,
    description: `This is a detailed description for product ${i + 1}. It contains multiple sentences to make the email larger. We need to ensure the content is substantial enough to trigger React's hydration optimizations.`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
  }));

  return React.createElement(Html, {},
    React.createElement(Head),
    React.createElement(Preview, {}, 'Browse our extensive collection of products'),
    React.createElement(Body, { style: { fontFamily: 'Arial, sans-serif' } },
      React.createElement(Container, { style: { maxWidth: '600px', margin: '0 auto', padding: '20px' } },
        React.createElement(Heading, { as: 'h1', style: { textAlign: 'center' } }, 'Product Catalog'),
        ...items.map(item => 
          React.createElement(Section, { key: item.id, style: { marginBottom: '20px', padding: '15px', border: '1px solid #ddd' } },
            React.createElement(Heading, { as: 'h2' }, item.title),
            React.createElement(Text, {}, item.description),
            React.createElement(Text, { style: { fontWeight: 'bold' } }, item.price)
          )
        )
      )
    )
  );
};

async function testRender() {
  console.log('Testing render with local @react-email/render...');
  
  try {
    const html = await render(React.createElement(LargeEmail));
    
    // Check for hydration markers
    const markers = {
      reactComments: (html.match(/<!--\$[^>]*-->/g) || []).length,
      scriptTags: (html.match(/<script[^>]*>/g) || []).length,
      hiddenDivs: (html.match(/hidden id="[BS]:\d+"/g) || []).length,
      rcFunction: html.includes('$RC'),
      rvFunction: html.includes('$RV'),
    };
    
    console.log('\n=== Hydration Marker Check ===');
    console.log('React comments (<!--$-->):', markers.reactComments);
    console.log('Script tags:', markers.scriptTags);
    console.log('Hidden divs with B:/S: IDs:', markers.hiddenDivs);
    console.log('Contains $RC function:', markers.rcFunction);
    console.log('Contains $RV function:', markers.rvFunction);
    
    const hasMarkers = Object.values(markers).some(v => v > 0 || v === true);
    console.log('\nHas hydration markers:', hasMarkers);
    
    if (hasMarkers) {
      console.log('\n⚠️  ISSUE REPRODUCED: Hydration markers found in email HTML!');
      
      // Show a sample of the problematic content
      if (markers.scriptTags > 0) {
        const scriptSample = html.match(/<script[^>]*>[\s\S]{0,200}/)?.[0];
        console.log('\nScript sample:', scriptSample);
      }
      if (markers.reactComments > 0) {
        const commentSample = html.match(/<!--\$[^>]*-->/)?.[0];
        console.log('React comment sample:', commentSample);
      }
    } else {
      console.log('\n✅ No hydration markers found - email is clean!');
    }
    
    // Save the output for inspection
    const fs = await import('fs');
    fs.writeFileSync('rendered-with-components.html', html);
    console.log('\nFull HTML saved to: rendered-with-components.html');
    
  } catch (error) {
    console.error('Error rendering email:', error);
  }
}

testRender();
